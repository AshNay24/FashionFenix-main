import { Center } from '@chakra-ui/react';
import React from 'react';
interface IProps {
  children: JSX.Element | JSX.Element[];
}
export const GenericCenter = ({ children }: IProps) => {
  return (
    <Center h={'100vh'} px={30}>
      {children}
    </Center>
  );
};
