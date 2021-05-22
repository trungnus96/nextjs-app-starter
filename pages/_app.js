import React, { Fragment, useEffect } from "react";

// Normalize
import { Normalize } from "styled-normalize";

// material-ui
import { ThemeProvider as MaterialUIThemeProvider } from "@material-ui/styles";
import material_ui_theme from "../src/styles/material-ui/theme";

// styled-components
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import GlobalStyle from "../src/styles/styled-components/GlobalStyle";
import styled_components_theme from "../src/styles/styled-components/theme";

// redux
import { Provider } from "react-redux";
import { useStore } from "../src/HOCs/withRedux";

// NProgress
import NProgress from "nprogress";
import "../src/styles/nprogress.scss";

import Router from "next/router";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  const redux_store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={redux_store}>
      <MaterialUIThemeProvider theme={material_ui_theme}>
        <StyledComponentsThemeProvider theme={styled_components_theme}>
          <Fragment>
            <Normalize />
            <GlobalStyle />
            <Component {...pageProps} />
          </Fragment>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </Provider>
  );
}
