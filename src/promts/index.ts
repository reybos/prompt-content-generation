/**
 * Prompts module
 * Exports all prompt templates
 */

import { narrationPrompt } from './long_study/narrationPrompt.js';
import { enhanceMediaPrompt } from './long_study/enhanceMediaPrompt.js';
import { mediaPrompt } from './long_study/mediaPrompt.js';
import { scriptPrompt } from './long_study/scriptPrompt.js';
import { titleDescPrompt } from './long_study/titleDescPrompt.js';
import { musicPrompt } from './long_study/musicPrompt.js';
import { hashtagsPrompt } from './long_study/hashtagsPrompt.js';
import { characterPrompt } from './long_study/characterPrompt.js';
import { shortenVideoPrompt } from './long_study/shortenVideoPrompt.js';
import { imagePrompt, songWithAnimalsTitlePrompt, songWithAnimalsVideoPrompt, logVideoPrompt, logTitlePrompt, songWithAnimalsGroupImagePrompt, songWithAnimalsGroupVideoPrompt, logSongWithAnimalsGroupImagePrompt, logSongWithAnimalsGroupVideoPrompt } from './song_with_animals/index.js';
import { imagePrompt as halloweenImagePrompt, halloweenTitlePrompt, halloweenVideoPrompt, logVideoPrompt as halloweenLogVideoPrompt, logTitlePrompt as halloweenLogTitlePrompt, halloweenGroupImagePrompt, halloweenGroupVideoPrompt, logHalloweenGroupImagePrompt, logHalloweenGroupVideoPrompt } from './halloween/index.js';
import { horrorVideoPrompt, horrorTitleDescPrompt, horrorHashtagsPrompt } from './horror/index.js';
import { shortStudyVideoPrompt, shortStudyTitleDescPrompt, shortStudyHashtagsPrompt, shortStudySongPrompt, logTitleDescPrompt as shortStudyLogTitleDescPrompt } from './short_study/index.js';

export {
    narrationPrompt,
    enhanceMediaPrompt,
    mediaPrompt,
    scriptPrompt,
    titleDescPrompt,
    musicPrompt,
    hashtagsPrompt,
    characterPrompt,
    shortenVideoPrompt,
    imagePrompt,
    songWithAnimalsTitlePrompt,
    songWithAnimalsVideoPrompt,
    logVideoPrompt,
    logTitlePrompt,
    songWithAnimalsGroupImagePrompt,
    songWithAnimalsGroupVideoPrompt,
    logSongWithAnimalsGroupImagePrompt,
    logSongWithAnimalsGroupVideoPrompt,
    halloweenImagePrompt,
    halloweenTitlePrompt,
    halloweenVideoPrompt,
    halloweenLogVideoPrompt,
    halloweenLogTitlePrompt,
    halloweenGroupImagePrompt,
    halloweenGroupVideoPrompt,
    logHalloweenGroupImagePrompt,
    logHalloweenGroupVideoPrompt,
    horrorVideoPrompt,
    horrorTitleDescPrompt,
    horrorHashtagsPrompt,
    shortStudyVideoPrompt,
    shortStudyTitleDescPrompt,
    shortStudyHashtagsPrompt,
    shortStudySongPrompt,
    shortStudyLogTitleDescPrompt,
};