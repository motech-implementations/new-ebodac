package org.motechproject.newebodac.service;


import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VaccineeService {

  @Autowired
  private VaccineeRepository vaccineeRepository;

  public Iterable<Vaccinee> getVaccinees() {
    return vaccineeRepository.findAll();
  }

  public Vaccinee createVaccinee(Vaccinee vaccinee) {
    return vaccineeRepository.save(vaccinee);
  }
}
