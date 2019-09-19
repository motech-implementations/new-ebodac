import React from 'react';

import EntityTable from '../entity-table';
import { SITE_ENTITY } from '../../utils/entity-types';

const Sites = () => (
  <div className="container-fluid">
    <EntityTable
      entityType={SITE_ENTITY}
    />
  </div>
);

export default Sites;
