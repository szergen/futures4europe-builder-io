import {
  BuilderContent,
  getBuilderContentByUrl,
  getBuilderContent,
} from "@app/shared-components/Builder";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface InfoPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata dynamically based on Builder.io content
export async function generateMetadata({
  params,
}: InfoPageProps): Promise<Metadata> {
  const { slug } = params;

  // Try to fetch content to get title and description
  const content = await getBuilderContentByUrl("page", `/info/${slug}`);

  if (content?.data) {
    return {
      title: content.data.title || `${slug} | Futures4Europe`,
      description:
        content.data.description ||
        content.data.excerpt ||
        `Learn more about ${slug}`,
      openGraph: {
        title: content.data.title || slug,
        description: content.data.description || content.data.excerpt,
        type: "article",
      },
    };
  }

  // Fallback metadata
  return {
    title: `${slug} | Futures4Europe`,
    description: `Information about ${slug}`,
  };
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = params;

  // First, try to get content by URL (recommended approach for pages)
  let content = await getBuilderContentByUrl("page", `/info/${slug}`);

  // If no content found by URL, try by slug query (fallback)
  if (!content) {
    content = await getBuilderContent("page", {
      query: {
        "data.slug": slug,
      },
      limit: 1,
    });
  }

  // If still no content, try other content models as fallback
  if (!content) {
    // Try section model
    content = await getBuilderContent("section", {
      query: {
        "data.slug": slug,
      },
      limit: 1,
    });

    // Try data model
    if (!content) {
      content = await getBuilderContent("data-model", {
        query: {
          "data.slug": slug,
        },
        limit: 1,
      });
    }
  }

  // If no content found at all, return 404
  if (!content) {
    notFound();
  }

  // Determine the model type based on what was found
  const modelType = content.data?.modelType || "page";

  return (
    <div className="min-h-screen">
      {/* Render the Builder.io content */}
      <BuilderContent
        model={modelType}
        content={content}
        loading={
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-64 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        }
        error={
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h1 className="text-2xl font-bold text-red-800 mb-2">
                  Content Error
                </h1>
                <p className="text-red-700">
                  There was an error loading this content. Please try again
                  later.
                </p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

// Generate static params for known slugs (optional - for better performance)
export async function generateStaticParams() {
  try {
    // You can fetch all your Builder.io content here to pre-generate pages
    // This is optional and depends on your content strategy

    // Example: Get all pages with slugs
    // const pages = await getAllBuilderContent("page", {
    //   query: { "data.slug": { $exists: true } },
    // });

    // return pages.map((page) => ({
    //   slug: page.data?.slug,
    // })).filter(param => param.slug);

    // For now, return empty array to generate pages on-demand
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
