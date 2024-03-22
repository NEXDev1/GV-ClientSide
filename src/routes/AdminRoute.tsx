import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomeLayoutPage from "../pages/HomeLayoutPage";
// import EditCurrency from "../components/settings/EditCurrency";
// import EditChannel from "../components/channels/EditChannel";
// import Dashboard from "../pages/element/Dashboard";
// import Payment from "../pages/element/Payment";
// import Channel from "../pages/element/Channel";
// import Invoice from "../pages/element/Invoice";
// import Reports from "../pages/element/Reports";
// import Settings from "../pages/element/Settings";
// import Upload from "../components/upload/Upload";

// Lazy-loaded components
const Dashboard = lazy(() => import("../pages/element/Dashboard"));
const Payment = lazy(() => import("../pages/element/Payment"));
const Channel = lazy(() => import("../components/channels/listChannels"));
const AddChannel = lazy(() => import("../components/channels/AddChannel"));
const EditChannel = lazy(() => import("../components/channels/EditChannel"));

const Invoice = lazy(() => import("../pages/element/Invoice"));
const Reports = lazy(() => import("../pages/element/Reports"));
const Settings = lazy(() => import("../components/settings/Settings"));
const AddCurrency = lazy(() => import("../components/settings/AddCurrency"));
const EditCurrency = lazy(() => import("../components/settings/EditCurrency"));

const AddTax = lazy(() => import("../components/settings/AddTax"));
const EditTax = lazy(() => import("../components/settings/EditTax"))

const Upload = lazy(() => import("../components/upload/Upload"));
import { ModalProvider } from '../components/ModalContext';

const AdminRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<HomeLayoutPage />}>

        <Route index element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
        <Route path="upload" element={<Suspense fallback={<div>Loading...</div>}><Upload /></Suspense>} />
       
        <Route path="channels" element={<Suspense fallback={<div>Loading...</div>}> <ModalProvider>
        <Channel />
       </ModalProvider></Suspense>} />
        <Route path="channels/add-channel" element={<Suspense fallback={<div>Loading...</div>}><AddChannel /></Suspense>} />
        <Route path="channels/edit-channel/:id" element={<Suspense fallback={<div>Loading...</div>}><EditChannel /></Suspense>} />

        <Route path="invoice" element={<Suspense fallback={<div>Loading...</div>}><Invoice /></Suspense>} />
        <Route path="payment" element={<Suspense fallback={<div>Loading...</div>}><Payment /></Suspense>} />
        <Route path="report" element={<Suspense fallback={<div>Loading...</div>}><Reports /></Suspense>} />
       
        <Route path="settings" element={<Suspense fallback={<div>Loading...</div>}><Settings /></Suspense>} />
        
        <Route path="settings/add-currency"       element={<Suspense fallback={<div>Loading...</div>}><AddCurrency  /></Suspense>} />
        <Route path="settings/edit-currency/:id" element={<Suspense fallback={<div>Loading...</div>}><EditCurrency /></Suspense>} />

        <Route path="settings/add-tax" element={<Suspense fallback={<div>Loading...</div>}><AddTax /></Suspense>} />
        <Route path="settings/edit-tax/:id" element={<Suspense fallback={<div>Loading...</div>}><EditTax /></Suspense>} />

      </Route>
    </Routes>
  );
};

export default AdminRoute;