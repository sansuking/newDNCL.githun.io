$(function(){
	var select=$("#samples");
	select.change(function(){
		var val=$('option:selected').val();
		editor.setValue(val);
		toDNCL();
	});

	var makeGroup=function(groupName,list){
		var group=$("<optgroup>").attr("label",groupName);
		list.map(function(key){
			var opt=$("<option>").text(key);
			opt.val(window.samples[key]);
			opt.appendTo(group);
		});
		group.appendTo(select);
	};
	makeGroup("ソートアルゴリズム",["選択ソート","挿入ソート","バブルソート","クイックソート"]);
	makeGroup("探索アルゴリズム",["線形探索","二分探索"]);
	makeGroup("センター試験過去問題",[
			"2018年度 第3問 問2","2018年度 第3問 問3",
			"2017年度 第3問 問2","2017年度 第3問 問3",
			"2016年度 第3問 問2","2016年度 第3問 問3",
			"2015年度 第3問 問2","2015年度 第3問 問3",
			"2014年度 第3問 問2","2014年度 第3問 問3",
			"2013年度 第3問 問2","2013年度 第3問 問3",
			"2012年度 第3問 問2","2012年度 第3問 問3",
			"2011年度 第3問 問1","2011年度 第3問 問2","2011年度 第3問 問3",
			"2010年度 第3問 問2","2010年度 第3問 問3",
			"2009年度 第3問 問2","2009年度 第3問 問3",
			"2008年度 第3問 問2","2008年度 第3問 問3"
		]
	);
});
