import React, { Component } from "react";
import "./index.css";
import local_data from "../../data/skills.json";
import * as d3 from "d3";
import { withFauxDOM } from "react-faux-dom";

// set a width and height for our SVG
var margin = 0.8,
  width = window.screen.width * margin,
  height = window.screen.height * margin;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
class Home extends Component {

  componentDidMount() {

    var nodes = local_data.map((d, i) => {
        return { radius: Math.random() * 60 + 28, image: local_data[i].image };
      }),
      root = nodes[0];
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

    var padding = 4;
    /// here the circles are created and the fill is the color
    svg
      .selectAll("image")
      .data(nodes.slice(1))
      .enter()
      .append("svg:pattern")
      .attr("id", function(d, i) {
        return "skill" + i;
      })
      .attr("width", function(d) {
        return d.radius * 2 - padding;
      })
      .attr("height", function(d) {
        return d.radius * 2 - padding;
      })
      .attr("x", function(d) {
        return d.radius;
      })
      .attr("y", function(d) {
        return d.radius;
      })
      .attr("class", "ball")
      .attr("patternUnits", "userSpaceOnUse")
      .append("svg:image")
      .attr("xlink:href", function(d) {
        return "./images/images/" + d.image;
      })
      .attr("width", function(d) {
        return d.radius * 1.8;
      })
      .attr("height", function(d) {
        return d.radius * 1.8;
      })
      .style("fill", function(d, i) {
        return "url(#skill" + i + ")";
      });

    svg
      .selectAll("circle")
      .data(nodes.slice(1))
      .enter()
      .append("circle")
      .attr("class", "ball")
      .attr("r", function(d) {
        return d.radius;
      })
      .style("fill", "#000")
      .style("fill", function(d, i) {
        return "url(#skill" + i + ")";
      });

    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;
      while (++i < n) q.visit(collide(nodes[i]));
      svg.selectAll("circle").attr("transform", function(d) {
        return "translate(" + d.x + " ," + d.y + ")";
      });
    });
    svg.on("mousemove", function() {
      var p1 = d3.mouse(this);
      root.px = p1[0];
      root.py = p1[1];
      force.resume();
    });
    function collide(node) {
      var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && quad.point !== node) {
          var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * 0.5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }
  }
  componentWillUnmount() {
    d3.select("svg").remove();
  }

  render() {
    return (
      <div>
        <div className="renderedD3">{this.props.chart}</div>
      </div>
    );
  }
}

export default withFauxDOM(Home);
