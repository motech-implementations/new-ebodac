package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;
import org.motechproject.newebodac.service.KeyCommunityPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class KeyCommunityPersonController extends BaseController {

  @Autowired
  private KeyCommunityPersonService keyCommunityPersonService;

  /**
   * Returns List of key community people Dtos loaded from the database.
   * @return Returns List of language Dtos.
   */
  @RequestMapping(value = "/keyCommunityPerson", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<KeyCommunityPersonDto> getAll() {
    return keyCommunityPersonService.getAll();
  }

  @RequestMapping(value = "/keyCommunityPerson/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public KeyCommunityPersonDto findById(@PathVariable("id") UUID id) {
    return keyCommunityPersonService.findById(id);
  }

  /**
   * Creates key community person with given dto and saves it into the database.
   * @param keyCommunityPersonDto Dto of created key community person.
   * @return Dto of created key community person.
   */
  @RequestMapping(value = "/keyCommunityPerson/create", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public KeyCommunityPersonDto create(
      @RequestBody @Valid KeyCommunityPersonDto keyCommunityPersonDto) {
    return keyCommunityPersonService.create(keyCommunityPersonDto);
  }
}
