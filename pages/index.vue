<template>
  <div class="home-page">
    <Shared-Hero />
    <div style="position: relative">
      <div class="side-banner" />
      <Shared-ServiceCard />
      <Shared-NumberCard />
    </div>
    <div style="position: relative">
      <div class="mid-banner" />
      <Shared-Project />
      <Shared-Contact />
      <Layout-FooterLink />
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
<style lang="scss">
div.home-page {
  .side-banner {
    position: absolute;
    inset: 0;
    background-color: #181818;
    height: 100%;
    width: 50%;
  }
}
</style>
