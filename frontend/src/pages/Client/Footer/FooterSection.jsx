/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FooterSection = ({ title, children, hidden }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="flex items-center justify-between w-full lg:cursor-default" onClick={() => setOpen(!open)}>
        <h3 className={`text-left font-bold ${hidden && "lg:hidden"}`}>{title}</h3>
        <span className="lg:hidden">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {/* Contenu visible sur lg+ OU si ouvert */}
      <div className={`mt-2 ml-2 sm:ml-0 space-y-2 text-sm text-gray-600 dark:text-gray-400 ${open ? "" : "hidden"} lg:block`}>
        {children}
      </div>
    </div>
  );
};

export default FooterSection;
