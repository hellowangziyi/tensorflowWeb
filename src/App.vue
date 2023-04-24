<script setup>
import { onMounted } from "vue";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

import * as poseDetection from "@tensorflow-models/pose-detection";
// 视频输入
let videoInput;
// canvas输出
let canvasOutput;
// 模型
let model;
// 模型加载器
let detector;
// 画布上下文
let ctx;

const init = async () => {
  // 获取视频
  videoInput = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 360, height: 270 },
    // video: true,
  });
  videoInput.srcObject = stream;

  // 获取canvas
  canvasOutput = document.getElementById("canvas");
  ctx = canvasOutput.getContext("2d");

  // 定义模型
  model = poseDetection.SupportedModels.PoseNet;
  // 加载模型
  detector = await poseDetection.createDetector(model);
  // 开始检测
  detectPose();
};

const detectPose = async () => {
  const poses = await detector.estimatePoses(canvasOutput, {
    flipHorizontal: false, // 是否水平翻转
    maxPoses: 1, // 最大检测人数
    scoreThreshold: 0.5, // 置信度
    nmsRadius: 20, // 非极大值抑制
  });
  const poseList = poses[0]?.keypoints || [];

  // 绘制
  ctx.drawImage(canvasOutput, 0, 0, canvas.width, canvas.height);

  poseList.forEach(({ x, y, score }) => {
    if (score > 0.5) {
      // 画点
      drawPoint(x, y, 5, "#f00000", ctx);
    }
  });
};

//

onMounted(() => {
  init();
});
</script>

<template>
  <video id="video" autoplay playsinline></video>
  <canvas id="canvas" width="360" height="270"></canvas>
</template>

<style scoped></style>
