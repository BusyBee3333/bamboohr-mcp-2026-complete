#!/usr/bin/env node
import { BambooHRServer } from './server.js';

async function main() {
  try {
    const server = new BambooHRServer();
    await server.run();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
