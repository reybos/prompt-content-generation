/**
 * Prompts module
 * Exports all prompt templates
 */

import { scriptPrompt } from './scriptPrompt.js';
import { characterPrompt } from './characterPrompt.js';
import { mediaPrompt } from './mediaPrompt.js';
import { enhanceMediaPrompt, shortenVideoPrompt } from './enhanceMediaPrompt.js';
import { narrationPrompt } from './narrationPrompt.js';
import { musicPrompt } from './musicPrompt.js';
import { titleDescPrompt } from './titleDescPrompt.js';
import { hashtagsPrompt } from './hashtagsPrompt.js';

export {
    scriptPrompt,
    characterPrompt,
    mediaPrompt,
    enhanceMediaPrompt,
    narrationPrompt,
    musicPrompt,
    titleDescPrompt,
    hashtagsPrompt,
    shortenVideoPrompt,
};