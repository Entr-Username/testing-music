// Create element:
const para = document.createElement("p");
para.innerHTML = "This is a paragraph.";

// Append to another element:
document.getElementById("myDIV").appendChild(song);
document.getElementById("myDIV").appendChild(para);

//custom
customElements.define("song-d", Description);

class Description extends HTMLDetailsElement {

	let song = this.appendChild(document.createElement("summary"));
		song.textContent = this.getAttribute("name");
		song.className = "track-name";

    // textContent changes the text, the code basically types out the date like "jul 13, 2023" instead of "2023-07-13"
    // dateTime is the date in a format that the browser can understand (didn't know that)
    // new Date - creates a new date object
    // toLocaleDateString - formats the date to a string
		if (this.hasAttribute("date")) {
			let date = this.appendChild(document.createElement("time"));
			date.dateTime = this.getAttribute("date");
			date.textContent = new Date(date.dateTime).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}).toLowerCase();
		}

    // SWITCH (THIS.GETATTRIBUTE("HASH")[0]) - the zero means the first letter of hash
    // let host; - sets the variable
    // switch - basically, if the first letter is _, then switch host to _, pretty simple right?
    // removeattribute - removes the attribute, why? because it's not needed anymore, but the link stays

    //thanks agauin autofill
		if (this.hasAttribute("hash")) {
			let host;
			switch (this.getAttribute("hash")[0]) {
				case "u": host = "ultraabox.github.io"; break;
				case "j": host = "jummb.us"; break;
				default: host = "www.beepbox.co";
			}
			this.setAttribute("link", `https://${host}/player/#song=${this.getAttribute("hash")}`);
			this.removeAttribute("hash");
		}
}

// panel
const panel = Object.assign(document.getElementById("myDiv"), {

	header: document.querySelector("#panel h2"),
	iframe: document.getElementById("ribbon"),
	description: document.getElementById("description"),
	tags: document.getElementById("tags"),

	colors: [
		"#ef0c8f", // red
		"#f59b1b", // orange
		"#f1e729", // yellow
		"#53d972", // green
		"#02d1f5", // blue
		"#4e0ba1", // purple
	],
	prevColor: -1,

	recolor: () => {
		let rand = Math.floor(Math.random() * (panel.colors.length - 1));
		if (rand === panel.prevColor) rand++;
		panel.style.setProperty("--color", panel.colors[rand]);
		panel.prevColor = rand;
	},

	view: track => {
		if (track) {
			params.setAndUpdate("track", track.getAttribute("name"));
			panel.hidden = false;
		}
		else {
			params.deleteAndUpdate("track");
			panel.iframe.src = "";
			panel.hidden = true;
			return;
		}
		
		// title
		panel.header.textContent = track.getAttribute("name");
		
		// iframe
		let iframe = document.createElement("iframe");
		iframe.src = track.getAttribute("link");
		panel.iframe.replaceWith(iframe);
		panel.iframe = iframe;
		panel.recolor();
	
		// note
		if (track.hasAttribute("note")) {
			panel.description.textContent = track.getAttribute("note");
			panel.description.hidden = false;
		}
		else panel.description.hidden = true;
	
		// tags
		if (track.classList) {
			panel.tags.textContent = "";
			for (const tag of track.classList) {
				let el = panel.tags.appendChild(document.createElement("span"));
				el.textContent = tag;
				el.className = "track-tag";
			}
			panel.tags.classList.hidden = false;
		}
		else panel.tags.classList.hidden = true;
	},

});