import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as y}from"./index-GiUgBvb1.js";import{c as G}from"./cn-BNf5BS2b.js";import{B as m}from"./Box-DYJzRMmP.js";import{V as l,H as c}from"./Stack-DhhoTPuC.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{B as N}from"./Button-Dn0472P0.js";import{C as b}from"./Card-BNT5PrJ5.js";import{B as D}from"./Badge-CpH0PNM6.js";import{u as ge}from"./useEventBus-BNZMNlv8.js";import{P as $n}from"./PhaseIndicator-C0AecDcg.js";import{P as Gn}from"./ProgressHeader-XH4m8y3t.js";import{C as Hn}from"./ComplianceSummary-BfQt8vR7.js";import{R as Zn}from"./RuleCheckItem-8kPQH8_a.js";import{I as Kn}from"./Input-DhFss4oc.js";import{S as Wn}from"./Spinner-vF2DJrH5.js";import{F as Y}from"./file-text-DZQctV9o.js";import{U as Ie}from"./user-BePscFH1.js";import{B as Yn}from"./building-2-DIDfNmjr.js";import{X as Xn}from"./x-prXd1WI5.js";import{S as Jn}from"./search-CCKipEn6.js";import{P as wn}from"./plus-jSzJaRn3.js";import{P as Qn}from"./ParticipantList-ES05Thsf.js";import{C as Un}from"./CardSelector-DueahrGa.js";import{F as es,R as ve}from"./RepeatableFormSection-ASpLAe2Q.js";import{T as ns}from"./Textarea-C8Aqv8YN.js";import{S as ss}from"./Select-CVuTODQb.js";import{A as ke}from"./alert-circle-CBFh8Gcj.js";import{C as Cn}from"./clock-DT9ve7xf.js";import{E as ts}from"./external-link-k_e-i1vS.js";import{c as Nn}from"./createLucideIcon-CbHznvEr.js";import{D as rs}from"./download-yLSRVNFt.js";import{C as as}from"./calendar-rGtwHcH_.js";import{E as is}from"./eye-DPfPdwVp.js";import{I as ls}from"./InspectionTimeline-DLPkAkh1.js";import{F as cs}from"./FloatingActionMenu-CEFCFkiv.js";import{S as Re}from"./SignatureCapture-BHXeJCrh.js";import{B as os}from"./briefcase-B0KIfOaN.js";import{C as ds}from"./clipboard-check-BbncMYkH.js";import{P as ms}from"./pen-tool-LaElpXis.js";import{C as W}from"./check-circle-DX_bNA1C.js";import{A as ps}from"./arrow-left-CMPuXvFr.js";import{S as us}from"./save-DyJeJ3Zl.js";import{A as hs}from"./arrow-right-BdVPe8wH.js";import{U as gs}from"./user-plus-BlQDsowZ.js";import{C as xs}from"./camera-Cr6IZ-wx.js";import{P as fs}from"./play-C6U2eifx.js";import{P as bs}from"./pause-BGY7Ki7b.js";import{A as ye}from"./alert-triangle-BLuUOBNm.js";import{S as js}from"./scale-UkxLwacR.js";import"./loader-2-DXp1ic5P.js";import"./flag-CJoo5uXG.js";import"./clipboard-list-C9RrCyxf.js";import"./ProgressBar-ZQR7fgL2.js";import"./circle-CzFdAxtK.js";import"./x-circle-CCPeOM9T.js";import"./trending-up-D7By3kN5.js";import"./trending-down-Dv2LyMoL.js";import"./LawReferenceBadge-Bl_8g4lT.js";import"./check-DliVttWt.js";import"./chevron-down-BQmz_Bpa.js";import"./Avatar-CJtPgGUU.js";import"./phone-XSC4O3No.js";import"./square-pen-D7sL1yO_.js";import"./trash-2-ChlfdFMf.js";import"./message-square-CSwv56un.js";import"./pen-DNARvM59.js";import"./rotate-ccw-cyxkXXLc.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vs=Nn("FilePlus",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M9 15h6",key:"cctwl0"}],["path",{d:"M12 18v-6",key:"17g6i2"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ys=Nn("Printer",[["polyline",{points:"6 9 6 2 18 2 18 9",key:"1306q4"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["rect",{width:"12",height:"8",x:"6",y:"14",key:"5ipwut"}]]),Is={Company:Yn,Inspector:Ie,Document:Y},ue=({entity:t,label:g,placeholder:I="Search...",selectedItem:x,items:B=[],results:M,isLoading:T=!1,allowCreate:w=!0,createLabel:i="Create New",required:S=!1,disabled:P=!1,className:F,onSelect:d,onSearch:k,onCreate:A,onCreateNew:o})=>{const C=ge(),[_,E]=y.useState(""),[K,v]=y.useState(!1),$=y.useRef(null),H=B.length>0?B:M??[],X=(t?Is[t]:void 0)||Y;y.useEffect(()=>{const f=je=>{$.current&&!$.current.contains(je.target)&&v(!1)};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]);const J=y.useCallback(f=>{E(f),v(!0),k==null||k(f),C.emit("UI:SEARCH",{entity:t,searchTerm:f})},[t,k,C]),xe=y.useCallback(f=>{d==null||d(f),C.emit("UI:ENTITY_SELECTED",{entity:t,item:f}),E(""),v(!1)},[t,d,C]),fe=y.useCallback(()=>{d==null||d(null),E("")},[d]),be=y.useCallback(()=>{A==null||A(),o==null||o(),C.emit("UI:CREATE_NEW",{entity:t}),v(!1)},[t,A,o,C]);return x?e.jsxs(l,{gap:"xs",className:G("w-full",F),children:[g&&e.jsxs(r,{variant:"label",className:"text-neutral-700",children:[g,S&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx(b,{className:"p-3",children:e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(m,{rounded:"lg",padding:"sm",className:"bg-blue-50 text-blue-600",children:e.jsx(X,{className:"h-5 w-5"})}),e.jsxs(l,{gap:"none",children:[e.jsx(r,{variant:"body",className:"font-medium",children:x.name||x.label}),(x.subtitle||x.sublabel)&&e.jsx(r,{variant:"small",className:"text-neutral-500",children:x.subtitle||x.sublabel})]})]}),!P&&e.jsx(N,{variant:"ghost",size:"sm",onClick:fe,className:"text-neutral-400 hover:text-neutral-600",children:e.jsx(Xn,{className:"h-4 w-4"})})]})})]}):e.jsx(m,{ref:$,className:G("w-full relative",F),children:e.jsxs(l,{gap:"xs",children:[g&&e.jsxs(r,{variant:"label",className:"text-neutral-700",children:[g,S&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx(Kn,{type:"text",value:_,onChange:f=>J(f.target.value),onFocus:()=>v(!0),placeholder:I,disabled:P,leftIcon:e.jsx(Jn,{className:"h-4 w-4 text-neutral-400"}),className:"w-full"}),K&&!P&&e.jsx(b,{className:"absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto shadow-lg",children:e.jsxs(l,{gap:"none",children:[T?e.jsx(m,{padding:"md",className:"flex justify-center",children:e.jsx(Wn,{size:"sm"})}):H.length>0?H.map(f=>e.jsx("button",{type:"button",onClick:()=>xe(f),className:"w-full p-3 text-left hover:bg-neutral-50 transition-colors border-b last:border-b-0",children:e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(X,{className:"h-4 w-4 text-neutral-400"}),e.jsxs(l,{gap:"none",children:[e.jsx(r,{variant:"body",className:"font-medium",children:f.name||f.label}),(f.subtitle||f.sublabel)&&e.jsx(r,{variant:"small",className:"text-neutral-500",children:f.subtitle||f.sublabel})]})]})},f.id)):_?e.jsx(m,{padding:"md",className:"text-center",children:e.jsx(r,{variant:"small",className:"text-neutral-500",children:"No results found"})}):null,w&&e.jsx("button",{type:"button",onClick:be,className:"w-full p-3 text-left hover:bg-blue-50 transition-colors border-t",children:e.jsxs(c,{gap:"sm",align:"center",className:"text-blue-600",children:[e.jsx(wn,{className:"h-4 w-4"}),e.jsxs(r,{variant:"body",className:"font-medium",children:[i," ",t]})]})})]})})]})})};ue.displayName="EntitySearch";ue.__docgenInfo={description:"",methods:[],displayName:"EntitySearch",props:{entity:{required:!1,tsType:{name:"string"},description:"Entity type being searched"},label:{required:!1,tsType:{name:"string"},description:"Label for the field"},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text",defaultValue:{value:'"Search..."',computed:!1}},selectedItem:{required:!1,tsType:{name:"union",raw:"EntitySearchItem | null",elements:[{name:"EntitySearchItem"},{name:"null"}]},description:"Currently selected item"},selectedId:{required:!1,tsType:{name:"string"},description:"Currently selected ID (alternative to selectedItem)"},items:{required:!1,tsType:{name:"Array",elements:[{name:"EntitySearchItem"}],raw:"EntitySearchItem[]"},description:"Search results",defaultValue:{value:"[]",computed:!1}},results:{required:!1,tsType:{name:"Array",elements:[{name:"EntitySearchItem"}],raw:"EntitySearchItem[]"},description:"Search results (alias for items)"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},allowCreate:{required:!1,tsType:{name:"boolean"},description:"Allow creating new entities",defaultValue:{value:"true",computed:!1}},createLabel:{required:!1,tsType:{name:"string"},description:"Create button label",defaultValue:{value:'"Create New"',computed:!1}},required:{required:!1,tsType:{name:"boolean"},description:"Required field",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disabled state",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: EntitySearchItem | null) => void",signature:{arguments:[{type:{name:"union",raw:"EntitySearchItem | null",elements:[{name:"EntitySearchItem"},{name:"null"}]},name:"item"}],return:{name:"void"}}},description:"Selection change handler"},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(term: string) => void",signature:{arguments:[{type:{name:"string"},name:"term"}],return:{name:"void"}}},description:"Search handler"},onCreate:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Create handler"},onCreateNew:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Create new handler (alias for onCreate)"}}};const we=({objections:t=[],participants:g=[],inspectionId:I,readOnly:x=!1,className:B,onSubmit:M})=>{const T=ge(),[w,i]=y.useState(!1),[S,P]=y.useState(""),[F,d]=y.useState(""),k=y.useCallback(()=>{if(!S||!F.trim())return;const o={participantId:S,text:F.trim()};M==null||M(o),T.emit("UI:OBJECTION_SUBMITTED",{objection:o,inspectionId:I}),P(""),d(""),i(!1)},[S,F,I,M,T]),A=y.useCallback(()=>{P(""),d(""),i(!1)},[]);return e.jsxs(l,{gap:"md",className:G("w-full",B),children:[e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(ke,{className:"h-5 w-5 text-amber-500"}),e.jsx(r,{variant:"h4",className:"text-neutral-800",children:"Objections"}),t.length>0&&e.jsx(D,{variant:"warning",children:t.length})]}),!x&&!w&&e.jsxs(N,{variant:"secondary",size:"sm",onClick:()=>i(!0),className:"gap-1",children:[e.jsx(wn,{className:"h-4 w-4"}),"Record Objection"]})]}),w&&e.jsx(b,{className:"p-4 border-amber-200 bg-amber-50",children:e.jsxs(l,{gap:"md",children:[e.jsx(r,{variant:"body",className:"font-medium text-amber-800",children:"Record New Objection"}),e.jsxs(l,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-700",children:"Participant"}),e.jsx(ss,{value:S,onChange:o=>P(o.target.value),className:"w-full",placeholder:"Select participant...",options:g.map(o=>({value:o.id,label:o.name}))})]}),e.jsxs(l,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-700",children:"Objection Details"}),e.jsx(ns,{value:F,onChange:o=>d(o.target.value),placeholder:"Describe the objection or concern...",rows:3,className:"w-full"})]}),e.jsxs(c,{gap:"sm",justify:"end",children:[e.jsx(N,{variant:"secondary",size:"sm",onClick:A,children:"Cancel"}),e.jsx(N,{variant:"primary",size:"sm",onClick:k,disabled:!S||!F.trim(),children:"Record Objection"})]})]})}),t.length===0&&!w?e.jsx(b,{className:"p-6",children:e.jsxs(l,{align:"center",gap:"sm",className:"text-neutral-400",children:[e.jsx(ke,{className:"h-8 w-8"}),e.jsx(r,{variant:"body",children:"No objections recorded"}),e.jsx(r,{variant:"small",children:"Objections will be documented in the final report"})]})}):e.jsx(l,{gap:"sm",children:t.map(o=>e.jsx(b,{className:"p-4 border-amber-100",children:e.jsxs(l,{gap:"sm",children:[e.jsxs(c,{justify:"between",align:"start",children:[e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(Ie,{className:"h-4 w-4 text-neutral-500"}),e.jsx(r,{variant:"body",className:"font-medium",children:o.participantName})]}),e.jsxs(c,{gap:"xs",align:"center",className:"text-neutral-500",children:[e.jsx(Cn,{className:"h-3 w-3"}),e.jsx(r,{variant:"small",children:new Date(o.timestamp).toLocaleString()})]})]}),e.jsx(r,{variant:"body",className:"text-neutral-700",children:o.text})]})},o.id))})]})};we.displayName="ObjectionRecorder";we.__docgenInfo={description:"",methods:[],displayName:"ObjectionRecorder",props:{objections:{required:!1,tsType:{name:"Array",elements:[{name:"Objection"}],raw:"Objection[]"},description:"Existing objections",defaultValue:{value:"[]",computed:!1}},participants:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ id: string; name: string }",signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}}]}}],raw:"Array<{ id: string; name: string }>"},description:"Available participants",defaultValue:{value:"[]",computed:!1}},inspectionId:{required:!1,tsType:{name:"string"},description:"Inspection ID"},readOnly:{required:!1,tsType:{name:"boolean"},description:"Read-only mode",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  objectionOrSectionRef: { participantId: string; text: string } | string,
  text?: string,
) => void`,signature:{arguments:[{type:{name:"union",raw:"{ participantId: string; text: string } | string",elements:[{name:"signature",type:"object",raw:"{ participantId: string; text: string }",signature:{properties:[{key:"participantId",value:{name:"string",required:!0}},{key:"text",value:{name:"string",required:!0}}]}},{name:"string"}]},name:"objectionOrSectionRef"},{type:{name:"string"},name:"text"}],return:{name:"void"}}},description:"Objection submitted handler - can receive objection object or sectionRef + text"}}};const ws={draft:{color:"warning",label:"Draft"},final:{color:"success",label:"Final"},signed:{color:"primary",label:"Signed"},archived:{color:"neutral",label:"Archived"}},he=({id:t,title:g,type:I="PDF",previewUrl:x,downloadUrl:B,status:M="draft",createdAt:T,createdBy:w,fileSize:i,showPreview:S=!1,previewHeight:P="400px",className:F,onDownload:d,onPrint:k,onView:A})=>{const o=ge(),C=ws[M],_=y.useCallback(()=>{if(d==null||d(),o.emit("UI:DOWNLOAD",{documentId:t,format:I}),B){const v=document.createElement("a");v.href=B,v.download=`${g}.${I.toLowerCase()}`,document.body.appendChild(v),v.click(),document.body.removeChild(v)}},[t,g,I,B,d,o]),E=y.useCallback(()=>{if(k==null||k(),o.emit("UI:PRINT",{documentId:t}),x){const v=window.open(x,"_blank");v&&(v.onload=()=>{v.print()})}},[t,x,k,o]),K=y.useCallback(()=>{A==null||A(),x&&window.open(x,"_blank")},[x,A]);return e.jsx(b,{className:G("overflow-hidden",F),children:e.jsxs(l,{gap:"none",children:[e.jsx(m,{padding:"md",className:"border-b",children:e.jsxs(c,{justify:"between",align:"start",children:[e.jsxs(c,{gap:"sm",align:"start",children:[e.jsx(m,{rounded:"lg",padding:"sm",className:"bg-red-50 text-red-600",children:e.jsx(Y,{className:"h-6 w-6"})}),e.jsxs(l,{gap:"xs",children:[e.jsx(r,{variant:"body",className:"font-medium text-neutral-800",children:g}),e.jsxs(c,{gap:"sm",wrap:!0,children:[e.jsx(D,{variant:"default",children:I}),e.jsx(D,{variant:C.color,children:C.label}),i&&e.jsx(r,{variant:"small",className:"text-neutral-500",children:i})]})]})]}),e.jsxs(c,{gap:"xs",children:[x&&e.jsx(N,{variant:"ghost",size:"sm",onClick:K,className:"gap-1",children:e.jsx(ts,{className:"h-4 w-4"})}),e.jsx(N,{variant:"ghost",size:"sm",onClick:E,className:"gap-1",children:e.jsx(ys,{className:"h-4 w-4"})}),e.jsxs(N,{variant:"secondary",size:"sm",onClick:_,className:"gap-1",children:[e.jsx(rs,{className:"h-4 w-4"}),"Download"]})]})]})}),(T||w)&&e.jsx(m,{padding:"sm",className:"bg-neutral-50 border-b",children:e.jsxs(c,{gap:"md",wrap:!0,children:[T&&e.jsxs(c,{gap:"xs",align:"center",className:"text-neutral-500",children:[e.jsx(as,{className:"h-3 w-3"}),e.jsx(r,{variant:"small",children:new Date(T).toLocaleDateString()})]}),w&&e.jsxs(c,{gap:"xs",align:"center",className:"text-neutral-500",children:[e.jsx(Ie,{className:"h-3 w-3"}),e.jsx(r,{variant:"small",children:w})]})]})}),S&&x?e.jsx(m,{style:{height:P},children:e.jsx("iframe",{src:x,className:"w-full h-full border-0",title:`Preview of ${g}`})}):S?e.jsx(m,{padding:"xl",className:"bg-neutral-50 flex items-center justify-center",style:{height:P},children:e.jsxs(l,{align:"center",gap:"sm",className:"text-neutral-400",children:[e.jsx(is,{className:"h-12 w-12"}),e.jsx(r,{variant:"body",children:"Preview not available"}),e.jsx(N,{variant:"secondary",size:"sm",onClick:_,children:"Download to view"})]})}):null]})})};he.displayName="DocumentPreview";he.__docgenInfo={description:"",methods:[],displayName:"DocumentPreview",props:{id:{required:!1,tsType:{name:"string"},description:"Document ID"},title:{required:!0,tsType:{name:"string"},description:"Document title"},subtitle:{required:!1,tsType:{name:"string"},description:"Document subtitle"},type:{required:!1,tsType:{name:"string"},description:"Document type",defaultValue:{value:'"PDF"',computed:!1}},isReadOnly:{required:!1,tsType:{name:"boolean"},description:"Read-only mode"},previewUrl:{required:!1,tsType:{name:"string"},description:"Preview URL"},downloadUrl:{required:!1,tsType:{name:"string"},description:"Download URL"},status:{required:!1,tsType:{name:"union",raw:'"draft" | "final" | "signed" | "archived"',elements:[{name:"literal",value:'"draft"'},{name:"literal",value:'"final"'},{name:"literal",value:'"signed"'},{name:"literal",value:'"archived"'}]},description:"Document status",defaultValue:{value:'"draft"',computed:!1}},createdAt:{required:!1,tsType:{name:"string"},description:"Created date"},createdBy:{required:!1,tsType:{name:"string"},description:"Created by"},fileSize:{required:!1,tsType:{name:"string"},description:"File size"},showPreview:{required:!1,tsType:{name:"boolean"},description:"Show inline preview",defaultValue:{value:"false",computed:!1}},previewHeight:{required:!1,tsType:{name:"string"},description:"Preview height",defaultValue:{value:'"400px"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onDownload:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Download handler"},onPrint:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Print handler"},onView:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"View handler"}}};const L=[{id:"introduction",label:"Introduction",icon:os,steps:[{id:"case-info",label:"Case Info",documentSection:"1. SPLOŠNI PODATKI"},{id:"company-data",label:"Company Data",documentSection:"2. PODATKI O ZAVEZANCU"},{id:"participants",label:"Participants",documentSection:"3. PRISOTNE OSEBE"},{id:"field-selection",label:"Field Selection",documentSection:"4. PREDMET PREGLEDA"}]},{id:"content",label:"Inspection",icon:ds,steps:[{id:"rule-checking",label:"Rule Checking",documentSection:"5. UGOTOVITVE PRI PREGLEDU"}]},{id:"preparation",label:"Preparation",icon:Y,steps:[{id:"findings",label:"Findings",documentSection:"6. UGOTOVITVE"},{id:"decisions",label:"Decisions",documentSection:"7. ODLOČBE IN UKREPI"}]},{id:"record",label:"Record",icon:es,steps:[{id:"document-generation",label:"Generate Document"},{id:"merchant-review",label:"Merchant Review"},{id:"objections",label:"Objections",documentSection:"9. PRIPOMBE ZAVEZANCA"}]},{id:"closing",label:"Closing",icon:ms,steps:[{id:"end-time",label:"End Time",documentSection:"10. ZAKLJUČEK"},{id:"signatures",label:"Signatures"},{id:"complete",label:"Complete"}]}];function Ee(t){for(const g of L)if(g.steps.some(I=>I.id===t))return g.id;return"introduction"}function Q(t){let g=0;for(const I of L)for(const x of I.steps){if(x.id===t)return g;g++}return 0}function Cs(){return L.flatMap(t=>t.steps.map(g=>g.id))}function Ae(t){return{introduction:"preparation",content:"execution",preparation:"documentation",record:"review",closing:"completed"}[t]}const Ce=({data:t,availableInspectors:g=[],availableFields:I=[],companySearchResults:x=[],isSearchingCompany:B=!1,className:M,onPhaseChange:T,onStepChange:w,onDataUpdate:i,onCompanySearch:S,onSaveDraft:P,onComplete:F})=>{var Ne,Te,Se,Pe;const d=ge(),[k,A]=y.useState(!1),{currentPhase:o,currentStep:C}=t,_=Cs(),E=Q(C),K=E===0,v=E===_.length-1,$=t.rules.length,H=Object.keys(t.ruleChecks).length,X=Object.values(t.ruleChecks).filter(s=>s.answer==="compliant").length,J=Object.values(t.ruleChecks).filter(s=>s.answer==="non-compliant").length,xe=$-H,fe={total:$,compliant:X,nonCompliant:J,notChecked:xe,critical:Object.values(t.ruleChecks).filter(s=>{var n;return s.answer==="non-compliant"&&((n=t.rules.find(a=>a.id===s.ruleId))==null?void 0:n.severity)==="critical"}).length,major:Object.values(t.ruleChecks).filter(s=>{var n;return s.answer==="non-compliant"&&((n=t.rules.find(a=>a.id===s.ruleId))==null?void 0:n.severity)==="major"}).length,minor:Object.values(t.ruleChecks).filter(s=>{var n;return s.answer==="non-compliant"&&((n=t.rules.find(a=>a.id===s.ruleId))==null?void 0:n.severity)==="minor"}).length},be=_.map((s,n)=>{var a;return{id:s,label:((a=L.flatMap(u=>u.steps).find(u=>u.id===s))==null?void 0:a.label)||s,completed:n<E,current:s===C}}),f=()=>{if(K)return;const s=_[E-1],n=Ee(s);n!==o&&(T==null||T(n)),w==null||w(s),d.emit("UI:STEP_BACK",{step:s,phase:n})},je=()=>{if(v){F==null||F(),d.emit("UI:INSPECTION_COMPLETE",{inspectionId:t.id});return}const s=_[E+1],n=Ee(s);n!==o&&(T==null||T(n)),w==null||w(s),d.emit("UI:STEP_NEXT",{step:s,phase:n})},Tn=()=>{P==null||P(),d.emit("UI:SAVE_DRAFT",{inspectionId:t.id,currentStep:C})},Sn=[{id:"add-participant",label:"Add Participant",icon:gs},{id:"collect-document",label:"Collect Document",icon:vs},{id:"take-photo",label:"Take Photo",icon:xs},{id:"pause",label:k?"Resume":"Pause",icon:k?fs:bs},{id:"sos",label:"SOS Exception",icon:ye,color:"text-red-600",bgColor:"bg-red-100"}],Pn=()=>{var s;return e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Case Information"}),e.jsx(b,{className:"p-4",children:e.jsxs(l,{gap:"md",align:"stretch",children:[e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Case Number"}),e.jsx(r,{variant:"h4",children:t.caseNumber||"Auto-generated"})]}),e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Inspector"}),e.jsx(ue,{label:"Select Inspector",placeholder:"Search inspectors...",results:g.map(n=>({id:n.id,label:`${n.name} ${n.surname}`,sublabel:`${n.department} - ${n.badgeNumber}`})),selectedId:(s=t.inspector)==null?void 0:s.id,onSearch:n=>d.emit("UI:SEARCH_INSPECTOR",{query:n}),onSelect:n=>{n&&(i==null||i({inspector:g.find(a=>a.id===n.id)}))},allowCreate:!1})]}),e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Start Date/Time"}),e.jsx("input",{type:"datetime-local",className:"w-full p-2 border rounded",value:t.startDateTime||"",onChange:n=>i==null?void 0:i({startDateTime:n.target.value})})]}),e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Accompanying Persons"}),e.jsx(ve,{sectionType:"accompanying-persons",title:"Accompanying Persons",items:t.accompanyingPersons.map(n=>({id:n.id,data:n})),renderItem:n=>{const a=n.data;return e.jsxs(c,{gap:"md",className:"flex-1",children:[e.jsx(r,{children:a==null?void 0:a.name}),e.jsx(D,{variant:"default",children:a==null?void 0:a.organization}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:a==null?void 0:a.role})]})},renderForm:n=>e.jsxs(l,{gap:"sm",align:"stretch",children:[e.jsx("input",{type:"text",placeholder:"Name",className:"p-2 border rounded",id:"acc-name"}),e.jsx("input",{type:"text",placeholder:"Organization",className:"p-2 border rounded",id:"acc-org"}),e.jsx("input",{type:"text",placeholder:"Role",className:"p-2 border rounded",id:"acc-role"}),e.jsx(N,{variant:"primary",size:"sm",onClick:()=>{var Z,V,Fe;const a=(Z=document.getElementById("acc-name"))==null?void 0:Z.value,u=(V=document.getElementById("acc-org"))==null?void 0:V.value,j=(Fe=document.getElementById("acc-role"))==null?void 0:Fe.value;a&&u&&n({name:a,organization:u,role:j})},children:"Add Person"})]}),onAdd:n=>{const a=n,u={id:`acc-${Date.now()}`,name:String((a==null?void 0:a.name)??""),organization:String((a==null?void 0:a.organization)??""),role:String((a==null?void 0:a.role)??"")};i==null||i({accompanyingPersons:[...t.accompanyingPersons,u]})},onRemove:n=>{i==null||i({accompanyingPersons:t.accompanyingPersons.filter(a=>a.id!==n)})}})]})]})})]})},Fn=()=>{var s;return e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Company Data"}),e.jsx(b,{className:"p-4",children:e.jsxs(l,{gap:"md",align:"stretch",children:[e.jsx(ue,{label:"Search Company",placeholder:"Search by name or registration number...",results:x,isLoading:B,selectedId:(s=t.company)==null?void 0:s.id,onSearch:n=>S==null?void 0:S(n),onSelect:n=>n&&d.emit("UI:COMPANY_SELECTED",{companyId:n.id}),onCreateNew:()=>d.emit("UI:CREATE_NEW_COMPANY",{}),allowCreate:!0,createLabel:"Create New Company"}),t.company&&e.jsx(b,{className:"p-4 bg-blue-50 border-blue-200",children:e.jsxs(l,{gap:"sm",align:"stretch",children:[e.jsxs(c,{justify:"between",children:[e.jsx(r,{variant:"h4",children:t.company.name}),e.jsx(D,{variant:"primary",children:"Selected"})]}),e.jsxs(r,{variant:"small",className:"text-neutral-600",children:["Legal Name: ",t.company.legalName]}),e.jsxs(c,{gap:"lg",children:[e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Registration #"}),e.jsx(r,{children:t.company.registrationNumber})]}),e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Tax ID"}),e.jsx(r,{children:t.company.taxNumber})]})]}),e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Address"}),e.jsxs(r,{children:[t.company.address.street,","," ",t.company.address.postalCode," ",t.company.address.city]})]})]})})]})})]})},kn=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Participants"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"At least one company representative must be present during the inspection."}),e.jsx(b,{className:"p-4",children:e.jsx(Qn,{participants:t.participants,onAdd:s=>{const n={...s,id:`part-${Date.now()}`};i==null||i({participants:[...t.participants,n]})},onRemove:s=>{t.participants.length>1&&(i==null||i({participants:t.participants.filter(n=>n.id!==s)}))},minParticipants:1})}),t.participants.length===0&&e.jsx(b,{className:"p-4 bg-yellow-50 border-yellow-200",children:e.jsxs(c,{gap:"sm",children:[e.jsx(ye,{className:"h-5 w-5 text-yellow-600"}),e.jsx(r,{className:"text-yellow-700",children:"At least one participant is required to proceed (ZIN Art. 22)"})]})})]}),Rn=()=>{var s;return e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Inspection Field"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"Select the type of inspection to determine which rules apply."}),e.jsx(Un,{options:I.map(n=>({id:n.id,title:n.name,description:`${n.description} (${n.ruleCount} rules)`})),selectedId:(s=t.selectedField)==null?void 0:s.id,onChange:n=>{const a=I.find(u=>u.id===n);a&&(i==null||i({selectedField:a}),d.emit("UI:FIELD_SELECTED",{fieldId:n}))}})]})},En=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsxs(c,{justify:"between",align:"center",children:[e.jsx(r,{variant:"h3",children:"Rule Checking"}),e.jsxs(D,{variant:"default",children:[H," / ",$," checked"]})]}),e.jsx(Hn,{stats:fe,variant:"full"}),e.jsx(l,{gap:"md",align:"stretch",children:t.rules.map(s=>{var a;const n=t.ruleChecks[s.id];return e.jsx(Zn,{ruleId:s.id,ruleText:s.ruleText,gazetteNumber:s.lawReference.gazetteNumber,article:s.lawReference.article,severity:s.severity,answer:(n==null?void 0:n.answer)||null,notes:n==null?void 0:n.notes,photoCount:((a=n==null?void 0:n.photos)==null?void 0:a.length)||0,onCheck:(u,j)=>{i==null||i({ruleChecks:{...t.ruleChecks,[s.id]:{ruleId:s.id,answer:u,notes:j,photos:(n==null?void 0:n.photos)||[]}}})},onAddPhoto:()=>d.emit("UI:ADD_RULE_PHOTO",{ruleId:s.id})},s.id)})})]}),An=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Findings"}),e.jsx(b,{className:"p-4 bg-red-50 border-red-200",children:e.jsxs(l,{gap:"sm",align:"stretch",children:[e.jsxs(r,{variant:"h4",className:"text-red-700",children:["Non-Compliant Items (",J,")"]}),Object.entries(t.ruleChecks).filter(([,s])=>s.answer==="non-compliant").map(([s,n])=>{const a=t.rules.find(u=>u.id===s);return e.jsxs(c,{gap:"sm",className:"text-red-600",children:[e.jsx(D,{variant:(a==null?void 0:a.severity)==="critical"?"danger":"warning",children:a==null?void 0:a.severity}),e.jsx(r,{variant:"small",children:a==null?void 0:a.ruleText})]},s)})]})}),e.jsx(ve,{sectionType:"findings",title:"Formal Findings",items:t.findings.map(s=>({id:s.id,data:s})),renderItem:s=>{const n=s.data;return e.jsxs(l,{gap:"sm",align:"stretch",className:"flex-1",children:[e.jsxs(c,{justify:"between",children:[e.jsx(r,{weight:"medium",children:String((n==null?void 0:n.description)??"")}),e.jsx(D,{variant:(n==null?void 0:n.severity)==="critical"?"danger":(n==null?void 0:n.severity)==="major"?"warning":"default",children:String((n==null?void 0:n.severity)??"")})]}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:String((n==null?void 0:n.recommendation)??"")})]})},renderForm:s=>e.jsxs(l,{gap:"sm",align:"stretch",children:[e.jsx("textarea",{placeholder:"Finding description...",className:"p-2 border rounded min-h-[80px]",id:"finding-desc"}),e.jsxs("select",{className:"p-2 border rounded",id:"finding-severity",children:[e.jsx("option",{value:"observation",children:"Observation"}),e.jsx("option",{value:"minor",children:"Minor"}),e.jsx("option",{value:"major",children:"Major"}),e.jsx("option",{value:"critical",children:"Critical"})]}),e.jsx("textarea",{placeholder:"Recommendation...",className:"p-2 border rounded",id:"finding-rec"}),e.jsx(N,{variant:"primary",size:"sm",onClick:()=>{var j,Z,V;const n=(j=document.getElementById("finding-desc"))==null?void 0:j.value,a=(Z=document.getElementById("finding-severity"))==null?void 0:Z.value,u=(V=document.getElementById("finding-rec"))==null?void 0:V.value;n&&s({description:n,severity:a,recommendation:u})},children:"Add Finding"})]}),onAdd:s=>{const n=s,a={id:`finding-${Date.now()}`,description:String((n==null?void 0:n.description)??""),severity:(n==null?void 0:n.severity)??"observation",relatedRuleIds:[],recommendation:String((n==null?void 0:n.recommendation)??"")};i==null||i({findings:[...t.findings,a]})},onRemove:s=>{i==null||i({findings:t.findings.filter(n=>n.id!==s)})}})]}),Dn=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Decisions & Orders"}),e.jsx(ve,{sectionType:"decisions",title:"Required Actions",items:t.decisions.map(s=>({id:s.id,data:s})),renderItem:s=>{const n=s.data;return e.jsxs(l,{gap:"sm",align:"stretch",className:"flex-1",children:[e.jsx(r,{weight:"medium",children:String((n==null?void 0:n.orderText)??"")}),e.jsxs(c,{gap:"md",children:[e.jsxs(D,{variant:"default",children:[e.jsx(Cn,{className:"h-3 w-3 mr-1"}),"Due: ",String((n==null?void 0:n.deadline)??"")]}),e.jsx(D,{variant:(n==null?void 0:n.status)==="completed"?"success":(n==null?void 0:n.status)==="acknowledged"?"primary":"warning",children:String((n==null?void 0:n.status)??"")})]})]})},renderForm:s=>e.jsxs(l,{gap:"sm",align:"stretch",children:[e.jsx("textarea",{placeholder:"Order/Action required...",className:"p-2 border rounded min-h-[80px]",id:"decision-text"}),e.jsx("input",{type:"date",className:"p-2 border rounded",id:"decision-deadline"}),e.jsx(N,{variant:"primary",size:"sm",onClick:()=>{var u,j;const n=(u=document.getElementById("decision-text"))==null?void 0:u.value,a=(j=document.getElementById("decision-deadline"))==null?void 0:j.value;n&&a&&s({orderText:n,deadline:a})},children:"Add Decision"})]}),onAdd:s=>{const n=s,a={id:`decision-${Date.now()}`,orderText:String((n==null?void 0:n.orderText)??""),deadline:String((n==null?void 0:n.deadline)??""),relatedFindingIds:[],status:"pending"};i==null||i({decisions:[...t.decisions,a]})},onRemove:s=>{i==null||i({decisions:t.decisions.filter(n=>n.id!==s)})}})]}),qn=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Document Generation"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"Review the compiled inspection document before presenting to the merchant."}),e.jsx(he,{title:"Inspection Record",subtitle:`Case #${t.caseNumber}`,previewUrl:`/api/inspections/${t.id}/preview`,downloadUrl:`/api/inspections/${t.id}/download`,onDownload:()=>d.emit("UI:DOWNLOAD_DOCUMENT",{inspectionId:t.id}),onPrint:()=>d.emit("UI:PRINT_DOCUMENT",{inspectionId:t.id})}),e.jsx(b,{className:"p-4",children:e.jsxs(l,{gap:"md",align:"stretch",children:[e.jsx(r,{variant:"h4",children:"Document Sections"}),L.map(s=>e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:s.label}),s.steps.filter(n=>n.documentSection).map(n=>e.jsxs(c,{gap:"sm",className:"ml-4",children:[e.jsx(W,{className:"h-4 w-4 text-green-500"}),e.jsx(r,{variant:"small",children:n.documentSection})]},n.id))]},s.id))]})})]}),_n=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Merchant Review"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"Present the inspection document to the merchant for review."}),e.jsx(b,{className:"p-4 bg-blue-50 border-blue-200",children:e.jsx(l,{gap:"sm",align:"stretch",children:e.jsxs(c,{gap:"sm",children:[e.jsx(js,{className:"h-5 w-5 text-blue-600"}),e.jsx(r,{className:"text-blue-700 font-medium",children:"The merchant has the right to review all findings and raise objections."})]})})}),e.jsx(he,{title:"Inspection Record",subtitle:"For Merchant Review",previewUrl:`/api/inspections/${t.id}/preview`,isReadOnly:!0})]}),On=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Objections"}),t.objections.length===0?e.jsx(b,{className:"p-4 bg-green-50 border-green-200",children:e.jsxs(c,{gap:"sm",children:[e.jsx(W,{className:"h-5 w-5 text-green-600"}),e.jsx(r,{className:"text-green-700",children:"No objections have been raised by the merchant."})]})}):e.jsx(l,{gap:"md",align:"stretch",children:t.objections.map(s=>e.jsx(b,{className:"p-4",children:e.jsxs(l,{gap:"sm",align:"stretch",children:[e.jsxs(c,{justify:"between",children:[e.jsxs(D,{variant:"default",children:["Section: ",s.sectionRef]}),e.jsx(D,{variant:s.status==="resolved"?"success":"warning",children:s.status})]}),e.jsx(r,{children:s.objectionText}),s.response&&e.jsxs(m,{className:"bg-neutral-50 p-2 rounded",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Inspector Response:"}),e.jsx(r,{variant:"small",children:s.response})]})]})},s.id))}),e.jsx(we,{onSubmit:(s,n)=>{const a=typeof s=="string"?s:(s==null?void 0:s.participantId)??"",u=typeof s=="string"?n??"":(s==null?void 0:s.text)??"",j={id:`obj-${Date.now()}`,sectionRef:a,objectionText:u,status:"pending"};i==null||i({objections:[...t.objections,j]})}})]}),Bn=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Closing Information"}),e.jsx(b,{className:"p-4",children:e.jsxs(l,{gap:"md",align:"stretch",children:[e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Inspection Start"}),e.jsx(r,{children:t.startDateTime||"Not recorded"})]}),e.jsxs(m,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Inspection End"}),e.jsx("input",{type:"datetime-local",className:"w-full p-2 border rounded",value:t.endDateTime||"",onChange:s=>i==null?void 0:i({endDateTime:s.target.value})})]})]})}),e.jsx(ls,{items:t.timeline})]}),Mn=()=>e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Signatures"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"Both the inspector and merchant representative must sign the inspection record."}),e.jsx(b,{className:"p-4",children:e.jsxs(l,{gap:"lg",align:"stretch",children:[e.jsx(Re,{title:"Inspector Signature",subtitle:t.inspector?`${t.inspector.name} ${t.inspector.surname}`:"Inspector",onCapture:s=>{i==null||i({inspectorSignature:s}),d.emit("UI:INSPECTOR_SIGNED",{inspectionId:t.id})}}),e.jsx(Re,{title:"Merchant Signature",subtitle:t.participants[0]?`${t.participants[0].name} ${t.participants[0].surname}`:"Company Representative",onCapture:s=>{i==null||i({merchantSignature:s}),d.emit("UI:MERCHANT_SIGNED",{inspectionId:t.id})}})]})}),(!t.inspectorSignature||!t.merchantSignature)&&e.jsx(b,{className:"p-4 bg-yellow-50 border-yellow-200",children:e.jsxs(c,{gap:"sm",children:[e.jsx(ye,{className:"h-5 w-5 text-yellow-600"}),e.jsx(r,{className:"text-yellow-700",children:"Both signatures are required to complete the inspection (ZIN Art. 28)"})]})})]}),Ln=()=>{var s;return e.jsxs(l,{gap:"lg",align:"center",className:"py-8",children:[e.jsx(m,{className:"p-4 rounded-full bg-green-100",children:e.jsx(W,{className:"h-16 w-16 text-green-600"})}),e.jsx(r,{variant:"h2",children:"Inspection Complete"}),e.jsx(r,{variant:"body",className:"text-neutral-600 text-center max-w-md",children:"The inspection has been successfully completed. You can download the final document or archive it to the information system."}),e.jsx(b,{className:"p-4 w-full max-w-md",children:e.jsxs(l,{gap:"sm",align:"stretch",children:[e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Case Number"}),e.jsx(r,{weight:"medium",children:t.caseNumber})]}),e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Company"}),e.jsx(r,{weight:"medium",children:(s=t.company)==null?void 0:s.name})]}),e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Rules Checked"}),e.jsx(r,{weight:"medium",children:H})]}),e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Findings"}),e.jsx(r,{weight:"medium",children:t.findings.length})]}),e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Decisions"}),e.jsx(r,{weight:"medium",children:t.decisions.length})]})]})}),e.jsxs(c,{gap:"md",children:[e.jsxs(N,{variant:"default",onClick:()=>d.emit("UI:DOWNLOAD_FINAL",{inspectionId:t.id}),children:[e.jsx(Y,{className:"h-4 w-4 mr-2"}),"Download PDF"]}),e.jsxs(N,{variant:"primary",onClick:()=>d.emit("UI:ARCHIVE_INSPECTION",{inspectionId:t.id}),children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),"Archive to System"]})]})]})},zn=()=>{switch(C){case"case-info":return Pn();case"company-data":return Fn();case"participants":return kn();case"field-selection":return Rn();case"rule-checking":return En();case"findings":return An();case"decisions":return Dn();case"document-generation":return qn();case"merchant-review":return _n();case"objections":return On();case"end-time":return Bn();case"signatures":return Mn();case"complete":return Ln();default:return null}},Vn=()=>{switch(C){case"case-info":return!!t.caseNumber&&!!t.inspector&&!!t.startDateTime;case"company-data":return!!t.company;case"participants":return t.participants.length>=1;case"field-selection":return!!t.selectedField;case"rule-checking":return H===$;case"findings":return!0;case"decisions":return!0;case"document-generation":return!0;case"merchant-review":return!0;case"objections":return t.objections.every(s=>s.status==="resolved");case"end-time":return!!t.endDateTime;case"signatures":return!!t.inspectorSignature&&!!t.merchantSignature;case"complete":return!0;default:return!0}};return e.jsxs(l,{gap:"none",className:G("min-h-screen bg-neutral-50",M),children:[e.jsx(m,{className:"bg-white border-b sticky top-0 z-40",children:e.jsx(m,{className:"max-w-6xl mx-auto p-4",children:e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(l,{gap:"xs",children:[e.jsxs(r,{variant:"h3",children:["Field Inspection - ",t.caseNumber||"New"]}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:((Ne=t.company)==null?void 0:Ne.name)||"No company selected"})]}),e.jsx($n,{phase:Ae(o)})]})})}),e.jsx(m,{className:"bg-white border-b",children:e.jsx(m,{className:"max-w-6xl mx-auto p-2",children:e.jsx(c,{gap:"none",className:"overflow-x-auto",children:L.map((s,n)=>{const u=s.steps.map(V=>Q(V.id)).every(V=>V<E),j=s.id===o,Z=s.icon;return e.jsx(m,{className:G("flex-1 p-3 border-b-2 transition-all",j&&"border-blue-500 bg-blue-50",u&&!j&&"border-green-500",!j&&!u&&"border-transparent"),children:e.jsxs(c,{gap:"sm",justify:"center",children:[u?e.jsx(W,{className:"h-5 w-5 text-green-500"}):e.jsx(Z,{className:G("h-5 w-5",j?"text-blue-600":"text-neutral-400")}),e.jsx(r,{variant:"small",weight:j?"semibold":"normal",className:G(j&&"text-blue-700",u&&!j&&"text-green-700"),children:s.label})]})},s.id)})})})}),e.jsx(m,{className:"max-w-6xl mx-auto w-full px-4 py-4",children:e.jsx(Gn,{title:((Te=L.find(s=>s.id===o))==null?void 0:Te.label)||"",subtitle:`Step ${E+1} of ${_.length}`,phase:Ae(o),steps:be.slice(Q(((Se=L.find(s=>s.id===o))==null?void 0:Se.steps[0].id)||"case-info"),Q(((Pe=L.find(s=>s.id===o))==null?void 0:Pe.steps[L.find(s=>s.id===o).steps.length-1].id)||"case-info")+1),compact:!0})}),e.jsx(m,{className:"max-w-6xl mx-auto w-full px-4 pb-24 flex-1",children:e.jsx(b,{className:"p-6",children:zn()})}),e.jsx(m,{className:"bg-white border-t fixed bottom-0 left-0 right-0 z-40",children:e.jsx(m,{className:"max-w-6xl mx-auto p-4",children:e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(N,{variant:"default",onClick:f,disabled:K,className:"gap-2",children:[e.jsx(ps,{className:"h-4 w-4"}),"Previous"]}),e.jsx(c,{gap:"sm",children:e.jsxs(N,{variant:"ghost",onClick:Tn,className:"gap-2",children:[e.jsx(us,{className:"h-4 w-4"}),"Save Draft"]})}),e.jsx(N,{variant:"primary",onClick:je,disabled:!Vn(),className:"gap-2",children:v?e.jsxs(e.Fragment,{children:[e.jsx(W,{className:"h-4 w-4"}),"Archive Inspection"]}):e.jsxs(e.Fragment,{children:["Next",e.jsx(hs,{className:"h-4 w-4"})]})})]})})}),o==="content"&&e.jsx(cs,{actions:Sn,context:{inspectionId:t.id,currentStep:C}})]})};Ce.displayName="InspectionProcessTemplate";Ce.__docgenInfo={description:"",methods:[],displayName:"InspectionProcessTemplate",props:{data:{required:!0,tsType:{name:"InspectionData"},description:"Full inspection data"},availableInspectors:{required:!1,tsType:{name:"Array",elements:[{name:"Inspector"}],raw:"Inspector[]"},description:"Available inspectors for selection",defaultValue:{value:"[]",computed:!1}},availableFields:{required:!1,tsType:{name:"Array",elements:[{name:"InspectionField"}],raw:"InspectionField[]"},description:"Available inspection fields",defaultValue:{value:"[]",computed:!1}},companySearchResults:{required:!1,tsType:{name:"Array",elements:[{name:"EntitySearchItem"}],raw:"SearchResult[]"},description:"Company search results",defaultValue:{value:"[]",computed:!1}},isSearchingCompany:{required:!1,tsType:{name:"boolean"},description:"Is searching for company",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional class names"},onPhaseChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(phase: ProcessPhase) => void",signature:{arguments:[{type:{name:"union",raw:`| "introduction"
| "content"
| "preparation"
| "record"
| "closing"`,elements:[{name:"literal",value:'"introduction"'},{name:"literal",value:'"content"'},{name:"literal",value:'"preparation"'},{name:"literal",value:'"record"'},{name:"literal",value:'"closing"'}]},name:"phase"}],return:{name:"void"}}},description:"Phase change handler"},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(step: ProcessStep) => void",signature:{arguments:[{type:{name:"union",raw:`| IntroductionStep
| ContentStep
| PreparationStep
| RecordStep
| ClosingStep`,elements:[{name:"union",raw:`| "case-info"
| "company-data"
| "participants"
| "field-selection"`,elements:[{name:"literal",value:'"case-info"'},{name:"literal",value:'"company-data"'},{name:"literal",value:'"participants"'},{name:"literal",value:'"field-selection"'}]},{name:"literal",value:'"rule-checking"'},{name:"union",raw:'"findings" | "decisions"',elements:[{name:"literal",value:'"findings"'},{name:"literal",value:'"decisions"'}]},{name:"union",raw:`| "document-generation"
| "merchant-review"
| "objections"`,elements:[{name:"literal",value:'"document-generation"'},{name:"literal",value:'"merchant-review"'},{name:"literal",value:'"objections"'}]},{name:"union",raw:'"end-time" | "signatures" | "complete"',elements:[{name:"literal",value:'"end-time"'},{name:"literal",value:'"signatures"'},{name:"literal",value:'"complete"'}]}]},name:"step"}],return:{name:"void"}}},description:"Step change handler"},onDataUpdate:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: Partial<InspectionData>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"InspectionData"}],raw:"Partial<InspectionData>"},name:"data"}],return:{name:"void"}}},description:"Data update handler"},onCompanySearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(query: string) => void",signature:{arguments:[{type:{name:"string"},name:"query"}],return:{name:"void"}}},description:"Company search handler"},onSaveDraft:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Save draft handler"},onComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Complete handler"}}};const Mt={title:"Clients/Inspection-System/Templates/InspectionProcessTemplate",component:Ce,parameters:{layout:"fullscreen",docs:{description:{component:`
# Inspection Process Template

