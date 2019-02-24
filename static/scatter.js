Plotly.d3.json(domainName + 'api/scatter_data', function(data){

    var allCommunity = [];
    var listOfCommunity = [];

    var currentCommunity = [];

    var allprice = [] ;   
    var allsq_feet = [] ;

    var currentPrice = [];
    var currentSqFeet = [];

     data.forEach(function(item){

         if( 1 < item.price &&  item.price < 10000 && 1 < item.sq_feet && item.sq_feet < 5000){
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

        // var trace1 = {
    
        //     x: currentPrice,
        //     y: currentSqFeet,
        //     mode: 'markers',
        //     type: 'histogram2dcontour',
        //     // name: '',
        //     // text: [],
        //     //marker: { size: 12 }
        // };

        var trace2 = {
            x: currentPrice,
            y: currentSqFeet,
            mode: 'markers',
            marker: {
            size: 4,
            opacity: 1,
             },
            type: 'scatter'
        };
        
        var data = [trace2];
        
        var layout = {

            paper_bgcolor:"rgb(22, 22, 22)",
            plot_bgcolor:"rgb(22, 22, 22)",
            

            yaxis: {
                title: {
                  text: 'Square Feet',
                  font: {
                    size: customPlotLayout.axis.axisTitleSize,
                    color: customPlotLayout.axis.axisColor,
                  }
                },
                tickcolor: customPlotLayout.axis.axisColor,
                tickfont: {
                    size: 14,
                    color: customPlotLayout.axis.axisColor
                  },
                  automargin : true,
              },
              xaxis: {
                title: {
                  text: 'Rent per Month',
                  font: {
                    size: customPlotLayout.axis.axisTitleSize,
                    color: customPlotLayout.axis.axisColor
                  }
                },
                tickcolor: customPlotLayout.axis.axisColor,
                tickfont: {
                    size: customPlotLayout.axis.axisTickSize,
                    color: customPlotLayout.axis.axisColor
                  },
                  automargin : true,
              },
    
            margin: {
                l: 10,
                r: 10,
                b: 50,
                t: 1,
                pad: 4
              },

            autosize : true, // Important for responsiveness
        }
        
        Plotly.newPlot('scatterplotdiv', data, layout,{displayModeBar: false},{responsive: true});

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
