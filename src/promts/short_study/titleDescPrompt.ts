// Short Study Title and Description Prompt
// Generates SEO-optimized title and description for children's educational videos

import {PromptTemplate} from '@langchain/core/prompts';

export const shortStudyTitleDescPrompt = new PromptTemplate({
    inputVariables: ["topicDescription", "song_text"],
    template: `You are an expert content creator specializing in **children's educational YouTube Shorts**.

Input is a study topic description ({topicDescription}) and song text ({song_text}).

TASK:
1. Use the topic description and song text to generate an **engaging, SEO-optimized title** suitable for toddlers (ages 2-6) and their parents.
2. Generate an **informative, fun, and educational description** optimized for YouTube search, using relevant keywords from the topic and song text.
3. Make the title **short, catchy, and easy to read** (max 70 characters).
4. Make the description **up to 3000 characters**, including:
   - Brief summary of what children will learn
   - Engaging language for kids and parents
   - Call-to-action (like subscribe, watch more, etc.)
   - Relevant keywords naturally integrated
5. Ensure the title and description are fully suitable for **YouTube Shorts format**.

CRITICAL OUTPUT FORMAT REQUIREMENTS:
1. Return ONLY valid JSON - no markdown, no code blocks, no extra text
2. Start response with {{ and end with }}
3. Use double quotes for all strings
4. Escape ALL special characters in description:
   - Newlines: use \\n (not actual line breaks)
   - Quotes: use \\" (not actual quotes)
   - Backslashes: use \\\\ (not single backslash)
5. Description must be ONE continuous string with escaped newlines
6. NO control characters, NO unescaped newlines, NO unescaped quotes

EXAMPLE OF CORRECT FORMAT:
{{
  "title": "Fun Learning Song for Kids",
  "description": "Learn with this fun song!\\n\\nWhat kids will learn:\\n- Basic concepts\\n- Fun activities\\n\\nSubscribe for more!"
}}

INPUT:
Topic: {topicDescription}
Song Text: {song_text}

OUTPUT (JSON ONLY):`
});

export function logTitleDescPrompt(topicDescription: string, songText: string, globalStyle: string): void {
  console.log('\n=== SHORT STUDY TITLE & DESCRIPTION PROMPT ===');
  console.log('Topic Description:', topicDescription);
  console.log('Song Text:', songText);
  console.log('Global Style:', globalStyle);
  console.log('===============================================\n');
}
