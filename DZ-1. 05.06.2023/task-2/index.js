import * as formulas from "./geometry";

const log = console.log;

let a = 5;
let b = 4;
let c = 6;
let trianglePerimeter = formulas.calculateTrianglePerimeter(a, b, c);
let triangleArea = formulas.calculateTriangleArea(b, 3);

log("Периметр треугольника:", trianglePerimeter);
log("Площадь треугольника:", triangleArea);

let radius = 7;
let circlePerimeter = formulas.calculateCirclePerimeter(radius);
let circleArea = formulas.calculateCircleArea(radius);

log("Периметр круга:", circlePerimeter.toFixed(2));
log("Площадь круга:", circleArea.toFixed(2));

let base1 = 5;
let base2 = 7;
let height = 4;
let trapezoidPerimeter = formulas.calculateTrapezoidPerimeter(base1, base2, a, b);
let trapezoidArea = formulas.calculateTrapezoidArea(base1, base2, height);

log("Периметр трапеции:", trapezoidPerimeter);
log("Площадь трапеции:", trapezoidArea);
