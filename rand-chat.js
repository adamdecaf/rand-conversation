/**
 * Random Chat (JavaScript)
 * Adam Shannon
 * 2010-08-12
 */

if (console == undefined)
	var console = {log: function() {}};

var Words = [
	// Greetings
	{word:'he(l+)o', plainText:'hello', type:'gretting', score:1},
	{word:'h(i+)', plainText:'hi', type:'gretting', score:1},
	{word:'he(y+)', plainText:'hey', type:'gretting', score:1},
	{word:'s(u+)(p+)', plainText:'sup', type:'gretting', score:1},
	
	// Annoying Greetings
	{word:'asl', plainText:'', type:'annoying-gretting', score:-1},
	
	// Confirmations
	{word:'o(k+)(a+)(y+)', plainText:'', type:'confirmation', score:1},
	{word:'(y(e+)?(a+)?(h+)?){2,}', plainText:'', type:'confirmation', score:1},
	
	// Positives
	{word:'((h+)(a+)+)', plainText:'', type:'positives', score:1},
	
	// Negatives
	{word:'b(o+)', plainText:'', type:'negatives', score:-1},
	
	// Emotions
	//{word:":\)", type:'emotion', score:1},
	//{word:":\(", type:'emotion', score:-1},
	
	// Question words
	{word:'wha(t+)', plainText:'', type:'question', score:0},
	{word:'where', plainText:'', type:'', score:0},
	{word:'when', plainText:'', type:'', score:0},
	{word:'who', plainText:'', type:'', score:0},
	{word:'(wh)?(y+){1,}', plainText:'', type:'', score:0},
	{word:'h(o+)(w+)', plainText:'', type:'', score:0},
	
	// Swear Words
	{word:'fuc(k+)', plainText:'', type:'swear', score:-3},
	{word:'sh(i+)(t+)', plainText:'', type:'swear', score:-3},
	{word:'da(m+)(n+)', plainText:'', type:'swear', score:-3},
	{word:'he(l+)', plainText:'', type:'swear', score:-3},
	{word:'c(u+)(m+)', plainText:'', type:'swear', score:-3},
	
	// 
	//{word:'', plainText:'', type:'', score:0},
];

var _Words = Words.length;

// Find the start and stop points for all types of words.
var start_and_stop_points = [];
var last_start_point = 0;
var last_word_type = Words[0].type;
var _wordTypes = start_and_stop_points.length;

for (var n = 0; n < _Words - 1; n++) {
	if (last_word_type != Words[n+1].type) {
		start_and_stop_points.push({type: Words[n].type, start: last_start_point + 1, stop: n + 1}); 
		last_start_point = n;
		last_word_type = Words[n].type;
	}
}
//console.log(start_and_stop_points);

var AI = {
	pickResponse: function (msg) {
	
		//  Clean the message, at least for now
		//msg = msg.replace(/([^a-z0-9\s]+)/, '');
		//console.log(msg);
		
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
			// Clean the part, at least a little
			parts[i] = parts[i].replace(/[^a-z0-9\s]+/, '');
			//console.log(parts[i]);
			
			for (var k = 0; k < _Words; k++) {
				if (parts[i].match(Words[k].word)) {
					score += Words[k].score; 
					break;
				}
			}
			
		}
		
		// Search for a greeting
		search_and_respond('greeting', msg);
		search_and_respond('confirmation', msg);
		
		// Then build a response.
		//send_message('Stranger', score.toString());
	}
};

/**
 * search_and_respond(String wordType)
 * Search the message for the word type and then respond.
 */
function search_and_respond(wordType, msg) {
	// Find the start and stop points for the wordType
	for (var n = i = k = 0; n < _wordTypes; n++) {
		if (wordType == start_and_stop_points[n].type)
			break;
	}
	
	// Now look for those words in the phrase
	var possibleWords = [];
	msg = msg.split(' ');
	
	for (i = 0; i < msg.length; i++) {
		msg[i] = msg[i].replace(/[^a-z0-9\s]+/, '');
		for (k = start_and_stop_points[n].start; k < start_and_stop_points[n].stop; k++) {
			possibleWords.push(Words[k].plainText);
		}
	}
	
	// Now pick a random word
	if (possibleWords.length > 0)
		elm_Messages.innerHTML += 'Stranger: ' + possibleWords[parseInt(Math.random() * possibleWords.length, 10)] + '\n';
	
}

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
