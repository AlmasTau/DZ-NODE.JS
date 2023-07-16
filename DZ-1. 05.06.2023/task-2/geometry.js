function calculateTrianglePerimeter(a, b, c) {
    return a + b + c;
  }
  
  function calculateTriangleArea(base, height) {
    return (base * height) / 2;
  }
  
  function calculateCirclePerimeter(radius) {
    return 2 * Math.PI * radius;
  }
  
  function calculateCircleArea(radius) {
    return Math.PI * radius * radius;
  }
  
  function calculateTrapezoidPerimeter(a, b, c, d) {
    return a + b + c + d;
  }
  
  function calculateTrapezoidArea(base1, base2, height) {
    return ((base1 + base2) * height) / 2;
  }
  
  const geometry = {
    calculateTrianglePerimeter,
    calculateTriangleArea,
    calculateCirclePerimeter,
    calculateCircleArea,
    calculateTrapezoidPerimeter,
    calculateTrapezoidArea,
  };
  
  export default geometry;
  