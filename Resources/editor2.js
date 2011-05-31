var win = Titanium.UI.currentWindow;
var tvEditor = Titanium.UI.createTableView({
	minRowHeight: 90
});
tvEditor.addEventListener('click', function(e){
	if(e.rowData){
		win.name = e.rowData.name;
		win.face = e.rowData.face;
		win.close();
	}
});
win.add(tvEditor);

var serif = require('serifrow');
tvEditor.appendRow(serif.create(win.name, 11, '表情11', false, 13));
tvEditor.appendRow(serif.create(win.name, 12, '表情12', false, 13));
tvEditor.appendRow(serif.create(win.name, 13, '表情13', false, 13));
tvEditor.appendRow(serif.create(win.name, 14, '表情14', false, 13));
tvEditor.appendRow(serif.create(win.name, 15, '表情15', false, 13));
tvEditor.appendRow(serif.create(win.name, 16, '表情16', false, 13));
tvEditor.appendRow(serif.create(win.name, 17, '表情17', false, 13));
tvEditor.appendRow(serif.create(win.name, 18, '表情18', false, 13));
tvEditor.appendRow(serif.create(win.name, 21, '表情21', false, 13));
tvEditor.appendRow(serif.create(win.name, 22, '表情22', false, 13));
tvEditor.appendRow(serif.create(win.name, 23, '表情23', false, 13));
tvEditor.appendRow(serif.create(win.name, 24, '表情24', false, 13));
tvEditor.appendRow(serif.create(win.name, 25, '表情25', false, 13));
tvEditor.appendRow(serif.create(win.name, 26, '表情26', false, 13));
tvEditor.appendRow(serif.create(win.name, 27, '表情27', false, 13));
tvEditor.appendRow(serif.create(win.name, 28, '表情28', false, 13));
tvEditor.appendRow(serif.create(win.name, 31, '表情31', false, 13));
tvEditor.appendRow(serif.create(win.name, 32, '表情32', false, 13));
tvEditor.appendRow(serif.create(win.name, 33, '表情33', false, 13));
tvEditor.appendRow(serif.create(win.name, 34, '表情34', false, 13));
tvEditor.appendRow(serif.create(win.name, 35, '表情35', false, 13));
tvEditor.appendRow(serif.create(win.name, 36, '表情36', false, 13));
tvEditor.appendRow(serif.create(win.name, 37, '表情37', false, 13));
tvEditor.appendRow(serif.create(win.name, 38, '表情38', false, 13));
