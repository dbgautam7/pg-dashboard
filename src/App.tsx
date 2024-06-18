import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./utils/privateRoutes";
import BaseLayout from "./layouts/BaseLayout";

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthGuard from "./utils/authGuard";
import SettingsPage from "./pages/settings";
import ReportsPage from "./pages/reports";
import DepositPage from "./pages/deposit";
import WithdrawPage from "./pages/withdraw";
import ConfigPage from "./pages/config";
import RolesPermissionsPage from "./pages/rolesPermissions";

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
          <Route path="roles" element={<RolesPermissionsPage />} />
          <Route path="config" element={<ConfigPage />} />
          <Route path="deposit" element={<DepositPage />} />
          <Route path="withdraw" element={<WithdrawPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
