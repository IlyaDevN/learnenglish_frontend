const RUSSIAN = "ru-ru";
const ENGLISH_GB = "en-gb";
// const ENGLISH_US = "en-us";

export async function getTheSound( sentences, isRusEng, randomNumber, setQuestionAudioSrc ) {
  // https://www.voicerss.org/
  // https://rapidapi.com/voicerss/api/text-to-speech-1

  const phrase = getPhrase(sentences, isRusEng, randomNumber);
  const language = getLanguage(isRusEng);
  const voice = getVoiceAuthor(isRusEng);

  const voiceRssKey = "52d213c3ffdc4966bc0981d33851bd59";
  const url = `https://voicerss-text-to-speech.p.rapidapi.com/?key=${voiceRssKey}`;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "b4aac2313dmsh76bc42e35510648p11ad89jsn97c36d67effd",
      "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
    },
    body: new URLSearchParams({
      src: [phrase],
      hl: [language],
      r: "0",
      c: "mp3",
      v: [voice],
      b64: "true",
      f: "48khz_16bit_stereo",
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    setQuestionAudioSrc(result);
  } catch (error) {
    console.error(error);
  }
}

function getPhrase(sentences, isRusEng, randomNumber) {

	if(sentences.length) {
		if(isRusEng) {
			return sentences[randomNumber].rus_sentence;
		} else {
			return sentences[randomNumber].eng_sentence;
		}
	} else {
		if(isRusEng) {
			return "Конец";
		} else {
			return "The end";
		}			
	}
}

function getLanguage(isRusEng) {
	if(isRusEng) {
		return RUSSIAN;
	} else {
		return ENGLISH_GB;
	}
}

function getVoiceAuthor(isRusEng) {
	if(isRusEng) {
		return "Olga";
	} else {
		return "Alice";
	}
}