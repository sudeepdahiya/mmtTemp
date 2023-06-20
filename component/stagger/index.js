import {
  
  HStack,
  Icon,
  Box,
  IconButton,
  Stagger,
  useDisclose,
} from "native-base";
import React from "react";

import FlightIcon from "../../svg/flight";
import HotelIcon from "../../svg/hotel";
import DotIcon from "../../svg/dots";

const Example = () => {
  const { isOpen, onToggle } = useDisclose();
  return (
    <React.Fragment>
      <Box alignItems="center" position={"absolute"} bottom="100" right={30}>
        <Stagger
          
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
        >
          <IconButton
            mb="4"
            variant="solid"
            bg="indigo.500"
            colorScheme="indigo"
            borderRadius="full"
            icon={
              <Icon
                as={FlightIcon}
                size="6"
                name="location-pin"
                color="warmGray.50"
              />
            }
          />
          <IconButton
            mb="4"
            variant="solid"
            bg="yellow.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                as={HotelIcon}
                size="6"
                name="microphone"
                color="warmGray.50"
              />
            }
          />
        </Stagger>
      </Box>
      <HStack alignItems="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="cyan.400"
          icon={
            <Icon
              as={DotIcon}
              size="6"
              name="dots-horizontal"
              color="warmGray.50"
            />
          }
        />
      </HStack>
    </React.Fragment>
  );
};
export default Example;
