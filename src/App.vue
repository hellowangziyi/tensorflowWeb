<script setup>
import { ref } from "vue";
import TakePhotos from "./components/TakePhotos.vue";

const activeKey = ref("1");
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" class="tabs-menu">
    <a-tab-pane key="1" tab="Take Photos">
      <TakePhotos></TakePhotos>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" force-render
      >Content of Tab Pane 2</a-tab-pane
    >
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>

<style scoped>
.tabs-menu {
  margin: 24px;
}
</style>
