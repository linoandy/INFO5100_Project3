
function draw_graph1( value){
var cname = value.CountryName; 
var data1 = [
  {
    "CountryName": "India",
    "MPro2011": 123400000,
  },
  {
    "CountryName": "China",
    "MPro2011": 41434820,
  },
  {
    "CountryName": "Brazil",
    "MPro2011": 32245524,
  },
  {
    "CountryName": "United States",
    "MPro2011": 89015235,
  },
  {
    "CountryName": "Pakistan",
    "MPro2011": 36656000,
  }
 ];
var data = data1;
data.push(value);
data.sort(function(obj1, obj2) {
  // Descending: first age less than the previous
  return obj2.MPro2011 - obj1.MPro2011;
}) ;
console.log(data);
var xgraph, ygraph;
var margin = {top: 20, right: 20, bottom: 30, left: 200},
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"))
    .ticks(5);

var svg = svg1
   .classed("svg-container", true).append("svg")
   .attr('id', 'milkDiv')
  .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 800 800")
   .attr("x", 0)
   .attr("y",200)
   //class to make it responsive
   .classed("svg-content-responsive", true) 
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "CountryName"; });

  data.forEach(function(d) {
    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.CountryName; }));
  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

  xgraph = svg.append("g");
      xgraph.attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll('text')
              .style("text-anchor", "end")
              .attr("transform", "rotate(-35)");;


  ygraph = svg.append("g");
      ygraph.attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -57)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tons");

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x0(d.CountryName) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return height; })
      .attr("height",0)
    .transition()
      .attr("height", 0)
      .transition().duration(1000).ease("quad")
      .attr("height", function(d) { return height - y(d.value); })
      .attr("y", function(d) { return y(d.value); })
    .style("fill", function(d) { return color(d.name) ; })
    //.style("opacity", function(d) { if (data.CountryName == value.CountryName) return 1; else return 0.5 ; });
    .style("opacity", function(d) { if (d.value == value.MPro2011) return 1; else return 0.5 ; });

  state.selectAll(".bartext")
  .data(function(d) { return d.ages; })
  .enter()
  .append("text")
  .attr("class", "bartext")
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .attr("font-size","10px")
  .attr("x", function(d) { return x1.rangeBand()/2; })
  .attr("y", function(d) { return y(d.value); })
  //.attr("transform", "rotate(-10)")
  .text(function(d){
     return Math.floor(d.value);
  });

  var legend = svg.selectAll(".legend")
      .data(ageNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
    
}
//draw_graph1({"CountryName": "Poland", "MPro2011": 12434067});