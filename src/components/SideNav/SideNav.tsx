import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { LogOutSvg, CollapseSvg, ExpandSvg } from "../../icons/AllSvgs";
import AlertDialog from "../UI/AlertDialog";
import Tooltip from "../UI/Tooltip";
import SideNavLinks from "./SideNavLinks";
import { removeAuthDetails } from "../../utils/cookie";
import { useAuth } from "../../contexts/AuthContext";

export default function SideNav() {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const { updateToast } = useToast();
  const { setAuth } = useAuth();

  const alertDescription =
    "Logging out will end your current session and you will need to enter your credentials again to access your account.";

  return (
    <aside className="bg-primarySelect z-30 flex flex-col gap-4 py-8 shadow-r">
      <Link to="/" className="flex items-center justify-center gap-4">
        <img
          src="https://vitejs.dev/logo.svg"
          alt="Speak Up Logo"
          title="Speak Up Logo"
          className="h-10"
        />
      </Link>
      <div
        className={`flex items-center justify-center w-full pt-4 ${
          isExpanded ? "px-2" : "px-0"
        }`}
      >
        <div className="relative flex items-center justify-center w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-grayText"></div>
          </div>
          <div className="relative z-10 bg-white px-2">
            <div
              className={`bg-primarySelect cursor-pointer text-grayText hover:text-blackText flex items-center justify-center rounded-full border border-grayText h-10 w-10`}
              onClick={() => setIsExpanded((prev) => !prev)}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <CollapseSvg className="h-8" />
              ) : (
                <ExpandSvg className="h-8 " />
              )}
            </div>
          </div>
        </div>
      </div>

      <SideNavLinks isExpanded={isExpanded} />

      <AlertDialog
        clickHandler={() => {
          setAuth({
            token: "",
            user: "",
          });
          removeAuthDetails();
          updateToast("Logged Out Successfully", "success");
          navigate("/auth");
        }}
        description={alertDescription}
        btnText="Yes, log me out"
        triggerClassName="flex items-center gap-4 pl-10 font-medium text-grayTextDark hover:text-dangerDark"
      >
        {isExpanded ? (
          <LogOutSvg className="h-7" />
        ) : (
          <Tooltip content="Log Out" side="right" sideOffset={20} asChild>
            <span>
              <LogOutSvg className="h-7" />
            </span>
          </Tooltip>
        )}
        {isExpanded ? <span>Log Out</span> : null}
      </AlertDialog>
    </aside>
  );
}
