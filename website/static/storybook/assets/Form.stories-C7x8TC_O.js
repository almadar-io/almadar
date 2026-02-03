import{j as e}from"./jsx-runtime-CDt2p4po.js";import{R as v,r as V}from"./index-GiUgBvb1.js";import{c as te}from"./cn-BNf5BS2b.js";import{I as C}from"./Input-DhFss4oc.js";import{B as be}from"./Button-Dn0472P0.js";import{S as ba}from"./Select-CVuTODQb.js";import{T as ha}from"./Textarea-C8Aqv8YN.js";import{C as fa}from"./Checkbox-JlfTorra.js";import{B as I}from"./Box-DYJzRMmP.js";import{V as g,H as va}from"./Stack-DhhoTPuC.js";import{T as l}from"./Typography-Wmkp-g7N.js";import{I as Va}from"./Icon-DDCXmKGr.js";import{d as R,i as Sa,a as Ta,b as wa,R as Ea}from"./RelationSelect-DPYBdBT3.js";import{A as ne}from"./Alert-mBErZifW.js";import{u as re}from"./useEventBus-BNZMNlv8.js";import{e as ka,c as Fa}from"./SExpressionEvaluator-DyJCz_6e.js";import"./chevron-down-BQmz_Bpa.js";import"./createLucideIcon-CbHznvEr.js";import"./x-prXd1WI5.js";import"./loader-2-DXp1ic5P.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./Spinner-vF2DJrH5.js";function Ca(t){return Fa({formValues:t.formValues,globalVariables:t.globalVariables,localVariables:t.localVariables??{},...t.entity},{},"active")}function O(t,n){const o=Ca(n);return ka(t,o)}const Ia={vertical:"flex flex-col",horizontal:"flex flex-row flex-wrap items-end",inline:"flex flex-row flex-wrap items-center"},xa={sm:"gap-2",md:"gap-4",lg:"gap-6"};function aa(t){if(t.options&&t.options.length>0)return[...t.options];if(t.values&&t.values.length>0)return t.values.map(o=>({value:o,label:o.charAt(0).toUpperCase()+o.slice(1).replace(/_/g," ")}));const n=t.validation;return n!=null&&n.enum&&Array.isArray(n.enum)?n.enum.map(o=>({value:o,label:o.charAt(0).toUpperCase()+o.slice(1).replace(/_/g," ")})):[]}function Na(t){var n;if(t.inputType)return t.inputType;if(t.type==="relation"||t.relation)return"relation";if(t.type==="enum"||t.values||aa(t).length>0)return"select";switch((n=t.type)==null?void 0:n.toLowerCase()){case"email":return"email";case"password":return"password";case"url":return"url";case"number":case"integer":case"float":return"number";case"date":return"date";case"datetime":case"timestamp":return"datetime-local";case"boolean":return"checkbox";case"textarea":case"text":return t.max&&t.max>200?"textarea":"text";default:return"text"}}const k=({children:t,onSubmit:n,onCancel:o,layout:d="vertical",gap:y="md",className:S,entity:u,fields:p,initialData:b={},isLoading:E=!1,error:ie,submitLabel:ta="Save",cancelLabel:na="Cancel",showCancel:ra,title:$a,submitEvent:Z="SAVE",cancelEvent:K="CANCEL",relationsData:oe={},relationsLoading:se={},conditionalFields:le={},hiddenCalculations:ce=[],violationTriggers:me=[],evaluationContext:i,sections:A=[],onFieldChange:Q,...ia})=>{const T=re(),oa=b??{},_=typeof le=="boolean"?{}:le,X=typeof ce=="boolean"?[]:ce,Y=typeof me=="boolean"?[]:me,[F,ue]=v.useState(oa),[de,sa]=v.useState(new Set),la=ra??(p&&p.length>0),D=v.useMemo(()=>({formValues:F,globalVariables:(i==null?void 0:i.globalVariables)??{},localVariables:(i==null?void 0:i.localVariables)??{},entity:(i==null?void 0:i.entity)??{}}),[F,i]);v.useEffect(()=>{const a=b;a&&Object.keys(a).length>0&&ue(a)},[b]);const ca=v.useCallback((a,r)=>{if(!X.length)return;const m={formValues:r,globalVariables:(i==null?void 0:i.globalVariables)??{},localVariables:(i==null?void 0:i.localVariables)??{},entity:(i==null?void 0:i.entity)??{}};X.forEach(s=>{if(s.triggerFields.includes(a)){const w=O(s.expression,m);T.emit("UI:GLOBAL_VARIABLE_SET",{variable:s.variableName,value:w}),R("forms",`Calculation triggered: ${s.variableName} = ${w}`)}})},[X,i,T]),ma=v.useCallback((a,r)=>{if(!Y.length)return;const m={formValues:r,globalVariables:(i==null?void 0:i.globalVariables)??{},localVariables:(i==null?void 0:i.localVariables)??{},entity:(i==null?void 0:i.entity)??{}};Y.forEach(s=>{O(s.condition,m)&&(T.emit("UI:VIOLATION_DETECTED",{fieldId:s.fieldId??a,...s.violation}),R("forms",`Violation detected: ${s.violation.law} ${s.violation.article}`))})},[Y,i,T]),h=(a,r)=>{const m={...F,[a]:r};ue(m),T.emit("UI:FIELD_CHANGED",{fieldId:a,value:r,formValues:m}),Q==null||Q({fieldId:a,value:r,formValues:m}),ca(a,m),ma(a,m)},pe=v.useCallback(a=>{const r=_[a];return r?!!O(r,D):!0},[_,D]),ge=v.useCallback(a=>a.condition?!!O(a.condition,D):!0,[D]),ua=a=>{sa(r=>{const m=new Set(r);return m.has(a)?m.delete(a):m.add(a),m})},da=a=>{a.preventDefault(),T.emit(`UI:${Z}`,{data:F,entity:u}),typeof n=="function"?n(a,F):typeof n=="string"&&T.emit(`UI:${n}`,{data:F,entity:u})},pa=()=>{T.emit(`UI:${K}`),T.emit("UI:CLOSE"),typeof o=="function"?o():typeof o=="string"&&T.emit(`UI:${o}`)},j=v.useCallback(a=>{const r=a.name||a.field;if(!r||!pe(r))return null;const m=Na(a),s=a.label||r.charAt(0).toUpperCase()+r.slice(1).replace(/([A-Z])/g," $1"),w=F[r]??a.defaultValue??"";return e.jsxs(g,{gap:"xs",children:[m!=="checkbox"&&e.jsxs(l,{as:"label",variant:"label",weight:"bold",children:[s,a.required&&e.jsx(l,{as:"span",color:"error",className:"ml-1",children:"*"})]}),ga(a,r,m,w,s)]},r)},[F,pe,oe,se,E]),ee=v.useMemo(()=>!p||p.length===0?null:(Sa()&&(Ta(`Form: ${u||"unknown"}`),R(`Fields count: ${p.length}`),R("Conditional fields:",Object.keys(_)),wa()),p.map(j).filter(Boolean)),[p,j,u,_]),x=v.useMemo(()=>!A||A.length===0?null:A.map(a=>{if(!ge(a))return null;const r=de.has(a.id);return e.jsxs(I,{border:!0,rounded:"lg",overflow:"hidden",children:[e.jsxs(I,{className:te("px-4 py-3 bg-[var(--color-muted)] flex items-center justify-between",a.collapsible&&"cursor-pointer hover:bg-[var(--color-muted)]/80"),onClick:a.collapsible?()=>ua(a.id):void 0,children:[e.jsx(l,{variant:"label",weight:"semibold",children:a.title}),a.collapsible&&e.jsx(Va,{name:"chevron-down",size:"md",className:te("text-[var(--color-muted-foreground)] transition-transform",r&&"rotate-180")})]}),!r&&e.jsx(I,{padding:"md",children:e.jsx(g,{gap:y==="sm"?"sm":y==="lg"?"lg":"md",children:a.fields.map(j).filter(Boolean)})})]},a.id)}).filter(Boolean),[A,ge,de,j,y]);function ga(a,r,m,s,w){var ye;const f={id:r,name:r,required:a.required,disabled:E,placeholder:a.placeholder};switch(m){case"checkbox":return e.jsx(fa,{...f,label:w+(a.required?" *":""),checked:!!s,onChange:c=>h(r,c.target.checked)});case"textarea":return e.jsx(ha,{...f,value:String(s),onChange:c=>h(r,c.target.value),minLength:a.min,maxLength:a.max});case"select":{const c=aa(a);return e.jsx(ba,{...f,options:c,value:String(s),onChange:ae=>h(r,ae.target.value),placeholder:a.placeholder||`Select ${w}...`})}case"relation":{const c=oe[r]||[],ae=se[r]||!1;return e.jsx(Ea,{...f,value:s?String(s):void 0,onChange:ya=>h(r,ya),options:c,isLoading:ae,placeholder:a.placeholder||`Select ${w}...`,searchPlaceholder:`Search ${((ye=a.relation)==null?void 0:ye.entity)||w}...`,clearable:!a.required})}case"number":return e.jsx(C,{...f,type:"number",value:s!==void 0&&s!==""?String(s):"",onChange:c=>h(r,c.target.value?Number(c.target.value):void 0),min:a.min,max:a.max});case"date":return e.jsx(C,{...f,type:"date",value:La(s),onChange:c=>h(r,c.target.value)});case"datetime-local":return e.jsx(C,{...f,type:"datetime-local",value:Aa(s),onChange:c=>h(r,c.target.value)});case"email":return e.jsx(C,{...f,type:"email",value:String(s),onChange:c=>h(r,c.target.value)});case"url":return e.jsx(C,{...f,type:"url",value:String(s),onChange:c=>h(r,c.target.value)});case"password":return e.jsx(C,{...f,type:"password",value:String(s),onChange:c=>h(r,c.target.value)});case"text":default:return e.jsx(C,{...f,type:"text",value:String(s),onChange:c=>h(r,c.target.value),minLength:a.min,maxLength:a.max,pattern:a.pattern})}}return e.jsxs("form",{className:te(Ia[d],xa[y],S),onSubmit:da,...ia,children:[ie&&e.jsx(ne,{variant:"error",className:"mb-4",children:ie.message||"An error occurred"}),x&&x.length>0&&e.jsx(g,{gap:y==="sm"?"sm":y==="lg"?"lg":"md",children:x}),ee,t,(ee&&ee.length>0||x&&x.length>0)&&e.jsxs(va,{gap:"sm",className:"pt-4",children:[e.jsx(be,{type:"submit",variant:"primary",disabled:E,"data-event":Z,"data-testid":`action-${Z}`,children:E?"Saving...":ta}),la&&e.jsx(be,{type:"button",variant:"secondary",onClick:pa,disabled:E,"data-event":K,"data-testid":`action-${K}`,children:na})]})]})};function La(t){if(!t)return"";if(t instanceof Date)return t.toISOString().split("T")[0];if(typeof t=="string"){const n=new Date(t);return isNaN(n.getTime())?t:n.toISOString().split("T")[0]}return""}function Aa(t){if(!t)return"";if(t instanceof Date)return t.toISOString().slice(0,16);if(typeof t=="string"){const n=new Date(t);return isNaN(n.getTime())?t:n.toISOString().slice(0,16)}return""}k.displayName="Form";k.__docgenInfo={description:"",methods:[],displayName:"Form",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Form fields (traditional React children)"},onSubmit:{required:!1,tsType:{name:"union",raw:`| ((
    e: React.FormEvent<HTMLFormElement>,
    data?: Record<string, unknown>,
  ) => void)
