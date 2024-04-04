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


window.fileSaveBrowser=function(code){
	var ext=(localStorage.getItem("dncl/mode")=="en")?".dnc":".dncl";
	var filename=inputFileName("ファイル名を入力してください",ext);
	if(filename=="cansel")return;

	var blob=new Blob([code],{type:"text/plain"});
	var url=URL.createObjectURL(blob);

	var a=document.createElement('a');
	a.href=url;
	a.target="_blank";
	a.download=filename;
	a.click();
};
