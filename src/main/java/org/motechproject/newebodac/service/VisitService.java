package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.mapper.VisitMapper;
import org.motechproject.newebodac.dto.VisitDto;
import org.motechproject.newebodac.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitService {

  @Autowired
  private VisitRepository visitRepository;

  public static final VisitMapper VISIT_MAPPER = VisitMapper.INSTANCE;

  public List<Visit> getVisits() {
    return visitRepository.findAll();
  }

  public List<VisitDto> getVisitsDtos(Iterable<Visit> visits) {
    return VISIT_MAPPER.toDtos(visits);
  }

  public VisitDto getVisitDto(Visit visit) {
    return VISIT_MAPPER.toDto(visit);
  }

  public Visit getVisitFromDto(VisitDto visitDto) {
    return VISIT_MAPPER.fromDto(visitDto);
  }

  public Visit createVisit(Visit visit) {
    return visitRepository.save(visit);
  }

  public VisitDto findByIdDto(UUID id) {
    return VISIT_MAPPER.toDto(visitRepository.getOne(id));
  }
}
