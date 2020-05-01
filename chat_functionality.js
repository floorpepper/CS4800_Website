/*This function ensures all of the HTML has loaded before any javascript kicks in.*/
window.onload = function () {
	
	document.getElementById("loginBtn").addEventListener("click", loginReq);
	document.getElementById("signupBtn").addEventListener("click", signupReq);
	
};

/*Log in as an existing user*/
function loginReq(){
	var userL = document.getElementById("usernameLogin").value;
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
	  "data": `{ \r\n\t\"username\": \"${userL}\",\r\n\t\"password\": \"${passL}\"\r\n}`
	}

	$(document).ajaxError(function() {
	 	document.getElementById("loginResult").innerHTML = "Login failed";
	});

	$.ajax(settings).done(function (response) {
		
		document.getElementById("loginResult").innerHTML = response.message;
		
	  	console.log(response);
	});
	
	//relocate to chatroom
	//window.location.href = "chatroom.html";
}

/*Create a new user*/
function signupReq(){
	var user = document.getElementById("usernameSignup").value;
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
	  console.log(response);
	});
	
	//relocate to chatroom
	//window.location.href = "chatroom.html";
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