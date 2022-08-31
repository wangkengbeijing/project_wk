<template>
  <div>
    <div id="map" class="map"></div>
    <!-- 故障指示器的闪烁 -->
    <div id="test">
      <div class="font" style="color:blue;font-size:20px;">111</div>
      <div id="css_animation"></div>
      <img src="/static/b.gif" />
    </div>
  </div>
</template>
<script>
// 映入css文件、
import "ol/ol.css";
import "../utils/openlayers/css/OverviewMap.css";
import Map from "ol/Map.js";
import Overlay from "ol/Overlay";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ";
// 比例尺
import ScaleLine from "ol/control/ScaleLine";
// 地图服务
import {
  tiandituVetorMap,
  tiandituImgMap,
} from "../utils/openlayers/js/mapServer";
export default {
  props: ["zoom", "center", "isShowBaseMap", "isScaleLine"],
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: "map",
        view: new View({
          projection: "EPSG:4326",
          center: this.center || [0, 0],
          zoom: this.zoom || 2
        })
      });

      var point_div = document.getElementById("test");
      var point_overlay = new Overlay({
        element: point_div,
        positioning: "center-center"
      });
      this.map.addOverlay(point_overlay);
      point_overlay.setPosition([114.25, 29.95]);

      if (this.isShowBaseMap) tiandituVetorMap(this.map);
      // this.showTianDiTu();
      if (this.isScaleLine) this.showScaleLine();
    },
    // 显示比例尺
    showScaleLine: function() {
      //实例化比例尺控件（ScaleLine）
      var scaleLineControl = new ScaleLine({
        //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
        units: "metric"
      });
      this.map.addControl(scaleLineControl);
    }
  }
};
</script>
<style>
.map {
  width: 100%;
  height: 70%;
}

/** 地图上的故障处理器显示效果*/
#css_animation {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: rgba(255, 0, 0, 0.9);
  transform: scale(0);
  animation: myfirst 3s;
  animation-iteration-count: infinite;
}
@keyframes myfirst {
  to {
    transform: scale(2);
    background: rgba(0, 0, 0, 0);
  }
}
#test {
  position: relative;
}
.font {
  position: absolute;
  top: 15px;
  left: 14px;
}
</style>


