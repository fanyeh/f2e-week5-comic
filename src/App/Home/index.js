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
              <ContentItem>
                <SubHeadingSecondary>Genres</SubHeadingSecondary>
                Fusce/vehicula/dolor
              </ContentItem>

              <ContentItem>
                <SubHeadingSecondary>Author</SubHeadingSecondary>
                Namae Shiranai
              </ContentItem>

              <ContentItem>
                <SubHeadingSecondary>Status</SubHeadingSecondary>
                Ongoing
              </ContentItem>

              <ContentItem>
                <SubHeadingSecondary>Rate</SubHeadingSecondary>
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="far fa-star" />
              </ContentItem>
              <div>
                <SummaryHeading>Summary</SummaryHeading>
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
  padding-left: 1.25rem;
`;

const ContentItem = Flex.extend`
  margin-bottom: 1rem;
  align-items: center;
  & > ${SubHeadingSecondary} {
    width: 4.5rem;
  }
`;

const SummaryHeading = SubHeadingSecondary.extend`
  margin-bottom: 0.5rem;
  & + ${Paragraph} {
    margin-bottom: 1.5rem;
  }
`;

const Title = HeadingSecondary.extend`
  background: black;
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;
