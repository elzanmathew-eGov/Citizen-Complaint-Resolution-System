

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Header, Toast, FormComposerV2 } from "@egovernments/digit-ui-components";
import { useDispatch } from "react-redux";
import { createComplaint as citizenCreateComplaints } from "../../../redux/actions/index";

import { complaintsUploadimages } from "./steps-config/complaintsUploadimages";
import { createComplaint } from "../../citizen/Create/steps-config/CreateComplients";
import { complaintsLocation } from "../../citizen/Create/steps-config/ComplaintsLocation";
import { pinComplaintLocaton } from "../../citizen/Create/steps-config/pinComplaintLocaton";
import { additionalDetails } from "../../citizen/Create/steps-config/additionalDetails";
import { locationDetails } from "../../citizen/Create/steps-config/locationDetails";
import { useQueryClient } from "react-query";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";

const configs = [
  createComplaint,
  pinComplaintLocaton,
  locationDetails,
  complaintsLocation,
  additionalDetails,
  complaintsUploadimages

];

const FormExplorer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const { t } = useTranslation();
  const { data: storeData, isLoading } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const isLast = currentStep === configs.length - 1;
  const history = useHistory();
  const client = useQueryClient();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const tenantId = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")?.code

function validateString(value) {
  return typeof value === "string" && value.trim().length > 0 ? value : "";
}

function validateGeoLocation(value) {
  if (
    value &&
    typeof value === "object" &&
    typeof value.lat === "number" &&
    typeof value.lng === "number"
  ) {
    return value;
  }
  return {};
}

const getEffectiveServiceCode = (mainType, subType) => {
  if (
    subType &&
    subType.department === mainType.department &&
    subType.menuPath === mainType.menuPath &&
    subType.serviceCode !== mainType.serviceCode
  ) {
    return subType.serviceCode;
  }

  return mainType.serviceCode;
};
  function mapFormDataToRequest(formData, tenantId, user, stateInfo) {
    const timestamp = Date.now();

    const userInfo = formData?.complaintUser?.code === "ANOTHER_USER"
      ? {
        name: formData?.ComplainantName?.trim() || null,
        mobileNumber: formData?.ComplainantContactNumber?.trim() || null,
        userName: formData?.ComplainantContactNumber?.trim() || null,
        type: "EMPLOYEE",
        tenantId,
      }
      : user;

    const additionalDetail = {
      supervisorName: formData?.SupervisorName?.trim() || null,
      supervisorContactNumber: formData?.SupervisorContactNumber?.trim() || null,
    };

    const geoLocation = formData?.GeoLocationsPoint || { lat: null, lng: null };

    return {
      service: {
        active: true,
        tenantId: tenantId || formData?.SelectAddress?.city?.code || "",
        serviceCode: getEffectiveServiceCode (formData?.SelectComplaintType,formData?.SelectSubComplaintType ),
        description: formData?.description || "",
        applicationStatus: "CREATED",
        source: "web",
        citizen: userInfo,
        isDeleted: false,
        rowVersion: 1,
        address: {
          landmark: validateString(formData?.landmark),
          buildingName: validateString(formData?.AddressOne),
          street: validateString(formData?.AddressTwo),
          pincode: validateString(formData?.postalCode),
          locality: {
            code: formData?.SelectedBoundary?.code || formData?.SelectAddress?.locality?.code || "",
          },
          geoLocation: validateGeoLocation( {
            latitude: geoLocation.lat,
            longitude: geoLocation.lng,
          }),
        } ,
        additionalDetail: JSON.stringify(additionalDetail),
        auditDetails: {
          createdBy: user?.uuid,
          createdTime: timestamp,
          lastModifiedBy: user?.uuid,
          lastModifiedTime: timestamp,
        },
      },
      workflow: {
        action: "APPLY",
        verificationDocuments: (formData?.ComplaintImagesPoint || []).map((fileStoreId) => ({
          documentType: "PHOTO",
          fileStoreId,
          documentUid: "",
          additionalDetails: {},
        })),
      },
    };
  };


  const { mutate: CreateComplaintMutation } = Digit.Hooks.pgr.useCreateComplaint(tenantId);


  const handleResponseForCreateComplaint = async (payload) => {

    await CreateComplaintMutation(payload, {
      onError: async () => {
        // setToast({ show: true, label: t("FAILED_TO_CREATE_COMPLAINT"), type: "error" });
      },
      onSuccess: async (responseData) => {
        dispatch({
          type: "CREATE_COMPLAINT",
          payload: responseData,
        });
        if (responseData && responseData.responseInfo.status === "successful") {
          const id = responseData.ServiceWrappers[0].service.serviceRequestId;

          await client.refetchQueries(["complaintsList"]);
          history.push(`/digit-ui/citizen/pgr/response`);

        }
        if (responseData?.ResponseInfo?.Errors) {
          // setToast({ show: true, label: t("FAILED_TO_CREATE_COMPLAINT"), type: "error" });
        } else {
        }
      },
    });
  };




  //## validation
  const mandatoryFieldsByStep = [
  // Step 0 — createComplaint config
    [],
    [],
    [],
  // Step 1 — pinComplaintLocaton config
  ["SelectAddress"],
  ["description"],
  // Step 5 — complaintsUploadimages config
  ["ComplaintImagesPoint"],
];


