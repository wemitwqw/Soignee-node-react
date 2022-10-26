import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProfileInfo({info}) {

  
  return (
      <Container
        sx={{
          py: 2,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        maxWidth="md"
      >
        <Box
          sx={{
            minHeight: "250px",
            width: "50",
            flex: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",



          }}
        >
          <AccountCircleIcon sx={{
              color: "#000000",
              fontSize: "200px",
          }} />
        </Box>
        <Box
            sx={{
                display: "flex",
                flex: "1 0 auto",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}
        >
            <Typography sx={{ minHeight: "60px", textAlign: "left"}} component="h1" variant="h5">
                First Name: {info["firstName"]}
            </Typography>
            <Typography sx={{ minHeight: "60px", textAlign: "left"}} component="h1" variant="h5">
                Last Name: {info["lastName"]}
            </Typography>
            <Typography sx={{ minHeight: "60px", textAlign: "left"}} component="h1" variant="h5">
                Email: {info["email"]}
            </Typography>

        </Box>
      </Container>
  );
}

export default ProfileInfo;
