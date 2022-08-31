/**
 * 说明:该文件为自定义鹰眼的的文件
 */
// 导入鹰眼包文件
import { OverviewMap} from 'ol/control.js';
// 加载天地图的相关依赖包文件
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ';
// 
import View from 'ol/View.js';
/**
 * 说明：封装显示鹰眼函数，如何没有传图层则默认加载天地图矢量数据
 * @param {*} map       必传，对象，地图对象
 * @param {*} layers    选传，数组，图层数组
 */
export function showOverviewMap(map,layers){
    // 判断map对象是否存在
    if(!map){
        return false
    }
    // 默认加载天地图矢量数据
    if(!layers){
        layers = []
        var TiandiMap_vec = new TileLayer({
            name: '天地图矢量图层',
                source: new XYZ({
                    url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d', //mapkey为天地图密钥
                    wrapX: false,
                }),
        });
        layers.push(TiandiMap_vec)
    }
    // 创建鹰眼控件
    let overviewMap =  new OverviewMap({
        //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
        className: 'ol-overviewmap ol-custom-overviewmap',
         //鹰眼中加载同坐标系下不同数据源的图层
        layers:layers,
        //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
        collapseLabel: '\u00BB',
        //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
        label: '\u00AB',
         //初始为展开显示方式
        collapsed: false,
        view: new View({
            projection: 'EPSG:4326',
        })
    })
    // 将鹰眼控件加载到地图上
    map.addControl(overviewMap)
}
