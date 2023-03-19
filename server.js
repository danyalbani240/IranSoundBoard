// Importing file system and path modules
const fs = require("fs");
const path = require("path");
// Defining directory path where sound files are located

const directoryPath = path.join(__dirname, "public/Sounds");
// Reading directory to get list of all files
fs.readdir(directoryPath, function (err, files) {
	if (err) {
		return console.log("Unable to scan directory: " + err);
	}
	// Filtering only mp3 files
	const sounds = files.filter((file) => file.endsWith(".mp3"));
	// Writing sound list to JSON file so we can use it like an api source

	fs.writeFile(
		"public/soundsList.json",
		JSON.stringify(sounds),
		function (err) {
			if (err) {
				return console.log("Error writing file: " + err);
			}
			console.log("Sounds list generated");
		}
	);
});
// Executing live-server using child_process module(only works on the debugger)
const { exec } = require("child_process");

exec("npx live-server public --browser=chrome");
