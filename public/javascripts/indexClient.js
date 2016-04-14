$(function () {
  var socket = io();
  var map;
  var miles = $('#radius').val();
  var pos;
  var located = false;
  var markerLocal = [];
  var bounds;
  var parce = 0;
  var offset = 2;


  function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.315, lng: -105.270},
      zoom: 1
    });
    function clearMarker () {
      markerLocal.forEach(function(marker) {
        marker.setMap(null);
      });
      markerLocal.length = 0;
    }
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);


    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      located = true;

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      clearMarker();

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
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            strokeColor: 'red',
          },
        });

        markerLocal.push(marker)

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

    function distanceFromCenter (miles, add, id) {
      var radius = new google.maps.Circle({
        strokeColor: 'none',
        strokeOpacity: 0.0,
        fillOpacity: .0,
        map: map,
        center: pos,
        radius: 1609.344 * miles
      });
      if (add) {
        socket.emit('rating', { bounds: radius.getBounds(), parce: parce * offset, add: add, id: id})
      }else{
        socket.emit('located', {bounds: radius.getBounds(), parce: parce * offset})
      }
      map.fitBounds(radius.getBounds());
    }

    $('#geo').on('click', function () {
      $('#gif').css('display', 'block')
      $('.dis').css('display', 'none')
      parce = 0;
      if (navigator.geolocation) {
        located = true;
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(pos);
          clearMarker()
          var marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              strokeColor: 'red',
            },
          });
          $('#gif').css('display', 'none')
          $('.dis').css('display', 'block')
          markerLocal.push(marker)
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
      })
      $('#sup').on('click', enterNewMapCenter)
      function enterNewMapCenter () {
        pos = {lat: +$('#x').val(), lng: +$('#y').val()};
        map.setCenter(pos);
        distanceFromCenter(miles)
      }
      var markers = [];
      socket.on('self', function (data) {
        if (data.limit) {
          data = data.post;
          parce = 0;
        }
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        $('.posts').empty();
        markers.length = 0;
        for (var i = 0; i < data.length; i++) {
          var info = data[i];
          var marker = new google.maps.Marker({
            position: {lat: +info.lat, lng: +info.lng},
            map: map,
          });
          markers.push(marker);
          markeEventHandler(marker, info.title, info.post_id);
          $('.posts')
          .append("<div class='media-data' id='"+info.post_id+"' title='"+info.title+"'></div>");
          $('#'+ info.post_id )
          .append("<div class='media-left'>"
            +"<a href='/posts/"+info.post_id+"'>"
            +"<img class='media-object' src='"+info.img_link+"'></a></div>")
          .append("<div class='media-body'>"
            +"<h4 class='media-heading'><a class='post-title' href='/posts/"+info.post_id+"'>"+info.title+"<a/></h4>"
            +"<h5 class='list-group-item-text'><p>Posted by: <a class='post-author' href='/users/"+info.user_fk+"'>"+info.username+"</a></p></h5><br></div>")
          .append("<div class='media-right'>"
            +"<h5>"+info.rating+"</h5>"
            +"<div class='votearrow-box'>"
            +"<input class='votearrow up' value='"+info.post_id+"'type='image' src='/images/uparrow.png'>"
            +"<input class='votearrow down' value='"+info.post_id+"'type='image' src='/images/downarrow.png'></div></div>");
        }
      });

      function markeEventHandler(marker, message, id) {
        var infowindow = new google.maps.InfoWindow({
          class: id,
          content: message
        });
        marker.addListener('click', function() {
          window.location = "/posts/" + infowindow.class;
        })
        marker.addListener('mouseover', function() {
          $('#' + infowindow.class).css('background', 'rgba(111, 106, 102, 0.31)')
          infowindow.open(marker.get('map'), marker);
        });
        marker.addListener('mouseout', function(){
          $('#' + infowindow.class).css('background', 'none')
          infowindow.close()
        })
        $(document).on('mouseover', '#' + infowindow.class, function () {
          $('#' + infowindow.class).css('background', 'rgba(111, 106, 102, 0.31)')
          infowindow.open(marker.get('map'), marker);
        })
        $(document).on('mouseout', '#' + infowindow.class, function () {
          $('#' + infowindow.class).css('background', 'none')
          infowindow.close()
        })
      }

      $('#radius').on('change', function () {
        miles = +$('#radius').val();
        if (located) {
          distanceFromCenter(miles)
        };
      });
      $('.nextarrow').on('click', function () {

        if ($(this).attr('id') === 'next') {
          parce++
        }else{
          parce--
          parce = parce < 0 ? 0 : parce;
        }
        if (located) {
          distanceFromCenter(miles)
        }else{
          socket.emit('world', parce * offset);
        }
      })
      $(document).on('click', '.votearrow', function () {
        if ($('.thumbnail').attr('value') > 0) {
          var add = $(this).attr('class') == 'votearrow up' ? 10 : -10;
          var id = +$(this).val()
          if (located) {
            distanceFromCenter(miles, add, id)
          } else {
            socket.emit('notlocated', {add: add, id: id, parce: parce * offset})
          }
        } else {
          window.location = "/login/"
        }
      })
    };


    window.initAutocomplete = initAutocomplete;
  });
