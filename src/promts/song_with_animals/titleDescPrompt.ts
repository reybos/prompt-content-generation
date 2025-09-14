/**
 * Optimized Title Prompt for Animal Song Shorts
 * Generates TITLE for kids' song videos with animal characters, optimized for Shorts growth, SEO, and engagement
 */

import {PromptTemplate} from '@langchain/core/prompts';

const songWithAnimalsTitlePromptTemplate: string = `You are a senior YouTube content strategist and SEO expert specializing in children's content and viral Shorts optimization.
Generate a YouTube TITLE for a kids' song video featuring animal characters based on these inputs:
- Song Lyrics: {songLyrics}
- Video Prompt: {videoPrompt}
- Global Style: {globalStyle}

GOALS:
• Maximize Shorts CTR and watch time (engaging, curiosity-driven wording)
• Optimize for search discoverability (SEO keywords, trending phrases, parent-focused terms)
• Appeal to kids (fun, colorful, simple) and parents (safe, educational)
• Encourage engagement (likes, comments, subscriptions)

---

📌 **TITLE STRATEGY**:
• Pattern: "[Theme/Setting] Animal Sounds Song | [Extra Context for Kids/Parents] | [Fun Hook]"
• Include theme (Farm, Jungle, Ocean, Space, Safari, etc.), "Animal Sounds Song"
• Add main characters/animals (Cow, Sheep, Chickens, etc.)
• Use 2–4 relevant emojis (🎶 🐄 🐞 🚀 🎃 🦊)
• Keep 10–18 words for Shorts display
• Keep it punchy, easy to read, curiosity-driven

💡 TITLE EXAMPLES:
- "Halloween Farm Animal Sounds Song 🎃 | Fun Songs for Kids | Nursery Rhymes with Animals"
- "Robot Insect Adventure 🐞🤖 | Bug Sounds for Toddlers | Fun Learning Songs for Kids"
- "Space Animal Sounds Song 🚀🐱 | Nursery Rhymes for Kids | Educational Songs for Preschoolers"

---

OUTPUT (STRICT JSON ONLY, NO EXTRA TEXT):
{{
  "title": "Catchy, SEO-optimized title with 2–4 emojis, 10–18 words"
}}

INPUT:
Song Lyrics: {songLyrics}
Video Prompt: {videoPrompt}
Global Style: {globalStyle}

OUTPUT:
(Return only valid JSON as shown above)
`;

const songWithAnimalsTitlePrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["songLyrics", "videoPrompt", "globalStyle"],
    template: songWithAnimalsTitlePromptTemplate
});

export function logTitlePrompt(songLyrics: string, videoPrompt: string, globalStyle: string): void {
    console.log('\n=== SONG WITH ANIMALS TITLE PROMPT ===');
    console.log('Song Lyrics:', songLyrics);
    console.log('Video Prompt:', videoPrompt);
    console.log('Global Style:', globalStyle);
    console.log('=====================================\n');
}

export {
    songWithAnimalsTitlePrompt,
};