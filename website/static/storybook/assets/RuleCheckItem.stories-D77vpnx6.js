import{j as e}from"./jsx-runtime-CDt2p4po.js";import{R as t}from"./RuleCheckItem-8kPQH8_a.js";import{V as k}from"./Stack-DhhoTPuC.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Typography-Wmkp-g7N.js";import"./Badge-CpH0PNM6.js";import"./Card-BNT5PrJ5.js";import"./Textarea-C8Aqv8YN.js";import"./useEventBus-BNZMNlv8.js";import"./LawReferenceBadge-Bl_8g4lT.js";import"./scale-UkxLwacR.js";import"./createLucideIcon-CbHznvEr.js";import"./check-DliVttWt.js";import"./x-prXd1WI5.js";import"./alert-triangle-BLuUOBNm.js";import"./camera-Cr6IZ-wx.js";const J={title:"Clients/Inspection-System/Molecules/RuleCheckItem",component:t,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{severity:{control:"select",options:["critical","major","minor","info"]},isCompliant:{control:"select",options:[null,!0,!1]}}},r={args:{id:"rule-1",description:"Business premises must display valid operating license in visible location",gazetteNumber:"2023/45",article:"12",severity:"major"}},i={args:{id:"rule-2",description:"Fire extinguishers must be inspected within the last 12 months",gazetteNumber:"2022/18",article:"8",severity:"critical",isCompliant:!0}},s={args:{id:"rule-3",description:"Emergency exits must be clearly marked with illuminated signs",gazetteNumber:"2021/32",article:"15",severity:"critical",isCompliant:!1,notes:"Exit sign on back door is not illuminated. Bulb appears to be burned out."}},a={args:{id:"rule-4",description:"Food storage areas must maintain temperature below 5°C",gazetteNumber:"2023/12",article:"24",severity:"major",isCompliant:!1,notes:"Refrigerator showing 8°C at time of inspection",photoCount:3}},n={args:{id:"rule-5",description:"Staff hygiene training certificates must be current",gazetteNumber:"2022/08",article:"31",severity:"minor",isCompliant:!0,readOnly:!0}},o={render:()=>e.jsxs(k,{gap:"md",children:[e.jsx(t,{id:"critical-1",description:"Critical safety requirement that must be addressed immediately",severity:"critical",gazetteNumber:"2023/01",article:"1"}),e.jsx(t,{id:"major-1",description:"Major compliance issue requiring prompt attention",severity:"major",gazetteNumber:"2023/02",article:"2"}),e.jsx(t,{id:"minor-1",description:"Minor issue that should be addressed within 30 days",severity:"minor",gazetteNumber:"2023/03",article:"3"}),e.jsx(t,{id:"info-1",description:"Informational guideline for best practices",severity:"info",gazetteNumber:"2023/04",article:"4"})]})};var m,c,l;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    id: "rule-1",
    description: "Business premises must display valid operating license in visible location",
    gazetteNumber: "2023/45",
    article: "12",
    severity: "major"
  }
}`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var p,u,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    id: "rule-2",
    description: "Fire extinguishers must be inspected within the last 12 months",
    gazetteNumber: "2022/18",
    article: "8",
    severity: "critical",
    isCompliant: true
  }
}`,...(d=(u=i.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var g,b,y;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    id: "rule-3",
    description: "Emergency exits must be clearly marked with illuminated signs",
    gazetteNumber: "2021/32",
    article: "15",
    severity: "critical",
    isCompliant: false,
    notes: "Exit sign on back door is not illuminated. Bulb appears to be burned out."
  }
}`,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var h,f,C;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    id: "rule-4",
    description: "Food storage areas must maintain temperature below 5°C",
    gazetteNumber: "2023/12",
    article: "24",
    severity: "major",
    isCompliant: false,
    notes: "Refrigerator showing 8°C at time of inspection",
    photoCount: 3
  }
}`,...(C=(f=a.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var v,N,j;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    id: "rule-5",
    description: "Staff hygiene training certificates must be current",
    gazetteNumber: "2022/08",
    article: "31",
    severity: "minor",
    isCompliant: true,
    readOnly: true
  }
}`,...(j=(N=n.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var z,x,S;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <VStack gap="md">
      <RuleCheckItem id="critical-1" description="Critical safety requirement that must be addressed immediately" severity="critical" gazetteNumber="2023/01" article="1" />
      <RuleCheckItem id="major-1" description="Major compliance issue requiring prompt attention" severity="major" gazetteNumber="2023/02" article="2" />
      <RuleCheckItem id="minor-1" description="Minor issue that should be addressed within 30 days" severity="minor" gazetteNumber="2023/03" article="3" />
      <RuleCheckItem id="info-1" description="Informational guideline for best practices" severity="info" gazetteNumber="2023/04" article="4" />
    </VStack>
}`,...(S=(x=o.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};const K=["Default","Compliant","NonCompliant","WithPhotos","ReadOnly","AllSeverities"];export{o as AllSeverities,i as Compliant,r as Default,s as NonCompliant,n as ReadOnly,a as WithPhotos,K as __namedExportsOrder,J as default};
