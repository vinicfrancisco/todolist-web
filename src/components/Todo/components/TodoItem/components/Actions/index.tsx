import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';

interface IAcitonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancelEditing: () => void;
  onConfirmEditing: () => void;
  onDelete: () => void;
}

function Actions({ isEditing, onCancelEditing, onConfirmEditing, onDelete, onEdit }: IAcitonsProps) {
  return (
    <HStack ml={8}>
      {isEditing ? (
        <>
          <IconButton
            aria-label="Confirmar"
            size="md"
            bg="gray.800"
            color="gray.300"
            _hover={{
              backgroundColor: 'gray.900',
            }}
            icon={<CheckIcon boxSize={4} mr={1} />}
            onClick={onConfirmEditing}
            type="submit"
          />

          <IconButton
            aria-label="Cancelar"
            size="md"
            bg="gray.800"
            color="gray.300"
            _hover={{
              backgroundColor: 'gray.900',
            }}
            icon={<CloseIcon boxSize={4} ml={1} />}
            onClick={onCancelEditing}
            type="button"
          />
        </>
      ) : (
        <>
          <IconButton
            aria-label="Editar"
            size="md"
            bg="gray.800"
            color="gray.300"
            _hover={{
              backgroundColor: 'gray.900',
            }}
            icon={<EditIcon boxSize={4} mr={1} />}
            onClick={onEdit}
            type="button"
          />

          <IconButton
            aria-label="Excluir"
            size="md"
            bg="gray.800"
            color="gray.300"
            _hover={{
              backgroundColor: 'gray.900',
            }}
            icon={<DeleteIcon boxSize={4} ml={1} />}
            onClick={onDelete}
            type="button"
          />
        </>
      )}
    </HStack>
  );
}

export default Actions;
