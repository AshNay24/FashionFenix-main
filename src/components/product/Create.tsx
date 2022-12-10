import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  FormHelperText,
  Textarea,
  RadioGroup,
  HStack,
  Radio,
} from '@chakra-ui/react';
import React from 'react';
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from 'react-hook-form';

import { IFormInputProduct } from '../../interface/products.interface';

interface Iprops {
  control: Control<IFormInputProduct, any>;
  formState: FormState<IFormInputProduct>;
  register: UseFormRegister<IFormInputProduct>;
}
export const Create = ({
  control,
  formState: { errors },
  register,
}: Iprops) => {
  return (
    <Stack>
      <Box rounded={'lg'} p={8}>
        <Stack spacing={4}>
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
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
              {errors.title?.type === 'required' && (
                <FormHelperText color="red">
                  {errors.title.message}
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
                required: { value: true, message: 'descripcion es requerida' },
              }}
              render={({ field }) => (
                <>
                  <FormLabel>Descripcion</FormLabel>
                  <Textarea
                    name={field.name}
                    placeholder="Descripcion"
                    rows={3}
                    resize="none"
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

          <FormControl as="fieldset">
            <FormLabel as="legend">Estado de Producto</FormLabel>
            <RadioGroup defaultValue="Nuevo">
              <HStack spacing="24px">
                <Radio value="Nuevo" {...register('state.new')}>
                  Nuevo
                </Radio>
                <Radio value="Semi Nuevo" {...register('state.semiNew')}>
                  Semi Nuevo
                </Radio>
                <Radio value="Usado" {...register('state.used')}>
                  Usado
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
};
