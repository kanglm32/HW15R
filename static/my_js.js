console.log("message more clever");
var default_url = "/names";
var select = document.getElementById('samples');

console.log(select);
var default_Option = document.createElement("option");
console.log(default_Option);

default_Option.text = 'Sample Names';

console.log(default_Option);
console.log(select);

select.add(default_Option);

console.log(select);
select.selectedIndex = 0;

Plotly.d3.json(default_url, function(error, response){
    if (error) return console.warn(error);
    var names = response;
    for (var i = 0; i < names.length; i++) {
        var opt = names[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el)}});




function piechart(route) {
    Plotly.d3.json(`/samples/${route}`, function(error, data){
    if (error) return console.warn(error);
    var layout = {
    title: "My Pie I want to Die",
    showlegend: true,
    height: 500,
    width: 500}
    var PIE = document.getElementById('pie');
    console.log(data);
    Plotly.plot(PIE, data, layout);
        })};

function updatePlotly(newdata) {
    var PIE = document.getElementById('pie');
    Plotly.restyle(PIE, data)};


function getData(route, ) {
    console.log(route);
    Plotly.d3.json(`/samples/${route}`, function(error, data) {
    piechart(route)
    bubblechart(route);
        });
  
        };
   
    



function piechart(route) {
    Plotly.d3.json(`/samples/${route}`, function(error, data){
    if (error) return console.warn(error);
    var layout = {
    title: "My Pie I want to Die",
    showlegend: true,
    height: 500,
    width: 500}
    var PIE = document.getElementById('pie');
    console.log(data);
    Plotly.plot(PIE, data, layout);
                })};

    
function bubblechart(route, otuData) { 
    // function bubblechart(route) { 
        ///test
   
    ///test


        Plotly.d3.json(`/samples/${route}`, function(error, data){
        if (error) return console.warn(error);
        console.log(data)
    

        // console.log(data[0].labels)
        var trace1 = {
            x: data[0].labels,
            y: data[0].values,
            // text: labels,
            mode: 'markers',
            // text: labels,
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)', ],
                opacity: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
                size: data[0].values
                    }
                    };  
        var data = [trace1];
        var bubs = document.getElementById('bubble');
        var layout = {
            title: 'Bubbles and bubbles',
            showlegend: false,
            height: 600,
            width: 1280};
            Plotly.plot(bubs, data, layout);
        }
    )
    
    };
    
           

piechart('BB_940')
bubblechart('BB_940')
