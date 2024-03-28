import { Switch } from "@headlessui/react";
import { MdGridView, MdOutlineTableRows } from "react-icons/md";
import Tooltip from "./Tooltip";
import useGridViewStore from "../store/gridViewStore";
export default function GridViewToggle() {
  const { gridView, toggleGridView } = useGridViewStore();
  return (
    <div className="absolute group group-focus-within:invisible ">
      <div className="relative">
        <div className="flex items-center space-x-2 mt-4">
          <MdOutlineTableRows className="opacity-80" />
          <Switch
            checked={gridView}
            onChange={toggleGridView}
            className={`${gridView ? "bg-neutral-900" : "bg-neutral-700"}
          relative inline-flex h-[21px]  w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 p-0 `}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${gridView ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-neutral-300 shadow-lg ring-0 transition duration-200 ease-in-out `}
            />
          </Switch>

          <MdGridView className="opacity-80 " />
          <Tooltip
            className="opacity-0 z-50 -bottom-12 -left-2 group-hover:-bottom-10 group-hover:opacity-100 whitespace-nowrap"
            content="Switch View"
            showArrow={false}
          />
        </div>
      </div>
    </div>
  );
}
