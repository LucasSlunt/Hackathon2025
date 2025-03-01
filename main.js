// Initialize the map
var map = L.map('map').setView([20, 0], 3); // Centered globally

// Attempt to center map on user's location
var userLat, userLng, routingControl;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
        map.setView([userLat, userLng], 8); // Center map on user's location
        L.marker([userLat, userLng]).addTo(map)
            .bindPopup('You are here!')
            .openPopup();
    }, function() {
        alert('Ensure location services are enabled and try again.');
    });
} else {
    alert('Geolocation is not supported by this browser.');
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

// Function to locate a path between two points using roads
function locatePath(startLat, startLng, endLat, endLng) {
    var startPoint = L.latLng(startLat, startLng);
    var endPoint = L.latLng(endLat, endLng);

    // Use an external routing service like OSRM or Mapbox Directions API
    if (routingControl !== undefined) {
        map.removeControl(routingControl);
    }
    routingControl = L.Routing.control({
        waypoints: [startPoint, endPoint],
        router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        createMarker: function() { return null; }, // No markers
        lineOptions: {
            styles: [{ color: 'blue', weight: 4 }]
        }
    }).addTo(map);

    // Fit the map to the route
    // routingControl.on('routesfound', function(e) {
    //     var route = e.routes[0];
    //     map.fitBounds(L.latLngBounds(route.coordinates));
    // });
}


// locatePath( 50.00077, -119.40266, 49.94728, -119.42667);

map.on('click', function(e) {
    
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    console.log('Latitude: ' + lat + ', Longitude: ' + lng);

    var locationDescription = prompt('Enter a description for this location:');
    if (locationDescription === null) {
        return;
    }
    var marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(locationDescription)
        .openPopup();

    // Add event listener to the marker to call locatePath when clicked
    marker.on('click', function() {
        
        if (userLat !== undefined && userLng !== undefined) {
            locatePath(userLat, userLng, lat, lng);
        } else {
            alert('User location not available.');
        }
    });
    
    

    
});


