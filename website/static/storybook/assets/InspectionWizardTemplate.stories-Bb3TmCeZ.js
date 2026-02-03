import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c as u}from"./cn-BNf5BS2b.js";import{B as r}from"./Box-DYJzRMmP.js";import{V as p,H as A}from"./Stack-DhhoTPuC.js";import{T as i}from"./Typography-Wmkp-g7N.js";import{B as w}from"./Button-Dn0472P0.js";import{C as F}from"./Card-BNT5PrJ5.js";import{u as ue}from"./useEventBus-BNZMNlv8.js";import{P as ge}from"./ProgressHeader-XH4m8y3t.js";import{C as he}from"./ComplianceSummary-BfQt8vR7.js";import{F as ye}from"./FloatingActionMenu-CEFCFkiv.js";import{B as xe}from"./building-2-DIDfNmjr.js";import{U as fe}from"./users-CV1mGUsS.js";import{C as Ne}from"./clipboard-check-BbncMYkH.js";import{F as Se}from"./file-text-DZQctV9o.js";import{P as be}from"./pen-tool-LaElpXis.js";import{C as q}from"./check-circle-DX_bNA1C.js";import{A as ve}from"./arrow-left-CMPuXvFr.js";import{S as Ie}from"./save-DyJeJ3Zl.js";import{A as je}from"./arrow-right-BdVPe8wH.js";import{R}from"./RuleCheckItem-8kPQH8_a.js";import{P as Ce}from"./ParticipantList-ES05Thsf.js";import{S as G}from"./SignatureCapture-BHXeJCrh.js";import"./index-GiUgBvb1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./ProgressBar-ZQR7fgL2.js";import"./PhaseIndicator-C0AecDcg.js";import"./flag-CJoo5uXG.js";import"./clock-DT9ve7xf.js";import"./play-C6U2eifx.js";import"./clipboard-list-C9RrCyxf.js";import"./circle-CzFdAxtK.js";import"./Badge-CpH0PNM6.js";import"./x-circle-CCPeOM9T.js";import"./trending-up-D7By3kN5.js";import"./trending-down-Dv2LyMoL.js";import"./alert-triangle-BLuUOBNm.js";import"./user-plus-BlQDsowZ.js";import"./camera-Cr6IZ-wx.js";import"./alert-circle-CBFh8Gcj.js";import"./phone-XSC4O3No.js";import"./x-prXd1WI5.js";import"./plus-jSzJaRn3.js";import"./Textarea-C8Aqv8YN.js";import"./LawReferenceBadge-Bl_8g4lT.js";import"./scale-UkxLwacR.js";import"./check-DliVttWt.js";import"./Avatar-CJtPgGUU.js";import"./user-BePscFH1.js";import"./briefcase-B0KIfOaN.js";import"./square-pen-D7sL1yO_.js";import"./trash-2-ChlfdFMf.js";import"./pen-DNARvM59.js";import"./rotate-ccw-cyxkXXLc.js";const s=[{id:"company",label:"Company Info",icon:xe},{id:"participants",label:"Participants",icon:fe},{id:"rules",label:"Rule Check",icon:Ne},{id:"documentation",label:"Documentation",icon:Se},{id:"signatures",label:"Signatures",icon:be}],T=({inspectionId:b,companyName:ne,currentStep:o,complianceStats:k,children:re,canProceed:ie=!0,showFloatingMenu:se=!0,className:oe,onStepChange:t,onSaveDraft:v,onComplete:I})=>{const c=ue(),n=s.findIndex(a=>a.id===o),D=n===0,P=n===s.length-1,pe=s.map((a,m)=>({id:a.id,label:a.label,completed:m<n,current:a.id===o})),ce=()=>{if(D)return;const a=s[n-1].id;t==null||t(a),c.emit("UI:WIZARD_BACK",{step:a})},me=()=>{if(P)I==null||I(),c.emit("UI:WIZARD_COMPLETE",{inspectionId:b});else{const a=s[n+1].id;t==null||t(a),c.emit("UI:WIZARD_NEXT",{step:a})}},le=()=>{v==null||v(),c.emit("UI:SAVE_DRAFT",{inspectionId:b,currentStep:o})},de=a=>{s.findIndex(j=>j.id===a)<=n&&(t==null||t(a),c.emit("UI:WIZARD_STEP_CHANGE",{step:a}))};return e.jsxs(p,{gap:"lg",className:u("min-h-screen bg-neutral-50",oe),children:[e.jsx(r,{className:"bg-white border-b sticky top-0 z-40",children:e.jsx(r,{className:"max-w-5xl mx-auto p-4",children:e.jsx(ge,{title:"Field Inspection",subtitle:ne,phase:"execution",steps:pe})})}),e.jsx(r,{className:"max-w-5xl mx-auto w-full px-4",children:e.jsx(F,{className:"p-2",children:e.jsx(A,{gap:"none",className:"overflow-x-auto",children:s.map((a,m)=>{const j=a.icon,l=m<n,d=a.id===o,C=m<=n;return e.jsxs("button",{type:"button",onClick:()=>de(a.id),disabled:!C,className:u("flex-1 min-w-[120px] p-3 rounded-lg transition-all","flex flex-col items-center gap-1",d&&"bg-blue-50 text-blue-700",l&&"text-green-600",!d&&!l&&"text-neutral-400",C&&"hover:bg-neutral-50 cursor-pointer",!C&&"cursor-not-allowed"),children:[e.jsx(r,{rounded:"full",padding:"sm",className:u(l&&"bg-green-100",d&&"bg-blue-100",!l&&!d&&"bg-neutral-100"),children:l?e.jsx(q,{className:"h-5 w-5"}):e.jsx(j,{className:"h-5 w-5"})}),e.jsx(i,{variant:"small",className:u("font-medium",d&&"text-blue-700"),children:a.label})]},a.id)})})})}),o==="rules"&&k&&e.jsx(r,{className:"max-w-5xl mx-auto w-full px-4",children:e.jsx(he,{stats:k})}),e.jsx(r,{className:"max-w-5xl mx-auto w-full px-4 flex-1",children:e.jsx(F,{className:"p-6 min-h-[400px]",children:re})}),e.jsx(r,{className:"bg-white border-t sticky bottom-0 z-40",children:e.jsx(r,{className:"max-w-5xl mx-auto p-4",children:e.jsxs(A,{justify:"between",align:"center",children:[e.jsxs(w,{variant:"secondary",onClick:ce,disabled:D,className:"gap-2",children:[e.jsx(ve,{className:"h-4 w-4"}),"Previous"]}),e.jsxs(w,{variant:"ghost",onClick:le,className:"gap-2",children:[e.jsx(Ie,{className:"h-4 w-4"}),"Save Draft"]}),e.jsx(w,{variant:"primary",onClick:me,disabled:!ie,className:"gap-2",children:P?e.jsxs(e.Fragment,{children:[e.jsx(q,{className:"h-4 w-4"}),"Complete Inspection"]}):e.jsxs(e.Fragment,{children:["Next",e.jsx(je,{className:"h-4 w-4"})]})})]})})}),se&&e.jsx(ye,{context:{inspectionId:b,currentStep:o}})]})};T.displayName="InspectionWizardTemplate";T.__docgenInfo={description:"",methods:[],displayName:"InspectionWizardTemplate",props:{inspectionId:{required:!0,tsType:{name:"string"},description:"Inspection ID"},companyName:{required:!0,tsType:{name:"string"},description:"Company name"},currentStep:{required:!0,tsType:{name:"union",raw:`| "company"
| "participants"
| "rules"
| "documentation"
| "signatures"`,elements:[{name:"literal",value:'"company"'},{name:"literal",value:'"participants"'},{name:"literal",value:'"rules"'},{name:"literal",value:'"documentation"'},{name:"literal",value:'"signatures"'}]},description:"Current step"},complianceStats:{required:!1,tsType:{name:"ComplianceStats"},description:"Compliance stats"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Step content render prop"},canProceed:{required:!1,tsType:{name:"boolean"},description:"Can proceed to next step",defaultValue:{value:"true",computed:!1}},showFloatingMenu:{required:!1,tsType:{name:"boolean"},description:"Show floating action menu",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(step: WizardStep) => void",signature:{arguments:[{type:{name:"union",raw:`| "company"
| "participants"
| "rules"
| "documentation"
| "signatures"`,elements:[{name:"literal",value:'"company"'},{name:"literal",value:'"participants"'},{name:"literal",value:'"rules"'},{name:"literal",value:'"documentation"'},{name:"literal",value:'"signatures"'}]},name:"step"}],return:{name:"void"}}},description:"Step change handler"},onSaveDraft:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Save draft handler"},onComplete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Complete handler"}}};const Ta={title:"Clients/Inspection-System/Templates/InspectionWizardTemplate",component:T,parameters:{layout:"fullscreen"},tags:["autodocs"]},we={total:25,compliant:15,nonCompliant:5,notChecked:5,critical:1,major:3,minor:1},g={args:{inspectionId:"insp-123",companyName:"Golden Dragon Restaurant",currentStep:"company",children:e.jsxs(p,{gap:"md",children:[e.jsx(i,{variant:"h3",children:"Company Information"}),e.jsx(i,{variant:"body",className:"text-neutral-500",children:"Verify the company details before proceeding with the inspection."})]})}},h={args:{inspectionId:"insp-123",companyName:"Golden Dragon Restaurant",currentStep:"participants",children:e.jsx(Ce,{inspectionId:"insp-123",participants:[{id:"p1",name:"John",surname:"Smith",positionInCompany:"General Manager",contactInfo:"+1 555-0123"}]})}},y={args:{inspectionId:"insp-123",companyName:"Golden Dragon Restaurant",currentStep:"rules",complianceStats:we,children:e.jsxs(p,{gap:"md",children:[e.jsx(R,{id:"rule-1",description:"Business premises must display valid operating license",gazetteNumber:"2023/45",article:"12",severity:"major"}),e.jsx(R,{id:"rule-2",description:"Fire extinguishers must be inspected within the last 12 months",gazetteNumber:"2022/18",article:"8",severity:"critical",isCompliant:!0}),e.jsx(R,{id:"rule-3",description:"Emergency exits must be clearly marked",gazetteNumber:"2021/32",article:"15",severity:"critical",isCompliant:!1,notes:"Exit sign not illuminated"})]})}},x={args:{inspectionId:"insp-123",companyName:"Golden Dragon Restaurant",currentStep:"documentation",children:e.jsxs(p,{gap:"md",children:[e.jsx(i,{variant:"h3",children:"Documentation"}),e.jsx(i,{variant:"body",className:"text-neutral-500",children:"Review and add any additional notes or evidence."})]})}},f={args:{inspectionId:"insp-123",companyName:"Golden Dragon Restaurant",currentStep:"signatures",children:e.jsxs(p,{gap:"lg",children:[e.jsx(G,{title:"Inspector Signature",participantName:"Ahmad Hassan",participantId:"inspector-1",required:!0}),e.jsx(G,{title:"Company Representative",participantName:"John Smith",participantId:"participant-1",required:!0})]})}},N={args:{inspectionId:"insp-123",companyName:"Golden Dragon Restaurant",currentStep:"participants",canProceed:!1,children:e.jsxs(p,{gap:"md",children:[e.jsx(i,{variant:"h3",children:"Participants Required"}),e.jsx(i,{variant:"body",className:"text-red-500",children:"At least one participant must be added before proceeding."})]})}},S={args:{inspectionId:"insp-123",companyName:"Golden Dragon Restaurant",currentStep:"rules",showFloatingMenu:!1,children:e.jsx(i,{variant:"body",children:"Floating menu is hidden"})}};var V,z,E;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "company",
    children: <VStack gap="md">
        <Typography variant="h3">Company Information</Typography>
        <Typography variant="body" className="text-neutral-500">
          Verify the company details before proceeding with the inspection.
        </Typography>
        {/* Company form would go here */}
      </VStack>
  }
}`,...(E=(z=g.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var B,_,M;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "participants",
    children: <ParticipantList inspectionId="insp-123" participants={[{
      id: "p1",
      name: "John",
      surname: "Smith",
      positionInCompany: "General Manager",
      contactInfo: "+1 555-0123"
    }]} />
  }
}`,...(M=(_=h.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var W,U,H;y.parameters={...y.parameters,docs:{...(W=y.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "rules",
    complianceStats: sampleComplianceStats,
    children: <VStack gap="md">
        <RuleCheckItem id="rule-1" description="Business premises must display valid operating license" gazetteNumber="2023/45" article="12" severity="major" />
        <RuleCheckItem id="rule-2" description="Fire extinguishers must be inspected within the last 12 months" gazetteNumber="2022/18" article="8" severity="critical" isCompliant={true} />
        <RuleCheckItem id="rule-3" description="Emergency exits must be clearly marked" gazetteNumber="2021/32" article="15" severity="critical" isCompliant={false} notes="Exit sign not illuminated" />
      </VStack>
  }
}`,...(H=(U=y.parameters)==null?void 0:U.docs)==null?void 0:H.source}}};var L,J,Z;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "documentation",
    children: <VStack gap="md">
        <Typography variant="h3">Documentation</Typography>
        <Typography variant="body" className="text-neutral-500">
          Review and add any additional notes or evidence.
        </Typography>
      </VStack>
  }
}`,...(Z=(J=x.parameters)==null?void 0:J.docs)==null?void 0:Z.source}}};var O,K,X;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "signatures",
    children: <VStack gap="lg">
        <SignatureCapture title="Inspector Signature" participantName="Ahmad Hassan" participantId="inspector-1" required />
        <SignatureCapture title="Company Representative" participantName="John Smith" participantId="participant-1" required />
      </VStack>
  }
}`,...(X=(K=f.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var Q,Y,$;N.parameters={...N.parameters,docs:{...(Q=N.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "participants",
    canProceed: false,
    children: <VStack gap="md">
        <Typography variant="h3">Participants Required</Typography>
        <Typography variant="body" className="text-red-500">
          At least one participant must be added before proceeding.
        </Typography>
      </VStack>
  }
}`,...($=(Y=N.parameters)==null?void 0:Y.docs)==null?void 0:$.source}}};var ee,ae,te;S.parameters={...S.parameters,docs:{...(ee=S.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "rules",
    showFloatingMenu: false,
    children: <Typography variant="body">Floating menu is hidden</Typography>
  }
}`,...(te=(ae=S.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};const ka=["CompanyStep","ParticipantsStep","RulesStep","DocumentationStep","SignaturesStep","CannotProceed","NoFloatingMenu"];export{N as CannotProceed,g as CompanyStep,x as DocumentationStep,S as NoFloatingMenu,h as ParticipantsStep,y as RulesStep,f as SignaturesStep,ka as __namedExportsOrder,Ta as default};
