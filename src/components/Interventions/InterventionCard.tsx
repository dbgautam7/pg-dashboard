/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from "react";
import { DotsHorizontalSvg, MembershipsSvg } from "../../icons/AllSvgs";
import { InterventionCardProps } from "../../types/componentTypes";
import DropdownMenu from "../Shared/DropdownMenu";
import Switch from "../UI/Switch";

export default function InterventionCard({
  data,
  statusHandler,
}: InterventionCardProps) {
  const [allowHover, setAllowHover] = useState(true);

  return (
    <article
      className={`relative cursor-pointer rounded bg-white py-4 px-6 shadow transition-transform duration-200 ease-out ${
        allowHover ? "hover:scale-105" : ""
      }`}
    >
      <div
        onMouseEnter={() => setAllowHover(false)}
        onMouseLeave={() => setAllowHover(true)}
        onClick={(e) => e.stopPropagation()}
        className="hover:bg-primarySelect absolute right-4 flex rounded-full px-2"
      >
        <DropdownMenu
          editHandler={() => {}}
          deleteHandler={() => {}}
          closeHandler={() => setAllowHover(true)}
        >
          <DotsHorizontalSvg className="h-6" />
        </DropdownMenu>
      </div>
      <section className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blackText">
          <MembershipsSvg className="h-6" />
        </div>
        <h3 className="font-semibold">{data.title}</h3>
        <div className="flex items-center gap-4 text-sm">
          <h5 className="font-medium">{data.description}</h5>
        </div>
      </section>
      <hr className="my-4 border-grayBorderDark" />
      <section className="flex justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm">
            <span>Active</span>
            <span className="font-medium">
              <Switch
                active={data.isActive}
                changeHandler={() => statusHandler(data.idx)}
              ></Switch>
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}
