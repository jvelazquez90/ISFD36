// Defino mapas base
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: '&copy; <a href="https://www.linkedin.com/in/jorge-velazquez-fernandez target="_blank">Jorge Velazquez</a>'}),
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: '&copy; <a href="https://www.linkedin.com/in/jorge-velazquez-fernandez target="_blank">Jorge Velazquez</a>'}),
    OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.linkedin.com/in/jorge-velazquez-fernandez" target="_blank">Jorge Velazquez</a>'});

var Mapa_base = {
    "OpenStreetMap": OpenStreetMap,
    "Streets Google": googleStreets,
    "Satelital Google": googleSat,
};

//--------------------------------------------------------------------------------------------------------------------
 // Agregar zonas geojson

const estiloLugar = {
    radius: 5,
    fillColor: "#0000FF",
    color: "#0000",
    weight: 5,
    opacity: 1,
    fillOpacity: 0.8
}

var ubicaciones = L.geoJson(ubicaciones,
{
    pointToLayer: function(feature, latlng){
        //return L.circleMarker(latlng, estiloLugar)
        var smallIcon = new L.Icon({
            iconSize: [27, 27],
            iconAnchor: [13, 27],
            popupAnchor:  [1, -24],
            iconUrl: './img/home_pink.png'
        });
        return L.marker(latlng, {icon: smallIcon});
    },
    onEachFeature: function(feature, layer){
        layer.bindPopup('<h2> Lugares </h2></br>' +
                        '<b> Nombre:  </b>' + feature.properties.nombre + '<br>' +
                        '<b> Dirección:  </b>' + feature.properties.direccion + '<br>' +
                        '<b> Horario de atención:  </b>' + feature.properties.horario_atencion + '<br>' +
                        '<b> Contacto:  </b>' + feature.properties.contacto + '<br>' +
                        '<b> Comunicación:  </b>' + feature.properties.comunicacion + '<br>' +
                        '<b> Atención brindada:  </b>' + feature.properties.atencion_brindada + '<br>' +
                        '<b> Información relevante:  </b>' + feature.properties.informacion_relevante)
    }
}
);



//--------------------------------------------------------------------------------------------------------------------

var map = L.map('map', {
    center: [-34.5247, -58.7528],
    zoom: 11,
    minZoom: 11,
  	maxZoom: 18,
    bounceAtZoomLimits: false, // no deja ampliar mas el zoom
    layers: [OpenStreetMap, ubicaciones]
});

var logo = L.control({position: 'bottomright'});
logo.onAdd = function(map){
    var div = L.DomUtil.create('div', 'myclass');
    div.innerHTML= "<a href='https://isfd36-bue.infd.edu.ar/sitio/' target='_blank'><img src='../img/isfd.png'/></a>";
    return div;
}
logo.addTo(map);


L.control.layers(Mapa_base).addTo(map);

L.control.scale().addTo(map);

const searchControl = new L.Control.Search({
    layer: ubicaciones,
    propertyName: 'nombre'
});
map.addControl(searchControl);