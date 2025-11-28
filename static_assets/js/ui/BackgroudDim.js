/**
 * BackgroundDim
 * Tạo một lớp custom element để hiển thị lớp phủ mờ nền.
 * Chỉ có một instance duy nhất trong DOM.
 * Usage:
 *   - To show the dim: BackgroundDim.show();
 *  - To hide the dim: BackgroundDim.hide();
 * Attributes:
 *  - is-active: Boolean attribute to control visibility. "true" shows the dim, "false" hides it.
 * Example:
 * <background-dim is-active="true"></background-dim>
 */
class BackgroundDim extends HTMLElement {
	static _instance = null;

	constructor() {
		if (BackgroundDim._instance) {
			return BackgroundDim._instance;
		}
		super();
		this.classList.add("hidden", "fixed", "inset-0", "bg-black", "bg-opacity-60", "z-10");

		this.dataset.backgroundDimId = "background-dim";
		this.setAttribute("is-active", "false");
		BackgroundDim._instance = this;
		return this;
	}

	render() {
		// Initial render based on is-active attribute
		const isActive = this.getAttribute("is-active");
		this.classList.toggle("hidden", isActive !== "true");
		console.log(`[BackgroundDim] is now ${isActive === "true" ? "active" : "inactive"}`);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "is-active") {
			this.render();
		}
	}

	static getInstance() {
		if (!BackgroundDim._instance) {
			BackgroundDim._instance = document.createElement("background-dim");
			BackgroundDim._instance.setAttribute("is-active", "false");
			document.body.appendChild(BackgroundDim._instance);
		}
		return BackgroundDim._instance;
	}

	static show() {
		const instance = BackgroundDim.getInstance();
		instance.setAttribute("is-active", "true");
		return instance;
	}

	static hide() {
		const instance = BackgroundDim.getInstance();
		instance.setAttribute("is-active", "false");
		return instance;
	}

	static get observedAttributes() {
		return ["is-active"];
	}
}
customElements.define("background-dim", BackgroundDim);

export { BackgroundDim };
