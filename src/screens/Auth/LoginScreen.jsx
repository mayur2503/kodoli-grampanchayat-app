// LoginScreen.js
import React, { useState } from "react";
import {
  VStack,
  Center,
  Heading,
  Input,
  Button,
  Box,
  Text,
  Spinner,
} from "native-base";
import api from "../../api";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/todo/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("grampamchayatkodoli@gmail.com");
  const [password, setPassword] = useState("admin@grampamchayatkodoli");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      await AsyncStorage.setItem("userToken", response.data.data.token);
      dispatch(
        setUser({
          token: response.data.data.token,
          user: response.data.data.user,
        })
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Center flex={1} px={4} bg={"tertiary.50"}>
      <Box mb={12} justifyContent="center" alignItems="center">
        <Text fontWeight={"bold"} fontSize={30} color={"tertiary.800"}>
          Grampanchayat
        </Text>
        <Text fontWeight={"bold"} fontSize={30} color={"secondary.600"}>
          Kodoli
        </Text>
      </Box>
      <Box w="100%" maxW="300px">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          textAlign="center"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign="center"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            variant="outline"
            size={"xl"}
            mb={3}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            variant="outline"
            type="password"
            size={"xl"}
            mb={6}
          />
          <Button bgColor={"background.700"} size={"md"} onPress={handleLogin}>
            {loading ? <Spinner /> : <Text color="white">Login</Text>}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;
