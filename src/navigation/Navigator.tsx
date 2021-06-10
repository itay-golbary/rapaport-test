import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";

interface Props {}

const Navigator: FC<Props> = () => (
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/catalog" component={Catalog} />
      </Switch>
    </QueryParamProvider>
  </Router>
);

export { Navigator };
