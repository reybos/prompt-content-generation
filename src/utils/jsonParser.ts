/* START GENAI */
/**
 * JSON parsing utilities
 */

/**
 * Safely parse JSON with error handling, removing any markdown formatting
 * @param jsonString - The JSON string to parse
 * @param contextName - Name for error context (for logging)
 * @returns Parsed JSON object or null if parsing failed
 */
export function safeJsonParse<T = Record<string, any>>(
    jsonString: string | null | undefined,
    contextName: string
): T | null {
    try {
        // Return null for empty or non-string inputs
        if (!jsonString || typeof jsonString !== 'string') {
            console.error(`Invalid JSON string for ${contextName}: Input is empty or not a string`);
            return null;
        }

        // Remove markdown code block formatting if present
        let cleanedJson: string = jsonString
            .replace(/^```(?:json)?\s*/i, '')   // remove opening ```
            .replace(/\s*```$/, '');            // remove closing ```

        // Attempt to parse the cleaned JSON
        return JSON.parse(cleanedJson) as T;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error parsing JSON for ${contextName}: ${error.message}`);
        } else {
            console.error(`Unknown error parsing JSON for ${contextName}`);
        }
        console.error('Problematic JSON string:', jsonString);
        return null;
    }
}
/* END GENAI */