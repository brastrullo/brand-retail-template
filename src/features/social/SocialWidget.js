import React from 'react';
import styled from 'styled-components';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter
} from 'react-icons/fa';
import shortid from 'shortid';
import {
  Link
} from "react-router-dom";

const Icons = {
  fb: FaFacebook,
  in: FaInstagram,
  tw: FaTwitter
};

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const LinkContainer = styled.div`
  margin: .25rem 1rem;
  i {
    font-size: 1.5rem;
    color: black;
    font-weight: bold;
    font-style: normal;
    margin: auto;
    svg {
      fill: white;
    }
  }
  
  .link-label {
    /* background: lightgray; */
    display: flex;
    /* width: 2.5rem;
    height: 2.5rem; */
    text-decoration: none;
  }
`;

export const SocialWidget = ({links, className}) => {
  const SocialLinkMap = links.map((obj, i) => {
    const { label, link, icon } = obj;
    const FaIcon = Icons[icon]
    return (
      <LinkContainer key={shortid.generate()}>
        <Link className={'link-label'} to={link} label={label} >
          <i>{React.createElement(FaIcon)}</i>
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