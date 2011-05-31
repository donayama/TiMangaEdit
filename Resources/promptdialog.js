exports = {
	createPromptWindow: function(ptitle, pprompt, textFieldParams, successCallback, cancelCallback) {
		var window = Titanium.UI.createWindow({
			title: ptitle,
			backgroundColor:'#fff'
		});
		window.add(Titanium.UI.createLabel({
			text: pprompt,
			color: '#000',
			top:4, left:4, right:4, height:80
		}));
		var tf = Titanium.UI.createTextField(textFieldParams);
		tf.top = 80;
		tf.left = 4;
		tf.right = 4;
		tf.height =100;
		window.add(tf);
		window.rightNavButton = (function() {
			var button = Titanium.UI.createButton({
				title: '決定'
			});
			button.addEventListener('click', function() {
				successCallback(tf.value);
				window.close();
			});
			return button;
		})();
		window.leftNavButton = (function() {
			var button = Titanium.UI.createButton({
				title: 'キャンセル'
			});
			button.addEventListener('click', function() {
				//cancelCallback();
				window.close();
			});
			return button;
		})();
		return window;
	},
	show: function(window) {
		window.open({
			modal:true,
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
		});
	}
};