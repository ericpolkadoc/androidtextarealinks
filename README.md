When running the app, there are 2 buttons in the index.js.

- No require - all logic is done in the messages.js controller.  There are no issues, attributedStrings work as expected.

- With require - in this example, I am Require'ing the UI/ui.message.js controller, which has a "link" listener applied to the attributedStrings in the textarea.

I've applied a link listener for the attributedStrings, which should let me access the e.url.

In this 2nd instance, on Android, the links are clickable, but they are all treated as external links, as the "link" event is not being fired, and I cannot access e.url of the attributedString.

Wondering why the link event listener is removed when using the require'd version vs the all-in-one controller version. 

iOS works as expected in both examples, only seeing the issue with Android in the With Require example.
