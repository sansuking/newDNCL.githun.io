$(function(){
  var ua = navigator.userAgent.toLowerCase();

  // iPhone
  var isiPhone = (ua.indexOf('iphone') > -1);
  // iPad
  var isiPad = (ua.indexOf('ipad') > -1);
  //iPod
  var isiPod = (ua.indexOf('ipod') > -1);
  // Android
  var isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1);
  // Android Tablet
  var isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1);

  if(isiPhone || isiPad || isiPod || isAndroidTablet){
		$("#editor").remove()
    editor=new textarea($("<textarea>").appendTo($(".editor_div")));
    return;
  }

  //$("<div id=\"editor\" class=\"editor\" style=\"z-index:0;\"></div>").appendTo($("body"));
  editor=ace.edit("editor");
  editor.setFontSize(16);
  editor.getSession().setMode("ace/mode/javascript");
  editor.getSession().setOption("useWorker", false);
  editor.getSession().setUseWrapMode(true);
  editor.commands.addCommand({
    name:"fontSizeUp",
    bindKey:{
      win:"Ctrl-UP",
      mac:"Command-UP",
    },
    exec:function(editor){
      editor.setFontSize(editor.getFontSize()+1);
    }
  });
  editor.commands.addCommand({
    name:"fontSizeDown",
    bindKey:{
      win:"Ctrl-DOWN",
      mac:"Command-DOWN",
    },
    exec:function(editor){
			var font_size=editor.getFontSize()-1;
			if(font_size>10)editor.setFontSize(editor.getFontSize()-1);
    }
  });
  /*editor.commands.addCommand({
    name:"paste",
    bindKey:{
      win:"Ctrl-V",
      mac:"Command-V",
    },
    exec:function(editor){
      editor.focus();
    }
  });*/
});

var textarea=function(p){
	this.ta=p;
  this.ta.addClass("editor");
  this.ta.css("resize","none");
  this.getValue=function(){
    return this.ta.val();
  };
  this.setFontSize=function(){};
  this.setValue=function(str){
    this.ta.val(str?str:"");
  };
};
