import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PageExport from "./pageExport";
import Stack from "@mui/material/Stack";

type Props = { handleToPageExport: any };

const websystem = (props: Props) => {
  const { handleToPageExport } = props;

  return (
    <div>
      <Typography gutterBottom variant="h3" align="center">
        All System
      </Typography>
      <Stack direction="row" spacing={10}>
        <Card sx={{ width: 345 }} onClick={handleToPageExport}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="/Logo.png"
              alt="green iguana"
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

        <Card sx={{ width: 345 }} onClick={handleToPageExport}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="/Logo.png"
              alt="green iguana"
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
