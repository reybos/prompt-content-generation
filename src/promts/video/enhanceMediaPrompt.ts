/**
 * Enhance Media Prompt
 * Improves media prompts for consistency across scenes
 */

import { PromptTemplate } from '@langchain/core/prompts';
import { shortenVideoPrompt } from './shortenVideoPrompt.js';

const enhanceMediaPromptTemplate: string = `
You are improving prompts for image and video generation for a children's educational video.

Here are the current prompts for each scene (in JSON array format):
{media_prompts}

Here is the detailed main character description:
{character}

Here is the script of the video:
{script}

Your task:
For Scene 0, enhance both the image and video prompts with more specific details about the main character. For all subsequent scenes, enhance only the video prompts. Make sure the character's appearance, style, and unique features are always the same and clearly match the character description across all scenes, emphasizing their key traits and accessories. Keep prompts concise and focused on the main action, emotion, and educational topic. Avoid over-describing transitions or every small action, and let transitions between scenes be natural and simple unless a specific transition is essential to the story or educational content.

* CRITICAL SIMPLICITY & STYLE REQUIREMENTS FOR ALL PROMPTS:
 - Limit each scene to 1–3 main focus objects that are the clear center of attention
 - Use a relatable, simple setting (e.g., a road, a park, a garden, a room) that a child can imagine
 - Only the main object(s) should have prominent movement; background elements should move gently or remain mostly still
 - Avoid scenes crowded with too many characters or items
 - The composition must be minimalist and uncluttered
 - Avoid busy or crowded scenes; keep details to a minimum and use simple shapes
 - All visuals must be in a flat, 2D cartoon style (no 3D, no realistic shading, no volumetric lighting)
 - Use simple shapes, bold outlines, and bright, solid colors
 - Avoid photorealism, gradients, or complex textures
 - All elements should look like classic flat cartoons or children’s book illustrations
 - Environments and characters should be playful, stylized, and easy for children to understand

* IMPORTANT - SCENE DURATION:
 - Each scene has a specific duration value (either 6 or 10 seconds)
 - DO NOT modify the duration values provided in the input
 - Preserve the exact duration value for each scene in your output
 - The duration is provided as a separate field in the JSON, not in the prompt text

IMPORTANT:
* DO NOT include any dialogue or specific phrases that characters say in your prompts. Also, DO NOT add any words, letters, numbers or symbols to display in prompt! This breaks video generation and causes text to appear in the video.
* Instead, enhance descriptions of facial expressions, body language, and emotions to convey meaning.
* Focus on the main visual elements, actions, and reactions rather than speech or step-by-step transitions.
* Add facial expressions (e.g., "with a surprised expression," "looking curious with wide eyes," "smiling excitedly") to help convey the character's emotions.
* Ensure consistent appearance details across all scenes (same clothing, accessories, color palette, etc.).
* If any existing prompts contain dialogue, remove it and replace with appropriate visual descriptions.
* The composition should be uncluttered and easy for children to understand.

* MAINTAIN SCENE-TO-SCENE CONTINUITY:
 - Ensure consistent environment and setting across all scenes, but do not accumulate objects or details unless essential
 - If a new object is important to the scene, mention its presence and how it fits into the scene, but avoid describing every step of how the character interacts with objects unless it is essential to the story or educational topic.
 - Keep transitions gentle and simple; avoid complex or abrupt changes.

* CRITICAL - VIDEO GENERATION CONTEXT LIMITATIONS:
 - The video generation system will NOT have access to previous prompts or scene descriptions
 - It will ONLY have the last image frame from the previous video as a reference point
 - Any visual element that should persist between scenes must be explicitly described again in each new scene

* MAINTAIN TOPIC CONSISTENCY:
 - Ensure the main educational topic from the script is visually represented in EVERY scene
 - Include visual elements, props, or environmental details that clearly relate to the topic
 - Make the topic visually recognizable even without narration

Return the improved prompts as a JSON array without any markdown formatting or code blocks. The JSON structure should include image_prompt only for Scene 0, video_prompt for all scenes, and duration for all scenes:
[
 {{ "scene": 0, "scene_type": "introduction", "image_prompt": "...", "video_prompt": "...", "duration": 6 }},
 {{ "scene": 1, "scene_type": "main", "video_prompt": "...", "duration": 10 }},
 {{ "scene": 2, "scene_type": "main", "video_prompt": "...", "duration": 6 }},
 ...
 {{ "scene": "final", "scene_type": "finale", "video_prompt": "...", "duration": 10 }}
]

IMPORTANT: The duration field must be preserved exactly as it was in the input. Only the values 6 and 10 are allowed, with no additional symbols or text.
CRITICAL: Each video_prompt and image_prompt in the output must be no more than 1500 characters in length.
`;

const enhanceMediaPrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["media_prompts", "character", "script"],
    template: enhanceMediaPromptTemplate
});

export {
    enhanceMediaPrompt,
    shortenVideoPrompt,
};
/* END GENAI */