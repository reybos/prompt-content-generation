/* START GENAI */
/**
 * Configuration schemas and types
 */

import { z } from 'zod';

/**
 * Environment configuration schema
 */
export const EnvironmentConfigSchema = z.object({
    defaultTemperature: z.number().min(0).max(2),
    defaultChannelName: z.string(),
    defaultTopic: z.string(),
    generationsDirPath: z.string().optional(),
    generationsDirRelativePath: z.string().optional(),
    // fal.ai configuration
    falApiKey: z.string().optional(),
    falDefaultModel: z.string(),
    useFalApi: z.boolean(),
});

/* END GENAI */