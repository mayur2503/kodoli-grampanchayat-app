// CustomerFilter.js
import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet } from "react-native";
import {
  Box,
  Button,
  Text,
  SectionList,
  Pressable,
  HStack,
  Icon,
  Spinner,
} from "native-base";
import AntDesign from "@expo/vector-icons/AntDesign";

const CustomerFilter = ({
  visible,
  onClose,
  filters,
  selectedFilters,
  handleItemPress,
  loading,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // Initial position is off the screen to the right
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <Box style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <Box safeAreaTop paddingBottom={10}>
            <HStack mb={2} justifyContent={"space-between"}>
              <Box>
                <HStack space={4}>
                  <Text fontSize={16} fontWeight={"semibold"}>
                    Filters
                  </Text>
                  {loading && <Spinner colorScheme={"primary"} />}
                </HStack>
              </Box>
              <Pressable
                onPress={() => {
                  if (!loading) onClose();
                }}
              >
                <Icon as={<AntDesign name="close" />} size={7} />
              </Pressable>
            </HStack>
            <SectionList
              sections={filters}
              keyExtractor={(item, index) => item.id + index}
              renderItem={({ item, section }) => (
                <Pressable
                  onPress={() => {
                    if (!loading) handleItemPress(section, item);
                  }}
                >
                  <Box
                    style={[
                      styles.item,
                      selectedFilters[section.title.key] === item.id &&
                        styles.selectedItem,
                    ]}
                  >
                    <Text>{item.name}</Text>
                  </Box>
                </Pressable>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Box style={styles.header}>
                  <Text fontWeight="bold">{title.name}</Text>
                </Box>
              )}
            />
          </Box>
        </Animated.View>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    backgroundColor: "#f4f4f4",
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  selectedItem: {
    backgroundColor: "#e0e0e0",
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
  },
});

export default CustomerFilter;
