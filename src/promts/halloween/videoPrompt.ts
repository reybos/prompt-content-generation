import {PromptTemplate} from '@langchain/core/prompts';

const videoPromptTemplate = `You are a creative video director specializing in children's Halloween content for kids' shorts. Your task is to create video prompts for short animations featuring spooky characters from a children's Halloween song.

Given the global style and image prompts for each character, create engaging video prompts that will animate each character with simple, child-friendly movements that are spooky but safe and fun.

GLOBAL STYLE: {global_style}

IMAGE PROMPTS:
{image_prompts}

Create a video prompt for each character that includes:
1. The EXACT same visual style, setting, background, and environment as specified in the image prompt - DO NOT change or modify the surroundings
2. A simple, playful animation movement appropriate for children (spooky but safe)
3. The character making its characteristic sound or action
4. Smooth, gentle movements that are easy to follow
5. Spooky but friendly atmosphere suitable for kids (not scary, just fun Halloween vibes)
6. NO text, letters, words, symbols, or any written content in the video
7. NO speech bubbles, signs, labels, or any textual elements
8. NO sound effects, sound waves, or any visual representations of sounds
9. MAINTAIN CONSISTENT ENVIRONMENT: Keep the exact same background, lighting, colors, and overall scene composition as described in the image prompt

For each character, suggest a different type of movement based on their spooky nature:
- Ghost Cats: gentle floating, tail swishing, playful pouncing, or mysterious walking
- Witch's Owls: wing flapping, head turning, hooting motion, or gentle flying
- Vampire Bats: wing flapping, hanging upside down, gentle flying, or playful swooping
- Spooky Dogs: gentle wagging tail, bouncing, playful jumping, or friendly running
- Haunted Birds: wing flapping, hopping, head bobbing, or gentle flying
- Ghost Fish: swimming motion, bubble blowing, fin waving, or gentle floating
- Spooky Horses: trotting, head nodding, tail swishing, or magical prancing
- Witch's Cows: gentle chewing motion, tail flicking, head turning, or peaceful standing
- Ghost Pigs: snout wiggling, tail curling, playful trotting, or gentle rolling
- Haunted Sheep: gentle grazing motion, wool ruffling, head bobbing, or peaceful standing
- Spooky Ducks: waddling motion, wing flapping, head bobbing, or gentle swimming
- Ghost Mice: whisker twitching, gentle scurrying, nose wiggling, or playful hopping
- Spooky Dragons: gentle wing flapping, tail swishing, head bobbing, or playful flying
- Haunted Unicorns: graceful trotting, mane flowing, horn glowing, or magical prancing
- Ghost Dinosaurs: gentle stomping, tail swinging, head bobbing, or playful roaring
- Spooky Fairies: gentle floating, wing fluttering, magical sparkles, or graceful dancing
- Friendly Monsters: gentle waving, soft stomping, playful growling, or curious head tilting
- Ghost Aliens: gentle floating, antenna wiggling, friendly beeping, or curious exploring
- Any other spooky character: choose movements that match their personality and nature while keeping it fun and safe

IMPORTANT: Return your response as a valid JSON object. Make sure to properly escape all quotes within string values. For example, if a character says "Meow, meow, meow!", the JSON should use escaped quotes like this: "The spooky cat says, \\"Meow, meow, meow!\\"".

Return your response as a JSON object with this structure:
{{
  "video_prompts": [
    {{
      "line": "The [spooky character] says, \\"[sound]\\"",
      "video_prompt": "[detailed video prompt describing the movement, style, and spooky but safe atmosphere]"
    }},
    ...
  ]
}}

Make each video prompt engaging, spooky but safe, and perfect for children's Halloween entertainment. Keep the movements simple but entertaining, and maintain the visual style while being approachable for young viewers. The movements should be gentle, playful, and appropriate for the character's personality and the overall Halloween theme of the song.
`;

export const halloweenVideoPrompt = PromptTemplate.fromTemplate(videoPromptTemplate);

// Функция для логирования видео промта
export function logVideoPrompt(global_style: string, image_prompts: string): void {
    const fullVideoPrompt = videoPromptTemplate
        .replace('{global_style}', global_style)
        .replace('{image_prompts}', image_prompts);
    
    console.log('=== VIDEO PROMPT SENT TO LLM ===');
    console.log('Full Video Prompt:');
    console.log(fullVideoPrompt);
    console.log('=== END VIDEO PROMPT ===');
} 