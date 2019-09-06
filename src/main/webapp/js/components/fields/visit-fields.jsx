import React from 'react';

import FieldConfigPage from './field-config-page';
import { VISIT_ENTITY } from '../../utils/entity-types';

const VisitFields = () => (
  <div className="container-fluid">
    <FieldConfigPage
      entityType={VISIT_ENTITY}
    />
  </div>
);

export default VisitFields;
