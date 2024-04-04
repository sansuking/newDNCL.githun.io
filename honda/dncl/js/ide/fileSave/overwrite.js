if(isNode){
	$(function(){
		var _fs=require('fs');

		$("#overwrite").click(function(){
			if(window.editingPath===undefined)return;
			var code=editor.getValue();
			_fs.writeFile(window.editingPath,code,function(err){
				if(err)alert(err);
			});
		});
	});
}
