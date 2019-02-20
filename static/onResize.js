// Define plot divs for the Plotly functions and the resize event (maybe put this somewhere else)
// TODO: refactor
// var bDiv = document.getElementById('scatterplotdiv')
// var pDiv = document.getElementById('pieplotdiv')
// var boxDiv = document.getElementById('boxplotdiv')
// var hDiv = document.getElementById('distplotdiv')
// var heatDiv = document.getElementById('heatdiv')
// var lineDiv = document.getElementById('lineplotdiv')

var plotdivs = document.getElementsByClassName('plotdiv');

window.addEventListener("resize", function(){

    for (let item of plotdivs){

        Plotly.relayout(item, {
            width: 0.9 * item.innerWidth,
            height: 0.9 * item.innerHeight
        })
        
    }

});