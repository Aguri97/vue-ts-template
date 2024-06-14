<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;
const MAP_PLUGINS = [
  "AMap.Manager",
  "AMap.Scale",
  "AMap.OverView",
  "AMap.ToolBar",
  "AMap.MapType",
  "AMap.CircleEditor",
  "Geocoder",
  "Geolocation",
  "AMap.MarkerClusterer",
  "AMap.PolyEditor",
  "AMap.MouseTool",
  "AMap.Driving",
  "AMap.CitySearch",
  "AMap.InfoWindow",
  "AMap.LngLat",
  "AMap.DistrictSearch",
  "AMap.TileLayer.Traffic",
  "AMap.Heatmap",
  "AMap.Autocomplete",
  "AMap.PlaceSearch",
  "AMap.ControlBar",
  "AMap.HawkEye",
  "AMap.DrivingRender",
];
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "42abe4ee2f0aec813f1c8ae977209af4",
  };
  //uri.amap.com/marker?position=117.769004, 39.097645&name=新牌店&src=mypage&coordinate=gaode&callnative=0
  https: AMapLoader.load({
    key: "c4f77210c1d032a0b5a8ad5c89b524c1", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: MAP_PLUGINS, //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 12, // 初始化地图级别
        resizeEnable: true, // 初始化地图中心点位置
      });
      const marker = new AMap.Marker({
        position: [117.769004, 39.097645], //位置
      });
      map.add(marker);
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });
      });
      //解析定位结果
      function onComplete(data) {
        document.getElementById("status").innerHTML = "定位成功";
        var str = [];
        str.push("定位结果：" + data.position);
        str.push("定位类别：" + data.location_type);
        if (data.accuracy) {
          str.push("精度：" + data.accuracy + " 米");
        } //如为IP精确定位结果则没有精度信息
        str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
        document.getElementById("result").innerHTML = str.join("<br>");
      }
      //解析定位错误信息
      function onError(data) {
        document.getElementById("status").innerHTML = "定位失败";
        document.getElementById("result").innerHTML =
          "失败原因排查信息:" + data.message;
      }
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
