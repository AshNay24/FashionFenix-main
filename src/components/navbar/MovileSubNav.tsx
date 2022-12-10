import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Stack,
  Flex,
  Link,
  useColorModeValue,
  Icon,
  Collapse,
  Text,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

import { INavItem } from '../../interface/NavItem';

export const MobileNavItem = ({ label, children, href }: INavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const flexRef = useRef();

  return (
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? flexRef}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children != null && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children?.map((child) => (
            <Link key={child.label} py={2} href={child.href}>
              {child.label}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
