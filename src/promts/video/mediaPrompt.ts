/**
 * Media Prompt
 * Generates prompts for image and video generation for a children's educational video
 */

import { PromptTemplate } from '@langchain/core/prompts';

const mediaPromptTemplate: string = `
You are an assistant for creating educational videos for kids aged 2–6.
You are provided with:
* The script of the video, which includes:
 - A "scenes" array (the first element is the introduction, the last is the finale, and the rest are main scenes; each has a title, description, and narration)
 - A "topic" field that defines the main educational subject of the video (for example: "Learning Colors", "Learning Shapes", "Learning Numbers", "Animals", "Learning Letters", "Learning Emotions", "Learning Body Parts", "Learning Weather", "Learning Food", "Learning Transportation", etc.)
* A detailed description of the main character (character sheet)

Your task:
* Ensure that every scene's prompt explicitly incorporates visual elements related to this topic.
* Create media prompts for ALL scenes in the array:
 - The first scene (index 0) is the introduction
 - The last scene is the finale
 - The rest are main scenes
* For Scene 0 (introduction) ONLY:
 - Create a clear, concise prompt for generating an image in Midjourney/DALL-E (in English, always using the main character description, describing the main action, mood, color palette, cartoon style, 2D).
 - Create a prompt for generating a short animation/video (in English, using the main character description, describing the main action, characters, background, cartoonish and vibrant style, 2D, child-friendly).

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
 - Each scene must have a specific duration value
 - Only two duration values are allowed: 6 seconds or 10 seconds
 - Assign an appropriate duration to each scene based on its complexity and content
 - The duration will be included as a separate field in the JSON output, not in the prompt text
* For all subsequent scenes (Scene 1, 2, 3, etc.) and the finale:
 - Create ONLY video prompts
 - Ensure visual continuity between scenes by keeping the character's position, environment, and main visual elements consistent, but do not over-describe transitions or every small action.
 - Keep transitions gentle and simple; avoid complex or abrupt changes.

IMPORTANT: 
* DO NOT include any dialogue or specific phrases that characters say in your prompts. Also, DO NOT add any words, letters, numbers or symbols to display in prompt! This breaks video generation and causes text to appear in the video.
* Instead, describe facial expressions, body language, and emotions to convey meaning.
* Focus on the main visual elements, actions, and reactions rather than speech or step-by-step transitions.
* Include facial expressions (e.g., "with a surprised expression," "looking curious with wide eyes," "smiling excitedly") to help convey the character's emotions.
* Include only a few, simple background or foreground elements to keep the scene uncluttered and easy to understand.

* MAINTAIN SCENE-TO-SCENE CONTINUITY:
 - Ensure consistent environment and setting across all scenes, but do not accumulate objects or details unless essential
 - If a new object is important to the scene, mention its presence and how it fits into the scene, but avoid describing every step of how the character interacts with objects unless it is essential to the story or educational topic.
 - Consider the sequence of scenes as a continuous story where each scene logically follows from the previous one, but keep transitions simple and natural.
 - Avoid "magical" appearances or disappearances of objects between scenes, but do not over-explain object handling.

* CRITICAL - VIDEO GENERATION CONTEXT LIMITATIONS:
 - The video generation system will NOT have access to previous prompts or scene descriptions
 - It will ONLY have the last image frame from the previous video as a reference point

* MAINTAIN TOPIC CONSISTENCY:
 - Ensure the main educational topic from the script is visually represented in EVERY scene
 - Include visual elements, props, or environmental details that clearly relate to the topic
 - Make the topic visually recognizable even without narration

Use simple storylines and wording that are easy for children to understand. 

Here is the script:
{script}

Here is the detailed character description:

{character}

Return the result as a JSON array without any markdown formatting or code blocks:
[
{{ "scene": 0, "scene_type": "introduction", "image_prompt": "...", "video_prompt": "...", "duration": 6 }},
{{ "scene": 1, "scene_type": "main", "video_prompt": "...", "duration": 10 }},
{{ "scene": 2, "scene_type": "main", "video_prompt": "...", "duration": 6 }},
...
{{ "scene": "final", "scene_type": "finale", "video_prompt": "...", "duration": 10 }}
]

Important: Make sure to include media prompts for ALL scenes in the array (introduction, main scenes, and finale).

CRITICAL: Each video_prompt and image_prompt in the output must be no more than 1500 characters in length.
`;

const mediaPrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["script", "character"],
    template: mediaPromptTemplate
});

export {mediaPrompt,};


