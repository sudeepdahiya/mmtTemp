import {
  Box,
  Image,
  Text,
  Link,
  HStack,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Stack,
} from "native-base";

const Header = (props) => {
  return (
    <Box>
      <VStack space={4} alignItems="center">
        <Stack direction="row" alignItems="center" w="100%" h="10" bg="indigo.300" shadow={3}>
          <Box>
            <Text> {"<-"} </Text>
          </Box>
          <Box>
            <Text> this is header </Text>
          </Box>
        </Stack>
      </VStack>
    </Box>
  );
};

export default Header;
