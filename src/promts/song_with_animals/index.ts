/**
 * Song with animals prompts module
 * Exports all prompt templates for song with animals pipeline
 */

export { imagePrompt, createImagePromptWithStyle } from './imagePrompt.js';
export { 
    songWithAnimalsTitleDescPrompt, 
    songWithAnimalsTitleDescPromptLyricsOnly,
    logTitleDescPrompt
} from './titleDescPrompt.js';
export { 
    songWithAnimalsHashtagsPrompt, 
    songWithAnimalsHashtagsPromptLyricsOnly 
} from './hashtagsPrompt.js';
export { songWithAnimalsVideoPrompt, logVideoPrompt } from './videoPrompt.js'; 