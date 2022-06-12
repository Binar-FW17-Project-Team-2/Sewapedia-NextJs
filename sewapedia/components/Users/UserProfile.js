import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Navbar from "../../components/NavBar";

export default function UserProfile() {
  const router = useRouter();
  const { params } = router.query;
  console.log(params)

  const [data, setDataProfile] = useState();

  useEffect(() => {
    getUser()
  }, []);


  async function getUser() {
    const dataProfile = await (
      await fetch(`http://localhost:4000/api/v1/profile/${params}`, {
        credentials: "include"
      })).json();

    setDataProfile(dataProfile);
    console.log(data)
  }
  
  return (
    <>
      {/* <Navbar/> */}
      <h1>Halaman User Profile</h1>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={data?.img_url}
          alt={data?.id}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.Biodata.firstName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.Biodata.lastName} {data?.Biodata.address}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}