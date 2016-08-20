function loadUploader() {
	console.log("Loading Uploader");

	var holder = document.getElementById('fileUploadHolder');

	function readfiles(files) {
		clearConsole();
		var formData = new FormData();
		var file;
		for (var i = 0; i < files.length; i++) {
			file = files[i]
			if (i == 0) { // only allow 1 file at a time
				if (file.type.split("/")[0] === "audio") {
					if (file.size < (15 * 1024 * 1024)) {
						formData.append('file', file);
						updateConsole('<p>* Reading file: ' + file.name
								+ '</p>');
						extractTags(file, formData);
					} else {
						updateConsole("<p class='bad'>* The maximum file size is 15 Mb.  This file is: '+ parseFloat((file.size / 1024 / 1024)).toFixed(2) + ' Mb</p>");
					}
				} else {
					updateConsole("<p class='bad'>* This is not an audio file: <i>"
							+ file.name + "</i>.  Please try again..</p>");
				}

			}
		}
	}
	holder.ondragover = function() {
		this.className = 'hover';
		return false;
	};
	holder.ondragend = function() {
		this.className = '';
		return false;
	};
	holder.ondragleave = function() {
		this.className = '';
		return false;
	};
	holder.ondrop = function(e) {
		// this.className = '';
		// e.preventDefault();
		// readfiles(e.dataTransfer.files);

		e.preventDefault();
		e.stopPropagation();

		var files = e.dataTransfer.files;
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			
			playAlex(file, e);
			
			//var reader = new FileReader();
			//reader.addEventListener('load', function(e) {
			//	var data = e.target.result
		//		context.decodeAudioData(data, function(buffer) {
		//			playSound(buffer)
		//		})
		//	})
		//	reader.readAsArrayBuffer(file)
		}

	}
}

function playAlex(file, e)
{
	console.log("Hello");
	
	var audio = new Audio();
	audio.src = 'myfile.mp3';
	audio.controls = true;
	audio.autoplay = true;
	document.body.appendChild(audio);
	
}


var source;

var playSound = function(buffer) {
	source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start(0);
}

var context = new AudioContext();

function updateConsole(text) {
	var holder = document.getElementById('fileUploadHolder');
	holder.innerHTML += text;
	$('#fileUploadHolder').scrollTop($('#fileUploadHolder')[0].scrollHeight);
}
function clearConsole(text) {
	var holder = document.getElementById('fileUploadHolder');
	holder.innerHTML = "";
}

function extractTags(file, formData) {
	var url = file.urn || file.name;
	var tXxxDescription;
	var tXxxWavPointsDescription = "LYRICRECORDER.COM_WAVPOINTS_0.0.1";
	var tXxxLyricsDescription = "LYRICRECORDER.COM";
	var tXxxWavPointsValue;
	var tXxxLyricsValue;
	var tXxxWavPointsValid = false;
	var tXxxLyricsValid = false;

	updateConsole('<p>* Checking for existing tags</p>');

	ID3.loadTags(url, function() {
		var tags = ID3.getAllTags(url);

		if (tags.TXXX) {
			for (var i = 0; i < tags.TXXX.length; i++) {
				tXxxDescription = tags.TXXX[i].data.description;
				if (tXxxDescription == tXxxWavPointsDescription) {
					tXxxWavPointsValue = tags.TXXX[i].data.text;
					tXxxWavPointsValid = true;
				} else if (tXxxDescription == tXxxLyricsDescription) {
					tXxxLyricsValue = tags.TXXX[i].data.text;
					tXxxLyricsValid = true;
				}
			}
		}
		var results = {
			album : tags.album,
			artist : tags.artist,
			title : tags.title,
			tXxxWavPointsValue : tXxxWavPointsValue,
			tXxxLyricsValue : tXxxLyricsValue,
			tXxxWavPointsValid : tXxxWavPointsValid,
			tXxxLyricsValid : tXxxLyricsValid

		};
		functionToCallWhenID3TagRead(results, formData)
	}, {
		dataReader : ID3.FileAPIReader(file)
	});
}

function functionToCallWhenID3TagRead(tags, formData) {
	if (tags.tXxxLyricsValid && tags.tXxxWavPointsValid) {
		updateConsole("<p class='good'>* Found valid tags</p>");
		console.log(formData.get('file').name);

		var audio = document.getElementById('sound');
		audio.src = formData.get('file').name;

		console.log(tags);
	} else {
		updateConsole('<p>* No valid tags found</p>');
		performUpload(formData);
	}

}

function performUpload(formData) {
	updateConsole('<p id=\'fileUploadProgress\'>* Step 1/3 Uploading file to server 0%</p>');
	var xhr = new XMLHttpRequest();
	xhr.open('POST', './FileUpload');
	xhr.onload = function(progressEvent) {
		// progress.value = progress.innerHTML = 100;
		var fileConversionProgress = document
				.getElementById('fileConversionProgress');
		fileConversionProgress.innerHTML = "* Step 2/3 Converting file 100%";
		window.clearInterval(conversionIntervalFunction);
		conversionProgress = 0;

		updateConsole('<p>* Step 3/3 Downloading file and preparing interface</p>');
		if (progressEvent.target.response == "ERROR") {
			console.log("Some sort of error occurred");
			updateConsole("<p class='bad'>* An error occurred during the conversion process</p>");
		} else {
			var json = JSON.parse(progressEvent.target.response);
			console.log(json);
			console.log(json.uniqueId);
			addTrack(json.uniqueId, json.title)

			// Only do this when runnign in eclipse!!!!
			updateConsole('<p>* Waiting for eclipse to refresh ...</p>');
			setTimeout(function() {
				loadATrack(json.uniqueId);
				$('#trackTitle').html(json.title);
				$('#trackArtist').html(json.artist);
				$('#trackAlbum').html(json.album);
				holder.innerHTML += '<p>Processing Complete ...</p>';
			}, 5000);
		}

	};

	xhr.onerror = function(event) {
		updateConsole('<p class=\'bad\'>* An error occurred with the upload. Please try again.</p>');
	};

	xhr.upload.onprogress = function(event) {
		if (event.lengthComputable) {
			var complete = (event.loaded / event.total * 100 | 0);
			var holder = document.getElementById('fileUploadProgress');
			holder.innerHTML = "* Step 1/3 Uploading file to server "
					+ complete + "%";
			console.log(complete);
			// window.clearTimeout(timeoutFunction);

			if (complete == 100) {
				updateConsole('<p id=\'fileConversionProgress\'>* Step 2/3 Converting file 0%</p>');
				conversionIntervalFunction = setInterval(
						function() {
							var fileConversionProgress = document
									.getElementById('fileConversionProgress');
							conversionProgress += 1;
							fileConversionProgress.innerHTML = "* Step 2/3 Converting file "
									+ conversionProgress + "%";
							if (conversionProgress >= 100) {
								window
										.clearInterval(conversionIntervalFunction);
							}
						}, 100);
			}
		}
	}
	formData.append('userId', 'hawkesa');
	xhr.send(formData);
}

var conversionProgress = 0;
var conversionIntervalFunction;
