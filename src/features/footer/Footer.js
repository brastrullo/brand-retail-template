import React from 'react';
import styled from 'styled-components';
import SocialMedia from '../social/SocialWidget';

const StyledFooter = styled.footer`
  box-sizing: border-box;
  min-height: 10rem;
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
    /* margin-bottom: 10rem; */
    text-align: center;
    gap: 0 0;
    grid-template-columns: 100%;
    grid-template-rows: max-content max-content 2rem auto auto auto 1.2rem;
    justify-content: center;
    justify-items: center;
    grid-template-areas:
    "sublinks"
    "links"
    "."
    "logoicon"
    "logo"
    "social"
    "details";
  }
  p {
    margin: .5rem 0 0;
  }
`;

const Logo = styled.p`
  display: flex;
  flex-flow: row wrap;
  grid-area: logo;
  font-size: 3rem;
  font-weight: bold;
  align-items: center;
  align-content: center;
  margin: 0;
  span + span {
    margin-left: 1rem;
  }
  @media (max-width: 800px) {
    flex-flow: column nowrap;
    text-align: center;
    justify-content: center;
    span + span {
      margin-left: 0;
    }
  }
`;

const LogoIcon = styled.span`
  grid-area: logoicon;
  display: inline-block;
  width: 45px;
  height: 45px;
  background: grey;
`;

const SocialMediaComponent = styled(SocialMedia)`
  grid-area: social;
`;
const Links = styled.div`
  grid-area: links;
`;
const Sublinks = styled.div`
  grid-area: sublinks;
`;

const FooterDetails = styled.div`
  grid-area: details;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  background: black;
  height: 1.2rem;
  width: 100%;
  color: #373737;
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
      label: 'Facebook',
      link: 'https://www.facebook.com',
      icon: 'fb'
    },
    {
      label: 'Instagram',
      link: 'https://www.instagram.com',
      icon: 'in'
    },
    {
      label: 'Twitter',
      link: 'https://www.twitter.com',
      icon: 'tw'
    },

  ]

  return (
    <StyledFooter>
      <Logo>
        <LogoIcon />
        <span>BRAND</span>
      </Logo>
      <SocialMediaComponent links={links} />
      <Links>
        <p>Contact</p>
      </Links>
      <Sublinks>
        <p>New Arrivals</p>
        <p>Shop Collection</p>
      </Sublinks>
      <FooterDetails>
        <p>(c) 2020 Brand by bradley.rastrullo</p>
      </FooterDetails>
    </StyledFooter>
  );
}

export default Footer;