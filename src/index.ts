/**
 * Main entry point for the prompt generation application
 * Supports both CLI and web server modes
 */

// Load environment variables
import 'dotenv/config';
import { startServer } from './server.js';

console.log('Starting in web mode...');
startServer();