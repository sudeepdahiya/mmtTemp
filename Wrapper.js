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
  PlayIcon,
} from "native-base";

import Header from "./component/header";
import React, { useState, useEffect } from "react";
import getAncelleryData from "./service";
import { FLIGHT_HEAD_URL, FLIGHT_TAIL_URL } from "./const";

const DIM = 8;

function App() {
  const [seats, setSeats] = useState({});
  const [loader, setLoader] = useState(true);
  const [ancellery, setAncellery] = useState({});
  const [selectedTab, setSelectedTab] = useState(null);
  const [tabs, setTabs] = useState([]);

  const dire = useBreakpointValue({
    base: ["column", "row", "90deg", false],
    lg: ["row", "column", "0deg", true],
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
          mt="2"
          px="2"
          direction={dire[1]}
          key={`${selectedTab}_${i}`}
        >
          {seatRow.map((col, j) => {
            switch (col.ct) {
              case "LABEL":
                return (
                  <Box w={DIM} h={DIM} key={`${selectedTab}_${i}_${j}`}>
                    <Text>{col.lbl}</Text>
                  </Box>
                );
              case "SEAT":
                return (
                  <Pressable
                    key={`${selectedTab}_${i}_${j}`}
                    onPress={() => changeSeat(selectedTab, i, j)}
                  >
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
                return (
                  <Box key={`${selectedTab}_${i}_${j}`} w={DIM} h={DIM}></Box>
                );
              case "ICON":
                return (
                  <Box key={`${selectedTab}_${i}_${j}`} w={DIM} h={DIM}>
                    <PlayIcon />
                  </Box>
                );
              default:
                return (
                  <Box key={`${selectedTab}_${i}_${j}`} w={DIM} h={DIM} r></Box>
                );
            }
          })}
        </VStack>
      );
    });
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
              <Box key={t} m="2" p="4" bg="yellow.500">
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
          <ScrollView bg={"gray.100"} w="100%" horizontal={dire[3]}>
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
          onPress={() => console.log("hello world")}
          p={[2, 5]}
          m={[5, 10]}
          w={[24, 48, 72]}
        >
          Click Me
        </Button>
      </Box>
    </Box>
  );
}

export default App;
