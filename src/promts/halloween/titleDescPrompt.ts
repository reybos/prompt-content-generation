/**
 * Optimized Title Prompt for Halloween Song Shorts
 * Generates TITLE for kids' Halloween song videos with spooky animal characters, optimized for Shorts growth, SEO, and engagement
 */

import {PromptTemplate} from '@langchain/core/prompts';

const halloweenTitlePromptTemplate: string = `You are a senior YouTube content strategist and SEO expert specializing in children's content and viral Shorts optimization.
Generate a YouTube TITLE for a kids' Halloween song video featuring spooky animal characters based on these inputs:
- Song Lyrics: {songLyrics}
- Video Prompt: {videoPrompt}
- Global Style: {globalStyle}

GOALS:
• Maximize Shorts CTR and watch time (engaging, curiosity-driven wording)
• Optimize for search discoverability (SEO keywords, trending phrases, parent-focused terms)
• Appeal to kids (fun, spooky but safe, colorful) and parents (safe, educational)
• Encourage engagement (likes, comments, subscriptions)

---

📌 **TITLE STRATEGY**:
• Pattern: "[Halloween Theme] Spooky Animal Sounds Song | [Extra Context for Kids/Parents] | [Fun Hook]"
• Include Halloween theme (Spooky, Haunted, Witch's, Ghostly, etc.), "Spooky Animal Sounds Song"
• Add main spooky characters/animals (Ghost Cat, Witch's Owl, Vampire Bat, etc.)
• Use 2–4 relevant emojis (🎃 👻 🦇 🐱 🦉 🕷️)
• Keep 10–18 words for Shorts display
• Keep it punchy, easy to read, curiosity-driven

💡 TITLE EXAMPLES:
- "Spooky Halloween Animal Sounds Song 🎃👻 | Fun Songs for Kids | Nursery Rhymes with Ghosts"
- "Witch's Spooky Animal Adventure 🦇🦉 | Halloween Songs for Toddlers | Fun Learning Songs for Kids"
- "Haunted Farm Animal Sounds Song 👻🐱 | Halloween Nursery Rhymes for Kids | Educational Songs for Preschoolers"

---

OUTPUT (STRICT JSON ONLY, NO EXTRA TEXT):
{{
  "title": "Catchy, SEO-optimized Halloween title with 2–4 emojis, 10–18 words"
}}

INPUT:
Song Lyrics: {songLyrics}
Video Prompt: {videoPrompt}
Global Style: {globalStyle}

OUTPUT:
(Return only valid JSON as shown above)
`;

const halloweenTitlePrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["songLyrics", "videoPrompt", "globalStyle"],
    template: halloweenTitlePromptTemplate
});

export function logTitlePrompt(songLyrics: string, videoPrompt: string, globalStyle: string): void {
    console.log('\n=== HALLOWEEN TITLE PROMPT ===');
    console.log('Song Lyrics:', songLyrics);
    console.log('Video Prompt:', videoPrompt);
    console.log('Global Style:', globalStyle);
    console.log('================================\n');
}

export {
    halloweenTitlePrompt,
};