package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.dto.VisitDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.VisitMapper;
import org.motechproject.newebodac.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitService {

  private static final VisitMapper MAPPER = VisitMapper.INSTANCE;

  @Autowired
  private VisitRepository visitRepository;

  public List<VisitDto> getAll() {
    return MAPPER.toDtos(visitRepository.findAll());
  }

  public VisitDto findById(UUID id) {
    return MAPPER.toDto(visitRepository.getOne(id));
  }

  public VisitDto create(VisitDto visitDto) {
    return MAPPER.toDto(visitRepository.save(MAPPER.fromDto(visitDto)));
  }

  /**
   * Deletes visit with given id.
   * @param id ID of visit to delete.
   */
  public void delete(UUID id) {
    Visit vaccinee = visitRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Visit with id: {0} not found", id.toString()));
    visitRepository.delete(vaccinee);
  }
}
