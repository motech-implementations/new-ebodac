package org.motechproject.newebodac.service;

import static java.util.stream.Collectors.groupingBy;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.motechproject.newebodac.domain.CallConfig;
import org.motechproject.newebodac.domain.CallDetail;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.IvrCall;
import org.motechproject.newebodac.domain.IvrJsonField;
import org.motechproject.newebodac.domain.IvrProviderConfig;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.enums.CallDetailFields;
import org.motechproject.newebodac.domain.enums.CallStatus;
import org.motechproject.newebodac.domain.enums.IvrCallFields;
import org.motechproject.newebodac.domain.enums.JsonFieldType;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.IvrException;
import org.motechproject.newebodac.helper.EncryptionHelper;
import org.motechproject.newebodac.repository.CallConfigRepository;
import org.motechproject.newebodac.repository.CallDetailRepository;
import org.motechproject.newebodac.repository.IvrCallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@SuppressWarnings({"PMD.ExcessiveImports", "PMD.GodClass", "PMD.TooManyMethods"})
@Service
public class IvrService {

  private static final String PHONE_NUMBER = "phoneNumber";
  private static final String MESSAGE_KEY = "messageKey";
  private static final String GROUP_SIZE = "GROUP_SIZE";

  private static final Pattern PLACEHOLDERS_PATTERN = Pattern.compile("^<(.*)>$");
  private static final String LIST_JOIN_SEPARATOR = ",";

  private static final RestOperations REST_TEMPLATE = new RestTemplate();

  @Autowired
  private CallConfigRepository callConfigRepository;

  @Autowired
  private IvrCallRepository ivrCallRepository;

  @Autowired
  private CallDetailRepository callDetailRepository;

  @Autowired
  private EncryptionHelper encryptionHelper;

  /**
   * Get entity fields required in given Call Config.
   * @param configName name of the call config
   * @return entity fields required in given call config
   */
  public Set<FieldConfig> getRequiredEntityFields(String configName) {
    CallConfig callConfig = findCallConfig(configName);

    return callConfig.getEntityFields();
  }

  /**
   * Send IVR Call using given config and data.
   * @param configName name of the call config that should be used
   * @param callData data for the call
   */
  @Transactional
  public void sendIvrCall(String configName, List<Map<String, Object>> callData) {
    CallConfig callConfig = findCallConfig(configName);

    Collection<Map<String, Object>> groupedData = groupData(callConfig, callData);

    groupedData.forEach(data -> startIvrCall(callConfig, data));
  }

  /**
   * Send IVR Call using given config and data.
   * @param configName name of the call config that should be used
   * @param data data for the call
   */
  @Transactional
  public void sendIvrCall(String configName, Map<String, Object> data) {
    CallConfig callConfig = findCallConfig(configName);
    startIvrCall(callConfig, data);
  }

  /**
   * Save callbacks from IVR Provider.
   * @param configName name of the Call config to be used
   * @param ivrData callback data
   * @param json callback data in json format
   */
  @SuppressWarnings("checkstyle:VariableDeclarationUsageDistance")
  public void saveIvrCallback(String configName, Map<String, String> ivrData, String json) {
    CallConfig callConfig = findCallConfig(configName);
    IvrProviderConfig ivrProviderConfig = callConfig.getIvrProviderConfig();
    String dateFormat = ivrProviderConfig.getTimestampFormat();
    Map<CallDetailFields, String> paramsMap = callConfig.getCallbackParamsMap();

    Map<String, ?> data = ivrData;

    if (ivrProviderConfig.getJsonCallback()) {
      data = parseIvrCallbackJson(callConfig, json);
    }

    String providerCallId =
        getStringFromCallbackData(paramsMap.get(CallDetailFields.PROVIDER_CALL_ID), data);
    String callDetailId =
        getStringFromCallbackData(paramsMap.get(CallDetailFields.CALL_DETAIL_ID), data);
    String phone = getStringFromCallbackData(paramsMap.get(CallDetailFields.PHONE), data);
    String callStatusDetails =
        getStringFromCallbackData(paramsMap.get(CallDetailFields.CALL_STATUS), data);
    CallStatus callStatus =
        getCallStatusFromCallbackData(callConfig.getCallStatusMap(), callStatusDetails);
    Integer numberOfAttempts =
        getIntFromCallbackData(paramsMap.get(CallDetailFields.NUMBER_OF_ATTEMPTS), data);
    Double callDuration =
        getDoubleFromCallbackData(paramsMap.get(CallDetailFields.CALL_DURATION), data);
    Double messagePercentListened =
        getDoubleFromCallbackData(paramsMap.get(CallDetailFields.MESSAGE_PERCENT_LISTENED), data);
    Double messageTimeListened =
        getDoubleFromCallbackData(paramsMap.get(CallDetailFields.MESSAGE_TIME_LISTENED), data);

    LocalDateTime startTimestamp = null;
    LocalDateTime endTimestamp = null;

    if (StringUtils.isNotBlank(dateFormat)) {
      startTimestamp = getDateFromCallbackData(paramsMap.get(CallDetailFields.START_TIMESTAMP),
          data, dateFormat);
      endTimestamp =
          getDateFromCallbackData(paramsMap.get(CallDetailFields.END_TIMESTAMP), data, dateFormat);
    }

    Map<String, String> extraParams = new HashMap<>();

    data.forEach((key, value) -> {
      if (value != null) {
        extraParams.put(key, value.toString());
      }
    });

    IvrCall ivrCall = null;

    if (StringUtils.isNotBlank(providerCallId)) {
      ivrCall = ivrCallRepository.findByProviderCallId(providerCallId);
    }

    CallDetail callDetail = new CallDetail(providerCallId, callDetailId, phone, callStatus,
        callStatusDetails, startTimestamp, endTimestamp, numberOfAttempts, callDuration,
        messagePercentListened, messageTimeListened, ivrCall, extraParams);

    callDetailRepository.save(callDetail);
  }

