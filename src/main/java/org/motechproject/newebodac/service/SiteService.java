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

  @Autowired
  private SiteRepository siteRepository;

  public static final SiteMapper SITE_MAPPER = SiteMapper.INSTANCE;

  public List<SiteDto> getSitesDtos() {
    return SITE_MAPPER.toDtos(siteRepository.findAll());
  }

  public SiteDto createSite(SiteDto siteDto) {
    return SITE_MAPPER.toDto(siteRepository.save(SITE_MAPPER.fromDto(siteDto)));
  }

  public SiteDto findByIdDto(UUID id) {
    return SITE_MAPPER.toDto(siteRepository.getOne(id));
  }
}
