import React from 'react';
import styled from 'styled-components';
import { Header } from '../header/Header.js';
import { Footer } from '../footer/Footer.js';
import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom';

const StyledLayout = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;

const ComponentWrapper = styled.div`
  min-height: calc(100vh - 3rem);

  h1 {
    font-size: 3rem;
    margin: 0;
    padding: 1rem;
  }
  @media (max-width: 800px) {
    margin-top: 3rem;
  }
`;

export function Layout(props) {
  const { component } = props;
  const location = useLocation();
  const renderFooter = (location.pathname !== '/cart') || !isMobile;


  return (
    <StyledLayout>
      <Header />
        <ComponentWrapper>
          { React.createElement(component) }
        </ComponentWrapper>
        { renderFooter &&
          <Footer />
        }
    </StyledLayout>
  );
}
