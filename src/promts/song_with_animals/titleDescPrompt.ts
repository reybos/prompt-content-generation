/**
 * Title and Description Prompt for Song with Animals
 * Generates title and description for songs with animal characters targeting broad audience
 */

import {PromptTemplate} from '@langchain/core/prompts';

const songWithAnimalsTitleDescPromptTemplate: string = `You are a social media expert specializing in viral content optimization.
Input is a segment from a song with animal characters ({songLyrics}) and its corresponding video prompt ({videoPrompt}).

TASK
Generate an engaging title and description for a video featuring this song segment and video content, optimized for search and discovery algorithms.

TITLE STRATEGY (Follow proven viral formula):
• Use the pattern: "[Theme/Setting] Animal Sounds Song | [Additional Context] | [Engagement Hook]"
• First part: Include theme/setting + "Animal Sounds Song" (e.g., "Farm Animal Sounds Song", "Safari Animal Sounds Song")
• Second part: Add context like "Animals and [Theme] Song for Kids" or "Nursery Rhyme for Kids"
• Third part: Include engagement keywords like "Fun Nursery Rhymes", "Learn Animal Names", "Fun Songs"
• 15-25 words total for optimal YouTube Shorts display
• Use trending themes and settings when applicable
• Include the main animal character(s) from this segment
• Make it sound educational and entertaining

EXAMPLES OF SUCCESSFUL TITLES:
- "Halloween Farm Animal Sounds Song | Animals and Farm Song for Kids | Fun Nursery Rhymes"
- "Safari Animal Sounds Song | Nursery Rhyme for Kids - Learn Animal Names and Sounds"
- "Dinosaur Sounds Song for Kids | Learn Dinosaurs Names | Fun Nursery Rhyme"

DESCRIPTION STRATEGY (Follow proven viral formula):
• Use longer descriptions like successful channels (150-300 words)
• Structure: Hook + Song Description + Educational Value + Call to Action
• Start with engaging hook: "Get ready for [theme] with [song name]!"
• Describe the song's unique features and animal characters
• Mention educational benefits (learning animal names, sounds, etc.)
• Include references to classic songs when applicable
• Add call-to-action for engagement
• Use trending keywords: "nursery rhymes", "learning", "educational", "fun songs"
• Include emojis strategically for engagement
• Make it sound professional yet entertaining
• Target both children and parents

OUTPUT (JSON, no extra commentary):
{{
  "title": "catchy title here",
  "description": "engaging description with emojis here"
}}

INPUT:
Song Lyrics: {songLyrics}
Video Prompt: {videoPrompt}
Global Style: {globalStyle}

OUTPUT:
(return JSON exactly as described)`;

const songWithAnimalsTitleDescPrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["songLyrics", "videoPrompt", "globalStyle"],
    template: songWithAnimalsTitleDescPromptTemplate
});

// Функция для логирования title/description промта
export function logTitleDescPrompt(songLyrics: string, videoPrompt: string, globalStyle: string): void {
    const fullTitleDescPrompt = songWithAnimalsTitleDescPromptTemplate
        .replace('{songLyrics}', songLyrics)
        .replace('{videoPrompt}', videoPrompt)
        .replace('{globalStyle}', globalStyle);
    
    console.log('=== TITLE/DESCRIPTION PROMPT SENT TO LLM ===');
    console.log('Full Title/Description Prompt:');
    console.log(fullTitleDescPrompt);
    console.log('=== END TITLE/DESCRIPTION PROMPT ===');
}

// Backward compatible version for lyrics-only input
const songWithAnimalsTitleDescPromptLyricsOnlyTemplate: string = `You are a social media expert specializing in viral content optimization.
Input is a segment from a song with animal characters ({songLyrics}).

TASK
Generate an engaging title and description for a video featuring this song segment, optimized for search and discovery algorithms.

TITLE STRATEGY (Follow proven viral formula):
• Use the pattern: "[Theme/Setting] Animal Sounds Song | [Additional Context] | [Engagement Hook]"
• First part: Include theme/setting + "Animal Sounds Song" (e.g., "Farm Animal Sounds Song", "Safari Animal Sounds Song")
• Second part: Add context like "Animals and [Theme] Song for Kids" or "Nursery Rhyme for Kids"
• Third part: Include engagement keywords like "Fun Nursery Rhymes", "Learn Animal Names", "Fun Songs"
• 15-25 words total for optimal YouTube Shorts display
• Use trending themes and settings when applicable
• Include the main animal character(s) from this segment
• Make it sound educational and entertaining

EXAMPLES OF SUCCESSFUL TITLES:
- "Halloween Farm Animal Sounds Song | Animals and Farm Song for Kids | Fun Nursery Rhymes"
- "Safari Animal Sounds Song | Nursery Rhyme for Kids - Learn Animal Names and Sounds"
- "Dinosaur Sounds Song for Kids | Learn Dinosaurs Names | Fun Nursery Rhyme"

DESCRIPTION STRATEGY (Follow proven viral formula):
• Use longer descriptions like successful channels (150-300 words)
• Structure: Hook + Song Description + Educational Value + Call to Action
• Start with engaging hook: "Get ready for [theme] with [song name]!"
• Describe the song's unique features and animal characters
• Mention educational benefits (learning animal names, sounds, etc.)
• Include references to classic songs when applicable
• Add call-to-action for engagement
• Use trending keywords: "nursery rhymes", "learning", "educational", "fun songs"
• Include emojis strategically for engagement
• Make it sound professional yet entertaining
• Target both children and parents

OUTPUT (JSON, no extra commentary):
{{
  "title": "catchy title here",
  "description": "engaging description with emojis here"
}}

INPUT:
{songLyrics}

OUTPUT:
(return JSON exactly as described)`;

const songWithAnimalsTitleDescPromptLyricsOnly: PromptTemplate = new PromptTemplate({
    inputVariables: ["songLyrics"],
    template: songWithAnimalsTitleDescPromptLyricsOnlyTemplate
});

export {
    songWithAnimalsTitleDescPrompt,
    songWithAnimalsTitleDescPromptLyricsOnly,
}; 