$(function(){
	if(isNode)window.fileSave=fileSaveNode;
	else if(isBrowser)window.fileSave=fileSaveBrowser;
})
