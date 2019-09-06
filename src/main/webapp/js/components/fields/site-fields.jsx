import React from 'react';

import FieldConfigPage from './field-config-page';
import { SITE_ENTITY } from '../../utils/entity-types';

const SiteFields = () => (
  <div className="container-fluid">
    <FieldConfigPage
      entityType={SITE_ENTITY}
    />
  </div>
);

export default SiteFields;
