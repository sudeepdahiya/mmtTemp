import {

  NativeBaseProvider,
  extendTheme

} from "native-base";

import Wrapper from './Wrapper';

const AFFILIATES = {
  MMT: {
    components: {
      Button: {
        baseStyle: {
          rounded: 'lg',
        },
        defaultProps: {
          colorScheme: 'blue',
        },
      },
    },
  },
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
  console.log(theme, AFFILIATES[aff])
  return (
    <NativeBaseProvider theme={theme}>
      <Wrapper />
    </NativeBaseProvider>
  );
}
// style={ {transform:[{ rotate: '90deg'}]}}
export default App;
