import tw from 'twin.macro';
import { css, keyframes } from 'styled-components';

const FadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FadeInAnimation = css`
  animation: ${FadeAnimation} ease-in-out 1s;
`;
export const DefaultButtonHover = tw`transition duration-500 ease-in-out bg-gray-800  hover:bg-purple-700`;
export const DefaultTextHover = tw`transition duration-500 ease-in-out text-purple-500 hover:text-purple-700`;
export const Title = tw.h1`text-white text-5xl text-center mt-10`;
