import tw from 'twin.macro';
import styled from 'styled-components';
import { DefaultButtonHover } from '@/styles/defaults';

export const ButtonWrapper = styled.button`
  ${tw`flex items-center justify-center p-4 pl-6 pr-6 rounded outline-none
   mx-auto mt-5 md:absolute left-5`}
  ${DefaultButtonHover}
`;
