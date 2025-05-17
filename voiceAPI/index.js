export async function getTheSound(phrase, voiceName, language, setAudioSrc) {
	
	const key = "AIzaSyB_xCqXNevMrDIWl66wjA6OGcOzdgp8tbo";
	const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`;
	const options = {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json"
	  },
	  body: JSON.stringify(
		{
			"audioConfig": {
			  "audioEncoding": "MP3",
			  "pitch": 0,
			  "speakingRate": 1
			},
			"input": {
			  "text": `${phrase}`
			},
			"voice": {
			  "languageCode": `${language}`,
			  "name": `${voiceName}`
			}
		  }
	  )
	};
  
	try {
	  const response = await fetch(url, options);
	  const result = await response.json();
	  console.log("fetch audio");
	  
	  setAudioSrc(`data:audio/mp3;base64,${result.audioContent}`);
	} catch (error) {
	  console.error("Sound request error", error);
	}
  }