  private String getStringFromCallbackData(String field, Map<String, ?> data) {
    Object value = data.get(field);
    data.remove(field);

    if (value != null) {
      return value.toString();
    }

    return null;
  }

  private CallStatus getCallStatusFromCallbackData(Map<String, CallStatus> callStatusMap,
      String status) {
    CallStatus callStatus = callStatusMap.get(status);

    if (callStatus == null) {
      return CallStatus.OTHER;
    }

    return callStatus;
  }

  private LocalDateTime getDateFromCallbackData(String field, Map<String, ?> data,
      String dateFormat) {
    Object date = data.get(field);

    if (date != null && !date.toString().isBlank()) {
      data.remove(field);
      return LocalDateTime.parse(date.toString(), DateTimeFormatter.ofPattern(dateFormat));
    }

    return null;
  }

  private Integer getIntFromCallbackData(String field, Map<String, ?> data) {
    Object value = data.get(field);
    data.remove(field);

    if (value == null) {
      return null;
    }

    if (value instanceof Integer) {
      return (Integer) value;
    }

    return Integer.valueOf(value.toString());
  }

  private Double getDoubleFromCallbackData(String field, Map<String, ?> data) {
    Object value = data.get(field);
    data.remove(field);

    if (value == null) {
      return null;
    }

    if (value instanceof Double) {
      return (Double) value;
    }

    return Double.valueOf(value.toString());
  }

  private Map<String, Object> parseIvrCallbackJson(CallConfig callConfig, String callbackJson) {
    IvrProviderConfig ivrProviderConfig = callConfig.getIvrProviderConfig();
    IvrJsonField jsonField = ivrProviderConfig.getCallbackFields();

    return getDataFromJson(jsonField, callbackJson);
  }

  private void startIvrCall(CallConfig callConfig, Map<String, Object> data) {
    String url = prepareUrl(callConfig, data);
    HttpEntity<?> request = prepareRequest(callConfig, data);

    IvrProviderConfig ivrProviderConfig = callConfig.getIvrProviderConfig();
    String response = sendIvrRequest(url, ivrProviderConfig.getHttpMethod(), request,
        ivrProviderConfig.getJsonResponse());

    Map<String, Object> responseData = new HashMap<>();

    if (ivrProviderConfig.getJsonResponse()) {
      responseData = parseIvrResponse(callConfig, response);
    }

    saveIvrCallDetails(data, responseData, callConfig);
  }

