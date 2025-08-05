const imagePromptTemplate: string = `
You are a senior visual director and prompt engineer.
Input is a sequence of valid call-and-response lines from a children\'s song ({songLyrics}).
Example of one line: "The lion says, \'Roar, roar, roar!\'".
TASK
1. Use the lines in the given order; each line will get exactly one image prompt.
2. Invent a single-sentence "global_style" that sets:
• art style (e.g., vivid 3-D cartoon illustration in a Pixar-like look);
• color palette (2–3 dominant + 1–2 accent colors);
• lighting, mood, detail level.
Write this description as ONE LINE.
3. Background rule: every image gets a SIMPLE background that fits the character\'s nature but is not identical between images.
• African animals → warm desert/savannah hints.
• Robot characters → clean futuristic tech environment.
• Mythical creatures → soft fantasy scenery.
• Arctic animals → icy landscape, etc.
The background must stay uncluttered and secondary to the character.
4. For each line craft an English prompt:
detailed description of the character, pose, emotion, background concept per rule above, colors, lighting, camera, keywords
CONSTRAINTS
• Character exactly matches the one in the line.
• Colorful, friendly, highly detailed, eye-catching.
• Use the same palette/mood from global_style.
OUTPUT (JSON, no extra commentary):
{ "global_style": "...", "prompts": [ { "line": "original song line", "prompt": "generation prompt for image #1" }, { "line": "original song line", "prompt": "generation prompt for image #2" } ... ] }
Return valid JSON, escape all inner double quotes

INPUT:
{songLyrics}
OUTPUT:
(return JSON exactly as described)
`;