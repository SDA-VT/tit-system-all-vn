import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PageExport from "./pageExport";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

type Props = {
  handleToPageExport: any;
  handleToPageDashboard: any;
  handleToPageExportDowntime: any;
};

const websystem = (props: Props) => {
  const {
    handleToPageExport,
    handleToPageDashboard,
    handleToPageExportDowntime,
  } = props;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h3" align="center">
              All System
            </Typography>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Card
              sx={{ width: "100%", height: "100%", p: 1 }}
              onClick={handleToPageExport}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image="/Logo.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    color="text.secondary"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Export W/O history
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
              test
            </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Card
              sx={{ width: "100%", height: "100%", p: 1 }}
              onClick={handleToPageExportDowntime}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image="/Logo.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="text.secondary"
                    component="div"
                  >
                    Export W/O Downtime record
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
              test
            </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Card
              sx={{ width: "100%", height: "100%", p: 1 }}
              onClick={handleToPageDashboard}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image="/Dashboard.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    color="text.secondary"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    DashBoard Monitoring
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
              test
            </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default websystem;
