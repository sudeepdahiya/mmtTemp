import {

  NativeBaseProvider,
  extendTheme

} from "native-base";

import Wrapper from './ParentWrapper';

const AFFILIATES = {
  GI: {
    components: {
      Button: {
        baseStyle: {
          rounded: 'full',
        },
        defaultProps: {
          color:'blue',
          backgroundColor: "#FF6D38",
        },
      },
    },
  }
}

function App(props) {
  const {aff = 'MMT'} = props;
  const theme = extendTheme(AFFILIATES[aff]);
  return (
    <NativeBaseProvider theme={theme}>
      <Wrapper />
    </NativeBaseProvider>
  );
}
// style={ {transform:[{ rotate: '90deg'}]}}
export default App;
