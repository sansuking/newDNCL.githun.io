/*
 コード生成中に使う補助ライブラリ．自分の処理しているクラス，メソッド，変数などの情報を保持する
 使い方:
   c=context();
   c.enter({a:3, b:5}, function (c) {
       // この中では，c.a==3 ,  c.b==5
       console.log("a="+c.a+" b="+c.b);
       c.enter({b:6}, function (c) {
          // この中では，c.a==3 ,  c.b==6
          console.log("a="+c.a+" b="+c.b);
       });
       // c.a==3 ,  c.b==5  に戻る
       console.log("a="+c.a+" b="+c.b);

   });
 */
(function () {
var define=window.define||function (r,f) {window.context=f();};
define([],function () {
return context=function () {
    var c={};
    c.ovrFunc=function (from , to) {
        to.parent=from;
        return to;
    };
    c.enter=enter;
    var builtins={};
    c.clear=function () {
        for (var k in c) {
            if (!builtins[k]) delete c[k];
        }
    };
    for (var k in c) { builtins[k]=true };
    return c;
    function enter(val, act) {
        var sv={};
        for (var k in val) {
            if (k.match(/^\$/)) {
                k=RegExp.rightContext;
                sv[k]=c[k];
                c[k]=c.ovrFunc(c[k], val[k]);
            } else {
                sv[k]=c[k];
                c[k]=val[k];
            }
        }
        act(c);
        for (var k in sv) {
            c[k]=sv[k];
        }
    }
};
});
})();