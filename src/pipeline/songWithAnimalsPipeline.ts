import { SongWithAnimalsInput, SongWithAnimalsOutput, SongWithAnimalsImagePrompt, SongWithAnimalsVideoPrompt } from '../types/pipeline.js';
import { PipelineOptions } from '../types/pipeline.js';
import { createImagePromptWithStyle } from '../promts/song_with_animals/imagePrompt.js';
import { getStyle } from '../promts/song_with_animals/styles/styleConfig.js';
import { songWithAnimalsVideoPrompt, songWithAnimalsTitlePrompt, logVideoPrompt, logTitlePrompt } from '../promts/index.js';
import { createChain } from '../chains/index.js';
import { executePipelineStep, safeJsonParse } from '../utils/index.js';
import config from '../config/index.js';
import fs from 'fs/promises';
import path from 'path';
import { getGenerationsDir } from '../server.js';
import { getNextFileNumber } from '../utils/fileUtils.js';

/**
 * Split lyrics into segments based on configuration
 * @param lyrics - Full song lyrics
 * @returns Array of segments with configured number of lines
 */
function splitLyricsIntoSegments(lyrics: string): string[] {
  const lines = lyrics.split('\n').filter(line => line.trim().length > 0);
  const segments: string[] = [];
  const segmentLines = config.songSegmentLines;
  
  for (let i = 0; i < lines.length; i += segmentLines) {
    const segment = lines.slice(i, i + segmentLines).join('\n');
    if (segment.trim()) {
      segments.push(segment);
    }
  }
  
  return segments;
}

/**
 * Group video prompts into segments based on configuration
 * @param video_prompts - Array of video prompts
 * @returns Array of segments with configured number of video prompts
 */
function groupVideoPromptsIntoSegments(video_prompts: SongWithAnimalsVideoPrompt[]): SongWithAnimalsVideoPrompt[][] {
    const segments: SongWithAnimalsVideoPrompt[][] = [];
    const segmentLines = config.songSegmentLines;
    
    for (let i = 0; i < video_prompts.length; i += segmentLines) {
        const segment = video_prompts.slice(i, i + segmentLines);
        if (segment.length > 0) {
            segments.push(segment);
        }
    }
    
    return segments;
}

/**
 * Run the complete song with animals generation pipeline (including titles, descriptions and hashtags)
 * @param input - The song with animals input (array of song objects with lyrics)
 * @param options - Pipeline options
 * @returns The generated song with animals outputs (one per song)
 */
