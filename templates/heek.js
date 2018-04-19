var default_url = "/names";
var select = document.getElementById('samples');
var defaultOption = document.createElement("option");
defaultOption.text = 'Sample Names';
console.log(select);
select.add(defaultOption);
select.selectedIndex = 0;

// Plotly.d3.json(default_url, function(error, response){
//     if (error) return console.warn(error);
//     var names = response;
//     for (var i = 0; i < names.length; i++) {
//         var opt = names[i];
//         var el = document.createElement("option");
//         el.textContent = opt;
//         el.value = opt;
//         select.appendChild(el)}