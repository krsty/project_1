var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 200},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var colours = d3.scaleOrdinal()
    .range(["#6F257F", "#CA0D59", "#2baa69", "#3fb2e0", "#e09b3f", "#e03f3f", "#3f53e0", "#d73fe0", "#f68cc0", "#358f75"]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", function(d) {
  d.believers = +d.believers;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.religion; }));
  y.domain([0, d3.max(data, function(d) { return d.believers; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");

var bar= g.selectAll(".bar")
      	  .data(data)
          .enter().append("rect")
          .attr("x", function(d) { return x(d.religion); })
          .attr("width", x.bandwidth())
          .attr("y", height)
          .attr("height", 0)
          .attr("fill", function(d) { return colours(d.religion); })
    
    
     bar.transition()
        .duration(1000)
        .delay(100)
        .attr("y", function(d) { return y(d.believers); })
        .attr("height", function(d) { return height - y(d.believers); })
        
       
     bar.on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.religion) + "<br>" + (d.believers))
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});
});


