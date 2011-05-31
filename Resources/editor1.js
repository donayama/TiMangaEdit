var win = Titanium.UI.currentWindow;
var tvEditor = Titanium.UI.createTableView({
	minRowHeight: 90
});
tvEditor.addEventListener('click', function(e){
	if(e.rowData){
		win.name = e.rowData.name;
		win.close();
	}
});
win.add(tvEditor);

var serif = require('serifrow');
tvEditor.appendRow(serif.create('chihaya', 11, '丹波千早', false, 13));
tvEditor.appendRow(serif.create('ai', 11, '大江　愛',false, 13));
tvEditor.appendRow(serif.create('izumi', 11, '安藤泉己',false, 13));
