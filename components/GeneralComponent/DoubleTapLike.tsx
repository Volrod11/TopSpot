import { TouchableWithoutFeedback } from "react-native";
import { useRef } from "react";

const DOUBLE_TAP_DELAY = 300; // ms

type DoubleTapLikeProps = {
  onDoubleTap: () => void;
  onSingleTap?: () => void; // ✅ optionnel
  children: React.ReactNode;
};

export default function DoubleTapLike({ onDoubleTap, onSingleTap, children }: DoubleTapLikeProps) {
  const lastTap = useRef<number | null>(null);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      onDoubleTap?.(); // ✅ double tap
      lastTap.current = null;
    } else {
      lastTap.current = now;
      // ✅ Single tap déclenché uniquement si défini
      setTimeout(() => {
        if (lastTap.current && now === lastTap.current) {
          onSingleTap?.(); // ✅ ne s'exécute que si fourni
          lastTap.current = null;
        }
      }, DOUBLE_TAP_DELAY);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      {children}
    </TouchableWithoutFeedback>
  );
}
