/**
 * Image Prompt for Song with Animals
 * Generates image prompts for songs with animal characters
 */

import {PromptTemplate} from '@langchain/core/prompts';
import { getStyle, VisualStyle } from './styles/styleConfig.js';

const imagePromptTemplate: string = `You are a senior visual director and prompt engineer specializing in viral content for children.
Input is a sequence of valid call-and-response lines from a children's song ({songLyrics}).

VISUAL STYLE CONFIGURATION:
{styleConfiguration}

TASK
1. Use the lines in the given order; each line produces exactly one image prompt.
2. Enhance the base style with the provided style configuration.
3. Background rule: each image has a fitting background, atmospheric but simplified and soft-focused, keeping the character as the main subject.
4. For each line, craft an English prompt including:
   - Character description (appearance, pose, emotion). The description should be detailed.
   - Background concept (following environment style, uncluttered)
   - Colors, lighting, camera perspective
   - Keywords for mood and consistency

BASE STYLE REQUIREMENTS (apply to all images):
• Characters should look at the camera or in a 3/4 playful view
• Characters should be fully visible and occupy up to half of the frame
• Colorful, friendly, detailed, eye-catching
• Cartoonish, exaggerated expressions
• NO text, letters, symbols, or written elements
• NO speech bubbles, labels, or sound effects

STYLE ENHANCEMENTS:
• Apply the specified character style
• Apply the specified environment style
• Follow the specified color palette
• Style configuration enhances, not replaces, the base requirements

GLOBAL STYLE GENERATION:
• Create one "global_style" describing overall art style, rendering approach, and visual mood
• This style must combine base requirements and style enhancements
• Ensure all images share consistent visual characteristics
• Write this as ONE clear sentence

OUTPUT (JSON only, no commentary):
{{ "global_style": "comprehensive global style description", "prompts": [ {{ "line": "original song line", "prompt": "image prompt #1" }}, {{ "line": "original song line", "prompt": "image prompt #2" }} ... ] }}

INPUT:
{songLyrics}
OUTPUT:
(return JSON exactly as described)`;

const imagePrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["songLyrics", "styleConfiguration"],
    template: imagePromptTemplate
});

// Функция для создания промта с конкретным стилем
export function createImagePromptWithStyle(styleName: string = 'default'): PromptTemplate {
    console.log('=== CREATE IMAGE PROMPT DEBUG ===');
    console.log('Requested styleName:', styleName);
    
    try {
        const style = getStyle(styleName);
        console.log('Resolved style:', style.name, 'Display name:', style.displayName);
        
        const styleConfiguration = `
STYLE NAME: ${style.displayName}
DESCRIPTION: ${style.description}

CHARACTER STYLE: ${style.characterStyle}

ENVIRONMENT STYLE: ${style.environmentStyle}

COLOR PALETTE: ${style.colorPalette}

RENDER STYLE: ${style.renderStyle || 'High-quality 3D render with realistic details'}

IMPORTANT: The global_style you generate should combine the base cartoon/animated requirements with these style enhancements to create a consistent visual approach for all images in the group.
`;

        // Логируем полный промт в консоль
        const fullPrompt = imagePromptTemplate.replace('{styleConfiguration}', styleConfiguration);
        console.log('=== IMAGE PROMPT SENT TO LLM ===');
        console.log('Style:', styleName, '-> Resolved to:', style.name);
        console.log('Full Prompt:');
        console.log(fullPrompt);
        console.log('=== END IMAGE PROMPT ===');

        return new PromptTemplate({
            inputVariables: ["songLyrics"],
            template: fullPrompt
        });
    } catch (error) {
        console.error('=== STYLE RESOLUTION ERROR ===');
        console.error('Failed to resolve style:', styleName);
        console.error('Error:', error);
        console.error('=== END STYLE RESOLUTION ERROR ===');
        throw error;
    }
}

export {
    imagePrompt
};