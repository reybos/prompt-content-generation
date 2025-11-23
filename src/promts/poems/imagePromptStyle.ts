/**
 * Image Prompt Style Suffix for Poems Songs
 * Provides a fixed style suffix to append to all image prompts
 */

import { getDirname } from '../../utils/fileUtils.js';
import fs from 'fs';
import path from 'path';

// Get __dirname equivalent for ES modules
const __dirname = getDirname(import.meta.url);

// Read style suffix text with fallback to template
let imagePromptStyleSuffix: string;
const actualPath = path.join(__dirname, 'prompts', 'imagePromptStyle.style.txt');
const templatePath = path.join(__dirname, 'prompts', 'imagePromptStyle.style.template.txt');

if (fs.existsSync(actualPath)) {
    imagePromptStyleSuffix = fs.readFileSync(actualPath, 'utf-8').trim();
} else {
    imagePromptStyleSuffix = fs.readFileSync(templatePath, 'utf-8').trim();
}

/**
 * Get the style suffix to append to image prompts
 * @returns The style suffix string
 */
export function getImagePromptStyleSuffix(): string {
    return imagePromptStyleSuffix;
}

export { imagePromptStyleSuffix };

