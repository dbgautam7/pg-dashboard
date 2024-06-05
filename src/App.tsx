import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./utils/privateRoutes";
import BaseLayout from "./layouts/BaseLayout";

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import InterventionsPage from "./pages/Interventions";
import InterventionDetail from "./pages/Interventions/InterventionDetail";
import NotFoundPage from "./pages/NotFoundPage";
import AuthGuard from "./utils/authGuard";
import SettingsPage from "./pages/settings";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route element={<BaseLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="transactions" element={<InterventionsPage />} />
          <Route
            path="interventions/:interventionId"
            element={<InterventionDetail />}
          />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}