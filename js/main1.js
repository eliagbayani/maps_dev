function $(element) {return document.getElementById(element);}

var EoLMap = {};

EoLMap.recs = null;
EoLMap.map = null;
EoLMap.markerClusterer = null;
EoLMap.markers = [];
EoLMap.infoWindow = null;

var markerSpiderfier = null;

var statuz = [];        //for back button
var statuz_all = [];    //for next button
var initial_map = false;

//start customized controls
function CenterControl(controlDiv, map) {
    
    // Set CSS for GO BACK
    var goBackUI = document.createElement('div');
    goBackUI.id = 'goBackUI';                       //.id here is used in HTML <style>
    goBackUI.title = 'Go back one step';
    controlDiv.appendChild(goBackUI);
    // CSS for text
    var goBackText = document.createElement('div');
    goBackText.id = 'goBackText';
    goBackText.innerHTML = 'Go Back';
    goBackUI.appendChild(goBackText);

    // Set CSS for GO NEXT
    var goNextUI = document.createElement('div');
    goNextUI.id = "goNextUI";
    goNextUI.title = 'Move forward one step';
    controlDiv.appendChild(goNextUI);
    // CSS for text
    var goNextText = document.createElement('div');
    goNextText.id = 'goNextText';
    goNextText.innerHTML = 'Move Next';
    goNextUI.appendChild(goNextText);

    // Set CSS for GO ORIGINAL POS
    var goOrigUI = document.createElement('div');
    goOrigUI.id = "goOrigUI";
    goOrigUI.title = 'Back to original map';
    controlDiv.appendChild(goOrigUI);
    // CSS for text
    var goOrigText = document.createElement('div');
    goOrigText.id = 'goOrigText';
    goOrigText.innerHTML = 'Initial Map';
    goOrigUI.appendChild(goOrigText);

    // Set CSS for Radio
    var goRadioUI = document.createElement('div');
    goRadioUI.id = "goRadioUI";
    goRadioUI.title = 'Toggle Clustering';
    controlDiv.appendChild(goRadioUI);
    // CSS for text
    var goRadioText = document.createElement('div');
    goRadioText.id = 'goRadioText';
    goRadioText.innerHTML = 'Clusters ON';
    goRadioUI.appendChild(goRadioText);

    // Set CSS for Panel
    var goPanelUI = document.createElement('div');
    goPanelUI.id = "goPanelUI";
    goPanelUI.title = 'Toggle Panel';
    controlDiv.appendChild(goPanelUI);
    // CSS for text
    var goPanelText = document.createElement('div');
    goPanelText.id = 'goPanelText';
    goPanelText.innerHTML = 'Panel ON';
    goPanelUI.appendChild(goPanelText);

//===========
    // Set CSS for Full
    var goFullUI = document.createElement('div');
    goFullUI.id = "goFullUI";
    goFullUI.title = 'Toggle Fullscreen';
    controlDiv.appendChild(goFullUI);
    // CSS for text
    var goFullText = document.createElement('div');
    goFullText.id = 'goFullText';
    goFullText.innerHTML = 'Fullscreen OFF orig';
    goFullUI.appendChild(goFullText);
//===========

    // Set up the click event listener
    goBackUI.addEventListener('click', function() {EoLMap.back();});
    goNextUI.addEventListener('click', function() {EoLMap.next();});
    goOrigUI.addEventListener('click', function() {EoLMap.map.setOptions(initial_map);
        statuz = [];
        statuz_all = [];
        });

    goRadioUI.addEventListener('click', function() {clustersOnOff();});
    goPanelUI.addEventListener('click', function() {panelShowHide();});
    goFullUI.addEventListener('click', function() {goFullScreen();});
    
}
//end customized controls

//common.css

function clustersOnOff()
{
    if ($('goRadioText').innerHTML == "Clusters ON") {$('goRadioText').innerHTML = "Clusters OFF";}
    else                                             {$('goRadioText').innerHTML = "Clusters ON";}
    EoLMap.change();
}

function get_center_lat_long()
{
    var bound = new google.maps.LatLngBounds();
    EoLMap.recs = data.records;
    var numMarkers = EoLMap.recs.length;
    for (var i = 0; i < numMarkers; i++) 
    {
      bound.extend( new google.maps.LatLng(EoLMap.recs[i].lat, EoLMap.recs[i].lon) );
    }
    // console.log( bound.getCenter() );
    return bound.getCenter();
}

