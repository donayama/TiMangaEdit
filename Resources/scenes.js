var prompt = require('promptdialog');

var DB = {
	loadScene: function(scene_id) {
		var db = Titanium.Database.open('mangadb');
		try {
			// データ取得
			var rows = db.execute('SELECT * FROM SCENES WHERE SCENE_ID = ? ', scene_id);
			var title = null;
			var scene_data = null;
			while(rows.isValidRow()) {
				title = rows.fieldByName('SCENE_NAME');
				scene_data = rows.fieldByName('JSON');
				rows.next();
			}
			// 走査が終わったらResultSetを閉じておきます。
			rows.close();
			rows = null;
		} catch(ex) {
			alert(ex);
			Titanium.API.info(ex);
		}
		// 操作が終わったら後片付け
		db.close();
		db = null;

		Titanium.UI.currentTab.open(
		Titanium.UI.createWindow({
			title: title,
			scene_id: scene_id,
			scene_data: JSON.parse(scene_data),
			url:'editor.js'
		}), {
			animated: true
		}
		);
	},
	loadScenes: function() {
		var scenes = [];
		var db = Titanium.Database.open('mangadb');
		try {
			// データ取得
			var rows = db.execute('SELECT * FROM SCENES ORDER BY UPDATED_ON DESC');
			while(rows.isValidRow()) {
				scenes.push({
					title: rows.fieldByName('SCENE_NAME'),
					scene_id: rows.fieldByName('SCENE_ID')
				});
				rows.next();
			}
			// 走査が終わったらResultSetを閉じておきます。
			rows.close();
			rows = null;
		} catch(ex) {
			alert(ex);
			Titanium.API.info(ex);
		}
		// 操作が終わったら後片付け
		db.close();
		db = null;
		tvEditor.data = scenes;
	},
	addScene: function(name,callback) {
		var db = Titanium.Database.open('mangadb');
		var id = "SCENE_" + (new Date().getTime());
		try {
			db.execute(
			"INSERT INTO SCENES (SCENE_ID, SCENE_NAME, JSON, UPDATED_ON)" +
			" VALUES(?, ?, ?, datetime('now'))",
			id, name, JSON.stringify([])
			);
		} catch(ex) {
			Titanium.API.info(ex);
		}
		// 操作が終わったら後片付け
		db.close();
		db = null;
		callback(id);
	}
};

var win = Titanium.UI.currentWindow;
win.tabBarHidden = true;

//var ss = DB.loadScenes();
var tvEditor = Titanium.UI.createTableView({
});
tvEditor.addEventListener('click', function(e) {
	DB.loadScene(e.rowData.scene_id);
});
win.add(tvEditor);

win.rightNavButton = (function() {
	var button = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.COMPOSE
	});
	button.addEventListener('click', function() {
		prompt.show(prompt.createPromptWindow('シーン名','シーン名を入力してください。', {
			left:8,
			right:8,
			value:'',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		}, function(t) {
			DB.addScene(t, function(id) {
				tvEditor.appendRow({
					title: t,
					scene_id: id,
					scene_data: []
				});
				Titanium.UI.currentTab.open(
				Titanium.UI.createWindow({
					title:t,
					scene_id: id,
					scene_data: [],
					url:'editor.js'
				}), {
					animated: true
				}
				);
			});
		}), function() {

		})
	});
	return button;
})();
DB.loadScenes();