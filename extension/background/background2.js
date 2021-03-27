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
                    
                }
            }          
            else{
                history.push(current_url)
                console.log( "history: " + history)
                console.log("restricted history: " +restrictedSitesVisited)
            }
        }
    }
}
)
});