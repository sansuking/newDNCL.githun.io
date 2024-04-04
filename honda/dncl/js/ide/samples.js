$(function(){
	window.samples={};
	var regist=function(key,value){
		var opt=$("<option>");
		samples[key]=value;
	};
	
	regist("選択ソート",`Values←{}
iを1から100まで1ずつ増やしながら、
    value←乱数（1,500）
    追加する（Values,value）
を繰り返す
Sorted←{}

空(Values)でない の間、
    min←取り出す(Values)
    Others←{}
    空(Values)でない の間、
        value←取り出す（Values）
        もしmin>valueならば
            追加する(Others,min)
            min←value
        を実行し、そうでなければ
            追加する(Others,value)
        を実行する
    を繰り返す
    追加する(Sorted,min)
    Values←Others
を繰り返す

Sortedを表示する
性能を確認する`);

	regist("クイックソート",`Values←{}
iを1から100まで1ずつ増やしながら、
    value←乱数（1,500）
    追加する（Values,value）
を繰り返す

クイックソート(Values)は
    pivot←取り出す(Values)
    Lower←{}
    Higher←{}
    空でない(Values)の間、
        value←取り出す(Values)
        もしpivot≧valueならば
            追加する(Lower,value)
        を実行し、そうでなければ
            追加する(Higher,value)
        を実行する
    を繰り返す
    もし空でない(Lower)ならば
        Lower←クイックソート(Lower)
    を実行する
    もし空でない(Higher)ならば
        Higher←クイックソート(Higher)
    を実行する
    連結(Lower,pivot,Higher)を返す
を実行する

Sorted←クイックソート(Values)
Sortedを表示する
性能を確認する`);

	regist("バブルソート",`Values←{}
iを1から100まで1ずつ増やしながら、
    value←乱数（1,500）
    追加する（Values,value）
を繰り返す
length←要素数(Values)

iを1からlength-1まで1ずつ増やしながら、
    jをlengthからi+1まで1ずつ減らしながら、
        もしValues[j]<Values[j-1]ならば
            入れ替える(Values,j,j-1)
        を実行する
    を繰り返す
を繰り返す

Valuesを表示する
性能を確認する`);

	regist("挿入ソート",`Values←{}
iを1から100まで1ずつ増やしながら、
    value←乱数（1,500）
    追加する（Values,value）
を繰り返す
Sorted←{}

first←取り出す(Values)
追加する(Sorted,first)
空でない(Values)の間、
    value←取り出す(Values)
    i←1, n←要素数(Sorted)
    i≦nかつvalue>Sorted[i]の間、
        iを1増やす
    を繰り返す
    入れる(Sorted,i,value)
を繰り返す

Sortedを表示する
性能を確認する`);

	regist("線形探索",`Values←{29,7,48,39,19,37,25,33,27,34,19,35,12,5,14,30,47,3,10,32,6,36,25,4,7,38,1,18,50,28,12}
target←50
length←要素数(Values)

i←1
i≦lengthかつValues[i]≠targetの間、
    iを1増やす
を繰り返す

もしi≦lengthならば
    iと「番目に発見しました」を表示する
を実行し、そうでなければ
    「見つかりませんでした」を表示する
を実行する
性能を確認する`);

	regist("二分探索",`Values←{1,3,4,5,6,7,7,10,12,12,14,18,19,19,25,25,27,28,29,30,32,33,34,35,36,37,38,39,47,48,50}
target←6
left←1
right←30

left<rightの間、
    mid←(left+right)÷2
    もしValues[mid]<targetならば
        left←mid+1
    を実行し、そうでなければ
        right←mid
    を実行する
を繰り返す

もしValues[left]=targetならば
    leftと「番目に見つかりました」を表示する
を実行し、そうでなければ
    「見つかりませんでした」を表示する
を実行する
性能を確認する`);

	regist("2008年度 第3問 問2",`Namae[1]←「はるこ」, Tokuten[1]←73
Namae[2]←「なつお」, Tokuten[2]←77
Namae[3]←「あきよ」, Tokuten[3]←81
Namae[4]←「ふゆき」, Tokuten[4]←68

jを4-1から1まで1ずつ減らしながら、
    iを1からjまで１ずつ増やしながら、
        もしTokuten[i]<Tokuten[i+1]ならば
            n ← Namae[i]
            Namae[i]←Namae[i+1]
            Namae[i+1]←n
            t←Tokuten[i]
            Tokuten[i]←Tokuten[i+1]
            Tokuten[i+1]←t
        を実行する
    を繰り返す
を繰り返す


iを1から4まで1ずつ増やしながら、
    str←Namae[i]+":"+Tokuten[i]
    strを表示する
を繰り返す`);

	regist("2008年度 第3問 問3",`Namae[1]←「はるこ」, Tokuten[1]←73
Namae[2]←「なつお」, Tokuten[2]←77
Namae[3]←「あきよ」, Tokuten[3]←81
Namae[4]←「ふゆき」, Tokuten[4]←68

j←4-1
saigo←10
saigo＞１の間、
    iを1からjまで1ずつ増やしながら、
        もしTokuten[i]＜Tokuten[i+1]ならば
            n ← Namae[i]
            Namae[i]←Namae[i+1]
            Namae[i+1]←n
            t←Tokuten[i]
            Tokuten[i]←Tokuten[i+1]
            Tokuten[i+1]←t
            saigo←i
        を実行する
    を繰り返す
    j←saigo-1
を繰り返す


iを1から4まで1ずつ増やしながら、
    str←Namae[i]+":"+Tokuten[i]
    strを表示する
を繰り返す`);

	regist("2009年度 第3問 問2",`iを2から100まで1ずつ増やしながら,
    Yakusu[i]←0
を繰り返す

iを2から100まで1ずつ増やしながら、
    もしYakusu[i]=0ならば
        j←i
        j<=100の間、
            Yakusu[j]←i
            j←j+i
        を繰り返す
    を実行する
を繰り返す

iを2から100まで1ずつ増やしながら、
    もしYakusu[i]＝iならば
        iを表示する
    を実行する
を繰り返す`);

	regist("2009年度 第3問 問3",`iを2から100まで1ずつ増やしながら,
    Yakusu[i]←0
を繰り返す

iを2から100まで1ずつ増やしながら、
		A
    もしYakusu[i]=0ならば
        j←i
        j<=100の間、
            Yakusu[j]←i
            j←j+i
        を繰り返す
    を実行する
を繰り返す

k←100
k>1の間、
    Yakusu[k]を表示する
    k←k÷Yakusu[k]
を繰り返す`);

	regist("2010年度 第3問 問2",`Suji[1]←「」,Suji[2]←「二」,Suji[3]←「三」
Suji[4]←「四」,Suji[5]←「五」,Suji[6]←「六」
Suji[7]←「七」,Suji[8]←「八」,Suji[9]←「九」
KuraiMoji[4]←「千」, KuraiMoji[3]←「百」
KuraiMoji[2]←「十」, KuraiMoji[1]←「」

kurai←1000
n←231
ketaを4から1まで1ずつ減らしながら、
    d←n÷kurai
    もしd≠0ならば
        もしd=1かつketa=1ならば
            「一」を表示する
        を実行し、そうでなければ
            Suji[d]を表示する
            KuraiMoji[keta]を表示する
        を実行する
    を実行する
    n←n%kurai
    kurai←kurai÷10
を繰り返す`);

	regist("2010年度 第3問 問3",`Suji[1]←「」,Suji[2]←「二」,Suji[3]←「三」
Suji[4]←「四」,Suji[5]←「五」,Suji[6]←「六」
Suji[7]←「七」,Suji[8]←「八」,Suji[9]←「九」
KuraiMoji[4]←「千」, KuraiMoji[3]←「百」
KuraiMoji[2]←「十」, KuraiMoji[1]←「」
OkinaKuraiMoji[3]←「億」, OkinaKuraiMoji[2]←「万」
OkinaKuraiMoji[1]←「」

okinaKurai←100000000
x←123456789
kugiriを3から1まで1ずつ減らしながら、
    n←x÷okinaKurai
    もしd≠0ならば
        kurai←1000
        ketaを4から1まで1ずつ減らしながら、
            d←n÷kurai
            もしd≠0ならば
                もしd=1かつketa=1ならば
                    「一」を表示する
                を実行し、そうでなければ
                    Suji[d]を表示する
                    KuraiMoji[keta]を表示する
                を実行する
            を実行する
            n←n%kurai
            kurai←kurai÷10
        を繰り返す
        OkinaKuraiMoji[kugiri]を表示する
    を実行する
    x←x%okinaKurai
    okinaKurai←okinaKurai÷10000
を繰り返す`);

	regist("2011年度 第3問 問1",`sowa←0, saiko←0, saitei←100
Tensu←{0,58,86,92,30,98,61,57,19,40,29,2,86,3,30,95,98,59,97,33,81,2,50,4,19,5,49,69,46,40,56,24,64,58,29,41,65,70,77,32,14,76,44,95,2,50,42,61,99,93,29}
TNinのすべての値を0にする
bangoを1から50まで1ずつ増やしながら,
        s←Tensu[bango]
        sowa←s+sowa
        もしs>saikoならば
                saiko←s
        を実行する
        もしs<saiteiならば
                saitei←s
        を実行する
        TNin[s]を 1 増やす
を繰り返す

heikin←sowa÷50
heikinとsaikoとsaiteiを表示する`);

	regist("2011年度 第3問 問2",`sowa←0, saiko←0, saitei←100
Tensu←{0,58,86,92,30,98,61,57,19,40,29,2,86,3,30,95,98,59,97,33,81,2,50,4,19,5,49,69,46,40,56,24,64,58,29,41,65,70,77,32,14,76,44,95,2,50,42,61,99,93,29}
TNinのすべての値を0にする
bangoを1から50まで1ずつ増やしながら,
        s←Tensu[bango]
        sowa←s+sowa
        もしs>saikoならば
                saiko←s
        を実行する
        もしs<saiteiならば
                saitei←s
        を実行する
        TNin[s]を 1 増やす
を繰り返す

heikin←sowa÷50
heikinとsaikoとsaiteiを表示する

GNin[100] ← TNin[100]
tenを99から0まで1ずつ減らしながら、
        GNin[ten]←GNin[ten+1]+TNin[ten]
を繰り返す

bangoを50から1まで1ずつ減らしながら、
        s←Tensu[bango]
        Tenjun[GNin[s]]←s
        Tenban[GNin[s]]←bango
        GNin[s]を１減らす
を繰り返す

numを1から50まで1ずつ増やしながら、
    Tenjun[num]+":"+Tenban[num]を表示する
を繰り返す`);

	regist("2011年度 第3問 問3",`sowa←0, saiko←0, saitei←100
Tensu←{0,58,86,92,30,98,61,57,19,40,29,2,86,3,30,95,98,59,97,33,81,2,50,4,19,5,49,69,46,40,56,24,64,58,29,41,65,70,77,32,14,76,44,95,2,50,42,61,99,93,29}
TNinのすべての値を0にする
bangoを1から50まで1ずつ増やしながら,
        s←Tensu[bango]
        sowa←s+sowa
        もしs>saikoならば
                saiko←s
        を実行する
        もしs<saiteiならば
                saitei←s
        を実行する
        TNin[s]を 1 増やす
を繰り返す

heikin←sowa÷50
heikinとsaikoとsaiteiを表示する

GNin[100] ← TNin[100]
tenを99から0まで1ずつ減らしながら、
        GNin[ten]←GNin[ten+1]+TNin[ten]
を繰り返す

bangoを50から1まで1ずつ減らしながら、
        s←Tensu[bango]
        Tenjun[GNin[s]]←s
        Tenban[GNin[s]]←bango
        GNin[s]を１減らす
を繰り返す

juni←1
juniとTenjun[1]とTenban[1]を表示する
iを2から50まで1ずつ増やしながら、
        もしTenjun[i]＜Tenjun[i-1]ならば
                juni←i
        を実行する
        juniと":"とTenjun[i]と":"とTenban[i]を表示する
を繰り返す`);

	regist("2012年度 第3問 問2",`i←0,
x←713
Kekka1のすべての値を0にする
x>0の間,
        Kekka1[i]←x%2
        x←x÷2
        iを1増やす
を繰り返す
jを9から0まで1ずつ減らしながら,
        もしKekka1[j]=1ならば
                jと「番の分銅を右の皿にのせる。」を表示する
        を実行する
を繰り返す`);

	regist("2012年度 第3問 問3",`Sara[1]←「右」,Sara[2]←「左」
i←0
Kekka2のすべての値を0にする
x←97
x>0の間，
        amari←x%3, x←x÷3
        Kekka2[i]←amari
        もしamari=2ならばxを1増やす
        iを1増やす
を繰り返す
jを6から0まで1ずつ減らしながら，
        もしKekka2[j]≠0ならば
                jと「番の分銅を」とSara[Kekka2[j]]
                と「の皿にのせる。」を表示する
        を実行する
を繰り返す`);

	regist("2013年度 第3問 問2",`Rieki←{1,-3,2,10,-4,12,8,-4}
saidaiRieki←0
iを1から8まで1ずつ増やしながら，
        soRieki←0
        jをiから8まで1ずつ増やしながら，
                soRieki←soRieki+Rieki[j]
                もしsoRieki>saidaiRiekiならば
                        saidaiRieki←soRieki
                        kaisi←i，syuryo←j
                を実行する
        を繰り返す
を繰り返す
「開始時間帯は」とkaisiと「とし,」を表示する
「終了時間帯は」とsyuryoと「とする。」を表示する
「総利益の最大値は」とsaidaiRiekiと「千円である。」を表示する`);

	regist("2013年度 第3問 問3",`Rieki←{1,-3,2,10,-4,12,8,-4}
saidaiRieki←0，soRieki←0，i←1
jを1から8まで1ずつ増やしながら，
        soRieki←soRieki+Rieki[j]
        もしsoRieki>saidaiRiekiならば
                saidaiRieki←soRieki
                kaisi←i，syuryo←j
        を実行し，そうでなくもしsoRieki<0ならば
                soRieki←0，i←j+1
        を実行する
を繰り返す
「開始時間帯は」とkaisiと「とし,」を表示する
「終了時間帯は」とsyuryoと「とする。」を表示する
「総利益の最大値は」とsaidaiRiekiと「千円である。」を表示する`);

	regist("2014年度 第3問 問2",`Gakuhu←{"ダ","カ","ン","コ","ド","終"}
Patan←{"カ","ン","コ","声"}
yameru←0，i←1
yameru＝0の間，
        itti←0,j←1
        Patan[j]≠「声」の間，
                もしGakuhu[i+j-1]=Patan[j]ならば
                        itti←itti+1
                を実行する
                j←j+1
        を繰り返す
        もしGakuhu[i+j-1]=「終」ならばyameru←1
        もしitti=j-1ならば
                Kakegoe[i+j-1]←「▽」
        を実行する
        i←i+1
を繰り返す
Kakegoeを表示する`);

		regist("2014年度 第3問 問3",`Gakuhu←{"ダ","ダ","ダ","ダ","ダ","ダ","ン","終"}
Patan←{"ダ","ダ","声"}
yameru←0，i←1
yameru＝0の間，
        j←1
        Gakuhu[i+j-1]=Patan[j]の間，
                j←j+1
        を繰り返す
        もしGakuhu[i+j-1]=「終」ならばyameru←1
        もしPatan[j]=「声」ならば
                Kakegoe[i+j-1]←「▽」
                i←i+j-1
        を実行し,そうでなければ
                i←i+1
        を実行する
を繰り返す
Kakegoeを表示する`);

		regist("2015年度 第3問 問2",`Mのすべての値を0にする
M[1]←{20,5,15,20}
M[2]←{10,30,10,10}
M[3]←{10,30,5,50}
M[4]←{10,10,15,20}
M[5]←{40,10,20,30}

x←1,y←1,tokuten←M[1,1]
xMasu←5,yMasu←4
x<xMasuまたはy<yMasuの間，
        もしM[x+1,y]=M[x,y]かつM[x+1,y]×2≧M[x,y+1]ならば
                x←x+1
                tokuten←tokuten+M[x,y]×2
        を実行し，そうでなくもしM[x,y+1]=M[x,y]かつM[x+1,y]<M[x,y+1]×2ならば
                y←y+1
                tokuten←tokuten+M[x,y]×2
        を実行し,そうでなくもしM[x+1,y]≧M[x,y+1]ならば
                x←x+1
                tokuten←tokuten+M[x,y]
        を実行し，そうでなければ
                y←y+1
                tokuten←tokuten+M[x,y]
        を実行する
を繰り返す
「最終得点は」とtokutenと「点である。」を表示する`);

		regist("2015年度 第3問 問3",`Mのすべての値を0にする
M[1]←{20,5,15,20}
M[2]←{10,30,10,10}
M[3]←{10,30,5,50}
M[4]←{10,10,15,20}
M[5]←{40,10,20,30}
x←1,y←1,tokuten←M[1,1]
xMasu←5,yMasu←4

Tのすべての値を0にする

yを1からyMasuまで1ずつ増やしながら，
        xを1からxMasuまで1ずつ増やしながら，
                もしM[x-1,y]=M[x,y]ならば
                        xTokuten←T[x-1,y]+M[x,y]×2
                を実行し，そうでなければ
                        xTokuten←T[x-1,y]+M[x,y]
                を実行する
                もしM[x,y-1]=M[x,y]ならば
                        yTokuten←T[x,y-1]+M[x,y]×2
                を実行し，そうでなければ
                        yTokuten←T[x,y-1]+M[x,y]
                を実行する
                もしxTokuten≧yTokutenならば
                        T[x,y]←xTokuten
                を実行し，そうでなければ
                        T[x,y]←yTokuten
                を実行する
        を繰り返す
を繰り返す
「最大得点の最大値は」とT[xMasu,yMasu]と「点である。」を表示する`);

	regist("2016年度 第3問 問2",`HKosuのすべての値を0にする
HOmosaのすべての値を0にする
SOmosa←{2,8,1,1,6,6,1,2}
syohinsu←8
hakosu←0
iを1からsyohinsuまで1ずつ増やしながら，
        j←1
        HOmosa[j]+SOmosa[i]>9またはHKosu[i]=4の間，
                j←j+1
        を繰り返す
        iと「番の商品を」とjと「番の箱に入れる」を表示する
        HOmosa[j]←HOmosa[j]+SOmosa[i]，HKosu[j]←HKosu[j]+1
        もしj>hakosuならばhakosu←jを実行する
を繰り返す
「必要な箱の数は」とhakosuと「である」を表示する`);

	regist("2016年度 第3問 問3",`HKosuのすべての値を0にする
HOmosaのすべての値を0にする
SOmosa←{2,8,1,1,6,6,1,2}
syohinsu←8
hakosu←0
iを1からsyohinsuまで1ずつ増やしながら，
        j←hakosu+1,k←1
        k≦hakosuの間，
            もしHOmosa[k]+SOmosa[i]≦9
                    かつHKosu[k]<4
                    かつHOmosa[j]<HOmosa[k]ならば
                    j←k
            を実行する
            k←k+1
        を繰り返す
        iと「番の商品を」とjと「番の箱に入れる」を表示する
        HOmosa[j]←HOmosa[j]+SOmosa[i]，HKosu[j]←HKosu[j]+1
        もしj>hakosuならばhakosu←jを実行する
を繰り返す
「必要な箱の数は」とhakosuと「である」を表示する`);

	regist("2017年度 第3問 問2",`tyotensu←8
Hen←{
    {"-","A","B","-","A","-","A","B"},
    {"-","-","-","C","A","-","A","C"},
    {"-","-","-","E","-","E","E","B"},
    {"-","-","-","-","-","E","E","C"},
    {"-","-","-","-","-","D","A","D"},
    {"-","-","-","-","-","-","E","D"},
    {"-","-","-","-","-","-","-","F"}
}
hensosu←0
iを1からtyotensu-1まで1ずつ増やしながら，
        jをi+1からtyotensuまで1ずつ増やしながら，
                もしHen[i,j]≠"-"ならば
                        hensosu←hensosu+1
                        Siten[hensosu]←i
                        Syuten[hensosu]←j
                        Senbun[hensosu]←Hen[i,j]
                を実行する
        を繰り返す
を繰り返す


iを1からhensosuまで1ずつ増やしながら、
    disp←""+Siten[i]+":"+Syuten[i]+"="+Senbun[i]
    dispを表示する
を繰り返す`);

	regist("2017年度 第3問 問3",`tyotensu←8
Hen←{
    {"-","A","B","-","A","-","A","B"},
    {"-","-","-","C","A","-","A","C"},
    {"-","-","-","E","-","E","E","B"},
    {"-","-","-","-","-","E","E","C"},
    {"-","-","-","-","-","D","A","D"},
    {"-","-","-","-","-","-","E","D"},
    {"-","-","-","-","-","-","-","F"}
}
hensosu←0

iを1からtyotensu-1まで1ずつ増やしながら，
        jをi+1からtyotensuまで1ずつ増やしながら，
                もしHen[i,j]≠"-"ならば
                        hensosu←hensosu+1
                        Siten[hensosu]←i
                        Syuten[hensosu]←j
                        Senbun[hensosu]←Hen[i,j]
                を実行する
        を繰り返す
を繰り返す
kotae←0
xを1からhensosu-2まで1ずつ増やしながら，
        y←x+1
        Siten[x]=Siten[y]の間，
                もしSenbun[x]≠Senbun[y]かつHen[Syuten[x],Syuten[y]]≠"-"ならば
                        kotae←kotae+1
                を実行する
                y←y+1
        を繰り返す
を繰り返す
「三角形の個数は」とkotaeと「個である」を表示する`);

	regist("2018年度 第3問 問2",`tate←9,yoko←11
Masu←{
    {1,1,1,1,1,1,1,1,1},
    {1,0,0,0,1,0,0,0,1},
    {1,1,1,0,0,0,1,0,1},
    {9,0,0,0,1,0,1,0,1},
    {1,1,1,0,1,0,1,0,1},
    {1,0,1,1,1,0,1,1,1},
    {1,0,0,0,1,0,1,0,1},
    {1,1,1,0,0,0,1,0,9},
    {1,0,0,0,1,1,1,0,1},
    {1,0,1,0,0,0,0,0,1},
    {1,1,1,1,1,1,1,1,1}
}
nutta≠0の間、
        nutta←0
        yを2からtate-1まで1ずつ増やしながら，
A
                xを2からyoko-1まで1ずつ増やしながら,
                        s←Masu[x-1,y]+Masu[x+1,y]+Masu[x,y-1]+Masu[x,y+1]
                        もしMasu[x,y]=0かつs=3ならば
                                Masu[x,y]←1，nutta←1
                        を実行する
                を繰り返す
        を繰り返す
を繰り返す
yを1からtateまで1ずつ増やしながら，
        xを1からyokoまで1ずつ増やしながら，
                もしMasu[x,y]=1ならば
                        "■"を改行なしで表示する
                を実行し，そうでなければ
                        "□"を改行なしで表示する
                を実行する
        を繰り返す
        改行を表示する
を繰り返す`);

regist("2018年度 第3問 問3",`tate←9,yoko←11
Masu←{
    {1,1,1,1,1,1,1,1,1},
    {1,0,0,0,1,0,0,0,1},
    {1,1,1,0,0,0,1,0,1},
    {9,0,0,0,1,0,1,0,1},
    {1,1,1,0,1,0,1,0,1},
    {1,0,1,1,1,0,1,1,1},
    {1,0,0,0,1,0,1,0,1},
    {1,1,1,0,0,0,1,0,9},
    {1,0,0,0,1,1,1,0,1},
    {1,0,1,0,0,0,0,0,1},
    {1,1,1,1,1,1,1,1,1}
}

yを2からtate-1まで1ずつ増やしながら，
        xを2からyoko-1まで1ずつ増やしながら，
                i←x，j←y
                Masu[i,j]=0かつMasu[i+1,j]+Masu[i-1,j]+Masu[i,j+1]+Masu[i,j-1]=3の間，
                        Masu[i,j]←1
                        di←Masu[i-1,j]-Masu[i+1,j]
                        dj←Masu[i,j-1]-Masu[i,j+1]
                        i←i+di，j←j+dj
                を繰り返す
        を繰り返す
を繰り返す
yを1からtateまで1ずつ増やしながら，
        xを1からyokoまで1ずつ増やしながら，
                もしMasu[x,y]=1ならば
                        "■"を改行なしで表示する
                を実行し，そうでなければ
                        "□"を改行なしで表示する
                を実行する
        を繰り返す
        改行を表示する
を繰り返す`);
});
