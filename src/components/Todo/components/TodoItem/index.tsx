import { Box, Flex, useCheckbox } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '~/store';
import { moveElement, removeTodoItem, toggleTodoItem, updateTodoItem } from '~/store/features/todos/slice';
import { ITodoItem } from '~/store/features/todos/types';
import Actions from './components/Actions';
import Checkbox from './components/Checkbox';
import Label from './components/Label';

export interface ITodoItemProps {
  listId: string;
  data: ITodoItem;
  index: number;
}

function TodoItem({ listId, index, data }: ITodoItemProps) {
  const { id, name, checked } = data;
  const dispatch = useAppDispatch();
  const { htmlProps } = useCheckbox();

  const [inputValue, setInputValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'TODO_ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'TODO_ITEM',
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect();
      const targetCenter = (targetSize?.bottom - targetSize?.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset?.y - targetSize?.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      dispatch(
        moveElement({
          listId,
          fromIndex: draggedIndex,
          toIndex: targetIndex,
        }),
      );

      item.index = targetIndex;
    },
  });

  const ref = useRef(null);
  dragRef(dropRef(ref));

  const handleCheck = () => {
    dispatch(toggleTodoItem({ listId, todoId: id }));
  };

  const handleConfirmEditing = () => {
    dispatch(
      updateTodoItem({
        listId,
        todoId: id,
        text: inputValue,
      }),
    );

    setIsEditing(false);
  };

  const handleDelete = async () => {
    dispatch(
      removeTodoItem({
        listId,
        todoId: id,
      }),
    );
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setInputValue('');
  };

  const handelEdit = () => {
    setIsEditing(true);
    setInputValue(name);
  };

  return (
    <Box
      ref={ref}
      border="2px"
      borderRadius={4}
      borderStyle={isDragging ? 'dashed' : 'solid'}
      borderColor={checked ? 'green.500' : 'gray.700'}
      bg={isDragging ? 'transparent' : 'gray.800'}
      m="8px 0"
      width="100%"
      p={4}
      as="label"
      _hover={{
        backgroundColor: isDragging ? 'transparent' : 'gray.700',
        transition: 'background-color, border-color 0.25s',
      }}
      cursor={isDragging ? 'grabbing' : 'grab'}
      {...htmlProps}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Flex alignItems="center" opacity={isDragging ? '0' : '1'}>
          <Checkbox isEditing={isEditing} checked={checked} onCheck={handleCheck} />

          <Label isEditing={isEditing} text={name} inputValue={inputValue} onChange={setInputValue} />

          <Actions
            isEditing={isEditing}
            onCancelEditing={handleCancelEditing}
            onEdit={handelEdit}
            onConfirmEditing={handleConfirmEditing}
            onDelete={handleDelete}
          />
        </Flex>
      </form>
    </Box>
  );
}

export default TodoItem;
