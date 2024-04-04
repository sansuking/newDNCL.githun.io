var fs=new (function(){
  this.readFile=function(filename){};
  this.writeFile=function(filename,src){localStorage.setItem(filename,src);};
  this.writeRunFile=function(src){localStorage.setItem("run.js",src)};
  this.getProgDirFileListSync=function(){};
  this.progDirFileListAsync=function(func){};
  this.fileDownload=function(filename,data){
    var blob=new Blob([data],{type:"text/plain"});
    var url=URL.createObjectURL(blob);

    var a=document.createElement('a');
    a.href=url;
    a.target="_blank";
    a.download=filename;
    a.click();
  };
  return this;
});

