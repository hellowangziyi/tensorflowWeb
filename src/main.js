import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Button, Tabs, Input } from "ant-design-vue";
import * as Icons from "@ant-design/icons-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);

app.use(Button);
app.use(Tabs);
app.use(Input);
// app.use(message);

// 注册图标组件
for (const i in Icons) {
  app.component(i, Icons[i]);
}

app.mount("#app");

// app.config.globalProperties.$message = message;

// createApp(App).mount("#app");
