<template>
  <div class="facetime">
    <div class="video-container">
      <div class="video-box">
        <video id="local" autoplay playsinline muted></video>
        <div class="video-title">我</div>
      </div>
      <div class="video-box">
        <video id="remote" autoplay playsinline muted></video>
        <div class="video-title">远程视频</div>
      </div>
    </div>
    <div class="operations">
      <!-- step1 -->
      <div class="user">
        <p>用户1的操作区域</p>
        <div class="desc">
          <a-button type="primary" @click="createOffer" id="create-offer"
            >创建offer</a-button
          >
        </div>
        <div class="action-box">
          <p>SDP offer:</p>
          <a-input-search v-model:value="offerSdp" placeholder="SDP offer">
            <template #enterButton>
              <a-button type="primary" @click="copyToClipboard(offerSdp)"
                >点击复制</a-button
              >
            </template>
          </a-input-search>
        </div>
      </div>
      <!-- step2 -->
      <div class="user">
        <p>用户2的操作区域</p>
        <div class="desc">
          <p>
            用户 2将用户1 刚才生成的SDP offer 粘贴到下方，点击 "创建答案
            "来生成SDP答案，然后将 SDP Answer 复制给用户 1。
          </p>
        </div>
        <div class="action-box">
          <a-input-search
            v-model:value="offerSdpMock"
            placeholder="用户1的offer"
          >
            <template #enterButton>
              <a-button type="primary" @click="createAnswer">创建答案</a-button>
            </template>
          </a-input-search>
          <p>answer SDP:</p>
          <a-input-search v-model:value="answerSdp" placeholder="SDP answer">
            <template #enterButton>
              <a-button type="primary" @click="copyToClipboard(answerSdp)"
                >点击复制</a-button
              >
            </template>
          </a-input-search>
        </div>
      </div>
      <!-- step3 -->
      <div class="user">
        <p>用户1的操作区域</p>
        <div class="desc">
          <p>将用户 2 创建的 Answer 粘贴到下方，然后点击 Add Answer。</p>
        </div>
        <div class="action-box">
          <p>answer SDP:</p>
          <a-input-search
            v-model:value="answerSdpMock"
            placeholder="SDP answer"
          >
            <template #enterButton>
              <a-button type="primary" @click="addAnswer">添加答案</a-button>
            </template>
          </a-input-search>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import "webrtc-adapter";

const pc = new RTCPeerConnection();
// 本地创建的offer
let offerSdp = ref("");
let answerSdp = ref("");

const init = async () => {
  const localVideo = document.getElementById("local");
  const remoteVideo = document.getElementById("remote");

  // 设置本地视频
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  localVideo.srcObject = localStream;

  // 将本地视频添加到媒体流轨道
  console.log("localStream.getTracks", localStream.getTracks());
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });
  // ontrack监听添加轨道事件
  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };
};

/* 建立连接 */

const createOffer = async () => {
  const offer = await pc.createOffer();
  // 设置本地描述
  await pc.setLocalDescription(offer);
  console.log("local", pc);

  // 到这里，我们本地的 offer 就创建好了，一般在这里通过信令服务器发送 offerSdp 给远端

  // 监听ICE服务器返回的候选地址
  pc.onicecandidate = (event) => {
    console.log("onicecandidate", event);
    if (event.candidate) {
      offerSdp.value = JSON.stringify(pc.localDescription);
    }
  };
};

// 模拟传来的offersdp
let offerSdpMock = ref("");
const createAnswer = async () => {
  if (offerSdpMock.value === "") {
    message.error("请填写offer!");
    return false;
  }
  console.log("offerSdpMock", offerSdpMock);
  const offer = JSON.parse(offerSdpMock.value);
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      // 更新answerSdp
      answerSdp.value = JSON.stringify(pc.localDescription);
    }
  };
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
};

// 应答
let answerSdpMock = ref("");
const addAnswer = () => {
  const answer = JSON.parse(answerSdpMock.value);
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(answer);
  }
};
onMounted(() => {
  init();
});

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  // this.$message({
  //   message: "复制成功",
  //   type: "success",
  // });
  message.success("复制成功");
};
</script>

<style scoped>
.facetime {
  display: flex;
  padding: 12px;
}
.video-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.operations {
  padding: 12px;
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f1f2f5;
  border-radius: 2px;
  padding: 6px;
  margin-bottom: 12px;
}
</style>
