
import {
  Text,
  VStack,
  ScrollView,
  NativeBaseProvider,
  Box,
  Button
} from "native-base";
import Seat from "./component/seat";
import Header from "./component/header";
import { useState } from "react";

function App() {
  const [seats, setSeats] = useState({});

  const changeSeat = (id, row) => {
    console.log('id',id,row)
    const key = `${id}_${row}`;
    setSeats({
      ...seats,
      [key]: !seats[key],
    });
  };
  const renderFlighSeatHeading = (no) => {
    return (
      <VStack space="2" mt="1" px="1" direction="row" key={no}>
        <Text color={"orange.800"} w="5"></Text>
        <Text color={"orange.800"} w="12">
          A
        </Text>
        <Text color={"orange.800"} w="12">
          B
        </Text>
        <Text color={"orange.800"} w="12">
          C
        </Text>

        <Seat price="0" type="b" />
        <Text color={"orange.800"} w="12">
          D
        </Text>
        <Text color={"orange.800"} w="12">
          E
        </Text>
        <Text color={"orange.800"} w="12">
          F
        </Text>
      </VStack>
    );
  };
  const renderFlighSeatRow = (no) => {
    return (
      <VStack space="2" mt="1" px="1" direction="row" key={no}>
        <Text color={"orange.800"} w="5">
          {no}
        </Text>
        <Seat
          price="500"
          id={1}
          row={no}
          changeSeat={changeSeat}
          selected={seats[`1_${no}`]}
        />
        <Seat
          price="200"
          id={2}
          row={no}
          changeSeat={changeSeat}
          selected={seats[`2_${no}`]}
        />
        <Seat
          price="100"
          id={3}
          row={no}
          changeSeat={changeSeat}
          selected={seats[`3_${no}`]}
        />
        <Seat price="0" type="b" />
        <Seat
          price="100"
          id={4}
          row={no}
          changeSeat={changeSeat}
          selected={seats[`4_${no}`]}
        />
        <Seat
          price="300"
          id={5}
          row={no}
          changeSeat={changeSeat}
          selected={seats[`5_${no}`]}
        />
        <Seat
          price="500"
          id={6}
          row={no}
          changeSeat={changeSeat}
          selected={seats[`6_${no}`]}
        />
      </VStack>
    );
  };

  const renderFlightSeat = (n) => {
    let output = Array(n);
    for (let i = 0; i < n; i++) {
      output[i] = renderFlighSeatRow(i + 1);
    }
    return output;
  };

  return (
    <NativeBaseProvider>
      <Header />
      <ScrollView flex={1}>
        {renderFlighSeatHeading()}
        {renderFlightSeat(30)}
      </ScrollView>
      <Box alignItems="center">
      <Button onPress={() => console.log("hello world")}>Click Me</Button>
    </Box>
    </NativeBaseProvider>
  );
}

export default App;
