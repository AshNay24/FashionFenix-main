/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Flex,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useProducts } from '../../hooks/useProducts';
import { CreateModal } from '../product/CreateModal';

export const LoggedMenu = () => {
  const { logout } = useAuthContext();
  const { resetProducs } = useProducts();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleLogout = async () => {
    await logout();
    resetProducs();
  };
  return (
    <>
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar
              size={'sm'}
              src={
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem
              fontSize={'1em'}
              color="purple.400"
              fontWeight={'bold'}
              onClick={onOpen}
            >
              Nuevo Producto
              <Icon mx={2} as={FaPlus} />
            </MenuItem>

            <MenuDivider />

            <MenuItem fontSize={'1em'} onClick={handleLogout}>
              Logout{'  '} <Icon mx={2} as={RiLogoutCircleLine} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <CreateModal isOpen={isOpen} onClose={onClose} modalData={undefined} />
    </>
  );
};
