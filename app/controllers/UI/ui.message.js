// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

// LOG("message args", args)

var moment = require('alloy/moment');

var f = {

	buildMessage: function(message)
	{
		// LOG("message", message);

		message.itemId = message.mid;
		message.messageDate = message.mid + ' ' + moment(message.sent_at).format("ll") + " " + moment(message.sent_at).format("LT"),
		message.youLabel = "YOU"
		message.youLabelHeight = Ti.UI.SIZE;
		message.youLabelOpacity = 1
		message.doctorWrapperOpacity = 0;
		message.doctorWrapperHeight = 0;
		message.treatmentPlanLinkType = "NONE"

		if (message.entry_type !== "sms") {

			// console.log("message > " + message.content)

			if (message.incoming) {
				message.doctorImage = "/images/defaultAvatar.png";
				message.doctorTitle = message.from.name;
				message.youLabelHeight=0;
				message.youLabelOpacity=0;
				message.doctorWrapperOpacity=1;
				message.doctorWrapperHeight = Ti.UI.SIZE;
			}

			// find all the http instances
			var re = /http/g;
			var items = [];

			while ((match = re.exec(message.content)) != null) {

				var start = match.index;   
				var url =  (message.content).substring(start).split(" ")[0];

				// LOG("start " + start)
				// LOG("url " + url)

				items.push(
					{   
						"type": Titanium.UI.ATTRIBUTE_LINK,
						"value": url,
						"range": [(message.content).indexOf(url), url.length]
					},
					{
						"type": Ti.UI.ATTRIBUTE_UNDERLINES_STYLE,
						"value": Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_NONE, 
						"range": [(message.content).indexOf(url), url.length]
					},
					{
						"type": Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
						"value": "orange",
						"range": [(message.content).indexOf(url), url.length]
					},
					{
						"type" : Ti.UI.ATTRIBUTE_UNDERLINE_COLOR,
						"value" : "white",
						"range": [(message.content).indexOf(url), url.length]
					}
				);

			}

			var attr = Ti.UI.createAttributedString({
				text: message.content,
				attributes: items
			});

			message.attributedString = attr;

			$.messageModel.set({
				"doctorImage": message.doctorImage,
				"doctorTitle": message.doctorTitle,
				"youLabel": message.youLabel,
				"messageDate": message.messageDate,
				"content": message.content,
				"timestamp": new Date(),
				"youLabelOpacity": message.youLabelOpacity,
				"youLabelHeight": message.youLabelHeight,
				"doctorWrapperOpacity": message.doctorWrapperOpacity,
				"doctorWrapperHeight": message.doctorWrapperHeight,
				"links": message.links,
				"attributedString": message.attributedString
			})

		}
	},

	checkURLMap: function(e)
	{
		LOG("checkurlmap")

		var res = _.find(Alloy.Globals.webURLMap, function(service){
			return service.url == e.url
		})

		LOG("res", res)

		if(!APP.UTILS.isEmpty(res))
		{
			// this is an internal link
		}
		else
		{
			Ti.Platform.openURL(e.url);
		}
	}
}

f.buildMessage(args);


