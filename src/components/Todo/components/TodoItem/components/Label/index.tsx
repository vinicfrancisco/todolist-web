import { Box, Input, Text, useCheckbox } from '@chakra-ui/react';

interface ILabelProps {
  isEditing: boolean;
  text: string;
  inputValue: string;
  onChange: (value: string) => void;
}

function Label({ isEditing, text, inputValue, onChange }: ILabelProps) {
  const { getLabelProps } = useCheckbox();

  return (
    <Box ml={4} flex="1">
      {isEditing ? (
        <Input autoFocus value={inputValue} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Text textAlign="justify" {...getLabelProps()}>
          {text}
        </Text>
      )}
    </Box>
  );
}

export default Label;
