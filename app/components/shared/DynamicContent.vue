<script setup>
defineProps({
  content: {
    type: [String, null, undefined],
    required: true,
  },
});
</script>
<template>
  <template></template>
  <div v-html="content" class="dynamic-content mb-3"></div>
</template>

<style lang="scss">
// Variables for easy customization
$font-family-base: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
$font-family-code: "Fira Code", "Cascadia Code", "Consolas", monospace;

$text-color-base: #333;
$text-color-heading: #222;
$text-color-link: #007bff;
$text-color-link-hover: #0056b3;
$text-color-blockquote: #457b9d;
$text-color-caption: #777;
$text-color-inline-code: #c7254e;
$text-color-code-block: #abb2bf;
$text-color-info: #888;

$border-color-light: #eee;
$border-color-medium: #ddd;
$border-color-blockquote: #a8dadc;
$border-color-hr: #ccc;

$bg-color-blockquote: #f1faee;
$bg-color-table-header: #e0f2f7;
$bg-color-table-even-row: #f9f9f9;
$bg-color-code-block: #282c34;
$bg-color-inline-code: #e7e7e7;

$box-shadow-subtle: 0 4px 8px rgba(0, 0, 0, 0.1);

// Container for dynamic content
.dynamic-content {
  font-family: $font-family-base;
  line-height: 1.65;
  color: $text-color-base;
  word-wrap: break-word;
  max-width: 800px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;

  // Basic paragraph styling
  p {
    margin-bottom: 1.1em;
  }

  // Headings
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
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
    color: lighten($text-color-heading, 10%);
    border-bottom: 1px dashed $border-color-light;
    padding-bottom: 0.3em;
  }

  h3 {
    font-size: 1.7em;
    color: lighten($text-color-heading, 20%);
  }

  h4 {
    font-size: 1.4em;
    color: lighten($text-color-heading, 30%);
  }

  h5 {
    font-size: 1.2em;
    color: lighten($text-color-heading, 40%);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h6 {
    font-size: 1.05em;
    color: lighten($text-color-heading, 50%);
    font-style: italic;
  }

  // Links
  a {
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

  // Strong and Emphasis
  strong {
    font-weight: 700;
    color: $text-color-heading;
  }

  em {
    font-style: italic;
    color: lighten($text-color-base, 20%);
  }

  // Blockquote
  blockquote {
    margin: 2em 0;
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

  // Images and Figures
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.5em auto;
    border-radius: 5px;
    box-shadow: $box-shadow-subtle;
  }

  figure {
    margin: 1.5em auto;
    text-align: center;
  }

  figcaption {
    font-size: 0.88em;
    color: $text-color-caption;
    margin-top: 0.8em;
    font-style: italic;
  }

  // Tables
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2em;
    font-size: 0.95em;

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

  // Optional: Drop Cap
  p.dropcap::first-letter {
    float: left;
    font-size: 4em;
    line-height: 0.8;
    padding-right: 8px;
    font-family: Georgia, serif;
    font-weight: bold;
    color: $text-color-link;
  }

  // Optional: Custom Classes for Alerts/Highlights
  .alert {
    padding: 1em 1.5em;
    border-left: 5px solid;
    border-radius: 4px;
    margin-bottom: 1.5em;
    font-size: 0.95em;
  }

  .alert-info {
    background-color: #d1ecf1;
    border-color: #bee5eb;
    color: #0c5460;
  }

  .alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
  }

  .alert-warning {
    background-color: #fff3cd;
    border-color: #ffeeba;
    color: #856404;
  }

  .alert-danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
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

  // Specific CKEditor 5 image classes (if using image styles)
  .image {
    &.image-style-side {
      width: 50%;
      float: right;
      margin: 0 0 1em 1.5em;
    }

    &.image-style-align-left {
      float: left;
      margin: 0 1.5em 1em 0;
    }

    &.image-style-align-right {
      float: right;
      margin: 0 0 1em 1.5em;
    }
  }

  // Clearfix for floated images
  &::after {
    content: "";
    display: table;
    clear: both;
  }

  // Optional: Placeholder for custom styles generated by plugins
  .text-blue {
    color: #007bff !important;
  }

  .bg-light-yellow {
    background-color: #fffacd !important;
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
