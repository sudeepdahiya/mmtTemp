import React from 'react'
import { Box, Text, Pressable } from "native-base";

function Seat(props) {
  const { price = "", id, selected, changeSeat = () => {}, type, row } = props;

  const handleSeat = () => {
    changeSeat(id, row);
  };
  if (type) {
    return <Box p="2" w="10" h="10"></Box>;
  }
  if (selected) {
    console.log('selected',price)
  }
  

  return (
    <Pressable bg={"green.400"} p="2" w="10" h="10" onPress={handleSeat}>
      {selected && (
        <Box w="10" h="10" bg={"blue.200"} >
          <Text>{price}</Text>
        </Box>
      )}
      <Text ></Text>
    </Pressable>
  );
}

export default React.memo(Seat);
