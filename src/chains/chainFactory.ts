/* START GENAI */
/**
 * Chain Factory
 * Creates LangChain chains with configured LLM and prompts
 */
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence, Runnable } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { FalChatModel } from '../services/falLangChainAdapter.js';
import { LLMOptions } from '../types/config.js';
import { ChainFactory } from '../types/llm.js';

/**
 * Create a LangChain chain with the given prompt template using LCEL
 * @param promptTemplate - The prompt template to use
 * @param options - Options for the LLM
 * @param outputKey - The key to use for the output (default: 'text')
 * @returns The configured LCEL chain
 */
const createChain: ChainFactory = (
    promptTemplate: PromptTemplate,
    options: LLMOptions = {},
    outputKey: string = 'text'
): Runnable<any, string> => {
    // Always use FalChatModel
    const llm = new FalChatModel(options);

    // Compose the chain using the modern pipe style
    return promptTemplate.pipe(llm).pipe(new StringOutputParser());
};

export {
    createChain,
};
/* END GENAI */