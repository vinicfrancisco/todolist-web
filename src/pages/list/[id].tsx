import { Button, FormControl, FormErrorMessage, HStack, Heading, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Todo from '~/components/Todo';
import { useAppDispatch, useAppSelector } from '~/store';
import { addTodoItem } from '~/store/features/todos/slice';

export default function CreateTodo() {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.todos.lists.find((item) => item.id === id));

  const [todoInputValue, setTodoInputValue] = useState('');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();

    if (!list?.id) return;

    if (!todoInputValue) {
      setHasError(true);
      return;
    }

    dispatch(
      addTodoItem({
        listId: list.id,
        text: todoInputValue,
      }),
    );

    setHasError(false);
    setTodoInputValue('');
  };

  if (!list?.id) return null;

  const { name, items } = list;

  return (
    <Stack p="32px">
      <Heading textAlign="center" size="2xl" mb={8} pt={8}>
        {name}
      </Heading>

      <form onSubmit={handleAddTodo}>
        <HStack m="16px 0">
          <FormControl isInvalid={hasError}>
            <HStack>
              <Input
                autoFocus
                placeholder="Digite aqui o que você gostaria de adicionar na lista"
                value={todoInputValue}
                onChange={(e) => setTodoInputValue(e.target.value)}
              />

              <Button colorScheme="green" ml={8} type="submit">
                Adicionar
              </Button>
            </HStack>

            {hasError && <FormErrorMessage>Campo Obrigatório</FormErrorMessage>}
          </FormControl>
        </HStack>
      </form>

      {items.map((item, index) => (
        <Todo key={item.id} data={item} index={index} listId={list.id} />
      ))}
    </Stack>
  );
}
