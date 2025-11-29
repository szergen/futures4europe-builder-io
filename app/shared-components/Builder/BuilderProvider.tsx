"use client";

import { builder } from "@builder.io/react";
import { builderConfig } from "../../../builder.config";
import { ReactNode, useEffect } from "react";

// Import component registrations
import "./components/TagComponent";

// Initialize Builder.io
if (builderConfig.apiKey) {
  builder.init(builderConfig.apiKey);
} else {
  console.warn(
    "Builder.io API key not found. Please set NEXT_PUBLIC_BUILDER_API_KEY in your .env.local file"
  );
}

interface BuilderProviderProps {
  children: ReactNode;
}

export default function BuilderProvider({ children }: BuilderProviderProps) {
  useEffect(() => {
    // Any additional Builder.io setup can go here
    if (builderConfig.apiKey) {
      console.log("Builder.io initialized successfully");
      console.log("Custom components registered: Tag");
    }
  }, []);

  return <>{children}</>;
}
