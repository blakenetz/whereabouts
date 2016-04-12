var map;
var miles = $('#radius').val();
var pos;
function initAutocomplete() {
  var boulder = [{lat: 40.315, lng: -105.270}, {lat: 40.225, lng: -105.270}, {lat: 40.005, lng: -105.270}, {lat: 40.215, lng: -105.296}, {lat: 40.215, lng: -105.250}]
  map = new google.maps.Map(document.getElementById('map'), {
    center: boulder[0],
    zoom: 1
  });
  var socket = io();

  socket.on('messageFeed', function (data) {
    console.log((data.test));
  });

  // socket.emit()
  // Create the search box and link it to the UI element.
  // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });
      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
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
          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
        distanceFromCenter(miles)
      });

  function distanceFromCenter (miles) {
    var radius = new google.maps.Circle({
      strokeColor: 'none',
      strokeOpacity: 0.0,
      fillOpacity: .0,
      map: map,
      center: pos,
      radius: 1609.344 * miles
    });
    // $('#radius').val(miles);
    $('#nwr').val(  radius.getBounds().R.R);
    $('#nwj').val( radius.getBounds().j.R);
    $('#ser').val( radius.getBounds().R.j);
    $('#sej').val( radius.getBounds().j.j);
    map.fitBounds(radius.getBounds());
  }

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 5,
          strokeColor: 'red',
        },
      });
      distanceFromCenter(miles)
      markeEventHandler(marker, 'you!')

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }
  $('#sup').on('click', enterNewMapCenter)
  function enterNewMapCenter () {
    pos = {lat: +$('#x').val(), lng: +$('#y').val()};
    map.setCenter(pos);
    distanceFromCenter(miles)
  }
  var lats = [];
  var lngs = [];
  var titles = [];
  var ids = [];
  for (var i = 0; i < $('.data').length; i++) {
    lats.push($('.data').eq(i).attr('lat'));
    lngs.push($('.data').eq(i).attr('lng'));
    titles.push($('.data').eq(i).attr('title'));
    ids.push($('.data').eq(i).attr('id'));

    var marker = new google.maps.Marker({
      position: {lat: +lats[i], lng: +lngs[i]},
      map: map,
    });
    markeEventHandler(marker, titles[i], ids[i]);
  }

  function markeEventHandler(marker, message, ids) {
    var infowindow = new google.maps.InfoWindow({
      class: ids,
      content: message
    });
    marker.addListener('click', function() {
      window.location = "/" + infowindow.class;
    })
    marker.addListener('mouseover', function() {
      console.log(marker.class);
      $('#' + infowindow.class).css('color', 'rgb(224, 123, 40)')
      infowindow.open(marker.get('map'), marker);
    });
    marker.addListener('mouseout', function(){
      $('#' + infowindow.class).css('color', 'black')
      infowindow.close()
    })
    $('#' + infowindow.class).hover(
      function () {
        $('#' + infowindow.class).css('color', 'rgb(224, 123, 40)')
        infowindow.open(marker.get('map'), marker);
    },function () {
      $('#' + infowindow.class).css('color', 'black')
      infowindow.close()
    })
  }


   google.maps.event.addListener(map, 'click', function(event) {
    // addMarker(event.latLng, map);
    addMarker(event.latLng, map);
    });

  var k = 0;
  function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: k.toString(),
      title: k.toString(),
      map: map
    });
    $('#x').val(marker.position.lat())
    $('#y').val(marker.position.lng())
    marker.addListener('click', function() {
      $('#x').val(marker.position.lat())
      $('#y').val(marker.position.lng())
    });
    k++;
  }

  $('#radius').on('change', function () {
    miles = +$('#radius').val();
    distanceFromCenter(miles)
  })

}
