/* START GENAI */
/**
 * API type definitions
 */

import { ContentPackage } from '../types/pipeline.js';

/**
 * Generate content request body
 */
export interface GenerateContentRequest {
    topics: Record<string, string[]>;
}

/**
 * Generate content response
 */
export interface GenerateContentResponse {
    success: boolean;
    message: string;
    requestId: string;
}

/**
 * Save generation request body
 */
export interface SaveGenerationRequest {
    theme: string;
    topic: string;
    content: ContentPackage | string;
}

/**
 * Save generation response
 */
export interface SaveGenerationResponse {
    success: boolean;
    savedFile: GenerationMetadata;
}

/**
 * Generation metadata
 */
export interface GenerationMetadata {
    theme: string;
    originalTheme: string;
    topic: string;
    originalTopic: string;
    filename: string;
    path: string;
    number: number;
    timestamp: string;
}

/**
 * Generation info (used in listings)
 */
export interface GenerationInfo {
    filename: string;
    topic: string;
    path: string;
    size: number;
    created: string;
}

/**
 * List generations response
 */
export interface ListGenerationsResponse {
    success: boolean;
    generations: Record<string, GenerationInfo[]>;
}

/**
 * Get generation content response
 */
export interface GetGenerationContentResponse {
    success: boolean;
    content: string;
}

/**
 * List themes response
 */
export interface ListThemesResponse {
    success: boolean;
    themes: string[];
}

/**
 * Status response
 */
export interface StatusResponse {
    status: 'ok' | 'error';
}

/* END GENAI */