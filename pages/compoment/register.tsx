import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import supabase from "../../compoment Config/supabase";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import Image from "next/image";

const bcrypt = require("bcryptjs");

const theme = createTheme();

const register1 = () => {
  // const { t, i18n } = useTranslation(); //language
  const [pass1, setPass] = useState<any>("");
  const [pass2, setPas2] = useState<any>("");
  console.log("pass2", pass2);
  const [dataFname, setDataFname] = useState<string>("");
  const [dataLname, setDataLname] = useState<string>("");
  const [dataDepartment, setDataDepartment] = useState<string>("");

  const [user1, setUser1] = useState<any>("");

  const [level1, setLevel] = useState<any>("");
  const [formError, setFromError] = useState<any>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user1 || !dataFname || !dataLname || !pass1 || !level1) {
      setFromError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    const { data, error } = await supabase.from("userID").insert([
      {
        emp_no: user1,
        emp_Fname: dataFname,
        emp_Lname: dataLname,
        department: dataDepartment,
        pass: pass2,
        level: level1,
      },
    ]);
    if (error) {
      console.log(error);
      setFromError("กรอกข้อมูลให้ครบด้วยครับ หรือ");
    }
    if (data) {
      console.log(data);

      setFromError(null);
    }
    alert("Register Success");
    // router.push("/");
    location.reload();
  };

  // console.log(user1);
  console.log("dataAll", user1, dataFname, dataLname, dataDepartment);

  //ทำเช็ค useEffect ทำงานระหว่าง cliant กับ server **ต้องทำความเข้าใจ useEffect เพิ่มเติม------
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  //ทำเช็ค useEffect ทำงานระหว่าง cliant กับ server **ต้องทำความเข้าใจ useEffect เพิ่มเติม

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: -1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image src={"/Logo.png"} alt={""} width="450" height="250" />

            <Typography variant="h4">{"Register"}</Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="emp_no"
                    label="User ID"
                    name="emp_no"
                    value={user1}
                    onChange={(event) => setUser1(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Fname"
                    label="First name"
                    name="FirstName"
                    value={dataFname}
                    onChange={(e) => setDataFname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Lname"
                    label="Last name"
                    name="LastName"
                    value={dataLname}
                    onChange={(e) => setDataLname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="department"
                    label="Department"
                    name="department"
                    value={dataDepartment}
                    onChange={(e) => setDataDepartment(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="pass"
                    label="Password"
                    type="password"
                    id="pass"
                    autoComplete="new-password"
                    value={pass1}
                    onChange={(event) => {
                      setPass(event.target.value);
                      setPas2(bcrypt.hashSync(event.target.value, 10));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel>Level</InputLabel>
                  <Select
                    id="level"
                    name="level"
                    type="level"
                    fullWidth
                    value={level1}
                    onChange={(event) => setLevel(event.target.value)}
                  >
                    <MenuItem value="Leader">Leader</MenuItem>
                    <MenuItem value="Foreman">Foreman</MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>

              <Link onClick={(e) => location.reload()}>
                <Button
                  name="home"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  HOME
                </Button>
              </Link>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  {formError && <p className="error">{formError}</p>}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
export default register1;
