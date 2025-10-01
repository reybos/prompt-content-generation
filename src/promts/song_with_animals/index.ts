/**
 * Song with animals prompts module
 * Exports all prompt templates for song with animals pipeline
 */

export { imagePrompt, createImagePromptWithStyle } from './imagePrompt.js';
export { 
    songWithAnimalsTitlePrompt, 
    logTitlePrompt
} from './titleDescPrompt.js';
export { songWithAnimalsVideoPrompt, logVideoPrompt } from './videoPrompt.js';
export { 
    songWithAnimalsGroupImagePrompt,
    songWithAnimalsGroupVideoPrompt,
    logSongWithAnimalsGroupImagePrompt,
    logSongWithAnimalsGroupVideoPrompt
} from './additionalFramesPrompt.js'; 