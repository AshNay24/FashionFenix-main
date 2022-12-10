import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Flex,
  useColorModeValue,
  IconButton,
  useBreakpointValue,
  Collapse,
  Box,
  Text,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import React from 'react';

import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthMenu } from './AuthMenu';
import { DesktopNav } from './DesktopNav';
import { LoggedMenu } from './LoggedMenu';
import { MobileNav } from './MovileNav';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const { uid } = useAuthContext();
  return (
    <Box position={'relative'} zIndex={3}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'dashed'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="extrabold"
            bgGradient="linear(to-r, purple.600,purple.400)"
            bgClip={'text'}
          >
            FashionFenix
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Flex>
          <Button onClick={toggleColorMode} mx="3em">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          {/* MENU LOGIN */}
          {uid !== null ? <LoggedMenu /> : <AuthMenu />}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
