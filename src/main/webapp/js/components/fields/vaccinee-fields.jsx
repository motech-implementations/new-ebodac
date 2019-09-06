import React from 'react';

import FieldConfigPage from './field-config-page';
import { VACCINEE_ENTITY } from '../../utils/entity-types';

const VaccineeFields = () => (
  <div className="container-fluid">
    <FieldConfigPage
      entityType={VACCINEE_ENTITY}
    />
  </div>
);

export default VaccineeFields;
