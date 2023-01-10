import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.jpg";
import useStyles from "./style";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "./flux/reducers/posts/index";
import { fetchPosts } from "./api";
import { extractEmails } from "./api/python";
import { getEmailRecords } from "./flux/reducers/scrappedData";
import Demo from "./components/Demo";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes, // Switch
  Route,
  Link,
} from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Composer from "./allPages/composer";


const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    (async () => {
      const { data } = await fetchPosts();
      console.log("DATA:", data);
      dispatch(getPosts(data));
    })();
  }, [dispatch]);

  return (
    <>
      <Router>
        <div className="main">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mail-templates" element={<Composer />} />
            <Route path="/about" element={<About />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
    // <Demo/>
    // <Container maxWidth="lg">
    //   <AppBar className={classes.appBar} position="static" color="inherit">
    //     <Typography className={classes.heading} variant="h2" align="center">
    //       Memories
    //     </Typography>
    //     <img
    //       className={classes.image}
    //       src={memories}
    //       alt="memories"
    //       height="60"
    //     />
    //   </AppBar>
    //   <Grow in>
    //     <Container>
    //       <Grid
    //         container
    //         justifyContent="space-between"
    //         alignItems="stretch"
    //         spacing={3}
    //       >
    //         <Grid item xs={12} sm={7}>
    //           <Posts />
    //         </Grid>
    //         <Grid item xs={12} sm={4}>
    //           <Form />
    //         </Grid>
    //       </Grid>
    //     </Container>
    //   </Grow>
    // </Container>
  );
};
export default App;
