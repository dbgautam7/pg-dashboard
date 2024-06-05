import { useNavigate } from "react-router-dom";

import { ChevronLeftSvg } from "../../icons/AllSvgs";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="btn-primary group flex items-center gap-1 py-2 pl-6 pr-8"
      onClick={() => navigate(-1)}
    >
      <ChevronLeftSvg className="h-6 transition-transform duration-100 ease-out group-hover:-translate-x-1" />
      <span>Go Back</span>
    </button>
  );
}
