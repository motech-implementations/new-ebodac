package org.motechproject.newebodac.service;

import java.util.UUID;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.repository.ExtraFieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExtraFieldService {

  @Autowired
  ExtraFieldRepository extraFieldRepository;

  public Iterable<ExtraField> getExtraFields() {
    return extraFieldRepository.findAll();
  }

  public ExtraField createExtraField(ExtraField extraField) {
    return extraFieldRepository.save(extraField);
  }

  public ExtraField findById(UUID id) {
    return extraFieldRepository.getOne(id);
  }
}
