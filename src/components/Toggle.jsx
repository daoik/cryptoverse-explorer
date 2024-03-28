import { Switch } from "@headlessui/react";
import { MdGridView, MdOutlineTableRows } from "react-icons/md";
export default function Toggle({ on, setOn }) {
  return (
    <div className="flex items-center space-x-2 mt-4">
      <MdOutlineTableRows className="opacity-80" />
      <Switch
        checked={on}
        onChange={setOn}
        className={`${on ? "bg-neutral-900" : "bg-neutral-700"}
          relative inline-flex h-[21px]  w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 p-0 `}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${on ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-neutral-300 shadow-lg ring-0 transition duration-200 ease-in-out `}
        />
      </Switch>

      <MdGridView className="opacity-80 " />
    </div>
  );
}
