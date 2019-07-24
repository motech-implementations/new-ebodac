package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.mapper.VaccineeMapper;
import org.motechproject.newebodac.dto.VaccineeDto;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VaccineeService {

  @Autowired
  private VaccineeRepository vaccineeRepository;

  private static final VaccineeMapper VACCINEE_MAPPER = VaccineeMapper.INSTANCE;

  public Iterable<Vaccinee> getVaccinees() {
    return vaccineeRepository.findAll();
  }

  public Vaccinee createVaccinee(Vaccinee vaccinee) {
    return vaccineeRepository.save(vaccinee);
  }

  public Vaccinee findById(UUID id) {
    return vaccineeRepository.getOne(id);
  }

  public Vaccinee getVaccineeFromDto(VaccineeDto vaccineeDto) {
    return VACCINEE_MAPPER.fromDto(vaccineeDto);
  }

  public VaccineeDto getVaccineeDto(Vaccinee vaccinee) {
    return VACCINEE_MAPPER.toDto(vaccinee);
  }

  public List<VaccineeDto> getVaccineesDtos(Iterable<Vaccinee> vaccinees) {
    return VACCINEE_MAPPER.toDtos(vaccinees);
  }
}
