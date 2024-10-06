/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./Header";
import Table from "./Table";
import EditPlayers from "./EditPlayers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <div
            css={css({
              backgroundColor: "darkslategray",
              paddingTop: "20px",
              paddingBottom: "20px",
              color: "#858585",
              fontFamily: "MS UI Gothic",
            })}
          >
            ,
            <Table />
          </div>
        ),
      },
      {
        path: "edit",
        element: (
          <div
            css={css({
              backgroundColor: "darkslategray",
              paddingTop: "20px",
              paddingBottom: "20px",
              color: "#858585",
            })}
          >
            <EditPlayers />
          </div>
        ),
      },
    ],
  },
]);
