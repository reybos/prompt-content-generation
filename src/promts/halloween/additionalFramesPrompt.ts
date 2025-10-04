import { PromptTemplate } from '@langchain/core/prompts';

/**
 * Halloween group image prompt template
 * Creates group thumbnails for every 3 characters
 */
export const halloweenGroupImagePrompt = PromptTemplate.fromTemplate(`
You are an expert in creating YouTube videos and thumbnails. Your task is to combine three individual character prompts into a single group prompt for generating a thumbnail image.  

Inputs:  
- global_style: a short style description that sets the shared artistic and atmospheric tone  
- prompts: three structured inputs, each containing a "line" and a detailed "prompt" describing one Halloween-style patchwork character  

Instructions:  
1. Carefully read the three input prompts and extract the key character details (appearance, patchwork fabrics, glowing eyes, stitched features, posture, and personality).  
2. Write a **single unified group prompt** in the same descriptive style as the examples.  
3. The output must:  
   - Describe all three characters together in one scene, each with their unique traits preserved.  
   - Explicitly state that all characters are **standing side by side on the ground** and **facing the camera**.  
   - Include environment details (fog, pumpkins, moonlight, graveyard, forest, garden, etc.) consistent with the given global_style.  
   - End with a short "Environment" paragraph that sets the atmosphere, ground texture, lighting, and mood.  
   - Match the tone of the provided examples: spooky yet family-friendly, whimsical Halloween atmosphere.  
4. **CRITICAL: The final group prompt must be NO LONGER than 1500 characters. Be concise and precise.**
5. Output only the final group prompt, without explanations, quotes, or additional commentary.  

Now combine the provided global_style and three prompts into one final thumbnail prompt.

Format of the answer:
Rewrite the scene description in this format:
A group of three [style] characters stand together in [environment]:
 • Character 1 — [short physical description]. 
 • Character 2 — [short physical description]. 
 • Character 3 — [short physical description]. 

Environment Animation:  
[Describe subtle].

Global Style: {globalStyle}

Three Character Prompts:
{prompts}

Return your response as a JSON object with the following structure:
{{
  "group_image_prompt": "The unified group prompt for thumbnail generation"
}}
`);

/**
 * Halloween group video prompt template
 * Creates animated video prompts for group thumbnails
 */
export const halloweenGroupVideoPrompt = PromptTemplate.fromTemplate(`
You are an expert in creating short animated video prompts for YouTube. You will receive a description of a static illustration showing three characters and their environment. Your task is to transform it into a video description with subtle, natural motions.

Rules:
	•	Characters must remain firmly on the ground, with no feet or limbs lifting off.
	•	Movements are minimal, calm, and natural (gentle breathing, slight body sway, slow head tilt, subtle finger or fabric motions).
	•	Each character should have distinct but very simple movements that fit its nature.
	•	No blinking, no speaking, no large gestures, no rotation around their axis.
	•	Characters stay in place.
	•	Environment has soft background motion (mist drifting, lanterns flickering, shadows shifting).
	•	Keep the same style, mood, and atmosphere as in the original image prompt.
	•	**CRITICAL: The final video prompt must be NO LONGER than 1500 characters. Be concise and precise.**

Format of the answer:
Rewrite the scene description in this format:
A group of three [style] characters stand together in [environment]:
 • Character 1 — [short physical description]. [Describe its minimal, subtle motions].  
 • Character 2 — [short physical description]. [Describe its minimal, subtle motions].  
 • Character 3 — [short physical description]. [Describe its minimal, subtle motions].  

Environment Animation:  
[Describe subtle, looping environmental motions].  

Style & Movement Rules:  
[Summarize that characters remain still on the ground with only minimal in-place motions, no blinking, no speaking, no exaggerated actions].  

Group Image Prompt:
{groupImagePrompt}

Return your response as a JSON object with the following structure:
{{
  "group_video_prompt": "The animated video prompt for the group scene"
}}
`);

/**
 * Log the group image prompt for debugging
 * @param globalStyle - The global style
 * @param prompts - The three character prompts
 */
export function logHalloweenGroupImagePrompt(
  globalStyle: string,
  prompts: string
): void {
  console.log('=== HALLOWEEN GROUP IMAGE PROMPT ===');
  console.log('Global Style:', globalStyle);
  console.log('Three Character Prompts:', prompts);
  console.log('====================================');
}

/**
 * Log the group video prompt for debugging
 * @param groupImagePrompt - The group image prompt
 */
export function logHalloweenGroupVideoPrompt(
  groupImagePrompt: string
): void {
  console.log('=== HALLOWEEN GROUP VIDEO PROMPT ===');
  console.log('Group Image Prompt:', groupImagePrompt);
  console.log('====================================');
}
