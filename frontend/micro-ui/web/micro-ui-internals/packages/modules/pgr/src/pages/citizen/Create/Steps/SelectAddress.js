import React, { useEffect, useState, useRef } from "react";
import { CardLabel, Dropdown, FormStep, RadioButtons } from "@egovernments/digit-ui-react-components";

const SelectAddress = ({ t, config, onSelect, userType, formData, value = {} }) => {

  const [selectedCity, setSelectedCity] = useState(null);
const [selectedLocality, setSelectedLocality] = useState(null);

  const allCities = Digit.Hooks.pgr.useTenants();
  const cities = value?.pincode ? allCities.filter((city) => city?.pincode?.some((pin) => pin == value["pincode"])) : allCities;

  
  const [localities, setLocalities] = useState(null);
  const [fetchedLocalities, setFetchedLocalities] = useState(null);



useEffect(() => {
  const fetch = async () => {
    const hierarchyType = window?.globalConfigs?.getConfig("HIERARCHY_TYPE") || "ADMIN";
    const boundaryType = window?.globalConfigs?.getConfig("BOUNDARY_TYPE") || "Locality";

    if (!selectedCity?.code) return;

    try {
      const res = await Digit.CustomService.getResponse({
        url: `/boundary-service/boundary-relationships/_search`,
        useCache: false,
        method: "POST",
        userService: false,
        params: {
          tenantId: selectedCity.code,
          hierarchyType: hierarchyType,
          boundaryType:boundaryType,
          includeChildren: true,
        },
      });
      setFetchedLocalities(res?.TenantBoundary[0].boundary || []);
    } catch (err) {
      console.error("Boundary fetch error:", err);
      setFetchedLocalities([]);
    } finally {
    }
  };

  fetch();
}, [selectedCity?.code]); 

  useEffect(() => {
    if (selectedCity && fetchedLocalities) {
      const { pincode } = value;
      let __localityList = pincode ? fetchedLocalities.filter((city) => city["pincode"] == pincode) : fetchedLocalities;
      setLocalities(__localityList);
    }
  }, [selectedCity, fetchedLocalities]);


  useEffect(() => {
    const city = formData?.SelectAddress?.city;
    const locality = formData?.SelectAddress?.locality;
    if (city) {
      setSelectedCity(city);
      setSelectedLocality(locality);
      onSelect(config.key, {
        city: city,
        locality: locality
      });
    }
  }, [formData?.SelectAddress?.city]);
  
  

  function selectCity(city) {
    setSelectedLocality(null);
    setLocalities(null);
    setSelectedCity(city);
    onSelect(config.key, {
      "city": city,
      "locality": {}
    })
    // Digit.SessionStorage.set("city_complaint", city);
  }

  function selectLocality(locality) {
    setSelectedLocality(locality);
    onSelect(config.key, {
      "city": selectedCity,
      "locality": locality
    })

    // Digit.SessionStorage.set("locality_complaint", locality);
  }

  function onSubmit() {
    // onSelect({ city_complaint: selectedCity, locality_complaint: selectedLocality });
  }
  return (
    <FormStep config={config} onSelect={onSubmit} t={t} isDisabled={selectedLocality ? false : true}>
      <div>
        <CardLabel>{t("MYCITY_CODE_LABEL")}</CardLabel>
        {cities?.length < 5 ? (
          <RadioButtons selectedOption={selectedCity} options={cities} optionsKey="i18nKey" onSelect={selectCity} />
        ) : (
          <Dropdown isMandatory selected={selectedCity} option={cities} select={selectCity} optionKey="i18nKey" t={t} />
        )}
        {selectedCity && localities && <CardLabel>{t("CS_CREATECOMPLAINT_MOHALLA")}</CardLabel>}
        {selectedCity && localities && (
          <React.Fragment>
            {localities?.length < 5 ? (
              <RadioButtons selectedOption={selectedLocality} options={localities} optionsKey="code" onSelect={selectLocality} />
            ) : (
              <Dropdown isMandatory selected={selectedLocality} optionKey="code" option={localities} select={selectLocality} t={t} />
            )}
          </React.Fragment>
        )}
      </div>
    </FormStep>
  );
};

export default SelectAddress;
