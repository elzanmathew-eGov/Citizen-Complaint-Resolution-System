import React, { useState } from "react";
import { FormStep, ImageUploadHandler } from "@egovernments/digit-ui-react-components";

const SelectImages = ({ t, config, formData, onSelect, onSkip, value = {} }) => {
  const [uploadedImages, setUploadedImagesIds] = useState(() => {
    return formData?.[config.key] || value?.uploadedImages || null;
  });

  const tenantId = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")?.code;

  const handleUpload = (ids) => {
    setUploadedImagesIds(ids);
    onSelect(config.key, ids);
  };

  const handleSubmit = () => {
    if (!uploadedImages || uploadedImages.length === 0) return onSkip();
    onSelect(config.key, uploadedImages);
  };

  return (
    <FormStep config={config} onSelect={handleSubmit} onSkip={onSkip} t={t}>
      <ImageUploadHandler
        tenantId={value.city_complaint?.code || tenantId}
        uploadedImages={uploadedImages}
        onPhotoChange={handleUpload}
      />
    </FormStep>
  );
};

export default SelectImages;
