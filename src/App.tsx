import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CustomLayout from "./components/Layout/Layout";
import AccessibleFallback from "./components/AccessibleFallback/AccessibleFallback";

const Customers = React.lazy(() => import("./pages/Customers"));
const EditCustomer = React.lazy(() => import("./pages/EditCustomer"));

const App: React.FC = () => {
  return (
    <Router>
      <CustomLayout>
        <Suspense fallback={<AccessibleFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/customers" replace />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customer/:id/edit" element={<EditCustomer />} />
          </Routes>
        </Suspense>
      </CustomLayout>
    </Router>
  );
};

export default App;
