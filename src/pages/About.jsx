import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          textAlign: "center",
          py: 4,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          We are a leading company in providing quality products and services. Our
          mission is to deliver excellence in every aspect of our business.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          To provide innovative solutions that create value for our customers,
          driven by integrity and customer satisfaction.
        </Typography>
      
      </Box>
    </Container>
  );
};

export default About;
