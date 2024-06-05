// CustomerScreen.js
import React, { useState, useRef, useEffect } from "react";
import { FlatList } from "react-native";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  useTheme,
  Icon,
  HStack,
  Pressable,
  Spinner,
} from "native-base";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import api from "../api";

const CustomerScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const searchCustomer = async () => {
    setLoading(true);
    try {
      const response = await api.get(`search/customer?keyword=${searchQuery}`);
      setData(response.data.data);
    } catch (error) {
      console.log(error.response)
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <Box bg="tertiary.50" p={3} borderRadius="md" borderColor={"secondary.600"}>
      <Pressable
        onPress={() =>
          navigation.navigate("CustomerDetails", {
            customer: item,
          })
        }
      >
        <VStack space={1}>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Name :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.contact_name}
              </Text>
            </Box>
          </HStack>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Meter No. :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.meter_no}
              </Text>
            </Box>
          </HStack>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Mobile No. :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.contact_phone}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Pressable>
    </Box>
  );

  const renderSeparator = () => <Box height={4} />;

  return (
    <Box safeAreaTop flex={1} bg="background.50">
      <Box p={4} background={"background.700"}>
        <HStack alignItems="center">
          <Box>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                as={<Ionicons name="arrow-back" />}
                size={7}
                color="white"
              />
            </Pressable>
          </Box>
          <Box flex={1}>
            <Input
              color={"white"}
              ref={inputRef}
              placeholder="Search ..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              variant="unstyled"
              bg="transparent"
              py="0"
              px="2"
              fontSize={20}
              placeholderTextColor={"white"}
            />
          </Box>
          <Box>
            <Pressable onPress={() => searchCustomer()}>
              <Icon
                as={<Octicons name="search" size={24} color="black" />}
                size={7}
                color="white"
              />
            </Pressable>
          </Box>
        </HStack>
      </Box>
      {loading && <Spinner mt={4} />}
      {!loading && data.length > 0 && (
        <FlatList
          style={{ padding: 16 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={renderSeparator}
        />
      )}
    </Box>
  );
};

export default CustomerScreen;