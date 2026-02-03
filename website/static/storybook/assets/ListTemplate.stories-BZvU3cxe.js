import{j as t}from"./jsx-runtime-CDt2p4po.js";import{r as be}from"./index-GiUgBvb1.js";import{c as Q}from"./cn-BNf5BS2b.js";import{C as U,E as ke}from"./Container-BqMVFbZD.js";import{V as d,H as a}from"./Stack-DhhoTPuC.js";import{T as m}from"./Typography-Wmkp-g7N.js";import{B as s}from"./Button-Dn0472P0.js";import{I as E}from"./Input-DhFss4oc.js";import{C as Ce}from"./Checkbox-JlfTorra.js";import{S as q}from"./Spinner-vF2DJrH5.js";import{A as Le}from"./Alert-mBErZifW.js";import{P as V}from"./plus-jSzJaRn3.js";import{R as Ne}from"./refresh-cw-Ocr-wooT.js";import{L as Fe}from"./list-todo-DTjPm3S-.js";import{T as Se}from"./trash-2-ChlfdFMf.js";import"./ThemeContext-CWyIUqBc.js";import"./Textarea-C8Aqv8YN.js";import"./Select-CVuTODQb.js";import"./chevron-down-BQmz_Bpa.js";import"./createLucideIcon-CbHznvEr.js";import"./Card-BNT5PrJ5.js";import"./Badge-CpH0PNM6.js";import"./Avatar-CJtPgGUU.js";import"./user-BePscFH1.js";import"./Box-DYJzRMmP.js";import"./Divider-D6QVU1l7.js";import"./Icon-DDCXmKGr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./loader-2-DXp1ic5P.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./ProgressBar-ZQR7fgL2.js";import"./Radio-DlbJoV6R.js";import"./Overlay-CxBLilSV.js";import"./ConditionalWrapper-B0uLFjZO.js";import"./SExpressionEvaluator-DyJCz_6e.js";import"./LawReferenceTooltip-BTS2E0sF.js";import"./x-circle-CCPeOM9T.js";const M=({items:e=[],isLoading:k=!1,error:l=null,filter:c="all",onAdd:z,onToggle:C,onDelete:p,onFilterChange:o,onRetry:R,title:B="My List",placeholder:L="Add a new item...",showFilters:P=!0,showCount:W=!0,emptyMessage:_="No items yet",variant:je="standard",className:N})=>{const[i,u]=be.useState(""),F=r=>{r.preventDefault(),i.trim()&&z&&(z(i.trim()),u(""))},n=e.filter(r=>c==="active"?!r.completed:c==="completed"?r.completed:!0),f=e.filter(r=>!r.completed).length,S=e.filter(r=>r.completed).length,D=()=>t.jsx(Le,{variant:"error",title:"Failed to load items",actions:R&&t.jsx(s,{variant:"ghost",size:"sm",onClick:R,leftIcon:t.jsx(Ne,{className:"h-4 w-4"}),children:"Retry"}),children:typeof l=="string"?l:(l==null?void 0:l.message)||"An error occurred"}),O=()=>t.jsxs(a,{gap:"sm",children:[t.jsxs(s,{variant:c==="all"?"primary":"ghost",size:"sm",onClick:()=>o==null?void 0:o("all"),children:["All (",e.length,")"]}),t.jsxs(s,{variant:c==="active"?"primary":"ghost",size:"sm",onClick:()=>o==null?void 0:o("active"),children:["Active (",f,")"]}),t.jsxs(s,{variant:c==="completed"?"primary":"ghost",size:"sm",onClick:()=>o==null?void 0:o("completed"),children:["Completed (",S,")"]})]}),I=r=>t.jsxs(a,{gap:"md",align:"center",className:Q("p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] dark:border-[var(--color-border)]","hover:bg-[var(--color-muted)] dark:hover:bg-[var(--color-muted)] transition-colors",r.completed&&"opacity-60"),children:[t.jsx(Ce,{checked:r.completed,onChange:()=>C==null?void 0:C(r.id),className:"flex-shrink-0"}),t.jsx(m,{variant:"body",className:Q("flex-1",r.completed&&"line-through text-[var(--color-muted-foreground)]"),children:r.title}),p&&t.jsx(s,{variant:"ghost",size:"sm",onClick:()=>p(r.id),className:"text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10",children:t.jsx(Se,{className:"h-4 w-4"})})]},r.id),H=()=>t.jsx(ke,{icon:Fe,title:_,description:"Add your first item using the input above"}),Te=()=>t.jsxs(d,{gap:"md",className:N,children:[t.jsx("form",{onSubmit:F,children:t.jsxs(a,{gap:"sm",children:[t.jsx(E,{value:i,onChange:r=>u(r.target.value),placeholder:L,className:"flex-1"}),t.jsx(s,{type:"submit",disabled:!i.trim(),children:t.jsx(V,{className:"h-4 w-4"})})]})}),k?t.jsx("div",{className:"flex justify-center py-8",children:t.jsx(q,{size:"md"})}):l?D():n.length===0?t.jsx(m,{variant:"body",color:"muted",align:"center",className:"py-8",children:_}):t.jsx(d,{gap:"sm",children:n.map(I)})]}),Ae=()=>t.jsx(U,{size:"md",padding:"lg",className:N,children:t.jsxs(d,{gap:"lg",children:[t.jsx(m,{variant:"h2",children:B}),l&&D(),t.jsx("form",{onSubmit:F,children:t.jsxs(a,{gap:"sm",children:[t.jsx(E,{value:i,onChange:r=>u(r.target.value),placeholder:L,className:"flex-1"}),t.jsx(s,{type:"submit",disabled:!i.trim(),leftIcon:t.jsx(V,{className:"h-4 w-4"}),children:"Add"})]})}),P&&e.length>0&&O(),k?t.jsx("div",{className:"flex justify-center py-8",children:t.jsx(q,{size:"md"})}):n.length===0?H():t.jsx(d,{gap:"sm",children:n.map(I)}),W&&e.length>0&&t.jsxs(m,{variant:"small",color:"muted",children:[f," item",f!==1?"s":""," remaining"]})]})}),we=()=>t.jsx(U,{size:"md",padding:"lg",className:N,children:t.jsxs(d,{gap:"lg",children:[t.jsxs(a,{justify:"between",align:"center",children:[t.jsx(m,{variant:"h2",children:B}),W&&t.jsxs(m,{variant:"small",color:"muted",children:[e.length," total • ",f," active • ",S," ","done"]})]}),l&&D(),t.jsx("form",{onSubmit:F,children:t.jsxs(a,{gap:"sm",children:[t.jsx(E,{value:i,onChange:r=>u(r.target.value),placeholder:L,className:"flex-1"}),t.jsx(s,{type:"submit",disabled:!i.trim(),leftIcon:t.jsx(V,{className:"h-4 w-4"}),children:"Add Item"})]})}),P&&e.length>0&&t.jsx("div",{className:"border-b border-[var(--color-border)] dark:border-[var(--color-border)] pb-4",children:O()}),k?t.jsx("div",{className:"flex justify-center py-12",children:t.jsx(q,{size:"lg"})}):n.length===0?H():t.jsx(d,{gap:"sm",children:n.map(I)}),e.length>0&&S>0&&t.jsx(a,{justify:"end",children:t.jsx(s,{variant:"ghost",size:"sm",className:"text-[var(--color-muted-foreground)]",onClick:()=>{e.filter(r=>r.completed).forEach(r=>p==null?void 0:p(r.id))},children:"Clear completed"})})]})});switch(je){case"minimal":return Te();case"full":return we();default:return Ae()}};M.displayName="ListTemplate";M.__docgenInfo={description:"",methods:[],displayName:"ListTemplate",props:{items:{required:!1,tsType:{name:"Array",elements:[{name:"ListTemplateItem"}],raw:"ListTemplateItem[]"},description:"Array of list items",defaultValue:{value:"[]",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"Whether data is loading",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | string | null",elements:[{name:"Error"},{name:"string"},{name:"null"}]},description:"Error object if loading failed",defaultValue:{value:"null",computed:!1}},filter:{required:!1,tsType:{name:"union",raw:'"all" | "active" | "completed"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"active"'},{name:"literal",value:'"completed"'}]},description:"Current filter value",defaultValue:{value:'"all"',computed:!1}},onAdd:{required:!1,tsType:{name:"signature",type:"function",raw:"(title: string) => void",signature:{arguments:[{type:{name:"string"},name:"title"}],return:{name:"void"}}},description:"Called when a new item is added"},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:"Called when an item is toggled"},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:"Called when an item is deleted"},onFilterChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(filter: FilterValue) => void",signature:{arguments:[{type:{name:"union",raw:'"all" | "active" | "completed"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"active"'},{name:"literal",value:'"completed"'}]},name:"filter"}],return:{name:"void"}}},description:"Called when filter changes"},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called to retry loading"},title:{required:!1,tsType:{name:"string"},description:"Title displayed above the list",defaultValue:{value:'"My List"',computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder for the input field",defaultValue:{value:'"Add a new item..."',computed:!1}},showFilters:{required:!1,tsType:{name:"boolean"},description:"Whether to show filter buttons",defaultValue:{value:"true",computed:!1}},showCount:{required:!1,tsType:{name:"boolean"},description:"Whether to show item count",defaultValue:{value:"true",computed:!1}},emptyMessage:{required:!1,tsType:{name:"string"},description:"Message shown when list is empty",defaultValue:{value:'"No items yet"',computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"minimal" | "standard" | "full"',elements:[{name:"literal",value:'"minimal"'},{name:"literal",value:'"standard"'},{name:"literal",value:'"full"'}]},description:"Template variant",defaultValue:{value:'"standard"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional class name"}}};const $t={title:"Templates/ListTemplate",component:M,parameters:{layout:"fullscreen",backgrounds:{default:"wireframe"}},tags:["autodocs"]},g=[{id:"1",title:"Buy groceries",completed:!0},{id:"2",title:"Finish project report",completed:!1},{id:"3",title:"Call the dentist",completed:!1},{id:"4",title:"Review pull requests",completed:!0},{id:"5",title:"Update documentation",completed:!1}],h={args:{title:"My Todo List",items:g,onAdd:e=>console.log("Add:",e),onToggle:e=>console.log("Toggle:",e),onDelete:e=>console.log("Delete:",e)}},v={args:{title:"Empty List",items:[],emptyMessage:"No tasks yet. Add your first task to get started!",onAdd:e=>console.log("Add:",e)}},y={args:{title:"Loading Items",items:[],isLoading:!0}},x={args:{title:"Failed to Load",items:[],error:"Failed to fetch items. Please try again.",onRetry:()=>console.log("Retry clicked")}},j={args:{title:"Quick Notes",items:g,variant:"minimal",showFilters:!1,showCount:!1,onAdd:e=>console.log("Add:",e),onToggle:e=>console.log("Toggle:",e),onDelete:e=>console.log("Delete:",e)}},T={args:{title:"Project Tasks",items:g,variant:"full",showFilters:!0,showCount:!0,placeholder:"Add a new task...",onAdd:e=>console.log("Add:",e),onToggle:e=>console.log("Toggle:",e),onDelete:e=>console.log("Delete:",e),onFilterChange:e=>console.log("Filter:",e)}},A={args:{title:"Active Tasks Only",items:g,filter:"active",showFilters:!0,onAdd:e=>console.log("Add:",e),onToggle:e=>console.log("Toggle:",e),onDelete:e=>console.log("Delete:",e),onFilterChange:e=>console.log("Filter:",e)}},w={args:{title:"Completed Tasks",items:g,filter:"completed",showFilters:!0,onAdd:e=>console.log("Add:",e),onToggle:e=>console.log("Toggle:",e),onDelete:e=>console.log("Delete:",e),onFilterChange:e=>console.log("Filter:",e)}},b={args:{title:"Shopping List",items:[{id:"1",title:"Milk",completed:!1},{id:"2",title:"Bread",completed:!0},{id:"3",title:"Eggs",completed:!1},{id:"4",title:"Butter",completed:!1},{id:"5",title:"Coffee",completed:!0}],placeholder:"Add item to list...",showFilters:!1,onAdd:e=>console.log("Add:",e),onToggle:e=>console.log("Toggle:",e),onDelete:e=>console.log("Delete:",e)}};var G,J,K;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    title: 'My Todo List',
    items: sampleItems,
    onAdd: (title: string) => console.log('Add:', title),
    onToggle: (id: string) => console.log('Toggle:', id),
    onDelete: (id: string) => console.log('Delete:', id)
  }
}`,...(K=(J=h.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var X,Y,Z;v.parameters={...v.parameters,docs:{...(X=v.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    title: 'Empty List',
    items: [],
    emptyMessage: 'No tasks yet. Add your first task to get started!',
    onAdd: (title: string) => console.log('Add:', title)
  }
}`,...(Z=(Y=v.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,te;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    title: 'Loading Items',
    items: [],
    isLoading: true
  }
}`,...(te=(ee=y.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var re,oe,se;x.parameters={...x.parameters,docs:{...(re=x.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    title: 'Failed to Load',
    items: [],
    error: 'Failed to fetch items. Please try again.',
    onRetry: () => console.log('Retry clicked')
  }
}`,...(se=(oe=x.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var le,ie,ae;j.parameters={...j.parameters,docs:{...(le=j.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    title: 'Quick Notes',
    items: sampleItems,
    variant: 'minimal',
    showFilters: false,
    showCount: false,
    onAdd: (title: string) => console.log('Add:', title),
    onToggle: (id: string) => console.log('Toggle:', id),
    onDelete: (id: string) => console.log('Delete:', id)
  }
}`,...(ae=(ie=j.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var ne,de,me;T.parameters={...T.parameters,docs:{...(ne=T.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    title: 'Project Tasks',
    items: sampleItems,
    variant: 'full',
    showFilters: true,
    showCount: true,
    placeholder: 'Add a new task...',
    onAdd: (title: string) => console.log('Add:', title),
    onToggle: (id: string) => console.log('Toggle:', id),
    onDelete: (id: string) => console.log('Delete:', id),
    onFilterChange: (filter: string) => console.log('Filter:', filter)
  }
}`,...(me=(de=T.parameters)==null?void 0:de.docs)==null?void 0:me.source}}};var ce,pe,ge;A.parameters={...A.parameters,docs:{...(ce=A.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    title: 'Active Tasks Only',
    items: sampleItems,
    filter: 'active',
    showFilters: true,
    onAdd: (title: string) => console.log('Add:', title),
    onToggle: (id: string) => console.log('Toggle:', id),
    onDelete: (id: string) => console.log('Delete:', id),
    onFilterChange: (filter: string) => console.log('Filter:', filter)
  }
}`,...(ge=(pe=A.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var ue,fe,he;w.parameters={...w.parameters,docs:{...(ue=w.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    title: 'Completed Tasks',
    items: sampleItems,
    filter: 'completed',
    showFilters: true,
    onAdd: (title: string) => console.log('Add:', title),
    onToggle: (id: string) => console.log('Toggle:', id),
    onDelete: (id: string) => console.log('Delete:', id),
    onFilterChange: (filter: string) => console.log('Filter:', filter)
  }
}`,...(he=(fe=w.parameters)==null?void 0:fe.docs)==null?void 0:he.source}}};var ve,ye,xe;b.parameters={...b.parameters,docs:{...(ve=b.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    title: 'Shopping List',
    items: [{
      id: '1',
      title: 'Milk',
      completed: false
    }, {
      id: '2',
      title: 'Bread',
      completed: true
    }, {
      id: '3',
      title: 'Eggs',
      completed: false
    }, {
      id: '4',
      title: 'Butter',
      completed: false
    }, {
      id: '5',
      title: 'Coffee',
      completed: true
    }],
    placeholder: 'Add item to list...',
    showFilters: false,
    onAdd: (title: string) => console.log('Add:', title),
    onToggle: (id: string) => console.log('Toggle:', id),
    onDelete: (id: string) => console.log('Delete:', id)
  }
}`,...(xe=(ye=b.parameters)==null?void 0:ye.docs)==null?void 0:xe.source}}};const er=["Default","Empty","Loading","WithError","Minimal","Full","FilteredActive","FilteredCompleted","ShoppingList"];export{h as Default,v as Empty,A as FilteredActive,w as FilteredCompleted,T as Full,y as Loading,j as Minimal,b as ShoppingList,x as WithError,er as __namedExportsOrder,$t as default};
