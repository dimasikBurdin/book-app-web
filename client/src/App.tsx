import { Provider } from "react-redux";
import { store } from "./redux-store/store-manager";
import "./styles/primary-styles.scss";

const App = () => {
  return (
    <Provider store={store}>
      <></>
    </Provider>
  );
};

export default App;
