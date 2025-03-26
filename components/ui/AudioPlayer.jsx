export default function AudioPlayer({ src, audioRef }) {

  return (
    <audio
      // autoPlay="autoPlay"
      // href="audio_tag"
      ref={audioRef}
      src={src}
      type="audio/mpeg"
      // controls
    ></audio>
  );
}
