package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.dto.VisitTypeDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.VisitTypeMapper;
import org.motechproject.newebodac.repository.VisitTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitTypeService {

  private static final VisitTypeMapper MAPPER = VisitTypeMapper.INSTANCE;

  @Autowired
  private VisitTypeRepository visitTypeRepository;

  public List<VisitTypeDto> getAll() {
    return MAPPER.toDtos(visitTypeRepository.findAll());
  }

  public VisitTypeDto findById(UUID id) {
    return MAPPER.toDto(visitTypeRepository.getOne(id));
  }

  public VisitTypeDto create(VisitTypeDto visitTypeDto) {
    return MAPPER.toDto(visitTypeRepository.save(MAPPER.fromDto(visitTypeDto)));
  }

  /**
   * Deletes visit type with given id.
   * @param id ID of visit type to delete.
   */
  public void delete(UUID id) {
    VisitType visitType = visitTypeRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Visit Type with id: {0} not found", id.toString()));
    visitTypeRepository.delete(visitType);
  }
}
