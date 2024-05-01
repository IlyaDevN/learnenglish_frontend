export default function AudioPlayer({ src }) {
  return (
    <audio
      autoPlay="autoPlay"
      href="audio_tag"
      src={src}
      type="audio/mpeg"
      //  controls
    ></audio>
  );
}
