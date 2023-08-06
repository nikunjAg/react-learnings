import { useEffect } from 'react';

import './App.css';
import StatusToggler from './pages/Online-Offline';
import Timer from './pages/Timer';
import './javascript';

function App() {

  const finishHandler = () => {
    console.log("Finished");
  }

  useEffect(() => {
    // init();
  }, []);

  return (
    <div className="App">
      <Timer duration={1000 * 20} onFinish={finishHandler} />
      <StatusToggler users={['A', 'B', 'C']}  />
    </div>
  );
}

export default App;
