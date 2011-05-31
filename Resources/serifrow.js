exports = {
	createImage: function(name, face){
		return Titanium.UI.createImageView({
			url: './faces/face_' + name + '_' + face + 't.png',
			left: 4,
			top: 4,
			width: 120,
			height: 82
		});
	},
	create: function(name, face, text, border, fontSize) {
		var pBorder = border || false;
		var pFontSize = fontSize || 11;
		var row = Titanium.UI.createTableViewRow({
			height:'auto',
			hasChild:true
		});
		row.add(Titanium.UI.createImageView({
			url: './faces/face_' + name + '_' + face + 't.png',
			left: 4,
			top: 4,
			width: 120,
			height: 82
		}));
		row.name = name;
		row.face = face;
		row.serif = text;
		if(pBorder) {
			row.add(Titanium.UI.createLabel({
				top: 4,
				left: 124,
				right:4,
				height:82,
				borderColor: '#000',
				borderRadius: 8,
				borderWidth:1
			}));
		}
		row.add(Titanium.UI.createLabel({
			text: text,
			top: 6,
			left: 126,
			right:6,
			height:78,
			font: {
				fontSize: pFontSize
			},
			textAlign: 'left'
		}));
		return row;
	}
};