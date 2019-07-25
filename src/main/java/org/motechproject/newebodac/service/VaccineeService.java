package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.mapper.VaccineeMapper;
import org.motechproject.newebodac.dto.VaccineeDto;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VaccineeService {

  @Autowired
  private VaccineeRepository vaccineeRepository;

  private static final VaccineeMapper VACCINEE_MAPPER = VaccineeMapper.INSTANCE;

  public VaccineeDto createVaccinee(VaccineeDto vaccinee) {
    return VACCINEE_MAPPER.toDto(
        vaccineeRepository.save(VACCINEE_MAPPER.fromDto(vaccinee)));
  }

  public VaccineeDto findByIdDto(UUID id) {
    return VACCINEE_MAPPER.toDto(vaccineeRepository.getOne(id));
  }

  public List<VaccineeDto> getVaccineesDtos() {
    return VACCINEE_MAPPER.toDtos(vaccineeRepository.findAll());
  }
}
