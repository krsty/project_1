/* LINE CHART */

// Define margins, dimensions, and some line colors
var margin = {top: 20, right: 20, bottom: 30, left: 200};
var width = 1000 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// Define the scales and tell D3 how to draw the line
var x = d3.scaleLinear().domain([1945, 2010]).range([0, width]);     
var y = d3.scaleLinear().domain([0, 2000000000]).range([height, 0]);
var line = d3.line().x(d => x(d.year)).y(d => y(d.population));

var chart = d3.select('svg').append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
var tooltip = d3.select('#tooltip');
var tooltipLine = chart.append('line');
  
// Add the axes and a title
var xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
var yAxis = d3.axisLeft(y).tickFormat(d3.format(',.0f'));
chart.append('g').call(yAxis); 
chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
  
// Load the data and draw a chart
let states, tipBox;
d3.json('linegraph.json', d => {
  states = d;

  chart.selectAll()
    .data(states).enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', d => d.color)
    .attr('stroke-width', 2)
    .datum(d => d.history)
    .attr('d', line);
  
  chart.selectAll()
    .data(states).enter()
    .append('text')
    .html(d => d.name)
    .attr('fill', d => d.color)
    .attr('alignment-baseline', 'middle')
    .attr('x', width)
    .attr('dx', '.5em')
    .attr('y', d => y(d.currentPopulation)); 
  
  tipBox = chart.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('opacity', 0)
    .on('mousemove', drawTooltip)
    .on('mouseout', removeTooltip);
})

function removeTooltip() {
  if (tooltip) tooltip.style('display', 'none');
  if (tooltipLine) tooltipLine.attr('stroke', 'none');
}

function drawTooltip() {
  var year = Math.floor((x.invert(d3.mouse(tipBox.node())[0]) + 0) / 5) * 5;
  
  states.sort((a, b) => {
    return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
  })  
    
  tooltipLine.attr('stroke', 'black')
    .attr('x1', x(year))
    .attr('x2', x(year))
    .attr('y1', 0)
    .attr('y2', height);
  
  tooltip.html(year)
    .style('display', 'block')
    .style('left', d3.event.pageX + 20)
    .style('top', d3.event.pageY - 20)
    .selectAll()
    .data(states).enter()
    .append('div')
    .style('color', d => d.color)
    .html(d => d.name + ': ' + d.history.find(h => h.year == year).population);
}