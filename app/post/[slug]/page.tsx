import classNames from "classnames";
import React from "react";
import PostPageComponent from "@app/page-components/PostPageComponent/PostPageComponent";
import { generateOgMetadata } from "@app/shared-components/OgImage";
import { Metadata } from "next";
import {
  getBuilderPostBySlug,
  getAllBuilderPosts,
  transformBuilderPostToWixFormat,
  extractSlugFromPath,
} from "@app/utils/builderPostUtils";

// Force dynamic rendering to always get fresh data
// This ensures newly created/updated posts are immediately visible
export const dynamic = "force-dynamic";

// Disable caching for this route to ensure fresh Builder.io data
export const revalidate = 0;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Fetch from Builder.io
  const builderPost = await getBuilderPostBySlug(params.slug);

  if (!builderPost) {
    return generateOgMetadata({});
  }

  // Transform Builder.io data to expected format
  const postPageItem = transformBuilderPostToWixFormat(builderPost);

  if (!postPageItem) {
    return generateOgMetadata({});
  }

  // console.log("[Builder.io] Generating metadata for:", params.slug);

  let primaryImage =
    postPageItem.data?.postImage1?.url !== " "
      ? postPageItem.data?.postImage1?.url
      : "https://futures4europe.eu/images/placeholder.webp";
  let secondaryImage =
    postPageItem.data?.postImage2?.url !== " "
      ? postPageItem.data?.postImage2?.url
      : "https://futures4europe.eu/images/placeholder.webp";

  if (postPageItem.data?.pageTypes?.[0]?.name === "project result") {
    primaryImage = postPageItem.data?.projectResultMedia?.thumbnail;
    secondaryImage = "https://futures4europe.eu/images/placeholder.webp";
  }

  return generateOgMetadata({
    title: postPageItem.data?.title || "Futures4Europe",
    description: postPageItem.data?.subtitle || "",
    primaryImage: primaryImage,
    secondaryImage: secondaryImage,
    url: `https://futures4europe.eu/post/${params.slug}`,
  });
}

// Function to generate static paths
export async function generateStaticParams() {
  // Get posts from Builder.io only
  const builderPosts = await getAllBuilderPosts();

  // Transform Builder.io slugs
  const slugs = builderPosts
    .map((post: any) => {
      const slug = extractSlugFromPath(post?.data?.slug);
      return slug ? { slug } : null;
    })
    .filter(Boolean);

  console.log(
    `[Static Paths] Generated ${slugs.length} slug(s) from Builder.io`
  );

  return slugs;
}

export default async function PostPage({ params }: any) {
  // Fetch from Builder.io only
  const builderPost = await getBuilderPostBySlug(params.slug);

  if (!builderPost) {
    console.log("[Builder.io] ❌ Post not found:", params.slug);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-4">
            The post you're looking for doesn't exist in Builder.io.
          </p>
          <p className="text-sm text-gray-500">
            Make sure the post is published and the slug matches: /post/
            {params.slug}
          </p>
        </div>
      </div>
    );
  }

  // Transform Builder.io data to expected format
  const postPageItem = transformBuilderPostToWixFormat(builderPost);
  console.log("[Builder.io] ✅ Rendering post:", params.slug);

  return (
    <div className={classNames("w-full")}>
      {/* Optional: Add a Builder.io indicator in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-xs z-50 shadow-lg">
          🔷 Builder.io
        </div>
      )}
      <PostPageComponent pageTitle={params.slug} post={postPageItem} />
    </div>
  );
}
