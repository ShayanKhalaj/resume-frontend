import { Provider } from "react-redux";
import { Store, persistor } from "../redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Header from "../ui/wireframeUi/Header/Header";
import Footer from "../ui/wireframeUi/footer/Footer";


function MyApp({ Component, pageProps }) {
  return (
<>
      <Header></Header>
        <Provider store={Store}>
          <PersistGate persistor={persistor} loading={<h1>loading...</h1>}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      {/* <Footer>
        <h1>این فوتر منه </h1>
        <h2>دوسش دارم خیلی زیاد</h2>
      </Footer> */}
      </>
    
  );
}

export default MyApp;