export async function runSongWithAnimalsPipeline(
  input: SongWithAnimalsInput,
  options: PipelineOptions = {}
): Promise<SongWithAnimalsOutput[]> {
  const results: SongWithAnimalsOutput[] = [];
  const selectedStyle = options.style || 'default'; // Используем переданный стиль или дефолтный

  for (const song of input) {
    const lyrics = song.lyrics;
    const segments = splitLyricsIntoSegments(lyrics);

    // Set models and temperatures for each step
    const imageModel = 'openai/gpt-5-chat';
    const imageTemperature = 0.3;
    const videoModel = 'anthropic/claude-3.7-sonnet';
    const videoTemperature = 0.5;
    const titleModel = 'openai/gpt-5-chat';
    const titleTemperature = 0.7;

    let attempt = 0;
    const maxAttempts = 3;
    let finished = false;
    while (attempt < maxAttempts && !finished) {
      attempt++;
      try {
        if (options.emitLog && options.requestId) {
          options.emitLog(`🎵 Generating song with animals with ${selectedStyle} style... (Attempt ${attempt})`, options.requestId);
        }

        // Step 1: Generate image prompts with selected style
        if (options.emitLog && options.requestId) {
          options.emitLog(`🖼️ Generating image prompts for ${segments.length} segments using ${selectedStyle} style...`, options.requestId);
        }
        
        // Получаем стиль и устанавливаем globalStyle на уровне пайплайна
        let globalStyle = '';
        try {
          const style = getStyle(selectedStyle);
          if (style.globalStyle) {
            globalStyle = style.globalStyle;
            if (options.emitLog && options.requestId) {
              options.emitLog(`🎨 Using predefined globalStyle from ${selectedStyle} style`, options.requestId);
            }
          }
        } catch (error) {
          if (options.emitLog && options.requestId) {
            options.emitLog(`⚠️ Could not load style ${selectedStyle}: ${error instanceof Error ? error.message : String(error)}`, options.requestId);
          }
        }

        // Создаем промт с выбранным стилем
        const imagePromptWithStyle = createImagePromptWithStyle(selectedStyle);
        const imageChain = createChain(imagePromptWithStyle, { model: imageModel, temperature: imageTemperature });
        
        const imageJson: string | Record<string, any> | null = await executePipelineStep(
          'SONG WITH ANIMALS IMAGE PROMPTS',
          imageChain,
          { songLyrics: lyrics }
        );
        let prompts: SongWithAnimalsImagePrompt[] = [];
        if (imageJson) {
          const parsed = typeof imageJson === 'string' ? safeJsonParse(imageJson, 'SONG WITH ANIMALS IMAGE PROMPTS') : imageJson;
          if (parsed && typeof parsed === 'object') {
            // Если globalStyle не был установлен из стиля, используем сгенерированный
            if (!globalStyle && parsed.global_style) {
              globalStyle = parsed.global_style;
              if (options.emitLog && options.requestId) {
                options.emitLog(`🎨 Using generated globalStyle from LLM`, options.requestId);
              }
            }
            const rawPrompts = Array.isArray(parsed.prompts) ? parsed.prompts : [];
            // Add indices to image prompts (starting from 0)
            prompts = rawPrompts.map((prompt, index) => ({
              ...prompt,
              index: index
            }));
          }
        } else {
          if (options.emitLog && options.requestId) {
            options.emitLog(`❌ Failed to generate image prompts. Retrying...`, options.requestId);
          }
          break;
        }

        // Step 2: Generate video prompts
        if (options.emitLog && options.requestId) {
          options.emitLog(`🎬 Generating video prompts for ${prompts.length} image prompts...`, options.requestId);
        }
        let videoPrompts: SongWithAnimalsVideoPrompt[] = [];
        let videoJson: string | Record<string, any> | null = null;
        try {
          const videoChain = createChain(songWithAnimalsVideoPrompt, { model: videoModel, temperature: videoTemperature });
          
          // Prepare image prompts as formatted string for the prompt
          const imagePromptsFormatted = prompts.map(p => `Line: "${p.line}"\nPrompt: ${p.prompt}`).join('\n\n');
          
          // Логируем видео промт в консоль
          logVideoPrompt(globalStyle, imagePromptsFormatted);
          
          videoJson = await executePipelineStep(
            'SONG WITH ANIMALS VIDEO PROMPTS',
            videoChain,
            { 
              global_style: globalStyle,
              image_prompts: imagePromptsFormatted
            }
          );
          if (videoJson) {
            const parsed = typeof videoJson === 'string' ? safeJsonParse(videoJson, 'SONG WITH ANIMALS VIDEO PROMPTS') : videoJson;
            if (options.emitLog && options.requestId) {
              options.emitLog(`🔍 Video prompts parsing: ${JSON.stringify(parsed).substring(0, 200)}...`, options.requestId);
            }
            if (parsed && typeof parsed === 'object' && Array.isArray(parsed.video_prompts)) {
              const rawVideoPrompts = parsed.video_prompts;
              // Add indices to video prompts (starting from 0)
              videoPrompts = rawVideoPrompts.map((prompt, index) => ({
                ...prompt,
                index: index
              }));
              if (options.emitLog && options.requestId) {
                options.emitLog(`✅ Successfully parsed ${videoPrompts.length} video prompts`, options.requestId);
              }
            } else {
              if (options.emitLog && options.requestId) {
                options.emitLog(`⚠️ Video prompts parsing issue: parsed.video_prompts is not an array`, options.requestId);
              }
            }
          } else {
            if (options.emitLog && options.requestId) {
              options.emitLog(`❌ Failed to generate video prompts. Retrying...`, options.requestId);
            }
            break; // Retry the whole song
          }
        } catch (e) {
          if (options.emitLog && options.requestId) {
            options.emitLog(`❌ Error generating video prompts: ${e instanceof Error ? e.message : String(e)}`, options.requestId);
          }
          break; // Retry the whole song
        }

        // Step 3: Generate titles
        if (options.emitLog && options.requestId) {
          options.emitLog(`🏷️ Generating titles...`, options.requestId);
        }

        // Group video prompts into segments
        const videoSegments = groupVideoPromptsIntoSegments(videoPrompts);
        if (options.emitLog && options.requestId) {
          options.emitLog(`📚 Grouped ${videoPrompts.length} video prompts into ${videoSegments.length} segments of ${config.songSegmentLines} lines each`, options.requestId);
        }

        const titles: string[] = [];

        // Generate title for each segment
        if (options.emitLog && options.requestId) {
          options.emitLog(`🏷️ Generating titles for ${videoSegments.length} segments...`, options.requestId);
        }
        
        for (let segmentIndex = 0; segmentIndex < videoSegments.length; segmentIndex++) {
          const segment = videoSegments[segmentIndex];
          if (!segment || segment.length === 0) {
            if (options.emitLog && options.requestId) {
              options.emitLog(`❌ Segment ${segmentIndex + 1} is empty. Skipping...`, options.requestId);
            }
            continue;
          }
          
          if (options.emitLog && options.requestId) {
            options.emitLog(`🏷️ Generating title for segment ${segmentIndex + 1}/${videoSegments.length} (${segment.length} video prompts)...`, options.requestId);
          }
          
          // Combine all lines from the segment
          const segmentLines = segment.map(prompt => prompt.line).join('\n');
          // Combine all video prompts from the segment
          const segmentVideoPrompts = segment.map(prompt => prompt.video_prompt).join('\n\n');
          
          let title = '';
          let titleJson: string | Record<string, any> | null = null;
          try {
            const titleChain = createChain(songWithAnimalsTitlePrompt, { model: titleModel, temperature: titleTemperature });
            
            // Логируем title промт в консоль
            logTitlePrompt(segmentLines, segmentVideoPrompts, globalStyle);
            
            titleJson = await executePipelineStep(
              'SONG WITH ANIMALS TITLE',
              titleChain,
              { 
                songLyrics: segmentLines,
                videoPrompt: segmentVideoPrompts,
                globalStyle: globalStyle
              }
            );
            if (titleJson) {
              const parsed = typeof titleJson === 'string' ? safeJsonParse(titleJson, 'SONG WITH ANIMALS TITLE') : titleJson;
              if (parsed && typeof parsed === 'object') {
                title = parsed.title || '';
              }
            } else {
              if (options.emitLog && options.requestId) {
                options.emitLog(`❌ Failed to generate title for segment ${segmentIndex + 1}. Retrying...`, options.requestId);
              }
              break; // Retry the whole song
            }
          } catch (e) {
            if (options.emitLog && options.requestId) {
              options.emitLog(`❌ Error generating title for segment ${segmentIndex + 1}: ${e instanceof Error ? e.message : String(e)}`, options.requestId);
            }
            break; // Retry the whole song
          }
          
          titles.push(title);
        }

        // Check if we have all the required data
        if (titles.length === videoSegments.length) {
          
          if (options.emitLog && options.requestId) {
            options.emitLog(`✅ Successfully generated all titles!`, options.requestId);
          }
        } else {
          if (options.emitLog && options.requestId) {
            options.emitLog(`❌ Incomplete data generated. Expected ${videoSegments.length} titles, got: ${titles.length}. Retrying...`, options.requestId);
          }
          continue; // Retry the whole song
        }

        const songResult: SongWithAnimalsOutput = {
          global_style: globalStyle,
          prompts,
          video_prompts: videoPrompts,
          titles
        };
        results.push(songResult);

        // Логируем финальный globalStyle для отладки
        if (options.emitLog && options.requestId) {
          options.emitLog(`🎨 Final globalStyle used: ${globalStyle.substring(0, 100)}...`, options.requestId);
        }

        // Save to file in unprocessed folder
        if (options.emitLog && options.requestId) {
          options.emitLog(`💾 Saving result...`, options.requestId);
        }
        const generationsDir = getGenerationsDir();
        if (generationsDir) {
          const unprocessedDir = path.join(generationsDir, 'unprocessed');
          await fs.mkdir(unprocessedDir, { recursive: true });
          const fileNumber = await getNextFileNumber(generationsDir);
          const filename = `${fileNumber}-${selectedStyle}.json`;
          const filePath = path.join(unprocessedDir, filename);
          await fs.writeFile(filePath, JSON.stringify(songResult, null, 2), 'utf-8');
        }
        if (options.emitLog && options.requestId) {
          options.emitLog(`✅ Generation finished with ${selectedStyle} style`, options.requestId);
        }
        finished = true;
      } catch (error) {
        if (options.emitLog && options.requestId) {
          options.emitLog(`❌ Error generating song: ${error instanceof Error ? error.message : String(error)}`, options.requestId);
        }
        if (attempt >= maxAttempts) {
          if (options.emitLog && options.requestId) {
            options.emitLog(`🚫 Failed to generate song after ${maxAttempts} attempts. Skipping.`, options.requestId);
          }
        }
      }
    }
  }

  return results;
} 