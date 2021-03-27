let username = localStorage.getItem("username")
console.log(username)
if(username !== ""){
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
    logout()
}
function logout() {
    console.log(localStorage.getItem("user_id"))
    localStorage.setItem("user_id", "");
    localStorage.setItem("username", "");
    console.log(localStorage.getItem("user_id"))
}