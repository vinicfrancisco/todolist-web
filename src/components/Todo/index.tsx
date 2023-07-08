import TodoItem, { ITodoItemProps } from './components/TodoItem';

function Todo({ ...props }: ITodoItemProps) {
  // const { name, id, checked } = data;

  // if (!!items) {
  //   return (
  //     <Box
  //       w="100%"
  //       display="flex"
  //       flexDirection="column"
  //       bg="gray.800"
  //       p={4}
  //       m="4px 0"
  //       border="2px"
  //       borderRadius={5}
  //       borderColor="gray.800"
  //     >
  //       <Text>{name}</Text>

  //       {items.map((subItsem) => (
  //         <TodoItem key={subItem.id} listId={listId} data={subItem} />
  //       ))}
  //     </Box>
  //   );
  // }

  return <TodoItem {...props} />;
}

export default Todo;
