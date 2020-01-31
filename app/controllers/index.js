function doClick(e)
{
	console.log(e.source)

	var screen;	

	if(e.source.id == "message")
	{
		screen = "messages"
	}
	else
	{
		screen = "messages2"
	}

	var c = Alloy.createController(screen).getView();
	
	if(OS_IOS)
	{
		c.open({
			modal: true
		});
	}
	else
	{
		c.open();
	}

}


$.index.open();
