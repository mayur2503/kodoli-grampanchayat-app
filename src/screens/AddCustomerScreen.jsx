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
  Select,
  FormControl,
  CheckIcon,
  Spinner,
} from "native-base";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../api";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  no_of_flats: Yup.string().required("No Of flats"),
  profile_type: Yup.string().required("Profile Type"),
  contact_name: Yup.string().required("Contact Name is required"),
  watertank_id: Yup.string().required("Water Tank is required"),
  area_id: Yup.string().required("Area is required"),
  connection_type: Yup.string().required("Connection Type is required"),
  contact_phone: Yup.string().required("Contact Phone is required"),
  contact_email: Yup.string().notRequired(),
  arrears: Yup.number()
    .required("Arrears is required")
    .min(0, "Arrears must be a positive number"),
  aadhar_no: Yup.string().required("Aadhar No. is required"),
  meter_no: Yup.string().required("Meter No. is required"),
  group_id: Yup.string().required("Group is required"),
  property_no: Yup.string().required("Property No. is required"),
});

const AddCustomerScreen = () => {
  const [watertanks, setWatertanks] = useState([]);
  const [areas, setAreas] = useState([]);
  const [connectionTypes, setConnectionTypes] = useState([]);
  const [contactGroups, setContactGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();

  const getFilters = async (requestData = {}) => {
    try {
      const response = await api.post(`filters`, requestData);
      let filters = response.data.data;
      filters.map((filter) => {
        if (filter.title.key == "watertank_id") {
          setWatertanks(filter.data);
        }
        if (filter.title.key == "area_id" && requestData.watertank_id) {
          setAreas(filter.data);
        }
        if (filter.title.key == "connection_type") {
          setConnectionTypes(filter.data);
        }
        if (filter.title.key == "group_id") {
          setContactGroups(filter.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <Box safeAreaTop bg="background.50" style={{ flex: 1 }}>
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
                Add Customer
              </Text>
            </Box>
          </HStack>
        </Box>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            marginBottom: 5,
          }}
        >
          <ScrollView flex={1}>
            <VStack p={5} space={5}>
              <Formik
                initialValues={{
                  profile_type: "Individual",
                  contact_name: "",
                  watertank_id: "",
                  area_id: "",
                  connection_type: "",
                  contact_phone: "",
                  arrears: "",
                  aadhar_no: "",
                  group_id: "",
                  meter_no: "",
                  property_no: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  setLoading(true);
                  try {
                    const response = await api.post("customer", values);
                    console.log(response);
                    navigation.goBack();
                  } catch (error) {
                    alert("Something went wrong");
                  }
                  setLoading(false);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <VStack space={4}>
                    <FormControl
                      isInvalid={touched.profile_type && !!errors.profile_type}
                    >
                      <FormControl.Label>Profile Type</FormControl.Label>
                      <Select
                        height={10}
                        selectedValue={values.profile_type}
                        minWidth={200}
                        accessibilityLabel="Choose Profile Type"
                        placeholder="Choose Profile Type"
                        _selectedItem={{
                          bg: "teal.600",
                          endIcon: <CheckIcon size={5} />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) => {
                          setFieldValue("profile_type", itemValue);
                        }}
                      >
                        <Select.Item
                          label={"Individual"}
                          value={"Individual"}
                        />
                        <Select.Item
                          label={"Appartment"}
                          value={"Appartment"}
                        />
                      </Select>
                      {touched.profile_type && errors.profile_type && (
                        <Text color="red.500">{errors.profile_type}</Text>
                      )}
                    </FormControl>
                    {values.profile_type == "Appartment" ? (
                      <FormControl
                        isInvalid={touched.no_of_flats && !!errors.no_of_flats}
                      >
                        <FormControl.Label>No Of Flats</FormControl.Label>
                        <Input
                          height={10}
                          keyboardType="numeric"
                          onChangeText={handleChange("no_of_flats")}
                          onBlur={handleBlur("no_of_flats")}
                          value={values.no_of_flats}
                        />
                        {touched.no_of_flats && errors.no_of_flats && (
                          <Text color="red.500">{errors.no_of_flats}</Text>
                        )}
                      </FormControl>
                    ) : null}
                    <FormControl
                      isInvalid={touched.contact_name && !!errors.contact_name}
                    >
                      <FormControl.Label>Contact Name</FormControl.Label>
                      <Input
                        height={10}
                        onChangeText={handleChange("contact_name")}
                        onBlur={handleBlur("contact_name")}
                        value={values.contact_name}
                      />
                      {touched.contact_name && errors.contact_name && (
                        <Text color="red.500">{errors.contact_name}</Text>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        touched.contact_phone && !!errors.contact_phone
                      }
                    >
                      <FormControl.Label>Contact Phone</FormControl.Label>
                      <Input
                        height={10}
                        onChangeText={handleChange("contact_phone")}
                        onBlur={handleBlur("contact_phone")}
                        value={values.contact_phone}
                      />
                      {touched.contact_phone && errors.contact_phone && (
                        <Text color="red.500">{errors.contact_phone}</Text>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        touched.contact_email && !!errors.contact_email
                      }
                    >
                      <FormControl.Label>Contact Email</FormControl.Label>
                      <Input
                        height={10}
                        onChangeText={handleChange("contact_email")}
                        onBlur={handleBlur("contact_email")}
                        value={values.contact_email}
                      />
                      {touched.contact_email && errors.contact_email && (
                        <Text color="red.500">{errors.contact_email}</Text>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={touched.watertank_id && !!errors.watertank_id}
                    >
                      <FormControl.Label>Water Tank</FormControl.Label>
                      <Select
                        height={10}
                        selectedValue={values.watertank_id}
                        minWidth={200}
                        accessibilityLabel="Choose Water Tank"
                        placeholder="Choose Water Tank"
                        _selectedItem={{
                          bg: "teal.600",
                          endIcon: <CheckIcon size={5} />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) => {
                          setFieldValue("watertank_id", itemValue);
                          getFilters({ watertank_id: itemValue });
                        }}
                      >
                        {watertanks.map((watertank) => (
                          <Select.Item
                            key={watertank.id}
                            label={watertank.name}
                            value={watertank.id}
                          />
                        ))}
                      </Select>
                      {touched.watertank_id && errors.watertank_id && (
                        <Text color="red.500">{errors.watertank_id}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={touched.area_id && !!errors.area_id}
                    >
                      <FormControl.Label>Area</FormControl.Label>
                      <Select
                        height={10}
                        selectedValue={values.area_id}
                        minWidth={200}
                        accessibilityLabel="Choose Area"
                        placeholder="Choose Area"
                        _selectedItem={{
                          bg: "teal.600",
                          endIcon: <CheckIcon size={5} />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) =>
                          setFieldValue("area_id", itemValue)
                        }
                      >
                        {areas.map((area) => (
                          <Select.Item
                            key={area.id}
                            label={area.name}
                            value={area.id}
                          />
                        ))}
                      </Select>
                      {touched.area_id && errors.area_id && (
                        <Text color="red.500">{errors.area_id}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        touched.connection_type && !!errors.connection_type
                      }
                    >
                      <FormControl.Label>Connection Type</FormControl.Label>
                      <Select
                        height={10}
                        selectedValue={values.connection_type}
                        minWidth={200}
                        accessibilityLabel="Choose Connection Type"
                        placeholder="Choose Connection Type"
                        _selectedItem={{
                          bg: "teal.600",
                          endIcon: <CheckIcon size={5} />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) =>
                          setFieldValue("connection_type", itemValue)
                        }
                      >
                        {connectionTypes.map((type) => (
                          <Select.Item
                            key={type.id}
                            label={type.name}
                            value={type.id}
                          />
                        ))}
                      </Select>
                      {touched.connection_type && errors.connection_type && (
                        <Text color="red.500">{errors.connection_type}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        touched.connection_type && !!errors.connection_type
                      }
                    >
                      <FormControl.Label>Group</FormControl.Label>
                      <Select
                        height={10}
                        selectedValue={values.group_id}
                        minWidth={200}
                        accessibilityLabel="Choose Group"
                        placeholder="Choose Group"
                        _selectedItem={{
                          bg: "teal.600",
                          endIcon: <CheckIcon size={5} />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) =>
                          setFieldValue("group_id", itemValue)
                        }
                      >
                        {contactGroups.map((type) => (
                          <Select.Item
                            key={type.id}
                            label={type.name}
                            value={type.id}
                          />
                        ))}
                      </Select>
                      {touched.connection_type && errors.connection_type && (
                        <Text color="red.500">{errors.connection_type}</Text>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={touched.arrears && !!errors.arrears}
                    >
                      <FormControl.Label>Arrears</FormControl.Label>
                      <Input
                        height={10}
                        keyboardType="numeric"
                        onChangeText={handleChange("arrears")}
                        onBlur={handleBlur("arrears")}
                        value={values.arrears}
                      />
                      {touched.arrears && errors.arrears && (
                        <Text color="red.500">{errors.arrears}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={touched.aadhar_no && !!errors.aadhar_no}
                    >
                      <FormControl.Label>Aadhar No.</FormControl.Label>
                      <Input
                        height={10}
                        onChangeText={handleChange("aadhar_no")}
                        onBlur={handleBlur("aadhar_no")}
                        value={values.aadhar_no}
                      />
                      {touched.adhar_no && errors.adhar_no && (
                        <Text color="red.500">{errors.aadhar_no}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={touched.meter_no && !!errors.meter_no}
                    >
                      <FormControl.Label>Meter No.</FormControl.Label>
                      <Input
                        height={10}
                        onChangeText={handleChange("meter_no")}
                        onBlur={handleBlur("meter_no")}
                        value={values.meter_no}
                      />
                      {touched.meter_no && errors.meter_no && (
                        <Text color="red.500">{errors.meter_no}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={touched.property_no && !!errors.property_no}
                    >
                      <FormControl.Label>Property No.</FormControl.Label>
                      <Input
                        height={10}
                        onChangeText={handleChange("property_no")}
                        onBlur={handleBlur("property_no")}
                        value={values.property_no}
                      />
                      {touched.property_no && errors.property_no && (
                        <Text color="red.500">{errors.property_no}</Text>
                      )}
                    </FormControl>
                    <Button
                      background={"background.700"}
                      onPress={handleSubmit}
                      mt={2}
                      mb={8}
                    >
                      {loading ? <Spinner color={"white"} /> : "Submit"}
                    </Button>
                  </VStack>
                )}
              </Formik>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    </Box>
  );
};

export default AddCustomerScreen;
