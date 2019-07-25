package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.mapper.VisitTypeMapper;
import org.motechproject.newebodac.dto.VisitTypeDto;
import org.motechproject.newebodac.repository.VisitTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitTypeService {

  @Autowired
  private VisitTypeRepository visitTypeRepository;

  private static final VisitTypeMapper VISIT_TYPE_MAPPER = VisitTypeMapper.INSTANCE;

  public Iterable<VisitType> getVisitTypes() {
    return visitTypeRepository.findAll();
  }

  public List<VisitTypeDto> getVisitTypesDtos(Iterable<VisitType> visitTypes) {
    return VISIT_TYPE_MAPPER.toDtos(visitTypes);
  }

  public VisitType createVisitType(VisitType visitType) {
    return visitTypeRepository.save(visitType);
  }

  public VisitTypeDto getVisitTypeDto(VisitType visitType) {
    return VISIT_TYPE_MAPPER.toDto(visitType);
  }

  public VisitType findById(UUID id) {
    return visitTypeRepository.getOne(id);
  }

  public VisitTypeDto findByIdDto(UUID id) {
    return VISIT_TYPE_MAPPER.toDto(visitTypeRepository.getOne(id));
  }

  public VisitType getVisitTypeFromDto(VisitTypeDto visitTypeDto) {
    return VISIT_TYPE_MAPPER.fromDto(visitTypeDto);
  }
}
