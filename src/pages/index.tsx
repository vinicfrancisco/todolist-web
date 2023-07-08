import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/store';
import { addTodoList, removeTodoList } from '~/store/features/todos/slice';

export default function Home() {
  const dispatch = useAppDispatch();

  const lists = useAppSelector((state) => state.todos.lists);

  const [todoListName, setTodoListName] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleCreateTodoList = (e: FormEvent) => {
    e.preventDefault();

    if (!todoListName) {
      setHasError(true);
      return;
    }

    setHasError(false);
    setTodoListName('');
    dispatch(addTodoList(todoListName));
  };

  const handleRemoveList = (id: string) => {
    dispatch(removeTodoList(id));
  };

  return (
    <Stack p="32px">
      <Heading textAlign="center" size="2xl" mb={8} pt={8}>
        Minhas Listas
      </Heading>

      <Stack m="16px 0">
        <form onSubmit={handleCreateTodoList}>
          <FormControl isInvalid={hasError}>
            <HStack>
              <Input
                placeholder="Insira o nome da lista"
                value={todoListName}
                onChange={(e) => setTodoListName(e.target.value)}
              />

              <Button colorScheme="green" ml={8} type="submit">
                Adicionar
              </Button>
            </HStack>

            {hasError && <FormErrorMessage>Campo Obrigatório</FormErrorMessage>}
          </FormControl>
        </form>
      </Stack>

      {!lists.length && (
        <Text textAlign="center" fontSize="lg" color="gray.300" mt={2}>
          Nenhuma lista encontrada
        </Text>
      )}

      {lists.map((item) => (
        <Box
          key={item.id}
          bg="gray.800"
          borderRadius={5}
          pr={6}
          _hover={{
            cursor: 'pointer',
            bg: 'gray.700',
            transition: 'all 0.25s',
          }}
        >
          <HStack alignItems="center">
            <Link as={NextLink} href={`/list/${item.id}`} display="flex" flex={1} p={6}>
              <Text display="flex" flex="1">
                {item.name}
              </Text>
            </Link>

            <IconButton
              aria-label="Excluir"
              size="md"
              bg="gray.800"
              color="gray.300"
              _hover={{
                backgroundColor: 'gray.900',
              }}
              icon={<DeleteIcon boxSize={4} ml={1} />}
              onClick={() => handleRemoveList(item.id)}
              type="button"
            />
          </HStack>
        </Box>
      ))}
    </Stack>
  );
}
