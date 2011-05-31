exports = {
	createWindow: function(name, face, serif, isNew, callback) {
		var editWindow = Titanium.UI.createWindow({
			title:'セリフ追加',
			minRowHeight:90
		});
		editWindow.name  = name;
		editWindow.face  = face;
		editWindow.serif = serif;

		var updateGroupData = function() {
			var groupData = Ti.UI.createTableViewSection({
				headerTitle: 'セリフの設定'
			});
			var rowName = Ti.UI.createTableViewRow({
				height:90,
				title: '誰のセリフ？',
				hasChild: true,
				url: 'editor1.js',
				rightImage: './faces/face_' + editWindow.name + '_11t.png'
			});
			var rowFace = Ti.UI.createTableViewRow({
				height:90,
				title: 'どんな表情？',
				hasChild: true,
				url: 'editor2.js',
				rightImage: './faces/face_' + editWindow.name + '_' + editWindow.face + 't.png'
			});
			var rowSerif = Ti.UI.createTableViewRow({
				height:90,
				title: 'セリフの内容 - ' + editWindow.serif,
				hasChild: true,
				url: 'editor3.js'
			});
			groupData.add(rowName);
			groupData.add(rowFace);
			groupData.add(rowSerif);
			return groupData;
		};
		var tableview = Titanium.UI.createTableView({
			data: [updateGroupData()],
			style: Titanium.UI.iPhone.TableViewStyle.GROUPED
		});

		tableview.addEventListener('click', function(e) {
			if(e.rowData && e.rowData.url) {

				var editWindow2  = Titanium.UI.createWindow({
					url: e.rowData.url,
					title: e.rowData.title
				});
				editWindow2.name = editWindow.name;
				editWindow2.face = editWindow.face;
				editWindow2.serif = editWindow.serif;
				editWindow2.addEventListener('close', function(e2) {
					editWindow.name = editWindow2.name || editWindow.name;
					editWindow.face = editWindow2.face || editWindow.face;
					editWindow.serif = editWindow2.serif || editWindow.serif;
					tableview.data = [updateGroupData()];
				});
				Titanium.UI.currentTab.open(editWindow2);
			}
		});
		editWindow.add(tableview);
		editWindow.rightNavButton = (function() {
			var button2 = Titanium.UI.createButton({
				systemButton: Titanium.UI.iPhone.systemButton.SAVE
			});
			button2.addEventListener('click', function() {
				callback(editWindow.name, editWindow.face, editWindow.serif);
				editWindow.close();
			});
			return button2;
		})();
		return editWindow;
	}
};