package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.VisitDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.VisitMapper;
import org.motechproject.newebodac.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class VisitService {

  private static final VisitMapper MAPPER = VisitMapper.INSTANCE;

  @Autowired
  private VisitRepository visitRepository;

  @Autowired
  private FieldConfigService fieldConfigService;

  @PreAuthorize(DefaultPermissions.HAS_VISIT_READ_ROLE)
  public List<VisitDto> getAll() {
    return MAPPER.toDtos(visitRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_VISIT_READ_ROLE)
  public VisitDto findById(UUID id) {
    return MAPPER.toDto(visitRepository.getOne(id));
  }

  /**
  * Creates data from dto to object, saves it and returns its Dto.
  */
  @PreAuthorize(DefaultPermissions.HAS_VISIT_WRITE_ROLE)
  public VisitDto create(VisitDto visitDto) {
    Visit newVisit = MAPPER.fromDto(visitDto);
    fieldConfigService.checkIfUnique(EntityType.VISIT, newVisit);
    return MAPPER.toDto(visitRepository.save(newVisit));
  }

  /**
   * Updates Visit from it's dto.
   * @param id id of updated Visit.
   * @param visitDto dto of updated Visit.
   * @return Dto of updated Visit.
   */
  @PreAuthorize(DefaultPermissions.HAS_VISIT_WRITE_ROLE)
  public VisitDto update(UUID id, VisitDto visitDto) {
    Visit visit = visitRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Visit with id: {0} not found",
            id.toString()));
    MAPPER.update(visitDto, visit);
    fieldConfigService.checkIfUnique(EntityType.VISIT, visit);
    return MAPPER.toDto(visitRepository.save(visit));
  }

  /**
   * Deletes visit with given id.
   * @param id ID of visit to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_VISIT_WRITE_ROLE)
  public void delete(UUID id) {
    Visit vaccinee = visitRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Visit with id: {0} not found", id.toString()));
    visitRepository.delete(vaccinee);
  }
}
