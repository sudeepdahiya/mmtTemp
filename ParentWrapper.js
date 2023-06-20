import { Text, ScrollView, Button, Modal, Stack } from "native-base";
import React, { useState } from "react";
import Wrapper from "./Wrapper";

const size = ["sm", "md", "lg", "xl"];

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <Wrapper setModalVisible={setModalVisible} />
      <Stack alignItems="center">
        <Modal
          safeArea
          isOpen={modalVisible}
          onClose={setModalVisible}
          size={size}
          m={["1","1/6"]}
        >
          <Modal.Content maxH="312">
            <Modal.CloseButton />
            <Modal.Header>Return Policy</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <Text>
                  Create a 'Return Request' under “My Orders” section of
                  App/Website. Follow the screens that come up after tapping on
                  the 'Return’ button. Please make a note of the Return ID that
                  we generate at the end of the process. Keep the item ready for
                  pick up or ship it to us basis on the return mode.
                </Text>
              </ScrollView>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    setModalVisible(false);
                  }}
                 
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        
      </Stack>
      
    </React.Fragment>
  );
}

export default App;