EoLMap.init = function() {

  //start centering map
  center_latlong = get_center_lat_long()
  // var latlng = new google.maps.LatLng(39.91, 116.38);
  var latlng = new google.maps.LatLng(center_latlong.lat(), center_latlong.lng());
  //end centering map
  
  var options = {
    'zoom': 3,      //2 has overlapping continents
    'center': latlng,
    'mapTypeId': google.maps.MapTypeId.ROADMAP,
    'scaleControl': true
  };

  EoLMap.map = new google.maps.Map($('map-canvas'), options);

  //start customized controls
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, EoLMap.map);
    centerControlDiv.index = 1;
    centerControlDiv.style['padding-top'] = '10px';
    EoLMap.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
  //end customized controls

  EoLMap.recs = data.records;
  EoLMap.map.enableKeyDragZoom();  //for key-drag-zoom
  
  //start spiderfy
  var spiderConfig = {
          keepSpiderfied: true,
          event: 'mouseover'
      };
      
  markerSpiderfier = new OverlappingMarkerSpiderfier(EoLMap.map, spiderConfig);
  //end spiderfy
  
  EoLMap.infoWindow = new google.maps.InfoWindow();
  EoLMap.showMarkers();
  google.maps.event.addListener(EoLMap.map, 'idle', function(){record_history();}); //for back-button    //other option for event 'tilesloaded'
  
};

//start back button
//end back button

EoLMap.showMarkers = function() {
  EoLMap.markers = [];

  if (EoLMap.markerClusterer) {
    EoLMap.markerClusterer.clearMarkers();
  }

  var panel = $('markerlist');
  panel.innerHTML = '';
  
  var numMarkers = EoLMap.recs.length;
  $('total_markers').innerHTML = numMarkers;

  for (var i = 0; i < numMarkers; i++) {
    var titleText = EoLMap.recs[i].catalogNumber;
    if (titleText === '') {
      titleText = 'No catalog number';
    }

    var item = document.createElement('DIV');
    var title = document.createElement('A');
    title.href = '#';
    title.className = 'title';
    title.innerHTML = titleText;

    item.appendChild(title);
    panel.appendChild(item);

    var latLng = new google.maps.LatLng(EoLMap.recs[i].lat, EoLMap.recs[i].lon);
    var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=' + 'FFFFFF,008CFF,000000&ext=.png';
    var markerImage = new google.maps.MarkerImage(imageUrl, new google.maps.Size(24, 32));
    var marker = new google.maps.Marker({
      'position': latLng,
      // 'icon': markerImage
      'icon': "https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0"
    });

    var fn = EoLMap.markerClickFunction(EoLMap.recs[i], latLng);
    google.maps.event.addListener(marker, 'click', fn);
    google.maps.event.addDomListener(title, 'click', fn);
    EoLMap.markers.push(marker);
    
    //start spiderfy
    markerSpiderfier.addMarker(marker); // Adds the Marker to OverlappingMarkerSpiderfier
    //end spiderfy
    
  }//end looping of markers
  
  //start spiderfy
  markerSpiderfier.addListener('click', function(marker, e) {EoLMap.infoWindow.open(EoLMap.map, marker);});
  markerx = EoLMap.markers;
  markerSpiderfier.addListener('spiderfy', function(markerx) {EoLMap.infoWindow.close();});
  //end spiderfy
  
  window.setTimeout(EoLMap.time, 0);
};

EoLMap.markerClickFunction = function(pic, latlng) {
  return function(e) {
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
    var title = pic.sciname;
    var infoHtml = '<div class="info"><h3>' + title + '</h3>';

    if(pic.pic_url)       {infoHtml += '<div class="info-body"><img src="' + pic.pic_url + '" class="info-img"/></div><br/>';}
    if(pic.catalogNumber) {infoHtml += 'Catalog number: ' + pic.catalogNumber + '<br/>';}
    infoHtml += 'Source portal: <a href="http://www.gbif.org/occurrence/' + pic.gbifID + '" target="_blank">GBIF data</a>' + '<br/>' +
                'Publisher: <a href="http://www.gbif.org/publisher/' + pic.publisher_id + '" target="_blank">' + pic.publisher + '</a><br/>' +
                'Dataset: <a href="http://www.gbif.org/dataset/' + pic.dataset_id + '" target="_blank">' + pic.dataset + '</a><br/>';
    if(pic.recordedBy)   {infoHtml += 'Recorded by: ' + pic.recordedBy + '<br/>';}
    if(pic.identifiedBy) {infoHtml += 'Identified by: ' + pic.identifiedBy + '<br/>';}
    infoHtml += '</div>';
    
    EoLMap.infoWindow.setContent(infoHtml);
    EoLMap.infoWindow.setPosition(latlng);
    EoLMap.infoWindow.open(EoLMap.map);
  };
};

EoLMap.clear = function() {
  for (var i = 0, marker; marker = EoLMap.markers[i]; i++) {
    marker.setMap(null);
  }
};

EoLMap.change = function() {
  EoLMap.clear();
  EoLMap.showMarkers();
};

EoLMap.time = function() {
  if (!document.getElementById("goRadioText")) {EoLMap.markerClusterer = new MarkerClusterer(EoLMap.map, EoLMap.markers);}
  else
  {
      if ($('goRadioText').innerHTML == "Clusters ON") {
        EoLMap.markerClusterer = new MarkerClusterer(EoLMap.map, EoLMap.markers);
      } else {
        for (var i = 0, marker; marker = EoLMap.markers[i]; i++) {
          marker.setMap(EoLMap.map);
        }
      }
  }
};