  private void saveIvrCallDetails(Map<String, Object> entityData, Map<String, Object> responseData,
      CallConfig callConfig) {
    Map<String, String> extraParams = new HashMap<>();

    responseData.forEach((key, value) -> {
      if (value != null) {
        extraParams.put(key, value.toString());
      }
    });

    Map<IvrCallFields, String> paramsMap = callConfig.getResponseParamsMap();
    String providerCallId = getCallFieldValue(IvrCallFields.PROVIDER_CALL_ID,
        entityData, extraParams, paramsMap);

    if (providerCallId == null) {
      throw new IvrException("Could not save call details, because there is no provider call id "
          + "in the response from IVR provider");
    }

    String phone = getCallFieldValue(IvrCallFields.PHONE, entityData, extraParams, paramsMap);
    String receiverId = getCallFieldValue(IvrCallFields.RECEIVER_ID,
        entityData, extraParams, paramsMap);
    String messageKey = getMessageKey(entityData, callConfig.getMessageKeyMap());

    IvrCall ivrCall = new IvrCall(providerCallId, phone, receiverId, messageKey, extraParams);

    ivrCallRepository.save(ivrCall);
  }

  private String getMessageKey(Map<String, Object> entityData, Map<UUID, String> messageKeyMap) {
    UUID messageId = (UUID) entityData.get(MESSAGE_KEY);

    return messageKeyMap.get(messageId);
  }

  private String getCallFieldValue(IvrCallFields callField, Map<String, Object> entityData,
      Map<String, String> responseData, Map<IvrCallFields, String> paramsMap) {
    String fieldKey = paramsMap.get(callField);

    if (StringUtils.isBlank(fieldKey)) {
      return null;
    }

    Matcher matcher = PLACEHOLDERS_PATTERN.matcher(fieldKey);

    if (matcher.find()) {
      String field = matcher.group(1);
      Object value = entityData.get(field);

      if (value == null) {
        return null;
      }

      if (PHONE_NUMBER.equals(field) && StringUtils.isNotBlank(value.toString())) {
        return encryptionHelper.decrypt(value.toString());
      }

      return value.toString();
    }

    String value = responseData.get(fieldKey);
    responseData.remove(fieldKey);

    return value;
  }

  private CallConfig findCallConfig(String configName) {
    return callConfigRepository.findByName(configName).orElseThrow(
        () -> new EntityNotFoundException("Ivr Config with name: {0} not found", configName));
  }

  private Collection<Map<String, Object>> groupData(CallConfig callConfig,
      List<Map<String, Object>> data) {
    Set<String> vaccineeFields = callConfig.getEntityFields().stream()
        .map(FieldConfig::getName).collect(Collectors.toSet());
    Set<String> groupByFields = callConfig.getGroupByFields();
    groupByFields.add(MESSAGE_KEY);

    Map<Map<String, Object>, List<Map<String, Object>>> groupedData =
        data.stream().collect(groupingBy(element -> {
          Map<String, Object> keys = new HashMap<>();
          groupByFields.forEach(field -> keys.put(field, element.get(field)));

          return keys;
        }));

    return groupedData.values().stream().map(list ->
        list.stream().collect(Collector.of(() -> {
          Map<String, Object> initialMap = new HashMap<>();
          vaccineeFields.forEach(field -> initialMap.put(field, new ArrayList<>()));

          initialMap.put(GROUP_SIZE, list.size());
          return initialMap;
        },
            (result, article) -> {
              article.forEach((key, value) -> {
                if (groupByFields.contains(key)) {
                  result.put(key, value);
                } else {
                  ((List<Object>) result.get(key)).add(value);
                }
              });
            },
            (result1, result2) -> {
              result2.forEach((key, value) -> {
                if (groupByFields.contains(key)) {
                  result1.put(key, value);
                } else {
                  ((List<Object>) result1.get(key)).addAll((List<Object>) value);
                }
              });

              return result1;
            }))).collect(Collectors.toList());
  }

  private Map<String, Object> parseIvrResponse(CallConfig callConfig, String response) {
    IvrProviderConfig ivrProviderConfig = callConfig.getIvrProviderConfig();
    IvrJsonField jsonField = ivrProviderConfig.getResponseFields();

    return getDataFromJson(jsonField, response);
  }

  private Map<String, Object> getDataFromJson(IvrJsonField jsonField, String json) {
    Map<String, Object> data = new HashMap<>();

    if (JsonFieldType.ARRAY.equals(jsonField.getFieldType())) {
      parseDataFromJson(new JSONArray(json), jsonField, data);
    } else {
      parseDataFromJson(new JSONObject(json), jsonField, data);
    }

    return data;
  }

