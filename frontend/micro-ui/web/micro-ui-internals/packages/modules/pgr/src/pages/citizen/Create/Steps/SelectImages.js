import React, { useState } from "react";
import { FormStep, ImageUploadHandler, Loader } from "@egovernments/digit-ui-react-components";

const SelectImages = ({ t, config, onSelect, onSkip, value = {} }) => {
  // const __initImages = Digit.SessionStorage.get("PGR_CREATE_IMAGES");
  const [uploadedImages, setUploadedImagesIds] = useState(() => {
    // __initImages ? __initImages : null
    const { uploadedImages } = value;
    // onSelect(config.key,uploadedImages);
    return uploadedImages ? uploadedImages : null;
  });
  const tenantId = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")?.code

  const handleUpload = (ids) => {
    setUploadedImagesIds(ids);
    onSelect(config.key,ids);

    // Digit.SessionStorage.set("PGR_CREATE_IMAGES", ids);
  };

  // const onSkip = () => onSelect();
  const handleSubmit = () => {
    if (!uploadedImages || uploadedImages.length === 0) return onSkip();
    // const _uploadImages = uploadedImages.map((url) => ({
    //   documentType: "PHOTO",
    //   fileStore: url,
    //   documentUid: "",
    //   additionalDetails: {},
    // }));
    // onSelect({ uploadedImages });
  };

  return (
    <FormStep config={config} onSelect={handleSubmit} onSkip={onSkip} t={t}>
      <ImageUploadHandler tenantId={value.city_complaint?.code ? value.city_complaint?.code : tenantId} uploadedImages={uploadedImages} onPhotoChange={handleUpload} />
    </FormStep>
  );
};

export default SelectImages;
