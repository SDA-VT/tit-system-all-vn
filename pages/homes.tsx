import React, { useContext, useEffect, useState } from "react";
import { styled, ThemeProvider, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useRouter } from "next/router";
import Register from "./compoment/register";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
// import { useTranslation } from "react-i18next";
// import { i18n } from "../i18n";
import supabase from "@/compoment Config/supabase";
import Websystem from "./compoment/websystem";
import PageExport from "./compoment/pageExport";
import Head from "next/head";
import PageDashboard from "./compoment/pageDashboard";
import PageExportDowntime from "./compoment/pageExportDowntime";
import * as XLSX from "xlsx";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DrawerHome() {
  //   const { t, i18n } = useTranslation(); //language
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    const datacheckLanguage: any = localStorage.getItem("Language");
    // i18n.changeLanguage(datacheckLanguage);

    const fetchCheckID = async () => {
      let { data: userID, error } = await supabase
        .from("userID")
        .select("emp_no")
        .eq("emp_no", localStorage.getItem("emp_no"));
      if (userID?.length != 0) {
        console.log("Check Complese");
      } else {
        router.push("/");
      }
    };
    fetchCheckID();
  }, []);

  //   const appcontext: any = useContext(AppContext);
  // console.log(appcontext);
  //เช็ค state ถ้าไม่มีค่าให้ เด้นกลับมาไปหน้า login**

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [language, setLanguage] = useState<null | HTMLElement>(null);
  const handleMenulanguage = (event: React.MouseEvent<HTMLElement>) => {
    setLanguage(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (localStorage.getItem("PD_key") === null) {
      localStorage.clear();
      router.push("/");
    }
    if (localStorage.getItem("PD_key") != null) {
      alert("Please push STOP button before proceed  Logout !");
    }
  };
  //=========props function ======================/
  const handleToPageExport = () => {
    setDataShowPage(<PageExport />);
  };
  const handleToPageDashboard = () => {
    setDataShowPage(<PageDashboard />);
  };
  const handleToPageExportDowntime = () => {
    setDataShowPage(<PageExportDowntime />);
  };
  //  "no,date_begine,date_end,good_run_labor,all_run_labor,inline_labor,downtime_inline,total_inline,outline_labor,downtime_outline,total_outline,total_sdas,total_run_percent,good_run_percent,inline_percent,total_actual_percent"
  const handleExportLabelReport = async () => {
    let { data: Labor_IO_report, error } = await supabase
      .from("Labor_IO_report")
      .select("*")
      .order("date_end", { ascending: true });

    if (Labor_IO_report) {
      let wb: any = XLSX.utils.book_new();
      const ws: any = XLSX.utils.json_to_sheet(Labor_IO_report);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(wb, "labor_Report.xlsx");
    } else {
      console.log("Export File false :(", error);
    }
  };

  //==================end props function ===============./

  //set หน้าแรก จากปุ่มกด
  const [dataShowPage, setDataShowPage] = useState<any>(
    <Websystem
      handleToPageExport={handleToPageExport}
      handleToPageDashboard={handleToPageDashboard}
      handleToPageExportDowntime={handleToPageExportDowntime}
      handleExportLabelReport={handleExportLabelReport}
    />
  );
  const [idcheck, setIDchoeck] = useState<any>();

  //ทำเช็ค useEffect ทำงานระหว่าง cliant กับ server **ต้องทำความเข้าใจ useEffect เพิ่มเติม
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  //ทำเช็ค useEffect ทำงานระหว่าง cliant กับ server **ต้องทำความเข้าใจ useEffect เพิ่มเติม

  return (
    <div>
      <Head>
        <title>TIT All System</title>
        <meta name="description" content="TIT All System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                TIT System All
              </Typography>
              {localStorage.getItem("userName")}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  {"Name"} : {localStorage.getItem("userName")} &nbsp; {"Level"}
                  : {localStorage.getItem("Level")}
                </MenuItem>
                <MenuItem onClick={handleLogout}>{"Logout"}</MenuItem>
              </Menu>
              {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenulanguage}
                color="inherit"
              >
                <LanguageSharpIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={language}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(language)}
                onClose={(e) => setLanguage(null)}
              >
                <MenuItem
                  onClick={(e) => {
                    i18n.changeLanguage("th");
                    localStorage.setItem("Language", "th");
                    setLanguage(null);
                  }}
                >
                  TH
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    i18n.changeLanguage("en");
                    localStorage.setItem("Language", "en");
                    setLanguage(null);
                  }}
                >
                  EN
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    i18n.changeLanguage("cn");
                    localStorage.setItem("Language", "cn");
                    setLanguage(null);
                  }}
                >
                  CN
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    i18n.changeLanguage("vn");
                    localStorage.setItem("Language", "vn");
                    setLanguage(null);
                  }}
                >
                  VN
                </MenuItem>
              </Menu> */}
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItemButton
                onClick={(e) =>
                  setDataShowPage(
                    <Websystem
                      handleToPageExport={handleToPageExport}
                      handleToPageDashboard={handleToPageDashboard}
                      handleToPageExportDowntime={handleToPageExportDowntime}
                      handleExportLabelReport={handleExportLabelReport}
                    />
                  )
                }
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"All System"} />
              </ListItemButton>

              <Divider />
              <ListItemButton onClick={(e) => setDataShowPage(<Register />)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Register User"} />
              </ListItemButton>
            </List>
            <Divider />
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <Box>{dataShowPage}</Box>
          </Main>
        </Box>
      </ThemeProvider>
    </div>
  );
}
