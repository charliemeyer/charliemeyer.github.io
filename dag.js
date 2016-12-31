//////////////////////////////////////////////////////////////
////////////////////// Global Resources //////////////////////
//////////////////////////////////////////////////////////////

// Set up canvas and popups
var paper_w = $("#canvas").width();
var paper_h = $("#canvas").height();
var canvas = document.getElementById("canvas");
var paper = Raphael(canvas, paper_w, paper_h);

var num_points = 10;
var points = [];

$(document).ready(function() {
    generate_background();
    $("#content").fadeIn(50);
    $("#regenerate).click(generate_background);
});

function generate_background() {
    paper.clear();
    for (var i = 0; i < num_points; i++) {
        points.push(draw_point(Math.round(Math.random()*paper_w), Math.round(Math.random()*paper_h), "#000000", 4));
    }
    for (var i = 0; i < num_points-1; i++) {
        draw_path(points[i], points[i+1], "#000000", 1);
    }
}

// Draw point on canvas at x y with given color and radius
function draw_point(x, y, color, radius) {
    var new_circ = paper.circle(x, y, radius).attr({fill: color, stroke: "#FFFFFF"});
    return new_circ;
}

function draw_path(p1, p2, color, stroke_width) {
    p = paper.path(["M", p1.attr("cx"), p1.attr("cy"), "L", p2.attr("cx"), p2.attr("cy")]);
    p.attr({stroke:color,"stroke-width":stroke_width});
    p.toBack();
    return p;
}
