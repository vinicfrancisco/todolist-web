import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAppDispatch } from '~/store';
import { addTodoList } from '~/store/features/todos/slice';

export default function CreateTodo() {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value) {
      setHasError(true);
      return;
    }

    setHasError(false);
    setValue('');
    dispatch(addTodoList(value));

    push('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHasError(false);
  };

  return (
    <Stack p="32px">
      <Heading textAlign="center" size="2xl" mb={8} pt={8}>
        Criar nova lista
      </Heading>

      <form onSubmit={handleCreateTodo}>
        <FormControl isInvalid={hasError}>
          <FormLabel>Nome da Lista</FormLabel>

          <Input
            autoFocus
            size="lg"
            _placeholder={{
              color: 'gray.500',
            }}
            placeholder="Insira o nome da lista"
            value={value}
            onChange={handleInputChange}
          />

          {hasError && <FormErrorMessage>Campo Obrigatório</FormErrorMessage>}

          <Button mt={6} size="lg" width="100%" colorScheme="green" type="submit">
            Criar
          </Button>
        </FormControl>
      </form>
    </Stack>
  );
}
