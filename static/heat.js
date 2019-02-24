Plotly.d3.json(domainName + 'api/corr_data', function(error,data){

    if (error) return console.warn(error);

    var d = [{
        x: data.xValues,
        y: data.yValues,
        z: data.zValues,
        colorscale: 'YIGnBu',
        type: 'heatmap',
    }]

    var layout = {
        annotations: [],
        yaxis: {
          ticks: '',
          tickcolor: customPlotLayout.axis.axisColor,
          tickfont: {
              size: 14,
              color: customPlotLayout.axis.axisColor
            },
        },
        xaxis: {
          ticks: '',
          side: 'top',
          tickcolor: customPlotLayout.axis.axisColor,
          tickfont: {
              size: 14,
              color: customPlotLayout.axis.axisColor
            },
        },
        plot_bgcolor:customPlotLayout.background.plotBackgroundColor,
        paper_bgcolor:customPlotLayout.background.paperBackgroundColor,

        autosize : true, 

        margin: {
          l: 170,
          r: 50,
          b: 50,
          t: 150,
          pad: 2
        },

      };

    Plotly.newPlot('heatdiv', d, layout, {displayModeBar: false}); 

})