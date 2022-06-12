import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DashboardLayout from "../components/AdminDashboard/DashboardLayout";
import { Toolbar } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { useRouter } from "next/router"

export default function DashboardMenu() {
  const router = useRouter();

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
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>Dashboard</Button>
            <Button onClick={() => router.push("/user")}>Users</Button>
            <Button onClick={() => router.push("/products")}>Products</Button>
            <Button onClick={() => router.push("/transactions")}>
              Transactions
            </Button>
            <Button onClick={() => router.push("/categories")}>Category</Button>
          </ButtonGroup>
        </Container>
      </Box>
    </Box>
  );
}
