import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import { Box, HStack, Icon, Pressable, ScrollView } from "native-base";
import { Entypo } from "@expo/vector-icons";

const CollapsibleComponent = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const animation = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(0);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!collapsed);
    Animated.timing(animation, {
      toValue: collapsed ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight.current], // Change this value based on your content height
  });

  const animatedStyle = {
    height: heightInterpolate,
    overflow: "scroll",
  };
  const handleLayout = (event) => {
    contentHeight.current = event.nativeEvent.layout.height;
  };
  return (
    <Box style={{ marginVertical: 10 }}>
      <Pressable onPress={toggleCollapse}>
        <Box alignContent={"center"} flex={1} bg="tertiary.50" p={2}>
          <HStack
            justifyContent={"space-between"}
            alignContent={"center"}
            flex={1}
            alignItems={"center"}
          >
            <Text style={{ fontWeight: "bold", marginRight: 5, fontSize: 16 }}>
              {title}
            </Text>
            <Icon
              as={
                <Entypo
                  name={collapsed ? "chevron-small-down" : "chevron-small-up"}
                  size={24}
                  color="black"
                />
              }
            />
          </HStack>
        </Box>
      </Pressable>
      <Animated.View
        style={[
          animatedStyle,
          {
            // marginTop: 10,
            // padding: 10,
          },
        ]}
      >
        <View
          style={{
            // marginVertical: 20,
            paddingTop:20
          }}
          onLayout={handleLayout}
        >
          {children}
        </View>
      </Animated.View>
    </Box>
  );
};

export default CollapsibleComponent;
