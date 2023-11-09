import { Provider } from "react-redux";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import TopMenu from "../components/layout/menu/TopMenu";
import PageLoading from "../components/loadings/pageloading/PageLoading";
import { Store, persistor } from "../redux/features/Store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Provider store={Store}>
        <PersistGate persistor={persistor} loading={<PageLoading />}>

              <TopMenu />
              <Component {...pageProps} />
              <Footer />

        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
