import { useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Canvas, Rect } from "@shopify/react-native-skia";
import { THEME } from "../../styles/theme";
import { useEffect } from "react";

const COLORS = [
  "transparent",
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
];

type OverlayFeedbackProps = {
  status: number;
};

export function OverlayFeedback({ status }: OverlayFeedbackProps) {
  const { height, width } = useWindowDimensions();
  const opacity = useSharedValue(0);

  const color = COLORS[status];

  const ContainerStyleAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0)
    );
  }, [status]);

  return (
    <Animated.View
      style={[
        {
          height,
          width,
          position: "absolute",
        },
        ContainerStyleAnimated,
      ]}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} height={height} width={width} color={color} />
      </Canvas>
    </Animated.View>
  );
}
