var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
//Console.log("bitch");

var model = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3bcc6ee2-16cf-4a0d-af93-61affd3d38d7?subscription-key=bbfc8b820c87430e82839b055cfc35e1&verbose=true";
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

//=========================================================
// Bots Dialogs
//=======================================fe==================
/*
bot.dialog('/', function (session) {
    session.send("Hello World");
    console.log("what\n");
});
*/

bot.dialog('/', dialog);
console.log( "got it" );
dialog.matches('whoIs', [
    function( session, args, next ) {
        var name = builder.EntityRecognizer.findEntity( args.entities, 'name::firstName' );
        console.log("I am here "  + name.entity );
        session.send("How am I supposed to know who " + name.entity + " is?" );
    } 
]);
    
  



//dialog.matches('scheduleMeeting', builder.DialogAction.send("hey"));
dialog.onDefault( builder.DialogAction.send('I cant hear you'));