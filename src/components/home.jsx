import React from "react";

export default function Home() {
  let showinui = localStorage.getItem("fullname");
  // console.log(showinui);

  return (
    <div style={{ margin: "20px " }}>
      <h1>
        {showinui
          ? "Welcome" + " " + showinui.toUpperCase()
          : "Welcome as a Guest"}
      </h1>
    </div>
  );
}
