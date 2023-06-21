const page = document.getElementById('react-root')
const testDiv = document.createElement('div')
const newContent = document.createTextNode("We are testing")
testDiv.appendChild(newContent)

const currentDiv = document.getElementById("app");
document.body.insertBefore(testDiv, currentDiv);