var svgWidth = 160;	// SVG要素の横幅
var svgHeight = 240;	// SVG要素の高さ
var blockSize = 20;	// ブロックのサイズ
// データセット
var dataSet = [
	0, 1, 2, 3, 3, 4, 5, 4,
	0, 0, 0, 3, 4, 4, 5, 3,
	1, 0, 0, 0, 0, 0, 0, 0,
	2, 6, 8, 7, 0, 0, 0, 2,
	4, 8, 9, 8, 0, 0, 1, 0,
	2, 6, 8, 6, 4, 0, 0, 0,
	2, 5, 3, 0, 2, 0, 0, 0,
	1, 2, 0, 0, 0, 0, 0, 0,
	1, 0, 0, 0, 0, 7, 8, 9,
	0, 0, 0, 0, 7, 9, 9, 9,
	0, 0, 0, 7, 8, 8, 9, 7,
	0, 0, 0, 6, 6, 7, 6, 5
];
// ヒートマップに表示するカラーを自動計算
var color = d3.interpolateHsl("blue", "yellow");	// 青色から黄色に補間
var maxValue = d3.max(dataSet);	// 最大値を求める
// ヒートマップの準備
var heatMap = d3.select("#myGraph")
	.selectAll("rect")   // rect要素を指定
	.data(dataSet)    // データを設定
// ヒートマップを表示
heatMap.enter()
	.append("rect")  // rect要素を追加
	.attr("class", "block")	// CSSクラスを追加
	.attr("x", function(d, i) { // X座標を設定
		return (i % 8) * blockSize;
	}) 
	.attr("y", function(d, i) { // Y座標を設定
		return Math.floor(i/8)*blockSize;
	})
	.attr("width", function(d, i) {	// 横幅を設定
		return blockSize;
	})
	.attr("height", function(d, i) {	// 縦幅を設定
		return blockSize;
	})
	.style("fill", function(d, i){	// 色を表示
		return color(d/maxValue);
	})
