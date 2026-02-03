import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as h}from"./index-GiUgBvb1.js";import{c as E}from"./cn-BNf5BS2b.js";import{B as d}from"./Box-DYJzRMmP.js";import{V as t,H as u}from"./Stack-1XI3stiC.js";import{T as s}from"./Typography-Wmkp-g7N.js";import{B as P}from"./Button-B7t-_IKa.js";import{C as de}from"./Card-BNT5PrJ5.js";import{I as V}from"./Input-DhFss4oc.js";import{u as pe}from"./useEventBus-BNZMNlv8.js";import{S as ge}from"./scale-UkxLwacR.js";import{c as he}from"./createLucideIcon-CbHznvEr.js";import{A as q}from"./activity-DUdIMRW5.js";import{X as ye}from"./x-prXd1WI5.js";import{S as xe}from"./save-DyJeJ3Zl.js";import{M as fe}from"./minus-CvoF9liV.js";import{T as be}from"./trending-up-D7By3kN5.js";import{T as we}from"./trending-down-Dv2LyMoL.js";import"./loader-2-DXp1ic5P.js";import"./chevron-down-BQmz_Bpa.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=he("Ruler",[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",key:"icamh8"}],["path",{d:"m14.5 12.5 2-2",key:"inckbg"}],["path",{d:"m11.5 9.5 2-2",key:"fmmyf7"}],["path",{d:"m8.5 6.5 2-2",key:"vc6u1g"}],["path",{d:"m17.5 15.5 2-2",key:"wo5hmg"}]]),y=[{key:"weight",label:"Weight",unit:"kg",icon:ge,group:"basic"},{key:"height",label:"Height",unit:"cm",icon:n,group:"basic"},{key:"bodyFat",label:"Body Fat",unit:"%",icon:q,group:"composition"},{key:"muscleMass",label:"Muscle Mass",unit:"kg",icon:q,group:"composition"},{key:"chest",label:"Chest",unit:"cm",icon:n,group:"circumference"},{key:"waist",label:"Waist",unit:"cm",icon:n,group:"circumference"},{key:"hips",label:"Hips",unit:"cm",icon:n,group:"circumference"},{key:"leftArm",label:"Left Arm",unit:"cm",icon:n,group:"arms"},{key:"rightArm",label:"Right Arm",unit:"cm",icon:n,group:"arms"},{key:"leftThigh",label:"Left Thigh",unit:"cm",icon:n,group:"legs"},{key:"rightThigh",label:"Right Thigh",unit:"cm",icon:n,group:"legs"}],je=(x,l,I=!1)=>{if(x===void 0||l===void 0)return null;const r=x-l;if(Math.abs(r)<.1)return{icon:fe,color:"text-neutral-400",text:"same"};const c=I?r<0:r>0;return{icon:c?be:we,color:c?"text-green-500":"text-red-500",text:`${r>0?"+":""}${r.toFixed(1)}`}},B=({initialData:x,previousData:l,showComparison:I=!0,traineeId:r,entity:c="ProgressEntry",className:ie,onSave:f,onCancel:b})=>{const w=pe(),[i,F]=h.useState({date:new Date().toISOString().split("T")[0],traineeId:r,...x}),oe=h.useCallback((a,o)=>{const j=o===""?void 0:parseFloat(o);F(S=>({...S,[a]:j}))},[]),le=h.useCallback(a=>{F(o=>({...o,notes:a}))},[]),ce=h.useCallback(()=>{const a={...i,date:i.date||new Date().toISOString(),traineeId:i.traineeId||r};w.emit("UI:SAVE",{row:a,entity:c}),f==null||f(a)},[w,i,r,c,f]),me=h.useCallback(()=>{w.emit("UI:CANCEL",{entity:c}),b==null||b()},[w,c,b]),p={basic:y.filter(a=>a.group==="basic"),composition:y.filter(a=>a.group==="composition"),circumference:y.filter(a=>a.group==="circumference"),arms:y.filter(a=>a.group==="arms"),legs:y.filter(a=>a.group==="legs")},g=a=>{const o=a.icon,j=i[a.key],S=l==null?void 0:l[a.key],m=I&&l?je(j,S,a.key==="bodyFat"||a.key==="waist"):null,A=m==null?void 0:m.icon;return e.jsxs(t,{gap:"xs",children:[e.jsxs(u,{justify:"between",align:"center",children:[e.jsxs(u,{gap:"xs",align:"center",children:[e.jsx(o,{className:"h-3 w-3 text-neutral-400"}),e.jsx(s,{variant:"small",className:"text-neutral-600",children:a.label})]}),m&&A&&e.jsxs(u,{gap:"xs",align:"center",children:[e.jsx(A,{className:E("h-3 w-3",m.color)}),e.jsx(s,{variant:"small",className:m.color,children:m.text})]})]}),e.jsxs(u,{gap:"sm",align:"center",children:[e.jsx(V,{type:"number",step:"0.1",value:j??"",onChange:ue=>oe(a.key,ue.target.value),placeholder:`Enter ${a.label.toLowerCase()}`,className:"flex-1"}),e.jsx(s,{variant:"small",className:"text-neutral-500 w-8",children:a.unit})]})]},a.key)};return e.jsx(de,{className:E("p-4",ie),children:e.jsxs(t,{gap:"lg",children:[e.jsx(u,{justify:"between",align:"center",children:e.jsxs(u,{gap:"sm",align:"center",children:[e.jsx(d,{display:"flex",rounded:"lg",padding:"sm",className:"items-center justify-center bg-teal-100",children:e.jsx(n,{className:"h-5 w-5 text-teal-600"})}),e.jsxs(t,{gap:"none",children:[e.jsx(s,{variant:"h4",children:"Body Measurements"}),e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Record current body measurements"})]})]})}),e.jsxs(t,{gap:"xs",children:[e.jsx(s,{variant:"label",children:"Date"}),e.jsx(V,{type:"date",value:typeof i.date=="string"?i.date.split("T")[0]:new Date().toISOString().split("T")[0],onChange:a=>F(o=>({...o,date:a.target.value}))})]}),e.jsxs(t,{gap:"md",children:[e.jsx(s,{variant:"label",className:"text-neutral-700",children:"Basic Measurements"}),e.jsx(d,{className:"grid grid-cols-2 gap-4",children:p.basic.map(g)})]}),e.jsxs(t,{gap:"md",children:[e.jsx(s,{variant:"label",className:"text-neutral-700",children:"Body Composition"}),e.jsx(d,{className:"grid grid-cols-2 gap-4",children:p.composition.map(g)})]}),e.jsxs(t,{gap:"md",children:[e.jsx(s,{variant:"label",className:"text-neutral-700",children:"Circumference"}),e.jsx(d,{className:"grid grid-cols-3 gap-4",children:p.circumference.map(g)})]}),e.jsxs(t,{gap:"md",children:[e.jsx(s,{variant:"label",className:"text-neutral-700",children:"Arms"}),e.jsx(d,{className:"grid grid-cols-2 gap-4",children:p.arms.map(g)})]}),e.jsxs(t,{gap:"md",children:[e.jsx(s,{variant:"label",className:"text-neutral-700",children:"Legs"}),e.jsx(d,{className:"grid grid-cols-2 gap-4",children:p.legs.map(g)})]}),e.jsxs(t,{gap:"xs",children:[e.jsx(s,{variant:"label",children:"Notes"}),e.jsx("textarea",{value:i.notes||"",onChange:a=>le(a.target.value),placeholder:"Add any notes about the measurements...",className:"w-full min-h-[80px] p-3 border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"})]}),e.jsxs(u,{gap:"sm",justify:"end",className:"border-t border-neutral-100 pt-4",children:[e.jsxs(P,{variant:"secondary",onClick:me,children:[e.jsx(ye,{className:"h-4 w-4 mr-1"}),"Cancel"]}),e.jsxs(P,{variant:"primary",onClick:ce,children:[e.jsx(xe,{className:"h-4 w-4 mr-1"}),"Save Measurements"]})]})]})})};B.displayName="BodyMeasurementInput";B.__docgenInfo={description:"",methods:[],displayName:"BodyMeasurementInput",props:{initialData:{required:!1,tsType:{name:"Partial",elements:[{name:"BodyMeasurementData"}],raw:"Partial<BodyMeasurementData>"},description:"Initial data (for editing)"},previousData:{required:!1,tsType:{name:"Partial",elements:[{name:"BodyMeasurementData"}],raw:"Partial<BodyMeasurementData>"},description:"Previous measurements for comparison"},showComparison:{required:!1,tsType:{name:"boolean"},description:"Show comparison with previous",defaultValue:{value:"true",computed:!1}},traineeId:{required:!1,tsType:{name:"string"},description:"Trainee ID"},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"ProgressEntry"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onSave:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: BodyMeasurementData) => void",signature:{arguments:[{type:{name:"BodyMeasurementData"},name:"data"}],return:{name:"void"}}},description:"Callback when saved"},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when cancelled"}}};const Oe={title:"Blaz-Klemenc/Molecules/BodyMeasurementInput",component:B,parameters:{layout:"padded"},tags:["autodocs"]},ne={weight:82,height:180,bodyFat:18,muscleMass:38,chest:102,waist:84,hips:98,leftArm:35,rightArm:35.5,leftThigh:58,rightThigh:58.5},v={args:{}},M={args:{initialData:{weight:80,height:180,bodyFat:16,muscleMass:40}}},k={args:{initialData:{weight:80,height:180,bodyFat:16,muscleMass:40,chest:104,waist:82},previousData:ne,showComparison:!0}},C={args:{initialData:{weight:80,height:180,bodyFat:16,muscleMass:40,chest:104,waist:82,hips:97,leftArm:36,rightArm:36.5,leftThigh:59,rightThigh:59,notes:"Good progress this month. Visible muscle definition improving."},previousData:ne,showComparison:!0}},D={args:{initialData:{weight:85,bodyFat:20},showComparison:!1}},N={args:{traineeId:"trainee-123",initialData:{weight:75,height:175}}},T={args:{initialData:{weight:78,bodyFat:14,muscleMass:42,waist:78},previousData:{weight:82,bodyFat:18,muscleMass:38,waist:84},showComparison:!0}};var W,L,R;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {}
}`,...(R=(L=v.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var H,O,_;M.parameters={...M.parameters,docs:{...(H=M.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    initialData: {
      weight: 80,
      height: 180,
      bodyFat: 16,
      muscleMass: 40
    }
  }
}`,...(_=(O=M.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var G,U,$;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    initialData: {
      weight: 80,
      height: 180,
      bodyFat: 16,
      muscleMass: 40,
      chest: 104,
      waist: 82
    },
    previousData: previousMeasurements,
    showComparison: true
  }
}`,...($=(U=k.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var z,K,X;C.parameters={...C.parameters,docs:{...(z=C.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    initialData: {
      weight: 80,
      height: 180,
      bodyFat: 16,
      muscleMass: 40,
      chest: 104,
      waist: 82,
      hips: 97,
      leftArm: 36,
      rightArm: 36.5,
      leftThigh: 59,
      rightThigh: 59,
      notes: "Good progress this month. Visible muscle definition improving."
    },
    previousData: previousMeasurements,
    showComparison: true
  }
}`,...(X=(K=C.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var Z,J,Q;D.parameters={...D.parameters,docs:{...(Z=D.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    initialData: {
      weight: 85,
      bodyFat: 20
    },
    showComparison: false
  }
}`,...(Q=(J=D.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Y,ee,ae;N.parameters={...N.parameters,docs:{...(Y=N.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    traineeId: "trainee-123",
    initialData: {
      weight: 75,
      height: 175
    }
  }
}`,...(ae=(ee=N.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var se,te,re;T.parameters={...T.parameters,docs:{...(se=T.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    initialData: {
      weight: 78,
      bodyFat: 14,
      muscleMass: 42,
      waist: 78
    },
    previousData: {
      weight: 82,
      bodyFat: 18,
      muscleMass: 38,
      waist: 84
    },
    showComparison: true
  }
}`,...(re=(te=T.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const _e=["Default","WithInitialData","WithPreviousComparison","FullMeasurements","NoComparison","WithTraineeId","ImprovedMetrics"];export{v as Default,C as FullMeasurements,T as ImprovedMetrics,D as NoComparison,M as WithInitialData,k as WithPreviousComparison,N as WithTraineeId,_e as __namedExportsOrder,Oe as default};
