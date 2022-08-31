<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <img src="/static/marker.png">
    <button @click="savePng">导出png图</button>
    <button @click="addpoint">添加点</button>
    <button @click="addLine">添加线</button>
    <button @click="addPylogn">添加面</button>
    <button @click="drawpoint">绘制点</button>
    <button @click="drawLine">绘制线</button>
    <button @click="drawPylogn">绘制面</button>
    <button @click="remove">删除图层</button>
    
    <Map class="map" ref="map" zoom='6' :center="center" :isShowBaseMap="true" :isScaleLine="true" />
  </div>
</template>

<script>
import Map from './components/Map'
import TileLayer from 'ol/layer/Tile.js';
import {TileArcGISRest} from 'ol/source.js';
// 鹰眼
import {showOverviewMap} from './utils/openlayers/js/OverviewMap'
// 地图基本操作
import {setMapCenter,setMapZoom,saveMapPng} from './utils/openlayers/js/mapOperate'
// 添加要素
import { addPoint,addLine ,addPolygon,removeFeaterById,drawFeature,getFeatureInfo,getWMSInfo,LayersControle,selectFeature} from './utils/openlayers/js/feature'
import { setTimeout } from 'timers';
// 地图量测工具
import { getMeasureLength } from "./utils/openlayers/js/measure"
import { freemem } from 'os';
import './utils/openlayers/css/measure.css'
import { geoServeWMS,showHeatMap,showGaodeMap,showCoolMap,showcluster,showVectorTile} from './utils/openlayers/js/mapServer'

import {Observable,unByKey} from 'ol/Observable'
export default {
  name: 'app',
  data(){
    return {
      center:[114.25,29.95],
      map:null,
      layer:null,
      eventKey:null
    }
  },
  components: {
    Map
  },
  mounted(){
    this.map = this.$refs.map.map;
    // var layer =  new TileLayer({
    //   source: new TileArcGISRest({
    //       url: "http://192.168.112.29:6080/arcgis/rest/services/flood/EEGN_WATA_TEST/MapServer" ,
    //       //设置crossOrigin
    //       crossOrigin:'anonymous',
    //   })
    // })
    // console.log("环境变量",process.env.VUE_APP_TITLE)
    // this.map.addLayer(layer)

    // 显示鹰眼
    // showOverviewMap(this.map,[layer])
    // 设置显示地图中心
    // setMapCenter(map,[113.4,34.5])
    // 设置地图显示级别
    // setMapZoom(this.map,4);
    // saveMapPng(this.map)
    // getFeatureInfo(this.map)

    // getMeasureLength(this.map)

  //  let bianjie = geoServeWMS(this.map,"http://localhost:8080/geoserver/newcapec/wms",{
  //               'VERSION': '1.1.1',
  //               "LAYERS": 'newcapec:%E8%BE%B9%E7%95%8Ct',
  //   })
    this.layer = geoServeWMS(this.map,"http://localhost:8081/geoserver/newcapec/wms",{
        'VERSION': '1.1.1',
        tiled: true,
        "LAYERS": 'newcapec:country',
    })
      // let layer1 = geoServeWMS(this.map,"http://localhost:8080/geoserver/cite/wms", {
      //              'VERSION': '1.1.1',
      //           "LAYERS": 'cite:city',
      // })

    // 距离量测
    getMeasureLength(this.map)
    // 获取wms服务的数据
  //   this.eventKey = getWMSInfo(this.map,this.layer.getSource())

    // 加载热力图
    // showHeatMap(this.map)
    // 加载聚合数据
    // var url = "http://localhost:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3A%25E6%25B9%2596%25E5%258D%2597&maxFeatures=10000&outputFormat=application%2Fjson"
    // showcluster(this.map, "/static/测试.geojson")
    // 加载geoserver发布的geojson数据
    // showVectorTile(this.map)
    // 该方法用户判断数据是否加载完毕
    // this.map.on("rendercomplete",function(res){
    //   console.log("数据加载完成")
    // })

    // selectFeature(this.map)
  },
  methods:{
    savePng:function(){
      console.log("++++点击事件++++",this.map)
      //  saveMapPng(this.map)
      this.map.once('postcompose', function (event) {
        var canvas = event.context.canvas;
        console.log(canvas)
        var MIME_TYPE = "image/png";
        // var img = new Image()
        // img.setAttribute('crossOrigin', 'Anonymous');

        // img.onload = function () {
        //   console.log("+++++")
          var imgURL = canvas.toDataURL(MIME_TYPE);
          console.log(imgURL)
          var dlLink = document.createElement('a');
          dlLink.download = name+".png";
          dlLink.href = imgURL;
          dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
  
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
        // }   
          
        
      });
      this.map.renderSync();
    },
    addpoint(){
      showcluster(this.map, '/static/测试.geojson')
    // var layers = addPoint(this.map,[120.92613039298001,52.50186183744888],"/static/marker.png");
      //  addPoint(this.map,[120.82613039298001,52.50186183744888],"/static/logo.png");
      //  layers.visible= false
    },
    addLine(){
      showcluster(this.map, '/static/3.geojson')
      // addLine(this.map,[[120.92613039298001,52.50186183744888],[116.92613039298001,50.50186183744888]])
    },
    addPylogn(){
      showcluster(this.map, '/static/4.geojson')
      // console.log("+++++++++")
      // let polygon = addPolygon(this.map,[[[[120.9261,52.5018],[120.5261,52.5418],[120.3261,51.56186]]],[[[120.9261,52.5018],[120.9561,52.5418],[120.9961,51.56186]]]])
      //  删除指定的要素
      // removeFeaterById(polygon,0)
    },
    drawpoint(){
      showcluster(this.map, '/static/测试.geojson')
        // drawFeature(this.map,"Point");
    },
     drawLine(){
       showcluster(this.map, '/static/6.geojson')
        // drawFeature(this.map,"LineString");
    }, 
    drawPylogn(){
        drawFeature(this.map,"Polygon",{
          id:1,
          name:"李四",
          age:11
        });
    },
    addHeatMap(){

    },
    remove(){
      // console.log("++++")
      // // this.map.removeLayer(this.layer)
      // console.log(this.layer.getSource())
      // unByKey(this.eventKey);
       showcluster(this.map, '/static/8.geojson')
    }
  }
}
</script>

<style>
html,body,#app{
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%
  /* margin-top: 60px; */
}
.map{
  height: 100%;
  width: 100%
}
</style>
