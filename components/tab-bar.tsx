import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import TabbarButton from "./tabbar-button";
import { icons } from "@/assets/icons";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const primaryColor = "#0891b2";
  const greyColor = "#737373";

  // const icons: { [key: string]: (props: any) => JSX.Element } = {
  //   index: (props: any) => (
  //     <AntDesign name="home" size={26} color={greyColor} {...props} />
  //   ),
  //   create: (props: any) => (
  //     <AntDesign name="pluscircleo" size={26} color={greyColor} {...props} />
  //   ),
  //   explore: (props: any) => (
  //     <Feather name="compass" size={26} color={greyColor} {...props} />
  //   ),
  //   profile: (props: any) => (
  //     <AntDesign name="user" size={26} color={greyColor} {...props} />
  //   ),
  // };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabbarButton
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : greyColor}
            label={label as string}
          />
        );

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {icons[route.name]({
              color: isFocused ? primaryColor : greyColor,
            })}

            <Text
              style={{
                color: isFocused ? primaryColor : greyColor,
                fontSize: 11,
              }}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
