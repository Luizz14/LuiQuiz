import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  Pressable,
} from "react-native";

import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

import { THEME } from "../../styles/theme";
import { styles } from "./styles";
import { useEffect } from "react";
import Animated from "react-native-reanimated";

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = TouchableOpacityProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1);
  const checked = useSharedValue(0);

  const COLOR = TYPE_COLORS[type];

  const ContainerReanimated = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", COLOR]
      ),
    };
  });

  // const animatedTextStyles = useAnimatedStyle(() => {
  //   return {
  //     color: interpolateColor(
  //       checked.value,
  //       [0, 1],
  //       [COLOR, THEME.COLORS.GREY_100]
  //     ),
  //   };
  // });

  function onPressIn() {
    scale.value = withTiming(1.1);
  }

  function onPressOut() {
    scale.value = withTiming(1);
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0);
  }, [isChecked]);

  return (
    <PressableAnimated
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.container,
        ContainerReanimated,
        {
          borderColor: COLOR,
        },
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.title,
          { color: isChecked ? THEME.COLORS.GREY_100 : COLOR },
        ]}
      >
        {title}
      </Text>
    </PressableAnimated>
  );
}
