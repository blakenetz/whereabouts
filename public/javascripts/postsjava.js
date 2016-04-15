var map;

function initAutocomplete() {
  var pos = { lat: +$('h1').attr('lat'), lng: +$('h1').attr('lng') }
  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 9
  });
  if(!map){
    $('#map').css('text-align', 'center').append('<h1>We Appologize, the map is taking longer then normal to load, please refresh the page</h1>')
  }
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: '/images/flag.png'
  });
}
