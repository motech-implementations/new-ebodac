package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.dto.VaccineeDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
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

  /**
   * Updates data from dto to object, saves it and returns its Dto.
   *
   * @param id      ID of object to update.
   * @param vaccineeDto Dto of role to update.
   * @return Dto of of updated object
   */
  public VaccineeDto update(UUID id, VaccineeDto vaccineeDto) {

    Vaccinee vaccinee = vaccineeRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Vaccinee with id: {0} not found",
            id.toString()));
    MAPPER.update(vaccineeDto, vaccinee);

    return MAPPER.toDto(vaccineeRepository.save(vaccinee));
  }

  /**
   * Deletes vaccinee with given id.
   * @param id ID of vaccinee to delete.
   */
  public void delete(UUID id) {
    Vaccinee vaccinee = vaccineeRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Vaccinee with id: {0} not found", id.toString()));
    vaccineeRepository.delete(vaccinee);
  }
}
