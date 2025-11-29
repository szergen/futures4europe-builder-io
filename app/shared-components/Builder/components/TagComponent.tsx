"use client";

import { Builder } from "@builder.io/react";
import { Tag, TagProps } from "../../Tag/Tag";
import { TagCategories } from "../../Tag/Tag.utils";

// Register the Tag component with Builder.io
Builder.registerComponent(Tag, {
  name: "Tag",
  image: "https://tabler-icons.io/static/tabler-icons/icons/tag.svg",
  inputs: [
    {
      name: "name",
      type: "string",
      required: true,
      helperText: "The display name of the tag",
      defaultValue: "Sample Tag",
    },
    {
      name: "tagCategory",
      type: "string",
      enum: Object.values(TagCategories),
      helperText: "Category of the tag",
    },
    {
      name: "tagPageLink",
      type: "url",
      helperText: "Custom link for the tag (optional)",
    },
    {
      name: "picture",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      helperText: "Tag icon/image",
    },
    {
      name: "pictureAlt",
      type: "string",
      helperText: "Alt text for the tag image",
      showIf: "options.get('picture')",
    },
    {
      name: "tagTrend",
      type: "number",
      helperText: "Tag trend value (optional)",
      min: -100,
      max: 100,
    },
    {
      name: "enableLabel",
      type: "boolean",
      defaultValue: false,
      helperText: "Show category label before the tag",
    },
    {
      name: "tagType",
      type: "string",
      enum: ["person", "organisation", "project", "other"],
      helperText: "Type of tag for styling purposes",
    },
    {
      name: "tagLine",
      type: "string",
      helperText: "Subtitle or description for the tag",
    },
    {
      name: "disableTooltip",
      type: "boolean",
      defaultValue: false,
      helperText: "Disable hover tooltip",
    },
    {
      name: "disableLink",
      type: "boolean",
      defaultValue: false,
      helperText: "Disable tag link functionality",
    },
    {
      name: "disablePopularityHover",
      type: "boolean",
      defaultValue: false,
      helperText: "Disable popularity display on hover",
    },
    {
      name: "mentions",
      type: "number",
      helperText: "Number of mentions (popularity)",
      min: 0,
    },
    {
      name: "hardcodedMentions",
      type: "number",
      helperText: "Override mentions with fixed number",
      min: 0,
    },
    {
      name: "disableUnderline",
      type: "boolean",
      defaultValue: false,
      helperText: "Disable underline styling",
    },
    {
      name: "masterTag",
      type: "string",
      helperText: "Master tag ID for tag hierarchy",
    },
    {
      name: "className",
      type: "string",
      helperText: "Additional CSS classes",
    },
  ],
  // Default props for when the component is added
  defaultValue: {
    name: "Sample Tag",
    tagCategory: TagCategories.domains,
    enableLabel: false,
    disableTooltip: false,
    disableLink: false,
    disablePopularityHover: false,
    disableUnderline: false,
  },
  // Override any sub-components or styling
  override: {
    // Prevent Builder from wrapping this in additional divs
    canHaveChildren: false,
  },
});

export default Tag;
