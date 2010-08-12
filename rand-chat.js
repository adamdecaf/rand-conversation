/**
 * Random Chat (JavaScript)
 * Adam Shannon
 * 2010-08-12
 */

var Words = {
	greeting: [
		
	],
	
	closing: [
		
	]
};

/**
 * toggle_disssconnect_value()
 * Toggle the value of elm_Send
 */
function toggle_dissconnect_value(value) {
	var values = ['Connect', 'Really?', 'Disconnect'];
	
	if (!value)
		return values[0];
	else
		return values[value]; 
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
	
	setTimeout(function () {
		elm_Message.value = null;
	}, 10);
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

	// Fill any fields with values
	elm_Messages.innerHTML = 'Welcome to Random Chat!\nYou\'re going to be chatting with a javascript bot, so have fun!\n';
	elm_Disconnect.value = toggle_dissconnect_value(0);
	elm_Send.value = 'Send';
	

};
