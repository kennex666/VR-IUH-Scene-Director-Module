import FloatScreen from "./FloatScreen.js";

export class GuideIntro extends HTMLElement {
	constructor() {
		super();
		const floatScreen = new FloatScreen();
		floatScreen.setAttribute("id", "fs-guide");
		floatScreen.setAttribute("data-title", "Hướng dẫn sử dụng");
		floatScreen.setAttribute("data-is-open", "false");

		const guideSteps = [
			{
				icon: "mouse.png",
				text: "Dùng chuột để di chuyển góc nhìn",
			},
			{
				text: "Nút bản đồ <i class='fa-solid fa-map mx-2'></i> và plugin <i class='fa-solid fa-plug mx-2'></i> để mở menu thêm vào cảnh 3d",
			},
			{
				text: "Nút chỉnh sửa <i class='fa-solid fa-pencil mx-2'></i> để mở hộp thoại sửa các đối tượng",
			},
			{
				text: "Để chỉnh góc nhìn mặc định khi vào cảnh, hãy xoay chuột đến góc nhìn ưng ý và nhấn <i class='fa-solid fa-star mx-2'></i>",
			},
			{
				text: "Di chuyển nhanh đối tượng đang chọn ra trước mặt, nhấn <i class='fa-solid fa-arrows-alt mx-2'></i>",
			},
			{
				text: "Lưu tất cả địa điểm và plugin đã chỉnh sửa <i class='fa-solid fa-save mx-2'></i>",
			},
			{
				text: "Để xoay đối tượng đang chọn, nhấn giữ phím Alt và di chuyển chuột",
			},
			{
				text: "Để di chuyển đối tượng đang chọn về trước mặt nhanh chóng, nhấn giữ phím Shift và di chuyển chuột",
			},
		];

		const actions = ["phóng to/thu nhỏ", "nhìn xung quanh", "mở menu truy cập các địa điểm"];

		const divGuideContent = document.createElement("div");
		divGuideContent.className =
			"flex flex-col border-2 border-white rounded-lg gap-4 px-6 py-6 menu-left-scroll scroll-box max-h-[60vh]";

		// Phần hướng dẫn cơ bản
		divGuideContent.innerHTML = guideSteps
			.map(
				(step) => `
			<div class="flex flex-col gap-2 text-center md:flex-row md:gap-6 items-center">
				${
					step.icon
						? `<div class="w-12 h-12 md:w-8 md:h-8">
        
					<img src="./static_assets/img/${step.icon}" class="w-12 h-12 md:w-8 md:h-8 object-contain">
				</div>`
						: ""
				}
				<p class="text-white md:text-lg">${step.text}</p>
			</div>`
			)
			.join("");

		floatScreen.appendToBody(divGuideContent);
		this.appendChild(floatScreen);
	}

	connectedCallback() {
		const floatScreen = this.querySelector("#fs-guide");
		if (floatScreen) {
			floatScreen.onClose(() => {
				console.log("[GuideIntro] closed");
				const event = new CustomEvent("guide-closed", {});
				window.dispatchEvent(event);
			});
		}
	}

	onClose(callback) {
		const floatScreen = this.querySelector("#fs-guide");
		if (floatScreen) {
			floatScreen.onClose(callback);
		}
	}

	static observedAttributes = ["data-is-open"];

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "data-is-open") {
			const floatScreen = this.querySelector("#fs-guide");
			if (floatScreen) {
				floatScreen.setAttribute("data-is-open", newValue);
			}
		}
	}

	static getInstance() {
		return document.querySelector("guide-intro");
	}
}

customElements.define("guide-intro", GuideIntro);
