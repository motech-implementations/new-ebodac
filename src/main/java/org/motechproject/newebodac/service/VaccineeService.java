package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.dto.VaccineeDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.VaccineeMapper;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class VaccineeService {

  @Autowired
  private VaccineeMapper mapper;

  @Autowired
  private VaccineeRepository vaccineeRepository;

  @PreAuthorize(DefaultPermissions.HAS_VACCINEE_READ_ROLE)
  public List<VaccineeDto> getAll() {
    return mapper.toDtos(vaccineeRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_VACCINEE_READ_ROLE)
  public VaccineeDto findById(UUID id) {
    return mapper.toDto(vaccineeRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_VACCINEE_WRITE_ROLE)
  public VaccineeDto create(VaccineeDto vaccinee) {
    return mapper.toDto(vaccineeRepository.save(mapper.fromDto(vaccinee)));
  }

  /**
   * Updates data from dto to object, saves it and returns its Dto.
   *
   * @param id      ID of object to update.
   * @param vaccineeDto Dto of role to update.
   * @return Dto of of updated object
   */
  @PreAuthorize(DefaultPermissions.HAS_VACCINEE_WRITE_ROLE)
  public VaccineeDto update(UUID id, VaccineeDto vaccineeDto) {

    Vaccinee vaccinee = vaccineeRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Vaccinee with id: {0} not found",
            id.toString()));
    mapper.update(vaccineeDto, vaccinee);

    return mapper.toDto(vaccineeRepository.save(vaccinee));
  }

  /**
   * Deletes vaccinee with given id.
   * @param id ID of vaccinee to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_VACCINEE_WRITE_ROLE)
  public void delete(UUID id) {
    Vaccinee vaccinee = vaccineeRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Vaccinee with id: {0} not found", id.toString()));
    vaccineeRepository.delete(vaccinee);
  }
}
