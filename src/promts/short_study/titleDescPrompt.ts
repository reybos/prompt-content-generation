// Optimized Short Study Title and Description Prompt for YouTube Shorts
// Generates concise, SEO-optimized, engaging titles, descriptions, and hashtags for children's educational Shorts

import {PromptTemplate} from '@langchain/core/prompts';

export const shortStudyTitleDescPrompt = new PromptTemplate({
    inputVariables: ["topicDescription", "song_text"],
    template: `You are a senior YouTube content strategist and SEO expert specializing in **children's educational Shorts**.  

Input: study topic description ({topicDescription}) and song text ({song_text}).

TASK:
1. Generate a **catchy, SEO-optimized title** (max 70 characters) for toddlers (ages 2-6) and parents:
   • Include main keywords from topic and song (e.g., "firefighter song", "animal sounds")  
   • Make it curiosity-driven, fun, and easy to read  
   • Add 1–2 relevant emojis (🎶 🐶 👷‍♂️ 🐞 🚀 etc.)  
   • Keep it short, punchy, **Shorts-friendly**, and suitable to catch attention in the first 3 seconds

2. Generate an **educational, engaging description** (50–100 words optimized for Shorts audience):
   • Hook: 1–2 sentences with emojis that immediately grab attention  
   • Learning Summary: 3–4 bullet points of what children will learn (vocabulary, sounds, actions, pretend play)  
   • Naturally include main keywords in first 1–2 sentences  
   • Escape newlines (\\n) and quotes (\\"), fully suitable for Shorts format

3. Avoid repetition, filler phrases, or long blocks; keep it **clear, concise, persuasive**  
4. Ensure **SEO keywords appear early**, and description is optimized for YouTube Shorts audience and recommendation algorithms  

CRITICAL OUTPUT FORMAT:
• Return ONLY valid JSON, no markdown or extra text  
• Start with {{ and end with }}  
• Double quotes for all strings  
• Escape special characters
• NO control characters, NO unescaped newlines, NO unescaped quotes

EXAMPLE OUTPUT:
{{
  "title": "Hello Teacher Song 👩‍🏫 | Clap, Sing & Move 🎶",
  "description": "Clap, sing, and move along with the cheerful Hello Teacher Song! 🌟\\n\\nWhat kids will learn:\\n- Greet teachers & classmates 🙋‍♂️🙋‍♀️\\n- Fun clapping & tapping rhythm 👏\\n- Boost confidence & love for learning 🌈\\n\\nSafe, playful, and educational! Perfect for toddlers & preschoolers.\\nSubscribe for more fun kids songs & interactive Shorts! 🔔\\n#shorts #kidsongs #nurseryrhymes #teacher #learningfun"
}}

INPUT:
Topic: {topicDescription}
Song Text: {song_text}

OUTPUT (JSON ONLY):`
});

export function logTitleDescPrompt(topicDescription: string, songText: string): void {
    console.log('\n=== SHORT STUDY TITLE & DESCRIPTION PROMPT ===');
    console.log('Topic Description:', topicDescription);
    console.log('Song Text:', songText);
    console.log('===============================================\n');
}