| string`,elements:[{name:"unknown"},{name:"string"}]},description:"Submit handler - receives form data, or event name string for trait dispatch"},onCancel:{required:!1,tsType:{name:"union",raw:"(() => void) | string",elements:[{name:"unknown"},{name:"string"}]},description:"Cancel handler - function or event name string for trait dispatch"},layout:{required:!1,tsType:{name:"union",raw:'"vertical" | "horizontal" | "inline"',elements:[{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'},{name:"literal",value:'"inline"'}]},description:"Form layout",defaultValue:{value:'"vertical"',computed:!1}},gap:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"Gap between fields",defaultValue:{value:'"md"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},entity:{required:!1,tsType:{name:"string"},description:"Entity type name (schema format)"},mode:{required:!1,tsType:{name:"union",raw:'"create" | "edit"',elements:[{name:"literal",value:'"create"'},{name:"literal",value:'"edit"'}]},description:"Form mode - 'create' for new records, 'edit' for updating existing"},fields:{required:!1,tsType:{name:"unknown"},description:"Fields definition (schema format) - accepts readonly for generated const arrays"},initialData:{required:!1,tsType:{name:"union",raw:"Record<string, unknown> | unknown",elements:[{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"},{name:"unknown"}]},description:"Initial form data",defaultValue:{value:"{}",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state"},submitLabel:{required:!1,tsType:{name:"string"},description:"Submit button label",defaultValue:{value:'"Save"',computed:!1}},cancelLabel:{required:!1,tsType:{name:"string"},description:"Cancel button label (if provided, shows cancel button)",defaultValue:{value:'"Cancel"',computed:!1}},showCancel:{required:!1,tsType:{name:"boolean"},description:"Show cancel button (defaults to true for schema forms)"},title:{required:!1,tsType:{name:"string"},description:"Form title (used by ModalSlot to extract title)"},submitEvent:{required:!1,tsType:{name:"string"},description:"Event to dispatch on successful submit (defaults to 'SAVE')",defaultValue:{value:'"SAVE"',computed:!1}},cancelEvent:{required:!1,tsType:{name:"string"},description:"Event to dispatch on cancel (defaults to 'CANCEL')",defaultValue:{value:'"CANCEL"',computed:!1}},relationsData:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, readonly RelationOption[]>"},description:"Data for relation fields: { fieldName: RelationOption[] }",defaultValue:{value:"{}",computed:!1}},relationsLoading:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"boolean"}],raw:"Record<string, boolean>"},description:"Loading state for relation data: { fieldName: boolean }",defaultValue:{value:"{}",computed:!1}},conditionalFields:{required:!1,tsType:{name:"union",raw:"Record<string, SExpression> | boolean",elements:[{name:"Record",elements:[{name:"string"},{name:"SExpr"}],raw:"Record<string, SExpression>"},{name:"boolean"}]},description:"Map of fieldId → S-expression condition for conditional field display (boolean true means enabled but config loaded separately)",defaultValue:{value:"{}",computed:!1}},hiddenCalculations:{required:!1,tsType:{name:"union",raw:"HiddenCalculation[] | boolean",elements:[{name:"Array",elements:[{name:"HiddenCalculation"}],raw:"HiddenCalculation[]"},{name:"boolean"}]},description:"Hidden calculations that emit GLOBAL_VARIABLE_SET on field change (boolean true means enabled but config loaded separately)",defaultValue:{value:"[]",computed:!1}},violationTriggers:{required:!1,tsType:{name:"union",raw:"ViolationTrigger[] | boolean",elements:[{name:"Array",elements:[{name:"ViolationTrigger"}],raw:"ViolationTrigger[]"},{name:"boolean"}]},description:"Violation conditions that emit VIOLATION_DETECTED when met (boolean true means enabled but config loaded separately)",defaultValue:{value:"[]",computed:!1}},evaluationContext:{required:!1,tsType:{name:"union",raw:"FormEvaluationContext | Record<string, unknown>",elements:[{name:"FormEvaluationContext"},{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>"}]},description:"Context for S-expression evaluation - accepts flexible types from generated code"},sections:{required:!1,tsType:{name:"Array",elements:[{name:"FormSection"}],raw:"FormSection[]"},description:"Nested form sections with optional conditions",defaultValue:{value:"[]",computed:!1}},onFieldChange:{required:!1,tsType:{name:"signature",type:"function",raw:`(change: {
  fieldId: string;
  value: unknown;
  formValues: Record<string, unknown>;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  fieldId: string;
  value: unknown;
  formValues: Record<string, unknown>;
}`,signature:{properties:[{key:"fieldId",value:{name:"string",required:!0}},{key:"value",value:{name:"unknown",required:!0}},{key:"formValues",value:{name:"Record",elements:[{name:"string"},{name:"unknown"}],raw:"Record<string, unknown>",required:!0}}]}},name:"change"}],return:{name:"void"}}},description:"Callback when any field value changes"},configPath:{required:!1,tsType:{name:"string"},description:"Config path for form configuration (schema-driven)"},repeatable:{required:!1,tsType:{name:"boolean"},description:"Whether the form supports repeatable entries"}},composes:["Omit"]};const rn={title:"Organisms/Form",component:k,parameters:{layout:"padded",backgrounds:{default:"wireframe"}},tags:["autodocs"]},L=[{name:"firstName",label:"First Name",type:"string",required:!0},{name:"lastName",label:"Last Name",type:"string",required:!0},{name:"email",label:"Email",type:"email",required:!0},{name:"age",label:"Age",type:"number"}],B={args:{fields:L,entity:"User",submitLabel:"Save User"}},q={args:{fields:L,entity:"User",initialData:{firstName:"John",lastName:"Doe",email:"john.doe@example.com",age:30},submitLabel:"Update User"}},U={args:{fields:L.slice(0,2),entity:"User",layout:"horizontal",gap:"lg"}},_a=[{name:"name",label:"Full Name",type:"string",required:!0},{name:"bio",label:"Biography",type:"textarea",max:500},{name:"birthDate",label:"Birth Date",type:"date"},{name:"salary",label:"Salary",type:"number"},{name:"isActive",label:"Active",type:"boolean"},{name:"role",label:"Role",type:"enum",values:["admin","editor","viewer"],required:!0}],G={args:{fields:_a,entity:"Employee",submitLabel:"Create Employee"}},M={args:{fields:L,entity:"User",isLoading:!0}},H={args:{fields:L,entity:"User",error:new Error("Failed to load user data. Please try again.")}},Da=[{name:"vehicleType",label:"Vehicle Type",type:"enum",values:["personal","commercial"],required:!0},{name:"licensePlate",label:"License Plate",type:"string",required:!0},{name:"commercialLicense",label:"Commercial License Number",type:"string"},{name:"fleetSize",label:"Fleet Size",type:"number"},{name:"weight",label:"Vehicle Weight (kg)",type:"number"},{name:"heavyVehiclePermit",label:"Heavy Vehicle Permit Number",type:"string"}],P={render:function(){const[n,o]=V.useState({vehicleType:"personal"});return e.jsxs(g,{gap:"md",className:"max-w-lg",children:[e.jsx(l,{variant:"h4",children:"Vehicle Registration"}),e.jsx(l,{variant:"body2",color:"muted",children:'Select "commercial" to see additional fields. Enter weight >= 3500 to see permit field.'}),e.jsx(k,{fields:Da,entity:"Vehicle",initialData:n,conditionalFields:{commercialLicense:["=","@entity.formValues.vehicleType","commercial"],fleetSize:["=","@entity.formValues.vehicleType","commercial"],heavyVehiclePermit:[">=","@entity.formValues.weight",3500]},onFieldChange:({formValues:d})=>o(d),submitLabel:"Register Vehicle"})]})}},ja=[{name:"inspectionLocation",label:"Inspection Location",type:"enum",values:["merchant_premises","inspector_office","private_premises","other"],required:!0},{name:"servesConsumers",label:"Business serves consumers",type:"enum",values:["yes","no"],required:!0},{name:"businessName",label:"Business Name",type:"string",required:!0}],Ra=[{variableName:"HG_INSPECTION_LOCATION",expression:"@entity.formValues.inspectionLocation",triggerFields:["inspectionLocation"]},{variableName:"HG_SERVES_CONSUMERS",expression:["=","@entity.formValues.servesConsumers","yes"],triggerFields:["servesConsumers"]}],W={render:function(){const[n,o]=V.useState([]),[d,y]=V.useState({}),S=re();return V.useEffect(()=>{const u=S.on("UI:GLOBAL_VARIABLE_SET",b=>{console.log("[HiddenCalculations] UI:GLOBAL_VARIABLE_SET",b),o(E=>[...E,{type:"GLOBAL_VARIABLE_SET",payload:b,time:new Date().toLocaleTimeString()}])}),p=S.on("UI:FIELD_CHANGED",b=>{console.log("[HiddenCalculations] UI:FIELD_CHANGED",b),o(E=>[...E,{type:"FIELD_CHANGED",payload:b,time:new Date().toLocaleTimeString()}])});return()=>{u(),p()}},[S]),e.jsxs(g,{gap:"md",className:"max-w-lg",children:[e.jsx(l,{variant:"h4",children:"Introduction Form (T-001)"}),e.jsx(l,{variant:"body2",color:"muted",children:"Hidden calculations set global variables when fields change. Change the fields below and watch the event log update."}),e.jsx(k,{fields:ja,entity:"InspectionForm",hiddenCalculations:Ra,evaluationContext:{formValues:d,globalVariables:{}},onFieldChange:({formValues:u})=>y(u),submitLabel:"Continue"}),e.jsx(I,{padding:"md",bg:"muted",rounded:"md",children:e.jsxs(g,{gap:"sm",children:[e.jsx(l,{variant:"label",weight:"bold",children:"Event Log:"}),n.length===0?e.jsx(l,{variant:"caption",color:"muted",children:"No events yet. Change a field to see events."}):e.jsx(g,{gap:"xs",className:"max-h-48 overflow-y-auto",children:n.slice(-10).reverse().map((u,p)=>e.jsxs(I,{padding:"xs",rounded:"sm",className:"bg-white text-xs font-mono",children:[e.jsxs(l,{variant:"caption",color:u.type==="GLOBAL_VARIABLE_SET"?"success":"muted",children:["[",u.time,"] ",u.type]}),e.jsx(l,{variant:"caption",className:"block text-gray-600",children:JSON.stringify(u.payload)})]},p))}),e.jsx("button",{onClick:()=>o([]),className:"text-xs text-blue-600 hover:underline self-start",children:"Clear log"})]})})]})}},Oa=[{name:"priceMarking",label:"2.8. Selected goods are marked with price",type:"enum",values:["marked","not_marked","partially_marked"],required:!0},{name:"violationNotes",label:"Violation Notes",type:"textarea"}],Ba=[{condition:["=","@entity.formValues.priceMarking","not_marked"],violation:{law:"ZVPOT-1",article:"14/1",actionType:"admin",message:"Goods must be marked with visible price tags"},fieldId:"priceMarking"},{condition:["=","@entity.formValues.priceMarking","partially_marked"],violation:{law:"ZVPOT-1",article:"14/1",actionType:"measure",message:"Some goods are missing price tags"},fieldId:"priceMarking"}],$={render:function(){const[n,o]=V.useState(null),[d,y]=V.useState({}),S=re();return V.useEffect(()=>{const u=S.on("UI:VIOLATION_DETECTED",p=>{const b=p;console.log("[ViolationTriggers] UI:VIOLATION_DETECTED",b),o(b)});return()=>u()},[S]),V.useEffect(()=>{(d.priceMarking==="marked"||!d.priceMarking)&&o(null)},[d.priceMarking]),e.jsxs(g,{gap:"md",className:"max-w-lg",children:[e.jsx(l,{variant:"h4",children:"Price Marking Inspection (T2-1)"}),e.jsx(l,{variant:"body2",color:"muted",children:'Select "not_marked" or "partially_marked" to trigger a violation.'}),n&&e.jsx(ne,{variant:n.actionType==="admin"?"error":"warning",children:e.jsxs(g,{gap:"xs",children:[e.jsxs(l,{variant:"body2",weight:"bold",children:[n.law," Art. ",n.article," (",n.actionType,")"]}),e.jsx(l,{variant:"body2",children:n.message})]})}),e.jsx(k,{fields:Oa,entity:"InspectionForm",violationTriggers:Ba,evaluationContext:{formValues:d,globalVariables:{}},conditionalFields:{violationNotes:["or",["=","@entity.formValues.priceMarking","not_marked"],["=","@entity.formValues.priceMarking","partially_marked"]]},onFieldChange:({formValues:u})=>y(u),submitLabel:"Save Findings"})]})}},qa=[{name:"inspectorName",label:"Inspector Name",type:"string",required:!0},{name:"inspectionDate",label:"Inspection Date",type:"date",required:!0},{name:"caseNumber",label:"Case Number",type:"string"}],Ua=[{name:"companyName",label:"Company Name",type:"string",required:!0},{name:"taxNumber",label:"Tax Number",type:"string",required:!0},{name:"address",label:"Address",type:"string"}],Ga=[{name:"businessType",label:"Business Type",type:"enum",values:["retail","wholesale","manufacturing","services"]},{name:"employeeCount",label:"Number of Employees",type:"number"}],Ma=[{id:"S-1",title:"Case Information",fields:qa,collapsible:!0},{id:"S-2",title:"Company Data",fields:Ua,collapsible:!0},{id:"S-3",title:"Business Details",fields:Ga,collapsible:!0,condition:["!=","@entity.formValues.companyName",""]}],z={render:function(){const[n,o]=V.useState({});return e.jsxs(g,{gap:"md",className:"max-w-lg",children:[e.jsx(l,{variant:"h4",children:"Inspection Introduction (T-001)"}),e.jsx(l,{variant:"body2",color:"muted",children:"Form with collapsible sections. Section 3 appears after entering company name."}),e.jsx(k,{entity:"InspectionForm",sections:Ma,initialData:n,evaluationContext:{formValues:n,globalVariables:{}},onFieldChange:({formValues:d})=>o(d),submitLabel:"Continue to Next Tab"})]})}},Ha=[{name:"inspectorId",label:"Inspector ID",type:"string",required:!0}],Pa=[{id:"S-1",title:"A. Case Data",collapsible:!0,fields:[{name:"A7",label:"A.7. Other inspectors participating",type:"enum",values:["yes","no"]},{name:"A8",label:"A.8. Inspector name",type:"string"},{name:"A9",label:"A.9. Inspection location",type:"enum",values:["merchant_premises","inspector_office","private_premises"],required:!0},{name:"A10",label:"A.10. Permission obtained",type:"enum",values:["yes","no"]}]},{id:"S-2",title:"B. Entity Data",collapsible:!0,fields:[{name:"B1",label:"B.1. Company Name",type:"string",required:!0},{name:"B2",label:"B.2. Tax ID",type:"string",required:!0},{name:"B3",label:"B.3. Address",type:"string"}]}],Wa=[{variableName:"HG_INSPECTION_LOCATION",expression:"@entity.formValues.A9",triggerFields:["A9"]}],J={render:function(){const[n,o]=V.useState({});return e.jsxs(g,{gap:"md",className:"max-w-2xl",children:[e.jsx(l,{variant:"h3",children:"T-001: Introduction"}),e.jsx(l,{variant:"body2",color:"muted",children:"Complete inspection form with sections, conditional fields, and hidden calculations."}),e.jsx(k,{entity:"InspectionForm",fields:Ha,sections:Pa,initialData:n,conditionalFields:{A8:["=","@entity.formValues.A7","yes"],A10:["=","@entity.formValues.A9","private_premises"]},hiddenCalculations:Wa,evaluationContext:{formValues:n,globalVariables:{}},onFieldChange:({formValues:d})=>o(d),submitLabel:"Complete Introduction",cancelLabel:"Save Draft",showCancel:!0})]})}},N={render:function(){const[n,o]=V.useState({HG_SERVES_CONSUMERS:!0,HG_SALES_LOCATION:"retail_store"}),d=[{name:"conductPriceCheck",label:"2.1. Conduct price marking inspection",type:"enum",values:["yes","no"]},{name:"findingsNotes",label:"Findings",type:"textarea"}];return e.jsxs(g,{gap:"md",className:"max-w-lg",children:[e.jsx(l,{variant:"h4",children:"Price Marking Section"}),e.jsx(l,{variant:"body2",color:"muted",children:"This section is only enabled when HG_SERVES_CONSUMERS is true. Toggle the checkbox to simulate cross-form dependency."}),e.jsx(I,{padding:"md",bg:"muted",rounded:"md",children:e.jsxs(g,{gap:"sm",children:[e.jsx(l,{variant:"label",weight:"bold",children:"Global Variables (from other tabs):"}),e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:n.HG_SERVES_CONSUMERS,onChange:y=>o(S=>({...S,HG_SERVES_CONSUMERS:y.target.checked}))}),e.jsx(l,{variant:"body2",children:"HG_SERVES_CONSUMERS"})]})]})}),n.HG_SERVES_CONSUMERS?e.jsx(k,{fields:d,entity:"InspectionForm",evaluationContext:{formValues:{},globalVariables:n},submitLabel:"Save Price Marking"}):e.jsx(ne,{variant:"warning",children:"Price marking inspection is not applicable when business does not serve consumers."})]})}};var he,fe,ve;B.parameters={...B.parameters,docs:{...(he=B.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    fields: basicFields,
    entity: 'User',
    submitLabel: 'Save User'
  }
}`,...(ve=(fe=B.parameters)==null?void 0:fe.docs)==null?void 0:ve.source}}};var Ve,Se,Te;q.parameters={...q.parameters,docs:{...(Ve=q.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    fields: basicFields,
    entity: 'User',
    initialData: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: 30
    },
    submitLabel: 'Update User'
  }
}`,...(Te=(Se=q.parameters)==null?void 0:Se.docs)==null?void 0:Te.source}}};var we,Ee,ke;U.parameters={...U.parameters,docs:{...(we=U.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    fields: basicFields.slice(0, 2),
    entity: 'User',
    layout: 'horizontal',
    gap: 'lg'
  }
}`,...(ke=(Ee=U.parameters)==null?void 0:Ee.docs)==null?void 0:ke.source}}};var Fe,Ce,Ie;G.parameters={...G.parameters,docs:{...(Fe=G.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    fields: mixedTypeFields,
    entity: 'Employee',
    submitLabel: 'Create Employee'
  }
}`,...(Ie=(Ce=G.parameters)==null?void 0:Ce.docs)==null?void 0:Ie.source}}};var xe,Ne,Le;M.parameters={...M.parameters,docs:{...(xe=M.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    fields: basicFields,
    entity: 'User',
    isLoading: true
  }
}`,...(Le=(Ne=M.parameters)==null?void 0:Ne.docs)==null?void 0:Le.source}}};var Ae,_e,De;H.parameters={...H.parameters,docs:{...(Ae=H.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    fields: basicFields,
    entity: 'User',
    error: new Error('Failed to load user data. Please try again.')
  }
}`,...(De=(_e=H.parameters)==null?void 0:_e.docs)==null?void 0:De.source}}};var je,Re,Oe;P.parameters={...P.parameters,docs:{...(je=P.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: function ConditionalFieldsDemo() {
    const [formValues, setFormValues] = useState<Record<string, unknown>>({
      vehicleType: 'personal'
    });
    return <VStack gap="md" className="max-w-lg">
        <Typography variant="h4">Vehicle Registration</Typography>
        <Typography variant="body2" color="muted">
          Select &quot;commercial&quot; to see additional fields. Enter weight &gt;= 3500 to see permit field.
        </Typography>
        <Form fields={vehicleFields} entity="Vehicle" initialData={formValues} conditionalFields={{
        commercialLicense: ['=', '@entity.formValues.vehicleType', 'commercial'],
        fleetSize: ['=', '@entity.formValues.vehicleType', 'commercial'],
        heavyVehiclePermit: ['>=', '@entity.formValues.weight', 3500]
      }} onFieldChange={({
        formValues: newValues
      }) => setFormValues(newValues)} submitLabel="Register Vehicle" />
      </VStack>;
  }
}`,...(Oe=(Re=P.parameters)==null?void 0:Re.docs)==null?void 0:Oe.source}}};var Be,qe,Ue;W.parameters={...W.parameters,docs:{...(Be=W.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  render: function HiddenCalculationsDemo() {
    const [events, setEvents] = useState<Array<{
      type: string;
      payload: unknown;
      time: string;
    }>>([]);
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    const eventBus = useEventBus();
    useEffect(() => {
      const unsubGlobal = eventBus.on('UI:GLOBAL_VARIABLE_SET', payload => {
        console.log('[HiddenCalculations] UI:GLOBAL_VARIABLE_SET', payload);
        setEvents(prev => [...prev, {
          type: 'GLOBAL_VARIABLE_SET',
          payload,
          time: new Date().toLocaleTimeString()
        }]);
      });
      const unsubField = eventBus.on('UI:FIELD_CHANGED', payload => {
        console.log('[HiddenCalculations] UI:FIELD_CHANGED', payload);
        setEvents(prev => [...prev, {
          type: 'FIELD_CHANGED',
          payload,
          time: new Date().toLocaleTimeString()
        }]);
      });
      return () => {
        unsubGlobal();
        unsubField();
      };
    }, [eventBus]);
    return <VStack gap="md" className="max-w-lg">
        <Typography variant="h4">Introduction Form (T-001)</Typography>
        <Typography variant="body2" color="muted">
          Hidden calculations set global variables when fields change.
          Change the fields below and watch the event log update.
        </Typography>
        <Form fields={inspectionFields} entity="InspectionForm" hiddenCalculations={hiddenCalculations} evaluationContext={{
        formValues,
        globalVariables: {}
      }} onFieldChange={({
        formValues: newValues
      }) => setFormValues(newValues)} submitLabel="Continue" />
        <Box padding="md" bg="muted" rounded="md">
          <VStack gap="sm">
            <Typography variant="label" weight="bold">Event Log:</Typography>
            {events.length === 0 ? <Typography variant="caption" color="muted">
                No events yet. Change a field to see events.
              </Typography> : <VStack gap="xs" className="max-h-48 overflow-y-auto">
                {events.slice(-10).reverse().map((event, i) => <Box key={i} padding="xs" rounded="sm" className="bg-white text-xs font-mono">
                    <Typography variant="caption" color={event.type === 'GLOBAL_VARIABLE_SET' ? 'success' : 'muted'}>
                      [{event.time}] {event.type}
                    </Typography>
                    <Typography variant="caption" className="block text-gray-600">
                      {JSON.stringify(event.payload)}
                    </Typography>
                  </Box>)}
              </VStack>}
            <button onClick={() => setEvents([])} className="text-xs text-blue-600 hover:underline self-start">
              Clear log
            </button>
          </VStack>
        </Box>
      </VStack>;
  }
}`,...(Ue=(qe=W.parameters)==null?void 0:qe.docs)==null?void 0:Ue.source}}};var Ge,Me,He;$.parameters={...$.parameters,docs:{...(Ge=$.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  render: function ViolationTriggersDemo() {
    const [currentViolation, setCurrentViolation] = useState<{
      law: string;
      article: string;
      actionType: string;
      message: string;
    } | null>(null);
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    const eventBus = useEventBus();
    useEffect(() => {
      const unsub = eventBus.on('UI:VIOLATION_DETECTED', payload => {
        const violation = payload as {
          law: string;
          article: string;
          actionType: string;
          message: string;
        };
        console.log('[ViolationTriggers] UI:VIOLATION_DETECTED', violation);
        setCurrentViolation(violation);
      });
      return () => unsub();
    }, [eventBus]);

    // Clear violation when user selects compliant option
    useEffect(() => {
      if (formValues.priceMarking === 'marked' || !formValues.priceMarking) {
        setCurrentViolation(null);
      }
    }, [formValues.priceMarking]);
    return <VStack gap="md" className="max-w-lg">
        <Typography variant="h4">Price Marking Inspection (T2-1)</Typography>
        <Typography variant="body2" color="muted">
          Select &quot;not_marked&quot; or &quot;partially_marked&quot; to trigger a violation.
        </Typography>
        {currentViolation && <Alert variant={currentViolation.actionType === 'admin' ? 'error' : 'warning'}>
            <VStack gap="xs">
              <Typography variant="body2" weight="bold">
                {currentViolation.law} Art. {currentViolation.article} ({currentViolation.actionType})
              </Typography>
              <Typography variant="body2">{currentViolation.message}</Typography>
            </VStack>
          </Alert>}
        <Form fields={priceMarkingFields} entity="InspectionForm" violationTriggers={violationTriggers} evaluationContext={{
        formValues,
        globalVariables: {}
      }} conditionalFields={{
        violationNotes: ['or', ['=', '@entity.formValues.priceMarking', 'not_marked'], ['=', '@entity.formValues.priceMarking', 'partially_marked']]
      }} onFieldChange={({
        formValues: newValues
      }) => setFormValues(newValues)} submitLabel="Save Findings" />
      </VStack>;
  }
}`,...(He=(Me=$.parameters)==null?void 0:Me.docs)==null?void 0:He.source}}};var Pe,We,$e;z.parameters={...z.parameters,docs:{...(Pe=z.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: function SectionsDemo() {
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    return <VStack gap="md" className="max-w-lg">
        <Typography variant="h4">Inspection Introduction (T-001)</Typography>
        <Typography variant="body2" color="muted">
          Form with collapsible sections. Section 3 appears after entering company name.
        </Typography>
        <Form entity="InspectionForm" sections={formSections} initialData={formValues} evaluationContext={{
        formValues,
        globalVariables: {}
      }} onFieldChange={({
        formValues: newValues
      }) => setFormValues(newValues)} submitLabel="Continue to Next Tab" />
      </VStack>;
  }
}`,...($e=(We=z.parameters)==null?void 0:We.docs)==null?void 0:$e.source}}};var ze,Je,Ze;J.parameters={...J.parameters,docs:{...(ze=J.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  render: function CompleteInspectionDemo() {
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    return <VStack gap="md" className="max-w-2xl">
        <Typography variant="h3">T-001: Introduction</Typography>
        <Typography variant="body2" color="muted">
          Complete inspection form with sections, conditional fields, and hidden calculations.
        </Typography>
        <Form entity="InspectionForm" fields={completeInspectionFields} sections={completeInspectionSections} initialData={formValues} conditionalFields={{
        A8: ['=', '@entity.formValues.A7', 'yes'],
        A10: ['=', '@entity.formValues.A9', 'private_premises']
      }} hiddenCalculations={completeHiddenCalcs} evaluationContext={{
        formValues,
        globalVariables: {}
      }} onFieldChange={({
        formValues: newValues
      }) => setFormValues(newValues)} submitLabel="Complete Introduction" cancelLabel="Save Draft" showCancel />
      </VStack>;
  }
}`,...(Ze=(Je=J.parameters)==null?void 0:Je.docs)==null?void 0:Ze.source}}};var Ke,Qe,Xe,Ye,ea;N.parameters={...N.parameters,docs:{...(Ke=N.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  render: function GlobalVariablesDemo() {
    const [globalVars, setGlobalVars] = useState({
      HG_SERVES_CONSUMERS: true,
      HG_SALES_LOCATION: 'retail_store'
    });
    const priceFields: SchemaField[] = [{
      name: 'conductPriceCheck',
      label: '2.1. Conduct price marking inspection',
      type: 'enum',
      values: ['yes', 'no']
    }, {
      name: 'findingsNotes',
      label: 'Findings',
      type: 'textarea'
    }];
    return <VStack gap="md" className="max-w-lg">
        <Typography variant="h4">Price Marking Section</Typography>
        <Typography variant="body2" color="muted">
          This section is only enabled when HG_SERVES_CONSUMERS is true.
          Toggle the checkbox to simulate cross-form dependency.
        </Typography>

        <Box padding="md" bg="muted" rounded="md">
          <VStack gap="sm">
            <Typography variant="label" weight="bold">Global Variables (from other tabs):</Typography>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={globalVars.HG_SERVES_CONSUMERS} onChange={e => setGlobalVars(prev => ({
              ...prev,
              HG_SERVES_CONSUMERS: e.target.checked
            }))} />
              <Typography variant="body2">HG_SERVES_CONSUMERS</Typography>
            </label>
          </VStack>
        </Box>

        {!globalVars.HG_SERVES_CONSUMERS ? <Alert variant="warning">
            Price marking inspection is not applicable when business does not serve consumers.
          </Alert> : <Form fields={priceFields} entity="InspectionForm" evaluationContext={{
        formValues: {},
        globalVariables: globalVars
      }} submitLabel="Save Price Marking" />}
      </VStack>;
  }
}`,...(Xe=(Qe=N.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.source},description:{story:"Cross-form dependencies using global variables",...(ea=(Ye=N.parameters)==null?void 0:Ye.docs)==null?void 0:ea.description}}};const on=["Default","WithInitialData","HorizontalLayout","MixedFieldTypes","Loading","WithError","WithConditionalFields","WithHiddenCalculations","WithViolationTriggers","WithSections","CompleteInspectionForm","WithGlobalVariables"];export{J as CompleteInspectionForm,B as Default,U as HorizontalLayout,M as Loading,G as MixedFieldTypes,P as WithConditionalFields,H as WithError,N as WithGlobalVariables,W as WithHiddenCalculations,q as WithInitialData,z as WithSections,$ as WithViolationTriggers,on as __namedExportsOrder,rn as default};
