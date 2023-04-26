<template>
  <video id="video" autoplay playsinline></video>
  <canvas id="canvas" width="360" height="270"></canvas>
</template>

<script setup>
import { onMounted } from "vue";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";

import { drawPoint, drawLine } from "@/utils";

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

  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log("🚀🚀🚀 / devices", devices);
};

const detectPose = async () => {
  const poses = await detector.estimatePoses(canvasOutput, {
    flipHorizontal: false, // 是否水平翻转
    maxPoses: 1, // 最大检测人数
    scoreThreshold: 0.5, // 置信度
    nmsRadius: 20, // 非极大值抑制
  });
  const poseList = poses[0]?.keypoints || [];
  console.log("poseList", poseList);
  // 绘制
  ctx.drawImage(canvasOutput, 0, 0, canvas.width, canvas.height);

  poseList.forEach(({ x, y, score }) => {
    if (score > 0.5) {
      // 画点
      drawPoint(x, y, 5, "#f00000", ctx);
    }
    // test
    drawPoint(x, y, 5, "#f00000", ctx);
  });

  // 获取相邻的关节点信息
  const adjPairs = poseDetection.util.getAdjacentPairs(model);
  console.log("adjPairs", adjPairs);
  adjPairs.forEach((item) => {
    const keyPoint1 = item[0];
    const keyPoint2 = item[1];
    const score1 = poseList[keyPoint1]?.score;
    const score2 = poseList[keyPoint2]?.score;
    if (score1 > 0.5 && score2 > 0.5) {
      drawLine(keyPoint1, keyPoint2, "aqua", ctx);
    }
    // test
    drawLine(keyPoint1, keyPoint2, "black", ctx);
  });

  requestAnimationFrame(() => detectPose());
};

//

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
