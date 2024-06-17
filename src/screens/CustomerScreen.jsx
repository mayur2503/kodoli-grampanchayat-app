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
import CustomerFilter from "../components/CustomerFilter";
import AntDesign from "@expo/vector-icons/AntDesign";

const CustomerScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [data, setData] = useState([]);

  const [filtersLoading, setFiltersLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    if (isFocused) {
      getFilters(selectedFilters);
    }
  }, [isFocused]);

  const searchCustomer = async () => {
    setLoading(true);
    try {
      const response = await api.post(`search/customer?keyword=${searchQuery}`,selectedFilters);
      setData(response.data.data);
    } catch (error) {
      console.log(error.response);
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

  const handleFilterSelect = (section, item) => {
    if(selectedFilters[section.title.key] == item.id){
      setSelectedFilters((prevSelectedItems) => ({
        ...prevSelectedItems,
        [section.title.key]: null,
      }));
      return
    }
    if (section.title.key == "watertank_id") {
      getFilters({ watertank_id: item.id });
      setSelectedFilters((prevSelectedItems) => ({
        ...prevSelectedItems,
        [section.title.dependant]: null,
      }));
    }
    setSelectedFilters((prevSelectedItems) => ({
      ...prevSelectedItems,
      [section.title.key]: item.id,
    }));
  };

  useEffect(() => {
    searchCustomer();
  }, [selectedFilters]);

  const renderSeparator = () => <Box height={4} />;

  const getFilters = async (requestData = {}) => {
    setFiltersLoading(true);
    try {
      const response = await api.post(`filters`, requestData);
      setFilterData(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setFiltersLoading(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
            <HStack space={2}>
              <Pressable onPress={() => searchCustomer()}>
                <Icon
                  as={<Octicons name="search" size={24} color="black" />}
                  size={7}
                  color="white"
                />
              </Pressable>
              <Box>
                <Pressable onPress={() => openModal()}>
                  <Icon
                    as={<AntDesign name="filter" />}
                    size={7}
                    color="white"
                  />
                </Pressable>
              </Box>
            </HStack>
          </Box>
        </HStack>
      </Box>
      <CustomerFilter
        visible={modalVisible}
        onClose={closeModal}
        filters={filterData}
        selectedFilters={selectedFilters}
        handleItemPress={handleFilterSelect}
        loading={filtersLoading}
      />
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
