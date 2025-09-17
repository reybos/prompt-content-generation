/**
 * Image Prompt for Halloween Songs
 * Generates highly detailed image prompts for Halloween songs with spooky patchwork animal characters
 */

import {PromptTemplate} from '@langchain/core/prompts';

const imagePromptTemplate: string = `You are a senior visual director and prompt engineer specializing in viral Halloween content for children.
Input is a sequence of valid call-and-response lines from a children's Halloween song ({songLyrics}).
Each line describes a different animal character.

TASK
1. For each line, generate one detailed English image prompt.
2. Follow the Halloween patchwork style:
   - Tall, upright animal, 3D cartoon style, slightly spooky but child-friendly
   - Patchwork appearance, stitched fabric, frayed edges, visible seams
   - Elongated limbs, slightly oversized head, exaggerated cartoon proportions
   - Neutral or slightly eerie expression, no cheerful smile
   - **Eyes are bright solid green with no pupils, glowing, creating a haunting effect**
   - Mouth slightly open with a hint of teeth if applicable
   - Ears, tails, horns, or other appendages with frayed edges and stitching
   - Pose: upright, facing the camera, arms slightly away from body

3. Background: Halloween-themed, atmospheric, highly detailed
   - Dim reddish/purplish lighting, soft fog or mist near the ground
   - Silhouettes of crooked trees, wooden fences, tombstones, old barns
   - Scattered glowing jack-o’-lanterns casting warm orange highlights
   - Ground textured like dirt, stone, or autumn leaves
   - Small additional details: curling fog around feet, scattered dry leaves, shadows that emphasize patchwork

4. Colors and lighting:
   - Muted grays, browns, and reds for body patches, soft beige highlights
   - Bright solid green for eyes **without pupils**
   - Warm orange highlights from jack-o’-lanterns
   - Subtle blue/purple shadows for depth
   - Lighting emphasizes character's texture and patchwork seams

5. Camera: slightly 3/4 angle, character occupies up to half of the frame

6. Mood: whimsical yet spooky, child-friendly Halloween vibe

EXAMPLES:

Input line: "The rabbit says, 'Hop-hop-hoot!'"
Output prompt:
"A tall, upright rabbit character designed in a spooky yet family-friendly 3D cartoon style. Its patchwork body is made from muted gray fabric with red and brown irregular patches, visible seams and frayed edges. Elongated arms, slightly shorter legs ending in small rounded feet, and a slightly oversized head with long upright ears that are frayed at the tips. **Bright solid green pupil-less eyes stare directly at the camera**, mouth slightly open with a hint of sharp teeth. The rabbit stands upright, centered, arms slightly away from body. 

The background is a Halloween-themed environment: dim reddish lighting casts soft shadows, a dark sky with silhouettes of crooked trees and a wooden fence in the distance, scattered glowing jack-o’-lanterns emitting warm orange highlights, the ground is a dirt path covered with scattered autumn leaves, curling mist swirls around the rabbit’s feet. Small tombstones and a faint shadow of a scarecrow are visible in the soft-focused distance, creating a whimsical but spooky Halloween scene."

Input line: "The donkey says, 'Hee-haw-boo!'"
Output prompt:
"A tall, upright donkey character in spooky family-friendly 3D cartoon style. Patchwork body with muted gray fabric, scattered patches in muted reds and browns, thick visible stitching along seams, frayed edges on ears and tail. Elongated arms hanging slightly low, shorter legs ending in black hooves, slightly oversized head with upright ears and small tuft of hair. **Bright solid green pupil-less eyes stare at the camera**, mouth slightly open in neutral expression. Character upright, arms slightly away from body.

Background: dim purplish lighting highlights donkey’s patchwork texture, fog swirling near hooves. Dark night sky with silhouettes of twisted trees and wooden fences, scattered jack-o’-lanterns casting warm orange highlights across the ground and character. Ground textured with dirt and scattered dry leaves, small gravestones and an old barn appear softly in the background, creating a whimsical, spooky, child-friendly Halloween atmosphere."

Input line: "The cat says, 'Meow-ooo!'"
Output prompt:
"A tall, upright cat character in spooky family-friendly 3D cartoon style. Patchwork body made from muted gray, red, and brown fabric, thick visible seams and frayed edges. Long thin arms, slightly shorter legs ending in large paw-like feet, slightly oversized head with upright pointed ears with frayed tips. **Bright solid green pupil-less eyes stare directly at the camera**, mouth slightly open with a hint of teeth. Long tail curved upwards with visible stitching. Character upright, arms slightly away from body.

Background: dim reddish-purple lighting, mist swirling near feet, dark sky with silhouettes of crooked trees and a wooden fence, scattered glowing jack-o’-lanterns casting warm highlights on the patchwork body. Ground textured with dirt and scattered autumn leaves, small tombstones and distant silhouettes of an old barn in the soft-focused background, creating whimsical yet spooky Halloween atmosphere."

GLOBAL STYLE:
• 3D cartoon characters with child-friendly spooky Halloween appeal featuring patchwork fabric bodies with visible stitching, elongated proportions, **glowing green pupil-less eyes**, slightly eerie expressions, whimsical textures, set against atmospheric Halloween backgrounds with fog, dim colored lighting, jack-o'-lantern highlights, and minimal clutter.

OUTPUT (JSON only, no commentary):
{{
  "global_style": "3D cartoon characters with child-friendly spooky Halloween appeal featuring patchwork fabric bodies with visible stitching, elongated proportions, glowing green pupil-less eyes, slightly eerie expressions, whimsical textures, set against atmospheric Halloween backgrounds with fog, dim colored lighting, jack-o'-lantern highlights, and minimal clutter",
  "prompts": [
    {{ "line": "original song line", "prompt": "detailed image prompt for this line" }}
  ]
}}

INPUT:
{songLyrics}
OUTPUT:
(return JSON exactly as described)
`;

const imagePrompt: PromptTemplate = new PromptTemplate({
    inputVariables: ["songLyrics"],
    template: imagePromptTemplate
});

// Функция возвращает промт с фиксированным Halloween стилем
export function createImagePromptWithStyle(styleName: string = 'halloweenPatchwork'): PromptTemplate {
    console.log('=== CREATE HALLOWEEN IMAGE PROMPT DEBUG ===');
    console.log('Using fixed Halloween style:', styleName);

    return imagePrompt;
}

export { imagePrompt };