import { useEffect } from "react";
import { View, Text, Touchable, Pressable } from "react-native";
import { icons } from "@/assets/icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface TabbarButtonProps {
  isFocused: boolean;
  label: string;
  routeName: string;
  color: string;
  style?: object;
  onPress: () => void;
  onLongPress: () => void;
}

const TabbarButton: React.FC<TabbarButtonProps> = (props) => {
  const { isFocused, label, routeName, color, onPress, onLongPress } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      // styles
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      // styles
      opacity,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Animated.View style={[animatedIconStyle]}>
        {icons[routeName]({
          color,
        })}
      </Animated.View>

      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabbarButton;
