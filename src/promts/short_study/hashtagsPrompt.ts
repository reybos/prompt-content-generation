// Short Study Hashtags Prompt
// Generates relevant hashtags for children's educational videos

import {PromptTemplate} from '@langchain/core/prompts';

export const shortStudyHashtagsPrompt = new PromptTemplate({
    inputVariables: ["topicDescription", "song_text"],
    template: `You are an expert content creator specializing in **children's educational YouTube Shorts**.

Input is a study topic description ({topicDescription}) and song text ({song_text}).

TASK:
1. Use the topic description and song text to generate **10–15 relevant hashtags** for children's educational content.
2. Include hashtags that are **SEO-friendly, popular for kids' educational videos, and relevant to the topic**.
3. Make hashtags **short, descriptive, and easy to read**.
4. Include a mix of **general educational hashtags** (#learning, #kids) and **topic-specific hashtags** derived from the song and topic.
5. Output hashtags as **plain text**, separated by spaces, no JSON formatting, no extra commentary.

OUTPUT (plain text):
#educational #children #learning #fun #kids #toddlers #shorts #topic

INPUT:
Topic: {topicDescription}
Song Text: {song_text}

OUTPUT:
(return hashtags as plain text, no JSON formatting)`
});
