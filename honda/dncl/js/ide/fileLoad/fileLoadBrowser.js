window.fileLoadBrowser=function(){
	var ext;
	$("#fileloadCancelBtn").click(function(){
    $("#saveWindowBg").hide();
  });
	$("#load").click(function(){
    $("#saveWindowBg").show();
    return false;
  });

  //saveWindowの切り替え
  var loadContainer=$('#saveWindowContainer');
  $("#saveWindow").addClass("saveWindowBrowser");
  var flDiv=$('<div class="input-group fileLoadDivBrowser"></div>').addClass("form-inline");

  flDiv.append($('<input type="file" id="fileSelect" class="form-control"/ >'));
  flDiv.append($('<span class="input-group-btn"><button id="loadSelectBtn" class="btn btn-default">読み込み</button></span>'));
  loadContainer.append(flDiv);
  $("#fileSelect").change(function(e){
		ext="."+(e.target.value.split("/").pop().split(".").pop());
    window.targetFile=e.target.files[0];
  });
  $("#saveWindow").append(loadContainer);
  $("#loadSelectBtn").click(function(){
		if(window.reader==undefined){
			window.reader=new FileReader();
			window.reader.onloadend=function(res){
				var src=res.currentTarget.result;
				editor.setValue(src);
				if(ext==".dnc")toClike();
				else toDNCL();
				if(isNode){
					console.log(res.path.length);
				}
			}.bind(this);
		}
		window.reader.readAsText(window.targetFile);
		$("#fileSelect").val(null);
    $("#saveWindowBg").hide();
  }.bind(this));

  $("#saveWindowBg").click(function(){
    $("#saveWindowBg").hide();
    return false;
  });
  $("#saveWindow").click(function(){
    event.stopPropagation();
  });
};
