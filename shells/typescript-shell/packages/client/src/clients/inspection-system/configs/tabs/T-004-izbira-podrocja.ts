export default {
  "tabId": "T-004",
  "name": "Predmet pregleda",
  "description": "Inspection field type selection",
  "phase": "introduction",
  "globalVariablesSet": [
    "HG-INSPECTION_FIELD_ID",
    "HG-INSPECTION_FIELD_TYPE",
    "HG-RULE_COUNT"
  ],
  "globalVariablesRequired": [],
  "localVariables": [],
  "entityMapping": {
    "entity": "InspectionField",
    "mode": "select_one"
  },
  "sections": [
    {
      "id": "S-1",
      "title": "Izbira področja pregleda",
      "description": "Select the type of inspection to perform",
      "fields": [
        {
          "id": "fieldSelection",
          "label": "Področje pregleda",
          "type": "card-selector",
          "required": true,
          "columns": 2,
          "entityType": "InspectionField",
          "options": [
            {
              "value": "trgovina",
              "label": "Trgovina",
              "description": "Nadzor trgovinske dejavnosti in prodajnih prostorov"
            },
            {
              "value": "gostinstvo",
              "label": "Gostinstvo",
              "description": "Nadzor gostinske dejavnosti in objektov"
            },
            {
              "value": "cene",
              "label": "Označevanje cen",
              "description": "Nadzor označevanja blaga s cenami"
            },
            {
              "value": "varstvo-potrosnikov",
              "label": "Varstvo potrošnikov",
              "description": "Nadzor pravic potrošnikov in reklamacij"
            },
            {
              "value": "tehnicne-zahteve",
              "label": "Tehnične zahteve",
              "description": "Nadzor tehničnih zahtev za proizvode"
            },
            {
              "value": "enostavne-stojnice",
              "label": "Enostavne stojnice",
              "description": "Nadzor prodaje na tržnicah in stojnicah"
            }
          ],
          "hiddenCalculation": {
            "variable": "HG-INSPECTION_FIELD_TYPE",
            "scope": "global"
          },
          "_note": "In production, options would come from InspectionField entity via dataSource. Static options here are for Storybook demo."
        }
      ]
    },
    {
      "id": "S-2",
      "title": "Povzetek",
      "description": "Summary of selected inspection field",
      "condition": ["!=", "@entity.globalVariables.HG_INSPECTION_FIELD_ID", null],
      "fields": [
        {
          "id": "summary",
          "label": "Izbrano področje",
          "type": "info-display",
          "displayTemplate": {
            "title": "Pregled: @entity.globalVariables.HG_INSPECTION_FIELD_TYPE",
            "content": "Število pravil za preverjanje: @entity.globalVariables.HG_RULE_COUNT"
          }
        }
      ]
    }
  ],
  "validationRules": [
    {
      "condition": ["!=", "@entity.globalVariables.HG_INSPECTION_FIELD_ID", null],
      "message": "Izbira področja pregleda je obvezna"
    }
  ]
};
