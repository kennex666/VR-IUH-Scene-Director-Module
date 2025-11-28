import { BackgroundDim } from "./BackgroudDim.js";

export default class FloatScreen extends HTMLElement {
	_isOpen = false;

	_data = {
		title: "Unk",
	};

	_closeCallback = null;

	constructor() {
		super();
		this.className =
			"z-[11] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[--color-primary] p-3 rounded-lg flex flex-col gap-4 px-7 py-8 w-11/12 md:w-7/12";

		this._data.title = this.dataset.title || this._data.title;

		if (!this.id) {
			this.id = `float-screen-${Math.random().toString(36).substring(2, 15)}`;
		}

		const header = document.createElement("div");
		header.className = "flex flex-row items-center justify-between items-center";
		header.innerHTML = `
            <div></div>
            <h1 class="text-white text-lg md:text-xl text-center uppercase font-bold">${this._data.title}</h1>
            
            <button data-float-button="close" class="w-8 h-8 border-2 border-white rounded-full text-[--color-quaternary] hover:border-[--color-secondary-light] hover:[--color-tertiary-light]" title="Đóng cửa sổ ${this._data.title}">
                <i class="fa-solid fa-x"></i>
            </button>`;
		this.prepend(header);

		console.log("[FloatScreen] id", this.id);
	}

	connectedCallback() {
		if (!document.body.contains(this)) {
			document.body.appendChild(this);
		}

		const closeButton = this.querySelector("[data-float-button='close']");
		if (closeButton) {
			closeButton.addEventListener("click", () => this.close());
		}
	}

	render() {
		this.classList.toggle("hidden", !this._isOpen);
		if (!this._isOpen) {
			BackgroundDim.hide();
		} else {
			BackgroundDim.show();
		}
	}

	updateTitle(newTitle) {
		this._data.title = newTitle;
		const titleElem = this.querySelector("h1");
		if (titleElem) titleElem.textContent = newTitle;
	}

	open() {
		this._isOpen = true;
		this.render();
	}

	close() {
		this._isOpen = false;
		this._closeCallback && this._closeCallback();
		this.render();
	}

	onClose(callback) {
		this._closeCallback = callback;
	}

	static open(id) {
		const floatScreen = document.querySelector("#" + id);
		if (floatScreen && floatScreen instanceof FloatScreen) {
			floatScreen.open();
		}
	}

	static close(id) {
		const floatScreen = document.querySelector("#" + id);
		if (floatScreen && floatScreen instanceof FloatScreen) {
			floatScreen.close();
		}
	}

	static observedAttributes = ["data-is-open", "data-title"];

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "data-is-open") {
			this._isOpen = newValue === "true";
			this.render();
		} else if (name === "data-title") {
			this.updateTitle(newValue);
		}
	}

	appendToBody(element) {
		if (!this.contains(element)) {
			this.appendChild(element);
		}
	}
}

customElements.define("float-screen", FloatScreen);
