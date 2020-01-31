package org.motechproject.newebodac.repository.custom.impl;

import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.repository.custom.FieldConfigRepositoryCustom;

public class FieldConfigRepositoryImpl implements FieldConfigRepositoryCustom {

  private final EntityManager em;
  private final CriteriaBuilder cb;
  
  public FieldConfigRepositoryImpl(EntityManager em) {
    this.em = em;
    this.cb = em.getCriteriaBuilder();
  }

  /** Checks if value should be unique, then if already exists. */
  @Override
  public Boolean checkIfUnique(EntityType entityType, UUID id,
      String fieldName, Object fieldValue) {
    CriteriaQuery<Long> query = cb.createQuery(Long.class);
    Root root = query.from(entityType.getEntityClass());
    if (id == null) {
      query.select(root).where(cb.equal(root.get(fieldName), fieldValue));
    } else {
      query.select(root).where(cb.and(cb.equal(root.get(fieldName), fieldValue),
          cb.notEqual(root.get("id"), id)));
    }
    TypedQuery typedQuery = em.createQuery(query);
    return !(typedQuery.getResultList() != null && typedQuery.getResultList().size() > 0);
  }
}
