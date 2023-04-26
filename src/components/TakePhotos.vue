<template>
  <div class="take-photos-top">
    <video id="localVideo" autoplay playsinline muted></video>
    <a-button @click="takePhoto" type="primary" class="btn">
      笑一个吧~嘿嘿嘿</a-button
    >
  </div>

  <div class="imgList-container">
    <div v-for="(item, index) in imgList" :key="index" class="imgList-box">
      <img :src="item" alt="" class="img-item" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const imgList = ref([]);

const init = async () => {
  const video = document.getElementById("localVideo");

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 360, height: 270 },
  });
  video.srcObject = stream;
};

const takePhoto = () => {
  // 重置数组
  imgList.value = [];
  // 添加滤镜
  const filterList = [
    "blur(5px)", // 模糊
    "brightness(0.5)", // 亮度
    "contrast(200%)", // 对比度
    "grayscale(100%)", // 灰度
    "hue-rotate(90deg)", // 色相旋转
    "invert(100%)", // 反色
    "opacity(90%)", // 透明度
    "saturate(200%)", // 饱和度
    "saturate(20%)", // 饱和度
    "sepia(100%)", // 褐色
    "drop-shadow(4px 4px 8px blue)", // 阴影
    "blur(5px) drop-shadow(2px 2px 2px rgba(0,0,0,0.5))",
  ];
  const video = document.getElementById("localVideo");
  // video.addEventListener("loadedmetadata", () => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   const ctx = canvas.getContext("2d");
  //   for (let i = 0; i < filterList.length; i++) {
  //     ctx.filter = filterList[i];
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //     imgList.value.push(canvas.toDataURL("image/png"));
  //   }
  // });
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  for (let i = 0; i < filterList.length; i++) {
    ctx.filter = filterList[i];
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    imgList.value.push(canvas.toDataURL("image/png"));
  }

  console.log("imgList", imgList);
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.take-photos-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}
.img-item {
  width: 360px;
  height: 270px;
}

.btn {
  width: 360px;
  margin-top: 24px;
}

.localVideo {
  width: 360px;
  height: 270px;
}

.imgList-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.imgList-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
