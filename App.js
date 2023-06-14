import {
  Text,
  VStack,
  ScrollView,
  NativeBaseProvider,
  Box,
  Button,
  Image,
  Pressable,
} from "native-base";
import Seat from "./component/seat";
import Header from "./component/header";
import React, { useState, useEffect, useMemo } from "react";
import getAncelleryData from "./service";
import { FLIGHT_HEAD_URL, FLIGHT_TAIL_URL } from "./const";

const DIM = 8;

function App() {
  const [seats, setSeats] = useState({});
  const [loader, setLoader] = useState(true);
  const [ancellery, setAncellery] = useState({});
  const [selectedTab, setSelectedTab] = useState(null);
  const [tabs, setTabs] = useState([]);

  const get = async () => {
    const d = await getAncelleryData();

    let parentObj = {};
    let data = d.seatMapInfoSOA.smSeg;

    Object.keys(data).map((val, i) => {
      parentObj[val] = {
        seatMapData: data[val].cLyt.deckMap.MAIN,
        priceBucketList: data[val].pbl,
        flightDetail: data[val].fDtl,
      };
    });
    const tabList = Object.keys(parentObj);
    setLoader(false);
    setAncellery(parentObj);
    setTabs(tabList);
    setSelectedTab(tabList[2]);
  };

  useEffect(() => {
    get();
  }, []);

  const changeSeat = (segment, i, j) => {
    const key = `${segment}_${i}_${j}`;
    setSeats({
      ...seats,
      [key]: !seats[key],
    });
  };

  const renderSeatList = () => {
    const { priceBucketList } = ancellery[selectedTab];
    return ancellery[selectedTab].seatMapData.sm.map((seatRow, i) => {
      return (
        <VStack
          space="2.5"
          mt="4"
          px="8"
          direction="row"
          space={4}
          key={`${selectedTab}_${i}`}
        >
          {seatRow.map((col, j) => {
            switch (col.ct) {
              case "LABEL":
                return (
                  <Box w={DIM} h={DIM}>
                    {col.lbl}
                  </Box>
                );
              case "SEAT":
                return (
                  <Pressable  onPress={() => changeSeat(selectedTab, i, j)}>
                  <Box
                    bg={
                      seats[`${selectedTab}_${i}_${j}`]
                        ? ["green.400"]
                        : [priceBucketList[col.pbIdx].cc]
                    }
                    w={DIM}
                    h={DIM}
                   
                  ></Box>
                  </Pressable>
                );
              case "EMPTY":
                return <Box w={DIM} h={DIM}></Box>;
              case "ICON":
                return (
                  <Box w={DIM} h={DIM}>
                    Icon
                  </Box>
                );

              default:
                return <div></div>;
            }
          })}
        </VStack>
      );
    });
  };

  return (
    <NativeBaseProvider>
      
      <Header />
      <Box bg={"gray.100"} m="10">
      {loader ? (
        <Text>Loading</Text>
      ) : (
        <React.Fragment>
          <ScrollView flex={1} direction="column" bg={"white"}>
            <Image source={{ uri: FLIGHT_HEAD_URL }} size="2xl" style={ {transform:[{ rotate: '90deg'}]}} />
            {selectedTab && renderSeatList()}
            <Image source={{ uri: FLIGHT_TAIL_URL }} size="2xl" style={ {transform:[{ rotate: '90deg'}]}} />
          </ScrollView>
          <Box alignItems="center">
            <Button onPress={() => console.log("hello world")}>Click Me</Button>
          </Box>
        </React.Fragment>
      )}
      </Box>
    </NativeBaseProvider>
  );
}
// style={ {transform:[{ rotate: '90deg'}]}}
export default App;
