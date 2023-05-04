<script setup>
import { ref } from 'vue'
import TakePhotos from './components/TakePhotos.vue'
import FaceTime from './components/FaceTime.vue'
import PostNet from './components/PostNet.vue'
import VirtualBackground from './components/VirtualBackground.vue'

const activeKey = ref('1')
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" class="tabs-menu">
    <a-tab-pane key="1" tab="Take Photos">
      <TakePhotos v-if="activeKey === '1'"></TakePhotos>
    </a-tab-pane>
    <a-tab-pane key="2" tab="FaceTime" force-render>
      <FaceTime v-if="activeKey === '2'"></FaceTime>
    </a-tab-pane>
    <a-tab-pane key="3" tab="Pose">
      <PostNet v-if="activeKey === '3'"></PostNet>
    </a-tab-pane>
    <a-tab-pane key="4" tab="Virtual">
      <VirtualBackground v-if="activeKey === '4'"></VirtualBackground>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped>
.tabs-menu {
  margin: 24px;
}
</style>
