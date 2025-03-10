// Create element:

// ICON
let icon = document.createElement("img");
let ic;
    switch (mus.getAttribute("daw")[0]) {
      case "u", "j", "a", "b": ic = 'bb'; break;
      case "f": ic = 'fls'; break;
      case "g": ic = 'gb'; break;
   }
icon.src = "/img/" + ic + ".png";

// SUMMARY
let song = document.createElement("summary");
   song.innerHTML = "<img src='" + icon.src + "' class='ic-1'>" + mus.getAttribute("name");

// SONG INFO
//DATE
let date = document.createElement('p');
date.classList.add('det');
  date.appendChild(document.createTextNode(`MADE ${mus.getAttribute("date")}`));

//DAW
let box;
		switch (mus.getAttribute("daw")[0]) {
			case "u": box = 'Ultrabox'; break;
			case "j": box = 'Jummbox'; break;
      case "a": box = 'AbyssBox'; break;
			default: box = 'BeepBox';
		}
  
let favi = document.createElement('img');
favi.src = "/img/" + box + "logo.png";
favi.classList.add('ic-2');


// find out why the favicon isn't showing up before the daw part in the string
// favicon isn't showing because the thing created is a textnode


// "created in" text (yeah I know it's kinda dumb)
let via = document.createElement('p');
via.classList.add('det');
  via.appendChild(document.createTextNode('CREATED IN'));

// DAW
let daw = document.createElement('p');
daw.classList.add('det');
  daw.appendChild(document.createTextNode(box));

// link (bro you have to use href with 'a' not src)
let link = document.createElement('a');
link.classList.add('det');
link.innerHTML = "link";
  link.href = (mus.getAttribute("link"));


// iframe for beepbox player
let player = document.createElement('iframe');
  player.src = (mus.getAttribute("link"));

//IF SONG HAS IMAGE
let img = document.createElement('img');
if (mus.hasAttribute("img")) {
  img.src = (mus.getAttribute("img"));
}

//IF SONG HAS DESCRIPTION
let desc = document.createElement('u');
desc.classList.add('det');

let more = document.createElement('p');
more.classList.add('det');
if (mus.hasAttribute("more")) {
  desc.appendChild(document.createTextNode(`Description:`));

  more.appendChild(document.createTextNode(mus.getAttribute("more")));
}

// TAGS (this part is big so it's at the bottom)
if (mus.hasAttribute("tags")) {
  let tags = document.createElement('button');
  tags.classList.add('filter-btn');
  tags.innerHTML = mus.getAttribute("tags");

  song.appendChild(document.createTextNode(' # '));
  song.appendChild(tags);


}

// Append to another element:
document.getElementById("mus").append(
  song, date,
  document.createTextNode('|'), via, favi, daw,
  document.createTextNode('|'), link, player, img,
  document.createElement("br"), desc,
  document.createElement("br"), more);