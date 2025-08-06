# Song with Animals Pipeline

## Overview

The Song with Animals Pipeline generates content for children's songs featuring animal characters. The pipeline automatically splits songs into 4-line segments and generates separate content for each segment, allowing for the creation of multiple short videos from a single song.

## Key Features

- **Automatic Segmentation**: Songs are automatically split into 4-line segments
- **Multiple Outputs**: Generates separate titles, descriptions, and hashtags for each segment
- **Consistent Style**: Maintains visual consistency across all segments
- **Educational Focus**: Optimized for children's educational content

## Pipeline Flow

1. **Input Processing**: Receives song lyrics as input
2. **Segmentation**: Splits lyrics into 4-line segments
3. **Image Generation**: Creates image prompts for the entire song
4. **Content Generation**: For each 4-line segment:
   - Generates title and description
   - Generates hashtags
5. **Video Generation**: Creates video prompts for the entire song
6. **Output**: Returns structured data for multiple short videos

## Input Format

```typescript
interface SongWithAnimalsInputItem {
  lyrics: string; // The complete song lyrics
}

type SongWithAnimalsInput = SongWithAnimalsInputItem[];
```

## Output Format

```typescript
interface SongWithAnimalsOutput {
  global_style: string;                    // Visual style for the entire song
  prompts: SongWithAnimalsImagePrompt[];   // Image prompts for each line
  video_prompts: SongWithAnimalsVideoPrompt[]; // Video prompts for each line
  titles: string[];                        // Array of titles (one per segment)
  descriptions: string[];                  // Array of descriptions (one per segment)
  hashtags: string[];                     // Array of hashtag strings (one per segment)
}
```

## Segmentation Logic

The pipeline automatically splits songs into 4-line segments:

- **16-line song** → 4 shorts (4 + 4 + 4 + 4 lines)
- **12-line song** → 3 shorts (4 + 4 + 4 lines)
- **8-line song** → 2 shorts (4 + 4 lines)
- **20-line song** → 5 shorts (4 + 4 + 4 + 4 + 4 lines)

## Usage Example

```javascript
import { runSongWithAnimalsPipeline } from './pipeline/index.js';

const input = [
  {
    lyrics: `Old MacDonald had a farm
E-I-E-I-O
And on his farm he had some cows
E-I-E-I-O
With a moo moo here
And a moo moo there
Here a moo, there a moo
Everywhere a moo moo`
  }
];

const results = await runSongWithAnimalsPipeline(input, {
  requestId: 'test-123',
  emitLog: (log, reqId) => console.log(`[${reqId}] ${log}`)
});

// Results will contain:
// - titles: ["Title for segment 1", "Title for segment 2"]
// - descriptions: ["Description for segment 1", "Description for segment 2"]
// - hashtags: ["#hashtags #for #segment1", "#hashtags #for #segment2"]
```

## Prompts

### Title and Description Prompt

Generates engaging titles and descriptions for each 4-line segment:

- **Input**: 4-line song segment
- **Output**: JSON with `title` and `description` fields
- **Focus**: Age-appropriate, educational, engaging content

### Hashtags Prompt

Generates relevant hashtags for each 4-line segment:

- **Input**: 4-line song segment
- **Output**: Space-separated hashtag string
- **Requirements**: 15-25 hashtags, mix of popular and niche

## Error Handling

The pipeline includes comprehensive error handling:

- **Retry Logic**: Up to 3 attempts per song
- **Segment-level Logging**: Detailed progress tracking
- **Graceful Degradation**: Continues processing other songs if one fails

## File Output

Generated content is automatically saved to the `unprocessed` folder with the format:
`{fileNumber}-song_with_animals.json`

## Configuration

The pipeline uses the following models and temperatures:

- **Image Generation**: Claude 3.7 Sonnet (temperature: 0.3)
- **Title/Description**: Claude 3.7 Sonnet (temperature: 0.7)
- **Hashtags**: Claude 3.7 Sonnet (temperature: 0.4)
- **Video Generation**: Claude 3.7 Sonnet (temperature: 0.5) 