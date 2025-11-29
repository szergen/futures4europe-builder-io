#!/usr/bin/env node

/**
 * Builder.io Models Lister
 *
 * Lists all available models in your Builder.io space
 * Run with: node list-builder-models.js
 */

require("dotenv").config({ path: ".env.local" });
const https = require("https");

const API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

console.log("\n📋 Builder.io Models Lister\n");
console.log("━".repeat(50));

// Check API Key
console.log("\n🔑 Checking API Key...");
if (!API_KEY) {
  console.error("❌ NEXT_PUBLIC_BUILDER_API_KEY is not set in .env.local");
  process.exit(1);
}
console.log("✅ API Key found\n");

// Try multiple API endpoints (v1 might be deprecated)
const modelsUrl = `https://cdn.builder.io/api/v1/models?apiKey=${API_KEY}`;
const fallbackUrl = `https://builder.io/api/v1/models?apiKey=${API_KEY}`;

console.log("⏳ Fetching models from Builder.io...\n");
console.log("   Trying:", modelsUrl, "\n");

https
  .get(modelsUrl, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      if (res.statusCode === 401) {
        console.error("❌ Authentication failed - Invalid API key");
        console.log("\n📝 Make sure you are using the correct API key from:");
        console.log("   https://builder.io/account/space\n");
        return;
      }

      if (res.statusCode === 404) {
        console.warn("⚠️  Models API endpoint returned 404");
        console.log(
          "\nℹ️  This API endpoint may have changed or requires different authentication."
        );
        console.log(
          "   Let's try testing your API key with a different approach...\n"
        );

        // Try to fetch from a common model instead
        console.log("🔄 Testing API key by fetching 'page' model content...\n");
        const testUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${API_KEY}&limit=1`;

        https
          .get(testUrl, (testRes) => {
            let testData = "";
            testRes.on("data", (chunk) => {
              testData += chunk;
            });
            testRes.on("end", () => {
              if (testRes.statusCode === 200) {
                console.log(
                  "✅ API Key is VALID! The key works for fetching content."
                );
                console.log("   Status Code:", testRes.statusCode, "\n");

                // Try to parse and show available models from the test
                try {
                  const response = JSON.parse(testData);
                  console.log("📝 Your API key is working correctly.");
                  console.log("\n💡 To check if 'admin-section' exists:");
                  console.log("   1. Go to https://builder.io/models");
                  console.log("   2. Look for a model named 'admin-section'");
                  console.log(
                    "   3. If it doesn't exist, create it or use 'page' instead\n"
                  );

                  console.log("🧪 Testing 'admin-section' model directly...\n");
                  const adminUrl = `https://cdn.builder.io/api/v3/content/admin-section?apiKey=${API_KEY}&limit=1`;

                  https
                    .get(adminUrl, (adminRes) => {
                      let adminData = "";
                      adminRes.on("data", (chunk) => {
                        adminData += chunk;
                      });
                      adminRes.on("end", () => {
                        try {
                          const adminResponse = JSON.parse(adminData);
                          if (
                            adminResponse.results &&
                            adminResponse.results.length > 0
                          ) {
                            console.log(
                              "✅ SUCCESS! 'admin-section' model has content!"
                            );
                            console.log(
                              `   Found ${adminResponse.results.length} entry(ies):\n`
                            );
                            adminResponse.results.forEach((entry, i) => {
                              console.log(
                                `   ${i + 1}. "${entry.name || "Untitled"}"`
                              );
                              console.log(`      ID: ${entry.id}`);
                              console.log(
                                `      Published: ${
                                  entry.published === "published"
                                    ? "Yes"
                                    : entry.published || "Unknown"
                                }`
                              );
                            });
                            console.log("\n🎉 Your setup should be working!\n");
                          } else {
                            console.log(
                              "⚠️  'admin-section' model exists but has NO content"
                            );
                            console.log("\n📝 Next steps:");
                            console.log("   1. Go to https://builder.io");
                            console.log("   2. Click on 'admin-section' model");
                            console.log("   3. Create a new entry");
                            console.log("   4. Publish it\n");
                          }
                        } catch (e) {
                          console.log(
                            "❌ 'admin-section' model does NOT exist"
                          );
                          console.log("\n📝 Options:");
                          console.log(
                            "   A. Create a model named 'admin-section' in Builder.io"
                          );
                          console.log(
                            "   B. Use the 'page' model instead in your code\n"
                          );
                        }
                      });
                    })
                    .on("error", (e) =>
                      console.error("Error testing admin-section:", e.message)
                    );
                } catch (e) {
                  console.error("Error parsing test response:", e.message);
                }
              } else {
                console.error(
                  "❌ API Key test failed with status:",
                  testRes.statusCode
                );
                console.log("   Your API key may be invalid or expired.");
                console.log("\n📝 Get a new API key from:");
                console.log("   https://builder.io/account/space\n");
              }
            });
          })
          .on("error", (e) => {
            console.error("❌ Connection test failed:", e.message);
          });

        return;
      }

      if (res.statusCode !== 200) {
        console.error("❌ Request failed with status:", res.statusCode);
        console.log("Response:", data);
        return;
      }

      try {
        const models = JSON.parse(data);

        if (!models || models.length === 0) {
          console.log("⚠️  No models found in your Builder.io space\n");
          console.log("📝 To create a model:");
          console.log("   1. Go to https://builder.io");
          console.log('   2. Click "Models" in the sidebar');
          console.log('   3. Click "New Model"');
          console.log("   4. Choose a type (Page, Section, or Data)");
          console.log("   5. Name your model\n");
          return;
        }

        console.log(`✅ Found ${models.length} model(s) in your space:\n`);

        models.forEach((model, index) => {
          console.log(`${index + 1}. ${model.name}`);
          console.log(`   Kind: ${model.kind || "data"}`);
          if (model.publicWritable) {
            console.log(`   Public Writable: Yes`);
          }
          if (model.fields && model.fields.length > 0) {
            console.log(`   Custom Fields: ${model.fields.length}`);
          }
          console.log("");
        });

        console.log("━".repeat(50));
        console.log("\n💡 To use a model in your code:\n");
        console.log(
          '   const content = await getBuilderContent("model-name", {'
        );
        console.log("     limit: 1");
        console.log("   });\n");

        // Check if admin-section exists
        const adminSection = models.find((m) => m.name === "admin-section");
        if (adminSection) {
          console.log('✅ The "admin-section" model exists in your space!');
          console.log("   Make sure you have published content for it.\n");
        } else {
          console.log('⚠️  The "admin-section" model was NOT found.');
          console.log(
            "   Available model names:",
            models.map((m) => m.name).join(", ")
          );
          console.log("\n   Either:");
          console.log(
            '   - Create a model named "admin-section" in Builder.io, or'
          );
          console.log(
            "   - Update your code to use one of the existing models\n"
          );
        }
      } catch (error) {
        console.error("❌ Error parsing response:", error.message);
        console.log("Raw response:", data);
      }
    });
  })
  .on("error", (error) => {
    console.error("❌ Connection failed:", error.message);
  });
