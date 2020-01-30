var sv = Ti.UI.createScrollView({
	id: "messagesListView",
	layout: "vertical",
	width: Ti.UI.FULL,
	height: Ti.UI.FULL,
	scrollType: "vertical"
})

var child = Ti.UI.createView({
	layout: "vertical"
})

for(var i = 0; i < 5; i++)
{
	var str = "this is an link to something http://www.google.com and and https://wwww.yahoo.com or internal links https://www.test.com/thislinkwillbeinternal."

	// find all the http instances
	var re = /http/g;
	var items = []

	while ((match = re.exec(str)) != null) {

		var start = match.index;   
		var url =  str.substring(start).split(" ")[0];

		items.push({   
			"type": Titanium.UI.ATTRIBUTE_LINK,
			"value": url,
			"range": [str.indexOf(url), url.length]
		},
		{
			"type": Ti.UI.ATTRIBUTE_UNDERLINES_STYLE,
			"value": Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_NONE, 
			"range": [str.indexOf(url), url.length]
		},
		{
			"type": Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
			"value": "orange",
			"range": [str.indexOf(url), url.length]
		},
		{
			"type" : Ti.UI.ATTRIBUTE_UNDERLINE_COLOR,
			"value" : "white",
			"range": [str.indexOf(url), url.length]
		});

	}

	var attr = Ti.UI.createAttributedString({
		text: str,
		attributes: items
	});

	var textarea = Ti.UI.createLabel({
		font: {
			fontSize: 18
		},
		left: 20,
		right: 20,
		top : 20,
		width : Ti.UI.FULL, 
		height : Ti.UI.SIZE,
		autoLink: Titanium.UI.AUTOLINK_NONE,
		editable: false,
		attributedString: attr,
		scrollable: false,
		bubbles: false
	});

	textarea.addEventListener('link', function(e){

		console.log(e.url)

		// internal route map
		var res = _.find(Alloy.Globals.webURLMap, function(service){
			return service.url == e.url
		})

		if(!_.isEmpty(res))
		{
			// internal link
			console.log("this is an internal link")
		}
		else
		{
			// external
			Ti.Platform.openURL(e.url);
		}
	});

	child.add(textarea);

}

sv.add(child)

$.myView.add(sv)

