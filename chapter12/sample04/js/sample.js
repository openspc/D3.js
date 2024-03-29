var svgWidth = 320;	// SVG要素の横幅
var svgHeight = 320;	// SVG要素の高さ
// JSONデータを読み込む処理
d3.json("data2010.json", function(error, data){
	drawPackLayout(data);
});
// パックレイアウトを表示
function drawPackLayout(dataSet){
	// カラーを準備
	var color = d3.scale.category10();  // 10色を指定
	// パックレイアウト
	var bubble = d3.layout.pack()
		.size([320, 320])	// 表示サイズを指定
	// パックレイアウトで使用するグループを作成
	var pack = d3.select("#myGraph")
		.selectAll("g")
		.data(bubble.nodes(dataSet))	// データセットを要素に設定
		.enter()
		.append("g")
		.attr("transform", function(d, i){
			return "translate(" + d.x + "," + d.y + ")";	// X,Y座標を設定
		})
	// 円を生成
	pack.append("circle")	// circle要素を追加
		.attr("r", 0)	// 最初、半径は0にする
		.transition()
		.duration(function(d, i){	// 入れ子の深さに応じて待ち時間を設定
			return d.depth * 1000 + 500;	// 深さ×1秒+0.5秒
		})
		.attr("r", function(d){	// 半径を指定
			return d.r;
		})
		.style("fill", function(d, i){
			return color(i);
		})
	// 円に表示する文字を生成
	pack.append("text")
		.style("opacity", 0)	// 透明にする
		.transition()
		.duration(3000)	// 3秒かけて表示
		.style("opacity", 1.0)	// 不透明にする
		.text(function(d, i){
			if (d.depth == 1){	// 第1階層（都道府県レベル）のみ対象
				return d.name;	// nameプロパティの内容を返す
			}
			return null;	// 第1階層以外は表示しない
		})
}
