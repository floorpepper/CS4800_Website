/*This function ensures all of the HTML has loaded before any javascript kicks in.*/
window.onload = function () {
	/*jQuery ajax GET request*/
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
};

