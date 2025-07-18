/* START GENAI */
/**
 * File system utility type definitions
 * Using string type instead of BufferEncoding to avoid Node.js type issues
 */

/**
 * Number tracker state
 */
export interface NumberTrackerState {
    lastNumber: number;
}

/**
 * File content with original topic
 */
export interface FileContent {
    content?: string;
    originalTopic: string;
    theme: string;
    [key: string]: any;
}

/**
 * Generation file info
 */
export interface GenerationFileInfo {
    filename: string;
    number: number;
    theme: string;
    topic: string;
    path: string;
    size: number;
    created: string;
}

/**
 * Theme folder structure
 */
export interface ThemeFolderStructure {
    [theme: string]: GenerationFileInfo[];
}

/**
 * File save options
 */
export interface FileSaveOptions {
    // Добавь здесь поля по необходимости, например:
    encoding?: string;
    overwrite?: boolean;
}

/* END GENAI */