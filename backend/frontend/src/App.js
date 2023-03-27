import Home from './components/Home';
import { ProSidebarProvider } from "react-pro-sidebar"
import ScanDocument from './components/ScanDocument';
import ClauseLib from './components/ClauseLib';
import AddClause from './components/ClauseFolder/AddClause';
import VariantLib from './components/VariantLib';
import VersionLib from './components/VersionLib';
import AddVariant from './components/ClauseFolder/AddVariant';
import Temp from './components/Temp';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <ProSidebarProvider>
        <Router>
          <Routes>
            <Route path="/ClauseLib" exact element={<ClauseLib />}></Route>
            <Route path="/Variant" exact element={<VariantLib />}></Route>
            <Route path="/Version" exact element={<VersionLib />}></Route>
            <Route path="/AddClause" exact element={<AddClause />}></Route>
            <Route path="/AddVariant" exact element={<AddVariant />}></Route>
            <Route path="*" element={<Home to="/" replace/>}></Route>
          </Routes>
        </Router>
      </ProSidebarProvider>
    </div>
  );
}

export default App;


