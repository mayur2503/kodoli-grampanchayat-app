import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Icon,
  HStack,
  Pressable,
  Modal,
  Image,
} from "native-base";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
const ReadingItem = ({ reading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Box
      key={reading.id}
      bg="tertiary.50"
      p={4}
      borderRadius="md"
      borderColor={"secondary.600"}
    >
      <VStack space={1}>
        <HStack space={2} flex={1}>
          <Box>
            <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
              Reading ID :
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={16}
              color={"tertiary.500"}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              #{reading.id}{" "}
              <Icon
                as={<Feather name="eye" size={16} color="#1a7f96" />}
                onPress={() => setModalVisible(true)}
              />
            </Text>
          </Box>
        </HStack>
        <HStack>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Reading :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {reading.reading}
              </Text>
            </Box>
          </HStack>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Last Reading :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {reading.previous_reading}
              </Text>
            </Box>
          </HStack>
        </HStack>
        <HStack>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Month :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {reading.reading_month}
              </Text>
            </Box>
          </HStack>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Year :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {reading.reading_year}
              </Text>
            </Box>
          </HStack>
        </HStack>
        <HStack space={2} flex={1}>
          <Box>
            <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
              Bill Generated :
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={16}
              color={"tertiary.500"}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {reading.bill_generated ? "Yes" : "No"}{" "}
              {reading.bill_generated ? `(#${reading.bill_id})` : null}
            </Text>
          </Box>
        </HStack>
        <HStack space={2} flex={1}>
          <Box>
            <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
              Created At :
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={16}
              color={"tertiary.500"}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {moment(reading.created_at).format("MMMM Do YYYY, h:mm:ss a")}
            </Text>
          </Box>
        </HStack>
      </VStack>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton onPress={() => setModalVisible(false)} />
          <Modal.Header>Reading Image</Modal.Header>
          <Modal.Body>
            <Image
              source={{ uri: reading.reading_image }} // Replace with your image URL
              style={styles.modalImage}
              alt="Reading Image"
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
  },
});

export default ReadingItem;
