function goFullScreen()
{
    var elem = document.getElementById("gmap"); //gmap or map-container

    // if (elem.requestFullscreen)         {elem.requestFullscreen();} 
    // else if (elem.msRequestFullscreen)  {elem.msRequestFullscreen();} 
    // else if (elem.mozRequestFullScreen) {elem.mozRequestFullScreen();} //Firefox 
    // else if (elem.webkitRequestFullscreen) //Chrome and Safari
    // {
    //     // elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    //     elem.style.width = "100%";
    //     elem.style.height = "100%";
    //     elem.webkitRequestFullscreen();
    // }

    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) 
    {  // current working methods
      $('goFullText').innerHTML = "Fullscreen ON";
      if      (elem.requestFullscreen)      {elem.requestFullscreen();} 
      else if (elem.msRequestFullscreen)    {elem.msRequestFullscreen();} 
      else if (elem.mozRequestFullScreen)   {elem.mozRequestFullScreen();} 
      else if (elem.webkitRequestFullscreen) {
        elem.style.width = "100%";
        elem.style.height = "100%";
        

        elem.webkitRequestFullscreen(); //Element.ALLOW_KEYBOARD_INPUT
        // panelShowHide();
        // panelShowHide();
        // EoLMap.change();
        
      }
    } else
    {
      $('goFullText').innerHTML = "Fullscreen OFF";
      if      (document.exitFullscreen) {document.exitFullscreen();} 
      else if (document.msExitFullscreen) {document.msExitFullscreen();} 
      else if (document.mozCancelFullScreen) {document.mozCancelFullScreen();} 
      else if (document.webkitExitFullscreen) {
        elem.style.width = "";
        document.webkitExitFullscreen();
      }
    }

    google.maps.event.trigger(EoLMap.map, 'resize');
    
}

// start: listeners for fullscreenchanges
if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}
function exitHandler() {
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null)
    {
        if(!document.webkitIsFullScreen)
        {
            $('goFullText').innerHTML = "Fullscreen OFF2";
            var elem = document.getElementById("gmap"); //gmap or map-container
            elem.style.width = "";
        }
        if(document.mozFullScreen) $('goFullText').innerHTML = "Fullscreen ON2";
    }
}
// end: listeners for fullscreenchanges

function panelShowHide()
{
    var el = document.getElementById("panel");
    if ($('goPanelText').innerHTML == "Panel ON")
    {
        $('goPanelText').innerHTML = "Panel OFF";
        // el.style.display = 'none';
        el.style.width = 0;
    }
    else
    {
        $('goPanelText').innerHTML = "Panel ON";
        // el.style.display = 'block';
        el.style.width = "17%";
    }
    google.maps.event.trigger(EoLMap.map, 'resize');
}

//start back button
function record_history()
{
    var current = {};
    current.center = EoLMap.map.getCenter();
    current.zoom = EoLMap.map.getZoom();
    current.mapTypeId = EoLMap.map.getMapTypeId();
    statuz.push(current);
    statuz_all.push(current);
    if(!initial_map) initial_map = current;
}
EoLMap.back = function()
{
    if(statuz.length > 1) {
        statuz.pop();
        var current = statuz.pop();
        EoLMap.map.setOptions(current);
        if(JSON.stringify(current) == JSON.stringify(initial_map)){
            statuz = [];
            statuz_all = [];
        }
    }
}
EoLMap.next = function()
{
    if(statuz_all.length > 1) {
        statuz_all.pop();
        var current = statuz_all.pop();
        EoLMap.map.setOptions(current);
        if(JSON.stringify(current) == JSON.stringify(initial_map)){
            statuz = [];
            statuz_all = [];
        }
    }
}
//end back button
