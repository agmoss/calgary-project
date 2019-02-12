Plotly.d3.json(domainName + 'api/ts_data', function(data){

  var traces = []

  Object.keys(data).forEach(function(item){

    var trace  = {
      "x": Object.keys(data[item]),
      "y": Object.values(data[item]),
      "mode": 'lines',
      "name": item,
    };

    traces.push(trace)

  });
 
  var data = traces;
  
  let layout = {
    yaxis: {
        title: {
          text: 'Average Rent per Month',
          font: {
            size: customPlotLayout.axis.axisTitleSize,
            color: customPlotLayout.axis.axisColor,
          }
        },
        tickcolor: customPlotLayout.axis.axisColor,
        tickfont: {
            size: customPlotLayout.axis.axisTickSize,
            color: customPlotLayout.axis.axisColor
          },
          automargin : true,
      },
      xaxis: {
        title: {
          text: 'Date',
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

        tickangle: (45),
        ticks: 'outside',
      },

    plot_bgcolor:customPlotLayout.background.plotBackgroundColor,
    paper_bgcolor:customPlotLayout.background.paperBackgroundColor,

    margin: {
        l: 100,
        r: 50,
        b: 100,
        t: 1,
        pad: 4
      },

    autosize : true, // Important for responsiveness
  }
  
  Plotly.newPlot('lineplotdiv', data, layout,{displayModeBar: false},{responsive: true});

});