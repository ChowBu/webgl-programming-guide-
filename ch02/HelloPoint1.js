// HelloPoint1.js (c) 2012 matsuda
// Vertex shader program 用来绘制图元的，点线面
var VSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the vertex coordinates of the point,
  //这里的坐标显示出webgl的坐标原点为绘制上下文的中点，注意区别canvas，浏览器，以及webgl的坐标区别
  '  gl_PointSize = 10.0;\n' +                    // Set the point size
  '}\n';

// Fragment shader program 这里是来给点线面赋予颜色的
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color rgba格式的颜色
  '}\n';
//以上是着色器的代码，




function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }


  // Initialize shaders  这里是绘制的着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;  
  }




  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  gl.drawArrays(gl.POINTS, 0, 1);
}
/**
 * 这在里我们可以把webgl绘制看成，绘制的shader源码，和shader程序
 *
 * 每次shader源码不一样，我们可以定制每次的绘制
 */
