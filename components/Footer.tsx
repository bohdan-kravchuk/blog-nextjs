import styled from 'styled-components';

export const Footer = () => {
  return (
    <FooterContainer>
      <section>The Blog ©2020</section>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #191D1E;
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  section {
    font-size: 1.5rem;
  }
`
