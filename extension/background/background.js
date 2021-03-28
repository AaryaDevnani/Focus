let restricted_sites=["www.twitter.com"]
window.addEventListener('load', (event) => {
    var xhr = new XMLHttpRequest();
    console.log('page is fully loaded');
    xhr.open("GET", "http://localhost:5000/api/restricted_urls", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const data = JSON.parse(this.response)
            console.log(data)
            len = data.restricted_urls.length
            for(i=0;i<len;i++){
                restricted_sites.push(data.restricted_urls[i].url)
            } 
        }
}
  });

let totaltime = 0 
let siteTimes = {};
let sendData = {"url": "","restricted": "", }

let history = [];
let restrictedSitesVisited = {};

let current_url = ""
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info =>{
        console.log(restricted_sites)        
        let temp_url = current_tab_info.url.split("/")[2]
        if(temp_url){
            let url_setter = temp_url.split(".")
            if(url_setter[0] === "www" ){
            current_url = "www." + url_setter[1] + ".com"

        }   else if(url_setter[1] == "com"){
            current_url = "www." + url_setter[0] + ".com"
        }   else{
            current_url = temp_url
        }
        }
        
        let restrictedIndex = restricted_sites.indexOf(current_url);
        let site_url =""
        if(current_url){
            site_url = current_url
            if (current_url !== 'newtab') { 
            let result = false
            if(restrictedIndex>-1){
                result = confirm("This is a warning, you are visiting a restricted website. Click 'OK' to go back, or else a notification will be sent to your parent/guardian")
                if(result == true){
                    chrome.tabs.remove(tab.tabId)
                }
                else if(result == false){
                    //execute email code
                    history.push(current_url)
                    restrictedSitesVisited[current_url] = "true" 
                    
                    console.log("restricted history: " +restrictedSitesVisited)
                    //post history & restricted visited
                }
            }          
            else{
                history.push(current_url)
                console.log( "history: " + history)
                
                //post only history
                
            }

            for(let site in siteTimes){
                console.log(site)
                //site = current_url
                if(siteTimes[site]){
                    let time = new Date() - siteTimes[site]
                    if (time > 0) {
                        console.log("Spent:", time/1000, "on", site);   
                        totaltime = (time/1000)+totaltime    
                        console.log("totaltime: "+ totaltime) 
                        if(totaltime > 3600){
                            alert("It has been one hour since you've been borwsing the web. Press OK to continue.")
                            totaltime=0
                            break;
                        }                
                    }
                    siteTimes[site] = undefined;
                     //post time from here
                    let restricted = false
                    if (restrictedSitesVisited[site]) {
                        restricted = restrictedSitesVisited[site]
                    }
                    var xhr_urls = new XMLHttpRequest();
                    xhr_urls.open("POST", "http://localhost:5000/api/history", true);
                    xhr_urls.setRequestHeader('Content-Type', 'application/json');
                    xhr_urls.send(
                        JSON.stringify(
                            {
                                url: site,
                                time_spent: time/1000,
                                restricted: restricted,
                            }
                        )
                    );
                    xhr_urls.onreadystatechange = function() {
                        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                            const data = JSON.parse(this.response)
                            console.log(data)
                            
                        }
                    }

                }
               

            }
            siteTimes[current_url] = new Date();
            
        }
    }
}
)
});