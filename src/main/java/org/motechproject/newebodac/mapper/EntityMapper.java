package org.motechproject.newebodac.mapper;

import java.util.List;
import org.motechproject.newebodac.domain.BaseEntity;

/**
 * Contract for generic dto to entity mapper.
 * @param <D> Data transfer object
 * @param <E> Entity object extends BaseEntity
 */
public interface EntityMapper<D, E extends BaseEntity> {

  D toDto(E e);

  List<D> toDtos(Iterable<E> es);

  E fromDto(D d);
}
