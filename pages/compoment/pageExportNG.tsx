import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Iframe from "react-iframe";

type Props = {};

const pageExport = (props: Props) => {
  return (
    <Box display="flow">
      <Iframe
        url="https://tit-export-ng.vercel.app/"
        width="100%"
        height="850"
        className="frame"
      />
    </Box>
  );
};
export default pageExport;
