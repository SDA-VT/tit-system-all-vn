import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PageExport from "./pageExport";
import Stack from "@mui/material/Stack";

type Props = { handleToPageExport: any; handleToPageDashboard: any };

const websystem = (props: Props) => {
  const { handleToPageExport, handleToPageDashboard } = props;

  return (
    <div>
      <Typography gutterBottom variant="h3" align="center">
        All System
      </Typography>
      <Stack direction="row" spacing={10}>
        <Card sx={{ width: 345 }} onClick={handleToPageExport}>
          <CardActionArea>
            <CardMedia
              className="frame"
              component="iframe"
              height="200"
              src="https://tit-export-history-wo.vercel.app"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Export W/O history
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
              test
            </Typography> */}
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ width: 345 }} onClick={handleToPageDashboard}>
          <CardActionArea>
            <CardMedia
              className="frame"
              component="iframe"
              height="200"
              src="https://dashboard-tit-line.vercel.app"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                DashBoard Production Monitoring
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
              test
            </Typography> */}
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </div>
  );
};
export default websystem;
