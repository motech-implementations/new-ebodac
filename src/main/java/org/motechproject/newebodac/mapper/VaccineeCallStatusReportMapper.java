package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.VaccineeCallStatusReport;
import org.motechproject.newebodac.dto.VaccineeCallStatusReportDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VaccineeCallStatusReportMapper
    extends EntityMapper<VaccineeCallStatusReportDto, VaccineeCallStatusReport> {

  VaccineeCallStatusReportMapper INSTANCE = Mappers.getMapper(VaccineeCallStatusReportMapper.class);

  @Override
  @Mapping(target = "receiver", source = "receiver.id")
  VaccineeCallStatusReportDto toDto(VaccineeCallStatusReport vaccineeCallStatusReport);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  VaccineeCallStatusReport fromDto(VaccineeCallStatusReportDto vaccineeCallStatusReportDto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(VaccineeCallStatusReportDto vaccineeCallStatusReportDto,
      @MappingTarget VaccineeCallStatusReport vaccineeCallStatusReport);

  /**
   * Create Vaccinee with given id.
   * @param id id of Vaccinee to create
   * @return Vaccinee with given id
   */
  default Vaccinee toVaccinee(UUID id) {
    if (id != null) {
      return new Vaccinee(id);
    }
    return null;
  }
}
