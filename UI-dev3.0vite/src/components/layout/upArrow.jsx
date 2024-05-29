import { useState,useEffect } from "react";
export default function UpArrow(){
  const [display,setDisplay] = useState('none');
  useEffect(
    ()=>{
      window.onscroll = () => {
        setDisplay(window.pageYOffset > 100 ? "block" : "none");
      };
    }

  );

  return (
    <i
      onClick={() => {
        window.scroll(0, 0);
      }}
      className="fa fa-chevron-up fa-3x"
      style={{
        display,
        bottom: "50px",
        height: "50px",
        position: "fixed",
        right: "50px",
        width: "50px",
        cursor: "pointer",
        color: "#013e7e"
      }}
    />
  );
}
