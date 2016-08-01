// cuon-utils.js (c) 2012 kanda and matsuda
/*
 *这里对整个库描述一下整个webgl绘制部分的函数
 *
 * 整个过程分为3大部分，细分为7小部分，详细见图 webgl-programming-guide-\lib\webgl-utils.png
 *
 * 
 
1.着色器程序的源码
vs_s="attribute vec4 p;void main(){gl_Position=p;}";
fs_s="void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}";

2.创建顶点着色器和片段着色器
vs=webgl.createShader(webgl.VERTEX_SHADER);
fs=webgl.createShader(webgl.FRAGMENT_SHADER);

3.把源码添加进着色器,        将上面创建的着色器源码 vs_s，fs_s 放到着色器里面 vs fs里面
webgl.shaderSource(vs,vs_s);
webgl.shaderSource(fs,fs_s);


4.编译着色器                 编译之前的vs和fs着色器
webgl.compileShader(vs);
webgl.compileShader(fs);

5.创建程序对象                创建一个程序对象用来容纳片段着色器和顶点着色器
webgl.createProgram()

6.把着色器添加到程序中        将编译好的着色器文件放到js程序中
webgl.attachShader(program,vs);
webgl.attachShader(program,fs);

7.把这两个着色器程序链接成一个完整的程序    将之前的vs 和fs链接成到一起
webgl.linkProgram(program);

 * 
 */
/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current 
 */
function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
  // Create shader object
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * 这里的过程就是2,3,4步
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
  // Create shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/** 
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
function getWebGLContext(canvas, opt_debug) {
  // Get the rendering context for WebGL
  // 
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    //webgl-debug.js 文件只是在这里使用
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }

  return gl;
}
