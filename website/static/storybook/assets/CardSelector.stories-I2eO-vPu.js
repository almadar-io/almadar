import{j as A}from"./jsx-runtime-CDt2p4po.js";import{C as l}from"./CardSelector-DueahrGa.js";import{r as H}from"./index-GiUgBvb1.js";import{U as O}from"./utensils-Dc9stKFB.js";import{S as U}from"./shopping-cart-CIyk4pE7.js";import{c as N}from"./createLucideIcon-CbHznvEr.js";import{B as Z}from"./building-2-DIDfNmjr.js";import{T as _}from"./truck-CSOrl2J5.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./Card-BNT5PrJ5.js";import"./useEventBus-BNZMNlv8.js";import"./check-DliVttWt.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=N("Factory",[["path",{d:"M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"159hny"}],["path",{d:"M17 18h1",key:"uldtlt"}],["path",{d:"M12 18h1",key:"s9uhes"}],["path",{d:"M7 18h1",key:"1neino"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=N("Warehouse",[["path",{d:"M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z",key:"gksnxg"}],["path",{d:"M6 18h12",key:"9pbo8z"}],["path",{d:"M6 14h12",key:"4cwo0f"}],["rect",{width:"12",height:"12",x:"6",y:"10",key:"apd30q"}]]),ae={title:"Clients/Inspection-System/Molecules/CardSelector",component:l,parameters:{layout:"padded"},tags:["autodocs"]},e=[{id:"restaurant",title:"Restaurant",description:"Food service establishments",icon:O},{id:"retail",title:"Retail Store",description:"Consumer goods shops",icon:U},{id:"factory",title:"Factory",description:"Manufacturing facilities",icon:q},{id:"warehouse",title:"Warehouse",description:"Storage and distribution",icon:z},{id:"office",title:"Office Building",description:"Commercial office spaces",icon:Z},{id:"transport",title:"Transport",description:"Vehicles and logistics",icon:_}],o={args:{options:e,selectedId:null}},r={args:{options:e,selectedId:"restaurant"}},n={args:{options:e.slice(0,4),columns:2}},a={args:{options:e,columns:4}},i={args:{options:[...e.slice(0,3),{...e[3],disabled:!0},{...e[4],disabled:!0},e[5]],selectedId:"restaurant"}},c={args:{options:e.map(({icon:t,...s})=>s)}},p={render:()=>{const[t,s]=H.useState(null);return A.jsx(l,{options:e,selectedId:t,onChange:s})}},d={render:()=>{const[t,s]=H.useState([]);return A.jsx(l,{options:e,multiple:!0,selectedIds:t,onMultiChange:s})}};var u,m,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    options: inspectionTypes,
    selectedId: null
  }
}`,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var h,S,y;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    options: inspectionTypes,
    selectedId: "restaurant"
  }
}`,...(y=(S=r.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var f,C,T;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    options: inspectionTypes.slice(0, 4),
    columns: 2
  }
}`,...(T=(C=n.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var I,M,k;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    options: inspectionTypes,
    columns: 4
  }
}`,...(k=(M=a.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var b,x,W;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    options: [...inspectionTypes.slice(0, 3), {
      ...inspectionTypes[3],
      disabled: true
    }, {
      ...inspectionTypes[4],
      disabled: true
    }, inspectionTypes[5]],
    selectedId: "restaurant"
  }
}`,...(W=(x=i.parameters)==null?void 0:x.docs)==null?void 0:W.source}}};var F,V,w;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    options: inspectionTypes.map(({
      icon,
      ...rest
    }) => rest)
  }
}`,...(w=(V=c.parameters)==null?void 0:V.docs)==null?void 0:w.source}}};var j,D,v;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return <CardSelector options={inspectionTypes} selectedId={selected} onChange={setSelected} />;
  }
}`,...(v=(D=p.parameters)==null?void 0:D.docs)==null?void 0:v.source}}};var B,E,R;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return <CardSelector options={inspectionTypes} multiple selectedIds={selected} onMultiChange={setSelected} />;
  }
}`,...(R=(E=d.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};const ie=["Default","WithSelection","TwoColumns","FourColumns","WithDisabled","NoIcons","Interactive","MultiSelect"];export{o as Default,a as FourColumns,p as Interactive,d as MultiSelect,c as NoIcons,n as TwoColumns,i as WithDisabled,r as WithSelection,ie as __namedExportsOrder,ae as default};
