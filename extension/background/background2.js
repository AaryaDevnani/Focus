window.addEventListener('load', (event) => {
    var xhr = new XMLHttpRequest();
    console.log('page is fully loaded');
    xhr.open("GET", "http://localhost:5000/api/restricted_url/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const data = JSON.parse(this.response)
            console.log(data)
            len = data.restricted_urls.length
            for(i=0;i<len;i++){
                console.log(data.restricted_urls[i].user_id,data.restricted_urls[i].url)
                console.log(localStorage.getItem("user_id"))
            }
            if (data.restricted_urls[0].user_id === localStorage.getItem("user_id")){
                console.log("GOD")
            }    
            //const restricted_sites = data.filter((url) => url.user_id === localStorage.getItem("user_id"))
        }
}
  });


let siteTimes = {};
let restricted_sites=[
    "www.facebook.com",
    "www.instagram.com",
    "www.youtube.com"
];
let history = [];
let restrictedSitesVisited = [];

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info =>{
        let current_url = current_tab_info.url.split("/")[2]
        let restrictedIndex = restricted_sites.indexOf(current_url);
        let site_url =""
        if(current_url){
            site_url = current_url
            if (current_url !== 'newtab') { 
            //time func
            for(let site in siteTimes){
                if(siteTimes[site]){
                    let time = new Date() - siteTimes[current_url]
                    console.log("Spent:", time/1000, "on", site, current_url);
                    //post time from here
                    siteTimes[current_url] = undefined;
                }
            }
            siteTimes[current_url] = new Date();
            
            let result = false
            if(restrictedIndex>-1){
                result = confirm("This is a warning, you are visiting a restricted website. Click 'OK' to go back, or else a notification will be sent to your parent/guardian")
                if(result == true){
                    chrome.tabs.remove(tab.tabId)
                }
                else if(result == false){
                    //execute email code
                    history.push(current_url)
                    restrictedSitesVisited.push(current_url)
                    console.log( "history: " + history)
                    //post history & restricted visited
                    
                }
            }          
            else{
                history.push(current_url)
                console.log( "history: " + history)
                console.log("restricted history: " +restrictedSitesVisited)
                //post only history
                
            }
        }
    }
}
)
});