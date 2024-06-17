// PendingReadings.js
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
  Center,
} from "native-base";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import api from "../api";
import CustomerFilter from "../components/CustomerFilter";

const PendingReadings = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [filterData, setFilterData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    if (isFocused) {
      getPendingReadings();
      getFilters(selectedFilters);
    }
  }, [isFocused]);

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
    getPendingReadings()
  }, [selectedFilters]);

  const getPendingReadings = async () => {
    setLoading(true);
    try {
      const response = await api.post(`reading/pending`, selectedFilters);
      setData(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

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

  const renderItem = ({ item }) => (
    <Box bg="tertiary.50" p={3} borderRadius="md" borderColor={"secondary.600"}>
      <Pressable
        onPress={() =>
          navigation.navigate("AddReading", {
            meter_no: item.meter_no,
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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Box safeAreaTop flex={1} bg="background.50">
      <Box p={4} background={"background.700"}>
        <HStack alignItems="center" space={4}>
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
            <Text fontSize={16} color={"white"}>
              Pending Reading
            </Text>
          </Box>
          <Box>
            <Pressable onPress={() => openModal()}>
              <Icon as={<AntDesign name="filter" />} size={7} color="white" />
            </Pressable>
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
      {!loading && data.length == 0 && (
        <Center py={6}>
          <Text>No items to display</Text>
        </Center>
      )}
    </Box>
  );
};

export default PendingReadings;
