// getting all the sounds from the node web server file

function getSounds() {
	// getting all the elements
	const soundsList = document.getElementById("sounds-list");

	fetch("soundsList.json")
		.then((response) => response.json())
		.then((files) => {
			files.forEach((file) => {
				//only create for mp3 files
				if (file.endsWith(".mp3")) {
					const soundName = file.substring(0, file.lastIndexOf("."));
					const li = document.createElement("li");
					const btn = document.createElement("button");
					//naming them their exact file name
					btn.textContent = soundName;
					//when clicked play the sound
					btn.addEventListener("click", function () {
						playSound(`sounds/${file}`);
					});
					li.appendChild(btn);
					soundsList.appendChild(li);
				}
			});
		})
		.catch((error) => console.error(error));
}

// Play a sound file by setting the source of the audio element and calling play()

function playSound(soundFile) {
	const audio = document.getElementById("audio");
	audio.src = soundFile;
	audio.play();
}

getSounds();
