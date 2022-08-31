/**
 * 说明：测量工具的的封装，配合measure.css使用
 */

import {getArea, getLength} from 'ol/sphere.js';
import {LineString, Polygon} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import Draw from 'ol/interaction/Draw.js';
import Overlay from 'ol/Overlay.js';
import {unByKey} from 'ol/Observable.js';
//定义一个球对象
// var wgs84Sphere = new sphereMollweideProjection ({
    
// }); 
/**
 * 当前绘制的要素（Currently drawn feature.）
 * @type {ol.Feature}
 */
var sketch;
/**
 * 帮助提示框对象（The help tooltip element.）
 * @type {Element}
 */
var helpTooltipElement;
/**
 *帮助提示框显示的信息（Overlay to show the help messages.）
 * @type {ol.Overlay}
 */
var helpTooltip;
/**
 * 测量工具提示框对象（The measure tooltip element. ）
 * @type {Element}
 */
var measureTooltipElement;
/**
 *测量工具中显示的测量值（Overlay to show the measurement.）
 * @type {ol.Overlay}
 */
var measureTooltip;
/**
 *  当用户正在绘制多边形时的提示信息文本
 * @type {string}
 */
var continuePolygonMsg = '继续点击绘制多边形';
/**
 * 当用户正在绘制线时的提示信息文本
 * @type {string}
 */
var continueLineMsg = '继续点击绘制线';
//加载测量的绘制矢量层
 var source = new VectorSource();
//  测量的绘制图层
 var vector = new VectorLayer({
   source: source,
   style: new Style({
     fill: new Fill({
       color: 'rgba(255, 255, 255, 0.2)'
     }),
     stroke: new Stroke({
       color: '#ffcc33',
       width: 2
     }),
     image: new CircleStyle({
       radius: 7,
       fill: new Fill({
         color: '#ffcc33'
       })
     })
   })
 });
//全局的地图对象
let Map = null
/**
 * 说明：测量封装的工具，使用WGS84坐标系即4326，所获取的测量信息是正确的，否则是错误的
 * @param {*} map      必填，对象，地图对象
 * @param {*} type     选填，字符串，测量的类型，默认值是"Polygon"（面积量测），可选的值有"LineString"（距离测量）和"Polygon"（面积量测）
 */
export function getMeasureLength(map,type="Polygon"){
     Map = map 
     map.addLayer(vector);
     addInteraction(map ,"LineString");

     //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
     map.on('pointermove', pointerMoveHandler); 
     //地图绑定鼠标移出事件，鼠标移出时为帮助提示框设置隐藏样式
     map.getViewport().addEventListener('mouseout', function() {
        helpTooltipElement.classList.add('hidden');
      });
      //添加鼠标操作事件
 }

 /**
 * 鼠标移动事件处理函数
 * @param {ol.MapBrowserEvent} evt
 */
var pointerMoveHandler = function (evt) {
    if (evt.dragging) {
        return;
    }
    /** @type {string} */
    var helpMsg = '点击开始绘制';//当前默认提示信息
    //判断绘制几何类型设置相应的帮助提示信息
    if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof Polygon) {
            helpMsg = continuePolygonMsg; //绘制多边形时提示相应内容
        } else if (geom instanceof LineString) {
            helpMsg = continueLineMsg; //绘制线时提示相应内容
        }
    }

    helpTooltipElement.innerHTML = helpMsg;//将提示信息设置到对话框中显示
    helpTooltip.setPosition(evt.coordinate);//设置帮助提示框的位置
    helpTooltipElement.classList.remove('hidden');//移除帮助提示框的隐藏样式进行显示
};

var draw; // global so we can remove it later


/**
 * 格式化距离测量
 * @param {module:ol/geom/LineString~LineString} line The line.
 * @return {string} The formatted length.
 */
var formatLength = function(line) {
    var sourceProj = Map.getView().getProjection();//地图数据源投影坐标系
    var length = getLength(line,{
        radius:6378137,
        projection:sourceProj
    });
    var output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
    }
    return output;
};


/**
 * 格式化面积测量
 * @param {module:ol/geom/Polygon~Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function(polygon) {
    var sourceProj = Map.getView().getProjection();//地图数据源投影坐标系
    console.log(sourceProj)
    /*
       坐标系3857的半径的是6371008.8
       坐标系4326的半径是6378137
    */
    //  这个方法是使用投影坐标系3587的
    var area = getArea(polygon,{
        radius:6378137,
        projection:sourceProj
    });
    var output;
    if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) +
            ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) +
            ' ' + 'm<sup>2</sup>';
    }
    return output;
};


function addInteraction(map,type ="Polygon" ) {
    draw = new Draw({
        source: source,
        type: type,
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });

    map.addInteraction(draw);
    createMeasureTooltip(map);
    createHelpTooltip(map);

    var listener;
    draw.on('drawstart',function(evt) {
        // set sketch
        sketch = evt.feature;
        console.log("绘制要素",sketch)
        /** @type {module:ol/coordinate~Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function(evt) {
            var geom = evt.target;
            var output;
            if (geom instanceof Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    }, this);

    draw.on('drawend',function() {
        measureTooltipElement.className = 'tooltip tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip(map);
        unByKey(listener);
        // 结束量测绘制
        map.removeInteraction(draw);
        // 隐藏提示框
        map.removeOverlay(helpTooltip);
    }, this);
}

  /**
 * 创建一个新的帮助提示框
 */
function createHelpTooltip(map) {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}


/**
 * 创建一个新的测量工具提示框
 */
function createMeasureTooltip(map) {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

/**
 * 
 */
// export function stopMeasure(map){
 
// }
