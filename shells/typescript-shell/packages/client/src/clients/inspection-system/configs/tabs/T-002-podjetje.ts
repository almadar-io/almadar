export default {
  "tabId": "T-002",
  "name": "Podatki o zavezancu",
  "description": "Company data capture form",
  "phase": "introduction",
  "globalVariablesSet": [],
  "globalVariablesRequired": [],
  "localVariables": [],
  "entityMapping": {
    "entity": "Company",
    "mode": "search_or_create"
  },
  "sections": [
    {
      "id": "S-1",
      "title": "Iskanje podjetja",
      "description": "Search for existing company or create new",
      "fields": [
        {
          "id": "company_search",
          "label": "Iskanje podjetja",
          "type": "text",
          "required": false,
          "placeholder": "Vnesi ime ali matično številko",
          "searchConfig": {
            "entity": "Company",
            "searchFields": ["name", "registrationNumber"],
            "displayField": "name"
          }
        }
      ]
    },
    {
      "id": "S-2",
      "title": "Osnovni podatki",
      "description": "Basic company information",
      "fields": [
        {
          "id": "name",
          "label": "Ime podjetja",
          "type": "text",
          "required": true,
          "entityField": "name"
        },
        {
          "id": "companyId",
          "label": "ID podjetja",
          "type": "text",
          "required": true,
          "entityField": "companyId"
        },
        {
          "id": "registrationNumber",
          "label": "Matična številka",
          "type": "text",
          "required": true,
          "entityField": "registrationNumber"
        },
        {
          "id": "taxNumber",
          "label": "Davčna številka",
          "type": "text",
          "required": true,
          "entityField": "taxNumber"
        }
      ]
    },
    {
      "id": "S-3",
      "title": "Naslov",
      "description": "Company address",
      "fields": [
        {
          "id": "address",
          "label": "Naslov",
          "type": "text",
          "required": true,
          "entityField": "address"
        },
        {
          "id": "postalCode",
          "label": "Poštna številka",
          "type": "text",
          "required": true,
          "entityField": "postalCode"
        },
        {
          "id": "city",
          "label": "Mesto",
          "type": "text",
          "required": true,
          "entityField": "city"
        },
        {
          "id": "country",
          "label": "Država",
          "type": "text",
          "required": true,
          "defaultValue": "Slovenija",
          "entityField": "country"
        }
      ]
    }
  ],
  "validationRules": [
    {
      "condition": [">=", ["str/length", "@entity.formValues.registrationNumber"], 7],
      "message": "Matična številka mora imeti vsaj 7 znakov"
    },
    {
      "condition": [">=", ["str/length", "@entity.formValues.taxNumber"], 8],
      "message": "Davčna številka mora imeti vsaj 8 znakov"
    }
  ]
};
