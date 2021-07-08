import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';
import { FadeInAnimation } from './defaults';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    ${FadeInAnimation}
    ${tw`h-screen flex justify-center text-white bg-gray-900 font-default`}
  }
`;
