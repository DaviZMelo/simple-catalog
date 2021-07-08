import tw from 'twin.macro';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';
import { ButtonWrapper } from './styles';

const TextInput: React.FC = () => {
  return (
    <Link href="/">
      <ButtonWrapper>
        <BsArrowLeft size={30} />
        <p tw="ml-2">Voltar</p>
      </ButtonWrapper>
    </Link>
  );
};

export default TextInput;
