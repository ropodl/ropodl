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
div.dynamic-content {
  line-height: 1.6rem !important;
  font-weight: 400;

  figure.image {
    display: inline-block;
    border: 1px solid gray;
    margin: 0 2px 0 1px;
    background: #f5f2f0;
  }

  figure.align-left {
    float: left;
  }

  figure.align-right {
    float: right;
  }

  figure.image img {
    margin: 8px 8px 0 8px;
  }

  figure.image figcaption {
    margin: 6px 8px 6px 8px;
    text-align: center;
  }

  img.align-left {
    float: left;
  }

  img.align-right {
    float: right;
  }

  .mce-toc {
    border: 1px solid gray;
  }

  .mce-toc h2 {
    margin: 4px;
  }

  .mce-toc li {
    list-style-type: none;
  }

  .tox-checklist > li:not(.tox-checklist--hidden) {
    list-style: none;
    margin: 0.25em 0;
    position: relative;
  }
  .tox-checklist > li:not(.tox-checklist--hidden)::before {
    content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-unchecked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2215%22%20height%3D%2215%22%20x%3D%22.5%22%20y%3D%22.5%22%20fill-rule%3D%22nonzero%22%20stroke%3D%22%234C4C4C%22%20rx%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A");
    cursor: pointer;
    height: 1em;
    margin-left: -1.5em;
    margin-top: 0.125em;
    position: absolute;
    width: 1em;
  }
  .tox-checklist li:not(.tox-checklist--hidden).tox-checklist--checked::before {
    content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-checked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234099FF%22%20fill-rule%3D%22nonzero%22%20rx%3D%222%22%2F%3E%3Cpath%20id%3D%22Path%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20d%3D%22M11.5703186%2C3.14417309%20C11.8516238%2C2.73724603%2012.4164781%2C2.62829933%2012.83558%2C2.89774797%20C13.260121%2C3.17069355%2013.3759736%2C3.72932262%2013.0909105%2C4.14168582%20L7.7580587%2C11.8560195%20C7.43776896%2C12.3193404%206.76483983%2C12.3852142%206.35607322%2C11.9948725%20L3.02491697%2C8.8138662%20C2.66090143%2C8.46625845%202.65798871%2C7.89594698%203.01850234%2C7.54483354%20C3.373942%2C7.19866177%203.94940006%2C7.19592841%204.30829608%2C7.5386474%20L6.85276923%2C9.9684299%20L11.5703186%2C3.14417309%20Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A");
  }

  .tiny-pageembed--21by9,
  .tiny-pageembed--16by9,
  .tiny-pageembed--4by3,
  .tiny-pageembed--1by1 {
    display: block;
    overflow: hidden;
    padding: 0;
    position: relative;
    width: 100%;
  }

  .tiny-pageembed--21by9 {
    padding-top: 42.857143%;
  }

  .tiny-pageembed--16by9 {
    padding-top: 56.25%;
  }

  .tiny-pageembed--4by3 {
    padding-top: 75%;
  }

  .tiny-pageembed--1by1 {
    padding-top: 100%;
  }

  .tiny-pageembed--21by9 iframe,
  .tiny-pageembed--16by9 iframe,
  .tiny-pageembed--4by3 iframe,
  .tiny-pageembed--1by1 iframe {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .ephox-summary-card {
    border: 1px solid #aaa;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 10px;
    overflow: hidden;
    margin-bottom: 1em;
  }

  .ephox-summary-card a {
    text-decoration: none;
    color: inherit;
  }

  .ephox-summary-card a:visited {
    color: inherit;
  }

  .ephox-summary-card-title {
    font-size: 1.2em;
    display: block;
  }

  .ephox-summary-card-author {
    color: #999;
    display: block;
    margin-top: 0.5em;
  }

  .ephox-summary-card-website {
    color: #999;
    display: block;
    margin-top: 0.5em;
  }

  .ephox-summary-card-thumbnail {
    max-width: 180px;
    max-height: 180px;
    margin-left: 2em;
    float: right;
  }

  .ephox-summary-card-description {
    margin-top: 0.5em;
    display: block;
  }

  div.mce-footnotes hr {
    margin-inline-end: auto;
    margin-inline-start: 0;
    width: 25%;
  }

  div.mce-footnotes li > a.mce-footnotes-backlink {
    text-decoration: none;
  }

  @media print {
    sup.mce-footnote a {
      color: black;
      text-decoration: none;
    }
    div.mce-footnotes {
      break-inside: avoid;
      width: 100%;
    }
    div.mce-footnotes li > a.mce-footnotes-backlink {
      display: none;
    }
  }

  img {
    border-radius: 10px;
    max-width: 100%;
    height: auto;
  }

  figure {
    figcaption {
      margin: 0;
      margin-bottom: 10px;
      padding: 0;
      font-size: 0.8rem;
      line-height: 1.25rem;
      text-align: right;
      justify-content: flex-end;
    }

    a {
      background-color: transparent;
      background-size: 0px;

      &:hover {
        background-size: 0px;
      }
    }
  }

  video {
    width: 100%;
    height: auto;
  }

  p {
    margin-top: 0;
    margin-bottom: 30px;
  }

  ul,
  ol {
    margin-bottom: 1rem;
    li {
      p {
        margin-bottom: 0 !important;
      }
    }
  }

  blockquote {
    position: relative;
    font-size: 20px;
    margin-bottom: 20px;
    border-right: 10px solid var(--v-primary-base);
    background-color: rgba(50, 50, 50, 0.4);

    &::before {
      content: open-quote;
      position: absolute;
      top: 0;
      left: -10px;
      font-family: medium-content-serif-font, Georgia, Cambria,
        "Times New Roman", Times, serif;
      font-size: 50px;
      font-weight: 900;
    }
  }

  pre {
    padding: 10px 10px;
    overflow: auto;
    margin-bottom: 10px;
    background-color: #2d2d2d;
    color: white;
  }

  h1 {
    font-size: 2.5rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h2 {
    font-size: 2rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h3 {
    font-size: 1.75rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h4 {
    font-size: 1.5rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h5 {
    font-size: 1.25rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h6 {
    font-size: 1rem !important;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }
}
</style>
