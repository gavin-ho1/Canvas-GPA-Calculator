//Run content.js on page load
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tabURL = tabs[0].url;
    if(tabURL.includes("grades")){
    chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
    }else {
      chrome.tabs.executeScript(tabs[0].id, { file: "dashboard.js" });
    }
  });
});

var url
var grade
var courseID

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getURL') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      
      const activeTab = tabs[0];
      url = activeTab.url;    
      console.log(url)



      sendResponse([url]);
    }); 
    
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

      //Get grade of current page
      if (request.type === 'getGrade') {
          grade = request.data
          chrome.storage.sync.get('courseDict', (result) => {
            const courseDict = result.courseDict || {}; // Initialize if not present
            courseDict[courseID] = {
              data: grade
            };
            // console.log(courseID, grade)
            // For debugging
            chrome.storage.sync.set({ courseDict }, () => {
              // console.log(courseDict)
              // For Debuging
            });
            
          });
      }
  });

  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
  if (request.type === 'getCourseDict') {
    chrome.storage.sync.get('courseDict', (result) => {
      const courseDict = result.courseDict || {}; // Initialize if not present
      
      console.log(courseDict)
      // For debugging
      
    });
}
});