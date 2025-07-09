package org.egov;

import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.databind.JsonNode;
import org.egov.handler.util.UserUtil;
import org.springframework.util.StreamUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.egov.common.contract.request.RequestInfo;
import org.egov.handler.service.DataHandlerService;
import org.egov.handler.web.models.DefaultDataRequest;
import org.egov.handler.web.models.Tenant;
import org.egov.handler.web.models.TenantRequest;
import org.egov.handler.config.ServiceConfiguration;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class StartupDataInitializer implements ApplicationRunner {

    private final DataHandlerService dataHandlerService;

    private final ServiceConfiguration serviceConfig;

    private final ResourceLoader resourceLoader;

    private final ObjectMapper objectMapper;

    private final UserUtil userUtil;

    @Override
    public void run(ApplicationArguments args) throws IOException {

        String tenantCode = serviceConfig.getDefaultTenantId();
        Resource resource = resourceLoader.getResource("classpath:requestInfo.json");

        String json = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);

        json = json.replace("{tenantid}", tenantCode);

        JsonNode rootNode = objectMapper.readTree(json);
        JsonNode requestInfoNode = rootNode.get("RequestInfo");
        if (requestInfoNode == null) {
            throw new RuntimeException("Missing 'RequestInfo' node in JSON");
        }
        RequestInfo requestInfo = objectMapper.readValue(requestInfoNode.toString(), RequestInfo.class);

        Tenant tenant = Tenant.builder()
                .code(tenantCode)
                .name(tenantCode)
                .isActive(true)
                .build();

        TenantRequest tenantRequest = TenantRequest.builder()
                .requestInfo(requestInfo)
                .tenant(tenant)
                .build();

        DefaultDataRequest defaultDataRequest = DefaultDataRequest.builder().requestInfo(tenantRequest.getRequestInfo()).targetTenantId(tenantRequest.getTenant().getCode()).schemaCodes(serviceConfig.getDefaultMdmsSchemaList()).onlySchemas(Boolean.FALSE).locales(serviceConfig.getDefaultLocalizationLocaleList()).modules(serviceConfig.getDefaultLocalizationModuleList()).build();

        dataHandlerService.createDefaultDataFromFile(defaultDataRequest);
        dataHandlerService.createPgrWorkflowConfig(tenantRequest.getTenant().getCode());
        dataHandlerService.createTenantConfig(tenantRequest);
        userUtil.createUser(tenantRequest);
    }
}
