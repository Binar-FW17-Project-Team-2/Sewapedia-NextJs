import { async } from "@firebase/util";
import { Container, Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router"
import DashboardLayout from "../AdminDashboard/DashboardLayout";

export default function EditUser() {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardLayout />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <UserEdit />
        </Container>
      </Box>
    </Box>
  )
}

function UserEdit() {
  const router = useRouter()
  const { id } = router.query

  const [ editUser, setEditUser ] = useState();

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const data = await ( 
      await fetch (`http://localhost:4000/api/v1/user/${id}`, {
        credentials: "include"
      })
    ).json();

    setEditUser(data)
    console.log(data)
  }
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
      email: editUser?.email,
      password: editUser?.password,
      img_url: editUser?.img_url,
      role: editUser?.role
    },
    onSubmit: (values) => {
      // console.log(values)
      fetch(`http://localhost:4000/api/v1/user/edit/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(values)
      })
      .then((data) => {
        console.log(data, 'This is data')
        if (data.status === 201){
          router.push("/user")
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
     />
      <TextField
          fullWidth
          id="img_url"
          name="img_url"
          label="img_url"
          type="img_url"
          value={formik.values.img_url}
          onChange={formik.handleChange}                      
          error={formik.touched.img_url && Boolean(formik.errors.img_url)}
          helperText={formik.touched.img_url && formik.errors.img_url}
      />
      <TextField
          fullWidth
          id="role"
          name="role"
          label="role"
          type="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
         Submit
      </Button>
      </form>
    </div>)
    

}

