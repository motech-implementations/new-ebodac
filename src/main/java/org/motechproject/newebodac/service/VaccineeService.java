package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.dto.VaccineeDto;
import org.motechproject.newebodac.mapper.VaccineeMapper;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VaccineeService {

  private static final VaccineeMapper MAPPER = VaccineeMapper.INSTANCE;

  @Autowired
  private VaccineeRepository vaccineeRepository;

  public List<VaccineeDto> getAll() {
    return MAPPER.toDtos(vaccineeRepository.findAll());
  }

  public VaccineeDto findById(UUID id) {
    return MAPPER.toDto(vaccineeRepository.getOne(id));
  }

  public VaccineeDto create(VaccineeDto vaccinee) {
    return MAPPER.toDto(vaccineeRepository.save(MAPPER.fromDto(vaccinee)));
  }
}
