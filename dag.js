//////////////////////////////////////////////////////////////
////////////////////// Global Resources //////////////////////
//////////////////////////////////////////////////////////////

// Set up canvas and popups
var paper_w = $("#canvas").width();
var paper_h = $("#canvas").height();
var canvas = document.getElementById("canvas");
var paper = Raphael(canvas, paper_w, paper_h);

var num_points = 12;
var points = [];

$(document).ready(function() {
    generate_background();
    $("#content").fadeIn(50);
    $("#regenerate").click(generate_background);
});

function generate_background() {
    var paper_w = $("#canvas").width();
    var paper_h = $("#canvas").height();
    paper.clear();
    points = [];
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            for (var k = 0; k < num_points/4; k++) {
                points.push(draw_point(Math.round((paper_w/2)*i+Math.random()*paper_w/2), Math.round((paper_h/2)*j+Math.random()*paper_h/2), "#000000", 5));
            }
        }        
    }
    outgoing_edges = [];
    for (var i = 0; i < num_points; i++) {
        outgoing_for_me = [];
        for (var j = 0; j < num_points; j++) {
            if (i != j) {
                if (Math.random() > .95) {
                    outgoing_for_me.push(j);
                    draw_path(points[i], points[j], "#000000", 1);
                }
            }
        }
        if (outgoing_for_me.length == 0) {
            my_edge = Math.round(Math.random(num_points - 1));
            if (my_edge < i) {
                draw_path(points[i], points[my_edge], "#000000", 1);
            } else {
                draw_path(points[i], points[my_edge + 1], "#000000", 1);
            }
        }
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

function dist(p1, p2) {
    return Math.round(Math.sqrt( (p1.attr("cx")-p2.attr("cx"))*(p1.attr("cx")-p2.attr("cx"))+(p1.attr("cy")-p2.attr("cy"))*(p1.attr("cy")-p2.attr("cy"))));
}