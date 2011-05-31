var win = Titanium.UI.currentWindow;
var serif = require('serifrow');
var textarea = Titanium.UI.createTextArea({
	top: 4,
	left: 124,
	right:4,
	height: 180,
    value: win.serif,
    font:{fontSize:12},
    color:'#000',
    textAlign:'left',
    borderWidth:1,
    borderColor:'#000',
    borderRadius:4
});
win.add(serif.createImage(win.name, win.face));
win.add(textarea);
textarea.focus();
win.rightNavButton = (function(){
	var button = Titanium.UI.createButton({systemButton: Titanium.UI.iPhone.systemButton.SAVE});
	button.addEventListener('click', function(){
		win.serif = textarea.value;
		win.close();
	});
	return button;
})();
