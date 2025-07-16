
export const createComplaint = {
  "head": "CS_COMPLAINT_DETAILS_COMPLAINT_DETAILS",
  "body": [
    {
      "isMandatory": true,
      "key": "SelectComplaintType",
      "type": "dropdown",
      "label": "CS_COMPLAINT_DETAILS_COMPLAINT_TYPE",
      "disable": false,
      "preProcess": {
        "updateDependent": [
          "populators.options"
        ]
      },
      "populators": {
        "name": "SelectComplaintType",
        "optionsKey": "i18nKey",
        "error": "CORE_COMMON_REQUIRED_ERRMSG",
        "options": [
          {
            "name": "Others",
            "order": 6,
            "active": true,
            "keywords": "other, miscellaneous,ad,playgrounds,burial,slaughterhouse, misc, tax, revenue",
            "menuPath": "",
            "slaHours": 336,
            "department": "DEPT_10",
            "serviceCode": "Others",
            "i18nKey": "SERVICEDEFS.OTHERS.DEPT_10",
            "code": "Others.DEPT_10"
          },
          {
            "name": "Park requires maintenance",
            "active": true,
            "keywords": "open, defecation, waste, human, privy, toilet",
            "menuPath": "Parks",
            "slaHours": 336,
            "department": "DEPT_5",
            "serviceCode": "ParkRequiresMaintenance",
            "i18nKey": "SERVICEDEFS.PARKREQUIRESMAINTENANCE.DEPT_5",
            "code": "ParkRequiresMaintenance.DEPT_5"
          },
          {
            "name": "Open Defecation",
            "active": true,
            "keywords": "open, defecation, waste, human, privy, toilet",
            "menuPath": "OpenDefecation",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "OpenDefecation",
            "i18nKey": "SERVICEDEFS.OPENDEFECATION.DEPT_3",
            "code": "OpenDefecation.DEPT_3"
          },
          {
            "name": "Cutting/trimming of tree required",
            "active": true,
            "keywords": "tree, remove, trim, fallen, cut, plant, branch",
            "menuPath": "Trees",
            "slaHours": 336,
            "department": "DEPT_5",
            "serviceCode": "CuttingOrTrimmingOfTreeRequired",
            "i18nKey": "SERVICEDEFS.CUTTINGORTRIMMINGOFTREEREQUIRED.DEPT_5",
            "code": "CuttingOrTrimmingOfTreeRequired.DEPT_5"
          },
          {
            "name": "Illegal Cutting of trees",
            "active": true,
            "keywords": "tree, cut, illegal, unathourized, remove, plant",
            "menuPath": "Trees",
            "slaHours": 336,
            "department": "DEPT_5",
            "serviceCode": "IllegalCuttingOfTrees",
            "i18nKey": "SERVICEDEFS.ILLEGALCUTTINGOFTREES.DEPT_5",
            "code": "IllegalCuttingOfTrees.DEPT_5"
          },
          {
            "name": "Illegal parking",
            "active": true,
            "keywords": "illegal, parking, car, vehicle, space, removal, road, street, vehicle",
            "menuPath": "LandViolations",
            "slaHours": 336,
            "department": "DEPT_6",
            "serviceCode": "IllegalParking",
            "i18nKey": "SERVICEDEFS.ILLEGALPARKING.DEPT_6",
            "code": "IllegalParking.DEPT_6"
          },
          {
            "name": "Illegal constructions",
            "active": true,
            "keywords": "illegal, violation, property, public, space, land, unathourised, site, construction, wrong, build",
            "menuPath": "LandViolations",
            "slaHours": 336,
            "department": "DEPT_6",
            "serviceCode": "IllegalConstructions",
            "i18nKey": "SERVICEDEFS.ILLEGALCONSTRUCTIONS.DEPT_6",
            "code": "IllegalConstructions.DEPT_6"
          },
          {
            "name": "Illegal shops on footpath",
            "active": true,
            "keywords": "illegal, shop, footpath, violation, property, public, space, land, unathourised, site, construction, wrong",
            "menuPath": "LandViolations",
            "slaHours": 336,
            "department": "DEPT_6",
            "serviceCode": "IllegalShopsOnFootPath",
            "i18nKey": "SERVICEDEFS.ILLEGALSHOPSONFOOTPATH.DEPT_6",
            "code": "IllegalShopsOnFootPath.DEPT_6"
          },
          {
            "name": "No water/electricity in public toilet",
            "active": true,
            "keywords": "toilet, public, restroom, bathroom, urinal, electricity, water, working",
            "menuPath": "PublicToilets",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "NoWaterOrElectricityinPublicToilet",
            "i18nKey": "SERVICEDEFS.NOWATERORELECTRICITYINPUBLICTOILET.DEPT_3",
            "code": "NoWaterOrElectricityinPublicToilet.DEPT_3"
          },
          {
            "name": "Public toilet damaged",
            "active": true,
            "keywords": "toilet, public, restroom, bathroom, urinal, block, working",
            "menuPath": "PublicToilets",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "PublicToiletIsDamaged",
            "i18nKey": "SERVICEDEFS.PUBLICTOILETISDAMAGED.DEPT_3",
            "code": "PublicToiletIsDamaged.DEPT_3"
          },
          {
            "name": "Dirty/smelly public toilet",
            "active": true,
            "keywords": "toilet, public, restroom, bathroom, urinal, smell, dirty",
            "menuPath": "PublicToilets",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "DirtyOrSmellyPublicToilets",
            "i18nKey": "SERVICEDEFS.DIRTYORSMELLYPUBLICTOILETS.DEPT_3",
            "code": "DirtyOrSmellyPublicToilets.DEPT_3"
          },
          {
            "name": "Dead animals",
            "active": true,
            "keywords": "stray, cow, cows, cattle, bull, bulls, graze, grazing, dung, menace",
            "menuPath": "Animals",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "DeadAnimals",
            "i18nKey": "SERVICEDEFS.DEADANIMALS.DEPT_3",
            "code": "DeadAnimals.DEPT_3"
          },
          {
            "name": "Stray animals",
            "active": true,
            "keywords": "stray, dog, dogs, menace, animal, animals, attack, attacking, bite, biting, bark, barking",
            "menuPath": "Animals",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "StrayAnimals",
            "i18nKey": "SERVICEDEFS.STRAYANIMALS.DEPT_3",
            "code": "StrayAnimals.DEPT_3"
          },
          {
            "name": "Request spraying/ fogging operations",
            "active": true,
            "keywords": "mosquito, menace, fog, spray, kill, health, dengue, malaria, disease, clean",
            "menuPath": "Mosquitos",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "RequestSprayingOrFoggingOperation",
            "i18nKey": "SERVICEDEFS.REQUESTSPRAYINGORFOGGINGOPERATION.DEPT_3",
            "code": "RequestSprayingOrFoggingOperation.DEPT_3"
          },
          {
            "name": "Construction material lying on the road",
            "active": true,
            "keywords": "illegal, shop, footpath, walk, remove, occupy, path",
            "menuPath": "RoadsAndFootpaths",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "ConstructionMaterialLyingOntheRoad",
            "i18nKey": "SERVICEDEFS.CONSTRUCTIONMATERIALLYINGONTHEROAD.DEPT_4",
            "code": "ConstructionMaterialLyingOntheRoad.DEPT_4"
          },
          {
            "name": "Damaged/blocked footpath",
            "active": true,
            "keywords": "footpath, repair, broken, surface, damage, patch, hole, maintenance, walk, path",
            "menuPath": "RoadsAndFootpaths",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "DamagedOrBlockedFootpath",
            "i18nKey": "SERVICEDEFS.DAMAGEDORBLOCKEDFOOTPATH.DEPT_4",
            "code": "DamagedOrBlockedFootpath.DEPT_4"
          },
          {
            "name": "Manhole cover is missing/damaged",
            "active": true,
            "keywords": "road, street, manhole, hole, cover, lid, footpath, open, man, drainage, damage, repair, fix",
            "menuPath": "RoadsAndFootpaths",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "ManholeCoverMissingOrDamaged",
            "i18nKey": "SERVICEDEFS.MANHOLECOVERMISSINGORDAMAGED.DEPT_4",
            "code": "ManholeCoverMissingOrDamaged.DEPT_4"
          },
          {
            "name": "Water logged road",
            "active": true,
            "keywords": "road, drainage, water, block, puddle, street, flood, overflow, rain",
            "menuPath": "RoadsAndFootpaths",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "WaterLoggedRoad",
            "i18nKey": "SERVICEDEFS.WATERLOGGEDROAD.DEPT_4",
            "code": "WaterLoggedRoad.DEPT_4"
          },
          {
            "name": "Damaged road",
            "active": true,
            "keywords": "road, damage, hole, surface, repair, patch, broken, maintenance, street, construction, fix",
            "menuPath": "RoadsAndFootpaths",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "DamagedRoad",
            "i18nKey": "SERVICEDEFS.DAMAGEDROAD.DEPT_4",
            "code": "DamagedRoad.DEPT_4"
          },
          {
            "name": "Water pressure is very less",
            "active": true,
            "keywords": "water, supply, connection, damage, repair, broken, pipe, piping, tap",
            "menuPath": "WaterandSewage",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "WaterPressureisVeryLess",
            "i18nKey": "SERVICEDEFS.WATERPRESSUREISVERYLESS.DEPT_4",
            "code": "WaterPressureisVeryLess.DEPT_4"
          },
          {
            "name": "Broken water pipe / Leakage",
            "order": 3,
            "active": true,
            "keywords": "water, supply, connection, damage, repair, broken, pipe, piping, tap",
            "menuPath": "WaterandSewage",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "BrokenWaterPipeOrLeakage",
            "i18nKey": "SERVICEDEFS.BROKENWATERPIPEORLEAKAGE.DEPT_4",
            "code": "BrokenWaterPipeOrLeakage.DEPT_4"
          },
          {
            "name": "Dirty water supply",
            "active": true,
            "keywords": "water, supply, connection, drink, dirty, contaminated, impure, health, clean",
            "menuPath": "WaterandSewage",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "DirtyWaterSupply",
            "i18nKey": "SERVICEDEFS.DIRTYWATERSUPPLY.DEPT_4",
            "code": "DirtyWaterSupply.DEPT_4"
          },
          {
            "name": "No water supply",
            "active": true,
            "keywords": "water, supply, connection, drink, tap",
            "menuPath": "WaterandSewage",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "NoWaterSupply",
            "i18nKey": "SERVICEDEFS.NOWATERSUPPLY.DEPT_4",
            "code": "NoWaterSupply.DEPT_4"
          },
          {
            "name": "Shortage of water",
            "active": true,
            "keywords": "water, supply, shortage, drink, tap, connection,leakage,less",
            "menuPath": "WaterandSewage",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "ShortageOfWater",
            "i18nKey": "SERVICEDEFS.SHORTAGEOFWATER.DEPT_4",
            "code": "ShortageOfWater.DEPT_4"
          },
          {
            "name": "Block / Overflowing sewage",
            "order": 2,
            "active": true,
            "keywords": "water, supply, connection, damage, repair, broken, pipe, piping, tap",
            "menuPath": "WaterandSewage",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "BlockOrOverflowingSewage",
            "i18nKey": "SERVICEDEFS.BLOCKOROVERFLOWINGSEWAGE.DEPT_4",
            "code": "BlockOrOverflowingSewage.DEPT_4"
          },
          {
            "name": "Illegal discharge of sewage",
            "active": true,
            "keywords": "water, supply, connection, damage, repair, broken, pipe, piping, tap",
            "menuPath": "WaterandSewage",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "illegalDischargeOfSewage",
            "i18nKey": "SERVICEDEFS.ILLEGALDISCHARGEOFSEWAGE.DEPT_4",
            "code": "illegalDischargeOfSewage.DEPT_4"
          },
          {
            "name": "Overflowing/Blocked drain",
            "active": true,
            "keywords": "drain, block, clean, debris, silt, drainage, water, clean, roadside, flow, remove, waste, garbage, clear, overflow, canal, fill, stagnate, rain, sanitation, sand, pipe, clog, stuck",
            "menuPath": "Drains",
            "slaHours": 336,
            "department": "DEPT_4",
            "serviceCode": "OverflowingOrBlockedDrain",
            "i18nKey": "SERVICEDEFS.OVERFLOWINGORBLOCKEDDRAIN.DEPT_4",
            "code": "OverflowingOrBlockedDrain.DEPT_4"
          },
          {
            "name": "Burning of garbage",
            "active": true,
            "keywords": "garbage, remove, burn, fire, health, waste, smoke, plastic, illegal",
            "menuPath": "Garbage",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "BurningOfGarbage",
            "i18nKey": "SERVICEDEFS.BURNINGOFGARBAGE.DEPT_3",
            "code": "BurningOfGarbage.DEPT_3"
          },
          {
            "name": "Damaged garbage bin",
            "active": true,
            "keywords": "garbage, waste, bin, dustbin, clean, remove, sanitation, overflow, smell, health, throw, dispose",
            "menuPath": "Garbage",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "DamagedGarbageBin",
            "i18nKey": "SERVICEDEFS.DAMAGEDGARBAGEBIN.DEPT_3",
            "code": "DamagedGarbageBin.DEPT_3"
          },
          {
            "name": "Garbage needs to be cleared",
            "order": 4,
            "active": true,
            "keywords": "garbage, collect, litter, clean, door, waste, remove, sweeper, sanitation, dump, health, debris, throw",
            "menuPath": "Garbage",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "GarbageNeedsTobeCleared",
            "i18nKey": "SERVICEDEFS.GARBAGENEEDSTOBECLEARED.DEPT_3",
            "code": "GarbageNeedsTobeCleared.DEPT_3"
          },
          {
            "name": "Streetlight not working",
            "order": 1,
            "active": true,
            "keywords": "streetlight, light, repair, work, pole, electric, power, repair, fix",
            "menuPath": "StreetLights",
            "slaHours": 336,
            "department": "DEPT_1",
            "serviceCode": "StreetLightNotWorking",
            "i18nKey": "SERVICEDEFS.STREETLIGHTNOTWORKING.DEPT_1",
            "code": "StreetLightNotWorking.DEPT_1"
          },
          {
            "name": "Non sweeping of road",
            "order": 5,
            "active": true,
            "keywords": "garbage, collect, litter, clean, door, waste, remove, sweeper, sanitation, dump, health, debris, throw",
            "menuPath": "Garbage",
            "slaHours": 336,
            "department": "DEPT_3",
            "serviceCode": "NonSweepingOfRoad",
            "i18nKey": "SERVICEDEFS.NONSWEEPINGOFROAD.DEPT_3",
            "code": "NonSweepingOfRoad.DEPT_3"
          },
          {
            "name": "No streetlight",
            "active": true,
            "keywords": "streetlight, light, repair, work, pole, electric, power, repair, damage, fix",
            "menuPath": "StreetLights",
            "slaHours": 336,
            "department": "DEPT_1",
            "serviceCode": "NoStreetlight",
            "i18nKey": "SERVICEDEFS.NOSTREETLIGHT.DEPT_1",
            "code": "NoStreetlight.DEPT_1"
          }
        ]
      }
    },
    {
  "isMandatory": false,
  "key": "SelectSubComplaintType",
  "type": "dropdown",
  "label": "CS_COMPLAINT_DETAILS_COMPLAINT_SUBTYPE",
  "disable": false,
  "populators": {
    "name": "SelectSubComplaintType",
    "optionsKey": "i18nKey",
    "options": [],
    "error": "CORE_COMMON_REQUIRED_ERRMSG"
  }
},
    {
      "inline": true,
      "label": "CS_COMPLAINT_DETAILS_COMPLAINT_DATE",
      "isMandatory": true,
      "key": "ComplaintDate",
      "type": "date",
      "disable": false,
      "preProcess": {
        "updateDependent": [
          "populators.validation.max"
        ]
      },
      "populators": {
        "name": "ComplaintDate",
        "required": true,
        "validation": {
          "max": "2025-07-09"
        },
        "error": "CORE_COMMON_REQUIRED_ERRMSG"
      }
    },
    {
      "type": "component",
      "isMandatory": true,
      "component": "PGRBoundaryComponent",
      "key": "SelectedBoundary",
      "label": "Boundary",
      "populators": {
        "name": "SelectedBoundary"
      }
    },

  ]
}