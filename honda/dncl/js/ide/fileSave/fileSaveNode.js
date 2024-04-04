var _fs;

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

window.fileSaveNode=function(code){
	_fs=_fs||require('fs');
	var ext=(localStorage.getItem("dncl/mode")=="en")?".dnc":".dncl";
	var filename=inputFileName("ファイル名を入力してください",ext);
	if(filename=="cansel")return;

	var input=$('<input type="file" nwdirectory>');
	input.change(function(){
		var dir=$(this)[0].value+"";
		var path=dir+"/"+filename;
		console.log(path);
		_fs.writeFile(path,code,function(err){
			if(err)alert(err);
		});
		input.remove();
		window.editingPath=path;
		$("#overwrite").show();
	});
	input.click();
};
