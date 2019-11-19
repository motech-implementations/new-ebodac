package org.motechproject.newebodac.web;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import org.motechproject.newebodac.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ImportCsvController {

  @Autowired
  private ImportService importService;

  /**
   * Uploads ".csv" file, imports data and saves records in DB.
   * @param file File in ".csv" format to upload
   */
  @RequestMapping(value = "/import/{csvConfigId}", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public Map<Integer, String> uploadChwSpreadsheet(@PathVariable("csvConfigId") UUID csvConfigId,
      @RequestPart("file") MultipartFile file) throws IOException {
    return importService.importDataFromCsvWithConfig(file, csvConfigId);
  }

}
