/**
 * Hashtags Prompt for Song with Animals
 * Generates hashtags for songs with animal characters targeting broad audience
 */

import {PromptTemplate} from '@langchain/core/prompts';

const songWithAnimalsHashtagsPromptTemplate: string = `You are a social media expert specializing in viral content optimization.
Input is a segment from a song with animal characters ({songLyrics}) and its corresponding video prompt ({videoPrompt}).

TASK
Generate high-performing hashtags for a video featuring this song segment and video content, optimized for search and discovery algorithms.

HASHTAG STRATEGY (Follow proven viral formula):
• Use fewer, more targeted hashtags (6-10 total) like successful channels
• Include core music hashtags (#nurseryrhymes, #kidssongs, #animalsounds)
• Include animal-specific hashtags based on the song content
• Include theme-specific hashtags when applicable (e.g., #halloween, #safari, #dinosaur)
• Include discovery hashtags (#viralshorts, #viralreels, #fyp)
• Include educational hashtags (#learning, #animals, #children)
• Focus on quality over quantity - each hashtag should be highly relevant
• No spaces in hashtags, use camelCase if needed

EXAMPLES OF SUCCESSFUL HASHTAG COMBINATIONS:
#animals #viralvideo #nurseryrhymes #kidssongs #halloween #children #farmanimals #viralshort #viralshorts #fyp
#safarianimals #animalsoundsong #nurseryrhymes #kidssongs #animals #animalsounds #safari #farmanimals #learning
#viralshorts #viralreels #viralshort #dinosaur #animals #animalsounds #cocomelon #dinosaurs

OUTPUT:
Return only the hashtags as a single string, separated by spaces, no extra text or commentary.

INPUT:
Song Lyrics: {songLyrics}
Video Prompt: {videoPrompt}
Global Style: {globalStyle}

OUTPUT:
(return hashtags as space-separated string)`;

const songWithAnimalsHashtagsPrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["songLyrics", "videoPrompt", "globalStyle"],
    template: songWithAnimalsHashtagsPromptTemplate
});

// Backward compatible version for lyrics-only input
const songWithAnimalsHashtagsPromptLyricsOnlyTemplate: string = `You are a social media expert specializing in viral content optimization.
Input is a segment from a song with animal characters ({songLyrics}).

TASK
Generate high-performing hashtags for a video featuring this song segment, optimized for search and discovery algorithms.

HASHTAG STRATEGY (Follow proven viral formula):
• Use fewer, more targeted hashtags (6-10 total) like successful channels
• Include core music hashtags (#nurseryrhymes, #kidssongs, #animalsounds)
• Include animal-specific hashtags based on the song content
• Include theme-specific hashtags when applicable (e.g., #halloween, #safari, #dinosaur)
• Include discovery hashtags (#viralshorts, #viralreels, #fyp)
• Include educational hashtags (#learning, #animals, #children)
• Focus on quality over quantity - each hashtag should be highly relevant
• No spaces in hashtags, use camelCase if needed

EXAMPLES OF SUCCESSFUL HASHTAG COMBINATIONS:
#animals #viralvideo #nurseryrhymes #kidssongs #halloween #children #farmanimals #viralshort #viralshorts #fyp
#safarianimals #animalsoundsong #nurseryrhymes #kidssongs #animals #animalsounds #safari #farmanimals #learning
#viralshorts #viralreels #viralshort #dinosaur #animals #animalsounds #cocomelon #dinosaurs

OUTPUT:
Return only the hashtags as a single string, separated by spaces, no extra text or commentary.

INPUT:
{songLyrics}

OUTPUT:
(return hashtags as space-separated string)`;

const songWithAnimalsHashtagsPromptLyricsOnly: PromptTemplate = new PromptTemplate({
    inputVariables: ["songLyrics"],
    template: songWithAnimalsHashtagsPromptLyricsOnlyTemplate
});

export {
    songWithAnimalsHashtagsPrompt,
    songWithAnimalsHashtagsPromptLyricsOnly,
}; 