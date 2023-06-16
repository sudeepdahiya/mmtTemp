import React, { useState} from "react";

import { Text, Box, Pressable, PlayIcon, Button } from "native-base";

const DIM = 8;

const SeatBox = (props) => {
  const { col, changeSeat, selectedTab, i, j, priceBucketList } = props;
  const [state, setState] = useState(false)
  switch (col.ct) {
    case "LABEL":
      return (
        <Box w={DIM} h={DIM}>
          <Text>{col.lbl}</Text>
        </Box>
      );
    case "SEAT":
      return (
        <Button
          bg={state ? ["green.400"] : [priceBucketList[col.pbIdx].cc]}
          w={DIM}
          h={DIM}
          onPress={() => setState(!state)}
        ></Button>
      );
    case "EMPTY":
      return <Box w={DIM} h={DIM}></Box>;
    case "ICON":
      return (
        <Box w={DIM} h={DIM}>
          <PlayIcon />
        </Box>
      );
    default:
      return <Box w={DIM} h={DIM} r></Box>;
  }
};

export default SeatBox;
