<template>
  <div>
    <img src="@/assets/kty.jpg" alt="" id="image" />
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import '@tensorflow/tfjs-backend-webgl'
import * as tf from '@tensorflow/tfjs-core'
import * as bodySegmentation from '@tensorflow-models/body-segmentation'
import { onMounted } from 'vue'

const init = async () => {
  const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation
  const segmenterConfig = {
    runtime: 'mediapipe', // or 'tfjs'
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
    modelType: 'general',
  }
  const segmenter = await bodySegmentation.createSegmenter(
    model,
    segmenterConfig
  )

  // const people = await segmenter.segmentPeople(image)
  const img = document.getElementById('image')

  const segmentation = await segmenter.segmentPeople(img)

  // The mask image is an binary mask image with a 1 where there is a person and
  // a 0 where there is not.
  const coloredPartImage = await bodySegmentation.toBinaryMask(segmentation)
  const opacity = 0.7
  const flipHorizontal = false
  const maskBlurAmount = 0
  const canvas = document.getElementById('canvas')
  // Draw the mask image on top of the original image onto a canvas.
  // The colored part image will be drawn semi-transparent, with an opacity of
  // 0.7, allowing for the original image to be visible under.
  bodySegmentation.drawMask(
    canvas,
    img,
    coloredPartImage,
    opacity,
    maskBlurAmount,
    flipHorizontal
  )
}

onMounted(() => {
  init()
})
</script>

<style scoped></style>
