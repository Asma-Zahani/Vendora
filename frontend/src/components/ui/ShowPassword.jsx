/* eslint-disable react/prop-types */
import { useState } from "react";

const ShowPassword = ({ onToggle }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
    onToggle(show ? "password" : "text");
  };

  return (
    <div className="absolute top-1/4 right-4">
      <span className="text-purpleLight cursor-pointer text-sm font-semibold" onClick={toggleShow}> {show ? "Masquer" : "Afficher"}
      </span>
    </div>
  );
};

export default ShowPassword;