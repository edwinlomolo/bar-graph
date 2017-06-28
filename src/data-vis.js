var width = 500;
var height = 500;

var canvas = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)

var xScale = d3.scale.linear().range([0, 500]);
var yScale = d3.scale.linear().range([0, 500]);

function render(data) {
  xScale.domain(d3.extent(data, function(d) { return d.sepal_length; }));
  yScale.domain(d3.extent(data, function(d) { return d.petal_length; }));

  var circles = canvas.selectAll("circle").data(data);

  circles.enter().append("circle").attr("r", 10);
  
  circles.attr("cx", function(d) { return xScale(d.sepal_length); }).attr("cy", function(d) { return yScale(d.petal_length); });

  circles.exit().remove();

}

function type(d) {
  d.sepal_length = +d.sepal_length;
  d.petal_length = +d.petal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_width = +d.petal_width;
  return d;
}

d3.csv("/data.csv", type, render);