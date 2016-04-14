var map;

function initAutocomplete() {
  var pos = { lat: +$('h1').attr('lat'), lng: +$('h1').attr('lng') }
  console.log(pos);
  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 9
  });
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: '/images/flag.png'
  });
}
