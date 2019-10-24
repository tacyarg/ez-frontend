import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Pages
import Pages from "./pages";
import Layout from "./Layout";

export default globalProps => {
  return (
    <Switch>
      <Redirect exact from="/" to="/jackpot" />

      {Object.keys(Pages).map(pageKey => {
        const Page = Pages[pageKey];
        if (pageKey === "NotFound")
          return <Route key={`page_${pageKey}`} component={Page} />;
        return (
          <Route
            key={`page_${pageKey}`}
            path={`/${pageKey}`}
            render={props => {
              // render layout and page
              return (
                <Layout
                  {...props}
                  cPage={props.location.pathname}
                  onClick={props.history.push}
                  {...globalProps}
                >
                  <Page {...props} {...globalProps} />
                </Layout>
              );
            }}
          />
        );
      })}
    </Switch>
  );
};
