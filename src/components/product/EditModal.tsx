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
  Image,
  Input,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useProducts } from '../../hooks/useProducts';
import { IProducts } from '../../interface/products.interface';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalData: IProducts | undefined;
}

export const EditModal = ({ isOpen, modalData, onClose }: IProps) => {
  const [isDisabled, setisDisabled] = React.useState(true);
  const { editProduct } = useProducts();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IProducts>();

  useEffect(() => {
    if (modalData !== undefined) {
      for (const field in modalData) {
        setValue(field, modalData[field]);
      }
    }
  }, [modalData]);

  const onSubmit: SubmitHandler<IProducts> = (data) => {
    editProduct(data);
  };

  const handleClose = () => {
    setisDisabled(true);
    onClose();
    console.log(isDisabled);
  };
  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalData?.title}</ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <ModalBody>
          {modalData !== undefined && (
            <>
              <Image src={modalData.urlImage} />
              <Divider py={3} mb={3} variant="dashed" />
              <HStack>
                <FormControl isInvalid={errors.title?.type === 'required'}>
                  <Controller
                    name="title"
                    control={control}
                    rules={{
                      required: { value: true, message: 'Nombre es requerido' },
                    }}
                    render={({ field }) => (
                      <>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                          autoComplete="off"
                          placeholder="Nombre de producto"
                          name={field.name}
                          type="text"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </>
                    )}
                  />
                  {errors.title?.type === 'required' && (
                    <FormHelperText color="red">
                      {errors?.title.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.price?.type === 'required'}>
                  <Controller
                    name="price"
                    control={control}
                    rules={{
                      required: { value: true, message: 'Precio es requerido' },
                    }}
                    render={({ field }) => (
                      <>
                        <FormLabel>Precio</FormLabel>
                        <Input
                          autoComplete="off"
                          placeholder="Precio de producto"
                          name={field.name}
                          type="number"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </>
                    )}
                  />
                  {errors.price?.type === 'required' && (
                    <FormHelperText color="red">
                      {errors.price.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </HStack>
              <FormControl isInvalid={errors.description?.type === 'required'}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Descripcion es requerida',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <FormLabel>Descripcion</FormLabel>
                      <Input
                        autoComplete="off"
                        placeholder="Descripcion de producto"
                        name={field.name}
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </>
                  )}
                />
                {errors.description?.type === 'required' && (
                  <FormHelperText color="red">
                    {errors.description.message}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={handleClose}>
            cerrar
          </Button>
          <Button
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
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
