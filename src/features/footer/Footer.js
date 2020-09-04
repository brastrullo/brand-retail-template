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
  gap: 1rem 3rem;
  grid-template-columns: minmax(max-content, auto) auto max-content max-content minmax(0, 1rem);
  grid-template-rows: auto auto 1.2rem;
  align-items: end;
  grid-template-areas:
  "logo . sublinks links ."
  "social . sublinks links ."
  "details details details details details";
  @media (max-width: 800px) {
    text-align: center;
    gap: 0 0;
    grid-template-columns: 100%;
    grid-template-rows: max-content max-content auto auto 1.2rem;
    justify-content: center;
    justify-items: center;
    grid-template-areas:
    "sublinks"
    "links"
    "logo"
    "social"
    "details";
  }
  p {
    margin: .5rem 0 0;
  }
`;

const Logo = styled.p`
  grid-area: logo;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
`;
const SocialMediaComponent = styled(SocialMedia)`
  grid-area: social;
  @media (max-width: 800px) {
    margin: 1rem;
  }
`;
const Links = styled.div`
  grid-area: links;
  /* p {
    margin: 0;
    ~ p {
      margin-bottom: .5rem;
    }
  } */
`;
const Sublinks = styled.div`
  grid-area: sublinks;
  /* p {
    margin: 0;
    ~ p {
      margin-top: .5rem;
    }  } */
`;

const FooterDetails = styled.div`
  grid-area: details;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  background: black;
  height: 1.2rem;
  width: 100%;
  color: darkgray;
  padding: 0 .5rem 0;
  justify-content: center;
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
      </FooterDetails>
    </StyledFooter>
  );
}

export default Footer;