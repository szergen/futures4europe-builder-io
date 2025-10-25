#!/usr/bin/env node

/**
 * Builder.io Connection Verification Script
 *
 * This script helps diagnose Builder.io connection issues
 * Run with: node verify-builder.js
 */

require("dotenv").config({ path: ".env.local" });
const https = require("https");

const API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
const MODEL_NAME = "admin-section"; // Change this to your model name

console.log("\n🔍 Builder.io Connection Verification\n");
console.log("━".repeat(50));

// Step 1: Check API Key
console.log("\n1️⃣  Checking API Key...");
if (!API_KEY) {
  console.error("❌ NEXT_PUBLIC_BUILDER_API_KEY is not set in .env.local");
  console.log("\n📝 To fix this:");
  console.log("   1. Create a .env.local file in your project root");
  console.log("   2. Add: NEXT_PUBLIC_BUILDER_API_KEY=your-api-key-here");
  console.log("   3. Get your API key from: https://builder.io/account/space");
  process.exit(1);
}
console.log("✅ API Key found:", API_KEY.substring(0, 20) + "...");

// Step 2: Test API Connection
console.log("\n2️⃣  Testing API Connection...");

const url = `https://cdn.builder.io/api/v3/content/${MODEL_NAME}?apiKey=${API_KEY}&limit=5`;

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log("✅ Connection successful");

      try {
        const response = JSON.parse(data);

        console.log("\n3️⃣  Analyzing Response...");
        console.log("   Status Code:", res.statusCode);

        if (res.statusCode === 404) {
          console.error('❌ Model not found: "' + MODEL_NAME + '"');
          console.log("\n📝 To fix this:");
          console.log("   1. Go to https://builder.io");
          console.log('   2. Click "Models" in the sidebar');
          console.log(
            '   3. Verify a model named "' +
              MODEL_NAME +
              '" exists (exact match, case-sensitive)'
          );
          console.log(
            "   4. Or update MODEL_NAME in this script to match your actual model name"
          );
          return;
        }

        if (response.results) {
          console.log("   Found entries:", response.results.length);

          if (response.results.length === 0) {
            console.warn(
              '\n⚠️  No content found for model "' + MODEL_NAME + '"'
            );
            console.log("\n📝 To fix this:");
            console.log("   1. Go to https://builder.io");
            console.log('   2. Click on the "' + MODEL_NAME + '" model');
            console.log("   3. Create a new entry");
            console.log("   4. Add some content");
            console.log('   5. Click "Publish" (not save as draft)');
          } else {
            console.log("\n✅ SUCCESS! Content is available\n");
            console.log("   Content Entries:");
            response.results.forEach((entry, index) => {
              console.log(
                `   ${index + 1}. Name: "${entry.name || "Untitled"}"`
              );
              console.log(`      ID: ${entry.id}`);
              console.log(`      Published: ${entry.published || "unknown"}`);
              console.log(
                `      Last Updated: ${
                  entry.lastUpdated
                    ? new Date(entry.lastUpdated).toLocaleString()
                    : "unknown"
                }`
              );
              if (index < response.results.length - 1) console.log("");
            });

            console.log("\n━".repeat(50));
            console.log("🎉 Your Builder.io setup is working correctly!");
            console.log(
              "   You can now use this content in your application.\n"
            );
          }
        } else {
          console.error("❌ Unexpected response format");
          console.log("Response:", JSON.stringify(response, null, 2));
        }
      } catch (error) {
        console.error("❌ Error parsing response:", error.message);
        console.log("Raw response:", data);
      }
    });
  })
  .on("error", (error) => {
    console.error("❌ Connection failed:", error.message);
    console.log("\n📝 Possible issues:");
    console.log("   1. Internet connection problems");
    console.log("   2. Firewall blocking Builder.io");
    console.log("   3. Invalid API key");
    console.log(
      "   4. Builder.io service issues (check https://status.builder.io)"
    );
  });

// Additional checks
console.log("\n4️⃣  Configuration Check...");
console.log("   Model Name:", MODEL_NAME);
console.log("   Environment:", process.env.NODE_ENV || "development");

console.log("\n━".repeat(50));
console.log("⏳ Fetching data from Builder.io...\n");
