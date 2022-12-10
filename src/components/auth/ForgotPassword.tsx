import {
  Stack,
  Heading,
  Input,
  Button,
  Box,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const ForgotPassword = () => {
  const formColor = useColorModeValue('gray.50', 'gray.700');
  const titleColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <Stack
      bg={formColor}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
    >
      <Stack spacing={4}>
        <Heading
          color={titleColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Forgot your Password UPMS
          <Text
            as={'span'}
            bgGradient="linear(to-r, purple.600,purple.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
      </Stack>
      <Box as={'form'} mt={10}>
        <Stack spacing={4}>
          <Input
            placeholder="firstname@lastname.io"
            bg={'gray.100'}
            border={0}
            color={'gray.500'}
            _placeholder={{
              color: 'gray.500',
            }}
            type="email"
          />
        </Stack>
        <Button
          fontFamily={'heading'}
          mt={8}
          w={'full'}
          bgGradient="linear(to-r, purple.600,purple.400)"
          color={'white'}
          _hover={{
            bgGradient: 'linear(to-r, purple.600,purple.400)',
            boxShadow: 'xl',
          }}
          _active={{
            bgGradient: 'linear(to-r, purple.400,purple.300)',
            boxShadow: 'xl',
          }}
        >
          Submit
        </Button>
      </Box>
      form
    </Stack>
  );
};
