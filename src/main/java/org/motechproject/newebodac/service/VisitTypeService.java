package org.motechproject.newebodac.service;

import java.util.UUID;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.repository.VisitTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitTypeService {
  @Autowired
  private VisitTypeRepository visitTypeRepository;

  public Iterable<VisitType> getVisitTypes() {
    return visitTypeRepository.findAll();
  }

  public VisitType createVisitType(VisitType visitType) {
    return visitTypeRepository.save(visitType);
  }

  public VisitType findById(UUID id) { return visitTypeRepository.getOne(id); }
}
