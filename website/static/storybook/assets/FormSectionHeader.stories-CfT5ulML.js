import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as G}from"./index-GiUgBvb1.js";import{F as o}from"./FormSectionHeader-D6Z3W11Y.js";import{V as r}from"./Stack-1XI3stiC.js";import{B as J}from"./Box-DYJzRMmP.js";import{T as a}from"./Typography-Wmkp-g7N.js";import"./cn-BNf5BS2b.js";import"./Badge-Dd4QqFOk.js";import"./Icon-T0wFb734.js";import"./createLucideIcon-CbHznvEr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./loader-2-DXp1ic5P.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";const Ze={title:"Molecules/FormSectionHeader",component:o,parameters:{layout:"padded"},tags:["autodocs"]},i={args:{title:"Section Title"}},n={args:{title:"Company Information",subtitle:"Enter details about the inspected entity"}},l={render:function(){const[s,S]=G.useState(!1);return e.jsxs(r,{gap:"none",children:[e.jsx(o,{title:"A. Case Data",isCollapsed:s,onToggle:()=>S(!s)}),!s&&e.jsx(J,{padding:"md",className:"bg-white border border-t-0 border-gray-200 rounded-b-lg",children:e.jsx(a,{variant:"body",color:"muted",children:"Section content goes here..."})})]})}},p={args:{title:"Required Fields",badge:"5 fields"}},d={args:{title:"Price Marking",icon:"tag",badge:"Required"}},c={args:{title:"Entity Data",hasErrors:!0,badge:"2 errors"}},m={args:{title:"Introduction",isComplete:!0,badge:"Complete"}},g={render:function(){const[s,S]=G.useState({"S-1":!1,"S-2":!0,"S-3":!0}),L=t=>{S(b=>({...b,[t]:!b[t]}))},Q=[{id:"S-1",title:"A. Case Data",badge:"4 fields",isComplete:!0},{id:"S-2",title:"B. Entity Data",badge:"6 fields",hasErrors:!0},{id:"S-3",title:"C. Business Details",badge:"3 fields"}];return e.jsxs(r,{gap:"sm",children:[e.jsx(a,{variant:"h4",children:"T-001: Introduction"}),Q.map(t=>e.jsxs(r,{gap:"none",children:[e.jsx(o,{title:t.title,badge:t.badge,isCollapsed:s[t.id],onToggle:()=>L(t.id),isComplete:t.isComplete,hasErrors:t.hasErrors}),!s[t.id]&&e.jsx(J,{padding:"md",className:"bg-white border border-t-0 border-gray-200 rounded-b-lg",children:e.jsxs(a,{variant:"body",color:"muted",children:["Form fields for ",t.title,"..."]})})]},t.id))]})}},u={render:()=>e.jsxs(r,{gap:"md",children:[e.jsxs(r,{gap:"xs",children:[e.jsx(a,{variant:"label",color:"muted",children:"Default"}),e.jsx(o,{title:"Section Title"})]}),e.jsxs(r,{gap:"xs",children:[e.jsx(a,{variant:"label",color:"muted",children:"With Badge"}),e.jsx(o,{title:"Section Title",badge:"Required"})]}),e.jsxs(r,{gap:"xs",children:[e.jsx(a,{variant:"label",color:"muted",children:"Collapsible (Expanded)"}),e.jsx(o,{title:"Section Title",isCollapsed:!1,onToggle:()=>{}})]}),e.jsxs(r,{gap:"xs",children:[e.jsx(a,{variant:"label",color:"muted",children:"Collapsible (Collapsed)"}),e.jsx(o,{title:"Section Title",isCollapsed:!0,onToggle:()=>{}})]}),e.jsxs(r,{gap:"xs",children:[e.jsx(a,{variant:"label",color:"muted",children:"Complete"}),e.jsx(o,{title:"Section Title",isComplete:!0,badge:"Complete"})]}),e.jsxs(r,{gap:"xs",children:[e.jsx(a,{variant:"label",color:"muted",children:"Has Errors"}),e.jsx(o,{title:"Section Title",hasErrors:!0,badge:"2 errors"})]}),e.jsxs(r,{gap:"xs",children:[e.jsx(a,{variant:"label",color:"muted",children:"With Icon"}),e.jsx(o,{title:"Section Title",icon:"file-text"})]})]})};var h,x,y;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Section Title'
  }
}`,...(y=(x=i.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var C,T,f;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    title: 'Company Information',
    subtitle: 'Enter details about the inspected entity'
  }
}`,...(f=(T=n.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};var j,k,E;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: function CollapsibleDemo() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return <VStack gap="none">
        <FormSectionHeader title="A. Case Data" isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
        {!isCollapsed && <Box padding="md" className="bg-white border border-t-0 border-gray-200 rounded-b-lg">
            <Typography variant="body" color="muted">
              Section content goes here...
            </Typography>
          </Box>}
      </VStack>;
  }
}`,...(E=(k=l.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var V,v,D;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    title: 'Required Fields',
    badge: '5 fields'
  }
}`,...(D=(v=p.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};var F,I,B;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    title: 'Price Marking',
    icon: 'tag',
    badge: 'Required'
  }
}`,...(B=(I=d.parameters)==null?void 0:I.docs)==null?void 0:B.source}}};var H,W,R;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    title: 'Entity Data',
    hasErrors: true,
    badge: '2 errors'
  }
}`,...(R=(W=c.parameters)==null?void 0:W.docs)==null?void 0:R.source}}};var q,A,w;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    title: 'Introduction',
    isComplete: true,
    badge: 'Complete'
  }
}`,...(w=(A=m.parameters)==null?void 0:A.docs)==null?void 0:w.source}}};var N,M,P;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: function InspectionSectionsDemo() {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
      'S-1': false,
      'S-2': true,
      'S-3': true
    });
    const toggleSection = (id: string) => {
      setCollapsed(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    };
    const sections = [{
      id: 'S-1',
      title: 'A. Case Data',
      badge: '4 fields',
      isComplete: true
    }, {
      id: 'S-2',
      title: 'B. Entity Data',
      badge: '6 fields',
      hasErrors: true
    }, {
      id: 'S-3',
      title: 'C. Business Details',
      badge: '3 fields'
    }];
    return <VStack gap="sm">
        <Typography variant="h4">T-001: Introduction</Typography>
        {sections.map(section => <VStack key={section.id} gap="none">
            <FormSectionHeader title={section.title} badge={section.badge} isCollapsed={collapsed[section.id]} onToggle={() => toggleSection(section.id)} isComplete={section.isComplete} hasErrors={section.hasErrors} />
            {!collapsed[section.id] && <Box padding="md" className="bg-white border border-t-0 border-gray-200 rounded-b-lg">
                <Typography variant="body" color="muted">
                  Form fields for {section.title}...
                </Typography>
              </Box>}
          </VStack>)}
      </VStack>;
  }
}`,...(P=(M=g.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var _,O,z;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <VStack gap="md">
      <VStack gap="xs">
        <Typography variant="label" color="muted">Default</Typography>
        <FormSectionHeader title="Section Title" />
      </VStack>

      <VStack gap="xs">
        <Typography variant="label" color="muted">With Badge</Typography>
        <FormSectionHeader title="Section Title" badge="Required" />
      </VStack>

      <VStack gap="xs">
        <Typography variant="label" color="muted">Collapsible (Expanded)</Typography>
        <FormSectionHeader title="Section Title" isCollapsed={false} onToggle={() => {}} />
      </VStack>

      <VStack gap="xs">
        <Typography variant="label" color="muted">Collapsible (Collapsed)</Typography>
        <FormSectionHeader title="Section Title" isCollapsed={true} onToggle={() => {}} />
      </VStack>

      <VStack gap="xs">
        <Typography variant="label" color="muted">Complete</Typography>
        <FormSectionHeader title="Section Title" isComplete badge="Complete" />
      </VStack>

      <VStack gap="xs">
        <Typography variant="label" color="muted">Has Errors</Typography>
        <FormSectionHeader title="Section Title" hasErrors badge="2 errors" />
      </VStack>

      <VStack gap="xs">
        <Typography variant="label" color="muted">With Icon</Typography>
        <FormSectionHeader title="Section Title" icon="file-text" />
      </VStack>
    </VStack>
}`,...(z=(O=u.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};const $e=["Default","WithSubtitle","Collapsible","WithBadge","WithIcon","WithErrors","Complete","InspectionFormSections","AllStates"];export{u as AllStates,l as Collapsible,m as Complete,i as Default,g as InspectionFormSections,p as WithBadge,c as WithErrors,d as WithIcon,n as WithSubtitle,$e as __namedExportsOrder,Ze as default};
