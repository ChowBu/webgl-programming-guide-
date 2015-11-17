// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element获取元素
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG获取上下文
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle 设置颜色
  ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set color to blue
  ctx.fillRect(120, 10, 150, 150);        // Fill a rectangle with the color绘制矩形
}
