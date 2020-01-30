// // Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args,
_messpagesLength,
_textFieldWrapperHeight,
messagesModels = [];

var data = {
    "messages": [
        {
            "id": 255195,
            "type": "text",
            "sent_at": "2020-01-24T05:35:43+00:00",
            "read_at": "2020-01-24T18:45:58+00:00",
            "read": true,
            "content": "This an example text ... https://www.google.com ... This an example text ... http://www.microsoft.com ... This an example text ... https://www.yahoo.com ... This an example text ... https://www.lemonaidhealth.com/... an internal link: https://www.test.com/thislinkwillbeinternal",
            "entry_type": "message",
            "incoming": true,
            "from": {
                "id": 5928,
                "name": "PIMS Test Doctor"
            },
            "to": {
                "id": 552784,
                "name": "Me"
            }
        }
    ]
}

var f = {

	loadMessages: function() {

		if(data.messages.length > 0)
		{
			_.each(data.messages, function (message, index) {

				f.buildRow(message, index);

			});

			$.messagesCollection.reset(messagesModels);
					
		}
	},

	buildRow: function(message, index)
	{
		messagesModels.push(Alloy.createModel("Messages",message));
	}
}

f.loadMessages();

