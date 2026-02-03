import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as c}from"./index-GiUgBvb1.js";import{R as p}from"./RepeatableFormSection-baY3VLLM.js";import{V as S}from"./Stack-1XI3stiC.js";import{I as l}from"./Input-DhFss4oc.js";import{T as s}from"./Typography-Wmkp-g7N.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Button-B7t-_IKa.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Card-BNT5PrJ5.js";import"./Icon-T0wFb734.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./useEventBus-BNZMNlv8.js";const Ue={title:"Molecules/RepeatableFormSection",component:p,parameters:{layout:"padded"},tags:["autodocs"]};let $=0;const A=()=>`item-${++$}`,u={render:function(){const[n,i]=c.useState([{id:"item-1",name:"John Doe"},{id:"item-2",name:"Jane Smith"}]),d=()=>{i(t=>[...t,{id:A(),name:""}])},a=t=>{i(r=>r.filter(o=>o.id!==t))};return e.jsx(p,{sectionType:"participants",title:"Participants",items:n,renderItem:t=>e.jsx(l,{placeholder:"Enter name",defaultValue:t.name}),onAdd:d,onRemove:a,addLabel:"Add Participant",emptyMessage:"No participants added yet"})}},g={args:{sectionType:"findings",title:"Inspection Findings",items:[],renderItem:()=>e.jsx(l,{placeholder:"Enter finding"}),addLabel:"Add Finding",emptyMessage:"No findings recorded"}},I={render:function(){const[n,i]=c.useState([{id:"item-1",value:"First item"}]),d=()=>{i(t=>[...t,{id:A(),value:""}])},a=t=>{i(r=>r.filter(o=>o.id!==t))};return e.jsxs(S,{gap:"md",children:[e.jsx(s,{variant:"body2",color:"muted",children:"Minimum 1 item, maximum 3 items"}),e.jsx(p,{sectionType:"items",title:"Required Items",items:n,renderItem:t=>e.jsx(l,{placeholder:"Enter value",defaultValue:t.value}),onAdd:d,onRemove:a,minItems:1,maxItems:3})]})}},h={render:function(){const[n,i]=c.useState([{id:"item-1",name:"Initial Inspector",addedInState:"introduction",addedAt:"2024-01-15T10:30:00Z"}]),[d]=c.useState("field_inspection"),a=()=>{i(r=>[...r,{id:A(),name:"",addedInState:d,addedAt:new Date().toISOString()}])},t=r=>{i(o=>o.filter(N=>N.id!==r))};return e.jsxs(S,{gap:"md",children:[e.jsxs(s,{variant:"body2",color:"muted",children:["Current inspection state: ",e.jsx("strong",{children:d})]}),e.jsx(p,{sectionType:"inspectors",title:"Participating Inspectors",items:n,renderItem:r=>e.jsx(l,{placeholder:"Inspector name",defaultValue:r.name}),onAdd:a,onRemove:t,trackAddedInState:!0,currentState:d,showAuditInfo:!0,addLabel:"Add Inspector"})]})}},y={render:function(){const n=[{id:"item-1",finding:"Price tags missing on 5 items",addedInState:"price_marking_check",addedAt:"2024-01-15T09:45:00Z"},{id:"item-2",finding:"Expired product found in display",addedInState:"product_inspection",addedAt:"2024-01-15T10:15:00Z"},{id:"item-3",finding:"Receipt printer malfunction documented",addedInState:"equipment_check",addedAt:"2024-01-15T10:45:00Z"}];return e.jsxs(S,{gap:"md",children:[e.jsx(s,{variant:"h4",children:"Inspection Findings Audit Trail"}),e.jsx(s,{variant:"body2",color:"muted",children:"Read-only view showing when each finding was added during the inspection"}),e.jsx(p,{sectionType:"findings",title:"Recorded Findings",items:n,renderItem:i=>e.jsx(s,{variant:"body",children:i.finding}),showAuditInfo:!0,readOnly:!0})]})}},f={args:{sectionType:"violations",title:"Recorded Violations",items:[{id:"v1",description:"ZVPOT-1 Art. 14/1 - Missing price tags"},{id:"v2",description:"ZVPOT-1 Art. 23/2 - Incorrect labeling"}],renderItem:m=>e.jsx(s,{variant:"body",children:m.description}),readOnly:!0}},v={render:function(){const[n,i]=c.useState([{id:"item-1",step:"Check entrance area"},{id:"item-2",step:"Inspect main floor"},{id:"item-3",step:"Review storage room"}]),d=()=>{i(t=>[...t,{id:A(),step:""}])},a=t=>{i(r=>r.filter(o=>o.id!==t))};return e.jsxs(S,{gap:"md",children:[e.jsx(s,{variant:"body2",color:"muted",children:"Drag handles shown for reordering (reorder logic not implemented in this demo)"}),e.jsx(p,{sectionType:"steps",title:"Inspection Steps",items:n,renderItem:(t,r)=>e.jsx(l,{placeholder:`Step ${r+1}`,defaultValue:t.step}),onAdd:d,onRemove:a,allowReorder:!0,addLabel:"Add Step"})]})}};var R,T,x;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function DefaultDemo() {
    const [items, setItems] = useState<RepeatableItem[]>([{
      id: 'item-1',
      name: 'John Doe'
    }, {
      id: 'item-2',
      name: 'Jane Smith'
    }]);
    const handleAdd = () => {
      setItems(prev => [...prev, {
        id: generateId(),
        name: ''
      }]);
    };
    const handleRemove = (itemId: string) => {
      setItems(prev => prev.filter(item => item.id !== itemId));
    };
    return <RepeatableFormSection sectionType="participants" title="Participants" items={items} renderItem={item => <Input placeholder="Enter name" defaultValue={item.name as string} />} onAdd={handleAdd} onRemove={handleRemove} addLabel="Add Participant" emptyMessage="No participants added yet" />;
  }
}`,...(x=(T=u.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};var b,j,V;g.parameters={...g.parameters,docs:{...(b=g.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    sectionType: 'findings',
    title: 'Inspection Findings',
    items: [],
    renderItem: () => <Input placeholder="Enter finding" />,
    addLabel: 'Add Finding',
    emptyMessage: 'No findings recorded'
  }
}`,...(V=(j=g.parameters)==null?void 0:j.docs)==null?void 0:V.source}}};var w,D,k;I.parameters={...I.parameters,docs:{...(w=I.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function MinMaxDemo() {
    const [items, setItems] = useState<RepeatableItem[]>([{
      id: 'item-1',
      value: 'First item'
    }]);
    const handleAdd = () => {
      setItems(prev => [...prev, {
        id: generateId(),
        value: ''
      }]);
    };
    const handleRemove = (itemId: string) => {
      setItems(prev => prev.filter(item => item.id !== itemId));
    };
    return <VStack gap="md">
        <Typography variant="body2" color="muted">
          Minimum 1 item, maximum 3 items
        </Typography>
        <RepeatableFormSection sectionType="items" title="Required Items" items={items} renderItem={item => <Input placeholder="Enter value" defaultValue={item.value as string} />} onAdd={handleAdd} onRemove={handleRemove} minItems={1} maxItems={3} />
      </VStack>;
  }
}`,...(k=(D=I.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var F,M,E;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function AddedInStateDemo() {
    const [items, setItems] = useState<RepeatableItem[]>([{
      id: 'item-1',
      name: 'Initial Inspector',
      addedInState: 'introduction',
      addedAt: '2024-01-15T10:30:00Z'
    }]);
    const [currentState] = useState('field_inspection');
    const handleAdd = () => {
      setItems(prev => [...prev, {
        id: generateId(),
        name: '',
        addedInState: currentState,
        addedAt: new Date().toISOString()
      }]);
    };
    const handleRemove = (itemId: string) => {
      setItems(prev => prev.filter(item => item.id !== itemId));
    };
    return <VStack gap="md">
        <Typography variant="body2" color="muted">
          Current inspection state: <strong>{currentState}</strong>
        </Typography>
        <RepeatableFormSection sectionType="inspectors" title="Participating Inspectors" items={items} renderItem={item => <Input placeholder="Inspector name" defaultValue={item.name as string} />} onAdd={handleAdd} onRemove={handleRemove} trackAddedInState currentState={currentState} showAuditInfo addLabel="Add Inspector" />
      </VStack>;
  }
}`,...(E=(M=h.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};var O,P,Z;y.parameters={...y.parameters,docs:{...(O=y.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function AuditTrailDemo() {
    const items: RepeatableItem[] = [{
      id: 'item-1',
      finding: 'Price tags missing on 5 items',
      addedInState: 'price_marking_check',
      addedAt: '2024-01-15T09:45:00Z'
    }, {
      id: 'item-2',
      finding: 'Expired product found in display',
      addedInState: 'product_inspection',
      addedAt: '2024-01-15T10:15:00Z'
    }, {
      id: 'item-3',
      finding: 'Receipt printer malfunction documented',
      addedInState: 'equipment_check',
      addedAt: '2024-01-15T10:45:00Z'
    }];
    return <VStack gap="md">
        <Typography variant="h4">Inspection Findings Audit Trail</Typography>
        <Typography variant="body2" color="muted">
          Read-only view showing when each finding was added during the inspection
        </Typography>
        <RepeatableFormSection sectionType="findings" title="Recorded Findings" items={items} renderItem={item => <Typography variant="body">{item.finding as string}</Typography>} showAuditInfo readOnly />
      </VStack>;
  }
}`,...(Z=(P=y.parameters)==null?void 0:P.docs)==null?void 0:Z.source}}};var _,L,W;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    sectionType: 'violations',
    title: 'Recorded Violations',
    items: [{
      id: 'v1',
      description: 'ZVPOT-1 Art. 14/1 - Missing price tags'
    }, {
      id: 'v2',
      description: 'ZVPOT-1 Art. 23/2 - Incorrect labeling'
    }],
    renderItem: item => <Typography variant="body">{item.description as string}</Typography>,
    readOnly: true
  }
}`,...(W=(L=f.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var C,q,J;v.parameters={...v.parameters,docs:{...(C=v.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function ReorderDemo() {
    const [items, setItems] = useState<RepeatableItem[]>([{
      id: 'item-1',
      step: 'Check entrance area'
    }, {
      id: 'item-2',
      step: 'Inspect main floor'
    }, {
      id: 'item-3',
      step: 'Review storage room'
    }]);
    const handleAdd = () => {
      setItems(prev => [...prev, {
        id: generateId(),
        step: ''
      }]);
    };
    const handleRemove = (itemId: string) => {
      setItems(prev => prev.filter(item => item.id !== itemId));
    };
    return <VStack gap="md">
        <Typography variant="body2" color="muted">
          Drag handles shown for reordering (reorder logic not implemented in this demo)
        </Typography>
        <RepeatableFormSection sectionType="steps" title="Inspection Steps" items={items} renderItem={(item, index) => <Input placeholder={\`Step \${index + 1}\`} defaultValue={item.step as string} />} onAdd={handleAdd} onRemove={handleRemove} allowReorder addLabel="Add Step" />
      </VStack>;
  }
}`,...(J=(q=v.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};const Xe=["Default","Empty","WithMinMax","WithAddedInState","AuditTrail","ReadOnly","WithReorder"];export{y as AuditTrail,u as Default,g as Empty,f as ReadOnly,h as WithAddedInState,I as WithMinMax,v as WithReorder,Xe as __namedExportsOrder,Ue as default};
