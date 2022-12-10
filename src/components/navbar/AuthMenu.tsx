import { Stack, Button } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

export const AuthMenu = () => {
  const buttonRef = useRef();
  const history = useHistory();
  const handleLoginForm = () => {
    history.replace('/auth/sign-in');
  };
  const handleSignUp = () => {
    history.replace('/auth/sign-up');
  };
  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'row'}
      spacing={6}
    >
      <Button
        as={'a'}
        fontSize={'sm'}
        fontWeight={400}
        variant={'link'}
        onClick={handleLoginForm}
      >
        Sign In
      </Button>
      <Button
        onClick={handleSignUp}
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bgGradient="linear(to-r, purple.600,purple.400)"
        ref={buttonRef.current}
        _hover={{
          bgGradient: 'linear(to-r, purple.500,purple.400)',
        }}
        _active={{
          bgGradient: 'linear(to-r, purple.400,purple.300)',
          boxShadow: 'xl',
        }}
      >
        Sign Up
      </Button>
    </Stack>
  );
};
