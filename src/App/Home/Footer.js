import React, { Component } from 'react';
import styled from 'styled-components';
import { SubHeadingPrimary, SubHeadingSecondary } from '../../styles/typography';
const chapters = ['chapter 1: the F2E challenge start!', 'chapter 2: todo list is going crazy!'];
class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <SubHeadingPrimary>all chapters</SubHeadingPrimary>
        <Chapters>
          {chapters.map((chapter, index) => (
            <SubHeadingSecondary key={chapter}>
              {chapter}
              {index === chapters.length - 1 && <Status>New</Status>}
            </SubHeadingSecondary>
          ))}
        </Chapters>
      </StyledFooter>
    );
  }
}

export default Footer;

const StyledFooter = styled.footer`
  margin-top: 1.5rem;

  & > ${SubHeadingPrimary} {
    background: black;
    display: inline-block;
    padding: 0 1.5rem;
  }
`;

const Chapters = styled.div`
  border: 0.25rem solid black;
  padding: 0.5rem 0;
  box-sizing: border-box;
  & > ${SubHeadingSecondary} {
    padding: 0.5rem 1.5rem;
    cursor: pointer;
  }
  & > ${SubHeadingSecondary}:hover {
    background: black;
    color: white;
  }
`;

const Status = styled.span`
  font-weight: 700;
  font-size: 0.88rem;
  color: #000000;
  line-height: 0.88rem;
  padding: 0 1rem;
  background: #50ff44;
  margin-left: 1rem;
`;
