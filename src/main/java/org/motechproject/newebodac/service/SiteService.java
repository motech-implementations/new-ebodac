package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.dto.SiteDto;
import org.motechproject.newebodac.mapper.SiteMapper;
import org.motechproject.newebodac.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SiteService {

  private static final SiteMapper MAPPER = SiteMapper.INSTANCE;

  @Autowired
  private SiteRepository siteRepository;

  public List<SiteDto> getAll() {
    return MAPPER.toDtos(siteRepository.findAll());
  }

  public SiteDto findById(UUID id) {
    return MAPPER.toDto(siteRepository.getOne(id));
  }

  public SiteDto create(SiteDto siteDto) {
    return MAPPER.toDto(siteRepository.save(MAPPER.fromDto(siteDto)));
  }
}