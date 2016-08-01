/**************程序信息*****************
  SimpleWebGL.1.0      作者：次碳酸钴
  有问题请提交至 admin@web-tinker.com
****************************************/

var SimpleWebGL=(function(canvas){
  /*私有成员*/
  var Interface,G,P;
  var vertexShader,fragmentShader,
      depthTest,blend,pixelStore;

  var Shader=function(type){
    var source;
    return {
      shader:G.createShader(type),set source(e){
        G.shaderSource(this.shader,source=e);
        G.compileShader(this.shader);
        var msg=G.getShaderInfoLog(this.shader);
        if(msg)console.log(msg);
      },get source(){return source},
      destroy:function(){G.deleteShader(this.shader)}
    };
  },



  Buffer=function(type,dataType){
    var data;
    return {
      buffer:G.createBuffer(type),set data(e){
        this.bind();
        G.bufferData(type,new dataType(data=e),G.STATIC_DRAW);
      },get data(){return data},
      bind:function(){G.bindBuffer(type,this.buffer)},
      destroy:function(){G.deleteBuffer(this.buffer)}
    };
  };


  /*构造函数*/
  Interface=function(canvas){
    var i,that=this;
    G=canvas.getContext("experimental-webgl");
    P=G.createProgram();
    this.webgl=G,this.program=P;
    for(i in G)if(/^[A-Z_\d]+$/.test(i))this[i]=G[i];
    this.NULL=0;
    this.texture=[];
    for(i=0;i<19;i++)(function(i){
      var texture;
      that.texture.__defineSetter__(i,function(e){
        texture=e;
        G.activeTexture(G["TEXTURE"+i]);
        G.bindTexture(G.TEXTURE_2D,e?e.texture:null);
      });
      that.texture.__defineGetter__(i,function(e){
        return texture;
      });
    })(i);
  };



  /*公有成员*/
  Interface.prototype={
    set vertexShader(e){
      vertexShader=e,this.isReady=false;
      G.attachShader(P,vertexShader.shader);
    },
    get vertexShader(){return vertexShader},


    set fragmentShader(e){
      fragmentShader=e,this.isReady=false;
      G.attachShader(P,fragmentShader.shader);
    },
    get fragmentShader(){return fragmentShader},

    isReady:false,
    ready:function(){
      if(!this.isReady){
        G.linkProgram(P);
        if(!G.getProgramParameter(P,G.LINK_STATUS))
          return console.log(G.getProgramInfoLog(P));
        this.isReady=true;
        G.useProgram(P);
        var that=this;
        this.attribute={},this.uniform={};
        (this.vertexShader.source+this.fragmentShader.source)
        .replace(
          /\b(attribute|uniform)\b[^;]+?(\w+)\s+(\w+)\s*;/g,
          function($0,$1,$2,$3){
            var data,location,size;
            size=$2.match(/\d+$|$/g,"")[0]|0||1;
            if($1=="attribute"){
              location=G.getAttribLocation(P,$3);
              G.enableVertexAttribArray(location);
              that.attribute.__defineSetter__($3,function(e){
                data=e;
                G.vertexAttribPointer(location,size,G.FLOAT,false,0,0);
              });
              that.attribute.__defineGetter__($3,function(e){
                return data;
              });
            }else{
              location=G.getUniformLocation(P,$3);
              var type=/int|sampler|float/.test($2)?"i":"f";
              that.uniform.__defineSetter__($3,
                /^mat/.test($2)?function(e){
                  G["uniformMatrix"+size+"fv"](location,false,data=e);
                }:function(e){
                  if(!((data=e) instanceof Array))e=[e];
                  G["uniform"+size+type+"v"](location,e);
                }
              );
              that.uniform.__defineGetter__($3,function(e){
                return data;
              });
            };
          }
        );
      }else G.useProgram(P);
    },

    drawElements:function(type,element){
      if(!element)element=type,type=G.TRIANGLES;
      element.bind();
      G.drawElements(type,element.data.length,G.UNSIGNED_SHORT,0);
    },

    drawArrays:function(type,count){
      if(!count)count=type,type=G.TRIANGLES;
      G.drawArrays(type,0,count);
    },

    set depthTest(e){
      if((depthTest=e)!==null){
        G.enable(G.DEPTH_TEST);
        G.depthFunc(e);
      }else G.disable(G.DEPTH_TEST);
    },

    get depthTest(){return depthTest},

    set blend(e){
      if((blend=e)!==null){
        G.enable(G.BLEND);
        G.blendFunc.apply(G,e);
      }else G.disable(G.DEPTH_TEST);
    },
    get blend(){return blend},

    destroy:function(e){
      if(e){
        for(i in this.attribute)this.attribute[i]=null;
        vertexShader.destroy();
        fragmentShader.destroy();
      };
      G.deleteProgram(P);
    },

    VertexShader:function(e){
      var shader=new Shader(G.VERTEX_SHADER);
      if(e)shader.source=e;
      return shader;
    },

    FragmentShader:function(e){
      var shader=new Shader(G.FRAGMENT_SHADER);
      if(e)shader.source=e;
      return shader;
    },

    ArrayBuffer:function(e){
      var buffer=new Buffer(G.ARRAY_BUFFER,Float32Array);
      if(e)buffer.data=e;
      return buffer;
    },

    ElementArrayBuffer:function(e){
      var buffer=new Buffer(G.ELEMENT_ARRAY_BUFFER,Uint16Array);
      if(e)buffer.data=e;
      return buffer;
    },

    Texture:function(data,w,h){
      var texture={
        set magFilter(e){
          G.texParameteri(G.TEXTURE_2D,G.TEXTURE_MAG_FILTER,e);
        },get magFilter(){return magFilter},
        set minFilter(e){
          G.texParameteri(G.TEXTURE_2D,G.TEXTURE_MIN_FILTER,e);
        },get minFilter(){return minFilter},
        destroy:function(){G.deleteTexture(texture)},
        generateMipmap:function(){G.generateMipmap(G.TEXTURE_2D)},
        texture:G.createTexture(G.TEXTURE_2D)
      };
      
      G.activeTexture(G.TEXTURE19);
      G.bindTexture(G.TEXTURE_2D,texture.texture);
      if(w&&h)G.texImage2D(G.TEXTURE_2D,0,G.RGBA,w,h,0,G.RGBA,G.UNSIGNED_TYPE,data);
      else G.texImage2D(G.TEXTURE_2D,0,G.RGBA,G.RGBA,G.UNSIGNED_BYTE,data);
      texture.minFilter=texture.maxFilter=G.LINEAR;
      return texture;
    }

  };


  return Interface;
})();