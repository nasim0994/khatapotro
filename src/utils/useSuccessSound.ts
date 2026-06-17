import { useAudioPlayer } from "expo-audio";

const audioSource = require("@/assets/audio/success.mp3");

export function useSuccessSound() {
  const player = useAudioPlayer(audioSource);

  const playSuccessSound = () => {
    try {
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.log("Audio play error:", error);
    }
  };

  return { playSuccessSound };
}
