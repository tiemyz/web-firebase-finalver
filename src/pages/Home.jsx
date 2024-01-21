import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: white;
`

const HomeContainer = styled.section`
  background-color: cyan;
  height: 80vh;

`


function Home () {
  return (
    <AppContainer>
      <Header />
      <HomeContainer>
        <h1>oi, home!</h1>
      </HomeContainer>
      <Footer />
    </AppContainer>
  );
};

export default Home;