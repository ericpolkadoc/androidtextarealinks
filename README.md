This sample project represents a refactoring that I am doing in our app for our messages screen. 

In the message, we need to be able to recognize http urls in the message, and peform a check against a predefined list of urls.

This list is defined in alloy.js as webURLmap.

I initially the screen was built with a tableview, but we were finding that links were becoming unclickable after scrolling.

The plan was then to move to a listview, but after building it out I found that I could not apply the "link" eventListener to each textarea.

I finally decided that doing this with a scrollview and a list of views (the "rows") was going to be my best option.  Each row is a require'd controller (UI/ui.message), and I can then apply the "link" eventListener individually to each textarea as it is returned into the main view (message2.js).

If you run the app, you'll see 2 buttons
- NO REQUIRE (messages.js)
- WITH REQUIRE (messages2.js

messages.js is a sample which does not use a require'd controller, everything is built in the same controller.  I prefer not to use this method as I am trying to move everything to models, controllers and xml layouts.

messages2.js uses a Require to build each "row" (UI/ui.message).  It uses a model, controller and xml layout.

If you build the app with iOS, both screens work as expected.  However with Android, only message.js works - you can click the internal link (https://www.test.com/thislinkwillbeinternal) and it should console.log "this is an internal link", because I can see the e.url in the event click.

When I run message2.js, the link eventListener does not fire, e.url is not available, and just opens every url.

So my question is, when I require the controller, why is the link eventListener not firing and being overridden by the textarea click event?

