import { SongWithAnimalsInput, SongWithAnimalsOutput, SongWithAnimalsImagePrompt, SongWithAnimalsVideoPrompt } from '../types/pipeline.js';
import { PipelineOptions } from '../types/pipeline.js';
import { imagePrompt, songWithAnimalsVideoPrompt } from '../promts/index.js';
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
 * Run the song with animals generation pipeline for multiple songs
 * @param input - The song with animals input (array of song objects with lyrics)
 * @param options - Pipeline options
 * @returns The generated song with animals outputs (one per song)
 */
export async function runSongWithAnimalsPipeline(
  input: SongWithAnimalsInput,
  options: PipelineOptions = {}
): Promise<SongWithAnimalsOutput[]> {
  const results: SongWithAnimalsOutput[] = [];

  for (const song of input) {
    const lyrics = song.lyrics;
    const segments = splitLyricsIntoSegments(lyrics);

    // Set models and temperatures for each step
    const imageModel = 'anthropic/claude-3.7-sonnet';
    const imageTemperature = 0.3;
    const videoModel = 'anthropic/claude-3.7-sonnet';
    const videoTemperature = 0.5;

    let attempt = 0;
    const maxAttempts = 3;
    let finished = false;
    while (attempt < maxAttempts && !finished) {
      attempt++;
      try {
        if (options.emitLog && options.requestId) {
          options.emitLog(`🎵 Generating song with animals... (Attempt ${attempt})`, options.requestId);
        }

        // Step 1: Generate image prompts
        if (options.emitLog && options.requestId) {
          options.emitLog(`🖼️ Generating image prompts for ${segments.length} segments...`, options.requestId);
        }
        const imageChain = createChain(imagePrompt, { model: imageModel, temperature: imageTemperature });
        const imageJson: string | Record<string, any> | null = await executePipelineStep(
          'SONG WITH ANIMALS IMAGE PROMPTS',
          imageChain,
          { songLyrics: lyrics }
        );
        let globalStyle = '';
        let prompts: SongWithAnimalsImagePrompt[] = [];
        if (imageJson) {
          const parsed = typeof imageJson === 'string' ? safeJsonParse(imageJson, 'SONG WITH ANIMALS IMAGE PROMPTS') : imageJson;
          if (parsed && typeof parsed === 'object') {
            globalStyle = parsed.global_style || '';
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

        // Step 2: Generate video prompts (titles, descriptions and hashtags will be generated separately)
        if (options.emitLog && options.requestId) {
          options.emitLog(`🎬 Generating video prompts for ${prompts.length} image prompts...`, options.requestId);
        }
        let videoPrompts: SongWithAnimalsVideoPrompt[] = [];
        let videoJson: string | Record<string, any> | null = null;
        try {
          const videoChain = createChain(songWithAnimalsVideoPrompt, { model: videoModel, temperature: videoTemperature });
          
          // Prepare image prompts as formatted string for the prompt
          const imagePromptsFormatted = prompts.map(p => `Line: "${p.line}"\nPrompt: ${p.prompt}`).join('\n\n');
          
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
            if (parsed && typeof parsed === 'object' && Array.isArray(parsed.video_prompts)) {
              const rawVideoPrompts = parsed.video_prompts;
              // Add indices to video prompts (starting from 0)
              videoPrompts = rawVideoPrompts.map((prompt, index) => ({
                ...prompt,
                index: index
              }));
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

        const songResult: SongWithAnimalsOutput = {
          global_style: globalStyle,
          prompts,
          video_prompts: videoPrompts,
          titles: [],
          descriptions: [],
          hashtags: []
        };
        results.push(songResult);

        // Save to file in unprocessed folder
        if (options.emitLog && options.requestId) {
          options.emitLog(`💾 Saving result...`, options.requestId);
        }
        const generationsDir = getGenerationsDir();
        if (generationsDir) {
          const unprocessedDir = path.join(generationsDir, 'unprocessed');
          await fs.mkdir(unprocessedDir, { recursive: true });
          const fileNumber = await getNextFileNumber(generationsDir);
          const filename = `${fileNumber}-song_with_animals.json`;
          const filePath = path.join(unprocessedDir, filename);
          await fs.writeFile(filePath, JSON.stringify(songResult, null, 2), 'utf-8');
        }
        if (options.emitLog && options.requestId) {
          options.emitLog(`✅ Generation finished`, options.requestId);
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