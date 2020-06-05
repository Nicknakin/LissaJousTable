/*jshint esversion: 6 */

let dim;
let angle = 0;
let rad;
let points;

function setup(){
    createCanvas(floor(window.innerWidth), floor(window.innerHeight));
    background(0);  
    stroke(255);

    dim = 10;
    rad = (height/dim < width/dim)? height/dim: width/dim;
    points = new Array(dim);
    for(let y = 0; y < dim; y++){
        points[y] = new Array(dim);
        for(let x = 0; x < dim; x++){
            points[y][x] = {center:createVector((x+0.5)*width/dim, (y+0.5)*height/dim), point:pointFromCenterAndAngle(createVector((x+0.5)*width/dim, (y+0.5)*height/dim), angle, rad)};
        }
    }
}

function draw(){
    background(0, 0, 0, 1);
    drawGrid();
    for(let i = 0; i < dim; i++){
        points[i][0].point = pointFromCenterAndAngle(points[i][0].center, radians(angle*i), rad/2);
        points[0][i].point = pointFromCenterAndAngle(points[0][i].center, radians(angle*i), rad/2);
    }

    for(let y = 1; y < dim; y++){
        for(let x = 1; x < dim; x++){
            points[y][x].point = createVector(points[0][x].point.x, points[y][0].point.y);
        }
    }

    points.forEach((row, y) => row.forEach((Point, x) => {
        if(!(x == 0 && y == 0)) point(Point.point.x, Point.point.y);
    }));
    
    angle += 1;
}

function drawGrid(){
    for(let i = 0; i < dim; i++){
        line(i*width/dim, 0, i*width/dim, height);
        line(0, i*height/dim, width, i*height/dim);
    }
}

function pointFromCenterAndAngle(center, angle, radius){
    radius = radius * 0.8;
    return createVector(center.x + radius*cos(angle), center.y + radius*sin(angle));
}