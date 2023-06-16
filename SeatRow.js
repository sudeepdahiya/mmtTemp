import {
  VStack,
} from "native-base";

import React from "react";
import SeatBox from "./SeatBox";

function SeatRow(props) {
  const { selectedTab, i, seatRow, changeSeat, priceBucketList, dire } =
    props;
  return (
    <VStack
      space="2.5"
      mt="2"
      px="2"
      direction={dire[1]}
    >
      {seatRow.map((col, j) => {
        return (
          <SeatBox
            key={j}
            col={col}
            i={i}
            j={j}
            changeSeat={changeSeat}
            selectedTab={selectedTab}
            priceBucketList={priceBucketList}
            isActive={col.isActive}
          />
        );
      })}
    </VStack>
  );
}

export default React.memo(SeatRow);
