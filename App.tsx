//App.js
import React from 'react';
import ParsFile from './src/ParseFile';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <ParsFile />
    </SafeAreaProvider>
  );
}

export default App;
