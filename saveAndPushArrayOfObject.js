let oggetto={uri: "urlDaStampare", base64: "base64DaStampare"}

let array=[oggetto]
console.log(array)

localStorage.setItem('arrayStorage', JSON.stringify(array));

let getFromStorage = JSON.parse(localStorage.getItem('arrayStorage'));

console.log("Preso da storage:", getFromStorage)

let oggetto2={uri: "urlDaStampare2", base64: "base64DaStampare2"}

getFromStorage.push(oggetto2)

console.log(localStorage.setItem('arrayStorage', JSON.stringify(getFromStorage)));