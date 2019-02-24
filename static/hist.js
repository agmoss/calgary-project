Plotly.d3.json(domainName + 'api/box_data', function(data){

    var allTypeNames = [];   
    var allQuadrant = [];
    var allPrice = []; 

    var listofTypes = []; // uniuque
    var listofQuadrants = []; // uniuque

    var currentPrice = []; // Data on current selection 

    data.forEach(function(item){

        allTypeNames.push(item._type)
        allQuadrant.push(item.quadrant);
        allPrice.push(item.price);

    });

    // Makes things uniuque
    for (var i = 0; i < allTypeNames.length; i++ ){ 
        if (listofTypes.indexOf(allTypeNames[i]) === -1 ){
            listofTypes.push(allTypeNames[i]);
        }
    }

    // Makes things uniuque
    for (var i = 0; i < allQuadrant.length; i++ ){ 
        if (listofQuadrants.indexOf(allQuadrant[i]) === -1 ){
            listofQuadrants.push(allQuadrant[i]);
        }
    }
   
        // Gets current selection
        function getTypeData(chosenType, chosenQuadrant) {
            currentPrice = [];
            for (var i = 0 ; i < allTypeNames.length ; i++){
                if (allTypeNames[i] === chosenType) {

                    if (allQuadrant[i] === chosenQuadrant ) {
                        currentPrice.push(allPrice[i]);
                    }
                }
            }
        };

    // Default 
    setPlot('Apartment','SW');

    // Actual plotting function 
    function setPlot(chosenType, chosenQuadrant) {
        getTypeData(chosenType,chosenQuadrant);

        let trace1 = {

            x: currentPrice,
            opacity: 0.9,
            type:'histogram',
            
            }
    
            let layout = {
                yaxis: {
                    title: {
                      text: 'Frequency',
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
                plot_bgcolor:customPlotLayout.background.plotBackgroundColor,
                paper_bgcolor:customPlotLayout.background.paperBackgroundColor,
        
                margin: {
                    l: 10,
                    r: 10,
                    b: 50,
                    t: 1,
                    pad: 4
                  },

                autosize : true, // Important for responsiveness
            }

        var data = [trace1];

        Plotly.newPlot('distplotdiv', data, layout,{displayModeBar: false});
    };

    var innerContainer = document.querySelector('[data-num="3"'),itemSelector = innerContainer.querySelector('.selection');

    var innerContainer2 = document.querySelector('[data-num="10"'),itemSelector2 = innerContainer2.querySelector('.selection');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofTypes, itemSelector);
    assignOptions(listofQuadrants, itemSelector2);

    function updateSelection(){
        setPlot(itemSelector.value,itemSelector2.value);
    }

    itemSelector.addEventListener('change', updateSelection, false);
    itemSelector2.addEventListener('change', updateSelection, false);

    // Set the default selection ddl value
    itemSelector.value = "Apartment";
    itemSelector2.value = "SW";

});