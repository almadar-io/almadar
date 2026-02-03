import{j as a}from"./jsx-runtime-CDt2p4po.js";import{S as c}from"./SignatureCapture-BHXeJCrh.js";import{V as O}from"./Stack-DhhoTPuC.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Typography-Wmkp-g7N.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Card-BNT5PrJ5.js";import"./useEventBus-BNZMNlv8.js";import"./pen-DNARvM59.js";import"./rotate-ccw-cyxkXXLc.js";import"./check-DliVttWt.js";const Y={title:"Clients/Inspection-System/Organisms/SignatureCapture",component:c,parameters:{layout:"padded"},tags:["autodocs"]},t={args:{participantName:"John Smith",participantId:"p-123"}},r={args:{participantName:"John Smith",participantId:"p-123",required:!0}},e={args:{participantName:"Sarah Johnson",width:500,height:150}},i={args:{participantName:"Mike Williams",strokeColor:"#2563eb",strokeWidth:3}},n={args:{participantName:"Completed Signature",disabled:!0}},s={args:{participantName:"John Smith",participantId:"p-123",onCapture:H=>console.log("Signature captured:",H.substring(0,50)+"..."),onClear:()=>console.log("Signature cleared")}},p={args:{title:"Inspector Signature",participantName:"Inspector Ahmad Hassan",participantId:"inspector-1",instructions:"I confirm that this inspection was conducted according to regulations",required:!0}},o={render:()=>a.jsxs(O,{gap:"lg",children:[a.jsx(c,{title:"Inspector Signature",participantName:"Inspector Ahmad",participantId:"inspector-1",required:!0}),a.jsx(c,{title:"Company Representative",participantName:"John Smith (Manager)",participantId:"participant-1",required:!0}),a.jsx(c,{title:"Witness (Optional)",participantName:"Sarah Johnson",participantId:"participant-2"})]})};var m,u,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    participantName: "John Smith",
    participantId: "p-123"
  }
}`,...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var g,l,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    participantName: "John Smith",
    participantId: "p-123",
    required: true
  }
}`,...(S=(l=r.parameters)==null?void 0:l.docs)==null?void 0:S.source}}};var h,I,C;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    participantName: "Sarah Johnson",
    width: 500,
    height: 150
  }
}`,...(C=(I=e.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};var N,J,q;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    participantName: "Mike Williams",
    strokeColor: "#2563eb",
    strokeWidth: 3
  }
}`,...(q=(J=i.parameters)==null?void 0:J.docs)==null?void 0:q.source}}};var k,b,f;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    participantName: "Completed Signature",
    disabled: true
  }
}`,...(f=(b=n.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var x,W,j;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    participantName: "John Smith",
    participantId: "p-123",
    onCapture: data => console.log("Signature captured:", data.substring(0, 50) + "..."),
    onClear: () => console.log("Signature cleared")
  }
}`,...(j=(W=s.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var y,M,R;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    title: "Inspector Signature",
    participantName: "Inspector Ahmad Hassan",
    participantId: "inspector-1",
    instructions: "I confirm that this inspection was conducted according to regulations",
    required: true
  }
}`,...(R=(M=p.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var w,A,D;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <VStack gap="lg">
      <SignatureCapture title="Inspector Signature" participantName="Inspector Ahmad" participantId="inspector-1" required />
      <SignatureCapture title="Company Representative" participantName="John Smith (Manager)" participantId="participant-1" required />
      <SignatureCapture title="Witness (Optional)" participantName="Sarah Johnson" participantId="participant-2" />
    </VStack>
}`,...(D=(A=o.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};const Z=["Default","Required","CustomSize","CustomStyle","Disabled","WithHandlers","InspectorSignature","MultipleSignatures"];export{e as CustomSize,i as CustomStyle,t as Default,n as Disabled,p as InspectorSignature,o as MultipleSignatures,r as Required,s as WithHandlers,Z as __namedExportsOrder,Y as default};
