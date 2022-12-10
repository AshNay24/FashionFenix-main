import {
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useProducts } from '../../hooks/useProducts';
import { IProducts } from '../../interface/products.interface';
import FileCard from './Card';
import { EditModal } from './EditModal';
import HomeProducts from './HomeProducts';

export const Products = () => {
  const { products, findOneProduct, getProducts } = useProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState<IProducts>();

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0) {
    return (
      <Stack px={50}>
        <HomeProducts />
      </Stack>
    );
  }
  const handleOnActiveFile = (id: string) => {
    const product = findOneProduct(id);

    if (product !== null) {
      setModalData(product);
      onOpen();
    }
  };

  return (
    <Stack px={50} h="100vh">
      <Stack>
        <Heading size="2xl">Your Products</Heading>
        <Divider variant="dashed" />
      </Stack>
      <SimpleGrid justifyContent="center" columns={[1, 1, 1, 3]} spacing={10}>
        {products.length > 0 &&
          products.map((product) => (
            <FileCard
              key={product.title}
              id={product.productId}
              imageUrl={product.urlImage}
              title={product.title}
              onActiveFile={handleOnActiveFile}
            />
          ))}
      </SimpleGrid>
      <EditModal isOpen={isOpen} onClose={onClose} modalData={modalData} />
    </Stack>
  );
};
