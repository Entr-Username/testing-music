// Create element:
let info = document.createElement("p");
// info.innerHTML = "MADE " + mus.getAttribute("date") + " | CREATED IN " + mus.getAttribute("box");


let link = document.createElement("a");
link.innerHTML = mus.getAttribute("link");

let song = document.createElement("summary");
song.innerHTML = mus.getAttribute("name");

let date = document.createElement("p");
date.innerHTML = "MADE " + mus.getAttribute("date");
let d = date.innerHTML;

let box = document.createElement("p");
box.innerHTML = " CREATED IN " + mus.getAttribute("box");
let b = box.innerHTML;

const vert = document.createElement("p");
vert.innerHTML = " | ";

let text = document.createTextNode(d + vert.innerHTML + b);

// Append to another element:
info.appendChild(text);

document.getElementById("mus").appendChild(song);
document.getElementById("mus").appendChild(info);



/* let div = document.createElement('div');
let text = document.createTextNode('Test');
div.appendChild(text);
document.body.appendChild(div);

div.classList.add('test');
*/