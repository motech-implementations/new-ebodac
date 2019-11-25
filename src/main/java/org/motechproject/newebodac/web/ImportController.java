package org.motechproject.newebodac.web;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.motechproject.newebodac.exception.NewEbodacException;
import org.motechproject.newebodac.service.ImportService;
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
public class ImportController {

  @Autowired
  private ImportService importService;

  /**
   * Uploads ".csv" file, imports data and saves records in DB.
   * @param file File in ".csv" format to upload
   */
  @RequestMapping(value = "/importCsv/{csvConfigId}", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public Map<Integer, String> uploadChwSpreadsheet(@PathVariable("csvConfigId") UUID csvConfigId,
      @RequestPart("file") MultipartFile file) throws IOException {
    return importService.importDataFromCsvWithConfig(file, csvConfigId);
  }

  @RequestMapping(value = "/importJson/{configName}", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public Map<Integer, String> uploadJson(@PathVariable("configName") String configName,
      @RequestBody String jsonString) {
    System.out.println("START3");
    JSONObject jsonObject;
    JSONArray jsonArray;
    if (StringUtils.isNotBlank(jsonString)) {
      try {
        if (jsonString.startsWith("[")) {
          System.out.println("ARRAY");
          jsonArray = new JSONArray(jsonString);
          return importService.importJsonArray(jsonArray, configName);
        } else {
          System.out.println("OB JECT");
          jsonObject = new JSONObject(jsonString);
          return importService.importJsonWithConfigName(jsonObject, configName);
        }
      } catch (JSONException e) {
        System.out.println("ERROR in uploadJson");
        throw new NewEbodacException("Can't parse the json. Check format of the json.");
      }
    }
    return null;
  }
}
