import React, { forwardRef } from "react";
import Magnetic from "./Magnetic";

const Header = forwardRef(function Header(props, ref) {
  return (
    <div className="header">
      <Magnetic>
        <div className="burger">
          <div
            ref={ref}
            className="border-[1px] w-full h-full  hover:scale-[3] absolute left-0 top-0 pointer-events-auto
"
          ></div>
        </div>
      </Magnetic>
    </div>
  );
});

export default Header;
