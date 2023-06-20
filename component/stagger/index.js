import {
  HStack,
  Icon,
  Box,
  IconButton,
  Stagger,
  useDisclose,
  Image,
  Pressable,
} from "native-base";
import React from "react";

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
          <Box bg="white" borderRadius={"full"}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3125/3125713.png",
              }}
              h="20"
              w="20"
            />
          </Box>
          <Box bg="white" borderRadius={"full"}>
            <Image
              source={{
                uri: "https://static-00.iconduck.com/assets.00/hotel-icon-2048x2010-fehrbwvc.png",
              }}
              h="20"
              w="20"
            />
          </Box>
        </Stagger>
      </Box>
      <HStack alignItems="center">
        <Pressable onPress={onToggle}>
          <Box bg="white" borderRadius={"full"}>
            <Image
              source={{
                uri: "https://cdn.icon-icons.com/icons2/1659/PNG/512/3844442-dot-menu-more-vertical_110310.png",
              }}
              h="20"
              w="20"
            />
          </Box>
        </Pressable>
      </HStack>
    </React.Fragment>
  );
};
export default Example;
