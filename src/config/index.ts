/* START GENAI */
/**
 * Configuration module
 * Exports all configuration settings
 */
import environmentConfig from './environment.js';
import { OutputFormat, AppConfig } from '../types/config.js';

/**
 * Output format options
 */
const outputFormats: { json: OutputFormat.JSON; yaml: OutputFormat.YAML; text: OutputFormat.TEXT } = {
    json: OutputFormat.JSON,
    yaml: OutputFormat.YAML,
    text: OutputFormat.TEXT,
};

/**
 * Complete application configuration
 */
const config: AppConfig = {
    ...environmentConfig,
    outputFormats,
};

export default config;
/* END GENAI */