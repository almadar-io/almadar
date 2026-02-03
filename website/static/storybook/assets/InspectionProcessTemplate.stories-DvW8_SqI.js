import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as y}from"./index-GiUgBvb1.js";import{c as G}from"./cn-BNf5BS2b.js";import{B as d}from"./Box-DYJzRMmP.js";import{V as i,H as c}from"./Stack-1XI3stiC.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{B as C}from"./Button-B7t-_IKa.js";import{C as x}from"./Card-BNT5PrJ5.js";import{B as O}from"./Badge-Dd4QqFOk.js";import{u as he}from"./useEventBus-BNZMNlv8.js";import{P as Vn}from"./PhaseIndicator-C0AecDcg.js";import{P as $n}from"./ProgressHeader-BBdcFc3y.js";import{C as Gn}from"./ComplianceSummary-Ba-msKoj.js";import{R as Hn}from"./RuleCheckItem-9MkfxpQm.js";import{I as Zn}from"./Input-DhFss4oc.js";import{S as Kn}from"./Spinner-vF2DJrH5.js";import{F as Y}from"./file-text-DZQctV9o.js";import{U as je}from"./user-BePscFH1.js";import{B as Wn}from"./building-2-DIDfNmjr.js";import{X as Yn}from"./x-prXd1WI5.js";import{S as Xn}from"./search-CCKipEn6.js";import{P as vn}from"./plus-jSzJaRn3.js";import{P as Jn}from"./ParticipantList-D-qiQ37F.js";import{C as Qn}from"./CardSelector-Djq6xLwJ.js";import{F as Un,R as fe}from"./RepeatableFormSection-BgJGb-Z7.js";import{T as es}from"./Textarea-C8Aqv8YN.js";import{S as ns}from"./Select-CVuTODQb.js";import{A as Te}from"./alert-circle-CBFh8Gcj.js";import{C as yn}from"./clock-DT9ve7xf.js";import{E as ss}from"./external-link-k_e-i1vS.js";import{c as ts}from"./createLucideIcon-CbHznvEr.js";import{D as rs}from"./download-yLSRVNFt.js";import{C as as}from"./calendar-rGtwHcH_.js";import{E as is}from"./eye-DPfPdwVp.js";import{I as ls}from"./InspectionTimeline-Brb0Z6fi.js";import{F as cs}from"./FloatingActionMenu-CuTts6fI.js";import{S as Se}from"./SignatureCapture-B5QUXs8l.js";import{B as os}from"./briefcase-B0KIfOaN.js";import{C as ds}from"./clipboard-check-BbncMYkH.js";import{P as ms}from"./pen-tool-LaElpXis.js";import{C as W}from"./check-circle-DX_bNA1C.js";import{A as ps}from"./arrow-left-CMPuXvFr.js";import{S as us}from"./save-DyJeJ3Zl.js";import{A as hs}from"./arrow-right-BdVPe8wH.js";import{A as Pe}from"./alert-triangle-BLuUOBNm.js";import{S as gs}from"./scale-UkxLwacR.js";import"./loader-2-DXp1ic5P.js";import"./flag-CJoo5uXG.js";import"./play-C6U2eifx.js";import"./clipboard-list-C9RrCyxf.js";import"./ProgressBar-ZQR7fgL2.js";import"./circle-CzFdAxtK.js";import"./x-circle-CCPeOM9T.js";import"./trending-up-D7By3kN5.js";import"./trending-down-Dv2LyMoL.js";import"./LawReferenceBadge-Bl_8g4lT.js";import"./check-DliVttWt.js";import"./camera-Cr6IZ-wx.js";import"./chevron-down-BQmz_Bpa.js";import"./Avatar-CJtPgGUU.js";import"./phone-XSC4O3No.js";import"./square-pen-D7sL1yO_.js";import"./trash-2-ChlfdFMf.js";import"./pause-BGY7Ki7b.js";import"./user-plus-BlQDsowZ.js";import"./pen-DNARvM59.js";import"./rotate-ccw-cyxkXXLc.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=ts("Printer",[["polyline",{points:"6 9 6 2 18 2 18 9",key:"1306q4"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["rect",{width:"12",height:"8",x:"6",y:"14",key:"5ipwut"}]]),fs={Company:Wn,Inspector:je,Document:Y},pe=({entity:s,label:h,placeholder:I="Search...",selectedItem:f,items:q=[],isLoading:B=!1,allowCreate:T=!0,createLabel:w="Create New",required:a=!1,disabled:N=!1,className:E,onSelect:j,onSearch:m,onCreate:S})=>{const R=he(),[o,A]=y.useState(""),[M,P]=y.useState(!1),$=y.useRef(null),F=fs[s]||Y;y.useEffect(()=>{const b=xe=>{$.current&&!$.current.contains(xe.target)&&P(!1)};return document.addEventListener("mousedown",b),()=>document.removeEventListener("mousedown",b)},[]);const Z=y.useCallback(b=>{A(b),P(!0),m==null||m(b),R.emit("UI:SEARCH",{entity:s,searchTerm:b})},[s,m,R]),K=y.useCallback(b=>{j==null||j(b),R.emit("UI:ENTITY_SELECTED",{entity:s,item:b}),A(""),P(!1)},[s,j,R]),ge=y.useCallback(()=>{j==null||j(null),A("")},[j]),X=y.useCallback(()=>{S==null||S(),R.emit("UI:CREATE_NEW",{entity:s}),P(!1)},[s,S,R]);return f?e.jsxs(i,{gap:"xs",className:G("w-full",E),children:[h&&e.jsxs(r,{variant:"label",className:"text-neutral-700",children:[h,a&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx(x,{className:"p-3",children:e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(d,{rounded:"lg",padding:"sm",className:"bg-blue-50 text-blue-600",children:e.jsx(F,{className:"h-5 w-5"})}),e.jsxs(i,{gap:"none",children:[e.jsx(r,{variant:"body",className:"font-medium",children:f.name}),f.subtitle&&e.jsx(r,{variant:"small",className:"text-neutral-500",children:f.subtitle})]})]}),!N&&e.jsx(C,{variant:"ghost",size:"sm",onClick:ge,className:"text-neutral-400 hover:text-neutral-600",children:e.jsx(Yn,{className:"h-4 w-4"})})]})})]}):e.jsx(d,{ref:$,className:G("w-full relative",E),children:e.jsxs(i,{gap:"xs",children:[h&&e.jsxs(r,{variant:"label",className:"text-neutral-700",children:[h,a&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx(Zn,{type:"text",value:o,onChange:b=>Z(b.target.value),onFocus:()=>P(!0),placeholder:I,disabled:N,leftIcon:e.jsx(Xn,{className:"h-4 w-4 text-neutral-400"}),className:"w-full"}),M&&!N&&e.jsx(x,{className:"absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto shadow-lg",children:e.jsxs(i,{gap:"none",children:[B?e.jsx(d,{padding:"md",className:"flex justify-center",children:e.jsx(Kn,{size:"sm"})}):q.length>0?q.map(b=>e.jsx("button",{type:"button",onClick:()=>K(b),className:"w-full p-3 text-left hover:bg-neutral-50 transition-colors border-b last:border-b-0",children:e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(F,{className:"h-4 w-4 text-neutral-400"}),e.jsxs(i,{gap:"none",children:[e.jsx(r,{variant:"body",className:"font-medium",children:b.name}),b.subtitle&&e.jsx(r,{variant:"small",className:"text-neutral-500",children:b.subtitle})]})]})},b.id)):o?e.jsx(d,{padding:"md",className:"text-center",children:e.jsx(r,{variant:"small",className:"text-neutral-500",children:"No results found"})}):null,T&&e.jsx("button",{type:"button",onClick:X,className:"w-full p-3 text-left hover:bg-blue-50 transition-colors border-t",children:e.jsxs(c,{gap:"sm",align:"center",className:"text-blue-600",children:[e.jsx(vn,{className:"h-4 w-4"}),e.jsxs(r,{variant:"body",className:"font-medium",children:[w," ",s]})]})})]})})]})})};pe.displayName="EntitySearch";pe.__docgenInfo={description:"",methods:[],displayName:"EntitySearch",props:{entity:{required:!0,tsType:{name:"string"},description:"Entity type being searched"},label:{required:!1,tsType:{name:"string"},description:"Label for the field"},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text",defaultValue:{value:'"Search..."',computed:!1}},selectedItem:{required:!1,tsType:{name:"union",raw:"EntitySearchItem | null",elements:[{name:"EntitySearchItem"},{name:"null"}]},description:"Currently selected item"},items:{required:!1,tsType:{name:"Array",elements:[{name:"EntitySearchItem"}],raw:"EntitySearchItem[]"},description:"Search results",defaultValue:{value:"[]",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},allowCreate:{required:!1,tsType:{name:"boolean"},description:"Allow creating new entities",defaultValue:{value:"true",computed:!1}},createLabel:{required:!1,tsType:{name:"string"},description:"Create button label",defaultValue:{value:'"Create New"',computed:!1}},required:{required:!1,tsType:{name:"boolean"},description:"Required field",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disabled state",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: EntitySearchItem | null) => void",signature:{arguments:[{type:{name:"union",raw:"EntitySearchItem | null",elements:[{name:"EntitySearchItem"},{name:"null"}]},name:"item"}],return:{name:"void"}}},description:"Selection change handler"},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(term: string) => void",signature:{arguments:[{type:{name:"string"},name:"term"}],return:{name:"void"}}},description:"Search handler"},onCreate:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Create handler"}}};const be=({objections:s=[],participants:h=[],inspectionId:I,readOnly:f=!1,className:q,onSubmit:B})=>{const T=he(),[w,a]=y.useState(!1),[N,E]=y.useState(""),[j,m]=y.useState(""),S=y.useCallback(()=>{if(!N||!j.trim())return;const o={participantId:N,text:j.trim()};B==null||B(o),T.emit("UI:OBJECTION_SUBMITTED",{objection:o,inspectionId:I}),E(""),m(""),a(!1)},[N,j,I,B,T]),R=y.useCallback(()=>{E(""),m(""),a(!1)},[]);return e.jsxs(i,{gap:"md",className:G("w-full",q),children:[e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(Te,{className:"h-5 w-5 text-amber-500"}),e.jsx(r,{variant:"h4",className:"text-neutral-800",children:"Objections"}),s.length>0&&e.jsx(O,{variant:"warning",children:s.length})]}),!f&&!w&&e.jsxs(C,{variant:"secondary",size:"sm",onClick:()=>a(!0),className:"gap-1",children:[e.jsx(vn,{className:"h-4 w-4"}),"Record Objection"]})]}),w&&e.jsx(x,{className:"p-4 border-amber-200 bg-amber-50",children:e.jsxs(i,{gap:"md",children:[e.jsx(r,{variant:"body",className:"font-medium text-amber-800",children:"Record New Objection"}),e.jsxs(i,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-700",children:"Participant"}),e.jsx(ns,{value:N,onChange:o=>E(o.target.value),className:"w-full",placeholder:"Select participant...",options:h.map(o=>({value:o.id,label:o.name}))})]}),e.jsxs(i,{gap:"xs",children:[e.jsx(r,{variant:"label",className:"text-neutral-700",children:"Objection Details"}),e.jsx(es,{value:j,onChange:o=>m(o.target.value),placeholder:"Describe the objection or concern...",rows:3,className:"w-full"})]}),e.jsxs(c,{gap:"sm",justify:"end",children:[e.jsx(C,{variant:"secondary",size:"sm",onClick:R,children:"Cancel"}),e.jsx(C,{variant:"primary",size:"sm",onClick:S,disabled:!N||!j.trim(),children:"Record Objection"})]})]})}),s.length===0&&!w?e.jsx(x,{className:"p-6",children:e.jsxs(i,{align:"center",gap:"sm",className:"text-neutral-400",children:[e.jsx(Te,{className:"h-8 w-8"}),e.jsx(r,{variant:"body",children:"No objections recorded"}),e.jsx(r,{variant:"small",children:"Objections will be documented in the final report"})]})}):e.jsx(i,{gap:"sm",children:s.map(o=>e.jsx(x,{className:"p-4 border-amber-100",children:e.jsxs(i,{gap:"sm",children:[e.jsxs(c,{justify:"between",align:"start",children:[e.jsxs(c,{gap:"sm",align:"center",children:[e.jsx(je,{className:"h-4 w-4 text-neutral-500"}),e.jsx(r,{variant:"body",className:"font-medium",children:o.participantName})]}),e.jsxs(c,{gap:"xs",align:"center",className:"text-neutral-500",children:[e.jsx(yn,{className:"h-3 w-3"}),e.jsx(r,{variant:"small",children:new Date(o.timestamp).toLocaleString()})]})]}),e.jsx(r,{variant:"body",className:"text-neutral-700",children:o.text})]})},o.id))})]})};be.displayName="ObjectionRecorder";be.__docgenInfo={description:"",methods:[],displayName:"ObjectionRecorder",props:{objections:{required:!1,tsType:{name:"Array",elements:[{name:"Objection"}],raw:"Objection[]"},description:"Existing objections",defaultValue:{value:"[]",computed:!1}},participants:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ id: string; name: string }",signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}}]}}],raw:"Array<{ id: string; name: string }>"},description:"Available participants",defaultValue:{value:"[]",computed:!1}},inspectionId:{required:!1,tsType:{name:"string"},description:"Inspection ID"},readOnly:{required:!1,tsType:{name:"boolean"},description:"Read-only mode",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:"(objection: { participantId: string; text: string }) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ participantId: string; text: string }",signature:{properties:[{key:"participantId",value:{name:"string",required:!0}},{key:"text",value:{name:"string",required:!0}}]}},name:"objection"}],return:{name:"void"}}},description:"Objection submitted handler"}}};const js={draft:{color:"warning",label:"Draft"},final:{color:"success",label:"Final"},signed:{color:"primary",label:"Signed"},archived:{color:"neutral",label:"Archived"}},ue=({id:s,title:h,type:I="PDF",previewUrl:f,downloadUrl:q,status:B="draft",createdAt:T,createdBy:w,fileSize:a,showPreview:N=!1,previewHeight:E="400px",className:j,onDownload:m,onPrint:S,onView:R})=>{const o=he(),A=js[B],M=y.useCallback(()=>{if(m==null||m(),o.emit("UI:DOWNLOAD",{documentId:s,format:I}),q){const F=document.createElement("a");F.href=q,F.download=`${h}.${I.toLowerCase()}`,document.body.appendChild(F),F.click(),document.body.removeChild(F)}},[s,h,I,q,m,o]),P=y.useCallback(()=>{if(S==null||S(),o.emit("UI:PRINT",{documentId:s}),f){const F=window.open(f,"_blank");F&&(F.onload=()=>{F.print()})}},[s,f,S,o]),$=y.useCallback(()=>{R==null||R(),f&&window.open(f,"_blank")},[f,R]);return e.jsx(x,{className:G("overflow-hidden",j),children:e.jsxs(i,{gap:"none",children:[e.jsx(d,{padding:"md",className:"border-b",children:e.jsxs(c,{justify:"between",align:"start",children:[e.jsxs(c,{gap:"sm",align:"start",children:[e.jsx(d,{rounded:"lg",padding:"sm",className:"bg-red-50 text-red-600",children:e.jsx(Y,{className:"h-6 w-6"})}),e.jsxs(i,{gap:"xs",children:[e.jsx(r,{variant:"body",className:"font-medium text-neutral-800",children:h}),e.jsxs(c,{gap:"sm",wrap:!0,children:[e.jsx(O,{variant:"default",children:I}),e.jsx(O,{variant:A.color,children:A.label}),a&&e.jsx(r,{variant:"small",className:"text-neutral-500",children:a})]})]})]}),e.jsxs(c,{gap:"xs",children:[f&&e.jsx(C,{variant:"ghost",size:"sm",onClick:$,className:"gap-1",children:e.jsx(ss,{className:"h-4 w-4"})}),e.jsx(C,{variant:"ghost",size:"sm",onClick:P,className:"gap-1",children:e.jsx(xs,{className:"h-4 w-4"})}),e.jsxs(C,{variant:"secondary",size:"sm",onClick:M,className:"gap-1",children:[e.jsx(rs,{className:"h-4 w-4"}),"Download"]})]})]})}),(T||w)&&e.jsx(d,{padding:"sm",className:"bg-neutral-50 border-b",children:e.jsxs(c,{gap:"md",wrap:!0,children:[T&&e.jsxs(c,{gap:"xs",align:"center",className:"text-neutral-500",children:[e.jsx(as,{className:"h-3 w-3"}),e.jsx(r,{variant:"small",children:new Date(T).toLocaleDateString()})]}),w&&e.jsxs(c,{gap:"xs",align:"center",className:"text-neutral-500",children:[e.jsx(je,{className:"h-3 w-3"}),e.jsx(r,{variant:"small",children:w})]})]})}),N&&f?e.jsx(d,{style:{height:E},children:e.jsx("iframe",{src:f,className:"w-full h-full border-0",title:`Preview of ${h}`})}):N?e.jsx(d,{padding:"xl",className:"bg-neutral-50 flex items-center justify-center",style:{height:E},children:e.jsxs(i,{align:"center",gap:"sm",className:"text-neutral-400",children:[e.jsx(is,{className:"h-12 w-12"}),e.jsx(r,{variant:"body",children:"Preview not available"}),e.jsx(C,{variant:"secondary",size:"sm",onClick:M,children:"Download to view"})]})}):null]})})};ue.displayName="DocumentPreview";ue.__docgenInfo={description:"",methods:[],displayName:"DocumentPreview",props:{id:{required:!0,tsType:{name:"string"},description:"Document ID"},title:{required:!0,tsType:{name:"string"},description:"Document title"},type:{required:!1,tsType:{name:"string"},description:"Document type",defaultValue:{value:'"PDF"',computed:!1}},previewUrl:{required:!1,tsType:{name:"string"},description:"Preview URL"},downloadUrl:{required:!1,tsType:{name:"string"},description:"Download URL"},status:{required:!1,tsType:{name:"union",raw:'"draft" | "final" | "signed" | "archived"',elements:[{name:"literal",value:'"draft"'},{name:"literal",value:'"final"'},{name:"literal",value:'"signed"'},{name:"literal",value:'"archived"'}]},description:"Document status",defaultValue:{value:'"draft"',computed:!1}},createdAt:{required:!1,tsType:{name:"string"},description:"Created date"},createdBy:{required:!1,tsType:{name:"string"},description:"Created by"},fileSize:{required:!1,tsType:{name:"string"},description:"File size"},showPreview:{required:!1,tsType:{name:"boolean"},description:"Show inline preview",defaultValue:{value:"false",computed:!1}},previewHeight:{required:!1,tsType:{name:"string"},description:"Preview height",defaultValue:{value:'"400px"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onDownload:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Download handler"},onPrint:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Print handler"},onView:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"View handler"}}};const L=[{id:"introduction",label:"Introduction",icon:os,steps:[{id:"case-info",label:"Case Info",documentSection:"1. SPLOŠNI PODATKI"},{id:"company-data",label:"Company Data",documentSection:"2. PODATKI O ZAVEZANCU"},{id:"participants",label:"Participants",documentSection:"3. PRISOTNE OSEBE"},{id:"field-selection",label:"Field Selection",documentSection:"4. PREDMET PREGLEDA"}]},{id:"content",label:"Inspection",icon:ds,steps:[{id:"rule-checking",label:"Rule Checking",documentSection:"5. UGOTOVITVE PRI PREGLEDU"}]},{id:"preparation",label:"Preparation",icon:Y,steps:[{id:"findings",label:"Findings",documentSection:"6. UGOTOVITVE"},{id:"decisions",label:"Decisions",documentSection:"7. ODLOČBE IN UKREPI"}]},{id:"record",label:"Record",icon:Un,steps:[{id:"document-generation",label:"Generate Document"},{id:"merchant-review",label:"Merchant Review"},{id:"objections",label:"Objections",documentSection:"9. PRIPOMBE ZAVEZANCA"}]},{id:"closing",label:"Closing",icon:ms,steps:[{id:"end-time",label:"End Time",documentSection:"10. ZAKLJUČEK"},{id:"signatures",label:"Signatures"},{id:"complete",label:"Complete"}]}];function Fe(s){for(const h of L)if(h.steps.some(I=>I.id===s))return h.id;return"introduction"}function J(s){let h=0;for(const I of L)for(const f of I.steps){if(f.id===s)return h;h++}return 0}function bs(){return L.flatMap(s=>s.steps.map(h=>h.id))}function Re(s){return{introduction:"preparation",content:"execution",preparation:"documentation",record:"review",closing:"completed"}[s]}const ve=({data:s,availableInspectors:h=[],availableFields:I=[],companySearchResults:f=[],isSearchingCompany:q=!1,className:B,onPhaseChange:T,onStepChange:w,onDataUpdate:a,onCompanySearch:N,onSaveDraft:E,onComplete:j})=>{var ye,Ie,we,Ne;const m=he(),[S,R]=y.useState(!1),{currentPhase:o,currentStep:A}=s,M=bs(),P=J(A),$=P===0,F=P===M.length-1,Z=s.rules.length,K=Object.keys(s.ruleChecks).length,ge=Object.values(s.ruleChecks).filter(n=>n.answer==="compliant").length,X=Object.values(s.ruleChecks).filter(n=>n.answer==="non-compliant").length,b=Z-K,xe={compliant:ge,nonCompliant:X,notChecked:b,totalRules:Z,criticalCount:Object.values(s.ruleChecks).filter(n=>{var t;return n.answer==="non-compliant"&&((t=s.rules.find(l=>l.id===n.ruleId))==null?void 0:t.severity)==="critical"}).length,majorCount:Object.values(s.ruleChecks).filter(n=>{var t;return n.answer==="non-compliant"&&((t=s.rules.find(l=>l.id===n.ruleId))==null?void 0:t.severity)==="major"}).length,minorCount:Object.values(s.ruleChecks).filter(n=>{var t;return n.answer==="non-compliant"&&((t=s.rules.find(l=>l.id===n.ruleId))==null?void 0:t.severity)==="minor"}).length},In=M.map((n,t)=>{var l;return{id:n,label:((l=L.flatMap(g=>g.steps).find(g=>g.id===n))==null?void 0:l.label)||n,completed:t<P,current:n===A}}),wn=()=>{if($)return;const n=M[P-1],t=Fe(n);t!==o&&(T==null||T(t)),w==null||w(n),m.emit("UI:STEP_BACK",{step:n,phase:t})},Nn=()=>{if(F){j==null||j(),m.emit("UI:INSPECTION_COMPLETE",{inspectionId:s.id});return}const n=M[P+1],t=Fe(n);t!==o&&(T==null||T(t)),w==null||w(n),m.emit("UI:STEP_NEXT",{step:n,phase:t})},Cn=()=>{E==null||E(),m.emit("UI:SAVE_DRAFT",{inspectionId:s.id,currentStep:A})},Tn=[{id:"add-participant",label:"Add Participant",icon:"user-plus",action:"add_participant"},{id:"collect-document",label:"Collect Document",icon:"file-plus",action:"collect_document"},{id:"take-photo",label:"Take Photo",icon:"camera",action:"take_photo"},{id:"pause",label:S?"Resume":"Pause",icon:S?"play":"pause",action:S?"resume":"pause"},{id:"sos",label:"SOS Exception",icon:"alert-triangle",action:"sos",variant:"danger"}],Sn=()=>{var n;return e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Case Information"}),e.jsx(x,{className:"p-4",children:e.jsxs(i,{gap:"md",align:"stretch",children:[e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Case Number"}),e.jsx(r,{variant:"h4",children:s.caseNumber||"Auto-generated"})]}),e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Inspector"}),e.jsx(pe,{label:"Select Inspector",placeholder:"Search inspectors...",results:h.map(t=>({id:t.id,label:`${t.name} ${t.surname}`,sublabel:`${t.department} - ${t.badgeNumber}`})),selectedId:(n=s.inspector)==null?void 0:n.id,onSearch:t=>m.emit("UI:SEARCH_INSPECTOR",{query:t}),onSelect:t=>a==null?void 0:a({inspector:h.find(l=>l.id===t.id)}),allowCreate:!1})]}),e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Start Date/Time"}),e.jsx("input",{type:"datetime-local",className:"w-full p-2 border rounded",value:s.startDateTime||"",onChange:t=>a==null?void 0:a({startDateTime:t.target.value})})]}),e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Accompanying Persons"}),e.jsx(fe,{title:"Accompanying Persons",items:s.accompanyingPersons.map(t=>({id:t.id,data:t})),renderItem:t=>e.jsxs(c,{gap:"md",className:"flex-1",children:[e.jsx(r,{children:t.data.name}),e.jsx(O,{variant:"default",children:t.data.organization}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:t.data.role})]}),renderForm:t=>e.jsxs(i,{gap:"sm",align:"stretch",children:[e.jsx("input",{type:"text",placeholder:"Name",className:"p-2 border rounded",id:"acc-name"}),e.jsx("input",{type:"text",placeholder:"Organization",className:"p-2 border rounded",id:"acc-org"}),e.jsx("input",{type:"text",placeholder:"Role",className:"p-2 border rounded",id:"acc-role"}),e.jsx(C,{variant:"primary",size:"sm",onClick:()=>{var H,V,Ce;const l=(H=document.getElementById("acc-name"))==null?void 0:H.value,g=(V=document.getElementById("acc-org"))==null?void 0:V.value,v=(Ce=document.getElementById("acc-role"))==null?void 0:Ce.value;l&&g&&t({name:l,organization:g,role:v})},children:"Add Person"})]}),onAdd:t=>{const l={id:`acc-${Date.now()}`,name:t.name,organization:t.organization,role:t.role||""};a==null||a({accompanyingPersons:[...s.accompanyingPersons,l]})},onRemove:t=>{a==null||a({accompanyingPersons:s.accompanyingPersons.filter(l=>l.id!==t)})}})]})]})})]})},Pn=()=>{var n;return e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Company Data"}),e.jsx(x,{className:"p-4",children:e.jsxs(i,{gap:"md",align:"stretch",children:[e.jsx(pe,{label:"Search Company",placeholder:"Search by name or registration number...",results:f,isLoading:q,selectedId:(n=s.company)==null?void 0:n.id,onSearch:t=>N==null?void 0:N(t),onSelect:t=>m.emit("UI:COMPANY_SELECTED",{companyId:t.id}),onCreateNew:()=>m.emit("UI:CREATE_NEW_COMPANY",{}),allowCreate:!0,createLabel:"Create New Company"}),s.company&&e.jsx(x,{className:"p-4 bg-blue-50 border-blue-200",children:e.jsxs(i,{gap:"sm",align:"stretch",children:[e.jsxs(c,{justify:"between",children:[e.jsx(r,{variant:"h4",children:s.company.name}),e.jsx(O,{variant:"primary",children:"Selected"})]}),e.jsxs(r,{variant:"small",className:"text-neutral-600",children:["Legal Name: ",s.company.legalName]}),e.jsxs(c,{gap:"lg",children:[e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Registration #"}),e.jsx(r,{children:s.company.registrationNumber})]}),e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Tax ID"}),e.jsx(r,{children:s.company.taxNumber})]})]}),e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Address"}),e.jsxs(r,{children:[s.company.address.street,","," ",s.company.address.postalCode," ",s.company.address.city]})]})]})})]})})]})},Fn=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Participants"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"At least one company representative must be present during the inspection."}),e.jsx(x,{className:"p-4",children:e.jsx(Jn,{participants:s.participants,onAdd:n=>{const t={...n,id:`part-${Date.now()}`};a==null||a({participants:[...s.participants,t]})},onRemove:n=>{s.participants.length>1&&(a==null||a({participants:s.participants.filter(t=>t.id!==n)}))},minParticipants:1})}),s.participants.length===0&&e.jsx(x,{className:"p-4 bg-yellow-50 border-yellow-200",children:e.jsxs(c,{gap:"sm",children:[e.jsx(Pe,{className:"h-5 w-5 text-yellow-600"}),e.jsx(r,{className:"text-yellow-700",children:"At least one participant is required to proceed (ZIN Art. 22)"})]})})]}),Rn=()=>{var n;return e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Inspection Field"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"Select the type of inspection to determine which rules apply."}),e.jsx(Qn,{options:I.map(t=>({id:t.id,title:t.name,description:`${t.description} (${t.ruleCount} rules)`})),selectedId:(n=s.selectedField)==null?void 0:n.id,onChange:t=>{const l=I.find(g=>g.id===t);l&&(a==null||a({selectedField:l}),m.emit("UI:FIELD_SELECTED",{fieldId:t}))}})]})},kn=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsxs(c,{justify:"between",align:"center",children:[e.jsx(r,{variant:"h3",children:"Rule Checking"}),e.jsxs(O,{variant:"default",children:[K," / ",Z," checked"]})]}),e.jsx(Gn,{stats:xe,variant:"full"}),e.jsx(i,{gap:"md",align:"stretch",children:s.rules.map(n=>{var l;const t=s.ruleChecks[n.id];return e.jsx(Hn,{ruleId:n.id,ruleText:n.ruleText,gazetteNumber:n.lawReference.gazetteNumber,article:n.lawReference.article,severity:n.severity,answer:(t==null?void 0:t.answer)||null,notes:t==null?void 0:t.notes,photoCount:((l=t==null?void 0:t.photos)==null?void 0:l.length)||0,onCheck:(g,v)=>{a==null||a({ruleChecks:{...s.ruleChecks,[n.id]:{ruleId:n.id,answer:g,notes:v,photos:(t==null?void 0:t.photos)||[]}}})},onAddPhoto:()=>m.emit("UI:ADD_RULE_PHOTO",{ruleId:n.id})},n.id)})})]}),En=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Findings"}),e.jsx(x,{className:"p-4 bg-red-50 border-red-200",children:e.jsxs(i,{gap:"sm",align:"stretch",children:[e.jsxs(r,{variant:"h4",className:"text-red-700",children:["Non-Compliant Items (",X,")"]}),Object.entries(s.ruleChecks).filter(([,n])=>n.answer==="non-compliant").map(([n,t])=>{const l=s.rules.find(g=>g.id===n);return e.jsxs(c,{gap:"sm",className:"text-red-600",children:[e.jsx(O,{variant:(l==null?void 0:l.severity)==="critical"?"danger":"warning",children:l==null?void 0:l.severity}),e.jsx(r,{variant:"small",children:l==null?void 0:l.ruleText})]},n)})]})}),e.jsx(fe,{title:"Formal Findings",items:s.findings.map(n=>({id:n.id,data:n})),renderItem:n=>e.jsxs(i,{gap:"sm",align:"stretch",className:"flex-1",children:[e.jsxs(c,{justify:"between",children:[e.jsx(r,{weight:"medium",children:n.data.description}),e.jsx(O,{variant:n.data.severity==="critical"?"danger":n.data.severity==="major"?"warning":"default",children:n.data.severity})]}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:n.data.recommendation})]}),renderForm:n=>e.jsxs(i,{gap:"sm",align:"stretch",children:[e.jsx("textarea",{placeholder:"Finding description...",className:"p-2 border rounded min-h-[80px]",id:"finding-desc"}),e.jsxs("select",{className:"p-2 border rounded",id:"finding-severity",children:[e.jsx("option",{value:"observation",children:"Observation"}),e.jsx("option",{value:"minor",children:"Minor"}),e.jsx("option",{value:"major",children:"Major"}),e.jsx("option",{value:"critical",children:"Critical"})]}),e.jsx("textarea",{placeholder:"Recommendation...",className:"p-2 border rounded",id:"finding-rec"}),e.jsx(C,{variant:"primary",size:"sm",onClick:()=>{var v,H,V;const t=(v=document.getElementById("finding-desc"))==null?void 0:v.value,l=(H=document.getElementById("finding-severity"))==null?void 0:H.value,g=(V=document.getElementById("finding-rec"))==null?void 0:V.value;t&&n({description:t,severity:l,recommendation:g})},children:"Add Finding"})]}),onAdd:n=>{const t={id:`finding-${Date.now()}`,description:n.description,severity:n.severity,relatedRuleIds:[],recommendation:n.recommendation||""};a==null||a({findings:[...s.findings,t]})},onRemove:n=>{a==null||a({findings:s.findings.filter(t=>t.id!==n)})}})]}),An=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Decisions & Orders"}),e.jsx(fe,{title:"Required Actions",items:s.decisions.map(n=>({id:n.id,data:n})),renderItem:n=>e.jsxs(i,{gap:"sm",align:"stretch",className:"flex-1",children:[e.jsx(r,{weight:"medium",children:n.data.orderText}),e.jsxs(c,{gap:"md",children:[e.jsxs(O,{variant:"default",children:[e.jsx(yn,{className:"h-3 w-3 mr-1"}),"Due: ",n.data.deadline]}),e.jsx(O,{variant:n.data.status==="completed"?"success":n.data.status==="acknowledged"?"primary":"warning",children:n.data.status})]})]}),renderForm:n=>e.jsxs(i,{gap:"sm",align:"stretch",children:[e.jsx("textarea",{placeholder:"Order/Action required...",className:"p-2 border rounded min-h-[80px]",id:"decision-text"}),e.jsx("input",{type:"date",className:"p-2 border rounded",id:"decision-deadline"}),e.jsx(C,{variant:"primary",size:"sm",onClick:()=>{var g,v;const t=(g=document.getElementById("decision-text"))==null?void 0:g.value,l=(v=document.getElementById("decision-deadline"))==null?void 0:v.value;t&&l&&n({orderText:t,deadline:l})},children:"Add Decision"})]}),onAdd:n=>{const t={id:`decision-${Date.now()}`,orderText:n.orderText,deadline:n.deadline,relatedFindingIds:[],status:"pending"};a==null||a({decisions:[...s.decisions,t]})},onRemove:n=>{a==null||a({decisions:s.decisions.filter(t=>t.id!==n)})}})]}),On=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Document Generation"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"Review the compiled inspection document before presenting to the merchant."}),e.jsx(ue,{title:"Inspection Record",subtitle:`Case #${s.caseNumber}`,previewUrl:`/api/inspections/${s.id}/preview`,downloadUrl:`/api/inspections/${s.id}/download`,onDownload:()=>m.emit("UI:DOWNLOAD_DOCUMENT",{inspectionId:s.id}),onPrint:()=>m.emit("UI:PRINT_DOCUMENT",{inspectionId:s.id})}),e.jsx(x,{className:"p-4",children:e.jsxs(i,{gap:"md",align:"stretch",children:[e.jsx(r,{variant:"h4",children:"Document Sections"}),L.map(n=>e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:n.label}),n.steps.filter(t=>t.documentSection).map(t=>e.jsxs(c,{gap:"sm",className:"ml-4",children:[e.jsx(W,{className:"h-4 w-4 text-green-500"}),e.jsx(r,{variant:"small",children:t.documentSection})]},t.id))]},n.id))]})})]}),Dn=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Merchant Review"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"Present the inspection document to the merchant for review."}),e.jsx(x,{className:"p-4 bg-blue-50 border-blue-200",children:e.jsx(i,{gap:"sm",align:"stretch",children:e.jsxs(c,{gap:"sm",children:[e.jsx(gs,{className:"h-5 w-5 text-blue-600"}),e.jsx(r,{className:"text-blue-700 font-medium",children:"The merchant has the right to review all findings and raise objections."})]})})}),e.jsx(ue,{title:"Inspection Record",subtitle:"For Merchant Review",previewUrl:`/api/inspections/${s.id}/preview`,isReadOnly:!0})]}),_n=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Objections"}),s.objections.length===0?e.jsx(x,{className:"p-4 bg-green-50 border-green-200",children:e.jsxs(c,{gap:"sm",children:[e.jsx(W,{className:"h-5 w-5 text-green-600"}),e.jsx(r,{className:"text-green-700",children:"No objections have been raised by the merchant."})]})}):e.jsx(i,{gap:"md",align:"stretch",children:s.objections.map(n=>e.jsx(x,{className:"p-4",children:e.jsxs(i,{gap:"sm",align:"stretch",children:[e.jsxs(c,{justify:"between",children:[e.jsxs(O,{variant:"default",children:["Section: ",n.sectionRef]}),e.jsx(O,{variant:n.status==="resolved"?"success":"warning",children:n.status})]}),e.jsx(r,{children:n.objectionText}),n.response&&e.jsxs(d,{className:"bg-neutral-50 p-2 rounded",children:[e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Inspector Response:"}),e.jsx(r,{variant:"small",children:n.response})]})]})},n.id))}),e.jsx(be,{onSubmit:(n,t)=>{const l={id:`obj-${Date.now()}`,sectionRef:n,objectionText:t,status:"pending"};a==null||a({objections:[...s.objections,l]})}})]}),qn=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Closing Information"}),e.jsx(x,{className:"p-4",children:e.jsxs(i,{gap:"md",align:"stretch",children:[e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Inspection Start"}),e.jsx(r,{children:s.startDateTime||"Not recorded"})]}),e.jsxs(d,{children:[e.jsx(r,{variant:"small",className:"text-neutral-500 mb-1",children:"Inspection End"}),e.jsx("input",{type:"datetime-local",className:"w-full p-2 border rounded",value:s.endDateTime||"",onChange:n=>a==null?void 0:a({endDateTime:n.target.value})})]})]})}),e.jsx(ls,{items:s.timeline})]}),Bn=()=>e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(r,{variant:"h3",children:"Signatures"}),e.jsx(r,{variant:"body",className:"text-neutral-600",children:"Both the inspector and merchant representative must sign the inspection record."}),e.jsx(x,{className:"p-4",children:e.jsxs(i,{gap:"lg",align:"stretch",children:[e.jsx(Se,{title:"Inspector Signature",subtitle:s.inspector?`${s.inspector.name} ${s.inspector.surname}`:"Inspector",onCapture:n=>{a==null||a({inspectorSignature:n}),m.emit("UI:INSPECTOR_SIGNED",{inspectionId:s.id})}}),e.jsx(Se,{title:"Merchant Signature",subtitle:s.participants[0]?`${s.participants[0].name} ${s.participants[0].surname}`:"Company Representative",onCapture:n=>{a==null||a({merchantSignature:n}),m.emit("UI:MERCHANT_SIGNED",{inspectionId:s.id})}})]})}),(!s.inspectorSignature||!s.merchantSignature)&&e.jsx(x,{className:"p-4 bg-yellow-50 border-yellow-200",children:e.jsxs(c,{gap:"sm",children:[e.jsx(Pe,{className:"h-5 w-5 text-yellow-600"}),e.jsx(r,{className:"text-yellow-700",children:"Both signatures are required to complete the inspection (ZIN Art. 28)"})]})})]}),Mn=()=>{var n;return e.jsxs(i,{gap:"lg",align:"center",className:"py-8",children:[e.jsx(d,{className:"p-4 rounded-full bg-green-100",children:e.jsx(W,{className:"h-16 w-16 text-green-600"})}),e.jsx(r,{variant:"h2",children:"Inspection Complete"}),e.jsx(r,{variant:"body",className:"text-neutral-600 text-center max-w-md",children:"The inspection has been successfully completed. You can download the final document or archive it to the information system."}),e.jsx(x,{className:"p-4 w-full max-w-md",children:e.jsxs(i,{gap:"sm",align:"stretch",children:[e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Case Number"}),e.jsx(r,{weight:"medium",children:s.caseNumber})]}),e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Company"}),e.jsx(r,{weight:"medium",children:(n=s.company)==null?void 0:n.name})]}),e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Rules Checked"}),e.jsx(r,{weight:"medium",children:K})]}),e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Findings"}),e.jsx(r,{weight:"medium",children:s.findings.length})]}),e.jsxs(c,{justify:"between",children:[e.jsx(r,{children:"Decisions"}),e.jsx(r,{weight:"medium",children:s.decisions.length})]})]})}),e.jsxs(c,{gap:"md",children:[e.jsxs(C,{variant:"default",onClick:()=>m.emit("UI:DOWNLOAD_FINAL",{inspectionId:s.id}),children:[e.jsx(Y,{className:"h-4 w-4 mr-2"}),"Download PDF"]}),e.jsxs(C,{variant:"primary",onClick:()=>m.emit("UI:ARCHIVE_INSPECTION",{inspectionId:s.id}),children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),"Archive to System"]})]})]})},Ln=()=>{switch(A){case"case-info":return Sn();case"company-data":return Pn();case"participants":return Fn();case"field-selection":return Rn();case"rule-checking":return kn();case"findings":return En();case"decisions":return An();case"document-generation":return On();case"merchant-review":return Dn();case"objections":return _n();case"end-time":return qn();case"signatures":return Bn();case"complete":return Mn();default:return null}},zn=()=>{switch(A){case"case-info":return!!s.caseNumber&&!!s.inspector&&!!s.startDateTime;case"company-data":return!!s.company;case"participants":return s.participants.length>=1;case"field-selection":return!!s.selectedField;case"rule-checking":return K===Z;case"findings":return!0;case"decisions":return!0;case"document-generation":return!0;case"merchant-review":return!0;case"objections":return s.objections.every(n=>n.status==="resolved");case"end-time":return!!s.endDateTime;case"signatures":return!!s.inspectorSignature&&!!s.merchantSignature;case"complete":return!0;default:return!0}};return e.jsxs(i,{gap:"none",className:G("min-h-screen bg-neutral-50",B),children:[e.jsx(d,{className:"bg-white border-b sticky top-0 z-40",children:e.jsx(d,{className:"max-w-6xl mx-auto p-4",children:e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(i,{gap:"xs",children:[e.jsxs(r,{variant:"h3",children:["Field Inspection - ",s.caseNumber||"New"]}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:((ye=s.company)==null?void 0:ye.name)||"No company selected"})]}),e.jsx(Vn,{phase:Re(o)})]})})}),e.jsx(d,{className:"bg-white border-b",children:e.jsx(d,{className:"max-w-6xl mx-auto p-2",children:e.jsx(c,{gap:"none",className:"overflow-x-auto",children:L.map((n,t)=>{const g=n.steps.map(V=>J(V.id)).every(V=>V<P),v=n.id===o,H=n.icon;return e.jsx(d,{className:G("flex-1 p-3 border-b-2 transition-all",v&&"border-blue-500 bg-blue-50",g&&!v&&"border-green-500",!v&&!g&&"border-transparent"),children:e.jsxs(c,{gap:"sm",justify:"center",children:[g?e.jsx(W,{className:"h-5 w-5 text-green-500"}):e.jsx(H,{className:G("h-5 w-5",v?"text-blue-600":"text-neutral-400")}),e.jsx(r,{variant:"small",weight:v?"semibold":"normal",className:G(v&&"text-blue-700",g&&!v&&"text-green-700"),children:n.label})]})},n.id)})})})}),e.jsx(d,{className:"max-w-6xl mx-auto w-full px-4 py-4",children:e.jsx($n,{title:((Ie=L.find(n=>n.id===o))==null?void 0:Ie.label)||"",subtitle:`Step ${P+1} of ${M.length}`,phase:Re(o),steps:In.slice(J(((we=L.find(n=>n.id===o))==null?void 0:we.steps[0].id)||"case-info"),J(((Ne=L.find(n=>n.id===o))==null?void 0:Ne.steps[L.find(n=>n.id===o).steps.length-1].id)||"case-info")+1),compact:!0})}),e.jsx(d,{className:"max-w-6xl mx-auto w-full px-4 pb-24 flex-1",children:e.jsx(x,{className:"p-6",children:Ln()})}),e.jsx(d,{className:"bg-white border-t fixed bottom-0 left-0 right-0 z-40",children:e.jsx(d,{className:"max-w-6xl mx-auto p-4",children:e.jsxs(c,{justify:"between",align:"center",children:[e.jsxs(C,{variant:"default",onClick:wn,disabled:$,className:"gap-2",children:[e.jsx(ps,{className:"h-4 w-4"}),"Previous"]}),e.jsx(c,{gap:"sm",children:e.jsxs(C,{variant:"ghost",onClick:Cn,className:"gap-2",children:[e.jsx(us,{className:"h-4 w-4"}),"Save Draft"]})}),e.jsx(C,{variant:"primary",onClick:Nn,disabled:!zn(),className:"gap-2",children:F?e.jsxs(e.Fragment,{children:[e.jsx(W,{className:"h-4 w-4"}),"Archive Inspection"]}):e.jsxs(e.Fragment,{children:["Next",e.jsx(hs,{className:"h-4 w-4"})]})})]})})}),o==="content"&&e.jsx(cs,{actions:Tn,context:{inspectionId:s.id,currentStep:A}})]})};ve.displayName="InspectionProcessTemplate";ve.__docgenInfo={description:"",methods:[],displayName:"InspectionProcessTemplate",props:{data:{required:!0,tsType:{name:"InspectionData"},description:"Full inspection data"},availableInspectors:{required:!1,tsType:{name:"Array",elements:[{name:"Inspector"}],raw:"Inspector[]"},description:"Available inspectors for selection",defaultValue:{value:"[]",computed:!1}},availableFields:{required:!1,tsType:{name:"Array",elements:[{name:"InspectionField"}],raw:"InspectionField[]"},description:"Available inspection fields",defaultValue:{value:"[]",computed:!1}},companySearchResults:{required:!1,tsType:{name:"Array",elements:[{name:"EntitySearchItem"}],raw:"SearchResult[]"},description:"Company search results",defaultValue:{value:"[]",computed:!1}},isSearchingCompany:{required:!1,tsType:{name:"boolean"},description:"Is searching for company",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional class names"},onPhaseChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(phase: ProcessPhase) => void",signature:{arguments:[{type:{name:"union",raw:`| "introduction"
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
| "objections"`,elements:[{name:"literal",value:'"document-generation"'},{name:"literal",value:'"merchant-review"'},{name:"literal",value:'"objections"'}]},{name:"union",raw:'"end-time" | "signatures" | "complete"',elements:[{name:"literal",value:'"end-time"'},{name:"literal",value:'"signatures"'},{name:"literal",value:'"complete"'}]}]},name:"step"}],return:{name:"void"}}},description:"Step change handler"},onDataUpdate:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: Partial<InspectionData>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"InspectionData"}],raw:"Partial<InspectionData>"},name:"data"}],return:{name:"void"}}},description:"Data update handler"},onCompanySearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(query: string) => void",signature:{arguments:[{type:{name:"string"},name:"query"}],return:{name:"void"}}},description:"Company search handler"},onSaveDraft:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Save draft handler"},onComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Complete handler"}}};const At={title:"Clients/Inspection-System/Templates/InspectionProcessTemplate",component:ve,parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `}}},argTypes:{onPhaseChange:{action:"phaseChanged"},onStepChange:{action:"stepChanged"},onDataUpdate:{action:"dataUpdated"},onCompanySearch:{action:"companySearched"},onSaveDraft:{action:"draftSaved"},onComplete:{action:"completed"}}},p={id:"insp-1",name:"Janez",surname:"Novak",department:"Market Inspection",badgeNumber:"SI-1234"},D={id:"comp-1",name:"ABC Trading d.o.o.",legalName:"ABC Trading družba z omejeno odgovornostjo",registrationNumber:"1234567890",taxNumber:"SI12345678",address:{street:"Slovenska cesta 50",city:"Ljubljana",postalCode:"1000"}},_=[{id:"part-1",name:"Marija",surname:"Horvat",positionInCompany:"Director",contactInfo:"marija@abc-trading.si"},{id:"part-2",name:"Peter",surname:"Kranjc",positionInCompany:"Quality Manager",contactInfo:"peter@abc-trading.si"}],z=[{id:"rule-1",ruleText:"Business premises must display valid operating license",lawReference:{gazetteNumber:"43/07",article:"Art. 12"},severity:"critical",canBeSkipped:!1},{id:"rule-2",ruleText:"Price list must be visible to customers",lawReference:{gazetteNumber:"43/07",article:"Art. 15"},severity:"major",canBeSkipped:!1},{id:"rule-3",ruleText:"All products must have valid expiration dates displayed",lawReference:{gazetteNumber:"21/14",article:"Art. 8"},severity:"critical",canBeSkipped:!1},{id:"rule-4",ruleText:"Staff must have valid health certificates",lawReference:{gazetteNumber:"33/09",article:"Art. 22"},severity:"major",canBeSkipped:!1},{id:"rule-5",ruleText:"Fire extinguisher must be accessible and within inspection date",lawReference:{gazetteNumber:"52/07",article:"Art. 45"},severity:"minor",canBeSkipped:!0}],u=[{id:"field-1",name:"Merchants",description:"General merchant compliance inspection",ruleCount:58},{id:"field-2",name:"Food Safety",description:"Food handling and safety compliance",ruleCount:72},{id:"field-3",name:"Labor Law",description:"Employment and worker safety compliance",ruleCount:45}],k=(s={})=>({id:"insp-2024-001",caseNumber:"INS-2024-001234",inspector:void 0,company:void 0,participants:[],accompanyingPersons:[],selectedField:void 0,rules:[],ruleChecks:{},findings:[],decisions:[],objections:[],collectedDocuments:[],startDateTime:void 0,endDateTime:void 0,inspectorSignature:void 0,merchantSignature:void 0,currentPhase:"introduction",currentStep:"case-info",timeline:[],...s}),Q={name:"1.1 Introduction - Case Info",args:{data:k(),availableInspectors:[p],availableFields:u}},U={name:"1.2 Introduction - Company Data",args:{data:k({inspector:p,startDateTime:"2024-01-15T09:00",currentStep:"company-data"}),availableInspectors:[p],availableFields:u,companySearchResults:[{id:"comp-1",label:"ABC Trading d.o.o.",sublabel:"1234567890"},{id:"comp-2",label:"XYZ Import d.o.o.",sublabel:"0987654321"}]}},ee={name:"1.3 Introduction - Participants",args:{data:k({inspector:p,company:D,startDateTime:"2024-01-15T09:00",currentStep:"participants"}),availableInspectors:[p],availableFields:u}},ne={name:"1.4 Introduction - Field Selection",args:{data:k({inspector:p,company:D,participants:_,startDateTime:"2024-01-15T09:00",currentStep:"field-selection"}),availableInspectors:[p],availableFields:u}},se={name:"2.1 Content - Rule Checking",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"content",currentStep:"rule-checking",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible from entrance",photos:[]}}}),availableInspectors:[p],availableFields:u}},te={name:"2.2 Content - All Rules Checked",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"content",currentStep:"rule-checking",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"2 staff members missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}}}),availableInspectors:[p],availableFields:u}},re={name:"3.1 Preparation - Findings",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"preparation",currentStep:"findings",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"2 staff members missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}}}),availableInspectors:[p],availableFields:u}},ae={name:"3.2 Preparation - Decisions",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"preparation",currentStep:"decisions",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"2 staff members missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},findings:[{id:"find-1",description:"Price list not displayed in a visible location for customers",severity:"major",relatedRuleIds:["rule-2"],recommendation:"Install price list display at entrance"},{id:"find-2",description:"Two staff members working without valid health certificates",severity:"major",relatedRuleIds:["rule-4"],recommendation:"Obtain health certificates within 15 days"}]}),availableInspectors:[p],availableFields:u}},ie={name:"4.1 Record - Document Generation",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],rules:z,startDateTime:"2024-01-15T09:00",currentPhase:"record",currentStep:"document-generation",ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},findings:[{id:"find-1",description:"Price list violation",severity:"major",relatedRuleIds:["rule-2"],recommendation:"Fix display"}],decisions:[{id:"dec-1",orderText:"Display price list at entrance",deadline:"2024-02-01",relatedFindingIds:["find-1"],status:"pending"}]}),availableInspectors:[p],availableFields:u}},le={name:"4.2 Record - Merchant Review",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],startDateTime:"2024-01-15T09:00",currentPhase:"record",currentStep:"merchant-review",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}}}),availableInspectors:[p],availableFields:u}},ce={name:"4.3 Record - Objections",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],startDateTime:"2024-01-15T09:00",currentPhase:"record",currentStep:"objections",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},objections:[{id:"obj-1",sectionRef:"5.2",objectionText:"The price list was displayed but inspector did not check the back room",status:"pending"}]}),availableInspectors:[p],availableFields:u}},oe={name:"5.1 Closing - End Time",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],startDateTime:"2024-01-15T09:00",currentPhase:"closing",currentStep:"end-time",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},timeline:[{id:"t1",timestamp:"2024-01-15T09:00",type:"start",title:"Inspection Started",description:"Inspection began"},{id:"t2",timestamp:"2024-01-15T09:15",type:"note",title:"Introduction Complete",description:"Completed case info"},{id:"t3",timestamp:"2024-01-15T09:30",type:"rule_checked",title:"Rule Checking Started",description:"Rule checking started"},{id:"t4",timestamp:"2024-01-15T11:00",type:"finding",title:"Findings Recorded",description:"Findings recorded"},{id:"t5",timestamp:"2024-01-15T11:30",type:"document",title:"Document Generated",description:"Document generated"}]}),availableInspectors:[p],availableFields:u}},de={name:"5.2 Closing - Signatures",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],startDateTime:"2024-01-15T09:00",endDateTime:"2024-01-15T12:00",currentPhase:"closing",currentStep:"signatures",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}}}),availableInspectors:[p],availableFields:u}},me={name:"5.3 Closing - Complete",args:{data:k({inspector:p,company:D,participants:_,selectedField:u[0],startDateTime:"2024-01-15T09:00",endDateTime:"2024-01-15T12:00",currentPhase:"closing",currentStep:"complete",rules:z,ruleChecks:{"rule-1":{ruleId:"rule-1",answer:"compliant",photos:[]},"rule-2":{ruleId:"rule-2",answer:"non-compliant",notes:"Price list not visible",photos:[]},"rule-3":{ruleId:"rule-3",answer:"compliant",photos:[]},"rule-4":{ruleId:"rule-4",answer:"non-compliant",notes:"Missing certificates",photos:[]},"rule-5":{ruleId:"rule-5",answer:"compliant",photos:[]}},findings:[{id:"find-1",description:"Price list violation",severity:"major",relatedRuleIds:["rule-2"],recommendation:"Fix display"},{id:"find-2",description:"Missing health certificates",severity:"major",relatedRuleIds:["rule-4"],recommendation:"Obtain certificates"}],decisions:[{id:"dec-1",orderText:"Display price list",deadline:"2024-02-01",relatedFindingIds:["find-1"],status:"pending"},{id:"dec-2",orderText:"Obtain health certificates",deadline:"2024-02-01",relatedFindingIds:["find-2"],status:"pending"}],inspectorSignature:"data:image/png;base64,signature1...",merchantSignature:"data:image/png;base64,signature2..."}),availableInspectors:[p],availableFields:u}};var ke,Ee,Ae;Q.parameters={...Q.parameters,docs:{...(ke=Q.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  name: "1.1 Introduction - Case Info",
  args: {
    data: createBaseData(),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields
  }
}`,...(Ae=(Ee=Q.parameters)==null?void 0:Ee.docs)==null?void 0:Ae.source}}};var Oe,De,_e;U.parameters={...U.parameters,docs:{...(Oe=U.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
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
}`,...(_e=(De=U.parameters)==null?void 0:De.docs)==null?void 0:_e.source}}};var qe,Be,Me;ee.parameters={...ee.parameters,docs:{...(qe=ee.parameters)==null?void 0:qe.docs,source:{originalSource:`{
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
}`,...(Me=(Be=ee.parameters)==null?void 0:Be.docs)==null?void 0:Me.source}}};var Le,ze,Ve;ne.parameters={...ne.parameters,docs:{...(Le=ne.parameters)==null?void 0:Le.docs,source:{originalSource:`{
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
}`,...(Ve=(ze=ne.parameters)==null?void 0:ze.docs)==null?void 0:Ve.source}}};var $e,Ge,He;se.parameters={...se.parameters,docs:{...($e=se.parameters)==null?void 0:$e.docs,source:{originalSource:`{
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
}`,...(He=(Ge=se.parameters)==null?void 0:Ge.docs)==null?void 0:He.source}}};var Ze,Ke,We;te.parameters={...te.parameters,docs:{...(Ze=te.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
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
}`,...(We=(Ke=te.parameters)==null?void 0:Ke.docs)==null?void 0:We.source}}};var Ye,Xe,Je;re.parameters={...re.parameters,docs:{...(Ye=re.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
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
}`,...(Je=(Xe=re.parameters)==null?void 0:Xe.docs)==null?void 0:Je.source}}};var Qe,Ue,en;ae.parameters={...ae.parameters,docs:{...(Qe=ae.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
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
}`,...(en=(Ue=ae.parameters)==null?void 0:Ue.docs)==null?void 0:en.source}}};var nn,sn,tn;ie.parameters={...ie.parameters,docs:{...(nn=ie.parameters)==null?void 0:nn.docs,source:{originalSource:`{
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
}`,...(tn=(sn=ie.parameters)==null?void 0:sn.docs)==null?void 0:tn.source}}};var rn,an,ln;le.parameters={...le.parameters,docs:{...(rn=le.parameters)==null?void 0:rn.docs,source:{originalSource:`{
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
}`,...(ln=(an=le.parameters)==null?void 0:an.docs)==null?void 0:ln.source}}};var cn,on,dn;ce.parameters={...ce.parameters,docs:{...(cn=ce.parameters)==null?void 0:cn.docs,source:{originalSource:`{
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
}`,...(dn=(on=ce.parameters)==null?void 0:on.docs)==null?void 0:dn.source}}};var mn,pn,un;oe.parameters={...oe.parameters,docs:{...(mn=oe.parameters)==null?void 0:mn.docs,source:{originalSource:`{
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
}`,...(un=(pn=oe.parameters)==null?void 0:pn.docs)==null?void 0:un.source}}};var hn,gn,xn;de.parameters={...de.parameters,docs:{...(hn=de.parameters)==null?void 0:hn.docs,source:{originalSource:`{
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
}`,...(xn=(gn=de.parameters)==null?void 0:gn.docs)==null?void 0:xn.source}}};var fn,jn,bn;me.parameters={...me.parameters,docs:{...(fn=me.parameters)==null?void 0:fn.docs,source:{originalSource:`{
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
}`,...(bn=(jn=me.parameters)==null?void 0:jn.docs)==null?void 0:bn.source}}};const Ot=["Introduction_CaseInfo","Introduction_CompanyData","Introduction_Participants","Introduction_FieldSelection","Content_RuleChecking","Content_RuleCheckingComplete","Preparation_Findings","Preparation_Decisions","Record_DocumentGeneration","Record_MerchantReview","Record_Objections","Closing_EndTime","Closing_Signatures","Closing_Complete"];export{me as Closing_Complete,oe as Closing_EndTime,de as Closing_Signatures,se as Content_RuleChecking,te as Content_RuleCheckingComplete,Q as Introduction_CaseInfo,U as Introduction_CompanyData,ne as Introduction_FieldSelection,ee as Introduction_Participants,ae as Preparation_Decisions,re as Preparation_Findings,ie as Record_DocumentGeneration,le as Record_MerchantReview,ce as Record_Objections,Ot as __namedExportsOrder,At as default};
