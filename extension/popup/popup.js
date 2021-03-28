let username = localStorage.getItem("username")

if(username !== ""){
	window.close()
    chrome.browserAction.setPopup({
        popup: "./popup/pg2.html"
    });
}else{
    chrome.browserAction.setPopup({
        popup: "./popup/popup.html"
    });
}

document.getElementById('submitButton').onclick = (e) => {
	e.preventDefault()
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:5000/api/login", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(
		JSON.stringify(
			{
				username: username,
				password: password
			}
		)
	);
	xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			localStorage.setItem("user_id", this.response.user_id);
			localStorage.setItem("username", this.response.username);
			localStorage.setItem("email", this.response.email);
			// console.log(xhr.responseText.user_id)
			chrome.runtime.sendMessage(
				xhr.responseText.toString(), 
				function (response) {
					console.log(response);
				}
			)
			
        }
    }
}

    