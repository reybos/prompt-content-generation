/* START GENAI */
/**
 * Pipeline utility functions
 */

import { Runnable } from '@langchain/core/runnables';
import { ChainValues } from '@langchain/core/utils/types';

import { ChainParameters, PipelineStepFunction } from '../types/llm.js';
import { safeJsonParse } from './jsonParser.js';

/**
 * Execute a pipeline step with standardized logging and error handling
 * @param stepName - Name of the pipeline step (e.g., "SCRIPT", "CHARACTER")
 * @param chain - The LCEL chain to execute
 * @param params - Parameters to pass to the chain
 * @param parseJson - Whether to parse the result as JSON (default: true)
 * @param contextName - Optional context name for JSON parsing errors
 * @returns The result of the pipeline step (parsed JSON or raw string)
 */
export const executePipelineStep: PipelineStepFunction = async function <T = Record<string, any>>(
    stepName: string,
    chain: Runnable<ChainValues, string>,
    params: ChainParameters,
    parseJson: boolean = true,
    contextName: string | null = null
): Promise<T | string | null> {
    console.log(`\n--- GENERATING ${stepName} ---`);
    const text: string = await chain.invoke(params);
    console.log(`${stepName} response:`, text);

    if (parseJson) {
        const parsedResult: T | null = safeJsonParse<T>(text, contextName || stepName.toLowerCase());
        if (!parsedResult) return null;

        console.log(`\n--- ${stepName} GENERATED ---`);
        console.dir(parsedResult, { depth: null });
        return parsedResult;
    } else {
        console.log(`\n--- ${stepName} GENERATED ---`);
        console.log(text);
        return text;
    }
};

/* END GENAI */