import {
  Text,
  VStack,
  Stack,
  ScrollView,
  Box,
  Button,
  Image,
  Pressable,
  useBreakpointValue,
  HStack,
} from "native-base";

import Header from "./component/header";
import React, { useState, useEffect } from "react";
import getAncelleryData from "./service";
import { FLIGHT_HEAD_URL, FLIGHT_TAIL_URL } from "./const";
import SeatRow from "./SeatRow";
import Stagger from "./component/stagger";

function App({ setModalVisible }) {
  const [loader, setLoader] = useState(true);
  const [ancellery, setAncellery] = useState({});
  const [selectedTab, setSelectedTab] = useState(null);
  const [tabs, setTabs] = useState([]);

  const dire = useBreakpointValue({
    base: ["column", "row", "90deg", false, false],
    lg: ["row", "column", "0deg", true, true],
  });

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
  console.log("i m called ", new Date());
  const changeSeat = (segment, i, j) => {
    if (ancellery[segment].seatMapData.sm[i][j].isActive) {
      ancellery[segment].seatMapData.sm[i][j].isActive = false;
    } else {
      ancellery[segment].seatMapData.sm[i][j].isActive = true;
    }
    setAncellery({ ...ancellery });
  };

  const renderSeatList = () => {
    const { priceBucketList } = ancellery[selectedTab];
    return ancellery[selectedTab].seatMapData.sm.map((seatRow, index) => (
      <SeatRow
        selectedTab={selectedTab}
        seatRow={seatRow}
        changeSeat={changeSeat}
        priceBucketList={priceBucketList}
        dire={dire}
        i={index}
        key={index}
      />
    ));
  };

  return (
    <React.Fragment>
      <VStack safeArea flex={"1"}>
        <Header />
        {loader ? (
          <Box flex="1">
            <Text>Loading</Text>
          </Box>
        ) : (
          <React.Fragment>
            <ScrollView bg={"gray.100"} w="100%" horizontal={true}>
              {tabs.map((t) => (
                <Box
                  key={t}
                  bg={selectedTab === t ? "yellow.500" : "emerald.400"}
                  m="2"
                  h="12"
                  p="3"
                >
                  <Pressable
                    onPress={() => {
                      setSelectedTab(t);
                    }}
                  >
                    <Text>{t}</Text>
                  </Pressable>
                </Box>
              ))}
            </ScrollView>
            <ScrollView
              bg={"gray.100"}
              horizontal={dire[4]}
              borderStyle={"solid"}
              borderColor={"coolGray.600"}
              bg="gray.100"
            >
              <Stack direction={dire[0]} alignItems="center">
                <Image
                  source={{ uri: FLIGHT_HEAD_URL }}
                  size="2xl"
                  style={{ transform: [{ rotate: dire[2] }] }}
                  alt=""
                />
                {selectedTab && renderSeatList()}
                <Image
                  source={{ uri: FLIGHT_TAIL_URL }}
                  size="2xl"
                  style={{ transform: [{ rotate: dire[2] }] }}
                  alt=""
                />
              </Stack>
            </ScrollView>
          </React.Fragment>
        )}
        <HStack position={"fixed"} bottom={0} bg="green.50">
          <Box flex={1}></Box>
          <Button
            p={[2, 5]}
            m={[5, 10]}
            size="md"
            onPress={() => {
              setModalVisible(true);
            }}
          >
            Click Me!
          </Button>
          <Stagger />
        </HStack>
      </VStack>
    </React.Fragment>
  );
}

export default React.memo(App);
