import { useAuth } from "../contexts/AuthContext";
import {
  DashboardSvg,
  DepositSvg,
  ReportsSvg,
  RolePermissionSvg,
  SettingsSvg,
  SystemConfigSvg,
  UsersSvg,
  WithdrawSvg,
} from "../icons/AllSvgs";

export const dynamicSidebarLinks = () => {
  const { auth } = useAuth();
  const sideNavItems = [
    { name: "Dashboard", Icon: DashboardSvg, href: "/" },
    { name: "Roles", Icon: RolePermissionSvg, href: "/roles" },
    { name: "Deposit", Icon: DepositSvg, href: "/deposit" },
    { name: "Withdraw", Icon: WithdrawSvg, href: "/withdraw" },
    { name: "Reports", Icon: ReportsSvg, href: "/reports" },
    { name: "Settings", Icon: SettingsSvg, href: "/settings" },
  ];

  const showConfigList = auth.permissions?.some(
    (item) => item.permission_id === 5
  );

  showConfigList &&
    sideNavItems.splice(1, 0, {
      name: "Configuration",
      Icon: SystemConfigSvg,
      href: "/config",
    });

  const showUsers = auth.permissions?.some((item) => item.permission_id === 4);

  showUsers &&
    sideNavItems.splice(3, 0, {
      name: "Users",
      Icon: UsersSvg,
      href: "/users",
    });

  return sideNavItems;
};
