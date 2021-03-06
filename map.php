<!DOCTYPE html>
<html lang='en' xml:lang='en' xmlns:fb='http://ogp.me/ns/fb#' xmlns:og='http://ogp.me/ns#' xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <meta charset="utf-8">
    <title>EoL Sample Cluster Map</title>

    <!--
    <link rel="stylesheet" href="css/cluster.css" type="text/css" media="screen">
    <link rel="stylesheet" href="css/common.css" type="text/css" media="screen">
    -->

    <link rel="stylesheet" href="css/local_application.css" type="text/css" media="screen">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script> <!-- we are now using jquery -->
    
    <script src="http://maps.google.com/maps/api/js?key=AIzaSyCXt2WPrcQniaMomonEruEOi3EHYlGEi3U"></script>
    
    <script src="js/vendor/dragzoom/keydragzoom_packed.js" type="text/javascript"></script>
    <script src="js/vendor/spiderfy/oms.min.js"></script>
    <script src="js/vendor/markerclusterer/markerclusterer_compiled.js" type="text/javascript"></script>
    
    <!--- also works OK
    <script src="http://editors.eol.localhost/rails_app/vendor/assets/javascripts/dragzoom/keydragzoom_packed.js" type="text/javascript"></script>
    <script src="http://editors.eol.localhost/rails_app/vendor/assets/javascripts/spiderfy/oms.min.js"></script>
    <script src="http://editors.eol.localhost/rails_app/vendor/assets/javascripts/markerclusterer/markerclusterer_compiled.js" type="text/javascript"></script>
    --->
    
    
    <?php
    $params =& $_GET;
    
    todo here:
    $folder = $params['tc_id'] % 100;
    $path = $this->save_path['map_data']."/".$folder."/";
    
    ?>
    
    <script src="data/<?php echo $params['tc_id']?>.json"></script>                                                        <!-- 284202 is the taxon_concept_ID, another example is 495478 -->
    
    <script src="js/cluster.js"></script>
    <script src="js/json_maps.js"></script>
    
    <!--- also works OK
    <script src="http://editors.eol.localhost/rails_app/app/assets/javascripts/cluster.js"></script>
    <script src="http://editors.eol.localhost/rails_app/app/assets/javascripts/json_maps.js"></script>
    --->
    
    <script>
    // google.maps.event.addDomListener(window, 'load', EoLMap.init); --- works but we are now using jquery
    $(document).ready( function() { EoLMap.init(); } );
    </script>
    
</head>
<body>
    
    <div id="gmap">
        <div id="panel">
            <div>Georeference records: <span id="total_markers"></span></div>
            <div id="markerlist"></div>
        </div>
        <div id="map-container">
            <div id="map-canvas"></div>
        </div>
    </div>

</body>
</html>