A comprehensive template representing the **entire inspection workflow** with all 5 phases:

## Phases

1. **Introduction Phase**
   - Case Info: Inspector, start time, accompanying persons
   - Company Data: Search and select company
   - Participants: Add company representatives (min 1 required)
   - Field Selection: Choose inspection type

2. **Content Phase**
   - Rule Checking: Work through all rules for selected field
   - Floating Action Menu for ad-hoc actions (add participant, collect document, pause, SOS)

3. **Preparation Phase**
   - Findings: Document formal findings from non-compliant rules
   - Decisions: Create orders/actions with deadlines

4. **Record Phase**
   - Document Generation: Compile and preview inspection record
   - Merchant Review: Present to merchant
   - Objections: Record and resolve objections

5. **Closing Phase**
   - End Time: Record inspection end
   - Signatures: Capture inspector and merchant signatures
   - Complete: Final summary and archive

## Features

- Uses all inspection-system atoms, molecules, and organisms
- Implements closed circuit pattern with useEventBus
- Guard validation for proceeding (e.g., min participants, all rules checked)
- Floating action menu during content phase
- Document preview and signature capture
- Progress tracking across all steps
        `}}},argTypes:{onPhaseChange:{action:"phaseChanged"},onStepChange:{action:"stepChanged"},onDataUpdate:{action:"dataUpdated"},onCompanySearch:{action:"companySearched"},onSaveDraft:{action:"draftSaved"},onComplete:{action:"completed"}}},p={id:"insp-1",name:"Janez",surname:"Novak",department:"Market Inspection",badgeNumber:"SI-1234"},q={id:"comp-1",name:"ABC Trading d.o.o.",legalName:"ABC Trading družba z omejeno odgovornostjo",registrationNumber:"1234567890",taxNumber:"SI12345678",address:{street:"Slovenska cesta 50",city:"Ljubljana",postalCode:"1000"}},O=[{id:"part-1",name:"Marija",surname:"Horvat",positionInCompany:"Director",contactInfo:"marija@abc-trading.si"},{id:"part-2",name:"Peter",surname:"Kranjc",positionInCompany:"Quality Manager",contactInfo:"peter@abc-trading.si"}],z=[{id:"rule-1",ruleText:"Business premises must display valid operating license",lawReference:{gazetteNumber:"43/07",article:"Art. 12"},severity:"critical",canBeSkipped:!1},{id:"rule-2",ruleText:"Price list must be visible to customers",lawReference:{gazetteNumber:"43/07",article:"Art. 15"},severity:"major",canBeSkipped:!1},{id:"rule-3",ruleText:"All products must have valid expiration dates displayed",lawReference:{gazetteNumber:"21/14",article:"Art. 8"},severity:"critical",canBeSkipped:!1},{id:"rule-4",ruleText:"Staff must have valid health certificates",lawReference:{gazetteNumber:"33/09",article:"Art. 22"},severity:"major",canBeSkipped:!1},{id:"rule-5",ruleText:"Fire extinguisher must be accessible and within inspection date",lawReference:{gazetteNumber:"52/07",article:"Art. 45"},severity:"minor",canBeSkipped:!0}],h=[{id:"field-1",name:"Merchants",description:"General merchant compliance inspection",ruleCount:58},{id:"field-2",name:"Food Safety",description:"Food handling and safety compliance",ruleCount:72},{id:"field-3",name:"Labor Law",description:"Employment and worker safety compliance",ruleCount:45}],R=(t={})=>({id:"insp-2024-001",caseNumber:"INS-2024-001234",inspector:void 0,company:void 0,participants:[],accompanyingPersons:[],selectedField:void 0,rules:[],ruleChecks:{},findings:[],decisions:[],objections:[],collectedDocuments:[],startDateTime:void 0,endDateTime:void 0,inspectorSignature:void 0,merchantSignature:void 0,currentPhase:"introduction",currentStep:"case-info",timeline:[],...t}),U={name:"1.1 Introduction - Case Info",args:{data:R(),availableInspectors:[p],availableFields:h}},ee={name:"1.2 Introduction - Company Data",args:{data:R({inspector:p,startDateTime:"2024-01-15T09:00",currentStep:"company-data"}),availableInspectors:[p],availableFields:h,companySearchResults:[{id:"comp-1",label:"ABC Trading d.o.o.",sublabel:"1234567890"},{id:"comp-2",label:"XYZ Import d.o.o.",sublabel:"0987654321"}]}},ne={name:"1.3 Introduction - Participants",args:{data:R({inspector:p,company:q,startDateTime:"2024-01-15T09:00",currentStep:"participants"}),availableInspectors:[p],availableFields:h}},se={name:"1.4 Introduction - Field Selection",args:{data:R({inspector:p,company:q,participants:O,startDateTime:"2024-01-15T09:00",currentStep:"field-selection"}),availableInspectors:[p],availableFields:h}},te={name:"2.1 Content - Rule Checking",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"content",currentStep:"rule-checking",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible from entrance",photos:[]}}}),availableInspectors:[p],availableFields:h}},re={name:"2.2 Content - All Rules Checked",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"content",currentStep:"rule-checking",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"2 staff members missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}}}),availableInspectors:[p],availableFields:h}},ae={name:"3.1 Preparation - Findings",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"preparation",currentStep:"findings",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"2 staff members missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}}}),availableInspectors:[p],availableFields:h}},ie={name:"3.2 Preparation - Decisions",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"preparation",currentStep:"decisions",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"2 staff members missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},findings:[{id:"find-1",description:"Price list not displayed in a visible location for customers",severity:"major",relatedRuleIds:["rule-2"],recommendation:"Install price list display at entrance"},{id:"find-2",description:"Two staff members working without valid health certificates",severity:"major",relatedRuleIds:["rule-4"],recommendation:"Obtain health certificates within 15 days"}]}),availableInspectors:[p],availableFields:h}},le={name:"4.1 Record - Document Generation",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"record",currentStep:"document-generation",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},findings:[{id:"find-1",description:"Price list violation",severity:"major",relatedRuleIds:["rule-2"],recommendation:"Fix display"}],decisions:[{id:"dec-1",orderText:"Display price list at entrance",deadline:"2024-02-01",relatedFindingIds:["find-1"],status:"pending"}]}),availableInspectors:[p],availableFields:h}},ce={name:"4.2 Record - Merchant Review",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],startDateTime:"2024-01-15T09:00",currentPhase:"record",currentStep:"merchant-review",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}}}),availableInspectors:[p],availableFields:h}},oe={name:"4.3 Record - Objections",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],startDateTime:"2024-01-15T09:00",currentPhase:"record",currentStep:"objections",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},objections:[{id:"obj-1",sectionRef:"5.2",objectionText:"The price list was displayed but inspector did not check the back room",status:"pending"}]}),availableInspectors:[p],availableFields:h}},de={name:"5.1 Closing - End Time",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],startDateTime:"2024-01-15T09:00",currentPhase:"closing",currentStep:"end-time",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},timeline:[{id:"t1",timestamp:"2024-01-15T09:00",type:"start",title:"Inspection Started",description:"Inspection began"},{id:"t2",timestamp:"2024-01-15T09:15",type:"note",title:"Introduction Complete",description:"Completed case info"},{id:"t3",timestamp:"2024-01-15T09:30",type:"rule_checked",title:"Rule Checking Started",description:"Rule checking started"},{id:"t4",timestamp:"2024-01-15T11:00",type:"finding",title:"Findings Recorded",description:"Findings recorded"},{id:"t5",timestamp:"2024-01-15T11:30",type:"document",title:"Document Generated",description:"Document generated"}]}),availableInspectors:[p],availableFields:h}},me={name:"5.2 Closing - Signatures",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],startDateTime:"2024-01-15T09:00",endDateTime:"2024-01-15T12:00",currentPhase:"closing",currentStep:"signatures",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}}}),availableInspectors:[p],availableFields:h}},pe={name:"5.3 Closing - Complete",args:{data:R({inspector:p,company:q,participants:O,selectedField:h[0],startDateTime:"2024-01-15T09:00",endDateTime:"2024-01-15T12:00",currentPhase:"closing",currentStep:"complete",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},findings:[{id:"find-1",description:"Price list violation",severity:"major",relatedRuleIds:["rule-2"],recommendation:"Fix display"},{id:"find-2",description:"Missing health certificates",severity:"major",relatedRuleIds:["rule-4"],recommendation:"Obtain certificates"}],decisions:[{id:"dec-1",orderText:"Display price list",deadline:"2024-02-01",relatedFindingIds:["find-1"],status:"pending"},{id:"dec-2",orderText:"Obtain health certificates",deadline:"2024-02-01",relatedFindingIds:["find-2"],status:"pending"}],inspectorSignature:"data:image/png;base64,signature1...",merchantSignature:"data:image/png;base64,signature2..."}),availableInspectors:[p],availableFields:h}};var De,qe,_e;U.parameters={...U.parameters,docs:{...(De=U.parameters)==null?void 0:De.docs,source:{originalSource:`{
  name: "1.1 Introduction - Case Info",
  args: {
    data: createBaseData(),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(_e=(qe=U.parameters)==null?void 0:qe.docs)==null?void 0:_e.source}}};var Oe,Be,Me;ee.parameters={...ee.parameters,docs:{...(Oe=ee.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  name: "1.2 Introduction - Company Data",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      startDateTime: "2024-01-15T09:00",
      currentStep: "company-data"
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
    companySearchResults: [{
      id: "comp-1",
      label: "ABC Trading d.o.o.",
      sublabel: "1234567890"
    }, {
      id: "comp-2",
      label: "XYZ Import d.o.o.",
      sublabel: "0987654321"
    }]
  }
}`,...(Me=(Be=ee.parameters)==null?void 0:Be.docs)==null?void 0:Me.source}}};var Le,ze,Ve;ne.parameters={...ne.parameters,docs:{...(Le=ne.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  name: "1.3 Introduction - Participants",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      startDateTime: "2024-01-15T09:00",
      currentStep: "participants"
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(Ve=(ze=ne.parameters)==null?void 0:ze.docs)==null?void 0:Ve.source}}};var $e,Ge,He;se.parameters={...se.parameters,docs:{...($e=se.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  name: "1.4 Introduction - Field Selection",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      startDateTime: "2024-01-15T09:00",
      currentStep: "field-selection"
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(He=(Ge=se.parameters)==null?void 0:Ge.docs)==null?void 0:He.source}}};var Ze,Ke,We;te.parameters={...te.parameters,docs:{...(Ze=te.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  name: "2.1 Content - Rule Checking",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "content",
      currentStep: "rule-checking",
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible from entrance",
          photos: []
        }
      }
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(We=(Ke=te.parameters)==null?void 0:Ke.docs)==null?void 0:We.source}}};var Ye,Xe,Je;re.parameters={...re.parameters,docs:{...(Ye=re.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  name: "2.2 Content - All Rules Checked",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "content",
      currentStep: "rule-checking",
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "2 staff members missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      }
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(Je=(Xe=re.parameters)==null?void 0:Xe.docs)==null?void 0:Je.source}}};var Qe,Ue,en;ae.parameters={...ae.parameters,docs:{...(Qe=ae.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  name: "3.1 Preparation - Findings",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "preparation",
      currentStep: "findings",
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "2 staff members missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      }
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(en=(Ue=ae.parameters)==null?void 0:Ue.docs)==null?void 0:en.source}}};var nn,sn,tn;ie.parameters={...ie.parameters,docs:{...(nn=ie.parameters)==null?void 0:nn.docs,source:{originalSource:`{
  name: "3.2 Preparation - Decisions",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "preparation",
      currentStep: "decisions",
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "2 staff members missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      },
      findings: [{
        id: "find-1",
        description: "Price list not displayed in a visible location for customers",
        severity: "major",
        relatedRuleIds: ["rule-2"],
        recommendation: "Install price list display at entrance"
      }, {
        id: "find-2",
        description: "Two staff members working without valid health certificates",
        severity: "major",
        relatedRuleIds: ["rule-4"],
        recommendation: "Obtain health certificates within 15 days"
      }]
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(tn=(sn=ie.parameters)==null?void 0:sn.docs)==null?void 0:tn.source}}};var rn,an,ln;le.parameters={...le.parameters,docs:{...(rn=le.parameters)==null?void 0:rn.docs,source:{originalSource:`{
  name: "4.1 Record - Document Generation",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "record",
      currentStep: "document-generation",
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      },
      findings: [{
        id: "find-1",
        description: "Price list violation",
        severity: "major",
        relatedRuleIds: ["rule-2"],
        recommendation: "Fix display"
      }],
      decisions: [{
        id: "dec-1",
        orderText: "Display price list at entrance",
        deadline: "2024-02-01",
        relatedFindingIds: ["find-1"],
        status: "pending"
      }]
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(ln=(an=le.parameters)==null?void 0:an.docs)==null?void 0:ln.source}}};var cn,on,dn;ce.parameters={...ce.parameters,docs:{...(cn=ce.parameters)==null?void 0:cn.docs,source:{originalSource:`{
  name: "4.2 Record - Merchant Review",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      currentPhase: "record",
      currentStep: "merchant-review",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      }
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(dn=(on=ce.parameters)==null?void 0:on.docs)==null?void 0:dn.source}}};var mn,pn,un;oe.parameters={...oe.parameters,docs:{...(mn=oe.parameters)==null?void 0:mn.docs,source:{originalSource:`{
  name: "4.3 Record - Objections",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      currentPhase: "record",
      currentStep: "objections",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      },
      objections: [{
        id: "obj-1",
        sectionRef: "5.2",
        objectionText: "The price list was displayed but inspector did not check the back room",
        status: "pending"
      }]
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(un=(pn=oe.parameters)==null?void 0:pn.docs)==null?void 0:un.source}}};var hn,gn,xn;de.parameters={...de.parameters,docs:{...(hn=de.parameters)==null?void 0:hn.docs,source:{originalSource:`{
  name: "5.1 Closing - End Time",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      currentPhase: "closing",
      currentStep: "end-time",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      },
      timeline: [{
        id: "t1",
        timestamp: "2024-01-15T09:00",
        type: "start",
        title: "Inspection Started",
        description: "Inspection began"
      }, {
        id: "t2",
        timestamp: "2024-01-15T09:15",
        type: "note",
        title: "Introduction Complete",
        description: "Completed case info"
      }, {
        id: "t3",
        timestamp: "2024-01-15T09:30",
        type: "rule_checked",
        title: "Rule Checking Started",
        description: "Rule checking started"
      }, {
        id: "t4",
        timestamp: "2024-01-15T11:00",
        type: "finding",
        title: "Findings Recorded",
        description: "Findings recorded"
      }, {
        id: "t5",
        timestamp: "2024-01-15T11:30",
        type: "document",
        title: "Document Generated",
        description: "Document generated"
      }]
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(xn=(gn=de.parameters)==null?void 0:gn.docs)==null?void 0:xn.source}}};var fn,bn,jn;me.parameters={...me.parameters,docs:{...(fn=me.parameters)==null?void 0:fn.docs,source:{originalSource:`{
  name: "5.2 Closing - Signatures",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      endDateTime: "2024-01-15T12:00",
      currentPhase: "closing",
      currentStep: "signatures",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      }
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(jn=(bn=me.parameters)==null?void 0:bn.docs)==null?void 0:jn.source}}};var vn,yn,In;pe.parameters={...pe.parameters,docs:{...(vn=pe.parameters)==null?void 0:vn.docs,source:{originalSource:`{
  name: "5.3 Closing - Complete",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      endDateTime: "2024-01-15T12:00",
      currentPhase: "closing",
      currentStep: "complete",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": {
          ruleId: "rule-1",
          answer: "compliant",
          photos: []
        },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: []
        },
        "rule-3": {
          ruleId: "rule-3",
          answer: "compliant",
          photos: []
        },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: []
        },
        "rule-5": {
          ruleId: "rule-5",
          answer: "compliant",
          photos: []
        }
      },
      findings: [{
        id: "find-1",
        description: "Price list violation",
        severity: "major",
        relatedRuleIds: ["rule-2"],
        recommendation: "Fix display"
      }, {
        id: "find-2",
        description: "Missing health certificates",
        severity: "major",
        relatedRuleIds: ["rule-4"],
        recommendation: "Obtain certificates"
      }],
      decisions: [{
        id: "dec-1",
        orderText: "Display price list",
        deadline: "2024-02-01",
        relatedFindingIds: ["find-1"],
        status: "pending"
      }, {
        id: "dec-2",
        orderText: "Obtain health certificates",
        deadline: "2024-02-01",
        relatedFindingIds: ["find-2"],
        status: "pending"
      }],
      inspectorSignature: "data:image/png;base64,signature1...",
      merchantSignature: "data:image/png;base64,signature2..."
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(In=(yn=pe.parameters)==null?void 0:yn.docs)==null?void 0:In.source}}};const Lt=["Introduction_CaseInfo","Introduction_CompanyData","Introduction_Participants","Introduction_FieldSelection","Content_RuleChecking","Content_RuleCheckingComplete","Preparation_Findings","Preparation_Decisions","Record_DocumentGeneration","Record_MerchantReview","Record_Objections","Closing_EndTime","Closing_Signatures","Closing_Complete"];export{pe as Closing_Complete,de as Closing_EndTime,me as Closing_Signatures,te as Content_RuleChecking,re as Content_RuleCheckingComplete,U as Introduction_CaseInfo,ee as Introduction_CompanyData,se as Introduction_FieldSelection,ne as Introduction_Participants,ie as Preparation_Decisions,ae as Preparation_Findings,le as Record_DocumentGeneration,ce as Record_MerchantReview,oe as Record_Objections,Lt as __namedExportsOrder,Mt as default};
