import React from "react";
import styled from "styled-components";


const FooterContainer = styled.footer`
  height: 10vh;
  background-color: red;
`
function Footer () {
  return (
    <FooterContainer>
      <p>WebFirebase</p>
    </FooterContainer>
  );
};

export default Footer;
