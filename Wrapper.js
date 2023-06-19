import {
  Text,
  Stack,
  ScrollView,
  Box,
  Button,
  Image,
  Pressable,
  useBreakpointValue,
} from "native-base";

import Header from "./component/header";
import React, { useState, useEffect } from "react";
import getAncelleryData from "./service";
import { FLIGHT_HEAD_URL, FLIGHT_TAIL_URL } from "./const";
import SeatRow from "./SeatRow";

function App() {
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

  const changeSeat = (segment, i, j) => {
    
    if (ancellery[segment].seatMapData.sm[i][j].isActive) {
      ancellery[segment].seatMapData.sm[i][j].isActive = false;
    } else {
      ancellery[segment].seatMapData.sm[i][j].isActive = true;
    }
    setAncellery({...ancellery});
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
    ))
  };

  return (
    <Box safeArea flex="1">
      <Header />
      {loader ? (
        <Text>Loading</Text>
      ) : (
        <React.Fragment>
          <ScrollView bg={"gray.100"} w="100%" horizontal={true}>
            {tabs.map((t) => (
              <Box
                key={t}
                bg={selectedTab === t ? "yellow.500" : "emerald.400"}
                m="2"
              >
                <Pressable
                  onPress={() => {
                    setSelectedTab(t);
                  }}
                >
                  <Text p="4" h="20">
                    {t}
                  </Text>
                </Pressable>
              </Box>
            ))}
          </ScrollView>
          <ScrollView bg={"gray.100"} horizontal={dire[4]}>
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
      <Box alignItems="center">
        <Button
          p={[2, 5]}
          m={[5, 10]}
          w={[24, 48, 72]}
          onPress={() => {
            alert("hi");
          }}
        >
          Click Me
        </Button>
      </Box>
    </Box>
  );
}

export default App;
