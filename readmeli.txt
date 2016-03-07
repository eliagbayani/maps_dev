// console.log( bound.getCenter() );

// var latlng = new google.maps.LatLng(39.91, 116.38);


            
Cluster maps:   8,980   Feb 29
                10,000  Mar 01

Fusion maps:    183     Feb 29
                212     Mar 01
                
                
                

========================================================================================================
Fusion tables / layers:
https://developers.google.com/fusiontables/docs/v2/reference/table/update
https://developers.google.com/maps/documentation/javascript/examples/layer-fusiontables-heatmap
https://developers.google.com/fusiontables/docs/samples/adv_fusiontables
https://developers.google.com/fusiontables/docs/sample_code#FTLayers

========================================================================================================
half-degree cell = 0.5 x 0.5 = approx. 50 x 35 km
156543.03392 (px/m)



========================================================================================================
other possible info on revised Cluster options:
https://github.com/tuupola/php_google_maps/blob/master/Google/Maps/Clusterer/Distance.php
http://gis.stackexchange.com/questions/7430/what-ratio-scales-do-google-maps-zoom-levels-correspond-to
https://github.com/ivanmaeder/clusters/tree/master/tests

========================================================================================================
KML layers

Eli's first KML:
https://dl.dropboxusercontent.com/u/7597512/maps/kml/wildlife-national-parks-india.kml


Test your KML using Google:
https://www.google.com/maps/search/http:%2F%2Fyour.site%2Fyour.kml/@37.0625,-95.677068,4z/data=!3m1!4b1

yellow pin:
http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png

KML tutorial:
https://developers.google.com/kml/documentation/kml_tut
https://developers.google.com/maps/tutorials/kml/
https://developers.google.com/maps/documentation/javascript/examples/layer-kml

working example: http://jsfiddle.net/Shreerang/sxNy9/7/light/
========================================================================================================
http://superuser.com/questions/324756/how-can-i-compress-a-large-file-into-smaller-parts

This will compress file /path/to/your/large/file and creates many files with the prefix compressed.gz in the current directory, each file with a maximum size of 150 000 000 bytes:

gzip -c /path/to/your/large/file | split -b 150000000 - compressed.gz

Uncompress single file:
To uncompress the file resulting in the uncompressed file "/path/to/decrompressed/file" compressed using the command above use:

cat compressed.gz* | zcat > /path/to/decrompressed/file

========================================================================================================
1 GB = 1,073,741,824 bytes
     ~ 1,000,000,000 bytes (9 zeros)
1 MB = 1,048,576 byes
     ~ 1,000,000 (6 zeros)
     
gzip -c /path/to/your/large/file | split -b 1000000 - compressed.gz
========================================================================================================
actual:

to compress into multiple:
gzip -c gbif.zip | split -b 1000000000 - multiple.gz

to decompress from multiple files:
cat multiple.gz* | zcat > final.zip


nohup bash -c "gzip -c gbif.zip | split -b 1000000000 - multiple.gz"

nohup bash -c "cat multiple.gz* | zcat > final.zip"




========================================================================================================
