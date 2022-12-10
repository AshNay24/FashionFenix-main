/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Stack,
  CloseButton,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useProducts } from '../../hooks/useProducts';
import {
  IFormInputProduct,
  IProducts,
} from '../../interface/products.interface';
import { Create } from './Create';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalData: IProducts | undefined;
}
export const CreateModal = ({ isOpen, modalData, onClose }: IProps) => {
  const [isDisabled, setisDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { createProduct } = useProducts();
  const { control, handleSubmit, formState, reset, register } =
    useForm<IFormInputProduct>();
  const { isValid } = formState;

  const onSubmit: SubmitHandler<IFormInputProduct> = (data) => {
    if (isValid) {
      const { description, price, state, title } = data;
      const isValidSpaces =
        description.trim().length > 0 &&
        title.trim().length > 0 &&
        (state.new !== null || state.semiNew !== null || state.used !== null);

      if (isValidSpaces) {
        setErrorMessage('');
        void createProduct(data, (message: string) => {
          setErrorMessage(message);
          setIsLoading(false);
          setisDisabled(true);
        });
      } else {
        setErrorMessage('Por Favor complete los campos');
        setIsLoading(false);
      }
    }
  };
  const handleClose = () => {
    setisDisabled(true);
    onClose();
    reset();
    setErrorMessage('');
    setIsLoading(false);
  };
  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Producto</ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <ModalBody>
          <Create control={control} formState={formState} register={register} />
          {errorMessage !== '' && (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            type="submit"
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
            mr={3}
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
            loadingText="Loading"
          >
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
