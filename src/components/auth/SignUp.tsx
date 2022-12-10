/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Stack,
  Heading,
  Input,
  Box,
  Button,
  Text,
  useColorModeValue,
  VStack,
  FormControl,
  FormHelperText,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { emailRegex, passwordRegex } from '../../constants/regexs';
import { useAuthContext } from '../../hooks/useAuthContext';
interface IFormInput {
  username: string;
  email: string;
  password: string;
}
export const SignUp = () => {
  const formColor = useColorModeValue('gray.50', 'gray.700');
  const titleColor = useColorModeValue('gray.600', 'gray.100');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signUp } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    const isError = await signUp(data);
    if (isError !== undefined) {
      setErrorMessage(isError);
      setIsLoading(false);
    }
  };

  return (
    <Stack
      bg={formColor}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={4}>
        <Heading
          color={titleColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Join our UPMS
          <Text
            as={'span'}
            bgGradient="linear(to-r, purple.600,purple.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          If you need a system to keep your files available join upms and keep
          your files safe.
        </Text>
      </Stack>
      <Box as={'form'} mt={10}>
        <Stack spacing={4}>
          <FormControl
            isInvalid={
              errors.username?.type === 'minLength' ||
              errors.username?.type === 'required'
            }
          >
            <Controller
              name="username"
              control={control}
              rules={{
                required: { value: true, message: 'username is required' },
                minLength: { value: 6, message: 'username is Invalid' },
              }}
              render={({ field }) => (
                <Input
                  autoComplete="off"
                  placeholder="username"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  name={field.name}
                  type="text"
                  onChange={field.onChange}
                />
              )}
            />
            {errors.username?.type === 'required' && (
              <FormHelperText color="red">
                {errors.username.message}
              </FormHelperText>
            )}
            {errors.username?.type === 'minLength' && (
              <FormHelperText color="red">
                {errors.username.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            isInvalid={
              errors.email?.type === 'pattern' ||
              errors.email?.type === 'required'
            }
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: { value: true, message: 'Email is required' },
                pattern: { value: emailRegex, message: 'Email is Invalid' },
              }}
              render={({ field }) => (
                <Input
                  autoComplete="off"
                  placeholder="firstname@lastname.io"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  name={field.name}
                  type="email"
                  onChange={field.onChange}
                />
              )}
            />
            {errors.email?.type === 'required' && (
              <FormHelperText color="red">
                {errors.email.message}
              </FormHelperText>
            )}
            {errors.email?.type === 'pattern' && (
              <FormHelperText color="red">
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            isInvalid={
              errors.password?.type === 'pattern' ||
              errors.password?.type === 'required'
            }
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: { value: true, message: 'Password is required' },
                pattern: {
                  value: passwordRegex,
                  message:
                    'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.',
                },
              }}
              render={({ field }) => (
                <Input
                  autoComplete="off"
                  placeholder="*****"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  type="password"
                  name={field.name}
                  onChange={field.onChange}
                />
              )}
            />

            {errors.password?.type === 'required' && (
              <FormHelperText color="red">
                {errors.password.message}
              </FormHelperText>
            )}
            {errors.password?.type === 'pattern' && (
              <FormHelperText color="red">
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <VStack alignItems={'baseline'} p={3}>
          <Link to={'/auth/sign-in'}>Sign In</Link>
        </VStack>

        {errorMessage !== '' && (
          <Stack>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>New Alert</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </Stack>
        )}
        <Button
          type="submit"
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
          isLoading={isLoading}
          loadingText="Loading"
        >
          Sing Up
        </Button>
      </Box>
      form
    </Stack>
  );
};
