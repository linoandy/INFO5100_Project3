//draw_graph1() and draw_graph2() is based on mikebostock'g 'Grouped Bar Chart' found at http://bl.ocks.org/mbostock/3887051
function draw_graph2(year, value){
  var data;

  //Hardcoded data for top 5 methane emittors for each year
  var data2011_methane = [
    {
      "CountryName": "India",
      "Me2011": 430474.7828
    },
    {
      "CountryName": "China",
      "Me2011": 340141.2574
    },
    {
      "CountryName": "Brazil",
      "Me2011": 279066.0728
    },
    {
      "CountryName": "United States",
      "Me2011": 172647.1441
    },
    {
      "CountryName": "Australia",
      "Me2011": 94049.5226
    }
   ];

   /*Remaining hardcoded data files*/
  var data2010_methane = [
    {
      "CountryName": "India",
     "Me2010": 424460.966,
    },
    {
      "CountryName": "China",
      "Me2010": 347036.5617,
    },
    {
      "CountryName": "Brazil",
      "Me2010": 279416.2196,
    },
    {
      "CountryName": "United States",
      "Me2010": 175451.6417,
    },
    {
      "CountryName": "Australia",
      "Me2010": 56702.9041,
    }
   ];

   var data2009_methane = [
    {
      "CountryName": "India",
      "Me2009": 415092.7721
    },
    {
      "CountryName": "China",
       "Me2009": 341765.9137
    },
    {
      "CountryName": "Brazil",
      "Me2009": 268305.9411
    },
    {
      "CountryName": "United States",
      "Me2009": 175026.1582
    },
    {
      "CountryName": "Australia",
      "Me2009": 66620.578
    }
   ];
    
  if(year == 2011){
    data = data2011_methane;
  }
  else if(year == 2010){
    data = data2010_methane;
  }
  else if(year == 2009){
    data = data2009_methane;
  }

  data.push(value);
  data.sort(function(obj1, obj2) {
    // Ascending: first age less than the previous
    if(year == 2011){
      return obj2.Me2011 - obj1.Me2011;
    }
    else if(year == 2010){
      return obj2.Me2010 - obj1.Me2010;
    }
    else if(year == 2009){
      return obj2.Me2009 - obj1.Me2009;
    }
  }) ;
  console.log(data);

var xgraph, ygraph;
var margin = {top: 20, right: 150, bottom: 30, left: 150},
    width = 1400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#ff8c00"]);

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
   .attr('id', 'methaneDiv')
	.attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 1400 1050")
   .attr("x", 5)
   .attr("y",940)
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
              .style("font-size", "30px")
              .attr("transform", "rotate(-35)");;


  ygraph = svg.append("g");
      ygraph.attr("class", "y axis")
      .call(yAxis)
      .style("font-size", "30px")
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -120)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-size", "30px")
      .text("Giga grams");

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
	  .style("opacity", function(d) { 

      //handle highlightes for each year's data
      if(year == 2011){
        console.log('d.value: ', d.value, ' value.Me2011: ', value.Me2011);
        if (d.value == value.Me2011) return 1; else return 0.4 ; 
        }
        else if(year == 2010){
          console.log('d.value: ', d.value, ' value.Me2010: ', value.Me2010);
          if (d.value == value.Me2010) return 1; else return 0.4 ; 
        }
        else if(year == 2009){
          console.log('d.value: ', d.value, ' value.Me2009: ', value.Me2009);
          if (d.value == value.Me2009) return 1; else return 0.4 ; 
        }
      });

  state.selectAll(".bartext")
  .data(function(d) { return d.ages; })
  .enter()
  .append("text")
  .attr("class", "bartext")
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .attr("font-size","28px")
  .attr("x", function(d) { return x1.rangeBand()/2; })
  .attr("y", function(d) { return y(d.value); })
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
      .attr("width", 30)
      .attr("height", 30)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 15)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .attr("font-size", 25)
      .text( 'Methane Emissions');
}