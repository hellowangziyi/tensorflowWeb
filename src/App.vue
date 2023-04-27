<script setup>
import { ref } from "vue";
import TakePhotos from "./components/TakePhotos.vue";
import FaceTime from "./components/FaceTime.vue";
import PostNet from "./components/PostNet.vue";

const activeKey = ref("1");
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" class="tabs-menu">
    <a-tab-pane key="1" tab="Take Photos">
      <TakePhotos></TakePhotos>
    </a-tab-pane>
    <a-tab-pane key="2" tab="FaceTime" force-render>
      <FaceTime></FaceTime>
    </a-tab-pane>
    <a-tab-pane key="3" tab="Pose">
      <PostNet></PostNet>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
.tabs-menu {
  margin: 24px;
}
</style>
