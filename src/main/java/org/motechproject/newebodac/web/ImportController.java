package org.motechproject.newebodac.web;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.motechproject.newebodac.service.CsvImportService;
import org.motechproject.newebodac.service.JsonImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ImportController extends BaseController {

  @Autowired
  private CsvImportService csvImportService;

  @Autowired
  private JsonImportService jsonImportService;

  /**
   * Uploads ".csv" file, imports data and saves records in DB.
   * @param file File in ".csv" format to upload
   */
  @RequestMapping(value = "/importCsv/{csvConfigId}", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public Map<Integer, String> uploadChwSpreadsheet(@PathVariable("csvConfigId") UUID csvConfigId,
      @RequestPart("file") MultipartFile file) throws IOException {
    return csvImportService.importDataFromCsvWithConfig(file, csvConfigId);
  }

  /**
   * Uplads json, imports data and saves records.
   * @param configName Name of the JsonConfig.
   * @param jsonString String representing json.
   */
  @RequestMapping(value = "/importJson/{configName}", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  public void uploadJson(@PathVariable("configName") String configName,
      @RequestBody String jsonString) {
    if (StringUtils.isNotBlank(jsonString)) {
      jsonImportService.importJson(configName, jsonString);
    }
  }
}
