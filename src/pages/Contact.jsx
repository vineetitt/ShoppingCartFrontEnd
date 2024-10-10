import React from 'react';
import { Container, Typography, Box, TextField, Button, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Contact = () => {
  return (
    <Container maxWidth="md">
      
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary" >
          If you have any questions, feel free to reach out to us! You can also follow us on our social media platforms.
        </Typography>
      </Box>

      
      <Box textAlign="center" mb={4}>
        <Typography variant="body1">Email: contact@company.com</Typography>
        <Typography variant="body1">Phone: +123-456-7890</Typography>
        <Typography variant="body1">Address: 123 Main St, City, Country</Typography>

        <Box mt={2}>
          
          <Link href="https://facebook.com" target="_blank" rel="noopener">
            <Facebook fontSize="large" sx={{ margin: 1 }} />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener">
            <Twitter fontSize="large" sx={{ margin: 1 }} />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener">
            <Instagram fontSize="large" sx={{ margin: 1 }} />
          </Link>
        </Box>
      </Box>

      
      <Box component="form" mt={4} noValidate autoComplete="off">
        <Typography variant="h5" component="h3" gutterBottom>
          Send us a message
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Your Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Your Email" variant="outlined" type="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Your Message" variant="outlined" multiline rows={4} />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
        </Box>
      </Box>

      
      <Box mt={5}>
        <Typography variant="h5" component="h3" gutterBottom>
          Visit Us
        </Typography>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1465821.8348327648!2d75.72259724999998!3d26.91243325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f0c1181d2f4c5%3A0x4ef1bc619f233a56!2sJaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1636313081033!5m2!1sen!2sus"
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0, borderRadius: '4px' }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </Box>
    </Container>
  );
};

export default Contact;
