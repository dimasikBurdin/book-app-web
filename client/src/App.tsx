import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./components/routing";
import { store } from "./redux-store/store-manager";
import "./styles/primary-styles.scss";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
