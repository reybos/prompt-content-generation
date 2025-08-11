/**
 * Song with animals prompts module
 * Exports all prompt templates for song with animals pipeline
 */

import { imagePrompt } from './imagePrompt.js';
import { songWithAnimalsTitleDescPrompt, songWithAnimalsTitleDescPromptLyricsOnly } from './titleDescPrompt.js';
import { songWithAnimalsHashtagsPrompt, songWithAnimalsHashtagsPromptLyricsOnly } from './hashtagsPrompt.js';
import { songWithAnimalsVideoPrompt } from './videoPrompt.js';

export {
    imagePrompt,
    songWithAnimalsTitleDescPrompt,
    songWithAnimalsTitleDescPromptLyricsOnly,
    songWithAnimalsHashtagsPrompt,
    songWithAnimalsHashtagsPromptLyricsOnly,
    songWithAnimalsVideoPrompt,
}; 