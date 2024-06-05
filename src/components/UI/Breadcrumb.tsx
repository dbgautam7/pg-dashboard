import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRightSvg, HomeSvg } from "../../icons/AllSvgs";

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const paths = pathname === "/" ? ["dashboard"] : pathname.split("/").slice(1);

  return (
    <nav className="mb-2 text-[15px] font-medium text-grayText">
      <ol className="flex items-center gap-1">
        <li>
          <Link
            to="/"
            className={`flex cursor-pointer items-center gap-1.5 hover:text-blackText ${
              pathname === "/" ? "text-blackText" : ""
            }`}
          >
            <HomeSvg className="mb-0.5 h-[18px]" />
            <span>Home</span>
          </Link>
        </li>
        {paths.map((path, i) => (
          <li className="group flex items-center gap-1" key={path}>
            <ChevronRightSvg
              className={`h-6 ${pathname === "/" ? "text-blackText" : ""}`}
            />
            <button
              className="hover:text-blackText group-last:text-blackText"
              onClick={() => navigate(-(paths.length - i - 1))}
            >
              {path[0].toUpperCase() + path.slice(1)}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
