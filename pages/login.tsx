import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useContext } from "react";
import supabase from "@/compoment Config/supabase";
// import AppContext from "../src/context/Appcontext";
import { useRouter } from "next/router";
import Image from "next/image";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

// import { useTranslation } from "react-i18next";
const bcrypt = require("bcryptjs");
const theme = createTheme();

export default function Login() {
  //========= language =====================================
  //   const { t, i18n } = useTranslation(); //language
  const [languagesUP, setLanguagesUP] = useState<any>("en");
  const [language, setLanguage] = useState<null | HTMLElement>(null);
  const handleMenulanguage = (event: React.MouseEvent<HTMLElement>) => {
    setLanguage(event.currentTarget);
  };
  //---------------------------------------------------------

  const jwt = require("jsonwebtoken");
  const secret = "marko-login-tit-all";
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  // console.log(username, pass);
  // โชรข้อมูลตอนแสดงพิม

  const router = useRouter();
  //   const appcontext: any = useContext(AppContext);
  //   console.log(appcontext);

  const [data1, setData1] = useState<any>("");
  console.log(data1);
  const FetchData = async () => {
    const { data, error } = await supabase
      .from("userID")
      .select("*")
      .eq("emp_no", username)
      // .eq("pass", pass)
      .limit(1); //ใช้แทน single
    if (!error) {
      const result = bcrypt.compareSync(pass, data[0].pass);
      // setData(data);
      if (data.length > 0 && result) {
        setData1(data[0]);

        // const token = jwt.sign(
        //   {
        //     id: data[0].id,
        //     emp_no: data[0].emp_no,
        //     level: data[0].level,
        //   },
        //   secret
        // );
        localStorage.setItem("Language", languagesUP);
        // localStorage.setItem("token", token);
        localStorage.setItem("Fname", data[0].emp_Fname);
        localStorage.setItem("Lname", data[0].emp_Lname);
        localStorage.setItem("Level", data[0].level);
        localStorage.setItem("emp_no", data[0].emp_no);

        if (data[0].level === "Admin") {
          router.push("/homes");
        }
        if (data[0].level === "Manager") {
          router.push("/homes");
        }
        if (data[0].level === "Leader") {
          router.push("/homes");
        }
        if (data[0].level === "Foreman") {
          router.push("/homes");
        }
      } else {
        console.log(error, "login false");
        alert("login false !!! ");
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    FetchData();
  };
  //แสดงค่าที่กดล็อกอินเข้าไปล้วส่งข้อมูลกลับมาให้

  return (
    <ThemeProvider theme={theme}>
      {/* <Typography sx={{ textAlign: "right" }}>
        {languagesUP.toUpperCase()}
        <IconButton
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
              setLanguagesUP("th");
              setLanguage(null);
            }}
          >
            TH
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              i18n.changeLanguage("en");
              setLanguagesUP("en");
              setLanguage(null);
            }}
          >
            EN
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              i18n.changeLanguage("cn");
              setLanguagesUP("cn");
              setLanguage(null);
            }}
          >
            CN
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              i18n.changeLanguage("vn");
              setLanguagesUP("vn");
              setLanguage(null);
            }}
          >
            VN
          </MenuItem>
        </Menu>
      </Typography> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={"/Logo1.png"} alt={""} width="520" height="250" />
          <EngineeringIcon color="primary" sx={{ fontSize: 60, m: 3 }} />
          <Typography component="h1" variant="h4" color="primary">
            TIT System All
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
              onChange={(e) => setPass(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={username.length < 1 && pass.length < 1}
            >
              SignIn
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
