var local_data = data;

var width = 960,
  height = 500;
// var nodes = d3.range(200).map(function() {
//     return { radius: Math.random() * 12 + 4 };
//   }),
//   root = nodes[0],
//   color = d3.scale.category10();
let index = 0;
var nodes = local_data.map(function() {

  console.log("node", local_data[index].image);
  color = "./images/"+local_data[index].image;
  index++;
    return { radius: Math.random() * 42 + 28, color: color};
  }),
  root = nodes[0];
  //;
root.radius = 0;
root.fixed = true;
var force = d3.layout
  .force()
  .gravity(0.05)
  .charge(function(d, i) {
    return i ? 0 : -3000;
  })
  .nodes(nodes)
  .size([width, height]);
force.start();
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
svg
  .selectAll("circle")
  .data(nodes.slice(1))
  .enter()
  .append("image")
  .attr("xlink:href", function(d, i) {
    console.log(nodes[i].color);
    return nodes[i].color;
  // .style("fill", function(d, i) {
  //   //.style("fill", "url(#grump_avatar" + i + ")");
  //   console.log(nodes[i].color);
  //
  //   return { url: nodes[i].color};
  //   // return nodes[i].color;
  })
  .append("circle")
  .attr("r", function(d) { return d.radius; })
   .style("fill", "url(#image)");
  .attr("xlink:href", function(d, i) {
    console.log(nodes[i].color);
    return nodes[i].color;
  })
  // .style("fill", "url(#image)");
  // .append("image")
  // .attr("xlink:href", function(d, i) {
  // //  console.log("nodes.slice(1)", nodes.slice(1));
  //   return nodes[i].color;
  // })
