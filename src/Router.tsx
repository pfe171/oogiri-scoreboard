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
        <div
          css={css({
            backgroundColor: "darkslategray",
            paddingTop: "20px",
            paddingBottom: "20px",
            color: "#858585",
            minHeight: "calc( 100vh - 50px )",
            marginTop: "50px",
          })}
        >
          <Outlet />
        </div>
      </>
    ),
    children: [
      {
        index: true,
        element: <Table />,
      },
      {
        path: "edit",
        element: <EditPlayers />,
      },
    ],
  },
]);
