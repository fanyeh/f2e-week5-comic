import React, { Component } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { HeadingSecondary, SubHeadingSecondary, Paragraph } from '../../styles/typography';
import { Page, Flex } from '../../styles/layout';

class Home extends Component {
  render() {
    return (
      <Page>
        <Flex>
          <Image src={require('../../assets/cover.png')} alt="cover image" />
          <div>
            <Title>my hexschool</Title>
            <Content>
              <Flex>
                <SubHeadingSecondary>Genres</SubHeadingSecondary>
                Fusce/vehicula/dolor
              </Flex>

              <Flex>
                <SubHeadingSecondary>Author</SubHeadingSecondary>
                Namae Shiranai
              </Flex>

              <Flex>
                <SubHeadingSecondary>Status</SubHeadingSecondary>
                Ongoing
              </Flex>

              <Flex>
                <SubHeadingSecondary>Rate</SubHeadingSecondary>
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="far fa-star" />
              </Flex>
              <div>
                <SubHeadingSecondary>Summary</SubHeadingSecondary>
                <Paragraph>
                  If your banker breaks, you snap; if your apothecary by mistake sends you poison in
                  your pills, you die.
                </Paragraph>
                <Paragraph>
                  Therefore, I say, I saw that this situation of mine was the precise situation of
                  every mortal that has this Siamese connexion with a plurality of other mortals.
                </Paragraph>
              </div>
            </Content>
          </div>
        </Flex>

        <Footer />
      </Page>
    );
  }
}

export default Home;

const Image = styled.img`
  width: 18.75rem;
  height: 27.88rem;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  border: 0.25rem solid black;
`;

const Content = styled.div`
  padding: 0 1.25rem;
`;

const Title = HeadingSecondary.extend`
  background: black;
  padding: 0.5rem 0;
  text-transform: uppercase;
`;
