import{P as R}from"./ParticipantList-ES05Thsf.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Card-BNT5PrJ5.js";import"./Avatar-CJtPgGUU.js";import"./user-BePscFH1.js";import"./Badge-CpH0PNM6.js";import"./useEventBus-BNZMNlv8.js";import"./plus-jSzJaRn3.js";import"./briefcase-B0KIfOaN.js";import"./phone-XSC4O3No.js";import"./square-pen-D7sL1yO_.js";import"./trash-2-ChlfdFMf.js";const F={title:"Clients/Inspection-System/Molecules/ParticipantList",component:R,parameters:{layout:"padded"},tags:["autodocs"]},e=[{id:"p1",name:"John",surname:"Smith",positionInCompany:"General Manager",contactInfo:"+1 555-0123",addedAt:"2024-01-15T10:30:00Z"},{id:"p2",name:"Sarah",surname:"Johnson",positionInCompany:"Operations Director",contactInfo:"sarah.j@company.com",addedAt:"2024-01-15T10:35:00Z"},{id:"p3",name:"Mike",surname:"Williams",positionInCompany:"Safety Officer",addedAt:"2024-01-15T10:40:00Z"}],a={args:{inspectionId:"insp-123",participants:e}},i={args:{inspectionId:"insp-123",participants:[]}},n={args:{inspectionId:"insp-123",participants:[e[0]],minParticipants:1}},t={args:{inspectionId:"insp-123",participants:e,readOnly:!0}},r={args:{inspectionId:"insp-123",participants:[],minParticipants:2}},s={args:{inspectionId:"insp-123",participants:e,allowEdit:!1}};var p,o,c;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    participants: sampleParticipants
  }
}`,...(c=(o=a.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var m,d,l;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    participants: []
  }
}`,...(l=(d=i.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var u,g,I;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    participants: [sampleParticipants[0]],
    minParticipants: 1
  }
}`,...(I=(g=n.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var P,y,S;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    participants: sampleParticipants,
    readOnly: true
  }
}`,...(S=(y=t.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var f,E,O;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    participants: [],
    minParticipants: 2
  }
}`,...(O=(E=r.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var h,M,C;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    participants: sampleParticipants,
    allowEdit: false
  }
}`,...(C=(M=s.parameters)==null?void 0:M.docs)==null?void 0:C.source}}};const H=["Default","Empty","SingleParticipant","ReadOnly","MinimumRequired","NoEdit"];export{a as Default,i as Empty,r as MinimumRequired,s as NoEdit,t as ReadOnly,n as SingleParticipant,H as __namedExportsOrder,F as default};
