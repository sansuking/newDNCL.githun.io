window.fileLoadNode=function(){
	$("#load").click(function(){
		var _fs=require('fs');
		var input=$('<input type="file" accept=".dncl,.dnc">');
		input.change(function(){
			var path=$(this)[0].value;
			input.remove();

			_fs.readFile(path,function(err,data){
				if(err){
					alert(err);
					return;
				}
				editor.setValue(data+"");
				$("#overwrite").show();
				window.editingPath=path;
				var ext="."+(path.split("/").pop().split(".").pop());
				if(ext==".dnc")toClike();
				else toDNCL();
			});
		});
		input.click();
	});

};
