import { TouchableWithoutFeedback } from "react-native";
import { useRef } from "react";

const DOUBLE_TAP_DELAY = 300; // ms

export default function DoubleTapLike({ onDoubleTap, children }) {
  const lastTap = useRef<number | null>(null);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < DOUBLE_TAP_DELAY) {
      onDoubleTap(); // double tap détecté
    }
    lastTap.current = now;
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      {children}
    </TouchableWithoutFeedback>
  );
}
