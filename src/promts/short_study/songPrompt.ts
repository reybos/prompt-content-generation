// Short Study Song Prompt
// Generates children's songs and music prompts for study topics

import {PromptTemplate} from '@langchain/core/prompts';

export const shortStudySongPrompt = new PromptTemplate({
    inputVariables: ["topicDescription"],
    template: `You are a professional children's songwriter.

Task:
- Given the topic: {topicDescription}, write a **short, catchy, and fun song** for toddlers (ages 2–6).
- The song should **last about 10 seconds**.
- Use **simple, repetitive, and rhythmic phrases** that are easy to sing and remember.
- Include the topic naturally in the lyrics.
- Add playful words, onomatopoeia, or short exclamations to make it more engaging.

Then, create a **music style description** (maximum 600 characters) that can be used in Suno.com as a "style" field.
- This must NOT include the lyrics.  
- It should describe the instrumentation, mood, tempo, and vibe.  
- Style: bright, playful, fun, catchy, and child-friendly (like nursery rhymes, kids pop, or cheerful cartoon music).  

CRITICAL OUTPUT FORMAT REQUIREMENTS:
1. Return ONLY valid JSON - no markdown, no code blocks, no extra text
2. Start response with {{ and end with }}
3. Use double quotes for all strings
4. Escape ALL special characters in strings
5. NO control characters, NO unescaped newlines, NO unescaped quotes

EXAMPLE OF CORRECT FORMAT:
{{ "song_text": "the complete song lyrics", "music_prompt": "Upbeat, cheerful children's music with bright ukulele, playful xylophone, hand claps, and bouncy rhythm. Light percussion and sing-along vibe, like a fun nursery rhyme or kids cartoon soundtrack." }}

INPUT:
{topicDescription}
OUTPUT (JSON ONLY):`
});