const isFieldValid = (data, fieldKey) => {
  switch (fieldKey) {
    case "ComplaintImagesPoint":
      return Array.isArray(data?.ComplaintImagesPoint) && data.ComplaintImagesPoint.length > 0;
    case "SelectAddress":
      return !!data?.SelectAddress?.city?.code;
    case "description":
      return typeof data?.description === "string" && data.description.trim().length > 0;
    case "SelectComplaintType":
      return data?.SelectComplaintType != null;
    case "GeoLocationsPoint":
      return data?.GeoLocationsPoint?.lat != null && data?.GeoLocationsPoint?.lng != null;
    default:
      return data[fieldKey] != null;
  }
};

const onSubmit = async (data) => {
  const merged = { ...formData, ...data };

  // Get fields mandatory for current step
  const mandatoryFields = mandatoryFieldsByStep[currentStep] || [];

  // Find which mandatory fields are missing or invalid
  const missingFields = mandatoryFields.filter(field => !isFieldValid(merged, field));

  if (missingFields.length > 0) {
    const missingLabels = missingFields.map(f => t(f));

    return; // block next step or submit
  }

  setFormData(merged);

  const user = Digit.UserService.getUser();

  if (isLast) {
    const payload = mapFormDataToRequest(merged, tenantId, user, stateInfo);
    handleResponseForCreateComplaint(payload);
  } else {
    setCurrentStep((s) => s + 1);
  }
};


  const previousMenuPathRef = React.useRef(null);

const onFormValueChange = (setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
  const complaintType = formData?.SelectComplaintType;
  const currentMenuPath = complaintType?.menuPath;

  // Skip if menuPath didn't change
  if (!currentMenuPath || previousMenuPathRef.current === currentMenuPath) return;

  previousMenuPathRef.current = currentMenuPath;

  const allTypes = createComplaint.body.find(f => f.key === "SelectComplaintType")?.populators?.options || [];

  const subTypes = allTypes
    .filter(opt => opt.menuPath === currentMenuPath && opt.code !== complaintType.code)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Remove the field if no subTypes available
  const subTypeIndex = createComplaint.body.findIndex(f => f.key === "SelectSubComplaintType");
  if (subTypes.length > 0) {
    const newField = {
      type: "dropdown",
      label: "CS_COMPLAINT_DETAILS_COMPLAINT_SUBTYPE",
      key: "SelectSubComplaintType",
      isMandatory: true,
      disable: false,
      populators: {
        name: "SelectSubComplaintType",
        optionsKey: "i18nKey",
        required: true,
        error: "CORE_COMMON_REQUIRED_ERRMSG",
        options: subTypes,
      },
    };

    if (subTypeIndex === -1) {
      // Inject below complaint type field
      const typeIndex = createComplaint.body.findIndex(f => f.key === "SelectComplaintType");
      createComplaint.body.splice(typeIndex + 1, 0, newField);
    } else {
      createComplaint.body[subTypeIndex] = newField; // update options
    }

    setValue("SelectSubComplaintType", null); // Reset value when type changes
  } else {
    // Remove if previously added
    if (subTypeIndex !== -1) {
      createComplaint.body.splice(subTypeIndex, 1);
    }

    setValue("SelectSubComplaintType", null); // still reset value
  }
};



  return (
    <Card type="secondary">
      <Header>{t("FORM_STEP", { current: currentStep + 1, total: configs.length })}</Header>

      <FormComposerV2
        label={isLast ? t("SUBMIT") : t("NEXT")}
        config={[configs[currentStep]]}
        defaultValues={formData}
        onSubmit={onSubmit}
        fieldStyle={{ marginBottom: "1rem" }}
        onFormValueChange={onFormValueChange}
      />

      {/* {currentStep > 0 && (
        <button onClick={() => setCurrentStep((s) => s - 1)}>
          {t("BACK")}
        </button>
      )} */}

      {toast && <Toast label={toast} type="success" onClose={() => setToast(null)} />}
    </Card>
  );
};

export default FormExplorer;
