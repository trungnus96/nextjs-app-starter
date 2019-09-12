import React, { Fragment } from "react";
import App from "next/app";

// material-ui
import { ThemeProvider as MaterialUIThemeProvider } from "@material-ui/styles";
import material_ui_theme from "../src/styles/material-ui/theme";

// styled-components
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import GlobalStyle from "../src/styles/styled-components/GlobalStyle";
import styled_components_theme from "../src/styles/styled-components/theme";

// redux
import { Provider } from "react-redux";
import withRedux from "../src/HOCs/withRedux";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <MaterialUIThemeProvider theme={material_ui_theme}>
          <StyledComponentsThemeProvider theme={styled_components_theme}>
            <Fragment>
              <GlobalStyle />
              <Component {...pageProps} />
            </Fragment>
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </Provider>
    );
  }
}

export default withRedux(MyApp);
