// 背景色の設定
Titanium.UI.setBackgroundColor('#fff');

// データベースファイルを開きます（ない場合、作成されます）
var db = Titanium.Database.open('mangadb');
try {
	// DB内にテーブルが無い場合、定義に基づいてテーブルを作成します。
	var sql = 'CREATE TABLE IF NOT EXISTS SCENES (' +
	'SCENE_ID    TEXT,' +
	'SCENE_NAME  TEXT,' +
	'JSON        TEXT,' +
	'UPDATED_ON  TEXT'  +
	')';
	db.execute(sql);
} catch(ex) {
	Titanium.API.info(ex);
}
// 操作が終わったら後片付け
db.close();
db = null;

var tabGroup = Titanium.UI.createTabGroup();
var tabPreview = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title:'Preview',
	window:Titanium.UI.createWindow({
		title:'Preview',
		backgroundColor:'#fff',
		url:'preview.js',
		tabBarHidden: true
	})
});
var tabEditor = Titanium.UI.createTab({
	icon:'KS_nav_ui.png',
	title:'Editor',
	window:Titanium.UI.createWindow({
		title:'シナリオ',
		backgroundColor:'#fff',
		url:'scenes.js',
		tabBarHidden: true
	})
});
tabGroup.addTab(tabEditor);
tabGroup.addTab(tabPreview);
tabGroup.open();