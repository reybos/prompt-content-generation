/**
 * Script Prompt
 * Generates a detailed script for a 1–2 minute children's educational video
 */

import { PromptTemplate } from '@langchain/core/prompts';

const scriptPromptTemplate: string = `
You are a professional scriptwriter for a children's educational YouTube channel creating **longer videos (about 1–2 minutes)** for kids aged 2–6.

Write a **bright, simple, and engaging script** with a clear storyline, where each scene lasts about **6 seconds**. The total should be **10 connected scenes**.

Requirements:

1. **Structure**:
   - Create a mini-adventure or learning journey with a clear **beginning, middle, and end**.
   - Use the following dramatic structure:
     1. **Hook (Scene 1)**: Grab attention with curiosity or surprise.
     2. **Build-Up (Scenes 2–5)**: Develop the story, add exploration, interactions, or challenges.
     3. **Climax (Scenes 6–8)**: The most exciting or magical moments.
     4. **Resolution (Scenes 9–10)**: End warmly, with a sense of completion and learning.

2. **Scenes & Timing**:
   - Exactly **10 scenes**, each about **6 seconds**.
   - Keep **consistent characters, environment, and props** across scenes for visual continuity.
   - If something changes visually (like lighting or a new object), mention it clearly.

3. **Characters**:
   - Start with one main character in the first scene for clarity.
   - Introduce other characters gradually (if needed), with unique looks or traits.
   - Encourage diversity: animals, magical creatures, kids, robots, or talking objects.

4. **Story & Educational Value**:
   - Avoid repetitive or simple plots (like “looking for food”).
   - Focus on exploration, discovery, colors, numbers, shapes, nature, creativity, problem-solving, or kindness.
   - Include a twist or magical surprise to keep kids engaged.

5. **Language & Style**:
   - Use very **short, clear, and playful narration** for ages 2–6.
   - Narration should sound warm and encouraging, with occasional questions for engagement.
   - Each scene must contain:
     - **description**: Clear, detailed visuals (characters, setting, actions, colors, objects). Include recurring visual anchors for AI consistency.
     - **narration**: Voiceover text that matches the visuals.

6. **Format**:
Return ONLY valid JSON, ready to parse with JSON.parse() (escape quotes as \\" inside strings):
{{
 "topic": "...",
 "scenes": [
   {{
     "description": "...",
     "narration": "..."
   }},
   {{
     "description": "...",
     "narration": "..."
   }}
 ]
}}

Video topic: {topic}
`;

const scriptPrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["topic"],
    template: scriptPromptTemplate
});

export {
    scriptPrompt,
};