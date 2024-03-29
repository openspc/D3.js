// ●は追加、変更箇所
// データセットはCSVファイル
d3.csv("mydata.csv", function(error, data){
	var dataSet = [ ];	// データを格納する配列変数
	var labelName = [ ];	// ラベルを入れる配列変数変数
	for(var i in data[0]){	// 最初のデータだけ処理する
		dataSet.push(data[0][i]);	// 横一行全てをまとめて入れる
		labelName.push(i);	// ラベルを入れる
	}
	// SVG要素の幅と高さを求める
	var svgEle = document.getElementById("myGraph");
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
	svgWidth = parseFloat(svgWidth);	// 値は単位付きなので単位を削除する
	svgHeight = parseFloat(svgHeight);	// 値は単位付きなので単位を削除する
	// グラフで使用する変数
	var offsetX = 30;	// X座標のオフセット（ずれ具合）
	var offsetY = 20;	// Y座標のオフセット（ずれ具合）
	var barElements;	// 棒グラフの棒の要素を格納する変数
	var dataMax = 300;	// データの最大値
	var barWidth = 25;	// 棒の横幅
	var barMargin = 30;	// 棒の横の間隔
	svgEle.style.width = dataSet.length * (barWidth + barMargin) + offsetX;	// ●
	// グラフを描画
	barElements = d3.select("#myGraph")
		.selectAll("rect")	// rect要素を指定
		.data(dataSet)	// データを要素に連結
	// データの追加
	barElements.enter()	// データ数だけ繰り返す
		.append("rect")	// データの数だけrect要素が追加される
		.attr("class", "bar")	// CSSクラスを指定
		.attr("height", 0)	// 初期値を0に設定
		.attr("width", barWidth)	// 横幅を指定
		.attr("x", function(d, i){
			return i * (barWidth+barMargin)+offsetX;		// X座標を出現順番×25+offsetXにする
		})
		.attr("y", svgHeight - offsetY)	// グラフの一番下に座標を設定
		// イベントを追加
		.on("mouseover", function(){
			d3.select(this)
				.style("fill", "red")	// 棒の塗りのスタイルを赤色にする
			})
		.on("mouseout", function(){
			d3.select(this)
				.style("fill", "orange")	// 棒の塗りのスタイルを橙色にする
			})
		// アニメーション処理
		.transition()
		.duration(1000)	// 1秒でアニメーション処理
		.delay(function(d, i){
			return i * 100;	// 0.1秒待ち
		})
		.attr("y", function(d, i){	// Y座標を指定する
			return svgHeight - d - offsetY;	// Y座標を計算
		})
		.attr("height", function(d,i){	// 横幅を指定。2番目のパラメーターに関数を指定
			return d;	// データ値をそのまま縦幅として返す
		})
	barElements.enter()	// text要素を指定
		.append("text")	// text要素を追加
		.attr("class", "barNum")	// CSSクラスを指定
		.attr("x", function(d, i){	// X座標を指定する
			return i * (barWidth+barMargin) + 10+offsetX;	// 棒グラフの表示間隔に合わせる
		})
		.attr("y", svgHeight - 5-offsetY)	// Y座標を指定する
		.text(function(d, i){	// データを表示する
			return d;
		})
	// 目盛りを表示するためにスケールを設定
	var yScale = d3.scale.linear()  // スケールを設定
		.domain([0, dataMax])   // 元のサイズ
		.range([dataMax, 0]) // 実際の出力サイズ
	// 縦方向の目盛りを設定し表示する
	d3.select("#myGraph")
		.append("g")
		.attr("class", "axis")
		.attr("transform", "translate("+offsetX+", "+((svgHeight-300)-offsetY)+")")
		.call(
			d3.svg.axis()
			.scale(yScale)  //スケールを適用する
			.orient("left") //目盛りの表示位置を左側に指定
		)
	// 横方向の線を表示する
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", svgWidth)
		.attr("height", 1)
		.attr("transform", "translate("+offsetX+", "+(svgHeight-offsetY)+")")
	// 棒のラベルを表示する
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i){	// X座標を指定する
			return i * (barWidth+barMargin) + 10+offsetX;	// 棒グラフの表示間隔に合わせる
		})
		.attr("y", svgHeight-offsetY+15)
		.text(function(d, i){
			return labelName[i];	// ラベル名を返す
		})
});
