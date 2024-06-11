import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import router from "./router/index";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();
createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(pinia)
  .use(router)
  .mount("#app");
