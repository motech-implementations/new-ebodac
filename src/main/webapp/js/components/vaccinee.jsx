import React from 'react';

import EntityTable from './entity-table';
import { VACCINEE_ENTITY } from '../utils/entity-types';

const Vaccinee = () => (
  <div className="container-fluid">
    <EntityTable
      entityType={VACCINEE_ENTITY}
    />
  </div>
);

export default Vaccinee;
