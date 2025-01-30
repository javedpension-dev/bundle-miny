import { automill } from "../systems/combat/Placement/mill.js";
import loadRender from "../systems/render/render.js";
import log from "../utils/log.js";
import SoundManager from "../utils/sound.js";

export default function addDocumentListeners() {
	document.addEventListener("keydown", (event) => {
		switch (event.keyCode) {
			case 78:
				automill.do = !automill.do;
				break;
		}
	});

	document.addEventListener("keyup", (event) => {});

	window.onload = () => {
		loadRender();
		SoundManager.play("menu", 0.9345, true);

		const loginButton = document.createElement("button");
		loginButton.innerText = "Login with Discord";
		loginButton.style.position = "fixed";
		loginButton.style.top = "10px";
		loginButton.style.right = "10px";
		loginButton.style.padding = "10px";
		loginButton.style.backgroundColor = "#5865F2";
		loginButton.style.color = "white";
		loginButton.style.border = "none";
		loginButton.style.borderRadius = "5px";
		loginButton.style.cursor = "pointer";
		loginButton.style.zIndex = 999;
		document.body.appendChild(loginButton);

		function getQueryParam(param) {
			const urlParams = new URLSearchParams(window.location.search);
			return urlParams.get(param);
		}

		loginButton.addEventListener("click", () => {
			window.location.href = "https://piquant-versed-lead.glitch.me/login";
		});

		const token = getQueryParam("token");
		if (token) {
			fetch(`https://piquant-versed-lead.glitch.me/user?token=${token}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.id) {
						window.clientAccount = data;
						localStorage.setItem(
							"clientAccount",
							JSON.stringify(window.clientAccount),
						);

						// removes the token part from the url
						window.history.replaceState(
							{},
							document.title,
							window.location.pathname,
						);
					}
				})
				.catch((err) => log.error("failed to fetch from server", err));
		}

		if (!window.clientAccount) {
			// lets try getting from localstorage
			const localstorage = JSON.parse(localStorage.getItem("clientAccount"));

			if (localstorage) {
				window.clientAccount = localstorage;
			}

			document.getElementById("enterGame").addEventListener("click", () => {
				// wiggle the discord login button

				loginButton.style.animation = "wiggle 0.5s ease-in-out";

				setTimeout(() => {
					loginButton.style.animation = "";
				}, 500);
			});
		} else
			localStorage.setItem(
				"clientAccount",
				JSON.stringify(window.clientAccount),
			);
	};

	const style = document.createElement("style");
	style.innerHTML = `
    @keyframes wiggle {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(5deg); }
      50% { transform: rotate(-5deg); }
      75% { transform: rotate(5deg); }
      100% { transform: rotate(0deg); }
    }

    .menuButton {
      background-color: #777 !important;
    }
  `;
	document.head.appendChild(style);
}
