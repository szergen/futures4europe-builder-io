import {
  BuilderContent,
  getBuilderContent,
} from "@app/shared-components/Builder";
import { Metadata } from "next";
import ClientBuilderExample from "./components/ClientBuilderExample";

// This page demonstrates Builder.io integration
export const metadata: Metadata = {
  title: "Builder.io Test Page | Futures4Europe",
  description: "Testing Builder.io headless CMS integration",
};

export default async function BuilderTestPage() {
  // Fetch content from Builder.io on the server side
  // This is for the "section" model - you can change this to "page" or "data-model"
  const sectionContent = await getBuilderContent("section", {
    query: {
      // You can add specific queries here, for now we'll get any content
      "data.published": true,
    },
    limit: 1,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Fixed header section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
          <h1 className="text-4xl font-bold mb-4">Builder.io Test Page</h1>
          <p className="text-xl mb-4">
            This is a hybrid page with both fixed components and dynamic
            Builder.io content.
          </p>
          <div className="bg-white/10 p-4 rounded">
            <h3 className="font-semibold mb-2">What you're seeing:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>This header is a fixed React component</li>
              <li>The content below is fetched from Builder.io</li>
              <li>
                You can edit the Builder.io content in your Builder.io dashboard
              </li>
            </ul>
          </div>
        </div>

        {/* Builder.io content section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Dynamic Content from Builder.io
          </h2>

          {sectionContent ? (
            <BuilderContent
              model="section"
              content={sectionContent}
              loading={
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              }
              error={
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <p className="text-red-700">
                    Failed to load content from Builder.io
                  </p>
                </div>
              }
            />
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                No content found in Builder.io
              </h3>
              <p className="text-yellow-700 mb-4">
                To see dynamic content here, you need to:
              </p>
              <ol className="list-decimal list-inside text-yellow-700 space-y-2">
                <li>
                  Set up your <code>NEXT_PUBLIC_BUILDER_API_KEY</code> in
                  .env.local
                </li>
                <li>Go to your Builder.io dashboard</li>
                <li>Create a new "Section" content model</li>
                <li>Add some content to it</li>
                <li>Refresh this page</li>
              </ol>
            </div>
          )}
        </div>

        {/* Client-side example */}
        <ClientBuilderExample />

        {/* Fixed footer section */}
        <div className="bg-gray-100 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">For Data Models:</h4>
              <p className="text-sm text-gray-600">
                Use Builder.io data models for structured content like articles,
                products, or any structured data you want to manage.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Page Models:</h4>
              <p className="text-sm text-gray-600">
                Use Builder.io page models for full page layouts that you want
                to be completely managed through the Builder.io visual editor.
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> You can create different content models
              in Builder.io for different types of content (blog posts, product
              descriptions, landing pages, etc.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
