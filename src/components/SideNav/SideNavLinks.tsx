import { NavLink, useLocation } from "react-router-dom";
import Tooltip from "../UI/Tooltip";
import { dynamicSidebarLinks } from "../../utils/dynamicNavLink";

// const sideNavItems = [
//   { name: "Dashboard", Icon: DashboardSvg, href: "/" },
// { name: "Configuration", Icon: SystemConfigSvg, href: "/config" },
//   { name: "Roles", Icon: RolePermissionSvg, href: "/roles" },
//   { name: "Users", Icon: UsersSvg, href: "/users" },
//   { name: "Deposit", Icon: DepositSvg, href: "/deposit" },
//   { name: "Withdraw", Icon: WithdrawSvg, href: "/withdraw" },
//   { name: "Reports", Icon: ReportsSvg, href: "/reports" },
//   { name: "Settings", Icon: SettingsSvg, href: "/settings" },
// ];

interface Props {
  isExpanded: boolean;
}

export default function SideNavLinks({ isExpanded }: Props) {
  const { pathname } = useLocation();
  const sideNavItems = dynamicSidebarLinks();
  const activeIndex = sideNavItems.findIndex(
    ({ href }) => href === "/" + pathname.split("/")[1]
  );

  return (
    <ul className="relative flex flex-grow flex-col font-medium">
      {sideNavItems.map(({ name, Icon, href }, i) => (
        <li key={i}>
          <NavLink
            className={({ isActive }) =>
              `flex cursor-pointer items-center gap-4 py-4 px-10 ${
                isActive
                  ? "text-primary"
                  : "text-grayTextDark hover:text-blackText"
              }`
            }
            to={href}
          >
            {isExpanded ? (
              <Icon className="h-6" />
            ) : (
              <Tooltip content={name} side="right" sideOffset={20}>
                <Icon className="h-6" />
              </Tooltip>
            )}
            {isExpanded ? <span>{name}</span> : null}
          </NavLink>
        </li>
      ))}
      <li
        className={`absolute h-14 w-[3.5px] bg-primary transition-all duration-300 ease-in-out ${
          activeIndex === -1 ? "hidden" : ""
        }`}
        style={{ top: `${activeIndex * 56}px` }}
      />
    </ul>
  );
}
