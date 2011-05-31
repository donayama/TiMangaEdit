var serif = require('serifrow');
var serifEdit = require('serifedit');
var prompt = require('promptdialog');

var win = Titanium.UI.currentWindow;
var scene_id = win.scene_id;
var scene_data = win.scene_data;

win.rightNavButton = (function() {
	var button = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ACTION
	});
	button.addEventListener('click', function() {
		var dialog = Titanium.UI.createOptionDialog({
			title: '処理を選択してください。',
			options:['シーンを保存する', 'シーン名を変更する','シーンを削除する','キャンセル'],
			destructive:2,
			cancel:3
		});
		dialog.addEventListener('click', function(e) {
			if(e.index == 0) {
				var db = Titanium.Database.open('mangadb');
				try {
					db.execute(
					"UPDATE SCENES SET SCENE_NAME = ?, JSON = ?, UPDATED_ON = datetime('now') WHERE SCENE_ID = ?",
					win.title,  JSON.stringify(scene_data), scene_id
					);
				} catch(ex) {
					Titanium.API.info(ex);
				}
				// 操作が終わったら後片付け
				db.close();
				db = null;

				win.close();
				return;
			}
			if(e.index == 1) {
				prompt.show(prompt.createPromptWindow('シーン名','シーン名を入力してください。', {
					left:8,
					right:8,
					value:win.title,
					borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
				}, function(t) {
					win.title = t;
				}), function() {

				})
				return;
			}
			if(e.index == 2) {
				win.close();
				return;
			}
		});
		dialog.show();
	});
	return button;
})();
var tvEditor = Titanium.UI.createTableView({
	minRowHeight: 90,
	editable: true
});
tvEditor.addEventListener('click', function(e) {
	var index = e.index;
	var row   = e.row;
	var editWindow = serifEdit.createWindow(e.rowData.name, e.rowData.face, e.rowData.serif, false, function(pName, pFace, pSerif) {
		tvEditor.insertRowAfter(index, serif.create(pName, pFace, pSerif, true, 11));
		tvEditor.deleteRow(index);
		scene_data[index] = {
			name: pName,
			face: pFace,
			serif: pSerif
		};
	})
	Titanium.UI.currentTab.open(editWindow);
});
win.add(tvEditor);

var tbFlex = Titanium.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var tbEditSerifs = Titanium.UI.createButton({
	title: '編集',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE
});
tbEditSerifs.addEventListener('click', function() {
	if(tvEditor.moving) {
		tvEditor.moving = false;
		tbEditSerifs.title = '編集';
	} else {
		tvEditor.moving = true;
		tbEditSerifs.title = '完了';
	}
});
var tbAddSerif = Titanium.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.ADD
});
tbAddSerif.addEventListener('click', function() {
	var editWindow = serifEdit.createWindow('chihaya', 11, '', true, function(pName, pFace, pSerif) {
		scene_data.push({
			name: pName,
			face: pFace,
			serif: pSerif
		});
		tvEditor.appendRow(serif.create(pName, pFace, pSerif, true, 11));
	})
	Titanium.UI.currentTab.open(editWindow);
});
win.toolbar = [tbEditSerifs, tbFlex, tbAddSerif];

if(scene_data.length > 0) {
	setTimeout( function() {
		for(var i = 0; i < scene_data.length; i++) {
			var e = scene_data[i];
			tvEditor.appendRow(serif.create(e.name, e.face, e.serif, true, 11));
		}
		/*
		 tvEditor.appendRow(serif.create('chihaya', 11, 'タイタにうもんの表示テストだよ。', true, 11));
		 tvEditor.appendRow(serif.create('ai', 15, '長文でも折り返すのかな？' + "\n" + 'Titanium.UI.createWindow({})とかやっても大丈夫なのかなｗ' + "\n" + 'とりあえずがんばろう！'+ "\n"+ 'おー(^^)/', true, 11));
		 tvEditor.appendRow(serif.create('izumi', 38, 'ちゃんと動いてますよ。', true, 11));
		 tvEditor.appendRow(serif.create('ai', 23, 'なにウインクしてるんだか…', true, 11));
		 */
	}, 250);
}