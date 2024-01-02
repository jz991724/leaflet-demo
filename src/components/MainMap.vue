<template>
  <div id="mainMap"></div>
</template>

<script>
import MiniMap from 'leaflet-minimap';
import 'leaflet-ajax';
import "leaflet-minimap/dist/Control.MiniMap.min.css";

export default {
  name: "MainMap",
  data: () => {
    return {
      centerLatLng: [25, 102.7],
      mainMap: null
    }
  },
  methods: {},
  mounted() {
    this.mainMap = L.map('mainMap', {
      center: [25, 102.7], // 地图中心
      zoom: 14, //缩放比列
      zoomControl: true, //禁用 + - 按钮
      doubleClickZoom: true, // 禁用双击放大
      attributionControl: false, // 移除右下角leaflet标识
    });

    //添加瓦片图层（作为底图备选）
    let openstreetmapLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(this.mainMap);
    let somedomainLayer = L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
    // 定义一个图层(注意：小地图的layer不能和地图上共用一个，否则无法加载)
    const minilayer = L.tileLayer(`https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}`);

    let centerPointMarker = L.marker([25, 102.7], {title: '这是一个标记', draggable: true}).addTo(this.mainMap);

    debugger
    centerPointMarker.bindPopup('等风来');
    //
    let circle = L.circle(this.centerLatLng, {radius: 100, fillColor: 'red'});

    let littleton = L.marker([25.61, 102.7]).bindPopup('This is Littleton, CO.');
    let denver = L.marker([25.61, 102.71]).bindPopup('This is Denver, CO.');
    let aurora = L.marker([25.61, 102.72]).bindPopup('This is Aurora, CO.');
    let golden = L.marker([25.61, 102.73]).bindPopup('This is Golden, CO.');

    //相当于arcgis的featureLayer
    let featureGroup = L.featureGroup([circle, littleton, denver, aurora, golden]);
    featureGroup.addTo(this.mainMap);
    //聚焦所有的marker
    let bound = featureGroup.getBounds();
    this.mainMap.fitBounds(bound);

    //基础底图（每次只能有一个）
    let baseLayers = {
      openstreetmapLayer,
      somedomainLayer,
    };

    //覆盖图层
    let overlays = {
      // circle,
      // littleton,
      // denver,
      // aurora,
      // golden,

      '<i style="color:red;">layerGroup</i>': featureGroup
    };

    //添加图层管理组件
    let layerControl = L.control.layers(baseLayers, overlays, {position: 'topright'}).addTo(this.mainMap);

    //比例尺组件
    let scaleControl = L.control.scale({imperial: false}).addTo(this.mainMap);

    let miniMap = new MiniMap(minilayer, {
      // 鹰眼图配置项，参数非必须，可以忽略使用默认配置
      width: 200, // 鹰眼图宽度
      height: 200, // 鹰眼图高度
      toggleDisplay: true, // 是否显示最小化按钮
      minimized: false, // 是否最小化位置开始
    }).addTo(this.mainMap);

    //自定义图片marker
    let myIcon = L.icon({
      iconUrl: '/icon/test_icon.jpg',
      iconSize: [42, 42],
      iconAnchor: [21, 21],
      popupAnchor: [0, -20],//注意坐标轴的方向
      // shadowUrl: 'my-icon-shadow.png',
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    });

    let customIconMarker = L.marker([25.2, 102.7], {icon: myIcon}).addTo(this.mainMap);
    customIconMarker.bindPopup('<i style="color:blue;">我现在就在这里，<b style="color: red;">你来打我呀</b></i>');
    //默认打开popup
    setTimeout(() => {
      customIconMarker.openPopup();
    });

    //加载geoJson数据
    //要先引用import一下leaflet-ajax才能覆盖leaflet带的L.GeoJSON.AJAX
    let geoJsonLayer = new L.GeoJSON.AJAX("https://geo.datav.aliyun.com/areas_v3/bound/530000_full.json", {
      style: {
        color: 'red'
      }, onEachFeature: (feature, layer) => {
        //为每一个feature要素添加label（这里就是显示行政区的名称）
        let latlng = layer?.getBounds().getCenter();
        if (latlng) {
          let div_icon = L.divIcon({html: feature?.properties?.name || '', iconSize: [100], className: 'divIconLabel'});
          L.marker(latlng, {icon: div_icon}).addTo(this.mainMap);
        }
      }
    });
    geoJsonLayer.addTo(this.mainMap);
  }
}
</script>

<style scoped>

#mainMap {
  width: 100vw;
  height: 100vh;
}

/deep/ .divIconLabel {
  font-size: 24px;
  font-weight: bolder;
  color: blue;
}
</style>