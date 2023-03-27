import React, { Fragment } from "react";
import FrontPage from "./pages/FrontPage";
import Variant from "./pages/Variant";
import AddClause from "./pages/AddClause";
import AddVariant from "./pages/AddVariant";
import Versions from "./pages/Versions";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/AddClause" exact element={<AddClause />}></Route>

        <Route path="/AddVariant" exact element={<AddVariant />}></Route>
        <Route path="/FrontPage" exact element={<FrontPage />}></Route>
        <Route path="/Variant" exact element={<Variant />}></Route>
        <Route path="/Versions" exact element={<Versions />}></Route>

        <Route path="*" element={<FrontPage to="/FrontPage" replace />} />
      </Routes>
    </Router>
  );
};
export default App;
