import { TitlesDescriptionsHashtagsInput, TitlesDescriptionsHashtagsOutput, TitlesDescriptionsHashtagsOutputWithIndices, SongWithAnimalsVideoPrompt } from '../types/pipeline.js';
import { PipelineOptions } from '../types/pipeline.js';
import { songWithAnimalsTitleDescPrompt, songWithAnimalsHashtagsPrompt } from '../promts/index.js';
import { createChain } from '../chains/index.js';
import { executePipelineStep, safeJsonParse } from '../utils/index.js';
import fs from 'fs/promises';
import path from 'path';
import { getGenerationsDir } from '../server.js';
import { getNextFileNumber } from '../utils/fileUtils.js';
import config from '../config/index.js';

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
 * Run the titles, descriptions and hashtags generation pipeline
 * @param input - The input containing video prompts and global style
 * @param options - Pipeline options
 * @returns The generated titles, descriptions and hashtags
 */
export async function runTitlesDescriptionsHashtagsPipeline(
    input: TitlesDescriptionsHashtagsInput,
    options: PipelineOptions = {}
): Promise<TitlesDescriptionsHashtagsOutputWithIndices> {
    const { video_prompts, global_style } = input;
    
    // Set models and temperatures for each step
    const titleDescModel = 'anthropic/claude-3.7-sonnet';
    const titleDescTemperature = 0.7;
    const hashtagsModel = 'anthropic/claude-3.7-sonnet';
    const hashtagsTemperature = 0.4;

    let attempt = 0;
    const maxAttempts = 3;
    let finished = false;
    
    while (attempt < maxAttempts && !finished) {
        attempt++;
        try {
            if (options.emitLog && options.requestId) {
                options.emitLog(`🏷️ Generating titles, descriptions and hashtags... (Attempt ${attempt})`, options.requestId);
            }

            // Group video prompts into segments
            const segments = groupVideoPromptsIntoSegments(video_prompts);
            if (options.emitLog && options.requestId) {
                options.emitLog(`📚 Grouped ${video_prompts.length} video prompts into ${segments.length} segments of ${config.songSegmentLines} lines each`, options.requestId);
            }

            // Step 1: Generate title & description for each segment
            if (options.emitLog && options.requestId) {
                options.emitLog(`🏷️ Generating titles and descriptions for ${segments.length} segments...`, options.requestId);
            }
            const titles: Array<{ index: number; title: string }> = [];
            const descriptions: Array<{ index: number; description: string }> = [];
            
            for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
                const segment = segments[segmentIndex];
                if (!segment || segment.length === 0) {
                    if (options.emitLog && options.requestId) {
                        options.emitLog(`❌ Segment ${segmentIndex + 1} is empty. Skipping...`, options.requestId);
                    }
                    continue;
                }
                
                if (options.emitLog && options.requestId) {
                    options.emitLog(`🏷️ Generating title/description for segment ${segmentIndex + 1}/${segments.length} (${segment.length} video prompts)...`, options.requestId);
                }
                
                // Combine all lines from the segment
                const segmentLines = segment.map(prompt => prompt.line).join('\n');
                // Combine all video prompts from the segment
                const segmentVideoPrompts = segment.map(prompt => prompt.video_prompt).join('\n\n');
                // Use the first index from the segment as the segment index
                const segmentIndexValue = segment[0]?.index ?? segmentIndex;
                
                let title = '';
                let description = '';
                let titleDescJson: string | Record<string, any> | null = null;
                try {
                    const titleDescChain = createChain(songWithAnimalsTitleDescPrompt, { model: titleDescModel, temperature: titleDescTemperature });
                    titleDescJson = await executePipelineStep(
                        'TITLES DESCRIPTIONS HASHTAGS TITLE & DESCRIPTION',
                        titleDescChain,
                        { 
                            songLyrics: segmentLines,
                            videoPrompt: segmentVideoPrompts,
                            globalStyle: global_style
                        }
                    );
                    if (titleDescJson) {
                        const parsed = typeof titleDescJson === 'string' ? safeJsonParse(titleDescJson, 'TITLES DESCRIPTIONS HASHTAGS TITLE & DESCRIPTION') : titleDescJson;
                        if (parsed && typeof parsed === 'object') {
                            title = parsed.title || '';
                            description = parsed.description || '';
                        }
                    } else {
                        if (options.emitLog && options.requestId) {
                            options.emitLog(`❌ Failed to generate title/description for segment ${segmentIndex + 1}. Retrying...`, options.requestId);
                        }
                        break; // Retry the whole pipeline
                    }
                } catch (e) {
                    if (options.emitLog && options.requestId) {
                        options.emitLog(`❌ Error generating title/description for segment ${segmentIndex + 1}: ${e instanceof Error ? e.message : String(e)}`, options.requestId);
                    }
                    break; // Retry the whole pipeline
                }
                
                // Store with segment index
                titles.push({ index: segmentIndexValue, title });
                descriptions.push({ index: segmentIndexValue, description });
            }

            // Step 2: Generate hashtags for each segment
            if (options.emitLog && options.requestId) {
                options.emitLog(`#️⃣ Generating hashtags for ${segments.length} segments...`, options.requestId);
            }
            const hashtagsArray: Array<{ index: number; hashtags: string }> = [];
            
            for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
                const segment = segments[segmentIndex];
                if (!segment || segment.length === 0) {
                    if (options.emitLog && options.requestId) {
                        options.emitLog(`❌ Segment ${segmentIndex + 1} is empty. Skipping...`, options.requestId);
                    }
                    continue;
                }
                
                if (options.emitLog && options.requestId) {
                    options.emitLog(`#️⃣ Generating hashtags for segment ${segmentIndex + 1}/${segments.length} (${segment.length} video prompts)...`, options.requestId);
                }
                
                // Combine all lines from the segment
                const segmentLines = segment.map(prompt => prompt.line).join('\n');
                // Combine all video prompts from the segment
                const segmentVideoPrompts = segment.map(prompt => prompt.video_prompt).join('\n\n');
                // Use the first index from the segment as the segment index
                const segmentIndexValue = segment[0]?.index ?? segmentIndex;
                
                let hashtags = '';
                let hashtagsStr: string | null = null;
                try {
                    const hashtagsChain = createChain(songWithAnimalsHashtagsPrompt, { model: hashtagsModel, temperature: hashtagsTemperature });
                    hashtagsStr = await executePipelineStep(
                        'TITLES DESCRIPTIONS HASHTAGS HASHTAGS',
                        hashtagsChain,
                        { 
                            songLyrics: segmentLines,
                            videoPrompt: segmentVideoPrompts,
                            globalStyle: global_style
                        },
                        false // Don't parse as JSON, hashtags are returned as plain string
                    );
                    if (hashtagsStr && typeof hashtagsStr === 'string') {
                        hashtags = hashtagsStr.trim();
                    } else {
                        if (options.emitLog && options.requestId) {
                            options.emitLog(`❌ Failed to generate hashtags for segment ${segmentIndex + 1}. Retrying...`, options.requestId);
                        }
                        break; // Retry the whole pipeline
                    }
                } catch (e) {
                    if (options.emitLog && options.requestId) {
                        options.emitLog(`❌ Error generating hashtags for segment ${segmentIndex + 1}: ${e instanceof Error ? e.message : String(e)}`, options.requestId);
                    }
                    break; // Retry the whole pipeline
                }
                
                // Store with segment index
                hashtagsArray.push({ index: segmentIndexValue, hashtags });
            }

            // Check if we have all the required data
            if (titles.length === segments.length && 
                descriptions.length === segments.length && 
                hashtagsArray.length === segments.length) {
                
                if (options.emitLog && options.requestId) {
                    options.emitLog(`✅ Successfully generated all titles, descriptions and hashtags!`, options.requestId);
                }
                
                // Save result to processed folder
                if (options.emitLog && options.requestId) {
                    options.emitLog(`💾 Saving titles, descriptions and hashtags to processed folder...`, options.requestId);
                }
                
                const result = {
                    titles,
                    descriptions,
                    hashtags: hashtagsArray
                };
                
                try {
                    const generationsDir = getGenerationsDir();
                    if (generationsDir) {
                        const processedDir = path.join(generationsDir, 'processed');
                        await fs.mkdir(processedDir, { recursive: true });
                        const fileNumber = await getNextFileNumber(generationsDir);
                        const filename = `${fileNumber}-titles_descriptions_hashtags.json`;
                        const filePath = path.join(processedDir, filename);
                        await fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8');
                        
                        if (options.emitLog && options.requestId) {
                            options.emitLog(`💾 Saved to: ${filename}`, options.requestId);
                        }
                    }
                } catch (saveError) {
                    if (options.emitLog && options.requestId) {
                        options.emitLog(`⚠️ Warning: Failed to save result: ${saveError instanceof Error ? saveError.message : String(saveError)}`, options.requestId);
                    }
                }
                
                finished = true;
                return result;
            } else {
                if (options.emitLog && options.requestId) {
                    options.emitLog(`❌ Incomplete data generated. Expected ${segments.length} items, got: titles=${titles.length}, descriptions=${descriptions.length}, hashtags=${hashtagsArray.length}. Retrying...`, options.requestId);
                }
            }
        } catch (error) {
            if (options.emitLog && options.requestId) {
                options.emitLog(`❌ Error in titles, descriptions and hashtags generation: ${error instanceof Error ? error.message : String(error)}`, options.requestId);
            }
        }
    }

    throw new Error(`Failed to generate titles, descriptions and hashtags after ${maxAttempts} attempts`);
}
