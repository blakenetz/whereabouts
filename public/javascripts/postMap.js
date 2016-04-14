var map;
function initAutocomplete() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 20, lng: 10},
    zoom: 2
  });
  var iconBase = '/images/flag.';
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  var markers = [];
  function clearMarkers () {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers.length=0;
  }
  $('#geo').on('click', function () {
    $('#gif').css('display', 'block')
    $('#map').css('display', 'none')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
        clearMarkers();
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            strokeColor: 'red',
          },
        });
        markers.push(marker);
        $('#gif').css('display', 'none')
        $('#map').css('display', 'block')
        $('#lat').val(markers[0].position.lat())
        $('#lng').val(markers[0].position.lng())
        var ew = markers[0].position.lat() > 0 ? 'N' : 'S';
        var nw = markers[0].position.lng() > 0 ? 'E' : 'W';
        $('#pac-input').val(Math.abs(markers[0].position.lat()) + ew + ', ' + Math.abs(markers[0].position.lng()) + nw)
        markeEventHandler(marker, 'you!')
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      $('#gif').css('display', 'none')
      $('#map').css('display', 'block')
      handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }
})

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      pos = place.geometry.location;
      clearMarkers()
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
      map.setCenter(pos)
      $('#lat').val(markers[0].position.lat())
      $('#lng').val(markers[0].position.lng())
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

  });


  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
    map.setCenter(event.latLng)
  });
  clearMarkers();
  function addMarker(location, map) {
    if (markers.length > 0) {
      markers[0].setMap(null)
    }
    markers.length = 0;
    $('.posts').empty();
    // markers\.length = 0;
    var marker = new google.maps.Marker({
      position: location,
      title: 'New Location',
      map: map
    });
    markers.push(marker)
    $('#lat').val(marker.position.lat())
    $('#lng').val(marker.position.lng())
    var ew = markers[0].position.lat() > 0 ? 'N' : 'S';
    var nw = markers[0].position.lng() > 0 ? 'E' : 'W';
    $('#pac-input').val(Math.abs(markers[0].position.lat()) + ew + ', ' + Math.abs(markers[0].position.lng()) + nw)

  }
}
