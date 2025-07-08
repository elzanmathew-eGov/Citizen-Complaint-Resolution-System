package org.egov.handler.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.response.ResponseInfo;
import org.egov.handler.config.ServiceConfiguration;
import org.egov.handler.web.models.*;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class LocalizationUtil {

	private final RestTemplate restTemplate;

	private final ServiceConfiguration serviceConfig;

	private final ResourceLoader resourceLoader;

	@Autowired
	public LocalizationUtil(RestTemplate restTemplate, ServiceConfiguration serviceConfig, ResourceLoader resourceLoader) {
		this.restTemplate = restTemplate;
		this.serviceConfig = serviceConfig;
        this.resourceLoader = resourceLoader;
    }

	public void createLocalizationData(DefaultLocalizationDataRequest defaultLocalizationDataRequest) {

		StringBuilder uri = new StringBuilder();
		uri.append(serviceConfig.getLocalizationDefaultDataCreateURI());
		try {
			restTemplate.postForObject(uri.toString(), defaultLocalizationDataRequest, ResponseInfo.class);
		} catch (Exception e) {
			log.error("Error creating default localization data for {} : {}", defaultLocalizationDataRequest.getTargetTenantId(), e.getMessage());
			throw new CustomException("LOCALIZATION_DEFAULT_DATA_CREATE_FAILED", "Failed to create localization data for " + defaultLocalizationDataRequest.getTargetTenantId() + " : " + e.getMessage());
		}
	}

	public void upsertLocalizationFromFile(DefaultLocalizationDataRequest defaultLocalizationDataRequest){

		List<Message> messageList = addMessagesFromFile(defaultLocalizationDataRequest);
		defaultLocalizationDataRequest.getRequestInfo().getUserInfo().setId(128L);
		CreateMessagesRequest createMessagesRequest = CreateMessagesRequest.builder()
				.requestInfo(defaultLocalizationDataRequest.getRequestInfo())
				.tenantId(defaultLocalizationDataRequest.getTargetTenantId())
				.messages(messageList)
				.build();

		StringBuilder uri = new StringBuilder();
		uri.append(serviceConfig.getUpsertLocalizationURI());
		try {
			restTemplate.postForObject(uri.toString(), createMessagesRequest, ResponseInfo.class);
		} catch (Exception e) {
			log.error("Error creating Tenant localization data for {} : {}", defaultLocalizationDataRequest.getTargetTenantId(), e.getMessage());
			throw new CustomException("TENANT", "Failed to create localization data for " +  defaultLocalizationDataRequest.getTargetTenantId() + " : " + e.getMessage());
		}
	}

	public List addMessagesFromFile(DefaultLocalizationDataRequest defaultLocalizationDataRequest){
		List<Message> messages = new ArrayList<>();
		ObjectMapper objectMapper = new ObjectMapper();

		try {
			PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

			Resource[] resources = resolver.getResources("classpath:localisations/*/*.json");

			for (Resource resource : resources) {
				try (InputStream inputStream = resource.getInputStream()) {
					List<Message> fileMessages = Arrays.asList(objectMapper.readValue(inputStream, Message[].class));
					messages.addAll(fileMessages);
					log.info("Loaded {} messages from {}", fileMessages.size(), resource.getFilename());
				} catch (IOException e) {
					log.error("Failed to read localization file {}: {}", resource.getFilename(), e.getMessage());
				}
			}
		} catch (IOException e) {
			log.error("❌ Failed to scan localization directories: {}", e.getMessage());
		}

		return messages;
	}
}
