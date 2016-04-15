$(function () {
  var socket = io();
  var userId = $('#user').attr('class')
  var markers = [];
  var map;
  socket.emit('user', userId)
  function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.315, lng: -105.270},
      zoom: 1
    });
    if(!map){
      $('#map').css('text-align', 'center').append('<h1>We Appologize, the map is taking longer then normal to load, please refresh the page</h1>')
    }
    socket.on('user', function (posts) {
      $('.posts').empty()
      for (var i = 0; i < posts.length; i++) {
        var info = posts[i]
        var marker = new google.maps.Marker({
          position: {lat: +info.lat, lng: +info.lng},
          map: map,
          icon: '/images/flag2.png'
        })
        markers.push(marker);
        markeEventHandler(marker, info.title, info.post_id)
        $('.posts')
        .append("<div class='media-data' id='"+info.post_id+"' title='"+info.title+"'></div>");
        $('#'+ info.post_id )
        .append("<div class='media-left'>"
          +"<a href='/posts/"+info.post_id+"'>"
          +"<img class='media-object' alt='"+info.title+"' src='"+info.img_link+"'></a></div>")
        .append("<div class='media-body'>"
          +"<h4 class='media-heading'><a class='post-title' href='/posts/"+info.post_id+"'>"+info.title+"<a/></h4>"
          +"<h5 class='list-group-item-text'><p>Posted by: <a class='post-author' href='/users/"+info.user_fk+"'>"+info.username+"</a></p></h5><br></div>")
        .append("<div class='media-right'>"
          +"<h5>"+info.rating+"</h5>"
          +"<div class='votearrow-box'>"
          +"<input class='votearrow up' value='"+info.post_id+"'type='image' src='/images/uparrow.png'>"
          +"<input class='votearrow down' value='"+info.post_id+"'type='image' src='/images/downarrow.png'></div></div>");
      }
    })
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
    $(document).on('click', '.votearrow', function () {
      if ($('.posts').attr('value') > 0) {
        var add = $(this).attr('class') == 'votearrow up' ? 10 : -10;
        var id = +$(this).val()
        socket.emit('userRat', {add: add, id: id, userId: userId})
      } else {
        window.location = "/login/invalid"
      }
    })
  };

    window.initAutocomplete = initAutocomplete;
});