  private void parseDataFromJson(Object jsonObject, IvrJsonField jsonField,
      Map<String, Object> data) {

    if (jsonObject == null || jsonField == null) {
      return;
    }

    switch (jsonField.getFieldType()) {
      case ARRAY:
        ((JSONArray) jsonObject).forEach(obj -> {
          if (jsonField.getChildFields() != null && !jsonField.getChildFields().isEmpty()) {
            parseDataFromJson(obj, jsonField.getChildFields().iterator().next(), data);
          }
        });
        break;
      case OBJECT:
        if (jsonField.getChildFields() != null) {
          jsonField.getChildFields().forEach(field -> {
            Object obj = ((JSONObject) jsonObject).get(field.getFieldName());
            parseDataFromJson(obj, field, data);
          });
        }
        break;
      default:
        data.put(jsonField.getFieldName(), jsonObject);
        break;
    }
  }

  private String sendIvrRequest(String url, HttpMethod httpMethod, HttpEntity<?> request,
      Boolean jsonResponse) {
    try {
      if (jsonResponse) {
        ResponseEntity<String> responseEntity = REST_TEMPLATE.exchange(url, httpMethod,
            request, String.class);
        return responseEntity.getBody();
      }

      REST_TEMPLATE.exchange(url, httpMethod, request, Void.class);
      return null;
    } catch (RestClientResponseException ex) {
      String responseBodyJson = ex.getResponseBodyAsString();
      String message = "Invalid IVR service response: " + ex.getRawStatusCode() + " "
          + ex.getStatusText() + ", Response body: " + responseBodyJson;
      throw new IvrException(ex, message);
    } catch (RestClientException ex) {
      String message = "Error occurred when sending request to IVR service: " + ex.getMessage();
      throw new IvrException(ex, message);
    }
  }

  private String prepareUrl(CallConfig callConfig, Map<String, Object> data) {
    IvrProviderConfig ivrProviderConfig = callConfig.getIvrProviderConfig();

    MultiValueMap<String, String> params = prepareParams(ivrProviderConfig.getUrlParams(),
        callConfig.getUrlParamsMap(), callConfig.getMessageKeyMap(),
        callConfig.getLanguageMap(), callConfig.getGroupByFields(), data);

    UriComponentsBuilder builder = UriComponentsBuilder
        .fromHttpUrl(ivrProviderConfig.getUrl()).queryParams(params);

    return builder.build().toString();
  }

  private HttpEntity<?> prepareRequest(CallConfig callConfig, Map<String, Object> data) {
    IvrProviderConfig ivrProviderConfig = callConfig.getIvrProviderConfig();

    HttpHeaders headers = new HttpHeaders();

    if (ivrProviderConfig.getAuthRequired()) {
      String auth = ivrProviderConfig.getUsername() + ":" + ivrProviderConfig.getPassword();
      byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(StandardCharsets.US_ASCII));
      String authHeader = "Basic " + new String(encodedAuth);
      headers.add("Authorization", authHeader);
    }

    if (ivrProviderConfig.getJsonResponse()) {
      headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    } else {
      headers.setAccept(Collections.singletonList(MediaType.APPLICATION_FORM_URLENCODED));
    }

    if (HttpMethod.GET.equals(ivrProviderConfig.getHttpMethod())) {
      return new HttpEntity<>(headers);
    }

