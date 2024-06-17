//Initializing map with NYC coordinates as the center:

let myMap = L.map("map", {center:[40.7128,-74.0060], zoom:1});

//Adding tile layer(background image) to map and addTo() to add the object to the map: 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);


//initializing url to get GeoJson data: 

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" 

//request to url and handling response with Promise
let magnitude;
let depth;
d3.json(url).then((quakeData) => {
    function styleInfo(feature){
        return {
            opacity: 1,
            fillOpacity: depthOpacity(feature.geometry.coordinates[2]),
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight:0.5
        }
    };




//color based on depth: 

function chooseColor(depth) {
    if (depth >= 90) return "#FF0000"; // Red
    else if (depth >= 70) return "#FF4500"; // OrangeRed
    else if (depth >= 50) return "#FFA500"; // Orange
    else if (depth >= 30) return "#FFD700"; // Gold
    else if (depth >= 10) return "#FFFF00"; // Yellow
    else return "#00FF00"; // Green
};


    function depthOpacity(depth){
        if (depth >= 90)return 1;
        else if (depth >= 70) return 0.85;
        else if (depth >= 50) return 0.65;
        else if (depth >= 30) return 0.50;
        else if (depth >= 10) return 0.35;
        else return 0.25;
    }
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 2
    };
    L.geoJson(quakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                "Magnitude: "
                + feature.properties.mag
                + "<br>Depth: "
                + feature.geometry.coordinates[2]
                +"<br>Location: "
                +feature.properties.place
            );
        }
    }).addTo(myMap)


})

let legend = L.control({position:"bottomright"});
            legend.onAdd = function(map){ 
            var div = L.DomUtil.create('div', 'info legend');
            var categories = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
            var colors = ["#00FF00","#FFFF00","#FFD700","#FFA500","#FF4500"];
            
            for(var i=0;i<categories.length; i++){
            div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            categories[i] + '<br>';
            }
            return div;
            legend.addTo(map)};
