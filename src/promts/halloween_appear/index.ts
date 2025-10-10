/**
 * Halloween Appear prompts module
 * Exports all prompt templates for Halloween Appear pipeline
 */

export { imagePrompt, createImagePromptWithStyle } from './imagePrompt.js';
export { 
    halloweenAppearTitlePrompt, 
    logTitlePrompt,
    halloweenAppearLogTitlePrompt
} from './titleDescPrompt.js';
export { 
    halloweenAppearVideoPrompt, 
    logVideoPrompt,
    halloweenAppearLogVideoPrompt
} from './videoPrompt.js';
export { 
    halloweenAppearGroupImagePrompt,
    halloweenAppearGroupVideoPrompt,
    logHalloweenAppearGroupImagePrompt,
    logHalloweenAppearGroupVideoPrompt
} from './additionalFramesPrompt.js'; 