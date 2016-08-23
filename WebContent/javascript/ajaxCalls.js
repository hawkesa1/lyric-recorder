
function loadATrack(selectedValue) {
	var audio = document.getElementById('audio');
	audio.src = mp3Location + selectedValue + ".MP3";
	loadWaveForm(selectedValue);
	loadLyricsData(selectedValue);
	currentSongId = selectedValue;
	audio.load();
	audio.addEventListener('loadedmetadata', function() {
		trackDuration = document.getElementById('audio').duration * 100;
	});
	for (var i = 0; i < availableTracks.length; i++) {
		if (availableTracks[i].uniqueId == selectedValue) {
			$('#trackTitle').html(availableTracks[i].title);
			$('#trackArtist').html(availableTracks[i].artist);
			$('#trackAlbum').html(availableTracks[i].album);
		}
	}
	$("#loadTrack").val(selectedValue);
	$('#lyricText').hide();
	$('#lyricScript').hide();
	$('#lyrics').show();
	currentLyricView = "WORD_VIEW";
}

function saveLyrics(JSONFormattedLyricData, songId) {
	console.log("Save Lyrics"+ songId + JSONFormattedLyricData);
	
	
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
		var mp3MetaData=JSON.parse(mp3MetaData1);
		var text=mp3MetaData.title ? mp3MetaData.title : mp3MetaData.uniqueId;
		console.log(mp3MetaData);
		console.log("uniqueid"+  mp3MetaData.downloadId);
		
		
	
		setTimeout(function() {
			var linkAddress=downloadableMp3Location + mp3MetaData.downloadId;
			console.log("downloadableMp3Location: "+  linkAddress);
			$('#downloadableLink').html("<a href='"+linkAddress+"' download='"+text+".MP3'>"+text+".MP3</a>");
		}, ECLIPSE_FILE_WAIT);
		
		
	}
}

var anAvailableTrack;

function loadUser(trackToLoadOnCompletion) {
	$.ajax({
		type : 'GET',
		url : './GetAvailableTracks',
		data : {
			"userId" : "hawkesa",
		},
		success : function(text) {
			availableTracks = new Array();
			for (var i = 0; i < text.mp3MetaDatas.length; i++) {
				anAvailableTrack = new TrackObject();
				anAvailableTrack.title = text.mp3MetaDatas[i].title;
				anAvailableTrack.album = text.mp3MetaDatas[i].album;
				anAvailableTrack.artist = text.mp3MetaDatas[i].artist;
				anAvailableTrack.uniqueId = text.mp3MetaDatas[i].uniqueId;
				availableTracks[i] = anAvailableTrack;
				addTrack(text.mp3MetaDatas[i].uniqueId,
						text.mp3MetaDatas[i].title)
			}
			if (trackToLoadOnCompletion === 'first') {
				loadATrack(text.mp3MetaDatas[0].uniqueId);
			} else if (trackToLoadOnCompletion === 'last') {
				loadATrack(text.mp3MetaDatas[text.mp3MetaDatas.length-1].uniqueId);
			} else {
				// do nothing
			}
		},
		error : function(xhr) {
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		}
	});
}

function loadWaveForm(wavFormFile) {
	$.ajax({
		type : 'GET',
		url : './resources/wavForm/' + wavFormFile + '.TXT',
		data : null,
		success : function(text) {
			processResponse(text);
		}
	});
	function processResponse(text) {
		generateWaveForm(text);
	}
}

function loadLyricsData(wavFormFile) {
	$.ajax({
		type : 'GET',
		url : './resources/mp3MetaData/' + wavFormFile + '.json',
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
	function generateLyricData(text) {
		if (text.lyricRecorderSynchronisedLyrics && text.lyricRecorderSynchronisedLyrics !="")
		{
			console.log("loading synchronised lyrics");
			resetStuff();
			lineArray=JSON.parse(text.lyricRecorderSynchronisedLyrics);
			$('#lyrics').html(generateLyrics(lineArray));
			addClickToLyrics();
		}	else if(text.unsynchronisedLyrics !="")
		{
			console.log ("loading unsycnhronised lyrics");
			resetStuff();
			enableLyricTextView(text.unsynchronisedLyrics);
		}
		else
		{
			console.log ("No lyrics found");
			resetStuff();
			enableLyricTextView("Please enter some lyrics here ...")
		}	
	}
}
