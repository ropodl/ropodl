<script setup>
defineProps({
  content: {
    type: [String, null, undefined],
    required: true,
  },
});
</script>

<template>
  <div v-html="content" class="dynamic-content mb-3"></div>
</template>

<style lang="scss">
@use "sass:color";

// Variables for easy customization - Dark theme optimized
$font-family-base: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
$font-family-code: "Fira Code", "Cascadia Code", "Consolas", monospace;

// Dark theme colors
$bg-color-main: #121212;
$text-color-base: #e0e0e0;
$text-color-heading: #ffffff;
$text-color-link: #4fc3f7;
$text-color-link-hover: #29b6f6;
$text-color-blockquote: #81c784;
$text-color-caption: #aaaaaa;
$text-color-inline-code: #ff7043;
$text-color-code-block: #e0e0e0;
$text-color-info: #999999;

// Dark theme borders
$border-color-light: #333333;
$border-color-medium: #404040;
$border-color-blockquote: #4caf50;
$border-color-hr: #555555;

// Dark theme backgrounds
$bg-color-blockquote: #1e2e1e;
$bg-color-table-header: #2d2d2d;
$bg-color-table-even-row: #1a1a1a;
$bg-color-code-block: #1e1e1e;
$bg-color-inline-code: #2d2d2d;

// Dark theme shadows
$box-shadow-subtle: 0 4px 8px rgba(0, 0, 0, 0.4);

// utils
$max-width: 800px;

