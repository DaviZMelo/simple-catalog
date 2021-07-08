import tw from 'twin.macro';
import Link from 'next/link';
import { DefaultTextHover } from '@/styles/defaults';

export default function NotFound() {
  return (
    <div tw="flex flex-col justify-center items-center h-full">
      <h1 tw="text-6xl mb-6">404</h1>
      <p tw="text-3xl mb-6">Are you lost?</p>
      <Link href="/">
        <a
          tw="text-purple-500 cursor-pointer font-bold hover:text-purple-700 transition duration-500 ease-in-out"
          css={DefaultTextHover}
        >
          Go back
        </a>
      </Link>
    </div>
  );
}
