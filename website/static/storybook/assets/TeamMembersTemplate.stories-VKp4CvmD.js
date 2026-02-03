import{j as e}from"./jsx-runtime-CDt2p4po.js";import{R as _}from"./index-GiUgBvb1.js";import{c as u}from"./cn-BNf5BS2b.js";import{B as O}from"./Box-DYJzRMmP.js";import{V as t,H as n}from"./Stack-DhhoTPuC.js";import{T as r}from"./Typography-Wmkp-g7N.js";import{B as g}from"./Button-Dn0472P0.js";import{I as Ve}from"./Input-DhFss4oc.js";import{C as p}from"./Card-BNT5PrJ5.js";import{B as F}from"./Badge-CpH0PNM6.js";import{A as ze}from"./Avatar-CJtPgGUU.js";import{S as _e}from"./Spinner-vF2DJrH5.js";import{u as Fe}from"./useEventBus-BNZMNlv8.js";import{A as We}from"./arrow-left-CMPuXvFr.js";import{U as He}from"./user-plus-BlQDsowZ.js";import{C as U,U as $e}from"./user-minus-BiKOst1L.js";import{S as Je}from"./search-CCKipEn6.js";import{U as B}from"./users-CV1mGUsS.js";import{S as Ke}from"./shield-CEa1K-yC.js";import{C as Ge}from"./calendar-rGtwHcH_.js";import{E as Ae}from"./eye-DPfPdwVp.js";import{S as Qe}from"./square-pen-D7sL1yO_.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./chevron-down-BQmz_Bpa.js";import"./x-prXd1WI5.js";import"./user-BePscFH1.js";const Xe=a=>{switch(a){case"leader":return{color:"warning",icon:U,label:"Leader"};case"member":return{color:"info",icon:B,label:"Member"};case"observer":return{color:"neutral",icon:Ae,label:"Observer"};default:return{color:"neutral",icon:B,label:a}}},Ye=a=>{switch(a){case"active":return"success";case"inactive":return"neutral";case"pending":return"warning";default:return"neutral"}},Ze=({member:a,onAction:i})=>{const l=Xe(a.role),P=l.icon,c=a.role==="leader";return e.jsx(p,{className:"p-4 hover:shadow-md transition-shadow",children:e.jsxs(t,{gap:"md",children:[e.jsxs(n,{justify:"between",align:"start",children:[e.jsxs(n,{gap:"sm",align:"center",children:[e.jsxs(O,{className:"relative",children:[e.jsx(ze,{name:a.userName||a.userEmail||"User",size:"lg"}),c&&e.jsx(O,{className:"absolute -top-1 -right-1 bg-amber-500 rounded-full p-1",children:e.jsx(U,{className:"h-3 w-3 text-white"})})]}),e.jsxs(t,{gap:"none",children:[e.jsx(r,{variant:"body",className:"font-medium",children:a.userName||`User ${a.userId.slice(-4)}`}),a.userEmail&&e.jsx(r,{variant:"small",className:"text-neutral-500",children:a.userEmail})]})]}),e.jsx(F,{variant:Ye(a.status),children:a.status})]}),e.jsxs(n,{gap:"md",wrap:!0,children:[e.jsxs(F,{variant:l.color,className:"gap-1",children:[e.jsx(P,{className:"h-3 w-3"}),l.label]}),a.trustScore!==void 0&&e.jsxs(n,{gap:"xs",align:"center",children:[e.jsx(Ke,{className:"h-3 w-3 text-blue-500"}),e.jsxs(r,{variant:"small",className:"font-medium",children:["Trust: ",a.trustScore]})]}),a.contributionScore!==void 0&&e.jsxs(r,{variant:"small",className:"text-neutral-500",children:["Contribution: ",a.contributionScore,"%"]})]}),e.jsxs(n,{gap:"md",className:"text-neutral-500",children:[e.jsxs(n,{gap:"xs",align:"center",children:[e.jsx(Ge,{className:"h-3 w-3"}),e.jsxs(r,{variant:"small",children:["Joined ",new Date(a.joinedAt).toLocaleDateString()]})]}),a.lastActiveAt&&e.jsxs(r,{variant:"small",children:["Last active ",new Date(a.lastActiveAt).toLocaleDateString()]})]}),e.jsxs(n,{gap:"sm",className:"pt-2 border-t",children:[e.jsxs(g,{variant:"ghost",size:"sm",onClick:()=>i("VIEW",a),className:"gap-1",children:[e.jsx(Ae,{className:"h-3 w-3"}),"View"]}),e.jsxs(g,{variant:"ghost",size:"sm",onClick:()=>i("EDIT_ROLE",a),className:"gap-1",children:[e.jsx(Qe,{className:"h-3 w-3"}),"Edit Role"]}),!c&&e.jsxs(g,{variant:"ghost",size:"sm",onClick:()=>i("REMOVE",a),className:"gap-1 text-red-500 hover:text-red-600",children:[e.jsx($e,{className:"h-3 w-3"}),"Remove"]})]})]})})},R=({items:a,data:i,teamName:l,teamId:P,isLoading:c=!1,error:L=null,title:ke,showBack:Ee=!0,showSearch:Me=!0,className:Oe})=>{const h=Fe(),[x,Pe]=_.useState(""),[m,f]=_.useState("all"),d=a||i||[],Le=()=>{h.emit("UI:BACK",{})},Be=s=>{Pe(s),h.emit("UI:SEARCH",{searchTerm:s})},Ue=()=>{h.emit("UI:ADD_MEMBER",{teamId:P})},Re=(s,j)=>{h.emit(`UI:${s}`,{row:j,entity:"TeamMember"})},q=d.filter(s=>{var j,V;if(m!=="all"&&s.role!==m)return!1;if(x){const z=x.toLowerCase();return((j=s.userName)==null?void 0:j.toLowerCase().includes(z))||((V=s.userEmail)==null?void 0:V.toLowerCase().includes(z))}return!0}),N={total:d.length,leaders:d.filter(s=>s.role==="leader").length,members:d.filter(s=>s.role==="member").length,observers:d.filter(s=>s.role==="observer").length},qe=ke||(l?`${l} Members`:"Team Members");return e.jsxs(t,{gap:"lg",className:u("p-6",Oe),children:[e.jsxs(n,{justify:"between",align:"center",wrap:!0,children:[e.jsxs(n,{gap:"md",align:"center",children:[Ee&&e.jsxs(g,{variant:"ghost",onClick:Le,className:"gap-2",children:[e.jsx(We,{className:"h-4 w-4"}),"Back"]}),e.jsxs(t,{gap:"xs",children:[e.jsx(r,{variant:"h1",children:qe}),e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Manage team members and roles"})]})]}),e.jsxs(g,{variant:"primary",onClick:Ue,className:"gap-2",children:[e.jsx(He,{className:"h-4 w-4"}),"Add Member"]})]}),e.jsxs(n,{gap:"md",wrap:!0,children:[e.jsx(p,{className:u("px-4 py-2 cursor-pointer",m==="all"&&"ring-2 ring-blue-500"),onClick:()=>f("all"),children:e.jsxs(t,{gap:"none",align:"center",children:[e.jsx(r,{variant:"h4",children:N.total}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Total"})]})}),e.jsx(p,{className:u("px-4 py-2 cursor-pointer",m==="leader"&&"ring-2 ring-amber-500"),onClick:()=>f("leader"),children:e.jsxs(t,{gap:"none",align:"center",children:[e.jsxs(n,{gap:"xs",align:"center",children:[e.jsx(U,{className:"h-4 w-4 text-amber-500"}),e.jsx(r,{variant:"h4",className:"text-amber-600",children:N.leaders})]}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Leaders"})]})}),e.jsx(p,{className:u("px-4 py-2 cursor-pointer",m==="member"&&"ring-2 ring-blue-500"),onClick:()=>f("member"),children:e.jsxs(t,{gap:"none",align:"center",children:[e.jsx(r,{variant:"h4",className:"text-blue-600",children:N.members}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Members"})]})}),e.jsx(p,{className:u("px-4 py-2 cursor-pointer",m==="observer"&&"ring-2 ring-neutral-500"),onClick:()=>f("observer"),children:e.jsxs(t,{gap:"none",align:"center",children:[e.jsx(r,{variant:"h4",className:"text-neutral-600",children:N.observers}),e.jsx(r,{variant:"small",className:"text-neutral-500",children:"Observers"})]})})]}),Me&&e.jsx(O,{className:"w-full max-w-sm",children:e.jsx(Ve,{placeholder:"Search members...",value:x,onChange:s=>Be(s.target.value),leftIcon:e.jsx(Je,{className:"h-4 w-4 text-neutral-400"})})}),c&&e.jsxs(t,{align:"center",justify:"center",className:"py-12",children:[e.jsx(_e,{size:"lg"}),e.jsx(r,{variant:"body",className:"text-neutral-500",children:"Loading members..."})]}),L&&e.jsx(t,{align:"center",justify:"center",className:"py-12",children:e.jsxs(r,{variant:"body",className:"text-red-500",children:["Error: ",L.message]})}),!c&&!L&&e.jsx(e.Fragment,{children:q.length===0?e.jsxs(t,{align:"center",justify:"center",className:"py-12",children:[e.jsx(B,{className:"h-12 w-12 text-neutral-300"}),e.jsx(r,{variant:"h3",className:"text-neutral-500",children:"No members found"}),e.jsx(r,{variant:"body",className:"text-neutral-400",children:x||m!=="all"?"Try different filters":"Add members to this team"})]}):e.jsx(O,{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:q.map(s=>e.jsx(Ze,{member:s,onAction:Re},s.id))})})]})};R.displayName="TeamMembersTemplate";R.__docgenInfo={description:"",methods:[],displayName:"TeamMembersTemplate",props:{items:{required:!1,tsType:{name:"unknown"},description:"Team member items to display"},data:{required:!1,tsType:{name:"unknown"},description:"Data prop alias"},teamName:{required:!1,tsType:{name:"string"},description:"Team name for header"},teamId:{required:!1,tsType:{name:"string"},description:"Team ID"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Page title"},showBack:{required:!1,tsType:{name:"boolean"},description:"Show back button",defaultValue:{value:"true",computed:!1}},showSearch:{required:!1,tsType:{name:"boolean"},description:"Show search",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const o=[{id:"tm-1",teamId:"team-1",userId:"user-1",userName:"Alex Thompson",userEmail:"alex.thompson@example.com",role:"leader",status:"active",trustScore:92,contributionScore:95,joinedAt:new Date(Date.now()-1e3*60*60*24*180).toISOString(),lastActiveAt:new Date(Date.now()-1e3*60*60*2).toISOString()},{id:"tm-2",teamId:"team-1",userId:"user-2",userName:"Sarah Chen",userEmail:"sarah.chen@example.com",role:"member",status:"active",trustScore:88,contributionScore:82,joinedAt:new Date(Date.now()-1e3*60*60*24*150).toISOString(),lastActiveAt:new Date(Date.now()-1e3*60*60*24).toISOString()},{id:"tm-3",teamId:"team-1",userId:"user-3",userName:"Mike Rodriguez",userEmail:"mike.r@example.com",role:"member",status:"active",trustScore:85,contributionScore:78,joinedAt:new Date(Date.now()-1e3*60*60*24*120).toISOString(),lastActiveAt:new Date(Date.now()-1e3*60*60*12).toISOString()},{id:"tm-4",teamId:"team-1",userId:"user-4",userName:"Emily Watson",userEmail:"emily.watson@example.com",role:"member",status:"inactive",trustScore:82,contributionScore:65,joinedAt:new Date(Date.now()-1e3*60*60*24*90).toISOString(),lastActiveAt:new Date(Date.now()-1e3*60*60*24*14).toISOString()},{id:"tm-5",teamId:"team-1",userId:"user-5",userName:"David Kim",userEmail:"david.kim@example.com",role:"member",status:"active",trustScore:86,contributionScore:88,joinedAt:new Date(Date.now()-1e3*60*60*24*60).toISOString(),lastActiveAt:new Date().toISOString()},{id:"tm-6",teamId:"team-1",userId:"user-6",userName:"Lisa Park",userEmail:"lisa.park@example.com",role:"observer",status:"active",trustScore:79,contributionScore:45,joinedAt:new Date(Date.now()-1e3*60*60*24*30).toISOString(),lastActiveAt:new Date(Date.now()-1e3*60*60*48).toISOString()},{id:"tm-7",teamId:"team-1",userId:"user-7",userName:"James Wilson",userEmail:"james.w@example.com",role:"member",status:"pending",joinedAt:new Date(Date.now()-1e3*60*60*2).toISOString()}],Ta={title:"Clients/Winning-11/Templates/TeamMembersTemplate",component:R,parameters:{layout:"fullscreen"},tags:["autodocs"]},S={args:{items:o,teamName:"Core Platform",teamId:"team-1"}},b={args:{items:o.filter(a=>a.role==="leader"),teamName:"Core Platform",teamId:"team-1"}},w={args:{items:o.filter(a=>a.role==="member"),teamName:"Core Platform",teamId:"team-1"}},v={args:{items:o.filter(a=>a.role==="observer"),teamName:"Core Platform",teamId:"team-1"}},I={args:{items:o.filter(a=>a.status==="active"),teamName:"Core Platform",teamId:"team-1"}},C={args:{items:[],isLoading:!0,teamName:"Core Platform"}},y={args:{items:[],isLoading:!1,teamName:"New Team",teamId:"team-new"}},T={args:{items:[],error:new Error("Failed to load team members"),teamName:"Core Platform"}},D={args:{items:o,teamName:"Core Platform",teamId:"team-1",showBack:!1}},A={args:{items:o,teamName:"Core Platform",teamId:"team-1",showSearch:!1}},k={args:{items:o,teamId:"team-1",title:"Platform Team Members"}},E={args:{items:o.slice(0,2),teamName:"Small Team",teamId:"team-small"}},M={args:{data:o,teamName:"Core Platform",teamId:"team-1"}};var W,H,$;S.parameters={...S.parameters,docs:{...(W=S.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    items: mockMembers,
    teamName: "Core Platform",
    teamId: "team-1"
  }
}`,...($=(H=S.parameters)==null?void 0:H.docs)==null?void 0:$.source}}};var J,K,G;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    items: mockMembers.filter(m => m.role === "leader"),
    teamName: "Core Platform",
    teamId: "team-1"
  }
}`,...(G=(K=b.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var Q,X,Y;w.parameters={...w.parameters,docs:{...(Q=w.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    items: mockMembers.filter(m => m.role === "member"),
    teamName: "Core Platform",
    teamId: "team-1"
  }
}`,...(Y=(X=w.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ae;v.parameters={...v.parameters,docs:{...(Z=v.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    items: mockMembers.filter(m => m.role === "observer"),
    teamName: "Core Platform",
    teamId: "team-1"
  }
}`,...(ae=(ee=v.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var re,se,te;I.parameters={...I.parameters,docs:{...(re=I.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    items: mockMembers.filter(m => m.status === "active"),
    teamName: "Core Platform",
    teamId: "team-1"
  }
}`,...(te=(se=I.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var ne,oe,me;C.parameters={...C.parameters,docs:{...(ne=C.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    items: [],
    isLoading: true,
    teamName: "Core Platform"
  }
}`,...(me=(oe=C.parameters)==null?void 0:oe.docs)==null?void 0:me.source}}};var le,ie,ce;y.parameters={...y.parameters,docs:{...(le=y.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    items: [],
    isLoading: false,
    teamName: "New Team",
    teamId: "team-new"
  }
}`,...(ce=(ie=y.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var de,ue,pe;T.parameters={...T.parameters,docs:{...(de=T.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    items: [],
    error: new Error("Failed to load team members"),
    teamName: "Core Platform"
  }
}`,...(pe=(ue=T.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var ge,he,xe;D.parameters={...D.parameters,docs:{...(ge=D.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    items: mockMembers,
    teamName: "Core Platform",
    teamId: "team-1",
    showBack: false
  }
}`,...(xe=(he=D.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var fe,Ne,je;A.parameters={...A.parameters,docs:{...(fe=A.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    items: mockMembers,
    teamName: "Core Platform",
    teamId: "team-1",
    showSearch: false
  }
}`,...(je=(Ne=A.parameters)==null?void 0:Ne.docs)==null?void 0:je.source}}};var Se,be,we;k.parameters={...k.parameters,docs:{...(Se=k.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    items: mockMembers,
    teamId: "team-1",
    title: "Platform Team Members"
  }
}`,...(we=(be=k.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var ve,Ie,Ce;E.parameters={...E.parameters,docs:{...(ve=E.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    items: mockMembers.slice(0, 2),
    teamName: "Small Team",
    teamId: "team-small"
  }
}`,...(Ce=(Ie=E.parameters)==null?void 0:Ie.docs)==null?void 0:Ce.source}}};var ye,Te,De;M.parameters={...M.parameters,docs:{...(ye=M.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    data: mockMembers,
    teamName: "Core Platform",
    teamId: "team-1"
  }
}`,...(De=(Te=M.parameters)==null?void 0:Te.docs)==null?void 0:De.source}}};const Da=["Default","LeadersOnly","MembersOnly","ObserversOnly","ActiveOnly","Loading","Empty","ErrorState","NoBackButton","NoSearch","CustomTitle","SmallTeam","UsingDataProp"];export{I as ActiveOnly,k as CustomTitle,S as Default,y as Empty,T as ErrorState,b as LeadersOnly,C as Loading,w as MembersOnly,D as NoBackButton,A as NoSearch,v as ObserversOnly,E as SmallTeam,M as UsingDataProp,Da as __namedExportsOrder,Ta as default};
