import {

  NativeBaseProvider,

} from "native-base";

import Wrapper from './Wrapper';
function App() {
  
  return (
    <NativeBaseProvider>
      <Wrapper />
    </NativeBaseProvider>
  );
}
// style={ {transform:[{ rotate: '90deg'}]}}
export default App;
