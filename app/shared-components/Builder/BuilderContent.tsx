"use client";

import { BuilderComponent, useIsPreviewing } from "@builder.io/react";

interface BuilderContentProps {
  model: "page" | "admin-section" | "blog-post-test" | "tag";
  content?: any;
  data?: any;
  loading?: React.ReactNode;
  error?: React.ReactNode;
}

export default function BuilderContent({
  model,
  content,
  data,
  loading = <div>Loading...</div>,
  error = <div>Content not found</div>,
}: BuilderContentProps) {
  const isPreviewing = useIsPreviewing();

  // Show loading state
  if (!content && !isPreviewing) {
    return <>{loading}</>;
  }

  // Show error state if no content found
  if (!content && !isPreviewing) {
    return <>{error}</>;
  }

  return <BuilderComponent model={model} content={content} data={data} />;
}
