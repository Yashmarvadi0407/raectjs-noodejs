import React from 'react';

const SampleConfig: {} = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "/:url_key?/sample",
      component: React.lazy(() => import("./sample")),
    },
  ],
};

export default SampleConfig;
