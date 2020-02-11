package org.motechproject.newebodac.mapper;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.CallConfig;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.IvrProviderConfig;
import org.motechproject.newebodac.domain.enums.CallStatus;
import org.motechproject.newebodac.dto.CallConfigDto;
import org.motechproject.newebodac.dto.IdValueMapDto;
import org.motechproject.newebodac.dto.StringValueMapDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
@SuppressWarnings({"PMD.TooManyMethods"})
public interface CallConfigMapper extends EntityMapper<CallConfigDto, CallConfig> {

  CallConfigMapper INSTANCE = Mappers.getMapper(CallConfigMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  CallConfig fromDto(CallConfigDto callConfigDto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  void updateFromDto(CallConfigDto callConfigDto, @MappingTarget CallConfig callConfig);

  default IvrProviderConfig toIvrProviderConfig(UUID id) {
    return new IvrProviderConfig(id);
  }

  default UUID fromIvrProviderConfig(IvrProviderConfig ivrProviderConfig) {
    return ivrProviderConfig.getId();
  }

  default Map<UUID, String> fromIdMapDto(Set<IdValueMapDto> idValueMap) {
    return idValueMap.stream().collect(Collectors
        .toMap(IdValueMapDto::getKey, IdValueMapDto::getValue));
  }

  default Map<String, CallStatus> fromCallStatusMapDto(Set<StringValueMapDto> callStatusMap) {
    return callStatusMap.stream().collect(Collectors
        .toMap(StringValueMapDto::getKey, elem -> CallStatus.valueOf(elem.getValue())));
  }

  default Set<IdValueMapDto> toIdMapDto(Map<UUID, String> idValueMap) {
    return idValueMap.entrySet().stream().map(elem ->
        new IdValueMapDto(elem.getKey(), elem.getValue())).collect(Collectors.toSet());
  }

  default Set<StringValueMapDto> toCallStatusMapDto(Map<String, CallStatus> stringValueMap) {
    return stringValueMap.entrySet().stream().map(elem ->
        new StringValueMapDto(elem.getKey(), elem.getValue().name())).collect(Collectors.toSet());
  }

  default FieldConfig toFieldConfig(UUID id) {
    return new FieldConfig(id);
  }

  default UUID fromFieldConfig(FieldConfig fieldConfig) {
    return fieldConfig.getId();
  }
}
