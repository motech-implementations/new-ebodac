package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Site;
import org.motechproject.newebodac.dto.SiteDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.RelationViolationException;
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

  /**
   * Updates Site from it's dto.
   * @param id id of updated Site.
   * @param siteDto dto of updated Site.
   * @return Dto of updated Site.
   */
  public SiteDto update(UUID id, SiteDto siteDto) {
    Site site = siteRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Site with id: {0} not found",
            id.toString()));
    MAPPER.update(siteDto, site);
    return MAPPER.toDto(siteRepository.save(site));
  }

  /**
   * Deletes site with given id.
   * @param id ID of site to delete.
   */
  public void delete(UUID id) {
    Site site = siteRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Site with id: {0} not found", id.toString()));
    if (!site.getVisits().isEmpty()) {
      throw new RelationViolationException("Can not delete site with visits in it!");
    }
    siteRepository.delete(site);
  }
}
