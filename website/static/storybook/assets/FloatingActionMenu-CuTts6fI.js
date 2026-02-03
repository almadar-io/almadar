import{j as t}from"./jsx-runtime-CDt2p4po.js";import{r as n}from"./index-GiUgBvb1.js";import{c as i}from"./cn-BNf5BS2b.js";import{B as m}from"./Box-DYJzRMmP.js";import{V as u,H as C}from"./Stack-1XI3stiC.js";import{T as v}from"./Typography-Wmkp-g7N.js";import{u as w}from"./useEventBus-BNZMNlv8.js";import{U as j}from"./user-plus-BlQDsowZ.js";import{C as y}from"./camera-Cr6IZ-wx.js";import{F as A}from"./file-text-DZQctV9o.js";import{A as N}from"./alert-circle-CBFh8Gcj.js";import{P as T}from"./phone-XSC4O3No.js";import{X as k}from"./x-prXd1WI5.js";import{P}from"./plus-jSzJaRn3.js";const _=[{id:"add_participant",label:"Add Participant",icon:j,color:"text-purple-600",bgColor:"bg-purple-100"},{id:"take_photo",label:"Take Photo",icon:y,color:"text-blue-600",bgColor:"bg-blue-100"},{id:"add_note",label:"Add Note",icon:A,color:"text-green-600",bgColor:"bg-green-100"},{id:"record_objection",label:"Record Objection",icon:N,color:"text-amber-600",bgColor:"bg-amber-100"},{id:"sos",label:"Emergency",icon:T,color:"text-red-600",bgColor:"bg-red-100"}],F={"bottom-right":"right-4 bottom-4","bottom-left":"left-4 bottom-4","bottom-center":"left-1/2 -translate-x-1/2 bottom-4"},b=({actions:p=_,context:c={},position:g="bottom-right",className:f,onAction:r})=>{const d=w(),[o,a]=n.useState(!1),l=n.useRef(null);n.useEffect(()=>{const e=s=>{l.current&&!l.current.contains(s.target)&&a(!1)};return o&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[o]);const h=n.useCallback(e=>{r==null||r(e),d.emit("UI:QUICK_ACTION",{action:e,context:c}),a(!1)},[c,r,d]),x=n.useCallback(()=>{a(e=>!e)},[]);return t.jsx(m,{ref:l,className:i("fixed z-50",F[g],f),children:t.jsxs(u,{gap:"sm",align:"end",children:[o&&t.jsx(u,{gap:"sm",align:"end",children:p.map(e=>{const s=e.icon;return t.jsxs(C,{gap:"sm",align:"center",children:[t.jsx(m,{padding:"sm",rounded:"lg",className:"bg-white shadow-lg",children:t.jsx(v,{variant:"small",className:"font-medium whitespace-nowrap",children:e.label})}),t.jsx("button",{type:"button",onClick:()=>h(e.id),className:i("p-3 rounded-full shadow-lg transition-transform hover:scale-110",e.bgColor||"bg-white",e.color||"text-neutral-700"),children:t.jsx(s,{className:"h-5 w-5"})})]},e.id)})}),t.jsx("button",{type:"button",onClick:x,className:i("p-4 rounded-full shadow-lg transition-all",o?"bg-neutral-800 text-white rotate-45":"bg-blue-600 text-white hover:bg-blue-700"),children:o?t.jsx(k,{className:"h-6 w-6"}):t.jsx(P,{className:"h-6 w-6"})})]})})};b.displayName="FloatingActionMenu";b.__docgenInfo={description:"",methods:[],displayName:"FloatingActionMenu",props:{actions:{required:!1,tsType:{name:"Array",elements:[{name:"FloatingAction"}],raw:"FloatingAction[]"},description:"Available actions",defaultValue:{value:`[
  {
    id: "add_participant",
    label: "Add Participant",
    icon: UserPlus,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "take_photo",
    label: "Take Photo",
    icon: Camera,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "add_note",
    label: "Add Note",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "record_objection",
    label: "Record Objection",
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    id: "sos",
    label: "Emergency",
    icon: Phone,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
]`,computed:!1}},context:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:"Context data for events",defaultValue:{value:"{}",computed:!1}},position:{required:!1,tsType:{name:"union",raw:'"bottom-right" | "bottom-left" | "bottom-center"',elements:[{name:"literal",value:'"bottom-right"'},{name:"literal",value:'"bottom-left"'},{name:"literal",value:'"bottom-center"'}]},description:"Position",defaultValue:{value:'"bottom-right"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onAction:{required:!1,tsType:{name:"signature",type:"function",raw:"(actionId: string) => void",signature:{arguments:[{type:{name:"string"},name:"actionId"}],return:{name:"void"}}},description:"Action click handler"}}};export{b as F};
