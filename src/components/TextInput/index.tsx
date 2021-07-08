import { BsSearch } from 'react-icons/bs';

import { InputHTMLAttributes } from 'react';
import { SearchInput, InputWrapper } from './styles';

const TextInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <InputWrapper>
      <BsSearch size="30" color="white" opacity={0.6} />
      <SearchInput type="text" {...props} />
    </InputWrapper>
  );
};

export default TextInput;
