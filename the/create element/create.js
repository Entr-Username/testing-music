// Create element:
const para = document.createElement("p");
para.innerHTML = "This is a paragraph.";

const song = document.createElement("summary");
song.innerHTML = "This is a summary.";

// Append to another element:
document.getElementById("myDIV").appendChild(song);
document.getElementById("myDIV").appendChild(para);

//

class Description extends HTMLElement {
    let songn = this.appendChild(document.createElement("div"));
    songn.textContent = this.getAttribute("name");
    songn.className = "track-name";

    if (this.hasAttribute("date")) {
        let date = this.appendChild(document.createElement("time"));
        date.dateTime = this.getAttribute("date");
        date.textContent = new Date(date.dateTime).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}).toLowerCase();
    }

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

    // definitions

    customElements.define("desc-p", TrackButton);
});