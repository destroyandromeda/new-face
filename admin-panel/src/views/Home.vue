<template>
  <div class="home">
    <BlogRoll />
  </div>
</template>

<script lang="ts">
import BlogRoll from "/src/components/blog/BlogRoll.vue";
export default {
  name: "Home",
  components: {
    BlogRoll,
  },
};
</script>
