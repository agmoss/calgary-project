Plotly.d3.json(domainName + 'api/map_data', function(data){

    var allData = [];

    var currentData = [];

    var allTypeNames = [] ;   

    var listofTypes = []; // uniuque


    data.forEach(function(item){

        allTypeNames.push(item._type);
        allData.push(item)

    });

    // Makes things uniuque
    for (var i = 0; i < allTypeNames.length; i++ ){ 
        if (listofTypes.indexOf(allTypeNames[i]) === -1 ){
            listofTypes.push(allTypeNames[i]);
        }
    }
    
    // Gets current selection
    function getTypeData(chosenItem) {

        for (var i = 0 ; i < allTypeNames.length ; i++){
            if ( allTypeNames[i] === chosenItem ) {
                currentData.push(allData[i]);

            }
        }
    };

    // Default 
    setMap('Apartment');


    function setMap(chosenItem){

        getTypeData(chosenItem);

        geoJson = arrayToGeoJson(currentData);

    
        layer = new L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
            }); 


        var map = new L.map('map',{
            preferCanvas: true
        }); 

        map.setView(new L.LatLng(51.0486,-114.0708), 12 );

        map.addLayer(layer);
    
        // Custom circlemarkers
        var geojsonMarkerOptions = {
            radius: 3,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    
        L.geoJSON(geoJson, {
            pointToLayer: function (feature, latlng) {
    
                var mypopup = L.popup().setContent(
                    '<h4>' + feature.properties.type + '</h4>' 
                    + '<p>' + "Price: " + feature.properties.price + '</p>'
                    + '<p>' + "Address: " + feature.properties.address + '</p>'
                    + '<p>' + "Square Feet: " + feature.properties.sq_feet + '</p>'
                    );
    
                var mymarker = L.circleMarker(latlng, geojsonMarkerOptions);
          
                mymarker.bindPopup(mypopup);
                return mymarker;               
            }
          }).addTo(map);

    };

    var innerContainer = document.querySelector('[data-num="0"'),
        itemSelector = innerContainer.querySelector('.selection');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofTypes, itemSelector);

    function updateSelection(){
       
        currentData = [];

        map.remove();

        var div = document.createElement("div");

        div.setAttribute("id","map")

        document.getElementById("main").appendChild(div);

        setMap(itemSelector.value);
    }

    itemSelector.addEventListener('change', updateSelection, false);

    // Set the default selection ddl value
    itemSelector.value = "Apartment";

})