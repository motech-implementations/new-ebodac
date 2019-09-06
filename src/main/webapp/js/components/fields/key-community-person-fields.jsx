import React from 'react';

import FieldConfigPage from './field-config-page';
import { KEY_COMMUNITY_PERSON_ENTITY } from '../../utils/entity-types';

const KeyCommunityPersonFields = () => (
  <div className="container-fluid">
    <FieldConfigPage
      entityType={KEY_COMMUNITY_PERSON_ENTITY}
    />
  </div>
);

export default KeyCommunityPersonFields;
