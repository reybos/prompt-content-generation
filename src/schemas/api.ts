/* START GENAI */
/**
 * API schemas
 */

import { z } from 'zod';
import { ContentPackageSchema } from './pipeline.js';
import { GenerationMetadataSchema } from './file.js';

/**
 * Generate content request schema
 */
export const GenerateContentRequestSchema = z.object({
    topics: z.record(z.string(), z.array(z.string())),
});

/**
 * Save generation request schema
 */
export const SaveGenerationRequestSchema = z.object({
    theme: z.string(),
    topic: z.string(),
    content: z.union([ContentPackageSchema, z.string()]),
});

/**
 * Save generation response schema
 */
export const SaveGenerationResponseSchema = z.object({
    success: z.boolean(),
    savedFile: GenerationMetadataSchema,
});

/**
 * List themes response schema
 */
export const ListThemesResponseSchema = z.object({
    success: z.boolean(),
    themes: z.array(z.string()),
});

/* END GENAI */