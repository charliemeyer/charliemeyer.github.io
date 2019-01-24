var paper_w = $("#canvas").width();
var paper_h = $("#canvas").height();
var canvas = document.getElementById("canvas");
var PAPER = Raphael(canvas, paper_w, paper_h);

var NUM_POINTS = 12;
var GRAPH_COLOR = "#000000";
var POINT_RADIUS = 6;
var EDGE_WIDTH = 2;
var CONNECTION_PROBABILITY = .08; 

var make_background = function() { render_background(paper_w, paper_h, NUM_POINTS, PAPER); }

$(document).ready(function() {
    make_background();
    $("#content").fadeIn(50);
    $("#regenerate").click(make_background);
});

function render_background(width, height, num_points, paper) {
    paper.clear();
    var graph = make_random_graph(width, height, num_points);
    draw_graph(graph, paper);
}

function make_random_graph(width, height, num_points) {
    var points = [];
    // Place points into the 4 quadrants of the paper
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            for (var k = 0; k < num_points/4; k++) {
                var min_x = (paper_w/2)*i;
                var max_x = min_x + (paper_w/2);
                var min_y = (paper_h/2)*j;
                var max_y = min_y + (paper_h/2);
                points.push(make_random_point(min_x, max_x, min_y, max_y))
            }
        }        
    }

    var edges = [];
    for (var i = 0; i < num_points; i++) {
        var my_edges = 0;
        for (var j = 0; j < num_points; j++) {
            if (i != j) {
                if (Math.random() > 1 - CONNECTION_PROBABILITY) {
                    edges.push({p1: points[i], p2: points[j]});
                    my_edges += 1;
                }
            }
        }
        // if you have no outgoing edges, connect to another point in the list
        if (my_edges == 0) {
            my_edge = Math.round(Math.random(num_points - 1));
            if (my_edge < i) {
                edges.push({p1: points[i], p2: points[my_edge]});
            } else {
                edges.push({p1: points[i], p2: points[my_edge + 1]});
            }
        }
    }
    return {points: points, edges: edges};
}

function make_random_point(min_x, max_x, min_y, max_y) {
    return {
        x: Math.round(min_x+Math.random()*(max_x-min_x)),
        y: Math.round(min_y+Math.random()*(max_y-min_y))
    }
}

function draw_graph(graph, paper) {
    nodes = graph.points;
    edges = graph.edges;

    nodes.forEach(function(node) {
        draw_point(paper, node, GRAPH_COLOR, POINT_RADIUS);
    });
    edges.forEach(function(edge) {        
        draw_path(paper, edge.p1, edge.p2, GRAPH_COLOR, EDGE_WIDTH); 
    });
}

///////////////////////
//// Raphael Utils ////
///////////////////////

function draw_point(paper, point, color, radius) {
    paper.circle(point.x, point.y, radius).attr({fill: color, stroke: "#FFFFFF"});
}

function draw_path(paper, p1, p2, color, stroke_width) {
    p = paper.path(["M", p1.x, p1.y, "L", p2.x, p2.y]);
    p.attr({stroke:color,"stroke-width":stroke_width});
    p.toBack();
}
