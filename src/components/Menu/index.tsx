import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Menu as ChakraMenu, IconButton, Link, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import NextLink from 'next/link';

function Menu() {
  return (
    <Box bg="gray.800" p={2}>
      <ChakraMenu>
        <MenuButton
          size="lg"
          bg="gray.800"
          color="gray.200"
          _hover={{
            backgroundColor: 'gray.900',
            transition: 'background-color 0.2s',
          }}
          _expanded={{
            backgroundColor: 'gray.800',
            transition: 'background-color 0.2s',
          }}
          icon={<HamburgerIcon boxSize={8} />}
          aria-label="Menu"
          as={IconButton}
        />

        <MenuList p={0} borderWidth={0} borderBottomRadius={5}>
          <MenuItem p={0}>
            <Link
              as={NextLink}
              href="/"
              bg="gray.800"
              display="flex"
              flex="1"
              p={4}
              _hover={{
                backgroundColor: 'gray.900',
                transition: 'background-color 0.2s',
              }}
            >
              Home
            </Link>
          </MenuItem>

          <MenuItem p={0}>
            <Link
              as={NextLink}
              href="/about"
              bg="gray.800"
              display="flex"
              flex="1"
              p={4}
              _hover={{
                backgroundColor: 'gray.900',
                transition: 'background-color 0.2s',
              }}
            >
              Sobre
            </Link>
          </MenuItem>
        </MenuList>
      </ChakraMenu>
    </Box>
  );
}

export default Menu;