    if (ivrProviderConfig.getJsonRequest()) {
      headers.setContentType(MediaType.APPLICATION_JSON);

      String json = prepareJson(ivrProviderConfig.getRequestFields(),
          callConfig.getRequestParamsMap(), callConfig.getMessageKeyMap(),
          callConfig.getLanguageMap(), data);

      return new HttpEntity<>(json, headers);
    } else {
      headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

      MultiValueMap<String, String> params = prepareParams(ivrProviderConfig.getRequestParams(),
          callConfig.getRequestParamsMap(), callConfig.getMessageKeyMap(),
          callConfig.getLanguageMap(), callConfig.getGroupByFields(), data);

      return new HttpEntity<>(params, headers);
    }
  }

  private Object getDataForField(String field, Object data,
      Map<UUID, String> messageKeyMap, Map<UUID, String> languageMap) {
    if (data == null) {
      return null;
    }

    if (data instanceof List) {
      return ((List<?>) data).stream().map(val ->
          getDataForField(field, val, messageKeyMap, languageMap)).collect(Collectors.toList());
    }

    if (data instanceof Language) {
      Language language = (Language) data;
      String lang = languageMap.get(language.getId());

      if (lang != null) {
        return lang;
      }

      return language.getCode();
    }

    if (MESSAGE_KEY.equals(field)) {
      String messageKey = messageKeyMap.get(data);

      if (messageKey != null) {
        return messageKey;
      }
    }

    if (PHONE_NUMBER.equals(field) && StringUtils.isNotBlank(data.toString())) {
      return encryptionHelper.decrypt(data.toString());
    }

    return data;
  }

  private MultiValueMap<String, String> prepareParams(Set<String> availableParams,
      Map<String, String> paramsValueMap, Map<UUID, String> messageKeyMap,
      Map<UUID, String> languageMap, Set<String> groupByFields, Map<String, Object> data) {
    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

    availableParams.forEach(param -> {
      String value = paramsValueMap.get(param);

      if (StringUtils.isNotBlank(value)) {
        Matcher matcher = PLACEHOLDERS_PATTERN.matcher(value);

        if (matcher.find()) {
          String field = matcher.group(1);
          Object val = getDataForField(field, data.get(field), messageKeyMap, languageMap);

          if (groupByFields.contains(field)) {
            params.add(param, val == null ? null : val.toString());
          } else {
            params.add(param, StringUtils.join((List<Object>) val, LIST_JOIN_SEPARATOR));
          }
        } else {
          params.add(param, value);
        }
      }
    });

    return params;
  }

  private String prepareJson(IvrJsonField jsonField, Map<String, String> paramsValueMap,
      Map<UUID, String> messageKeyMap, Map<UUID, String> languageMap, Map<String, Object> data) {
    Object json = prepareJson(jsonField, paramsValueMap, messageKeyMap, languageMap, null, data);

    if (json != null) {
      return json.toString();
    }

    return new JSONObject().toString();
  }

  private Object prepareJson(IvrJsonField jsonField, Map<String, String> paramsValueMap,
      Map<UUID, String> messageKeyMap, Map<UUID, String> languageMap,
      Integer arrayIndex, Map<String, Object> data) {
    switch (jsonField.getFieldType()) {
      case OBJECT:
        return prepareJsonObject(jsonField.getChildFields(), paramsValueMap, messageKeyMap,
            languageMap, arrayIndex, data);
      case ARRAY:
        return prepareJsonArray(jsonField.getChildFields(), paramsValueMap, messageKeyMap,
            languageMap, data);
      default:
        String value = paramsValueMap.get(jsonField.getFieldName());

        if (value == null) {
          return null;
        }

        Matcher matcher = PLACEHOLDERS_PATTERN.matcher(value);

        if (matcher.find()) {
          String field = matcher.group(1);

          return getJsonData(jsonField.getFieldType(), field, arrayIndex,
              messageKeyMap, languageMap, data.get(field));
        } else {
          return value;
        }
    }
  }

  private JSONObject prepareJsonObject(Set<IvrJsonField> jsonFields,
      Map<String, String> paramsValueMap, Map<UUID, String> messageKeyMap,
      Map<UUID, String> languageMap, Integer arrayIndex, Map<String, Object> data) {
    JSONObject jo = new JSONObject();

    jsonFields.forEach(jsonField ->
        jo.put(jsonField.getFieldName(), prepareJson(jsonField, paramsValueMap, messageKeyMap,
            languageMap, arrayIndex, data)));

    return jo;
  }

  private JSONArray prepareJsonArray(Set<IvrJsonField> jsonFields,
      Map<String, String> paramsValueMap, Map<UUID, String> messageKeyMap,
      Map<UUID, String> languageMap, Map<String, Object> data) {
    JSONArray ja = new JSONArray();
    Iterator<IvrJsonField> it = jsonFields.iterator();
    Integer groupSize = (Integer) data.get(GROUP_SIZE);

    if (!it.hasNext() || groupSize == null) {
      return ja;
    }

    IvrJsonField jsonField = jsonFields.iterator().next();

    for (int i = 0; i < groupSize; i++) {
      ja.put(prepareJson(jsonField, paramsValueMap, messageKeyMap, languageMap, i, data));
    }

    return ja;
  }

  private Object getJsonData(JsonFieldType fieldType, String field, Integer arrayIndex,
      Map<UUID, String> messageKeyMap, Map<UUID, String> languageMap, Object data) {
    Object dataToParse = getDataForField(field, data, messageKeyMap, languageMap);

    if (dataToParse == null) {
      return null;
    }

    if (dataToParse instanceof List) {
      if (arrayIndex == null) {
        return StringUtils.join((List<?>) dataToParse, LIST_JOIN_SEPARATOR);
      }

      dataToParse = ((List<?>) dataToParse).get(arrayIndex);
    }

    if (JsonFieldType.STRING == fieldType) {
      return dataToParse.toString();
    }

    return dataToParse;
  }
}
