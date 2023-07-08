import { CheckIcon } from '@chakra-ui/icons';
import { Flex, useCheckbox } from '@chakra-ui/react';

interface ICheckboxProps {
  checked: boolean;
  isEditing: boolean;
  onCheck: () => void;
}

function Checkbox({ checked, isEditing, onCheck }: ICheckboxProps) {
  const { getInputProps, getCheckboxProps } = useCheckbox();

  return (
    <>
      <input {...getInputProps()} hidden disabled={isEditing} checked={checked} onChange={onCheck} />

      <Flex
        border="2px solid"
        borderColor={checked ? 'green.500' : 'gray.300'}
        bg={checked ? 'green.500' : 'transparent'}
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {checked && <CheckIcon boxSize={3} />}
      </Flex>
    </>
  );
}

export default Checkbox;
