import React from "react";

const TableConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: true,
        },
        leftSidePanel: {
          display: true,
        },
        rightSidePanel: {
          display: true,
        },
      },
    },
  },
  routes: [
    {
      path: "/:url_key?/tabledemo",
      component: React.lazy(() => import("./Tabledemo")),
    },
  ],
};

export default TableConfig;
