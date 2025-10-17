import React, { forwardRef } from "react";

const Header = forwardRef(function Header(props, ref) {
  return (
    <div className="header">
      <div  className="burger">
        <div ref={ref}
          className="border-[1px] w-full h-full  hover:scale-[3] absolute left-0 top-0 pointer-events-auto
"
        ></div>
      </div>
    </div>
  );
});

export default Header;
