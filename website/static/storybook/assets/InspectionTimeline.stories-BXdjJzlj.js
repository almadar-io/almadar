import{I as b}from"./InspectionTimeline-DLPkAkh1.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./useEventBus-BNZMNlv8.js";import"./clock-DT9ve7xf.js";import"./createLucideIcon-CbHznvEr.js";import"./message-square-CSwv56un.js";import"./check-circle-DX_bNA1C.js";import"./file-text-DZQctV9o.js";import"./flag-CJoo5uXG.js";import"./alert-circle-CBFh8Gcj.js";import"./camera-Cr6IZ-wx.js";import"./user-BePscFH1.js";import"./play-C6U2eifx.js";import"./pause-BGY7Ki7b.js";const K={title:"Clients/Inspection-System/Molecules/InspectionTimeline",component:b,parameters:{layout:"padded"},tags:["autodocs"]},e=[{id:"1",type:"start",title:"Inspection Started",description:"Field inspection initiated at business premises",timestamp:new Date(Date.now()-36e5).toISOString(),user:"Inspector Ahmad"},{id:"2",type:"participant_added",title:"Participant Added",description:"John Smith (General Manager) joined the inspection",timestamp:new Date(Date.now()-33e5).toISOString(),user:"Inspector Ahmad"},{id:"3",type:"rule_checked",title:"Rule Checked: Fire Safety",description:"Fire extinguisher inspection - Compliant",timestamp:new Date(Date.now()-24e5).toISOString(),user:"Inspector Ahmad"},{id:"4",type:"photo_added",title:"Photo Evidence Added",description:"Photo of fire extinguisher certificate",timestamp:new Date(Date.now()-21e5).toISOString(),user:"Inspector Ahmad"},{id:"5",type:"finding",title:"Non-Compliance Found",description:"Emergency exit sign not illuminated",timestamp:new Date(Date.now()-18e5).toISOString(),user:"Inspector Ahmad"},{id:"6",type:"objection",title:"Objection Recorded",description:"Manager disputes finding regarding exit sign",timestamp:new Date(Date.now()-15e5).toISOString(),user:"John Smith"},{id:"7",type:"pause",title:"Inspection Paused",description:"Lunch break",timestamp:new Date(Date.now()-12e5).toISOString(),user:"Inspector Ahmad"}],t={args:{items:e}},i={args:{items:[]}},s={args:{items:e,compact:!0}},r={args:{items:e,relativeTime:!1}},n={args:{items:e,clickable:!0,onItemClick:k=>alert(`Clicked: ${k.title}`)}},o={args:{items:[...e,{id:"8",type:"resume",title:"Inspection Resumed",timestamp:new Date(Date.now()-6e5).toISOString(),user:"Inspector Ahmad"},{id:"9",type:"document",title:"Report Generated",description:"Final inspection report created",timestamp:new Date(Date.now()-3e5).toISOString(),user:"System"},{id:"10",type:"complete",title:"Inspection Completed",description:"All procedures completed successfully",timestamp:new Date(Date.now()-6e4).toISOString(),user:"Inspector Ahmad"}]}};var a,m,p;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    items: sampleItems
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,d,l;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...(l=(d=i.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var u,g,I;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    compact: true
  }
}`,...(I=(g=s.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var S,D,w;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    relativeTime: false
  }
}`,...(w=(D=r.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var h,y,A;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    clickable: true,
    onItemClick: item => alert(\`Clicked: \${item.title}\`)
  }
}`,...(A=(y=n.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var C,O,f;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    items: [...sampleItems, {
      id: "8",
      type: "resume",
      title: "Inspection Resumed",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      user: "Inspector Ahmad"
    }, {
      id: "9",
      type: "document",
      title: "Report Generated",
      description: "Final inspection report created",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      user: "System"
    }, {
      id: "10",
      type: "complete",
      title: "Inspection Completed",
      description: "All procedures completed successfully",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      user: "Inspector Ahmad"
    }]
  }
}`,...(f=(O=o.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};const Q=["Default","Empty","Compact","AbsoluteTime","Clickable","CompletedInspection"];export{r as AbsoluteTime,n as Clickable,s as Compact,o as CompletedInspection,t as Default,i as Empty,Q as __namedExportsOrder,K as default};
