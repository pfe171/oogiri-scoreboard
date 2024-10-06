import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { router } from "./Router.tsx";
import "normalize.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <MantineProvider>
    <RouterProvider router={router} />
  </MantineProvider>
  //</StrictMode>
);
