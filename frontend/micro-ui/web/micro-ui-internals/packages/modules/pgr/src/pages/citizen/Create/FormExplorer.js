

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
        serviceCode: formData?.SelectComplaintType?.serviceCode,
        description: formData?.description || "",
        applicationStatus: "CREATED",
        source: "web",
        citizen: userInfo,
        isDeleted: false,
        rowVersion: 1,
        address: {
          landmark: formData?.landmark,
          buildingName: formData?.AddressOne,
          street: formData?.AddressTwo,
          pincode: formData?.postalCode,
          locality: {
            code: formData?.SelectedBoundary?.code || formData?.SelectAddress?.locality?.code || "",
          },
          geoLocation: {
            latitude: geoLocation.lat,
            longitude: geoLocation.lng,
          },
        },
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
        setToast({ show: true, label: t("FAILED_TO_CREATE_COMPLAINT"), type: "error" });
      },
      onSuccess: async (responseData) => {
          dispatch({
            type: "CREATE_COMPLAINT",
            payload: responseData,
          });
        if (responseData && responseData.responseInfo.status === "successful") {
          const id = responseData.ServiceWrappers[0].service.serviceRequestId;
          
          await client.refetchQueries(["complaintsList"]);
          console.log("*** Log ===> ", match.path);
          history.push(`/digit-ui/citizen/pgr/response`);
          
        }
        if (responseData?.ResponseInfo?.Errors) {
          setToast({ show: true, label: t("FAILED_TO_CREATE_COMPLAINT"), type: "error" });
        } else {
        }
      },
    });
  };

  const onSubmit = async (data) => {
    const merged = { ...formData, ...data };
    setFormData(merged);
    console.log("Final data:", merged);
    const user = Digit.UserService.getUser();
    if (isLast) {
      const payload = mapFormDataToRequest(merged, tenantId, user, stateInfo);

      handleResponseForCreateComplaint(payload);



      // setToast(t("FORM_SUBMISSION_SUCCESS"));
      // call your API here
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  return (
    <Card type="secondary">
      <Header>{t("FORM_STEP", { current: currentStep + 1, total: configs.length })}</Header>

      <FormComposerV2
        label={isLast ? t("SUBMIT") : t("NEXT")}
        // config={configs}
        config={[configs[currentStep]]}
        defaultValues={formData}
        onSubmit={onSubmit}
        fieldStyle={{ marginBottom: "1rem" }}
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
