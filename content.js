chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrape") {
      const gradeSpans = document.querySelectorAll('span.grade');  // Target <span class="grade">
      let numbers = [];
  
      gradeSpans.forEach(span => {
        const text = span.innerText;
        const foundNumbers = text.match(/\d+(\.\d+)?/g);  // Find numbers in the text
        if (foundNumbers) {
          numbers = numbers.concat(foundNumbers);
        }
      });
  
      sendResponse(numbers.length > 0 ? numbers.join(', ') : 'No numbers found in <span class="grade">');
    }
  });
 

// Find the target <aside> element with the ID "right-side-wrapper"
const asideElement = document.getElementById('right-side');

if (asideElement) {
    // Create a new div element
    const newDiv = document.createElement('div');

    // Add some content to the new div with the custom font size
    newDiv.innerHTML = `
        <div style="font-size: 1.2em; background-color: lightblue;">
            <p>This div was injected at the top of <aside id="right-side-wrapper"></p>
        </div>
    `;

    // Insert the new div as the first child of the <aside> element
    asideElement.insertAdjacentElement('afterbegin', newDiv);
}
