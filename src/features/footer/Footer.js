import React from 'react';
import styled from 'styled-components';
import SocialMedia from '../social/SocialWidget';

const StyledFooter = styled.footer`
  box-sizing: border-box;
  /* height: auto; */
  min-height: 6rem;
  background: black;
  color: white;
  padding: 1rem 1rem 0;
  display: grid;
  gap: 1rem 1rem;
  grid-template-columns: minmax(3rem, 10rem) auto auto;
  grid-template-rows: auto auto 1.2rem;
`;

const Logo = styled.p`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  grid-area: 1 / 1 / 1 / 1;
`;
const SocialMediaComponent = styled(SocialMedia)`
  grid-area: 2 / 1 / auto/ auto;
`;
const Links = styled.div`
  grid-area: 1/ 5 / span 2/ span 1;
  align-self: end;
  p {
    margin: 0;
    ~ p {
      margin-bottom: .5rem;
    }
  }
`;
const Sublinks = styled.div`
  grid-area: 1/ 4 / span 2/ span 1;
  align-self: end;
  p {
    margin: 0;
    ~ p {
      margin-top: .5rem;
    }  }
`;

const FooterDetails = styled.div`
  grid-area: 3 / 1 / 3 / 6;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  background: black;
  /* height: 1.2rem; */
  color: darkgray;
  padding: 0 .5rem 0;
  p {
    line-height: 1rem;
    font-size: .8rem;
    margin: 0;
  }
`;
export const Footer = () => {

  const links = [
    {
      label: 'Github',
      link: 'https://www.github.com',
      icon: 'Gh'
    },
    {
      label: 'Instagram',
      link: 'https://www.instagram.com',
      icon: 'Ig'
    },
    {
      label: 'LinkedIn',
      link: 'https://www.linkedin.com',
      icon: 'Li'
    },

  ]

  return (
    <StyledFooter>
      <Logo>BRAND</Logo>
      <SocialMediaComponent links={links} />
      <Links>
        <p>Contact</p>
      </Links>
      <Sublinks>
        <p>New Arrivals</p>
        <p>Shop Collection</p>
      </Sublinks>
      <FooterDetails>
        <p>(c) 2020 Brand</p>
        <p>by bradley.rastrullo</p>
        <p>Disclaimers</p>
      </FooterDetails>
    </StyledFooter>
  );
}

export default Footer;