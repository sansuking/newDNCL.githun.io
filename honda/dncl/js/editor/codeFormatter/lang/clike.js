window.clike_format=function () {
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
	var levelup=function(){console.log("levelup");indent+="\t";return "{";};
	var leveldown=function(){indent=indent.slice(1);return "}";};

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

	var lsb=token(/^\[/).ret(function(){return "[";});
	var rsb=token(/^\]/).ret(function(){return "]";});
	var lp=token(/^\(/).ret(function(){return "(";});
	var rp=token(/^\)/).ret(function(){return ")";});
	var lcb=token(/^\{/).ret(function(){return "{"});
	var rcb=token(/^\}/).ret(function(){return "}"});
	var add=token(/^\+/).ret(function(){return "+";});
	var sub=token(/^\-/).ret(function(){return "-";});
	var mul=token(/^\*/).ret(function(){return "*";});
	var div_float=token(/^\//).ret(function(){return "/";});
	var div_int=token(/^÷/).ret(function(){return "÷";});
	var gt=token(/^>/).ret(function(){return ">";});
	var ge=token(/^>=/).ret(function(){return ">=";});
	var lt=token(/^</).ret(function(){return "<";});
	var le=token(/^<=/).ret(function(){return "<=";});
	var eq=token(/^==/).ret(function(){return "==";});
	var neg=token(/^\!=/).ret(function(){return "!=";});
	var mod=token(/^%/).ret(function(){return "%";});
	var larrow=token(/^=/).ret(function(){return "=";});
	var and=token(/^\&\&/).ret(function(){return "&&";});
	var or=token(/^\|\|/).ret(function(){return "||";});
	var not=token(/^\!/).ret(function(){return "!";});
	var comma=token(/^\,/);
	var semicolon=token(/^;/);

	var name = token(/^[a-zA-Zａ-ｚＡ-Ｚ][a-zA-Zａ-ｚＡ-Ｚ_＿0-9０-９]*/).except(function(str){
		return (""+str).search(reserved)===0;
	}).ret(function(_name){return _name;});
	var name_2byte = token(reg_string).except(function(str){
		return (""+str).search(reserved)===0;
	}).ret(function(_name){
		return _name;
	});
	var reg_str = RegExp("^\"[^\"]*\"");
	var str = token(reg_str).ret(function(_str){return _str;});
	var reg_num = /^\-?[0-9０-９]+([.．]([0-9０-９])+)?/;
	var num = token(reg_num).ret(function(_num){return _num;});

	var arr=lcb.and(term_lazy.sep0(comma,true).ret(function(elems){
		return elems.join(",");
	})).and(rcb).ret(function(_lcb,elems){
		return "{"+elems+"}";
	});

	//--------------ここから構文
	var array_index=lsb.and(expression_lazy).and(rsb).ret(function(lsb,index,rsb){return "["+index+"]";});
	var arr_ref=name.and(array_index.rep1().ret(function(indexs){
		return indexs.join("");
	})).ret(function(_name,index){
		return _name+index;
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

	var expr_build = ExpressionParser();
	expr_build.element(term_lazy);
	expr_build.infixl(3,add);
	expr_build.infixl(3,sub);
	expr_build.infixl(4,div_float);
	expr_build.infixl(4,div_int);
	expr_build.infixl(4,mul);
	expr_build.infixl(4,mod);
	expr_build.infixl(2,eq);
	expr_build.infixl(2,neg);
	expr_build.infixl(2,le);
	expr_build.infixl(2,ge);
	expr_build.infixl(2,lt);
	expr_build.infixl(2,gt);
	expr_build.infixl(1,and);
	expr_build.infixl(1,or);
	expr_build.prefix(0,not);
	expr_build.mkInfixl(mkinfix);
	expr_build.mkPostfix(mkpost);
	expr_build.mkPrefix(mkpre);
	function mkinfix(left,op,right){return left+op+right;}
	function mkpre(op,right){
		return op+right;
	}
	function mkpost(left,op){return left+op;}
	var expression = expr_build.build();

	var func_call_param = lp.and(expression_lazy.sep0(comma,true)).and(rp).ret(function(_lp,_params){
		return (_params)?_params:[];
	});
	var func_call = name_2byte.and(func_call_param).ret(function(_callee,_params){
		return _callee+"("+_params.join()+")";
	});

	term = func_call.or(factor);

	var func_param=lp.and(name.sep0(comma,true)).and(rp).ret(function(_lp,_params){
		return (_params)?_params:[];
	});
	var func=token(/^function /).and(name_2byte).and(func_param).and(lcb.ret(levelup)).and(program_lazy).and(rcb.ret(leveldown)).ret(
		function(_func,_name,_params,_lcb,_prog){
			return "function "+_name+"("+_params+"){\n"+_prog+"\n"+indent+"}";
		}
	);

	var nl=token(/^\\n/).ret(function(){return "\\n";});
	var disp_param=nl.or(expression).ret(function(_param){return _param;});
	var disp_state = token(/^println/).or(token(/^print/))
	.and(lp).and(disp_param.sep0(token(/^,/),true).ret(function(_params){
		return _params.join();
	})).and(rp).and(semicolon).ret(function(_printf,_lp,_params,_rp){
		return _printf+"("+_params+");";
	});

	var if_state_1liner=token(/^if/).and(lp).and(expression).and(rp).and(statement_lazy).ret(function(_if,_lp,_expr,_rp,_state){
		return "if("+_expr+")"+_state;
	});
	var if_then=token(/^if/).and(lp).and(expression).and(rp).and(lcb.ret(levelup)).and(program_lazy).and(rcb.ret(leveldown)).ret(function(_if,_lp,_expr,_rp,_lcb,_program,_rcb){
		return "if("+_expr+"){\n"+_program+"\n"+indent+"}";
	});
	var else_if=token(/^else/).and(if_then).ret(function(_else,_elseif){
		return "else "+_elseif;
	});
	var _else=token(/^else/).and(lcb.ret(levelup)).and(program_lazy).and(rcb.ret(leveldown)).ret(function(_else,_lcb,_program,_rcb){
		return "else{\n"+_program+"\n"+indent+"}";
	});
	var _else_1liner=token(/^else/).and(statement_lazy).ret(function(_else,_statement){return "else "+_statement;});
	var if_state=if_then.and(else_if.or(_else).or(_else_1liner).rep0()).ret(function(_if,_else_elseif){
		return _if+_else_elseif.join("");
	});
	var while_state=token(/^while/).and(lp).and(expression).and(rp).and(lcb.ret(levelup)).and(program_lazy).and(rcb.ret(leveldown)).ret(function(_while,_lp,_expr,_rp,_rcb,_program){
		return "while("+_expr+"){\n"+_program+"\n"+indent+"}";
	});
	var repeat_state1_part1=variable.and(larrow).and(expression).ret(function(_left,_arrow,_right){return ""+_left+_arrow+_right;});
	var repeat_state1_part2=variable.and(ge.or(gt).or(le).or(lt)).and(expression).ret(function(_left,_op,_right){return ""+_left+_op+_right;});
	var repeat_state1_part3=variable.and(token(/^\+=/).or(token(/^-=/))).and(expression).ret(function(_left,_op,_right){return ""+_left+_op+_right;});

	var repeat_state1_inner=repeat_state1_part1.and(semicolon).and(repeat_state1_part2).and(semicolon).and(repeat_state1_part3).ret(function(_state1,_semi1,_state2,_semi2,_state3){return ""+_state1+" "+_semi1+" "+_state2+" "+_semi2+" "+_state3;});
	var repeat_state1=token(/^for/).and(lp).and(repeat_state1_inner).and(rp).and(lcb.ret(levelup)).and(program_lazy).and(rcb.ret(leveldown)).ret(function(_for,_lp,_inner,_rp,_lcb,_prgrm,_rcb){
		return "for( "+_inner+" ){\n"+_prgrm+"\n"+indent+"}";
	});
	var repeat_state2=token(/^repeat/).and(lp).and(expression).and(rp).and(lcb.ret(levelup)).and(program_lazy).and(rcb.ret(leveldown)).ret(function(_1,_2,_expr,_3,_4,_prgrm){
		return "repeat("+_expr+"){\n"+_prgrm+"\n"+indent+"}";
	});


	var repeat_state=repeat_state1.or(repeat_state2);

	var arr_init=token(/^allinit/).and(lp).and(variable).and(comma).and(expression).and(rp).and(semicolon).ret(function(_init,_lp,_variable,_comma,_expression){
		return "allinit("+_variable+","+_expression+");";
	})
	var return_state=token(/^return /).and(expression).and(semicolon).ret(function(_1,_expr){return "return "+_expr+";";});

	var performance_test=token(/^profile/).and(lp).and(func_call.opt().ret(function(target){
		return target?target:"";
	})).and(rp).and(semicolon).ret(function(_1,_2,target){
		return "profile("+((target)?target:"")+");";
	})

	var assign=variable.and(larrow).ret(function(_var){
		return _var+"=";
	}).opt().and(expression).ret(function(_left,_right){
		return ((_left!=undefined)?_left:"")+_right;
	});
	var assigns=assign.sep1(comma,true).and(semicolon).ret(function(_assigns){ return _assigns.join(",")+";";});
	var inc=variable.and(token(/^\+=/)).and(expression).and(semicolon).ret(function(_var,_op,_expr){
		return _var+"+="+_expr+";";
	});
	var dec=variable.and(token(/^-=/)).and(expression).and(semicolon).ret(function(_var,_op,_expr){
		return _var+"-="+_expr+";";
	});

	var control_state=if_state.or(if_state_1liner).or(while_state).or(repeat_state);
	statement=performance_test.or(func).or(control_state).or(arr_init).or(disp_state).or(inc).or(dec).or(return_state).or(assigns).ret(function(statement){return indent+statement;});
	statements=statement.rep1().ret(function(stmts){console.log(indent);return stmts.join("\n");});

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
		// return "// 英語表示\n"+output;
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
