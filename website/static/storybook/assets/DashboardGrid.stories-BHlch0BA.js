import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c as p}from"./cn-BNf5BS2b.js";import{B as i}from"./Box-DYJzRMmP.js";import{T as l}from"./Typography-Wmkp-g7N.js";import"./index-GiUgBvb1.js";const D={sm:"gap-2",md:"gap-4",lg:"gap-6"},k={2:"grid-cols-2",3:"grid-cols-3",4:"grid-cols-4"},R={1:"col-span-1",2:"col-span-2",3:"col-span-3",4:"col-span-4"},G={1:"row-span-1",2:"row-span-2"},u=({columns:t=3,gap:d="md",cells:M,className:T})=>e.jsx("div",{className:p("grid w-full",k[t],D[d],T),children:M.map(s=>e.jsx("div",{className:p("border-2 border-[var(--color-border)] bg-[var(--color-card)]",R[s.colSpan||1],G[s.rowSpan||1]),children:s.content},s.id))});u.displayName="DashboardGrid";u.__docgenInfo={description:"DashboardGrid - Multi-column widget grid",methods:[],displayName:"DashboardGrid",props:{columns:{required:!1,tsType:{name:"union",raw:"2 | 3 | 4",elements:[{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"}]},description:"Number of columns",defaultValue:{value:"3",computed:!1}},gap:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"Gap between cells",defaultValue:{value:'"md"',computed:!1}},cells:{required:!0,tsType:{name:"Array",elements:[{name:"DashboardGridCell"}],raw:"DashboardGridCell[]"},description:"Cell definitions"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const B={title:"Organisms/Layout/DashboardGrid",component:u,parameters:{layout:"padded",backgrounds:{default:"wireframe"}},tags:["autodocs"]},a=({label:t,value:d})=>e.jsxs(i,{className:"p-4",children:[e.jsx(l,{variant:"caption",className:"text-neutral-500",children:t}),e.jsx(l,{variant:"h3",children:d})]}),m=()=>e.jsxs(i,{className:"p-4 h-full",children:[e.jsx(l,{variant:"h5",className:"mb-4",children:"Activity Feed"}),[1,2,3,4].map(t=>e.jsx(i,{className:"py-2 border-b border-neutral-200 last:border-b-0",children:e.jsxs(l,{variant:"small",children:["Event ",t," happened just now"]})},t))]}),A=()=>e.jsxs(i,{className:"p-4",children:[e.jsx(l,{variant:"h5",className:"mb-4",children:"Quick Actions"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("button",{className:"w-full py-2 px-4 border-2 border-black hover:bg-black hover:text-white transition-colors",children:"New Item"}),e.jsx("button",{className:"w-full py-2 px-4 border-2 border-black hover:bg-black hover:text-white transition-colors",children:"Export Data"})]})]}),n={args:{columns:3,gap:"md",cells:[{id:"stat-1",content:e.jsx(a,{label:"Total Users",value:"2,543"})},{id:"stat-2",content:e.jsx(a,{label:"Revenue",value:"$45,231"})},{id:"stat-3",content:e.jsx(a,{label:"Orders",value:"156"})},{id:"activity",content:e.jsx(m,{}),colSpan:2,rowSpan:2},{id:"actions",content:e.jsx(A,{})}]}},r={args:{columns:2,gap:"lg",cells:[{id:"stat-1",content:e.jsx(a,{label:"Total Users",value:"2,543"})},{id:"stat-2",content:e.jsx(a,{label:"Revenue",value:"$45,231"})},{id:"wide",content:e.jsx(m,{}),colSpan:2}]}},o={args:{columns:4,gap:"sm",cells:[{id:"stat-1",content:e.jsx(a,{label:"Users",value:"2,543"})},{id:"stat-2",content:e.jsx(a,{label:"Revenue",value:"$45K"})},{id:"stat-3",content:e.jsx(a,{label:"Orders",value:"156"})},{id:"stat-4",content:e.jsx(a,{label:"Rate",value:"12.5%"})}]}},c={args:{columns:4,gap:"md",cells:[{id:"wide",content:e.jsx(a,{label:"Main Metric",value:"$1.2M"}),colSpan:2},{id:"stat-1",content:e.jsx(a,{label:"Metric A",value:"234"})},{id:"stat-2",content:e.jsx(a,{label:"Metric B",value:"567"})},{id:"tall",content:e.jsx(m,{}),colSpan:3,rowSpan:2},{id:"actions",content:e.jsx(A,{}),rowSpan:2}]}};var v,b,g;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    columns: 3,
    gap: 'md',
    cells: [{
      id: 'stat-1',
      content: <StatCell label="Total Users" value="2,543" />
    }, {
      id: 'stat-2',
      content: <StatCell label="Revenue" value="$45,231" />
    }, {
      id: 'stat-3',
      content: <StatCell label="Orders" value="156" />
    }, {
      id: 'activity',
      content: <ActivityFeed />,
      colSpan: 2,
      rowSpan: 2
    }, {
      id: 'actions',
      content: <QuickActions />
    }]
  }
}`,...(g=(b=n.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var x,S,h;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    columns: 2,
    gap: 'lg',
    cells: [{
      id: 'stat-1',
      content: <StatCell label="Total Users" value="2,543" />
    }, {
      id: 'stat-2',
      content: <StatCell label="Revenue" value="$45,231" />
    }, {
      id: 'wide',
      content: <ActivityFeed />,
      colSpan: 2
    }]
  }
}`,...(h=(S=r.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var j,w,y;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    columns: 4,
    gap: 'sm',
    cells: [{
      id: 'stat-1',
      content: <StatCell label="Users" value="2,543" />
    }, {
      id: 'stat-2',
      content: <StatCell label="Revenue" value="$45K" />
    }, {
      id: 'stat-3',
      content: <StatCell label="Orders" value="156" />
    }, {
      id: 'stat-4',
      content: <StatCell label="Rate" value="12.5%" />
    }]
  }
}`,...(y=(w=o.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var f,C,N;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    columns: 4,
    gap: 'md',
    cells: [{
      id: 'wide',
      content: <StatCell label="Main Metric" value="$1.2M" />,
      colSpan: 2
    }, {
      id: 'stat-1',
      content: <StatCell label="Metric A" value="234" />
    }, {
      id: 'stat-2',
      content: <StatCell label="Metric B" value="567" />
    }, {
      id: 'tall',
      content: <ActivityFeed />,
      colSpan: 3,
      rowSpan: 2
    }, {
      id: 'actions',
      content: <QuickActions />,
      rowSpan: 2
    }]
  }
}`,...(N=(C=c.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};const E=["Default","TwoColumns","FourColumns","MixedSpanning"];export{n as Default,o as FourColumns,c as MixedSpanning,r as TwoColumns,E as __namedExportsOrder,B as default};
