import tw, { styled } from 'twin.macro';
import { DefaultButtonHover } from '@/styles/defaults';

export const List = styled.ul`
  ${tw`list-none mt-10 flex items-center justify-center flex-col`}

  li {
    ${tw`text-white rounded m-5 cursor-pointer w-72 text-center select-none sm:w-96 transform hover:-translate-y-1 hover:scale-110 `}
    ${DefaultButtonHover}

    a {
      ${tw`block p-6`}
    }
  }
`;
