// HelloCanvas.js (c) 2012 matsuda
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  //Get the rendering context for WebGL
  //获取webgl的绘制上下文
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  //这一句就是上面的函数起的的作用，只不过上面的解决了兼容性，还有错误信息
  //var gl = canvas.getContext("webgl");
  
  // Set clear color 
  gl.clearColor(1.0, 1.0, 0.5, 1.0);

  // Clear <canvas>
  // 指定清除的颜色缓冲区的颜色，上面的颜色。还可以是深度缓冲区，模板缓冲区。
  gl.clear(gl.COLOR_BUFFER_BIT);
}
