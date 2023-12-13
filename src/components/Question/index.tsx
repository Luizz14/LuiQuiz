import { View, Text, Dimensions } from "react-native";

import { Option } from "../Option";
import { styles } from "./styles";
import Animated, { Keyframe, runOnJS } from "react-native-reanimated";

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  onUnmout: () => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
  onUnmout,
}: Props) {
  const entringAnimation = new Keyframe({
    0: {
      opacity: 0,
      // transform: [{ translateX: SCREEN_WIDTH }, { rotate: "20deg" }],
      transform: [{ translateX: SCREEN_WIDTH }, { rotate: "0deg" }],
    },
    70: {
      opacity: 0.5,
    },
    100: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: "0deg" }],
    },
  });

  const exitingAnimation = new Keyframe({
    from: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: "0deg" }],
    },
    to: {
      opacity: 0,
      transform: [{ translateX: SCREEN_WIDTH * -1 }, { rotate: "0deg" }],
      // transform: [{ translateX: SCREEN_WIDTH * -1 }, { rotate: "-20deg" }],
    },
  });

  return (
    <Animated.View
      entering={entringAnimation.duration(300)}
      exiting={exitingAnimation.duration(300).withCallback((finished) => {
        "worklet";
        if (finished) runOnJS(onUnmout)();
      })}
      style={styles.container}
    >
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </Animated.View>
  );
}
