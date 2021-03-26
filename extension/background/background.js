let restricted_sites=[
    "www.facebook.com",
    "www.instagram.com",
    "www.youtube.com"
];
let history = [];
let restrictedSitesVisited = [];

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info =>{
        //console.log(current_tab_info.url)
        let url = current_tab_info.url
        current_url = current_tab_info.url.split("/")[2]
        let a = restricted_sites.indexOf(current_url);
        //console.log(a)
        if(current_url == "newtab" || current_url == undefined){
            console.log("kal")
        }
        else if(a >-1){
            alert("scam mat kar nahi toh mummy ko bolega")
            restrictedSitesVisited.push(current_url)
            history.push(current_url)
            console.log(history)
            console.log(restrictedSitesVisited)
        }
        else{
            history.push(current_url)
            console.log(history)

            //console.log("this")
            //alert("scam mat kar nahi toh mummy ko bolega")
        }
        
        
    }
)
});
console.log("test")
