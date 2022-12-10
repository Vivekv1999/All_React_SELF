import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Apidata from './vaibhav-api/Apidata';
import Pure_component from './learn-compent/Pure_component';
import Higer_order_component from './learn-compent/Higer_order_component';
import Homelazy from './LAzyloading/Homelazy';
import HomeCrude from './Crude_user/HomeCrude';
import Stylecomp from './component/STYLECOMPONET/Stylecomp';
import Style22 from './component/STYLECOMPONET/Style22';
import Checkbox from './Extra-QUESTION/Checkbox';
import Check222 from './Extra-QUESTION/Che222';
import Omrsheet from './Extra-QUESTION/Omrsheet';
import Checkget from './Extra-QUESTION/Checkboss/Checkget';



function App() {
  return (
    <>

      {/* <Apidata/> */}
      {/* <Pure_component/> */}
      {/* <Higer_order_component/> */}
      {/* <Homelazy /> */}
      {/* <HomeCrude />                               CRUDEUSER */}

      {/* <Stylecomp/> */}
      {/* <Style22/> */}

      {/* <Checkbox /> */}
      {/* <Check222/> */}
      <Omrsheet/>
      {/* <Checkget /> */}

    </>
  );
}

export default App;
