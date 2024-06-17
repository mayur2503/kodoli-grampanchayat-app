import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
} from "native-base";
import { StyleSheet } from "react-native";
import moment from "moment";
const BillItem = ({ bill }) => {
  return (
    <Box
      key={bill.id}
      bg="tertiary.50"
      p={4}
      borderRadius="md"
      borderColor={"secondary.600"}
    >
      <VStack space={1}>
        <HStack space={2} flex={1}>
          <Box>
            <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
              Bill ID :
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={16}
              color={"tertiary.500"}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              #{bill.id}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Amount :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {bill.total_amount}
              </Text>
            </Box>
          </HStack>
          <HStack space={2} flex={1}>
            <Box>
              <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                Status :
              </Text>
            </Box>
            <Box flex={1}>
              <Text
                fontSize={16}
                color={"tertiary.500"}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {bill.status}
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
                {bill.bill_month}
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
                {bill.bill_year}
              </Text>
            </Box>
          </HStack>
        </HStack>
        <HStack space={2} flex={1}>
          <Box>
            <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
              Bill Date :
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={16}
              color={"tertiary.500"}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {bill.bill_date}
            </Text>
          </Box>
        </HStack>
        <HStack space={2} flex={1}>
          <Box>
            <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
              Due Date :
            </Text>
          </Box>
          <Box flex={1}>
            <Text
              fontSize={16}
              color={"tertiary.500"}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {bill.due_date}
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
              {moment(bill.created_at).format("MMMM Do YYYY, h:mm:ss a")}
            </Text>
          </Box>
        </HStack>
      </VStack>
     
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

export default BillItem;
