var isContain,isContainInEn,isContainInJa,ja2en,en2ja;

(function(){
	var all_en="/"+(alias_list.map(function(obj){
		return obj["en"].join("/");
	}).join("/"))+"/";
	var all_ja="/"+(alias_list.map(function(obj){
		return obj["ja"].join("/");
	}).join("/"))+"/";
	var searchInJa=function(name){
		return alias_list.filter(function(obj){
			return null!=(("/"+obj["ja"].join("/")+"/").match("/"+name+"/"));
		})[0];
	};
	var searchInEn=function(name){
		return alias_list.filter(function(obj){
			return null!=(("/"+obj["en"].join("/")+"/").match("/"+name+"/"));
		})[0];
	};
	isContainInEn=function(name){return null!=all_en.match("/"+name+"/");};
	isContainInJa=function(name){return null!=all_ja.match("/"+name+"/");};

	ja2en=function(name){
		var obj=searchInJa(name);
		return obj["en"][0];
	};
	en2ja=function(name){
		var obj=searchInEn(name);
		return obj["ja"][0];
	};
})();
