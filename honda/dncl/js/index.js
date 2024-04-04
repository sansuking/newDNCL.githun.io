var exe_window;

$(function () {
  var save_prgrm;
	if(localStorage.getItem("dncl/mode")=="en")save_prgrm=localStorage.getItem("prgrm.dnc");
	else save_prgrm=localStorage.getItem("prgrm.dncl");
  if(save_prgrm){
    editor.setValue(save_prgrm);
  }
  setInterval(function(){
    var src=editor.getValue();
		if(localStorage.getItem("dncl/mode")=="en")localStorage.setItem("prgrm.dnc",src);
		else localStorage.setItem("prgrm.dncl",src);
  },3000);
  //プログラムの初期化
  localStorage.setItem("run.js","");
  $("#exe_window").attr("src","");
  $("#exe_window").attr("src","./run.html");
  $(window).bind("beforeunload", function() {
    // 確認メッセージに表示させたい文字列を返します。
    return "表示させたい文字列";
  });

  //文字サイズ自動調整
  var width=$(window).width();
  if(width<=500)editor.setFontSize(10.5);
  else if(width<=600)editor.setFontSize(13);
  else editor.setFontSize(16);

  $("#fontsize").click(function(){
    var size=prompt("フォントサイズ",editor.getFontSize());
		if(size)editor.setFontSize(size);
  });
	window.toClike=function(){
		$("#run").hide();
		$("#runclike").show();
		$("#clike2dncl").css("background-color","white");
		$("#dncl2clike").css("background-color","yellow");
		$("#clike2dncl").prop("disabled",false);
		$("#dncl2clike").prop("disabled",true);
		localStorage.setItem("dncl/mode","en");
	};
	window.toDNCL=function(){
		$("#run").show();
		$("#runclike").hide();
		$("#clike2dncl").css("background-color","yellow");
		$("#dncl2clike").css("background-color","white");
		$("#clike2dncl").prop("disabled",true);
		$("#dncl2clike").prop("disabled",false);
		localStorage.setItem("dncl/mode","ja");
	};

	if(localStorage.getItem("dncl/mode")=="en")toClike();
	else toDNCL();
	// if((""+editor.getValue()).match(/^\/\/ 英語表示\s*\n/))toClike();
  // var get_arr=window.location.search.substring(1).split("&");
  // var get_params={};
  // for(var i=0;i<get_arr.length;i++){
  //   get_params[get_arr[i].split("=")[0]]=get_arr[i].split("=")[1];
  // }
	if(get_params["mode"]=="devel")$(".devel").show();
  if(get_params["src"])editor.setValue(utf8_hex_string_to_string(get_params["src"]));
  $("#run").click(function(){
    var src=editor.getValue();
		// if(src.match(/^\/\/ 英語表示\s*\n/)){
		//   toClike();
		//   $("#runclike").click();
		//   return;
		// }
    console.log(js_beautify(src));
    try{
      var js=dncl2js.parse(src);
    }catch(e){
      alert(e);
      return;
    }
		fs.writeRunFile(js);
		$("#exe_window").attr("src","");
		$("#exe_window").attr("src","./run.html"+((get_params["lib"])?("?lib="+get_params["lib"]):""));
    console.log(js);
  });
	$("#runclike").click(function(){
    var src=editor.getValue();
    console.log(js_beautify(src));
    try{
			src=clike2dncl.parse(src);
      var js=dncl2js.parse(src);
    }catch(e){
      alert(e);
      return;
    }
		fs.writeRunFile(js);
		$("#exe_window").attr("src","");
		$("#exe_window").attr("src","./run.html"+((get_params["lib"])?("?lib="+get_params["lib"]):""));
    console.log(js);
  });
	$("#clike2dncl").click(function(){
    var src=editor.getValue();
    console.log(js_beautify(src));
		if(src.match(/^\s*$/)){
			toDNCL();
			return;
		};
    try{
      var dncl=clike2dncl.parse(src);
			if(dncl.length>0){
				dncl=codeFormat_dncl(dncl);
				editor.setValue(dncl);
				toDNCL();
			}
    }catch(e){
      alert(e);
      return;
    }
    console.log(dncl);
  });
	$("#dncl2clike").click(function(){
    var src=editor.getValue();
    console.log(js_beautify(src));
		if(src.match(/^\s*$/)){
			toClike();
			return;
		};
    try{
      var clike=dncl2clike.parse(src);
			if(clike.length>0){
				clike=codeFormat_clike(clike);
				editor.setValue(clike);
				toClike();
			}	
    }catch(e){
      alert(e);
      return;
    }
    console.log(clike);
  });
	if(get_params["mode"]=="devel"){
		$("#run").after($('<button id=genURL class="btn btn-default">URL生成</button>'));
		$("#genURL").click(function(){
			var src=string_to_utf8_hex_string(editor.getValue());
			console.log("http://klab.eplang.jp/honda/dncl_devel/index.html?src="+src);
		});
		// $("#run").after($('<button id=genJSFile class="btn btn-default">JSファイル生成</button>'));
		// $("#genJSFile").click(function(){
		//   var dtl=editor.getValue();
		//   var dtlNode,errFlag=false;
		//   try{
		//     dtlNode=MinimalParser.parseAsNode(dtl);
		//   }catch(e){
		//     errFlag=true;
		//     if(!confirm("プログラムに誤りがあります。\n保存しますか？"))return;
		//   }
		//   var filename=inputFileName("ファイル名を入力してください",".js");
		//   if(filename=="cansel")return;

		//   var js=MinimalParser.node2js(dtlNode);
		//   console.log(dtl);
		//   js +="\n\n";
		//   js +="/*\n";
		//   js +=dtl.replace(/\*\//g,"* /");
		//   js +="\n*/";
		//   var blob=new Blob([js],{type:"text/plain"});
		//   var url=URL.createObjectURL(blob);

		//   var a=document.createElement('a');
		//   a.href=url;
		//   a.target="_blank";
		//   a.download=filename;
		//   a.click();
		// });
	}
  $("#save").click(function(){
		var dncl=editor.getValue();
    // var dnclNode,errFlag=false;
    // try{
    //   dnclNode=dncl2js.parseAsNode(dncl);
    // }catch(e){
    //   errFlag=true;
    //   if(!confirm("プログラムに誤りがあります。\n保存しますか？"))return;
    // }

		window.fileSave(dncl);
  });
  /*$("#load").click(function(){
    $("#saveWindowBg").show();
    var filename=$("#files").val();
    if(filename=="___nofile___")return;
    var src=fs.readFile(filename);
    editor.setValue(src);
  });*/
});

var inputFileName=function(text,ext){
  var filename="ファイル名"+ext;
  filename=prompt(text,filename);
  if(filename == "" || filename == null){
    alert("キャンセルしました。");
    return "cansel";
  }
  if(filename.match(/\.[a-zA-Z0-9]+$/) == null) filename+= ext;
  return filename;
};
