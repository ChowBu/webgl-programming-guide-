// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvasele> element获取元素
  var canvasele = document.getElementById('example');  
  if (!canvasele) { 
    console.log('Failed to retrieve the <canvasele> element');
    return false; 
  } 

  // Get the rendering context for 2DCG获取上下文
  var ctx = canvasele.getContext('2d');

  // Draw a blue rectangle 设置颜色
  ctx.fillStyle = 'rgba(0, 225, 255, 1.0)'; // Set color to blue
  ctx.fillRect(120, 10, 150, 150);        // Fill a rectangle with the color绘制矩形
}
