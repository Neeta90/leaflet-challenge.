// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" ;
 
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
 createFeatures(data.features);
  
 function createFeatures(earthquakeData) {       



  // Create a GeoJSON layer containing the features array on the earthquakeData object

  // Run the onEachFeature function once for each piece of data in the array

  var earthquakes = L.geoJson(earthquakeData, {

    onEachFeature: function (feature, layer){

      layer.bindPopup("<h3>" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag +

      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");

    },

    pointToLayer: function (feature, latlng) {

      return new L.circle(latlng,

        {radius: getRadius(feature.properties.mag),

          fillColor: getColor(feature.properties.mag),

          fillOpacity: .7,

          stroke: true,

          color: "black",

          weight: .5

      })

    }

  });



  // Sending our earthquakes layer to the createMap function

  createMap(earthquakes)

}
function getColor(d) {

  return d > 5 ? '#F30' :

  d > 4  ? '#F60' :

  d > 3  ? '#F90' :

  d > 2  ? '#FC0' :

  d > 1   ? '#FF0' :

            '#9F3';

}



function getRadius(value){

  return value*15000

}


  

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

 var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [streetmap, earthquakes]
}); 
  

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


}
  //create markers
 /* L.circle(earthquakes, {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.75,
    radius: 10000
  }).addTo(myMap);*/
  function createMarkers(earthquakes) {
  
    // Pull the "features" property off of response.data
    var features = earthquakes.metadata.features;
    console.log(features);
    // Initialize an array to hold bike markers
    var earthquakeMarkers = [];
  
    // Loop through the features array
    for (var index = 0; index < features.length; index++) {
      var feature = features[index];
}
 // Create a layer group made from the bike markers array, pass it into the createMap function
 createMap(L.layerGroup(earthquakeMarkers));
}
})