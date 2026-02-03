import{j as i}from"./jsx-runtime-CDt2p4po.js";import{r as z}from"./index-GiUgBvb1.js";import{V as o}from"./ViolationAlert-BtDjwWVC.js";import{V as a}from"./Stack-DhhoTPuC.js";import{T as t}from"./Typography-Wmkp-g7N.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Icon-DDCXmKGr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";const Xi={title:"Molecules/ViolationAlert",component:o,parameters:{layout:"padded"},tags:["autodocs"]},e={id:"v-001",law:"ZVPOT-1",article:"14/1",message:"Some goods are missing price tags. Corrective action required.",actionType:"measure",fieldId:"field_2_8",tabId:"T2-1"},V={id:"v-002",law:"ZVPOT-1",article:"14/1",message:"Goods must be marked with visible price tags. Administrative action will be initiated.",actionType:"admin",adminAction:"ZVPOT-1 234/1-4",fieldId:"field_2_8",tabId:"T2-1"},y={id:"v-003",law:"ZVPOT-1",article:"23/2",message:"Serious labeling violation detected. Penalty proceedings will be initiated.",actionType:"penalty",adminAction:"ZVPOT-1 234/1-4",penaltyAction:"ZVPOT-1 240/1-9",fieldId:"field_3_5",tabId:"T3-1"},s={args:{violation:e}},m={args:{violation:V}},l={args:{violation:y}},c={args:{violation:{id:"v-004",law:"ZVPOT-1",article:"14/1",message:"No price marking found on any displayed goods. Both administrative and penalty actions required.",actionType:"admin",adminAction:"ZVPOT-1 234/1-4",penaltyAction:"ZVPOT-1 240/1-9",fieldId:"field_2_8"}}},p={render:function(){const[r,n]=z.useState(null);return i.jsxs(a,{gap:"md",children:[i.jsx(o,{violation:V,onNavigateToField:J=>n(J)}),r&&i.jsxs(t,{variant:"body2",color:"muted",children:["Would navigate to field: ",i.jsx("strong",{children:r})]})]})}},d={render:function(){const[r,n]=z.useState(!1);return r?i.jsxs(a,{gap:"md",align:"center",children:[i.jsx(t,{variant:"body",color:"muted",children:"Alert dismissed"}),i.jsx("button",{onClick:()=>n(!1),className:"text-blue-600 hover:underline",children:"Show again"})]}):i.jsx(o,{violation:e,dismissible:!0,onDismiss:()=>n(!0)})}},g={args:{violation:e,compact:!0}},u={render:()=>i.jsxs(a,{gap:"sm",children:[i.jsx(t,{variant:"h4",children:"Detected Violations"}),i.jsx(o,{violation:e,compact:!0}),i.jsx(o,{violation:V,compact:!0}),i.jsx(o,{violation:y,compact:!0})]})},v={render:()=>i.jsxs(a,{gap:"lg",children:[i.jsxs(a,{gap:"sm",children:[i.jsx(t,{variant:"h4",children:"Corrective Measure (Warning)"}),i.jsx(o,{violation:e})]}),i.jsxs(a,{gap:"sm",children:[i.jsx(t,{variant:"h4",children:"Administrative Action (Error)"}),i.jsx(o,{violation:V})]}),i.jsxs(a,{gap:"sm",children:[i.jsx(t,{variant:"h4",children:"Penalty Proceedings (Error)"}),i.jsx(o,{violation:y})]})]})};var h,T,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    violation: measureViolation
  }
}`,...(f=(T=s.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};var S,x,A;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    violation: adminViolation
  }
}`,...(A=(x=m.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var b,j,k;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    violation: penaltyViolation
  }
}`,...(k=(j=l.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var P,D,N;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    violation: {
      id: 'v-004',
      law: 'ZVPOT-1',
      article: '14/1',
      message: 'No price marking found on any displayed goods. Both administrative and penalty actions required.',
      actionType: 'admin',
      adminAction: 'ZVPOT-1 234/1-4',
      penaltyAction: 'ZVPOT-1 240/1-9',
      fieldId: 'field_2_8'
    }
  }
}`,...(N=(D=c.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var O,Z,_;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function NavigationDemo() {
    const [navigatedTo, setNavigatedTo] = useState<string | null>(null);
    return <VStack gap="md">
        <ViolationAlert violation={adminViolation} onNavigateToField={fieldId => setNavigatedTo(fieldId)} />
        {navigatedTo && <Typography variant="body2" color="muted">
            Would navigate to field: <strong>{navigatedTo}</strong>
          </Typography>}
      </VStack>;
  }
}`,...(_=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:_.source}}};var C,w,I;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function DismissibleDemo() {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) {
      return <VStack gap="md" align="center">
          <Typography variant="body" color="muted">Alert dismissed</Typography>
          <button onClick={() => setDismissed(false)} className="text-blue-600 hover:underline">
            Show again
          </button>
        </VStack>;
    }
    return <ViolationAlert violation={measureViolation} dismissible onDismiss={() => setDismissed(true)} />;
  }
}`,...(I=(w=d.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var E,W,M;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    violation: measureViolation,
    compact: true
  }
}`,...(M=(W=g.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};var q,B,F;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <VStack gap="sm">
      <Typography variant="h4">Detected Violations</Typography>
      <ViolationAlert violation={measureViolation} compact />
      <ViolationAlert violation={adminViolation} compact />
      <ViolationAlert violation={penaltyViolation} compact />
    </VStack>
}`,...(F=(B=u.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var L,G,R;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <VStack gap="lg">
      <VStack gap="sm">
        <Typography variant="h4">Corrective Measure (Warning)</Typography>
        <ViolationAlert violation={measureViolation} />
      </VStack>

      <VStack gap="sm">
        <Typography variant="h4">Administrative Action (Error)</Typography>
        <ViolationAlert violation={adminViolation} />
      </VStack>

      <VStack gap="sm">
        <Typography variant="h4">Penalty Proceedings (Error)</Typography>
        <ViolationAlert violation={penaltyViolation} />
      </VStack>
    </VStack>
}`,...(R=(G=v.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};const Yi=["MeasureViolation","AdminViolation","PenaltyViolation","CombinedViolation","WithNavigation","Dismissible","Compact","CompactList","AllVariants"];export{m as AdminViolation,v as AllVariants,c as CombinedViolation,g as Compact,u as CompactList,d as Dismissible,s as MeasureViolation,l as PenaltyViolation,p as WithNavigation,Yi as __namedExportsOrder,Xi as default};
