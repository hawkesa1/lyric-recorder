function loadTutorial() {
	var audio = document.getElementById('audio');
	audio.src = "./resources/tutorial/TUTORIAL.MP3";
	loadWaveForm('./resources/tutorial/', "TUTORIAL");
	loadLyricsData('./resources/tutorial/', "TUTORIAL");
	currentStateStore.currentSongId = "TUTORIAL";
	audio.load();
	audio.addEventListener('loadedmetadata',
			function() {
				currentStateStore.trackDuration = document
						.getElementById('audio').duration * 100;
			});

	$('#lyricText').hide();
	$('#lyrics').show();
	currentStateStore.currentLyricView = "WORD_VIEW";

}


function loadATrack2(selectedValue) {
	console.log("SelectedValue:" + selectedValue);
	var audio = document.getElementById('audio');
	audio.src = mp3Location + selectedValue + ".MP3";
	loadWaveForm('./resources/wavForm/', selectedValue);
	currentStateStore.currentSongId = selectedValue;
	audio.load();
	audio.addEventListener('loadedmetadata',
			function() {
				currentStateStore.trackDuration = document
						.getElementById('audio').duration * 100;
			});
	$('#lyricText').hide();
	$('#lyrics').show();
	currentStateStore.currentLyricView = "WORD_VIEW";
}


function loadATrack(selectedValue) {
	console.log("SelectedValue:" + selectedValue);
	var audio = document.getElementById('audio');
	audio.src = mp3Location + selectedValue + ".MP3";
	loadWaveForm('./resources/wavForm/', selectedValue);
	loadLyricsData('./resources/mp3MetaData/', selectedValue);
	currentStateStore.currentSongId = selectedValue;
	audio.load();
	audio.addEventListener('loadedmetadata',
			function() {
				currentStateStore.trackDuration = document
						.getElementById('audio').duration * 100;
			});

	$('#lyricText').hide();
	$('#lyrics').show();
	currentStateStore.currentLyricView = "WORD_VIEW";
}

function fileSaver(fileName, textContent) {
	var blob = new Blob([ textContent ], {
		type : "application/json;charset=utf-8"
	});
	saveAs(blob, fileName + ".json");
}

function saveLyricsToBrowser(trackMetaData, songId) {
	
	trackMetaData.lyricRecorderSynchronisedLyrics=currentStateStore.lineArray;
	
	console.log("Save Lyrics1" + songId + trackMetaData);
	console.log(trackMetaData);
	var trackMetaDataAsString=JSON.stringify(trackMetaData, null, 2);
	fileSaver(songId, trackMetaDataAsString);
}

function saveLyricsToServer(JSONFormattedLyricData, songId) {
	$.ajax({
		type : 'POST',
		url : './LyricUploadServlet',
		data : {
			"JSONFormattedLyricData" : JSONFormattedLyricData,
			"songId" : songId
		},
		success : function(text) {
			successfullySavedLyrics(text);
		},
		error : function(xhr) {
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		}
	});
	function successfullySavedLyrics(mp3MetaData1) {
		var mp3MetaData = JSON.parse(mp3MetaData1);
		var text = mp3MetaData.title ? mp3MetaData.title : mp3MetaData.uniqueId;
		console.log(mp3MetaData);
		console.log("uniqueid" + mp3MetaData.downloadId);
		setTimeout(function() {
			var linkAddress = downloadableMp3Location + mp3MetaData.downloadId;
			console.log("downloadableMp3Location: " + linkAddress);
			$('#downloadableLink').html(
					"<a href='" + linkAddress + "' download='" + text
							+ ".MP3'>" + text + ".MP3</a>");
		}, currentStateStore.ECLIPSE_FILE_WAIT);
	}
}

function loadWaveForm(location, wavFormFile) {
	$.ajax({
		type : 'GET',
		url : location + wavFormFile + '.TXT',
		data : null,
		success : function(text) {
			processResponse(text);
		}
	});
	function processResponse(text) {
		lyricTracker.generateWaveForm(text);
	}
}

function loadLyricsData(location, wavFormFile) {
	$.ajax({
		type : 'GET',
		url : location + wavFormFile + '.json',
		data : null,
		cache : false,
		success : function(text) {

			generateLyricData(text);
		},
		error : function(xhr) {
			// alert("An error occured: " + xhr.status + " " + xhr.statusText);
			generateLyricData("");
		}
	});
	function generateLyricData(trackMetaData) {
		console.log("Hoopla:" + trackMetaData)
		if (trackMetaData.lyricRecorderSynchronisedLyrics
				&& trackMetaData.lyricRecorderSynchronisedLyrics != "") {
			console.log("loading synchronised lyrics");
			
			//loadMetaData(trackMetaData);
			
			try {
				resetStuff();
				updatePageDetails(trackMetaData);
				currentStateStore.trackMetaData = trackMetaData;
				currentStateStore.lineArray =JSON.parse(trackMetaData.lyricRecorderSynchronisedLyrics);
				$('#lyrics').html(generateLyrics(currentStateStore.lineArray));
				addClickToLyrics();
			} catch (e) {
				console.log("Error loading synchronised lyrics");
				resetStuff();
				enableLyricTextView("Please enter some lyrics here ...")
			}
		} else if (trackMetaData.unsynchronisedLyrics != "") {
			console.log("loading unsycnhronised lyrics");
			resetStuff();
			enableLyricTextView(trackMetaData.unsynchronisedLyrics);
		} else {
			console.log("No lyrics found");
			currentStateStore.trackMetaData = trackMetaData;
			resetStuff();
			enableLyricTextView("Please enter some lyrics here ...")
		}
	}
}


function loadMetaData(trackMetaData)
{
	resetStuff();
	updatePageDetails(trackMetaData);
	currentStateStore.trackMetaData = trackMetaData;
	currentStateStore.lineArray =trackMetaData.lyricRecorderSynchronisedLyrics;
	$('#lyrics').html(generateLyrics(currentStateStore.lineArray));
	addClickToLyrics();
}
