# Mapping Earthquakes with Leaflet 

This project visualized earthquake data on a map using Leaflet.js, D3.js, and data from the US Geological Survey (USGS). The map provides insights into the magnitude, depth, and location of recent earthquakes worldwide. The visualization is enhanced with color coding and pop-ups for better data interpretation.

For my first project utilizing Leaflet and its mapping capabilities was challenging, but once completed, it showcased numerous new possibilities for presenting data in geographical contexts. Geographical context is critically important for much of the data regarding our society, whether it is medical, political, or social. Plotting the locations of Earthquakes with varying depths and magnitudes is one example usage, that can contribute to the work of multiple stakeholders. 

## Project benefits and potential use: 

**Real-Time Analysis:** Offers up-to-date information on recent earthquakes, allowing for timely research and analysis.

**Risk Assessment:** Aids in assessing the impact areas based on earthquake magnitude and depth, aiding in disaster preparedness and response.

**Policy Making:** Supports informed decision-making for disaster management policies and infrastructure planning.

**Access to Information:** Provides the public with accessible and comprehensible information about recent seismic activities, enhancing awareness and safety measures.

## Technologies Used: 

JavaScript: Core programming language for the script.

Leaflet.js: Powerful open-source JavaScript library for interactive maps.

D3.js: A JavaScript library for data-driven document manipulation, used in this project to fetch and handle GeoJSON data.

OpenStreetMap: Provides the tile layer for the map background.

## Code Logic: 

**1. Map Initialization:**

Center of map is New York City coordinates with a zoom level of 1

*let myMap = L.map("map", {center:[40.7128,-74.0060], zoom:1});*

**2. Adding a Tile Layer:**

Tiles from OpenStreetMap for map background are added

*L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);*

**3. Fetching Earthquake Data from USGS (United States Geological Survey):**

Utilized D3.js to fetch data (weekly, updated in real-time) and then Promise to process data. 

*url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url).then((quakeData) => {
});*

**4. Map + Marker Styling:** 

Functions created to add styling to map markers based on earthquake depth and magnitude.

*function styleInfo(feature){
    return {*

Opacity of marker colors based on earthquake depth: 

*function chooseColor(depth)* 
*function depthOpacity(depth)*

Radius/size of markers based on earthquake magnitude: 

*function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 2;
}* 

**5. Creation of GeoJSON Layer:**

Adding markers to map layer and adding to map: 

*L.geoJson(quakeData, {...}).addTo(myMap);*

**6. Legend Creation:** 

Legend attached to html at bottom right of page to describe color coding based on depth of earthquake

*var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    var categories = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
    var colors = ["#00FF00", "#FFFF00", "#FFD700", "#FFA500", "#FF4500", "#FF0000"];
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            categories[i] + '<br>';
    }
    return div;
};
legend.addTo(myMap);*




