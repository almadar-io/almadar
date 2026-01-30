export default {
  "tabId": "T-006",
  "name": "Ugotovitve",
  "description": "Findings from inspection - documents issues discovered",
  "phase": "preparation",
  "globalVariablesSet": [
    "HG-FINDING_COUNT",
    "HG-CRITICAL_FINDINGS"
  ],
  "globalVariablesRequired": [
    "HG-INSPECTION_FIELD_ID"
  ],
  "localVariables": [],
  "entityMapping": {
    "entity": "Finding",
    "mode": "create_multiple",
    "parentField": "inspectionId"
  },
  "sections": [
    {
      "id": "S-1",
      "title": "Povzetek neskladnosti",
      "description": "Summary of non-compliant rule checks",
      "readOnly": true,
      "dataSource": {
        "entity": "RuleAnswer",
        "filter": ["and",
          ["=", "@item.inspectionId", "@entity.inspectionId"],
          ["=", "@item.answer", "fail"]
        ],
        "displayType": "summary-list"
      },
      "fields": [
        {
          "id": "nonCompliantSummary",
          "label": "Neskladna pravila",
          "type": "entity-list",
          "readOnly": true,
          "displayFields": ["ruleId", "notes"]
        }
      ]
    },
    {
      "id": "S-2",
      "title": "Ugotovitve",
      "description": "Formal findings based on non-compliant checks",
      "repeatable": true,
      "minItems": 0,
      "addButtonLabel": "Dodaj ugotovitev",
      "fields": [
        {
          "id": "description",
          "label": "Opis ugotovitve",
          "type": "textarea",
          "required": true,
          "minLength": 10,
          "maxLength": 1000,
          "placeholder": "Opišite ugotovljeno kršitev...",
          "entityField": "description"
        },
        {
          "id": "severity",
          "label": "Resnost",
          "type": "radio",
          "required": true,
          "options": [
            { "value": "low", "label": "Nizka" },
            { "value": "medium", "label": "Srednja" },
            { "value": "high", "label": "Visoka" },
            { "value": "critical", "label": "Kritična" }
          ],
          "entityField": "severity"
        },
        {
          "id": "relatedRuleIds",
          "label": "Povezana pravila",
          "type": "multi-select",
          "required": false,
          "dataSource": {
            "entity": "RuleAnswer",
            "filter": ["and",
              ["=", "@item.inspectionId", "@entity.inspectionId"],
              ["=", "@item.answer", "fail"]
            ],
            "valueField": "ruleId",
            "labelField": "ruleId"
          },
          "entityField": "relatedRuleIds"
        },
        {
          "id": "recommendation",
          "label": "Priporočilo",
          "type": "textarea",
          "required": false,
          "maxLength": 500,
          "placeholder": "Priporočila za odpravo...",
          "entityField": "recommendation"
        },
        {
          "id": "lawReference",
          "label": "Pravna podlaga",
          "type": "text",
          "required": false,
          "placeholder": "npr. ZVPOT-1 14/1",
          "entityField": "lawReference"
        }
      ],
      "hiddenCalculations": [
        {
          "variable": "HG-FINDING_COUNT",
          "expression": ["array/length", "@entity.findings"],
          "scope": "global"
        },
        {
          "variable": "HG-CRITICAL_FINDINGS",
          "expression": ["array/length", ["array/filter", "@entity.findings", ["lambda", ["f"], ["=", "@f.severity", "critical"]]]],
          "scope": "global"
        }
      ]
    }
  ],
  "validationRules": [],
  "contextMenu": [
    "Dodaj ugotovitev",
    "Priloga",
    "Fotografija"
  ]
};
