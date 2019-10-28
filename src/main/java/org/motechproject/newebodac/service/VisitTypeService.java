package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.dto.VisitTypeDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.RelationViolationException;
import org.motechproject.newebodac.mapper.VisitTypeMapper;
import org.motechproject.newebodac.repository.VisitRepository;
import org.motechproject.newebodac.repository.VisitTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class VisitTypeService {

  private static final VisitTypeMapper MAPPER = VisitTypeMapper.INSTANCE;

  @Autowired
  private VisitTypeRepository visitTypeRepository;

  @Autowired
  private VisitRepository visitRepository;

  @PreAuthorize(DefaultPermissions.HAS_VISIT_TYPE_READ_ROLE)
  public List<VisitTypeDto> getAll() {
    return MAPPER.toDtos(visitTypeRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_VISIT_TYPE_READ_ROLE)
  public VisitTypeDto findById(UUID id) {
    return MAPPER.toDto(visitTypeRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_VISIT_TYPE_WRITE_ROLE)
  public VisitTypeDto create(VisitTypeDto visitTypeDto) {
    return MAPPER.toDto(visitTypeRepository.save(MAPPER.fromDto(visitTypeDto)));
  }

  /**
   * Updates VisitType from it's dto.
   * @param id id of updated VisitType.
   * @param visitTypeDto dto of updated VisitType.
   * @return Dto of updated VisitType.
   */
  @PreAuthorize(DefaultPermissions.HAS_VISIT_TYPE_WRITE_ROLE)
  public VisitTypeDto update(UUID id, VisitTypeDto visitTypeDto) {
    VisitType visitType = visitTypeRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Visit type with id: {0} not found",
            id.toString()));
    MAPPER.update(visitTypeDto, visitType);
    return MAPPER.toDto(visitTypeRepository.save(visitType));
  }

  /**
   * Deletes visit type with given id.
   * @param id ID of visit type to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_VISIT_TYPE_WRITE_ROLE)
  public void delete(UUID id) {
    VisitType visitType = visitTypeRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Visit Type with id: {0} not found", id.toString()));

    List<Visit> visits = visitRepository.getByType(visitType);
    if (!visits.isEmpty()) {
      throw new RelationViolationException("Can not delete visit type with visits in it!");
    }

    visitTypeRepository.delete(visitType);
  }
}
