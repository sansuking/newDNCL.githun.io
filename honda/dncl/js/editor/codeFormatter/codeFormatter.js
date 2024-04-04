$(function(){
	window.codeFormat_clike=function(code){
		var formated=clike_format.parse(code);
		console.log(formated);
		return formated;
	};
	window.codeFormat_dncl=function(code){
		var formated=dncl_format.parse(code);
		console.log(formated);
		return formated;
	};
});
