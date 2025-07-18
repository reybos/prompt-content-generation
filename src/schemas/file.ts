/* START GENAI */
import { z } from 'zod';

/**
 * Number tracker state schema
 */
export const NumberTrackerStateSchema = z.object({
    lastNumber: z.number().int().nonnegative(),
});

/**
 * File content schema
 */
export const FileContentSchema = z.object({
    content: z.string().optional(),
    originalTopic: z.string(),
    theme: z.string(),
}).catchall(z.unknown());

/**
 * Generation file info schema
 */
export const GenerationFileInfoSchema = z.object({
    filename: z.string(),
    number: z.number().int().nonnegative(),
    theme: z.string(),
    topic: z.string(),
    path: z.string(),
    size: z.number().nonnegative(),
    created: z.string().datetime(),
});

/**
 * Generation metadata schema
 */
export const GenerationMetadataSchema = z.object({
    theme: z.string(),
    originalTheme: z.string(),
    topic: z.string(),
    originalTopic: z.string(),
    filename: z.string(),
    path: z.string(),
    number: z.number().int().nonnegative(),
    timestamp: z.string().datetime(),
});

/* END GENAI */