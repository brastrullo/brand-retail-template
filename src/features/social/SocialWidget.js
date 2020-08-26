import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import {
  Link
} from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const LinkContainer = styled.div`
  margin: .25rem;
  i {
    font-size: 1.1rem;
    color: black;
    font-weight: bold;
    font-style: normal;
    margin: auto;
  }
  
  .link-label {
    background: lightgray;
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    text-decoration: none;
  }
`;

export const SocialWidget = ({links, className}) => {
  const SocialLinkMap = links.map((obj, i) => {
    const { label, link, icon } = obj;
    return (
      <LinkContainer key={shortid.generate()}>
        <Link className={'link-label'} to={link} label={label} >
          <i>{ icon }</i>
        </Link>
      </LinkContainer>
    )
  });

  return (
    <Container className={className}>
      { SocialLinkMap }
    </Container>
  );
}

export default SocialWidget;