<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;
const MAP_PLUGINS = [
    'AMap.Manager', 'AMap.Scale',
    'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',
    'AMap.CircleEditor', 'Geocoder', 'Geolocation', 'AMap.MarkerClusterer',
    'AMap.PolyEditor', 'AMap.MouseTool',
    'AMap.Driving', 'AMap.CitySearch', 'AMap.InfoWindow', 'AMap.LngLat',
    'AMap.DistrictSearch', 'AMap.TileLayer.Traffic',
    'AMap.Heatmap', 'AMap.Autocomplete',
    'AMap.PlaceSearch',
    "AMap.ControlBar",
    "AMap.HawkEye",
    "AMap.DrivingRender"
]
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "42abe4ee2f0aec813f1c8ae977209af4",
  };
  AMapLoader.load({
    key: "c4f77210c1d032a0b5a8ad5c89b524c1", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: MAP_PLUGINS, //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 15, // 初始化地图级别
        center: [117.769211, 39.097345], // 初始化地图中心点位置
      });
      const marker = new AMap.Marker({
        position: [117.769211, 39.097345], //位置
      });
      map.add(marker);
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
</style>
