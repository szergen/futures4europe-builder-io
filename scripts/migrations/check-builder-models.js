#!/usr/bin/env node

/**
 * Check what models exist in Builder.io
 */

require("dotenv").config({ path: ".env.local" });
const fetch = require("node-fetch");

const PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY;
const BUILDER_API_URL = "https://builder.io/api/v1";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

async function checkModels() {
  console.log(`\n${colors.cyan}Checking Builder.io Models${colors.reset}\n`);

  if (!PRIVATE_API_KEY) {
    console.log(
      `${colors.red}✗ Missing BUILDER_PRIVATE_API_KEY in .env.local${colors.reset}`
    );
    process.exit(1);
  }

  try {
    // List all models
    const response = await fetch(`${BUILDER_API_URL}/models`, {
      headers: {
        Authorization: `Bearer ${PRIVATE_API_KEY}`,
      },
    });

    if (!response.ok) {
      console.log(
        `${colors.red}✗ API Error: ${response.status} ${response.statusText}${colors.reset}`
      );
      process.exit(1);
    }

    const data = await response.json();
    const models = data.models || [];

    console.log(
      `${colors.green}✓ Found ${models.length} models:${colors.reset}\n`
    );

    // Check for expected models
    const expectedModels = [
      "person-page",
      "organisation-page",
      "project-page",
      "info-page", // Alternative single model
      "post-page",
      "tag",
    ];

    const foundModels = new Set(models.map((m) => m.name));

    expectedModels.forEach((modelName) => {
      if (foundModels.has(modelName)) {
        console.log(`  ${colors.green}✓${colors.reset} ${modelName}`);
      } else {
        console.log(
          `  ${colors.yellow}✗${colors.reset} ${modelName} (not found)`
        );
      }
    });

    console.log(`\n${colors.cyan}All models in workspace:${colors.reset}`);
    models.forEach((model) => {
      console.log(`  - ${model.name} (${model.kind || "page"})`);
    });

    console.log("");
  } catch (error) {
    console.log(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

checkModels();
