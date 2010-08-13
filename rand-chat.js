/**
 * Random Chat (JavaScript)
 * Adam Shannon
 * 2010-08-12
 */

var Words = [
	// Greetings
	{word:'hello', type:'gretting', score:1},
	{word:'hi', type:'gretting', score:1},
	{word:'hey', type:'gretting', score:1},
	
	// Swear Words
	{word:'fuck', type:'swear', score:-3}
];

var _Words = Words.length;

var AI = {
	pickResponse: function (msg) {
		
		// Break apart each word to try to find the tone.
		//console.log(msg.split(' '));
		var 
			score = 0,
			parts = msg.split(' '),
			_parts = parts.length;
		
		// This will NEED to be a better search format, sometime...
		//console.log('Words: ' + _Words);
		//console.log('Parts: ' + _parts);
		
		for (var i = 0; i < _parts; i++) {
			for (var k = 0; k < _Words; k++) {
				if (parts[i] == Words[k].word) {
					score += Words[k].score; 
					break;
				}
			}
			
		}
		
		// Then build a response.
		send_message('Stranger', score.toString());
	}
};

/**
 * disconnect()
 * Start a new chat
 */
function disconnect(elm) {
	elm.status++; 
	elm.value = toggle_dissconnect_value(elm.status);
	
	if (elm.status == 2)
		new_chat();
}

/**
 * toggle_disssconnect_value()
 * Toggle the value of elm_Send
 */
function toggle_dissconnect_value(value) {
	var values = ['Disconnect', 'Really?', 'Connect'];
	
	if (!value || value >= values.length) {
		elm_Disconnect.status = 0;
		return values[0];
	} else {
		elm_Disconnect.status++;
		return values[value]; 
	}
}


// Load up a bunch of variables
function $(value) { return document.getElementById(value); }

var
	elm_Messages = $('messages'),
	elm_Disconnect = $('disconnect'),
	elm_Message = $('message'),
	elm_Send = $('send');
	
	/**
	console.log(
		elm_Messages + '\n',
		elm_Disconnect + '\n',
		elm_Message + '\n',
		elm_Send + '\n'
	);
	*/
	
function send_message(user, msg) {
	// Format the message a little
	if (msg.substr(0, 1) == '\n')
		msg = msg.substr(1); 
	
	elm_Messages.innerHTML += user + ': ' + msg + '\n';
	
	window.timeout = setTimeout(function (msg) {
		AI.pickResponse(msg);
		elm_Message.value = null;
		clearTimeout(window.timeout);
	}, 100, msg);
	
}

function new_chat() {
	// Fill any fields with values
	elm_Messages.innerHTML = 'Welcome to Random Chat!\nYou\'re going to be chatting with a javascript bot, so have fun!\n';
	elm_Disconnect.value = toggle_dissconnect_value(0);
	elm_Send.value = 'Send';
	elm_Message.focus();
}
	
// Listen for key commands
document.onkeydown = function (event) {
	switch (event.which) {
		case 13:
			// console.log('Enter');
			send_message('You', elm_Message.value);
		break;
		
		case 120:
			// console.log('F9');
			new_chat();
		break;
	}
};

// Load things when the page is loaded
window.onload = function () {

	// Start a new chat
	new_chat();

};
