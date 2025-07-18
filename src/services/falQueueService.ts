/**
 * fal.ai Queue Service
 * Handles queue operations for fal.ai API
 */

import { fal } from '@fal-ai/client';
import config from '../config/index.js';
import { QueueStatus, QueueLog } from '../types/llm.js';

/**
 * Submit a request to the fal.ai queue
 * @param prompt - The prompt to send
 * @param systemPrompt - Optional system prompt
 * @param options - Additional options
 * @returns The request ID
 */
const submitToQueue = async (
    prompt: string,
    systemPrompt?: string,
    options: Record<string, any> = {}
): Promise<string> => {
    if (!config.falApiKey) {
        throw new Error('FAL API key is not configured.');
    }

    const model = options.model || config.falDefaultModel || 'anthropic/claude-3.7-sonnet';
    const temperature = options.temperature || config.defaultTemperature;

    const { request_id } = await fal.queue.submit('fal-ai/any-llm', {
        input: {
            model,
            prompt,
            system_prompt: systemPrompt,
        },
        // webhookUrl: 'https://optional.webhook.url/for/results', // if needed
    });
    return request_id;
};

/**
 * Check the status of a queued request
 * @param requestId - The request ID
 * @returns The request status
 */
const checkQueueStatus = async (requestId: string): Promise<QueueStatus> => {
    if (!config.falApiKey) {
        throw new Error('FAL API key is not configured.');
    }

    const status = await fal.queue.status('fal-ai/any-llm', {
        requestId,
        logs: true,
    });
    return status as unknown as QueueStatus;
};

/**
 * Get the result of a completed request
 * @param requestId - The request ID
 * @returns The result
 */
const getQueueResult = async (requestId: string): Promise<any> => {
    if (!config.falApiKey) {
        throw new Error('FAL API key is not configured.');
    }

    return await fal.queue.result('fal-ai/any-llm', {
        requestId,
    });
};

/**
 * Poll for a result until it's ready
 * @param requestId - The request ID
 * @param maxAttempts - Maximum number of polling attempts
 * @param interval - Delay between polling attempts in ms
 * @returns The result
 */
const pollForResult = async (
    requestId: string,
    maxAttempts: number = 500,
    interval: number = 2000
): Promise<any> => {
    let attempts = 0;

    while (attempts < maxAttempts) {
        const status = await checkQueueStatus(requestId);

        if (status.status === 'COMPLETED') {
            return await getQueueResult(requestId);
        }

        if (status.status === 'FAILED') {
            throw new Error(`Request failed: ${status.error || 'Unknown error'}`);
        }

        if (status.logs && status.logs.length > 0) {
            status.logs.forEach((log: QueueLog) => {
                console.log(`[FAL LOG] ${log.message}`);
            });
        }

        attempts++;
        if (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, interval));
        }
    }

    throw new Error(`Request timed out after ${maxAttempts} polling attempts`);
};

export {
    submitToQueue,
    checkQueueStatus,
    getQueueResult,
    pollForResult,
};