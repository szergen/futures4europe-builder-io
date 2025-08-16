"use client";

import { useState, useEffect } from "react";
import { builder } from "@builder.io/react";
import { BuilderContent } from "@app/shared-components/Builder";
import { builderConfig } from "../../../builder.config";

export default function ClientBuilderExample() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<
    "page" | "section" | "blog-post-test" | "tag"
  >("section");

  useEffect(() => {
    if (!builderConfig.apiKey) {
      setLoading(false);
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      try {
        const result = await builder
          .get(selectedModel, {
            // query: {
            //   "data.published": true,
            // },
            limit: 1,
          })
          .toPromise();
        console.log("DEBUG1---RESULT: ", result);
        setContent(result);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [selectedModel]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Client-Side Builder.io Example</h3>

      {/* Model selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Content Model:
        </label>
        <select
          value={selectedModel}
          onChange={(e) =>
            setSelectedModel(
              e.target.value as "page" | "section" | "blog-post-test" | "tag"
            )
          }
          className="border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="section">Section</option>
          <option value="page">Page</option>
          <option value="blog-post-test">Blog Post Test</option>
          <option value="tag">Tag</option>
        </select>
      </div>

      {/* Content display */}
      {!builderConfig.apiKey ? (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-700">
            Builder.io API key not configured. Please add
            NEXT_PUBLIC_BUILDER_API_KEY to your .env.local file.
          </p>
        </div>
      ) : loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
        </div>
      ) : content ? (
        <div>
          <p className="text-green-600 mb-4">
            ✅ Content loaded from Builder.io {selectedModel} model
            {JSON.stringify(content)}
          </p>
          <BuilderContent model={selectedModel} content={content} />
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-700">
            No content found for the "{selectedModel}" model. Create some
            content in your Builder.io dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
