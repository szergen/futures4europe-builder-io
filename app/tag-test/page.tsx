import { getBuilderContent } from "@app/shared-components/Builder";
import { BuilderContent } from "@app/shared-components/Builder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tag Component Test - Builder.io Integration",
  description: "Test page for the Tag component integrated with Builder.io",
};

export default async function TagTestPage() {
  // Try to fetch any page content that might have been created in Builder.io
  const pageContent = await getBuilderContent("page", {
    userAttributes: {
      urlPath: "/tag-test",
    },
  });

  // Try to fetch section content for testing
  const sectionContent = await getBuilderContent("section", {
    query: {
      "data.published": true,
    },
    limit: 1,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Tag Component - Builder.io Integration Test
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            🎉 Tag Component Successfully Registered!
          </h2>
          <p className="text-blue-700 mb-4">
            The Tag component has been registered with Builder.io and is now
            available in the visual editor.
          </p>

          <div className="space-y-2 text-sm text-blue-600">
            <p>
              <strong>✅ Component Name:</strong> "Tag"
            </p>
            <p>
              <strong>✅ Available Fields:</strong> name, tagCategory,
              tagPageLink, picture, tagTrend, and more
            </p>
            <p>
              <strong>✅ Default Values:</strong> Pre-configured for easy
              testing
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use in Builder.io
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Go to your Builder.io dashboard</li>
              <li>Create or edit a Page/Section</li>
              <li>In the visual editor, click "+" to add components</li>
              <li>Look for "Tag" in the custom components section</li>
              <li>Drag and drop it onto your page</li>
              <li>Configure the properties in the right panel</li>
            </ol>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Available Properties</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-100 px-1 rounded">name</code> - Tag
                display name (required)
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">tagCategory</code> -
                Category selection
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">tagPageLink</code> -
                Custom URL
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">picture</code> - Tag
                icon/image
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">tagTrend</code> -
                Trend value (-100 to 100)
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">mentions</code> -
                Popularity count
              </li>
              <li>...and more configuration options</li>
            </ul>
          </div>
        </div>

        {/* Render Builder.io content if available */}
        {pageContent && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Builder.io Page Content
            </h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <BuilderContent model="page" content={pageContent} />
            </div>
          </div>
        )}

        {sectionContent && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Builder.io Section Content
            </h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <BuilderContent model="section" content={sectionContent} />
            </div>
          </div>
        )}

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
          <p className="text-gray-700 mb-4">
            To test the Tag component integration:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Open your Builder.io dashboard</li>
            <li>
              Create a new page with URL path{" "}
              <code className="bg-gray-100 px-1 rounded">/tag-test</code>
            </li>
            <li>Add the Tag component from the custom components section</li>
            <li>Configure its properties and publish</li>
            <li>Refresh this page to see your custom content</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
