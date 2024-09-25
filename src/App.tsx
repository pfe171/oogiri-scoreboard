/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./Header";
import Table from "./Table";

function App() {
  return (
    <>
      <Header />
      <div
        css={css({
          backgroundColor: "darkslategray",
          paddingTop: "20px",
          paddingBottom: "20px",
          color: "#858585",
          fontFamily: "MS UI Gothic",
        })}
      >
        <Table />
      </div>
    </>
  );
}

export default App;
