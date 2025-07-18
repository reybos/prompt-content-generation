/* START GENAI */
/**
 * Pipeline type definitions
 */

/**
 * Script component structure
 */
export interface Script {
    introduction: {
        title: string;
        description: string;
        narration: string;
    };
    scenes: Array<{
        title: string;
        description: string;
        narration: string;
        visuals: string;
        interaction?: string;
    }>;
    finale: {
        summary: string;
        narration: string;
        callToAction?: string;
    };
}

/**
 * Character component structure
 */
export interface Character {
    name: string;
    appearance: string;
    personality: string;
    gestures: string[];
    voiceDescription: string;
}

/**
 * Media prompt component structure
 */
export interface MediaPrompt {
    introduction: {
        description: string;
        prompt: string;
    };
    scenes: Array<{
        description: string;
        prompt: string;
    }>;
    finale: {
        description: string;
        prompt: string;
    };
}

/**
 * Enhanced media prompt component structure
 */
export interface EnhancedMediaPrompt {
    introduction: {
        description: string;
        prompt: string;
    };
    scenes: Array<{
        description: string;
        prompt: string;
    }>;
    finale: {
        description: string;
        prompt: string;
    };
    styleGuide: {
        visualStyle: string;
        colorPalette: string;
        characterConsistency: string;
    };
}

/**
 * Music suggestion component structure
 */
export interface MusicSuggestion {
    overallMood: string;
    recommendedTracks: Array<{
        title: string;
        description: string;
        mood: string;
        tempo: string;
        section?: string;
    }>;
}

/**
 * Title and description component structure
 */
export interface TitleDescription {
    title: string;
    shortDescription: string;
    longDescription: string;
    keywords: string[];
}

/**
 * Complete content package structure
 */
export interface ContentPackage {
    script: Script;
    character: Character;
    media: MediaPrompt;
    enhancedMedia: EnhancedMediaPrompt;
    narration?: any;
    music: MusicSuggestion;
    titleDesc: TitleDescription;
    hashtags: string;
}

/**
 * Pipeline options
 */
export interface PipelineOptions {
    channelName?: string;
    requestId?: string;
    emitLog?: (log: string, requestId: string | undefined) => void;
}

/* END GENAI */