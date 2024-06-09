import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  Box,
  Text,
  HStack,
  Pressable,
  Icon,
  VStack,
  ScrollView,
  Input,
  Button,
  Spinner,
  Image,
} from "native-base";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../api";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

const AddReading = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOn, setCameraOn] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readingLoader, setReadingLoader] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const navigation = useNavigation();
  const [meter_no, setMeterNo] = useState("");
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params?.meter_no) {
      setMeterNo(route.params.meter_no);
      searchCustomer(route.params.meter_no);
    }
  }, [isFocused]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImage(photo.uri);
      setCameraOn(false);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const searchCustomer = async (meter_no = "") => {
    setCustomerDetails(null);
    if (!meter_no) {
      return;
    }
    setLoading(true);
    // console.log(meter_no)
    try {
      if (customerDetails != null) {
        setCustomerDetails(null);
      }
      const response = await api.get(
        `search/customer/meter?meter_no=${meter_no}`
      );
      setCustomerDetails(response.data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) {
          alert("Customer Not found");
        }
        // console.error('Response status:', error.response.status);
        // console.error('Response data:', error.response.data);
      }
    }
    setLoading(false);
  };
  const [reading, setReading] = useState("");
  useEffect(() => {
    (async () => {
     await requestPermission()
    })();
  }, []);

  const addReading = async () => {
    if (readingLoader) {
      return;
    }
    if (!image) {
      alert("Image not selected");
      return;
    }
    if (!reading) {
      alert("Reading is empty");
      return;
    }
    const formData = new FormData();
    formData.append("reading_image", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    formData.append("reading", reading);
    formData.append("client_id", customerDetails.id);
    formData.append("reading_month", moment(date).format("MMM"));
    formData.append("reading_year", moment(date).format("YYYY"));
    setReadingLoader(true);
    try {
      const response = await api.post("reading/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCustomerDetails(null);
      setImage(null);
      setReading("");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setReadingLoader(false);
  };

  return (
    <Box safeAreaTop bg="background.50" style={{ flex: 1 }}>
      {isCameraOn ? (
        <Box flex={1} justifyContent={"center"} p={5}>
          <Box
            borderWidth={2}
            color={"white"}
            borderColor={"white"}
            height={40}
          >
            <CameraView
              style={{ flex: 1, width: "100%", height: 40 }}
              ref={(ref) => setCameraRef(ref)}
            ></CameraView>
          </Box>
          <Box alignSelf="center">
            <Button
              onPress={takePicture}
              leftIcon={<Icon as={MaterialIcons} name="camera" size="sm" />}
            >
              Take Photo
            </Button>
          </Box>
        </Box>
      ) : (
        <>
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
                <Text fontSize={20} color={"white"}>
                  Add Reading
                </Text>
              </Box>
            </HStack>
          </Box>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              flex: 1,
            }}
          >
            <ScrollView flex={1}>
              <VStack p={5} space={5}>
                <HStack space={2} alignItems="center">
                  <Input
                    placeholder="Search"
                    variant="filled"
                    width="75%"
                    keyboardType="numeric"
                    value={meter_no}
                    onChangeText={setMeterNo}
                    borderRadius="10"
                    borderColor={"secondary.600"}
                    bg="background.50"
                    py="1"
                    px="2"
                    height="12"
                    _web={{
                      _focus: { borderColor: "muted.300" },
                    }}
                  />
                  <Button
                    flex={1}
                    onPress={() => searchCustomer(meter_no)}
                    bgColor={"background.700"}
                    height="12"
                  >
                    Search
                  </Button>
                </HStack>
                {loading && <Spinner size="lg" color="blue.500" />}
                {customerDetails && (
                  <>
                    <Box
                      bg="tertiary.50"
                      p={4}
                      borderRadius="md"
                      borderColor={"secondary.600"}
                    >
                      <VStack space={1}>
                        <HStack space={2} flex={1}>
                          <Box>
                            <Text
                              fontSize={16}
                              fontWeight={"bold"}
                              color={"tertiary.700"}
                            >
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
                              {customerDetails?.contact_name}
                            </Text>
                          </Box>
                        </HStack>
                        <HStack space={2} flex={1}>
                          <Box>
                            <Text
                              fontSize={16}
                              fontWeight={"bold"}
                              color={"tertiary.700"}
                            >
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
                              {customerDetails?.meter_no}
                            </Text>
                          </Box>
                        </HStack>
                        <HStack space={2} flex={1}>
                          <Box>
                            <Text
                              fontSize={16}
                              fontWeight={"bold"}
                              color={"tertiary.700"}
                            >
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
                              9145185567
                            </Text>
                          </Box>
                        </HStack>
                        <HStack space={2} flex={1}>
                          <Box>
                            <Text
                              fontSize={16}
                              fontWeight={"bold"}
                              color={"tertiary.700"}
                            >
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
                              {customerDetails?.last_reading?.reading
                                ? customerDetails?.last_reading?.reading
                                : "Not Available"}
                            </Text>
                          </Box>
                        </HStack>
                        <HStack space={2} flex={1}>
                          <Box>
                            <Text
                              fontSize={16}
                              fontWeight={"bold"}
                              color={"tertiary.700"}
                            >
                              Last Reading Date :
                            </Text>
                          </Box>
                          <Box flex={1}>
                            <Text
                              fontSize={16}
                              color={"tertiary.500"}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {customerDetails?.last_reading?.created_at
                                ? moment(
                                    customerDetails?.last_reading?.created_at
                                  ).format("MMMM Do YYYY")
                                : "Not Available"}
                            </Text>
                          </Box>
                        </HStack>
                      </VStack>
                    </Box>

                    {image ? (
                      <Box position="relative">
                        <Image
                          src={image}
                          alt="reading image"
                          width={"100%"}
                          height={40}
                        />
                        <Box
                          position="absolute"
                          top="2"
                          right="2"
                          height={8}
                          width={8}
                          background={"white"}
                          p={1}
                          rounded={"full"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          alignContent={"center"}
                        >
                          <Icon
                            as={AntDesign}
                            name="delete"
                            size="sm"
                            color="secondary.700"
                            onPress={() => setImage(null)}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <HStack space={2}>
                        <Pressable flex={1} onPress={() => setCameraOn(true)}>
                          <Box
                            justifyContent={"center"}
                            alignItems={"center"}
                            height={40}
                            borderWidth={2}
                            flex={1}
                            rounded={"md"}
                            borderColor={"secondary.600"}
                          >
                            <Feather name="camera" size={30} color="#1a7f96" />
                          </Box>
                        </Pressable>
                      </HStack>
                    )}
                    <Box>
                      <Input
                        width={"100%"}
                        keyboardType="numeric"
                        placeholder="Current Reading"
                        variant="filled"
                        value={reading}
                        borderRadius="10"
                        borderColor={"secondary.600"}
                        bg="background.50"
                        py="1"
                        px="2"
                        height="12"
                        _web={{
                          _focus: { borderColor: "muted.300" },
                        }}
                        onChangeText={setReading}
                        //   onPress={setShow(true)}
                      />
                    </Box>
                    <Box>
                      <Pressable
                        borderWidth={1}
                        height={12}
                        borderRadius="7"
                        borderColor={"secondary.600"}
                        py="1"
                        px="2"
                        flex={1}
                        display={"flex"}
                        justifyContent={"center"}
                        onPress={() => setShow(true)}
                      >
                        <Box>
                          <Text fontSize={16}>{date.toLocaleDateString()}</Text>
                        </Box>
                      </Pressable>

                      {show && (
                        <DateTimePicker
                          style={{
                            width: "100%",
                            flex: 1,
                          }}
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          onChange={onChange}
                        />
                      )}
                    </Box>
                    <Box>
                      <Button onPress={addReading} colorScheme={"secondary"}>
                        {readingLoader ? <Spinner /> : "Add Reading"}
                      </Button>
                    </Box>
                  </>
                )}
              </VStack>
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      )}
    </Box>
  );
};

export default AddReading;
