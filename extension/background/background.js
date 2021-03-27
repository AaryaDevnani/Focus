
let restricted_sites=[
    "www.facebook.com",
    "www.instagram.com",
    "www.youtube.com"
];
let history = [];
let restrictedSitesVisited = [];

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info =>{
        current_url = current_tab_info.url.split("/")[2]
        let a = restricted_sites.indexOf(current_url);        
        if(current_url == "newtab" || current_url == undefined){
            
        }
        else if(a >-1){
            result = confirm("This is a warning, you are visiting a restricted website. Click 'OK' to go back, or else a notification will be sent to your parent/guardian")
            if(result == true){
                chrome.tabs.remove(tab.tabId)
            }else{
                //execute email code
            }
            restrictedSitesVisited.push(current_url)
            history.push(current_url)
            console.log(history)
            console.log(restrictedSitesVisited)
            
            //fetch command
        }
        else{
            history.push(current_url)
            console.log(history)
            //fetch command
        }
    }
)
});

