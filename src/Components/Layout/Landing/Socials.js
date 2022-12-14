import React from "react";
import Instagram from "@mui/icons-material/Instagram";
import YouTube from "@mui/icons-material/YouTube";
import Facebook from "@mui/icons-material/Facebook";

//
const Socials = (props) => {
  return (
    <>
      <div
        className={`absolute z-10 flex flex-col items-center top-${props.top} md:top-${props.MDtop} justify-center px-4 -mt-${props.marginTop} md:mt-${props.MDmarginTop} pt-${props.paddingTop} md: pt-${props.MDpaddingTop}  space-y-4 md:px-12 lg:px-24`}
      >
        <div className={`flex flex-col space-y-4 text-[#707070]`}>
          <a href="https://instagram.com/wepollnow">
            <Instagram />
          </a>
          <a href="https://youtube.com/wepollnow">
            <YouTube />
          </a>
          <a href="https://facebook.com/wepollnow">
            <Facebook />
          </a>
        </div>
      </div>
    </>
  );
};

export default Socials;
