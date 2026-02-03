import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as T}from"./index-GiUgBvb1.js";import{c as se}from"./cn-BNf5BS2b.js";import{C as ne}from"./Card-BNT5PrJ5.js";import{B as ie}from"./Badge-Dd4QqFOk.js";import{B as oe}from"./Button-B7t-_IKa.js";import{B as A}from"./Box-DYJzRMmP.js";import{V as C,H as d}from"./Stack-1XI3stiC.js";import{T as c}from"./Typography-Wmkp-g7N.js";import{u as le}from"./useEventBus-BNZMNlv8.js";import{C as me}from"./check-circle-2-D18fmE9T.js";import{W as de}from"./wheat-Cj9YfHNs.js";import{C as ce}from"./calendar-rGtwHcH_.js";import{U as ue}from"./users-CV1mGUsS.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const pe=r=>r?(typeof r=="string"?new Date(r):r).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"",ge=(r,o="$")=>r===void 0?"":`${o}${r.toLocaleString()}`,s=({entity:r,data:o,title:Q,amount:K,currency:x="$",date:X,parties:Y,entityType:n="Harvest",itemActions:D=[],event:l,onClick:m,compact:w=!1,className:Z})=>{const i=le(),t=r??o??{title:Q??"Harvest",amount:K,currency:x,date:X,parties:Y},{title:ee,amount:j,date:H,parties:v,status:re="completed"}=t,k=!!(l||m),S=re==="pending",ae=T.useCallback(()=>{l?i.emit(`UI:${l}`,{row:t,entity:n}):m?m(t):i.emit("UI:VIEW",{row:t,entity:n})},[l,i,t,n,m]),te=T.useCallback(a=>b=>{var N;b.stopPropagation(),a.event&&i.emit(`UI:${a.event}`,{row:t,entity:n}),(N=a.onClick)==null||N.call(a,t)},[i,t,n]);return e.jsxs(ne,{className:se("relative overflow-hidden transition-all",w?"p-3":"p-4","bg-gradient-to-br from-amber-50 to-orange-50","border-amber-200",k&&"cursor-pointer hover:shadow-lg hover:scale-[1.02]",Z),onClick:k?ae:void 0,children:[e.jsx(A,{position:"absolute",className:"right-2 top-2",children:e.jsxs(ie,{variant:S?"warning":"success",size:"sm",className:"gap-1",children:[e.jsx(me,{className:"h-3 w-3"}),S?"Pending":"Completed"]})}),e.jsxs(C,{gap:"sm",children:[e.jsxs(d,{gap:"sm",align:"center",children:[e.jsx(A,{rounded:"full",padding:"sm",className:"bg-gradient-to-br from-amber-200 to-orange-200",children:e.jsx(de,{className:"h-6 w-6 text-amber-700"})}),e.jsxs(C,{gap:"none",children:[e.jsx(c,{variant:"h4",className:"text-neutral-800",children:ee}),j!==void 0&&e.jsx(c,{variant:"h3",className:"text-emerald-600",children:ge(j,x)})]})]}),!w&&e.jsxs(C,{gap:"xs",children:[H&&e.jsxs(d,{gap:"sm",align:"center",children:[e.jsx(ce,{className:"h-4 w-4 text-neutral-500"}),e.jsx(c,{variant:"body",className:"text-neutral-600",children:pe(H)})]}),v&&e.jsxs(d,{gap:"sm",align:"center",children:[e.jsx(ue,{className:"h-4 w-4 text-neutral-500"}),e.jsxs(c,{variant:"body",className:"text-neutral-600",children:[v.farmer," → ",v.buyer]})]})]}),D.length>0&&e.jsx(d,{gap:"sm",className:"border-t border-amber-200 pt-3",children:D.map((a,b)=>e.jsx(oe,{variant:a.variant??"secondary",size:"sm",onClick:te(a),children:a.label},b))})]})]})};s.displayName="HarvestCard";s.__docgenInfo={description:"",methods:[],displayName:"HarvestCard",props:{entity:{required:!1,tsType:{name:"HarvestEntity"},description:"Harvest data - can be individual props or a data object"},data:{required:!1,tsType:{name:"HarvestEntity"},description:"Alias for entity prop"},title:{required:!1,tsType:{name:"string"},description:"Harvest/transaction title (if not using data prop)"},amount:{required:!1,tsType:{name:"number"},description:"Transaction amount (if not using data prop)"},currency:{required:!1,tsType:{name:"string"},description:"Currency symbol",defaultValue:{value:'"$"',computed:!1}},date:{required:!1,tsType:{name:"union",raw:"Date | string",elements:[{name:"Date"},{name:"string"}]},description:"Completion date (if not using data prop)"},parties:{required:!1,tsType:{name:"signature",type:"object",raw:"{ farmer: string; buyer: string }",signature:{properties:[{key:"farmer",value:{name:"string",required:!0}},{key:"buyer",value:{name:"string",required:!0}}]}},description:"Transaction parties (if not using data prop)"},entityType:{required:!1,tsType:{name:"string"},description:"Entity type for event context",defaultValue:{value:'"Harvest"',computed:!1}},itemActions:{required:!1,tsType:{name:"unknown"},description:"Actions for this card",defaultValue:{value:"[]",computed:!1}},event:{required:!1,tsType:{name:"string"},description:"Event to emit on card click"},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: HarvestEntity) => void",signature:{arguments:[{type:{name:"HarvestEntity"},name:"item"}],return:{name:"void"}}},description:"Click handler callback"},compact:{required:!1,tsType:{name:"boolean"},description:"Compact display mode",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const Fe={title:"Clients/Winning-11/Molecules/HarvestCard",component:s,parameters:{layout:"centered"},tags:["autodocs"]},u={args:{title:"Organic Tomatoes Delivery",amount:2500,date:new Date("2024-01-15"),parties:{farmer:"Green Valley Farm",buyer:"Fresh Market Co."}}},p={args:{title:"Partnership Agreement Signed",date:new Date("2024-01-10"),parties:{farmer:"Sunrise Orchards",buyer:"Local Grocery Chain"}}},g={args:{title:"Spring Harvest Complete",amount:15e3,date:new Date("2024-03-20"),parties:{farmer:"Heritage Grains Co.",buyer:"Artisan Bakery"},itemActions:[{label:"View Details",event:"VIEW"},{label:"Download Receipt",event:"DOWNLOAD",variant:"ghost"}]}},f={args:{title:"First Transaction",amount:500}},y={args:{data:{id:"harvest-123",title:"Wheat Delivery Q4",amount:8500,currency:"$",date:"2024-12-01",parties:{farmer:"Prairie Fields Farm",buyer:"Regional Mill"}}}},h={render:()=>e.jsxs("div",{className:"grid w-[600px] grid-cols-2 gap-4",children:[e.jsx(s,{title:"Organic Produce",amount:3200,date:new Date("2024-01-15"),parties:{farmer:"Green Valley",buyer:"Fresh Foods"}}),e.jsx(s,{title:"Dairy Products",amount:1800,date:new Date("2024-01-12"),parties:{farmer:"Mountain Dairy",buyer:"Local Market"}}),e.jsx(s,{title:"Grain Shipment",amount:12e3,date:new Date("2024-01-10"),parties:{farmer:"Heritage Grains",buyer:"City Bakery"}}),e.jsx(s,{title:"Fruit Harvest",amount:4500,date:new Date("2024-01-08"),parties:{farmer:"Sunrise Orchards",buyer:"Juice Co."}})]})};var F,W,q;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    title: "Organic Tomatoes Delivery",
    amount: 2500,
    date: new Date("2024-01-15"),
    parties: {
      farmer: "Green Valley Farm",
      buyer: "Fresh Market Co."
    }
  }
}`,...(q=(W=u.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var V,G,E;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    title: "Partnership Agreement Signed",
    date: new Date("2024-01-10"),
    parties: {
      farmer: "Sunrise Orchards",
      buyer: "Local Grocery Chain"
    }
  }
}`,...(E=(G=p.parameters)==null?void 0:G.docs)==null?void 0:E.source}}};var O,P,B;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    title: "Spring Harvest Complete",
    amount: 15000,
    date: new Date("2024-03-20"),
    parties: {
      farmer: "Heritage Grains Co.",
      buyer: "Artisan Bakery"
    },
    itemActions: [{
      label: "View Details",
      event: "VIEW"
    }, {
      label: "Download Receipt",
      event: "DOWNLOAD",
      variant: "ghost"
    }]
  }
}`,...(B=(P=g.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var M,I,$;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    title: "First Transaction",
    amount: 500
  }
}`,...($=(I=f.parameters)==null?void 0:I.docs)==null?void 0:$.source}}};var L,U,R;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    data: {
      id: "harvest-123",
      title: "Wheat Delivery Q4",
      amount: 8500,
      currency: "$",
      date: "2024-12-01",
      parties: {
        farmer: "Prairie Fields Farm",
        buyer: "Regional Mill"
      }
    }
  }
}`,...(R=(U=y.parameters)==null?void 0:U.docs)==null?void 0:R.source}}};var _,z,J;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="grid w-[600px] grid-cols-2 gap-4">
      <HarvestCard title="Organic Produce" amount={3200} date={new Date("2024-01-15")} parties={{
      farmer: "Green Valley",
      buyer: "Fresh Foods"
    }} />
      <HarvestCard title="Dairy Products" amount={1800} date={new Date("2024-01-12")} parties={{
      farmer: "Mountain Dairy",
      buyer: "Local Market"
    }} />
      <HarvestCard title="Grain Shipment" amount={12000} date={new Date("2024-01-10")} parties={{
      farmer: "Heritage Grains",
      buyer: "City Bakery"
    }} />
      <HarvestCard title="Fruit Harvest" amount={4500} date={new Date("2024-01-08")} parties={{
      farmer: "Sunrise Orchards",
      buyer: "Juice Co."
    }} />
    </div>
}`,...(J=(z=h.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};const We=["Default","WithoutAmount","WithActions","MinimalInfo","WithDataProp","CardGrid"];export{h as CardGrid,u as Default,f as MinimalInfo,g as WithActions,y as WithDataProp,p as WithoutAmount,We as __namedExportsOrder,Fe as default};
