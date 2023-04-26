import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Button, message, Tabs } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);

app.use(Button);
app.use(Tabs);
app.mount("#app");

app.config.globalProperties.$message = message;

// createApp(App).mount("#app");
