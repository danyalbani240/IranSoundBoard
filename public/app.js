//adding waveSurfer

var wavesurfer = WaveSurfer.create({
	container: "#waveform",
	waveColor: "violet",
	progressColor: "purple",
});
const toggleBtn = document.querySelector("#toggleBtn");
const audio = document.getElementById("audio");

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
	document.querySelector("footer").style.display = "flex";
	audio.src = soundFile;
	audio.load();
	// Check if the sound file is already loaded in Wavesurfer
	if (wavesurfer.getDuration() === 0) {
		// If not, load it and wait for it to finish loading before playing
		wavesurfer.load(soundFile);
		wavesurfer.on("ready", function () {
			wavesurfer.play();
		});
	} else {
		// If it's already loaded, just play it
		wavesurfer.play();
	}
}

getSounds();

//ToggleBtn Handler
toggleBtn.addEventListener("click", () => {
	if (wavesurfer.isPlaying()) {
		// Stop Wavesurfer and hide the visualization
		wavesurfer.pause();
		toggleBtn.innerHTML = "<span>&#9658;</span>";
	} else {
		// Start Wavesurfer and show the visualization
		toggleBtn.innerHTML = "<span>&#10074;&#10074;</span>";

		wavesurfer.play();
	}
});
