/**
 * Title and Description Prompt
 * Generates a highly SEO-optimized title and long-form description for a children's educational YouTube video
 */

import { PromptTemplate } from '@langchain/core/prompts';

const titleDescPromptTemplate: string = `
You are an expert YouTube creator and SEO strategist for a children's educational channel (ages 2–6).
Your task is to create a highly optimized and engaging TITLE and DESCRIPTION for a YouTube video, using the provided topic and script.

Goals:
1. **SEO Optimization**: 
   - Naturally include highly relevant keywords and search phrases parents use for kids' educational content, such as:
     "learning colors for toddlers", "educational video for preschoolers", "fun learning for kids", "animated learning video".
   - Place the main keyword at or near the start of the title.
   - Avoid keyword stuffing; prioritize clarity and natural flow.
   - Structure the description with paragraphs and keyword-rich sentences to maximize discoverability.

2. **Title**:
   - Catchy, descriptive, and age-appropriate (max 60 characters).
   - Clearly communicates the topic and main theme.

3. **Description**:
   - Write a **long, SEO-friendly, detailed** description (aim for 1000–5000 characters).
   - Summarize the video in detail, including activities, characters, objects, and learning goals.
   - Naturally include related keywords and phrases multiple times for better ranking.
   - Make it appealing for both kids and parents, using warm and joyful language.
   - Do not use direct calls to action (e.g., "watch now", "click here").
   - Structure it into easy-to-read sections or paragraphs, mentioning variations of key search terms.

4. **Tone**:
   - Warm, joyful, simple, and informative.
   - Suitable for parents seeking educational videos for their children.

Return ONLY a valid JSON object with two properties: "title" and "description".

Input:
* Topic: {topic}
* Script: {script}

Output (valid JSON):
`;

const titleDescPrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["topic", "script"],
    template: titleDescPromptTemplate
});

export {
    titleDescPrompt,
};