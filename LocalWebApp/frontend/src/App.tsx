import React from 'react';
import { PondDataProvider } from './components/PondDataProvider';
import Temperature from './components/Temperature';
import DateTime from './components/DateTime';

const App: React.FC = () => {
  return (
    <PondDataProvider>
      <div className="app">
        <Temperature />
        <DateTime />
      </div>
    </PondDataProvider>
  );
}

export default App;
