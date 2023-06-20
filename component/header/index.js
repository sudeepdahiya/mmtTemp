import { Box, Text, Heading, HStack } from "native-base";

const Header = (props) => {
  return (
    <HStack
      h="10"
      bg="indigo.300"
      shadow={3}
      w="full"
      // position="fixed"
      // zIndex={1}
    >
      <Box>
        <Text> {"<-"} </Text>
      </Box>
      <Box>
        <Heading> this is header </Heading>
      </Box>
    </HStack>
  );
};

export default Header;
