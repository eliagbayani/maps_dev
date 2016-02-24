function goFullScreen()
{
    var elem = document.getElementById("gmap"); //gmap or map-container

    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) 
    {  // current working methods
        $('goFullText').innerHTML = "Fullscreen ON";


        if ($('goPanelText').innerHTML == "Panel ON")
        {
            $('panel').style.height      = "100%";
            $('panel').style.width       = "17%";
            $('map-canvas').style.height = "100%";
            $('map-canvas').style.width  = "83%";

        }
        else
        {
            $('panel').style.height      = "0px";
            $('panel').style.width       = "0px";
            $('map-canvas').style.height = "100%";
            $('map-canvas').style.width  = "100%";
            
        }
        

        if      (elem.requestFullscreen)      {elem.requestFullscreen();} 
        else if (elem.msRequestFullscreen)    {elem.msRequestFullscreen();} 
        else if (elem.mozRequestFullScreen)   {elem.mozRequestFullScreen();} 
        else if (elem.webkitRequestFullscreen) 
        {
            elem.style.width = "100%";
            elem.style.height = "100%";

            // $('panel').style.height      = "100%";
            // $('map-canvas').style.height = "100%";
            // $('panel').style.width      = "17%";
            // $('map-canvas').style.width = "83%";

            elem.webkitRequestFullscreen(); //Element.ALLOW_KEYBOARD_INPUT
            google.maps.event.trigger(EoLMap.map, 'resize');
            
            // panelShowHide();
            // panelShowHide();
            // EoLMap.change();
        }
    } 
    else
    {
          $('goFullText').innerHTML = "Fullscreen OFF";
      
          // alert("turning off fullscreen");
          
          if ($('goPanelText').innerHTML == "Panel ON")
          {
              $('panel').style.height      = "500px";
              $('panel').style.width       = "400px";
              $('map-canvas').style.height = "500px";
              $('map-canvas').style.width  = "800px";
              
          }
          else
          {
              $('panel').style.height      = "0px";
              $('panel').style.width       = "0px";
              $('map-canvas').style.height = "500px";
              $('map-canvas').style.width  = "1200px";
              
          }
          
      
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
    // if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null)
    if(is_full_screen)
    {
        if(!document.webkitIsFullScreen)
        {
            $('goFullText').innerHTML = "Fullscreen OFF2";
            var elem = document.getElementById("gmap"); //gmap or map-container
            elem.style.width = "";
        }
        if(document.mozFullScreen) $('goFullText').innerHTML = "Fullscreen ON2";
    }


    if(!is_full_screen())
    {
        // alert("went here for all browsers");
        if ($('goPanelText').innerHTML == "Panel ON")
        {
            $('panel').style.height      = "500px";
            $('panel').style.width       = "400px";
            $('map-canvas').style.height = "500px";
            $('map-canvas').style.width  = "800px";
        }
        else
        {
            $('map-canvas').style.height = "500px";
            $('map-canvas').style.width  = "1200px";
        }
    }
    
    google.maps.event.trigger(EoLMap.map, 'resize');
    
}
// end: listeners for fullscreenchanges

function is_full_screen()
{
    var elem = document.getElementById("gmap"); //gmap or map-container
    if      (elem.requestFullscreen) {}
    else if (elem.msRequestFullscreen)
    {
        if (document.msFullscreenElement == true) return true;
    } 
    else if (elem.mozRequestFullScreen)
    {
        if (document.mozFullScreen == true) return true;
    }   
    else if (elem.webkitRequestFullscreen)
    {
        if (document.webkitIsFullScreen == true) return true;
    }
    return false;
}

function panelShowHide()
{
    // el.style.display = 'none';
    // el.style.display = 'block';
    
    if ($('goPanelText').innerHTML == "Panel ON") $('goPanelText').innerHTML = "Panel OFF";
    else                                          $('goPanelText').innerHTML = "Panel ON";
    
    if (is_full_screen())
    {
        $('map-canvas').style.height = "100%";
        if ($('goPanelText').innerHTML == "Panel ON")
        {
            $('panel').style.width       = "17%";
            $('panel').style.height      = "500px";
            $('map-canvas').style.width  = "83%";
        }
        else
        {
            $('panel').style.width = "0px";
            $('panel').style.height = "0px";
            $('map-canvas').style.width = "100%";
        }
    }
    else
    {
        $('map-canvas').style.height = "500px";
        
        if ($('goPanelText').innerHTML == "Panel ON")
        {
            $('panel').style.width       = "400px";
            $('panel').style.height      = "500px";
            $('map-canvas').style.width  = "800px";
        }
        else
        {
            $('panel').style.width      = "0px";
            $('panel').style.height     = "0px";
            $('map-canvas').style.width = "1200px";
        }
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
