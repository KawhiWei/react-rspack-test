import { BrowserRouter, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import Login from "@/router/constans/login";
import NotFound from "@/router/constans/notFound";
import RouterAuth from "@/component/routeAuth";

const routes = [
  ...Login,
  ...NotFound
];

class BasicRoute extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterAuth config={routes} />
          </Suspense>
        </Routes>
      </BrowserRouter>
    )
  }
}
export default BasicRoute;