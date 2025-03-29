export default function AudioPlayer({ src, audioRef }) {
  	
	return (
    <audio
      ref={audioRef}
      src={src}
      type="audio/mpeg"
    ></audio>
  );
}
