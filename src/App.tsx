///apis
//https://openweathermap.org/api
//https://open-meteo.com/

import { Provider } from "react-redux";
import SwipPages from "./components/layout/SwipPages";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { store } from "./store/store";
import { LocationProvider } from "./contexts/LocationContext";

const pages = [
  { id: 0, content: <Home /> },
  {
    id: 1,
    content: <Detail />,
  },
 
];

const App = () => {
  return (
    <LocationProvider>
      <Provider store={store}>
        <div className="bg-primary h-screen  font-black text-secondary  overflow-x-scroll    py-11   ">
          <SwipPages pages={pages} />
        </div>
      </Provider>
    </LocationProvider>
  );
};
export default App;
