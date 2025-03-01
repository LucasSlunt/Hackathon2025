// Initialize the map
var map = L.map('map').setView([20, 0], 3); // Centered globally

// Attempt to center map on user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;
        map.setView([userLat, userLng], 10); // Zoom level 10 for a closer view
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}


// Add a base map (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add Light Pollution WMS Layer
var viirsOverlay = L.tileLayer(
    'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png', 
    {
      attribution: 'NASA Earthdata Black Marble 2016 Night Lights',
      opacity: 0.6,
      maxZoom: 18,
      maxNativeZoom: 8
    }
  );
  viirsOverlay.addTo(map);
