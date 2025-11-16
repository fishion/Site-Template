import "ol/ol.css"
import Map from "ol/Map.js"
import View from "ol/View.js"
// Sources are sources of gfx for display in layers
import OSM from "ol/source/OSM.js"
import VectorSource from "ol/source/Vector.js"
// Layers are map layers that can contain things
import TileLayer from "ol/layer/Tile.js"
import VectorLayer from "ol/layer/Vector.js"
// Features - A vector object for geographic features with a geometry and other attribute
import Feature from "ol/Feature.js"
// Other things
import Point from "ol/geom/Point.js"
import { Style, Icon } from "ol/style.js"
import { fromLonLat } from "ol/proj.js"

function initMap(targetElement: string, zoom: number, point: [number, number]) {
  const map = new Map({
    target: targetElement,
    view: new View({
      center: fromLonLat(point),
      zoom: zoom,
    }),
    layers: [
      new TileLayer({ source: new OSM() }),
      new VectorLayer({
        source: new VectorSource({
          features: [new Feature({ geometry: new Point(fromLonLat(point)) })],
        }),
        style: new Style({
          image: new Icon({
            scale: 0.2,
            anchor: [0.5, 1],
            src: "../img/circle.svg",
          }),
        }),
      }),
    ],
  })
  return map
}
// consider exporting the initmap function and allowing
// further parameters to add points etc, to make more reusable.
initMap("map", 17, [-0.1419896248736822, 50.82591709529543])
