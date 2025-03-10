// buttons

class RadioButton extends HTMLElement {

	#checked = false;
	get checked() {return this.#checked}
	set checked(value) {
		this.#checked = value;
		this.ariaChecked = value;
	}

    // role - the role of the element, in this case, it's a radio button
    // this is only used for the track songs
    // tabIndex - for the tab button
    // addEventListener - listens for a click
    // this.toggle - toggles the button
	connectedCallback() {
		this.role = "radio";
		this.tabIndex = 0;
	}

    // ! - means not (if this is not checked)
}



// filtering

class FilterButton extends RadioButton {

	toggle() {
		super.toggle();

		if (this.checked) {
			params.setAndUpdate("filter", this.getAttribute("value"));
			let filter = this.getAttribute("value").replaceAll(" ", "-");
			for (const track of document.getElementsByTagName("track-btn")) {
				track.classList.toggle("hidden", !track.classList.contains(filter));
			}
		}
		else {
			params.deleteAndUpdate("filter");
			for (const track of document.getElementsByTagName("track-btn")) {
				track.classList.remove("hidden");
			}
		}

	}

}



// tracks

//
/* track example

		<track-btn name="sportsball"
			note="a song concept i plopped into kick the bucket for a gag."
			date="2023-07-13"
			hash="j5N0..."
			class="game-jam"
		></track-btn>

*/

class TrackButton extends RadioButton {

	connectedCallback() {
	//	super.connectedCallback(); 

    // "this" means the current element, pretty straightforward
	
    // get the attribute "name" - takes the value of the name (name="sportsball")
    // createElement("div") - creates a div element, this is how it's shown on the page
    // appendChild - adds the element to the page
    // .className - adds a class to the element so it can be styled in the css

    // wow thanks autofill because I don't really know what these mean
		let name = this.appendChild(document.createElement("div"));
		name.textContent = this.getAttribute("name");
		name.className = "track-name";

    // textContent changes the text, the code basically types out the date like "jul 13, 2023" instead of "2023-07-13"
    // dateTime is the date in a format that the browser can understand (didn't know that)
    // new Date - creates a new date object
    // toLocaleDateString - formats the date to a string
		if (this.hasAttribute("date")) {
			let date = this.appendChild(document.createElement("time"));
			date.dateTime = this.getAttribute("date");
			date.textContent = new Date(date.dateTime).toLocaleDateString("en-US", {month: "2-digit", day: "numeric", year: "numeric"}).toLowerCase();
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
	
    // complete isn't used so don't worry about it
    // if classList.contains("complete") = if the "class" attribute has the word "complete" in it
		let icons = this.appendChild(document.createElement("div"));
		icons.className = "track-icons";
		if (this.classList.contains("complete")) {
			let icon = icons.appendChild(document.createElement("img"));
			icon.title = "complete";
			icon.src = "_asset/complete.png";
		}
		if (this.classList.contains("starred")) {
			let icon = icons.appendChild(document.createElement("img"));
			icon.title = "starred";
			icon.src = "_asset/starred.png";
		}
	}

}



// panel

const panel = Object.assign(document.getElementById("panel"), {

	header: document.querySelector("#panel h2"),
	iframe: document.querySelector("iframe"),
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
		
		// iframe (don't worry about iframe, just implement title and note
		/* let iframe = document.createElement("iframe");
		iframe.src = track.getAttribute("link");
		panel.iframe.replaceWith(iframe);
		panel.iframe = iframe;
		panel.recolor(); */
	
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



// definitions

customElements.define("filter-btn", FilterButton);
customElements.define("track-btn", TrackButton);



// url params

const params = new URLSearchParams(location.search);
params.url = new URL(location);

params.setAndUpdate = function (key, value) {
	this.set(key, value);
	this.update();
}

params.deleteAndUpdate = function (key) {
	this.delete(key);
	this.update();
}

params.update = function () {
	this.url.search = this;
	history.replaceState(null, "", this.url);
}



// page load

if (params.has("track")) {
	let button = document.getElementsByTagName("track-btn")[params.get("track")];
	if (button) {
		button.scrollIntoView({behavior: "smooth", block: "center"});
		button.click();
	}
}

if (params.has("filter")) {
	for (const button of document.getElementsByTagName("filter-btn")) {
		if (button.getAttribute("value") === params.get("filter")) {
			button.click();
			break;
		}
	}
}