window.dncl_format=function () {
	var parser={};
	var sp=Parser.StringParser; // 文字列を解析するパーサ
	var ctx;
	function ent(entf, parser) {
				if (typeof parser == "function") {
				 var res;
				 ctx.enter(entf(), function () {
						 res=parser();
				 });
				 return res;
				}
			return Parser.create(function (st) {
					var res;
					ctx.enter(entf(), function () {
							res=parser.parse(st);
					});
					return res;
			});
	}
	function lit(s) {
			return '"'+s+'"';
	}
	//    ↓ 空白またはコメントを解析するパーサ
	var space=sp.reg(/^(\s*(\/\*([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/[^\r\n]*\r?\n)*)*/);/*.ret(function (a) {
			//console.log("READ space ! ",a.pos,a.len, a.src.str.substring( a.pos));
			 //   console.log("READ space ! ",a.pos,a.len, a.src.str.substring( a.pos, a.pos+a.len ));
			return a;
	});*/
	// トークナイザ： 空白またはコメントを読み飛ばし，次に rで指定されたトークンがあれば解析が成功．
	function token(r) {
		var str;
		if (typeof r=="string") {
			str=sp.str(r);     // 固定文字列トークンを解析するパーサ
		} else {
			str=sp.reg(r);     // 正規表現トークンを解析するパーサ
		}
		//    ↓ 空白またはコメントにつづいてstr  がきたら
		return space.and(str).ret(function(a, b) {
				// a=空白またはコメント   b=読み込んだトークン
			// テキストと位置情報をつけて返す．
					//console.log("READ ! ",b.pos,b.len, b.src.str.substring( b.pos, b.pos+b.len ));
			return {pos:b.pos,
					text: b.src.str.substring( b.pos, b.pos+b.len ) ,
					toString: function (){
						//return this.text+"("+this.pos+")";
						return this.text;
					}
			}
		});
	}

	var indent="";
	var levelup=function(parts){indent+="\t";return parts;};
	var leveldown=function(parts){indent=indent.slice(1);return parts;};


	var reserved=/^(?:もし|ならば|を実行し|を実行する|そうでなければ|そうでなく|そうでなくもし|の間|を繰り返す|と|改行を表示する|と改行|と改行と|と改行を表示する|改行|を表示する|表示する|改行なしで|を改行なしで|を改行なしで表示する|改行なしで表示する|を|から|まで|ずつ|増やしながら|減らしながら|ずつ増やしながら|ずつ減らしながら|を繰り返す|増やす|減らす|のすべての値を|すべての値を|すべての値|にする|繰り返し|になるまで実行する|は|性能を|性能を確認する|の|の性能を|の性能を確認する|確認する|とは|である|ここから|回|を返す|返す|print|println|if|while|else|elseif|function|return|allinit|profile)$/;
	
	var reg_string = /^[a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF][a-zａ-ｚA-ZＡ-Ｚ_＿\\$＄\\?？0-9０-９ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]*/;
	var trim_name=function(name){
		return toHalfWidth(name);
	};
	function toHalfWidth(strVal){
		// 半角変換
			var halfVal = strVal.replace(/[！-～]/g,
					function( tmpStr ) {
						// 文字コードをシフト
						return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
					}
			);
				// 文字コードシフトで対応できない文字の変換
			return halfVal.replace(/”/g, "\"")
					.replace(/’/g, "'")
					.replace(/‘/g, "`")
					.replace(/￥/g, "\\")
					.replace(/　/g, " ")
					.replace(/〜/g, "~");
	}

	// \lazies
	var term,program,expression,statement;
	var term_lazy = Parser.lazy(function(){return term;});
	var program_lazy = Parser.lazy(function(){return program;});
	var expression_lazy = Parser.lazy(function(){return expression;});
	var statement_lazy = Parser.lazy(function(){return statement;});

	var lsb=token(/^[\[]/).ret(function(){return "[";});
	var rsb=token(/^[\]]/).ret(function(){return "]";});
	var lp=token(/^[(（]/).ret(function(){return "(";});
	var rp=token(/^[)）]/).ret(function(){return ")";});
	var lcb=token(/^[｛{]/).ret(function(){return "{"});
	var rcb=token(/^[｝}]/).ret(function(){return "}"});
	var add=token(/^[+＋]/).ret(function(){return "+";});
	var sub=token(/^[-−–－]/).ret(function(){return "-";});
	var mul=token(/^[*×＊∗]/).ret(function(){return "*";});
	var div_float=token(/^[/／]/).ret(function(){return "/";});
	var div_int=token(/^÷/).ret(function(){return "÷";});
	var gt=token(/^[>＞]/).ret(function(){return ">";});
	var ge=token(/^(?:[>＞][=＝])|^≧/).ret(function(){return "≧";});
	var lt=token(/^[<＜]/).ret(function(){return "<";});
	var le=token(/^(?:[<＜][=＝])|^≦/).ret(function(){return "≦";});
	var eq=token(/^[=＝][=＝]?/).ret(function(){return "=";});
	var neg=token(/^(?:[\!！][=＝])|^≠/).ret(function(){return "≠";});
	var mod=token(/^[%％]/).ret(function(){return "%";});
	var larrow=token(/^[←]/).ret(function(){return "←";});
	var and=token(/^かつ/).ret(function(){return "かつ";});
	var or=token(/^または/).ret(function(){return "または";});
	var not=token(/^でない/).ret(function(){return "でない";});
	var comma=token(/^[\,，、､]/).ret(function(){return ",";});

	//修飾してない生の変数名
	var raw_name = token(/^[a-zA-Zａ-ｚＡ-Ｚ][a-zA-Zａ-ｚＡ-Ｚ_＿0-9０-９]*/).ret(function(_name){
		return trim_name(_name.text);
	});
	var name = token(/^[a-zA-Zａ-ｚＡ-Ｚ][a-zA-Zａ-ｚＡ-Ｚ_＿0-9０-９]*/).ret(function(_name){
		return {
			'name':trim_name(_name.text),
			'toString':(function(){
				return trim_name(_name.text);
			})
		}
	});
	var name_2byte = token(reg_string).except(function(str){return (""+str).search(reserved)===0}).ret(function(_name){
			return trim_name(_name.text);
	});
	var reg_str = RegExp("^[\"\”\“「｢][^\"\“\”\」｣]*[\"\”\“」｣]");
	var str = token(reg_str).ret(function(_str){
			var content=_str.text.substring(1,_str.text.length-1);
			return '"'+content+'"';
	});
	var reg_num = /^\-?[0-9０-９]+([.．]([0-9０-９])+)?/;
	var num = token(reg_num).ret(function(_num){
		var v=(_num+"").replace(/[０-９]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		}).replace(/．/,".").replace(/[ｘＸａ-ｆＡ-Ｆ]/g,function(s){
			return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
		});
		v=parseFloat(v);
		return v;
	});

	var arr=lcb.and(term_lazy.sep0(comma,true).ret(function(elems){
		return elems.join(",");
	})).and(rcb).ret(function(_lcb,elems){
		return "{"+elems+"}";
	});

	//--------------ここから構文
	var array_index=lsb.and(expression_lazy.sep1(comma,true)).and(rsb).ret(function(lsb,indexs){
		return '['+indexs.join(",")+']';
	});
	var arr_ref=raw_name.and(array_index).ret(function(_name,indexs){
		return _name+indexs;
	});
	
	var paren_expression = lp.and(expression_lazy.opt()).and(rp).ret(function(_lp,_expr,_rp){
		return "("+(_expr?_expr:"")+")"
	});
	var unary_term = add.or(sub).and(term_lazy).ret(function(_sign,_term){
		return _sign+_term;
	});
	
	var variable=arr_ref.or(name).ret(function(_var){return _var;});
	var factor=paren_expression.or(num).or(str).or(arr_ref.ret(function(e){
			return e;
	})).or(name).or(name_2byte).or(arr);//.or(unary_term);

	var infix_expr_build = ExpressionParser();
	infix_expr_build.element(term_lazy);
	infix_expr_build.infixl(3,add);
	infix_expr_build.infixl(3,sub);
	infix_expr_build.infixl(4,div_float);
	infix_expr_build.infixl(4,div_int);
	infix_expr_build.infixl(4,mul);
	infix_expr_build.infixl(4,mod);
	infix_expr_build.mkInfixl(infix_mk);
	function infix_mk(left,op,right){	
		return left+op+right;
	}
	var infix_expr = infix_expr_build.build();

	var conditional_expr_build = ExpressionParser();
	conditional_expr_build.element(infix_expr);
	conditional_expr_build.infixl(2,eq);
	conditional_expr_build.infixl(2,neg);
	conditional_expr_build.infixl(2,le);
	conditional_expr_build.infixl(2,ge);
	conditional_expr_build.infixl(2,lt);
	conditional_expr_build.infixl(2,gt);
	conditional_expr_build.mkInfixl(conditional_mk);
	function conditional_mk(left,op,right){
		return left+op+right;
	}
	var conditional_expr = conditional_expr_build.build();

	var logical_expr_build = ExpressionParser();
	logical_expr_build.element(conditional_expr);
	logical_expr_build.infixl(1,and);
	logical_expr_build.infixl(1,or);
	logical_expr_build.postfix(0,not);
	logical_expr_build.mkInfixl(logical_mk);
	logical_expr_build.mkPostfix(logical_mkpost);
	function logical_mk(left,op,right){
			return left+op+right;
	}
	function logical_mkpost(left,op){
		return left+op;
	}
	var logical_expr = logical_expr_build.build();

	var expression = logical_expr;


	var func_call_param = lp.and(expression_lazy.sep0(comma,true)).and(rp).ret(function(_lp,_params){
		return (_params)?_params:[];
	});
	var func_call = name_2byte.and(func_call_param).ret(function(_callee,_params){
		return _callee+'('+_params.join(",")+')';
	});

	term = func_call.or(factor);

	var func_param=lp.and(raw_name.sep0(comma,true)).and(rp).ret(function(_lp,_params){
		return (_params)?_params:[];
	});
	var func1=name_2byte.and(func_param).and(token(/^は/).ret(levelup)).and(program_lazy).and(token(/^を実行する/).ret(leveldown)).ret(
		function(_name,_params,_lcb,_prog){
			return _name+"("+_params.join(",")+")は\n"+_prog+"\n"+indent+"を実行する";
		}
	);
	var func2=name_2byte.and(func_param).and(token(/^とは/).ret(levelup)).and(program_lazy).and(token(/^である/).ret(leveldown)).ret(
		function(_name,_params,_lcb,_prog){
			return _name+"("+_params.join(",")+")とは\n"+_prog+"\n"+indent+"である";
		}
	);

	var func=func1.or(func2);

	// var disp_state = expression.sep0(token(/^と/),true).and(token(/^を表示する/)).ret(function(_params){
	//	return 'this["dncl_disp"]('+_params.join(",")+");"
	// });
	// (<expr>|"改行" [{"と" (<expr>|"改行")}] "を" ["改行なしで"] "表示する"
	var nl=token(/^改行/).ret(function(){return '改行';});
	var disp_state = nl.or(expression).ret(function(_expr){
		return _expr;
	}).sep0(token(/^と/),true).ret(function(_params){
		return _params.join("と");
	}).and(token(/^を/)).and(token(/^改行なしで/).ret(function(){
		return true;
	}).opt()).and(token(/^表示する/)).ret(function(_params,_wo,_noNewLineFlag){
		return _params+"を "+((_noNewLineFlag)?"改行なしで":"")+"表示する";
	});
	var if_state_1liner=token(/^もし/).and(expression).and(token(/^ならば/)).and(statement_lazy).ret(function(_if,_expr,_then,_state){
		return 'もし '+_expr+" ならば "+_state;
	});
	var if_then=token(/^もし/).and(expression).and(token(/^ならば/).ret(levelup)).and(program_lazy).ret(function(_if,_expr,_then,_program){
		leveldown();
		return 'もし '+_expr+" ならば\n"+_program+"\n";
	});
	var else_if=token(/^を実行し/).and(comma).and(token(/^そうでなく/)).and(if_then).ret(function(_exe,_comma,_else,_elseif){
		return indent+"を実行し、そうでなく "+_elseif;
	});
	var _else=token(/^を実行し/).and(comma).and(token(/^そうでなければ/).ret(levelup)).and(program_lazy).ret(function(_exe,_comma,_else,_program){
		leveldown();
		return indent+"を実行し、そうでなければ\n"+_program+"\n";
	});
	var if_state=if_then.and(else_if.or(_else).rep0()).and(token(/^を実行する/)).ret(function(_if,_else_elseif){
		return _if+_else_elseif.join("")+indent+"を実行する";
	});
	var while_state=expression.and(token(/^の間/)).and(comma.ret(levelup)).and(program_lazy).and(token(/^を繰り返す/).ret(leveldown)).ret(function(_expr,_while,_comma,_program){
		return _expr+"の間、\n"+_program+"\n"+indent+"を繰り返す";
	});
	var repeat_inc=token(/^増やしながら/).ret(function(){return "+";});
	var repeat_dec=token(/^減らしながら/).ret(function(){return "-";});
	var repeat_state1=variable.and(token(/^を/)).and(expression).and(token(/^から/)).and(expression).and(token(/^まで/)).and(expression).and(token(/^ずつ/)).and(repeat_inc.or(repeat_dec)).and(comma.ret(levelup)).and(program_lazy).and(token(/^を繰り返す/).ret(leveldown)).ret(function(_var,_1,_init,_2,_end,_3,_step,_4,_sign,_5,_program){
		var part1=_var;
		var part2=_init;
		var part3=_end;
		var part4=_step+((_sign==="-")?"ずつ減らしながら":"ずつ増やしながら");
		return part1+'を'+part2+'から'+part3+"まで"+part4+"、\n"+_program+"\n"+indent+"を繰り返す"
	});
	var repeat_state2=token(/^ここから/).and(expression).and(token(/^回/)).and(comma.ret(levelup)).and(program_lazy).and(token(/^を繰り返す/).ret(leveldown)).ret(function(_1,_num,_3,_4,_program){
		return 'ここから'+_num+"回、\n"+_program+"\n"+indent+"を繰り返す";
	})

	var repeat_state=repeat_state1.or(repeat_state2);

	var arr_init=variable.and(token(/^の/)).and(token(/^すべての値を/)).and(expression).and(token(/^にする/)).ret(function(_var,_no,_all,_val){
		return _var+"のすべての値を"+_val+"にする";
	});

	var return_state=expression.and(token(/^を/)).and(token(/^返す/)).ret(function(_expr){
		return _expr+"を返す";
	});

	var performance_test=func_call.and(token(/^の/)).opt().and(token(/^性能を/)).and(token(/^確認する/)).ret(function(_call){
		return ((_call)?_call+"の":"")+"性能を確認する";
	});

	var assign=variable.and(larrow).ret(function(_var){
		return _var+"←";
	}).opt().and(expression).ret(function(_left,_right){
		return ((_left!=undefined)?_left:"")+_right;
	});
	var assigns=assign.sep1(comma,true).ret(function(_assigns){ return _assigns.join(",");});
	var inc=variable.and(token(/^を/)).and(expression).and(token(/^増やす/)).ret(function(_var,_1,_expr){
		return _var+" を "+_expr+" 増やす";
	});
	var dec=variable.and(token(/^を/)).and(expression).and(token(/^減らす/)).ret(function(_var,_1,_expr){
		return _var+" を "+_expr+" 減らす";
	});

	var control_state=if_state.or(if_state_1liner).or(while_state).or(repeat_state);
	statement=performance_test.or(func).or(control_state).or(arr_init).or(disp_state).or(inc).or(dec).or(return_state).or(assigns).ret(function(statement){return indent+statement;});
	statements=statement.rep1().ret(function(stmts){return stmts.join("\n");});

	program = statements.and(space.opt());

	/*
	パーサに適用できるメソッド（いずれも新しいパーサを生成して返す）：
	メソッド                         新しく生成されるパーサの動作
	parser.and(parser2)       parser を解析し，続けて parser2 を解析する
	parser.ret(func)          parser の解析結果をfuncの第1引数に渡して，func を実行する．
	parser が複数のand でつながれている場合は， func は同じ数の引数をとる
	parser.or(parser2)        parser を解析し，解析に失敗したときは parser2 を解析する
	parser.opt()              parser を解析し，失敗した場合は何もせずに解析に成功する．  parser自身の解析が失敗した場合の解析結果はnull
	parser.rep0()             parser を0回以上繰り返し解析する．  解析結果は， parserの各回の解析結果の配列
	parser.rep1()             parser を1回以上繰り返し解析する．  解析結果は， parserの各回の解析結果の配列
	parser.sep1(sep, true)     parser を繰り返し解析するが，それぞれの繰り返しの間に sep を解析する． カンマ区切りの解析などに使う．
	第2引数が true の 場合，  解析結果は 各parserの解析結果の配列になる
	第2引数が false の 場合，  {head: parser(1回目) , [ {sep: sep(n回目), value: parser(n+1回目) } ] }
	*/
	function tap(x) {
			console.log("tap",typeof x,x);
			return x;
	}
	function joinary(a,s) {
			if (a.length<2) return a;
			//if (a.length>=2) console.log("JO",a);
			//a=a.slice();
			a.joined=s;
			return a;
	}
	parser.parseAsNode=function (str,options) {
			options=options||{};
			var de=options.src?options.src+"で":"";
		var input=str+"\n";
		var output="";
		var line=1;
		ctx=context();
			//console.log("INP",input,input.length);
		var result = program.parseStr(input);
		if(result.success){
			output=result.result[0];
			if(result.src.maxPos<str.length){
				var line=(str.substr(0,result.src.maxPos)).match(/\n/g);
				line=(line)?line.length:0;
				//alert("エラーが発生しました。\n"+line+"行目付近を確認してください。");
				var mesg=de+"エラーが発生しました。\n"+(line+1)+"行目付近を確認してください。";
				if (options.throwCompileErrorOnRuntime) {
						return extend([
						"throw new Error('"+mesg.replace(/\n/g,"\\n")+"');"
						],{type:"ERROR",message:mesg});
				} else {
						throw new Error(mesg);
				}
			}
		}
				return output;
		};
	parser.parse=function (str,options) {
		indent="";
		var output=parser.parseAsNode(str,options);
		output=parser.node2js(output,options);
		return output;
	};
	parser.node2js=function (p,options) {
		options=options||{};
			var buf=options.indentBuffer || {
					buf:"",
					print:function (s) {
							this.buf+=s;
					},
					addMapping:function (){}
			};
			var gen=function(e){
				if (e && typeof e.pos=="number") {
						//console.log(e.pos);
						buf.addMapping(e);
				}
				if(typeof e=="function") return gen(e());
				else if(Array.isArray(e)) {
						var f=0;
						e.forEach(function (el) {
								if (f++) buf.print(e.joined||"");
								gen(el);
						});
				} else {
						buf.print(e==null ? "" : e);
				}
			};
			gen(p);
			//console.log("dtlgen",p,result);
			return buf.buf;
		};
	return parser;
}();
