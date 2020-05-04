/*
for testing: 
	username: user0 
	password: pass0
user0 token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFiZTUyNTNlNmJkMjAwMTc4ODg5YTEiLCJpYXQiOjE1ODg0MDY2MTh9.Joorfc8KgJDbe06k3l5V-3l-vwh4uCmDyldWDKX28mU"
*/

var timeoutDefault = 0;

/*This function ensures all of the HTML has loaded before any javascript kicks in.*/
window.onload = function () {

	assignFunction("loginBtn", loginReq);
	assignFunction("signupBtn", signupReq);
	assignFunction("logoutBtn", logout);
	assignFunction("submitBtn", submit);
};

/*add event listeners to elements in html */
function assignFunction(desiredElemId, desiredFunction){
	var desiredElem = document.getElementById(desiredElemId);
    if(desiredElem){
        desiredElem.addEventListener("click", desiredFunction);
    }
}

/*
TODO: fix this function. Currently able to send a hard-coded message, but throws a CORS error: "Access to XMLHttpRequest at 'http://chatbot-server4800.herokuapp.com/messages' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."
when a dynamic variable is used (aka userText, a variable that extracts user input from the webpage), a post request only works 
part of the time. otherwise, gives CORS error.
- look into CORS
- see if this is a server issue
*/
/*send user response to server*/
function submit() {
	var userText = document.getElementById("userchat").value;
	if(userText === "" || userText == "\n"){
		document.getElementById("userchat").value = "";	//reset user's text box
		return;
	}
	//add to chat visually
	var userText = document.getElementById("userchat").value;
	addToChat(true, userText);
	
	//send to server
	var settings = {
	  "url": "http://chatbot-server4800.herokuapp.com/messages",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Content-Type": "application/json",
	    "Authorization": `Bearer ${"" + localStorage.token}`
	  },
	  "data": JSON.stringify(
	  	{
	  		message: userText,
	  		username: localStorage.username
	  	})
	};

	$.ajax(settings).done(function (response) {
	  console.log(response);
	  var therapistResponse = response.newMessage;
	  addToChat(false, therapistResponse);
	});
}

function addToChat(isUser, chatText){
	var node = document.createElement("LI");
	
	if(isUser){
		node.className = "inlineRight";
		node.classList.add("response");
	}
	else{
		node.className = "inlineLeft";
		node.classList.add("chat");
	}

	var textnode = document.createTextNode(chatText);
	node.appendChild(textnode);
	document.getElementById("chatList").appendChild(node);
	document.getElementById("userchat").value = "";	//reset user's text box
}

/*Log in as an existing user*/
function loginReq(){

	localStorage.username = document.getElementById("usernameLogin").value;
	var passL = document.getElementById("passwordLogin").value;
	
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "http://chatbot-server4800.herokuapp.com/users/reAuthenticate",
	  "method": "POST",
	  "headers": {
	    "Content-Type": "application/json",
	    "cache-control": "no-cache",
	    "Postman-Token": "b1113894-6c47-4927-b427-e98626a36dd5"
	  },
	  "processData": false,
	  "data": `{ \r\n\t\"username\": \"${localStorage.username}\",\r\n\t\"password\": \"${passL}\"\r\n}`
	}

	$(document).ajaxError(function() {
	 	document.getElementById("loginResult").innerHTML = "Login failed";
	});

	$.ajax(settings).done(function (response) {
		
		document.getElementById("loginResult").innerHTML = response.message;
		localStorage.token = JSON.stringify(response.user.token).slice(1, -1);	//extract token and remove quotes
		localStorage.sessionId = JSON.stringify(response.user.token).slice(1, -1);	//extract session id and remove quotes
	  	console.log(response);
	  	window.setTimeout(function(){
	 		//relocate to chatroom
			window.location.href = "chatroom.html";
	 	}, timeoutDefault);
	});
}

/*Create a new user*/
function signupReq(){
	localStorage.username = document.getElementById("usernameSignup").value;
	var pass = document.getElementById("passwordSignup").value;
	
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "http://chatbot-server4800.herokuapp.com/users/login",
	  "method": "POST",
	  "headers": {
	    "Content-Type": "application/json",
	    "cache-control": "no-cache",
	    "Postman-Token": "c0b0a739-d630-46fc-b9d6-9f329ee5d8eb"
	  },
	  "processData": false,
	  "data": `{ \r\n\t\"username\": \"${user}\",\r\n\t\"password\": \"${pass}\"\r\n}`
	}

	$.ajax(settings).done(function (response) {

		document.getElementById("signupResult").innerHTML = response.message;//JSON.stringify(response);
		localStorage.token = JSON.stringify(response.user.token).slice(1, -1);
		localStorage.sessionId = JSON.stringify(response.user.token).slice(1, -1);	//extract session id and remove quotes
		alert("session id: " + localStorage.sessionId);
	 	console.log(response);
	 	window.setTimeout(function(){
	 		//relocate to chatroom
			window.location.href = "chatroom.html";
	 	}, timeoutDefault);
	});
}

function logout(){
	localStorage.token = "-1";	//reset token
	window.location.href = "homepage.html";
}

function putReq(){
	/*jQuery ajax POST request*/
	$.ajax({
		url:'https://chatbot-server4800.herokuapp.com/',
		headers: {"Content-Type": "application/json"},
		type:"GET",
		success: function(result){
			console.log(result)
		},
		error: function(error){
			console.log('Error ${error}')
		}
	})
}