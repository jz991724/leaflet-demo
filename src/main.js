import Vue from 'vue'
import App from './App.vue'

// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet.pm";
// import "leaflet.pm/dist/leaflet.pm.css";

Vue.config.productionTip = false

Vue.L = Vue.prototype.$L = L;

//设置默认的icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

new Vue({
    render: h => h(App),
}).$mount('#app')
