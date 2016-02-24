function $(element) {return document.getElementById(element);}

var EoLMap = {};
EoLMap.map = null;
var layer_0;

var statuz      = [];   //for back button
var statuz_all  = [];   //for next button
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
    
    goPanelUI.addEventListener('click', function() {panelShowHide();});
    goFullUI.addEventListener('click', function() {goFullScreen();});
}
//end customized controls

function initialize() {
    EoLMap.map = new google.maps.Map(document.getElementById('map-canvas'), {center: new google.maps.LatLng(data.center_lat, data.center_lon), zoom: 3, mapTypeId: google.maps.MapTypeId.ROADMAP, 'scaleControl': true});

    //start customized controls
      var centerControlDiv = document.createElement('div');
      var centerControl = new CenterControl(centerControlDiv, EoLMap.map);
      centerControlDiv.index = 1;
      centerControlDiv.style['padding-top'] = '10px';
      EoLMap.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    //end customized controls

    EoLMap.map.enableKeyDragZoom();  //for key-drag-zoom

    layer_0 = new google.maps.FusionTablesLayer({
        query: {select: "'location'", from: data.tableID},
        map: EoLMap.map,
        heatmap: { enabled: false }
    });
      
    google.maps.event.addDomListener(document.getElementById('heatmap_radio'), 'click', function() {
        var heatmap_radio = document.getElementById('heatmap_radio');
        layer_0.setOptions({
        heatmap: {enabled: heatmap_radio.checked}
        });
    });
    
    document.getElementById('heatmap_radio').checked = false; //intial state
    document.getElementById('heatmap_radio').disabled = false;
    
    add_publishers();
    
    google.maps.event.addListener(EoLMap.map, 'idle', function(){record_history();}); //for back-button    //other option for event 'tilesloaded'
}

function select_change() {
    var heatmap_radio = document.getElementById('heatmap_radio');
    var heatmap_label = document.getElementById('heatmap_label');
    var whereClause;
    var searchString = document.getElementById('select_publisher').value.replace(/'/g, "\\'");
    if (searchString != '--ALL--') {
        whereClause = "'publisher' = '" + searchString + "'";
        heatmap_radio.checked = false;
        layer_0.setOptions({heatmap: {enabled: false}});
        heatmap_radio.disabled = true;
        heatmap_label.style['color'] = 'gray';
    }
    else { heatmap_radio.disabled = false;
           heatmap_label.style['color'] = 'black';
    }
    layer_0.setOptions({query: {select: "'location'", from: data.tableID, where: whereClause}});
}

function add_publishers() {
    var select = document.getElementById('select_publisher');
    publishers = data.publishers;
    for (var i = 0; i < publishers.length; i++) 
    {
        var opt = document.createElement('option');
        opt.value = publishers[i];
        opt.innerHTML = publishers[i];
        select.appendChild(opt);
    }
}
