// Short Study Video Prompt
// Generates video prompts based on song content for children's educational videos

import {PromptTemplate} from '@langchain/core/prompts';

export const shortStudyVideoPrompt = new PromptTemplate({
    inputVariables: ["song_text", "topic_description"],
    template: `You are an expert LLM in creating **engaging YouTube Shorts for children (ages 2-6)**, specializing in educational content.

Input is a song text ({song_text}) and topic description ({topic_description}).

TASK:
1. Use the song text and topic description to create a **high-quality, engaging 10-second video prompt** suitable for toddlers.
2. Make the video **bright, colorful, fun, and dynamic**, with playful characters, smooth animations, and expressive emotions.
3. Focus on visual elements that **illustrate the song lyrics** and reinforce the educational topic.
4. Include suggestions for characters, backgrounds, movements, objects, and interactive elements that will **capture and hold children's attention**.
5. Suggest a style that is **cartoonish or Pixar-like**, cheerful, and visually rich.
6. Think like a top YouTube Shorts creator for toddlers: the video should be **catchy, visually appealing, and instantly engaging**.
7. **IMPORTANT: Break down the video into exactly 3 scenes (beginning, middle, end), regardless of the number of song lines.** Each scene should be timed and described with visual elements that match the overall flow of the song.

TECHNICAL CONSTRAINTS (for your reference only - do NOT include these in the video_prompt):
- Do NOT include any text, letters, symbols, numbers, or written words in the video
- Characters should NOT speak, shout, or make any vocal sounds
- All communication should be through visual expressions, gestures, and actions only

CRITICAL OUTPUT FORMAT REQUIREMENTS:
1. Return ONLY valid JSON - no markdown, no code blocks, no extra text
2. Start response with {{ and end with }}
3. Use double quotes for all strings
4. Escape ALL special characters in strings
5. NO control characters, NO unescaped newlines, NO unescaped quotes

VIDEO GENERATION ELEMENTS TO INCLUDE:
- **Scene breakdown**: Break the 10-second video into exactly 3 timed scenes (e.g., Scene 1: 0-3s, Scene 2: 3-7s, Scene 3: 7-10s)
- **Characters**: Describe main characters, their appearance, expressions, and actions
- **Backgrounds**: Describe settings, colors, and visual environment
- **Movements**: Include camera movements, character actions, and dynamic elements
- **Objects and props**: Describe interactive elements, props, and visual objects
- **Style description**: Overall visual style (Pixar-like, cartoonish, colors, textures)
- **Interactive elements**: Bouncing elements, sparkles, animations that engage toddlers
- **Transitions**: How scenes flow from one to another

EXAMPLE OF CORRECT FORMAT:
{{ "video_prompts": [ {{ "line": "topic description", "video_prompt": "A bright, colorful, cartoonish animation featuring [main characters]. Scene 1 (0-3s): [description of first scene]. Scene 2 (3-7s): [description of second scene]. Scene 3 (7-10s): [description of third scene]. Backgrounds are [description]. Add [movements and camera effects]. The overall style should be [style description]: [specific style details]. Focus on lively visuals and character actions." }} ] }}

INPUT:
Song: {song_text}
Topic: {topic_description}
OUTPUT (JSON ONLY):`
});