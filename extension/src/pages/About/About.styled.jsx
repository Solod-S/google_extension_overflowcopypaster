import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { ImStackoverflow } from 'react-icons/im';

export const GithubIcon = styled(FaGithub)`
  fill: #130638;
  transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const GithubIconLink = styled.a`
  display: inline-block;
  margin-right: 20px;
  &:hover ${GithubIcon}, &:focus ${GithubIcon} {
    fill: #fd5315;
  }
`;

export const StackoverflowIcon = styled(ImStackoverflow)`
  fill: #fd5315;
  transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const StackoverflowIconLink = styled.a`
  display: inline-block;
  &:hover ${StackoverflowIcon}, &:focus ${StackoverflowIcon} {
    fill: #130638;
  }
`;
