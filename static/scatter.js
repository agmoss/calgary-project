Plotly.d3.json(domainName + 'api/scatter_data', function(data){

    var allCommunity = [];
    var listOfCommunity = [];

    var currentCommunity = [];

    var allprice = [] ;   
    var allsq_feet = [] ;

    var currentPrice = [];
    var currentSqFeet = [];

     data.forEach(function(item){

         if(item.price < 10000 && item.sq_feet < 5000){

             allprice.push(item.price);
             allsq_feet.push(item.sq_feet);
             allCommunity.push(item.community);

         }

     });

         // Makes things uniuque
    for (var i = 0; i < allCommunity.length; i++ ){ 
        if (listOfCommunity.indexOf(allCommunity[i]) === -1 ){
            listOfCommunity.push(allCommunity[i]);
        }
    }

    // Gets current selection
    function getCommunityData(chosenItem) {
        currentCommunity = [];
        currentPrice = [];
        currentSqFeet = [];
    
        for (var i = 0 ; i < allCommunity.length ; i++){
            if ( allCommunity[i] === chosenItem ) {
                currentCommunity.push(allCommunity[i]);
                currentPrice.push(allprice[i]);
                currentSqFeet.push(allsq_feet[i]);
            }
        }
    };

    // Default Data
    setPlot('Eau Claire');

    // Actual plotting function 
    function setPlot(chosenItem) {
        getCommunityData(chosenItem);

        var trace1 = {
    
            x: currentPrice,
            y: currentSqFeet,
            mode: 'markers',
            type: 'histogram2dcontour',
            // name: 'Team A',
            // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
            marker: { size: 12 }
        };

        var trace2 = {
            x: currentPrice,
            y: currentSqFeet,
            mode: 'markers',
            name: 'points',
            marker: {
            color: 'rgb(102,0,0)',
            size: 2,
            opacity: 0.4
            },
            type: 'scatter'
        };
        
        var data = [trace1,trace2];
        
        var layout = {

            title:'Data Labels Hover'
        };
        
        Plotly.newPlot('scatterplotdiv', data, layout);

    };

    var innerContainer = document.querySelector('[data-num="7"'),
    itemSelector = innerContainer.querySelector('.selection');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listOfCommunity, itemSelector);

    function updateSelection(){
        setPlot(itemSelector.value);
    }

    itemSelector.addEventListener('change', updateSelection, false);

    // Set the default selection ddl value
    itemSelector.value = "Eau Claire";

    
});
