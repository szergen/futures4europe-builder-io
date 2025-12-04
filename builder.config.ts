// Builder.io Configuration
export const builderConfig = {
  apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY,
  privateApiKey: process.env.BUILDER_PRIVATE_API_KEY,
  // You can add other Builder.io specific configurations here
  contentModelNames: {
    page: "page",
    section: "section",
    data: "data-model",
  },
};

// Environment setup instructions:
// 1. Add the following to your .env.local file:
// NEXT_PUBLIC_BUILDER_API_KEY=your-public-api-key-here
// BUILDER_PRIVATE_API_KEY=your-private-api-key-here
//
// 2. Get your API keys from: https://builder.io/account/space
// 3. Go to Settings > API Keys in your Builder.io dashboard
// 4. Use public key for reads, private key for writes
