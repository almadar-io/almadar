import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c as u}from"./cn-BNf5BS2b.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{B as x}from"./Box-DYJzRMmP.js";import{r as C}from"./index-GiUgBvb1.js";const E=()=>e.jsx("div",{className:"flex items-center justify-center h-full border-2 border-dashed border-[var(--color-border)]",children:e.jsx(r,{variant:"body2",className:"text-[var(--color-muted-foreground)]",children:"Select an item to view details"})}),c=({master:t,detail:a,emptyDetail:s,hasSelection:h=!1,masterWidth:i="350px",className:W,masterClassName:M,detailClassName:q})=>(i.endsWith("%")&&parseInt(i,10),e.jsxs("div",{className:u("flex h-full w-full",W),style:{display:"grid",gridTemplateColumns:i.endsWith("%")?`${i} 1fr`:`${i} 1fr`},children:[e.jsx("div",{className:u("border-r-2 border-[var(--color-border)] overflow-auto",M),children:t}),e.jsx("div",{className:u("overflow-auto",q),children:h?a:s||e.jsx(E,{})})]}));c.displayName="MasterDetail";c.__docgenInfo={description:"MasterDetail - List + detail split layout",methods:[],displayName:"MasterDetail",props:{master:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Master panel content (usually a list)"},detail:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Detail panel content"},emptyDetail:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content shown when nothing is selected"},hasSelection:{required:!1,tsType:{name:"boolean"},description:"Whether an item is currently selected",defaultValue:{value:"false",computed:!1}},masterWidth:{required:!1,tsType:{name:"string"},description:"Width of master panel (e.g., '350px', '30%')",defaultValue:{value:'"350px"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},masterClassName:{required:!1,tsType:{name:"string"},description:"Class for master pane"},detailClassName:{required:!1,tsType:{name:"string"},description:"Class for detail pane"}}};const F={title:"Organisms/Layout/MasterDetail",component:c,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},m=[{id:"1",title:"Item 1",description:"First item description"},{id:"2",title:"Item 2",description:"Second item description"},{id:"3",title:"Item 3",description:"Third item description"},{id:"4",title:"Item 4",description:"Fourth item description"}],p=({selectedId:t,onSelect:a})=>e.jsxs(x,{className:"h-full",children:[e.jsx(x,{paddingX:"md",paddingY:"sm",border:!0,className:"border-b-2 border-x-0 border-t-0 border-black",children:e.jsx(r,{variant:"h5",children:"Items"})}),e.jsx("div",{children:m.map(s=>e.jsxs("button",{onClick:()=>a(s.id),className:`w-full text-left px-4 py-3 border-b-2 border-black transition-colors ${t===s.id?"bg-black text-white":"hover:bg-neutral-100"}`,children:[e.jsx(r,{variant:"body1",weight:"semibold",children:s.title}),e.jsx(r,{variant:"caption",className:t===s.id?"text-neutral-300":"text-neutral-500",children:s.description})]},s.id))})]}),f=({item:t})=>e.jsxs(x,{className:"p-6",children:[e.jsx(r,{variant:"h3",children:t.title}),e.jsx(r,{variant:"body1",className:"mt-4 text-neutral-600",children:t.description}),e.jsx(r,{variant:"body2",className:"mt-4",children:"This is the detail view for the selected item. In a real application, this would show comprehensive information about the item."})]}),L=()=>{const[t,a]=C.useState(),s=m.find(h=>h.id===t);return e.jsx(c,{master:e.jsx(p,{selectedId:t,onSelect:a}),detail:s&&e.jsx(f,{item:s}),hasSelection:!!s,masterWidth:"300px"})},o={render:()=>e.jsx(L,{}),decorators:[t=>e.jsx("div",{style:{height:"500px",width:"100%"},children:e.jsx(t,{})})]},d={args:{master:e.jsx(p,{selectedId:"1",onSelect:()=>{}}),detail:e.jsx(f,{item:m[0]}),hasSelection:!0,masterWidth:"350px"},decorators:[t=>e.jsx("div",{style:{height:"500px",width:"100%"},children:e.jsx(t,{})})]},l={args:{master:e.jsx(p,{selectedId:void 0,onSelect:()=>{}}),detail:null,hasSelection:!1,masterWidth:"300px"},decorators:[t=>e.jsx("div",{style:{height:"500px",width:"100%"},children:e.jsx(t,{})})]},n={args:{master:e.jsx(p,{selectedId:"2",onSelect:()=>{}}),detail:e.jsx(f,{item:m[1]}),hasSelection:!0,masterWidth:"40%"},decorators:[t=>e.jsx("div",{style:{height:"500px",width:"100%"},children:e.jsx(t,{})})]};var y,v,g;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <InteractiveExample />,
  decorators: [Story => <div style={{
    height: '500px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(g=(v=o.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var j,S,b;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    master: <MasterList selectedId="1" onSelect={() => {}} />,
    detail: <DetailView item={sampleItems[0]} />,
    hasSelection: true,
    masterWidth: '350px'
  },
  decorators: [Story => <div style={{
    height: '500px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(b=(S=d.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var w,N,I;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    master: <MasterList selectedId={undefined} onSelect={() => {}} />,
    detail: null,
    hasSelection: false,
    masterWidth: '300px'
  },
  decorators: [Story => <div style={{
    height: '500px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(I=(N=l.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var D,R,T;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    master: <MasterList selectedId="2" onSelect={() => {}} />,
    detail: <DetailView item={sampleItems[1]} />,
    hasSelection: true,
    masterWidth: '40%'
  },
  decorators: [Story => <div style={{
    height: '500px',
    width: '100%'
  }}>
                <Story />
            </div>]
}`,...(T=(R=n.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};const O=["Default","WithSelection","NoSelection","WidePanel"];export{o as Default,l as NoSelection,n as WidePanel,d as WithSelection,O as __namedExportsOrder,F as default};