// Container for dynamic content
.dynamic-content {
  font-family: $font-family-base;
  line-height: 1.65;
  color: $text-color-base;
  word-wrap: break-word;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;
  overflow-x: hidden; // Prevent horizontal scroll from full-width elements

  // Basic paragraph styling
  p {
    margin-bottom: 1.1em;
  }
  p:not(:has(img), :has(iframe)) {
    margin: auto;
    max-width: $max-width;
  }
  p:has(img),
  p:has(iframe) {
    max-width: 100%;
    height: auto;
  }

  // Headings
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: auto;
    max-width: 800px;
    margin-top: 2.5em;
    margin-bottom: 1em;
    font-weight: 700;
    line-height: 1.2;
    color: $text-color-heading;
  }

  h1 {
    font-size: 2.5em;
    border-bottom: 2px solid $border-color-light;
    padding-bottom: 0.4em;
    margin-top: 1.5em;
  }

  h2 {
    font-size: 2em;
    color: color.adjust($text-color-heading, $lightness: -10%);
    border-bottom: 1px dashed $border-color-light;
    padding-bottom: 0.3em;
  }

  h3 {
    font-size: 1.7em;
    color: color.adjust($text-color-heading, $lightness: -20%);
  }

  h4 {
    font-size: 1.4em;
    color: color.adjust($text-color-heading, $lightness: -30%);
  }

  h5 {
    font-size: 1.2em;
    color: color.adjust($text-color-heading, $lightness: -40%);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h6 {
    font-size: 1.05em;
    color: color.adjust($text-color-heading, $lightness: -50%);
    font-style: italic;
  }

  // Links
  a {
    margin: auto;
    max-width: 800px;

    color: $text-color-link;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: $text-color-link-hover;
      text-decoration: underline;
    }
  }

  // Lists
  ul,
  ol {
    margin: auto;
    max-width: 800px;
    margin-bottom: 1.2em;
    padding-left: 2.2em;

    li {
      margin-bottom: 0.5em;
    }
  }

  ul li {
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  // Nested lists
  ul ul,
  ol ol,
  ul ol,
  ol ul {
    margin-top: 0.6em;
    margin-bottom: 0.6em;
  }

  // Strong and Emphasis - Dark theme optimized
  strong {
    font-weight: 700;
    color: $text-color-heading;
  }

  em {
    font-style: italic;
    color: color.adjust($text-color-base, $lightness: 15%);
  }

  // Selection colors for dark theme
  ::selection {
    background-color: white;
    color: black;
  }

  ::-moz-selection {
    background-color: white;
    color: black;
  }

  // Blockquote
  blockquote {
    max-width: calc($max-width + 5em);
    margin: 2em auto;
    padding: 1.5em 2em;
    border-left: 5px solid $border-color-blockquote;
    background-color: $bg-color-blockquote;
    color: $text-color-blockquote;
    font-style: italic;
    line-height: 1.7;
    border-radius: 4px;

    p:last-child {
      margin-bottom: 0;
    }
  }

  // Images and Figures - Full width media
  img {
    width: 100vw;
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.5em 0;
    border-radius: 0;

    // Prevent overflow on smaller screens
    @media (max-width: 768px) {
      margin-left: calc(50% - 50vw + 10px);
      margin-right: calc(50% - 50vw + 10px);
      width: calc(100vw - 20px);
    }
  }

  figure {
    width: 100vw;
    margin: 1.5em 0;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    text-align: center;
    position: relative;

    img {
      margin: 0 auto;
      width: 100%;
    }

    // Prevent overflow on smaller screens
    @media (max-width: 768px) {
      margin-left: calc(50% - 50vw + 10px);
      margin-right: calc(50% - 50vw + 10px);
      width: calc(100vw - 20px);
    }

    table {
      margin: auto;
      max-width: $max-width;
    }
  }

  figcaption {
    font-size: 0.88em;
    color: $text-color-caption;
    margin-top: 0.8em;
    font-style: italic;
    max-width: $max-width;
    margin-left: auto;
    margin-right: auto;
    padding: 0 15px;
    position: relative;
    z-index: 1;
  }

  // Video and other media elements
  video,
  iframe,
  embed,
  object {
    width: 100vw;
    max-width: none;
    height: auto;
    display: block;
    margin: 1.5em 0;
    width: 100%;

    // Maintain aspect ratio for videos and iframes
    &[src*="youtube"],
    &[src*="vimeo"],
    &[src*="video"] {
      aspect-ratio: 16/9;
      height: auto;
    }

    // Prevent overflow on smaller screens
    @media (max-width: 768px) {
      margin-left: calc(50% - 50vw + 10px);
      margin-right: calc(50% - 50vw + 10px);
      width: calc(100vw - 20px);
    }
  }

  // Tables - Full width on larger screens, scrollable on mobile
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2em;
    font-size: 0.95em;

    // Make tables full-width on larger screens
    @media (min-width: 900px) {
      width: 100vw;
      margin-left: calc(50% - 50vw);
      margin-right: calc(50% - 50vw);
    }

    // Horizontal scroll on mobile
    @media (max-width: 768px) {
      display: block;
      overflow-x: auto;
      white-space: nowrap;

      thead,
      tbody,
      tr,
      th,
      td {
        display: table-cell;
      }
    }

    th,
    td {
      border: 1px solid $border-color-medium;
      padding: 10px 12px;
      text-align: left;
    }

    th {
      background-color: $bg-color-table-header;
      font-weight: 700;
      color: $text-color-base;
    }

    tr:nth-child(even) {
      background-color: $bg-color-table-even-row;
    }
  }

  // Code Blocks
  pre {
    background-color: $bg-color-code-block;
    color: $text-color-code-block;
    padding: 1.2em;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 2em;
    font-family: $font-family-code;
    font-size: 0.9em;
    line-height: 1.5;

    code {
      color: inherit;
      background-color: transparent;
      padding: 0;
    }
  }

  // Inline Code
  code {
    font-family: $font-family-code;
    background-color: $bg-color-inline-code;
    color: $text-color-inline-code;
    padding: 0.25em 0.5em;
    border-radius: 3px;
    font-size: 0.88em;
    white-space: nowrap;
  }

  // Horizontal Rule
  hr {
    border: none;
    border-top: 1px dashed $border-color-hr;
    margin: 3em 0;
  }

  // Text Alignment
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-justify {
    text-align: justify;
  }

  // Optional: Drop Cap - Dark theme optimized
  p.dropcap::first-letter {
    float: left;
    font-size: 4em;
    line-height: 0.8;
    padding-right: 8px;
    font-family: Georgia, serif;
    font-weight: bold;
    color: $text-color-link;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  // Optional: Custom Classes for Alerts/Highlights - Dark theme
  .alert {
    padding: 1em 1.5em;
    border-left: 5px solid;
    border-radius: 4px;
    margin-bottom: 1.5em;
    font-size: 0.95em;
  }

  .alert-info {
    background-color: #1a2332;
    border-color: #2196f3;
    color: #81d4fa;
  }

  .alert-success {
    background-color: #1b2e1b;
    border-color: #4caf50;
    color: #a5d6a7;
  }

  .alert-warning {
    background-color: #2e2416;
    border-color: #ff9800;
    color: #ffcc02;
  }

  .alert-danger {
    background-color: #2e1618;
    border-color: #f44336;
    color: #ef9a9a;
  }

  // Optional: Spacing for elements without explicit margins
  // This helps ensure consistent vertical rhythm
  > *:not(:last-child) {
    margin-bottom: 1em;
  }

  > h1:not(:first-child),
  > h2:not(:first-child),
  > h3:not(:first-child),
  > h4:not(:first-child),
  > h5:not(:first-child),
  > h6:not(:first-child) {
    margin-top: 2.5em;
  }

  // Modified CKEditor 5 image classes for full-width context
  .image {
    &.image-style-side {
      width: 50%;
      float: right;
      margin: 0 0 1em 1.5em;
      // Reset full-width styles for floated images
      margin-left: 1.5em !important;
      margin-right: 0 !important;
      max-width: 50%;

      img {
        width: 100% !important;
        margin: 0 !important;
        box-shadow: $box-shadow-subtle;
        border-radius: 5px;
      }
    }

    &.image-style-align-left {
      width: 50%;
      float: left;
      margin: 0 1.5em 1em 0;
      // Reset full-width styles for floated images
      margin-left: 0 !important;
      margin-right: 1.5em !important;
      max-width: 50%;

      img {
        width: 100% !important;
        margin: 0 !important;
        box-shadow: $box-shadow-subtle;
        border-radius: 5px;
      }
    }

    &.image-style-align-right {
      width: 50%;
      float: right;
      margin: 0 0 1em 1.5em;
      // Reset full-width styles for floated images
      margin-left: 1.5em !important;
      margin-right: 0 !important;
      max-width: 50%;

      img {
        width: 100% !important;
        margin: 0 !important;
        box-shadow: $box-shadow-subtle;
        border-radius: 5px;
      }
    }

    // Full-width image class
    &.image-style-full-width {
      width: 100vw;
      margin-left: calc(50% - 50vw);
      margin-right: calc(50% - 50vw);

      img {
        width: 100%;
        margin: 0;
      }
    }

    // Responsive behavior for floated images
    @media (max-width: 768px) {
      &.image-style-side,
      &.image-style-align-left,
      &.image-style-align-right {
        width: 100% !important;
        float: none !important;
        margin: 1.5em 0 !important;
        max-width: none !important;

        img {
          width: 100% !important;
        }
      }
    }
  }

  // Clearfix for floated images
  &::after {
    content: "";
    display: table;
    clear: both;
  }

  // Optional: Placeholder for custom styles generated by plugins - Dark theme
  .text-blue {
    color: #4fc3f7 !important;
  }

  .bg-light-yellow {
    background-color: #2d2a1a !important;
  }

  .text-highlight {
    background-color: #4a4a00 !important;
    color: #ffff88 !important;
    padding: 0.1em 0.3em;
    border-radius: 2px;
  }
}

// Optional: Word Count / Character Count Styling (if you display this)
.dynamic-content-info {
  font-size: $text-color-info;
  color: #888;
  text-align: right;
  margin-top: 1em;
}
</style>
