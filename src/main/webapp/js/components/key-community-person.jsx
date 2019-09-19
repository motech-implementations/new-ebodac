import React from 'react';

import EntityTable from './entity-table';
import { KEY_COMMUNITY_PERSON_ENTITY } from '../utils/entity-types';

const KeyCommunityPerson = () => (
  <div className="container-fluid">
    <EntityTable
      entityType={KEY_COMMUNITY_PERSON_ENTITY}
    />
  </div>
);

export default KeyCommunityPerson;
