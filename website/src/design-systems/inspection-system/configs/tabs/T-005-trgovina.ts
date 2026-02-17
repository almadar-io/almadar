export default {
  "tabId": "T-005",
  "name": "D. TRGOVINA",
  "globalVariablesSet": [
    "HG-PRODAJNI_PROSTOR"
  ],
  "globalVariablesRequired": [
    "HG-PROSTOR_NADZORA",
    "HG-PRODAJNI_PROSTOR"
  ],
  "localVariables": [
    "H-NADALJUJ",
    "H-PRPSPPTRSKVT"
  ],
  "sections": [
    {
      "id": "S-1",
      "title": "* HG-PROSTOR_NADZORA = [T-001].",
      "fields": []
    },
    {
      "id": "S-1",
      "title": "D. SPLOŠNI PODATKI O TRGOVINI",
      "fields": [
        {
          "id": "D1",
          "label": "Zavezanec opravlja trgovinsko dejavnost …",
          "type": "dropdown",
          "required": true,
          "repeatable": false,
          "options": [
            {
              "value": "V PRODAJALNI",
              "label": "v prodajalni",
              "isDefault": false
            },
            {
              "value": "NA PREMIČNI STOJNICI",
              "label": "na premični stojnici",
              "isDefault": false
            },
            {
              "value": "S POTUJOČO PRODAJALNO",
              "label": "s potujočo prodajalno",
              "isDefault": false
            },
            {
              "value": "S PRODAJNIM AVTOMATOM",
              "label": "s prodajnim avtomatom",
              "isDefault": false
            },
            {
              "value": "ZUNAJ POSLOVNIH PROSTOROV",
              "label": "zunaj poslovnih prostorov",
              "isDefault": false
            },
            {
              "value": "S PRODAJO NA DALJAVO",
              "label": "s prodajo na daljavo",
              "isDefault": false
            },
            {
              "value": "Z UPRAVLJANJEM TRŽNICE",
              "label": "z upravljanjem tržnice",
              "isDefault": false
            },
            {
              "value": "S PRODAJO IZ SKLADIŠČA",
              "label": "s prodajo iz skladišča",
              "isDefault": false
            },
            {
              "value": "Z UPRAVLJANJEM VELETRŽNICE",
              "label": "z upravljanjem veletržnice",
              "isDefault": false
            }
          ],
          "condition": [
            "or",
            [
              "=",
              "@entity.globalVariables.HG_PROSTOR_NADZORA",
              "PROSTORIH ZAVEZANCA«"
            ],
            [
              "=",
              "@entity.globalVariables.HG_PROSTOR_NADZORA",
              "PROSTORIH TIRS«"
            ],
            [
              "=",
              "@entity.globalVariables.HG_PROSTOR_NADZORA",
              "DRUGIH PROSTORIH«"
            ]
          ]
        },
        {
          "id": "D1",
          "label": "= »S PRODAJNIM AVTOMATOM«: Opozorilo: Vsi podatki o avtomatu se vnašajo pri nadzoru avtomata.",
          "type": "comment",
          "required": false,
          "repeatable": false
        },
        {
          "id": "D2",
          "label": "Opravlja se tudi pregled prodaje na daljavo.",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE",
          "condition": [
            "and",
            [
              "=",
              "@entity.localVariables.H_NADALJUJ",
              true
            ],
            [
              "or",
              [
                "=",
                "@entity.formValues.D1",
                "V PRODAJALNI«"
              ],
              [
                "=",
                "@entity.formValues.D1",
                "S PRODAJO IZ SKLADIŠČA«"
              ]
            ]
          ]
        }
      ],
      "subsections": [
        {
          "id": "S-1-1",
          "title": "H-NADALJUJ = TRUE and H-PRPSPPTRSKVT = TRUE: Podatki o prodajnem mestu",
          "fields": [
            {
              "id": "D3",
              "label": "Prodajno mesto ima posebno ime.",
              "type": "radio",
              "required": true,
              "repeatable": false,
              "options": [
                {
                  "value": "DA",
                  "label": "da",
                  "isDefault": false
                },
                {
                  "value": "NE",
                  "label": "NE",
                  "isDefault": true
                }
              ],
              "defaultValue": "NE"
            },
            {
              "id": "D4",
              "label": "Ime prodajnega mesta:",
              "type": "text",
              "required": false,
              "repeatable": false,
              "condition": [
                "=",
                "@entity.formValues.D3",
                "DA"
              ]
            },
            {
              "id": "D5",
              "label": "Prodajno mesto stoji na lokaciji (naslov in kraj ali opis lokacije) …",
              "type": "textarea",
              "required": true,
              "repeatable": false
            },
            {
              "id": "D6",
              "label": "Pregled se opravlja",
              "type": "dropdown",
              "required": false,
              "repeatable": false,
              "options": [
                {
                  "value": "V PRODAJALNI / NA PREMIČNI STOJNICI / V POTUJOČI PRODAJALNI ITD",
                  "label": "v prodajalni / na premični stojnici / v potujoči prodajalni itd",
                  "isDefault": false
                }
              ]
            },
            {
              "id": "D7",
              "label": "Zavezanec na stojnici običajno opravlja dejavnost (ZVPOT 1/22).",
              "type": "radio",
              "required": false,
              "repeatable": false,
              "options": [
                {
                  "value": "DA",
                  "label": "da",
                  "isDefault": false
                },
                {
                  "value": "NE",
                  "label": "NE",
                  "isDefault": true
                }
              ],
              "defaultValue": "NE",
              "lawReference": {
                "law": "ZVPOT",
                "article": "1/22",
                "type": "measure"
              },
              "condition": [
                "=",
                "@entity.formValues.D1",
                "PREMIČNA STOJNICA«"
              ]
            }
          ]
        },
        {
          "id": "S-1-1",
          "title": "Konec",
          "fields": []
        },
        {
          "id": "S-1-2",
          "title": "H-NADALJUJ = TRUE and VD.1 = »ZUNAJ POSLOVNIH PROSTOROV«: Podatki o prodaji zunaj poslovnih prostorov",
          "fields": [
            {
              "id": "D8",
              "label": "Prodaja zunaj poslovnih prostorov se opravlja …",
              "type": "dropdown",
              "required": true,
              "repeatable": false,
              "options": [
                {
                  "value": "NA IZLETU",
                  "label": "na izletu",
                  "isDefault": false
                },
                {
                  "value": "V GOSTINSKEM OBRATU",
                  "label": "v gostinskem obratu",
                  "isDefault": false
                },
                {
                  "value": "OD VRAT DO VRAT",
                  "label": "od vrat do vrat",
                  "isDefault": false
                },
                {
                  "value": "NA SEJMU",
                  "label": "na sejmu",
                  "isDefault": false
                },
                {
                  "value": "NA DRUG NAČIN",
                  "label": "na drug način",
                  "isDefault": false
                }
              ]
            },
            {
              "id": "D9",
              "label": "Prodaja zunaj poslovnih prostorov na drug način se opravlja (opiši kako) …",
              "type": "textarea",
              "required": false,
              "repeatable": false,
              "condition": [
                "=",
                "@entity.formValues.D8",
                "NA DRUG NAČIN«"
              ]
            },
            {
              "id": "D10",
              "label": "Prodaja zunaj poslovnih prostorov se opravlja na lokaciji …",
              "type": "text",
              "required": true,
              "repeatable": false
            }
          ]
        },
        {
          "id": "S-1-2",
          "title": "Konec",
          "fields": []
        },
        {
          "id": "S-1-3",
          "title": "H-NADALJUJ = TRUE and (VD.1 = »S PRODAJO NA DALJAVO« or VD.2 = »DA«): Podatki o prodaji na daljavo",
          "fields": [
            {
              "id": "D11",
              "label": "Prodaja na daljavo se opravlja (izberi vse, kar ustreza):",
              "type": "comment",
              "required": false,
              "repeatable": false
            },
            {
              "id": "D11_1",
              "label": "v spletni trgovini:",
              "type": "radio",
              "required": false,
              "repeatable": false,
              "options": [
                {
                  "value": "DA",
                  "label": "da",
                  "isDefault": false
                },
                {
                  "value": "NE",
                  "label": "NE",
                  "isDefault": true
                }
              ],
              "defaultValue": "NE"
            },
            {
              "id": "D11_2",
              "label": "preko kataloga:",
              "type": "radio",
              "required": false,
              "repeatable": false,
              "options": [
                {
                  "value": "DA",
                  "label": "da",
                  "isDefault": false
                },
                {
                  "value": "NE",
                  "label": "NE",
                  "isDefault": true
                }
              ],
              "defaultValue": "NE"
            },
            {
              "id": "D11_3",
              "label": "preko telefona:",
              "type": "radio",
              "required": false,
              "repeatable": false,
              "options": [
                {
                  "value": "DA",
                  "label": "da",
                  "isDefault": false
                },
                {
                  "value": "NE",
                  "label": "NE",
                  "isDefault": true
                }
              ],
              "defaultValue": "NE"
            },
            {
              "id": "D11_4",
              "label": "po TV:",
              "type": "radio",
              "required": false,
              "repeatable": false,
              "options": [
                {
                  "value": "DA",
                  "label": "da",
                  "isDefault": false
                },
                {
                  "value": "NE",
                  "label": "NE",
                  "isDefault": true
                }
              ],
              "defaultValue": "NE"
            },
            {
              "id": "D11_5",
              "label": "preko naročilnice:",
              "type": "radio",
              "required": false,
              "repeatable": false,
              "options": [
                {
                  "value": "DA",
                  "label": "da",
                  "isDefault": false
                },
                {
                  "value": "NE",
                  "label": "NE",
                  "isDefault": true
                }
              ],
              "defaultValue": "NE"
            },
            {
              "id": "D11_6",
              "label": "na drug način:",
              "type": "radio",
              "required": false,
              "repeatable": false,
              "options": [
                {
                  "value": "DA",
                  "label": "da",
                  "isDefault": false
                },
                {
                  "value": "NE",
                  "label": "NE",
                  "isDefault": true
                }
              ],
              "defaultValue": "NE"
            },
            {
              "id": "D11_6",
              "label": "= DA: D.11/7 - prodaja na daljavo na drug način se opravlja (opiši, kako) …",
              "type": "textarea",
              "required": false,
              "repeatable": false
            }
          ]
        },
        {
          "id": "S-1-3",
          "title": "Konec",
          "fields": []
        }
      ]
    },
    {
      "id": "S-1",
      "title": "Konec",
      "fields": []
    },
    {
      "id": "S-2",
      "title": "H-NADALJUJ = TRUE: NADZOR V TRGOVINI",
      "fields": [
        {
          "id": "D12",
          "label": "V trgovini se opravlja nadzor:",
          "type": "comment",
          "required": false,
          "repeatable": false
        },
        {
          "id": "D12_1",
          "label": "alkohola (oglaševanje)",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_2",
          "label": "alkohola (prodaje)",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_3",
          "label": "avtomata",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_4",
          "label": "avtorske in sorodnih pravic",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_5",
          "label": "davčnega potrjevanja računov",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_6",
          "label": "dodatne obdelave hrane",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_7",
          "label": "garancije",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_8",
          "label": "izdajanja računov",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "DA",
              "isDefault": true
            },
            {
              "value": "NE",
              "label": "ne",
              "isDefault": false
            }
          ],
          "defaultValue": "DA"
        },
        {
          "id": "D12_9",
          "label": "MTP (minimalnih tehničnih pogojev) v trgovini",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "DA",
              "isDefault": true
            },
            {
              "value": "NE",
              "label": "ne",
              "isDefault": false
            }
          ],
          "defaultValue": "DA"
        },
        {
          "id": "D12_10",
          "label": "MTP v trgovini pri prodaji nepakiranega blaga, ki se tehta",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_11",
          "label": "MTP v trgovini pri prodaji oblačil",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_12",
          "label": "MTP v trgovini pri prodaji obutve",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_13",
          "label": "navodil za uporabo",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_14",
          "label": "obrestovanja predplačil",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_15",
          "label": "odstopa potrošnika od nakupa na daljavo",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_16",
          "label": "označevanja cen",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_17",
          "label": "označevanja obutve",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_18",
          "label": "predstavljanja zavezanca javnosti",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_19",
          "label": "prodaje blaga z napako",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_20",
          "label": "prodaje na obroke",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_21",
          "label": "prodaje blaga v primerni embalaži",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_22",
          "label": "razprodaj",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_23",
          "label": "registracije zavezanca",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_24",
          "label": "slovenskega jezik",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_26",
          "label": "tobaka (oglaševanje)",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_27",
          "label": "tobaka (označevanje)",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_28",
          "label": "tobaka (prodaje)",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_29",
          "label": "trgovinskih evidenc",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        },
        {
          "id": "D12_30",
          "label": "zaračunavanja opominov",
          "type": "radio",
          "required": false,
          "repeatable": false,
          "options": [
            {
              "value": "DA",
              "label": "da",
              "isDefault": false
            },
            {
              "value": "NE",
              "label": "NE",
              "isDefault": true
            }
          ],
          "defaultValue": "NE"
        }
      ]
    },
    {
      "id": "S-2",
      "title": "Konec",
      "fields": []
    }
  ]
};
