/* START GENAI */
/**
 * File system utilities for managing saved generations
 */

/// <reference types="node" />

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import {
    NumberTrackerState,
    FileContent,
    GenerationFileInfo,
    ThemeFolderStructure
} from '../types/file.js';

import {
    NumberTrackerStateSchema,
    FileContentSchema,
    GenerationFileInfoSchema,
    GenerationMetadataSchema
} from '../schemas/file.js';

import config from '../config/index.js';
import { z } from 'zod';
import { getGenerationsDir } from '../server.js';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Calculate project root (where package.json is located)
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Remove old GENERATIONS_DIR logic and use getGenerationsDir()
const GENERATIONS_DIR: string | null = getGenerationsDir();