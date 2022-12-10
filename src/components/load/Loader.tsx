import React from 'react';
import { Dna } from 'react-loader-spinner';

import { GenericCenter } from '../GenericCenter';

export const Loader = () => {
  return (
    <GenericCenter>
      <Dna
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </GenericCenter>
  );
};
