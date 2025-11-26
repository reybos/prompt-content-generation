import {PromptTemplate} from '@langchain/core/prompts';
import { getDirname } from '../../utils/fileUtils.js';
import fs from 'fs';
import path from 'path';


// Get __dirname equivalent for ES modules
const __dirname = getDirname(import.meta.url);

// Read prompt text with fallback to template
let additionalFramePromptTemplate: string;
const actualPath = path.join(__dirname, 'prompts', 'additionalFramePrompt.prompt.txt');
const templatePath = path.join(__dirname, 'prompts', 'additionalFramePrompt.prompt.template.txt');

if (fs.existsSync(actualPath)) {
    additionalFramePromptTemplate = fs.readFileSync(actualPath, 'utf-8');
} else {
    additionalFramePromptTemplate = fs.readFileSync(templatePath, 'utf-8');
    console.warn('⚠️  Using template prompt for poemsDirectVideoAdditionalFramePrompt. Copy .template.txt to .txt for production use.');
}

export const poemsDirectVideoAdditionalFramePrompt = new PromptTemplate({
    inputVariables: ["songLyrics", "lastVideoPrompt", "count"],
    template: additionalFramePromptTemplate
});

// Функция для логирования промпта additional frames
export function logPoemsDirectVideoAdditionalFramePrompt(songLyrics: string, lastVideoPrompt: string, count: number): void {
    const fullPrompt = additionalFramePromptTemplate
        .replace('{songLyrics}', songLyrics)
        .replace('{lastVideoPrompt}', lastVideoPrompt)
        .replace(/{count}/g, count.toString());
    
    console.log('=== POEMS DIRECT VIDEO ADDITIONAL FRAME PROMPT SENT TO LLM ===');
    console.log('Full Additional Frame Prompt:');
    console.log(fullPrompt);
    console.log('=== END POEMS DIRECT VIDEO ADDITIONAL FRAME PROMPT ===');
}

