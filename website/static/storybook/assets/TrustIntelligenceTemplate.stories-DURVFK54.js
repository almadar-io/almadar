import{j as e}from"./jsx-runtime-CDt2p4po.js";import{c}from"./cn-BNf5BS2b.js";import{B as y}from"./Box-DYJzRMmP.js";import{V as a,H as t}from"./Stack-DhhoTPuC.js";import{T as s}from"./Typography-Wmkp-g7N.js";import{C as d}from"./Card-BNT5PrJ5.js";import{B as le}from"./Badge-CpH0PNM6.js";import{S as ie}from"./Spinner-vF2DJrH5.js";import{T as me}from"./TrustMeter-CMZeLnbQ.js";import{u as de}from"./useEventBus-BNZMNlv8.js";import{A as P}from"./activity-DUdIMRW5.js";import{S as ue}from"./shield-CEa1K-yC.js";import{A as I}from"./award-DIurtA9C.js";import{U as pe}from"./users-CV1mGUsS.js";import{T as ge}from"./trending-up-D7By3kN5.js";import{T as he}from"./trending-down-Dv2LyMoL.js";import"./index-GiUgBvb1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";const xe=r=>r>=80?"thriving":r>=60?"healthy":r>=40?"declining":"withering",fe=({trend:r})=>{if(!r||r==="stable")return null;const o=r==="up"?ge:he,w=r==="up"?"text-emerald-500":"text-red-500";return e.jsx(o,{className:c("h-5 w-5",w)})},T=({userScore:r,networkAverage:o=65,topPerformers:w=[],recentChanges:ae=[],isLoading:ne=!1,error:N=null,title:te="Trust Intelligence",className:k})=>{const oe=de(),ce=n=>{oe.emit("UI:VIEW",{row:n,entity:"TrustScore"})};return ne?e.jsxs(a,{align:"center",justify:"center",className:c("py-12",k),children:[e.jsx(ie,{size:"lg"}),e.jsx(s,{variant:"body",className:"text-neutral-500",children:"Calculating trust metrics..."})]}):N?e.jsx(a,{align:"center",justify:"center",className:c("py-12",k),children:e.jsxs(s,{variant:"body",className:"text-red-500",children:["Error: ",N.message]})}):e.jsxs(a,{gap:"lg",className:c("p-6",k),children:[e.jsxs(t,{justify:"between",align:"center",children:[e.jsxs(a,{gap:"xs",children:[e.jsx(s,{variant:"h1",children:te}),e.jsx(s,{variant:"body",className:"text-neutral-500",children:"Your trust metrics and network insights"})]}),e.jsxs(le,{variant:"info",className:"gap-1",children:[e.jsx(P,{className:"h-3 w-3"}),"Live"]})]}),r&&e.jsx(d,{className:"p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",children:e.jsxs(t,{justify:"between",align:"start",wrap:!0,gap:"lg",children:[e.jsxs(a,{gap:"md",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(y,{rounded:"full",padding:"sm",className:"bg-blue-100",children:e.jsx(ue,{className:"h-8 w-8 text-blue-600"})}),e.jsxs(a,{gap:"none",children:[e.jsx(s,{variant:"label",className:"text-neutral-500",children:"Your Trust Score"}),e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(s,{variant:"h1",className:"text-blue-600",children:r.overallScore}),e.jsx(fe,{trend:r.trend})]})]})]}),e.jsx(me,{healthStatus:xe(r.overallScore),growthPoints:r.overallScore,size:"lg"})]}),e.jsxs(a,{gap:"sm",className:"min-w-[200px]",children:[e.jsx(s,{variant:"label",className:"text-neutral-500",children:"Score Breakdown"}),r.reliabilityScore!==void 0&&e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",children:"Reliability"}),e.jsxs(s,{variant:"small",className:"font-medium",children:[r.reliabilityScore,"%"]})]}),r.consistencyScore!==void 0&&e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",children:"Consistency"}),e.jsxs(s,{variant:"small",className:"font-medium",children:[r.consistencyScore,"%"]})]}),r.communicationScore!==void 0&&e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",children:"Communication"}),e.jsxs(s,{variant:"small",className:"font-medium",children:[r.communicationScore,"%"]})]})]}),r.rank&&r.totalUsers&&e.jsxs(a,{align:"center",gap:"xs",children:[e.jsx(y,{rounded:"full",padding:"md",className:"bg-amber-100",children:e.jsx(I,{className:"h-8 w-8 text-amber-600"})}),e.jsx(s,{variant:"label",className:"text-neutral-500",children:"Network Rank"}),e.jsxs(s,{variant:"h3",children:["#",r.rank," ",e.jsxs(s,{as:"span",variant:"small",className:"text-neutral-400",children:["of ",r.totalUsers]})]})]})]})}),e.jsxs(y,{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsx(d,{className:"p-4",children:e.jsxs(a,{gap:"sm",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(pe,{className:"h-5 w-5 text-neutral-400"}),e.jsx(s,{variant:"label",className:"text-neutral-500",children:"Network Average"})]}),e.jsx(s,{variant:"h2",children:o}),r&&e.jsx(s,{variant:"small",className:c(r.overallScore>o?"text-emerald-600":"text-amber-600"),children:r.overallScore>o?`+${r.overallScore-o} above average`:`${o-r.overallScore} below average`})]})}),e.jsx(d,{className:"p-4",children:e.jsxs(a,{gap:"sm",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(I,{className:"h-5 w-5 text-amber-500"}),e.jsx(s,{variant:"label",className:"text-neutral-500",children:"Top Performers"})]}),e.jsx(a,{gap:"xs",children:w.slice(0,3).map((n,b)=>{var C;return e.jsxs(t,{justify:"between",className:"cursor-pointer hover:bg-neutral-50 p-1 rounded",onClick:()=>ce(n),children:[e.jsxs(s,{variant:"small",children:["#",b+1," User ",((C=n.userId)==null?void 0:C.slice(-4))||n.id.slice(-4)]}),e.jsx(s,{variant:"small",className:"font-medium text-emerald-600",children:n.overallScore})]},n.id)})})]})}),e.jsx(d,{className:"p-4",children:e.jsxs(a,{gap:"sm",children:[e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(P,{className:"h-5 w-5 text-blue-500"}),e.jsx(s,{variant:"label",className:"text-neutral-500",children:"Recent Changes"})]}),e.jsx(a,{gap:"xs",children:ae.slice(0,3).map((n,b)=>e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",className:"text-neutral-500",children:n.date}),e.jsxs(s,{variant:"small",className:c("font-medium",n.change>0?"text-emerald-600":"text-red-600"),children:[n.change>0?"+":"",n.change]})]},b))})]})})]})]})};T.displayName="TrustIntelligenceTemplate";T.__docgenInfo={description:"",methods:[],displayName:"TrustIntelligenceTemplate",props:{userScore:{required:!1,tsType:{name:"TrustScoreData"},description:"Current user's trust score"},networkAverage:{required:!1,tsType:{name:"number"},description:"Network average score",defaultValue:{value:"65",computed:!1}},topPerformers:{required:!1,tsType:{name:"unknown"},description:"Top performers",defaultValue:{value:"[]",computed:!1}},recentChanges:{required:!1,tsType:{name:"unknown"},description:"Recent score changes",defaultValue:{value:"[]",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Page title",defaultValue:{value:'"Trust Intelligence"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const l={id:"ts-1",userId:"user-1",overallScore:82,reliabilityScore:85,consistencyScore:78,communicationScore:83,trend:"up",rank:12,totalUsers:150},i=[{id:"ts-2",userId:"user-2",overallScore:95,trend:"stable"},{id:"ts-3",userId:"user-3",overallScore:92,trend:"up"},{id:"ts-4",userId:"user-4",overallScore:89,trend:"up"},{id:"ts-5",userId:"user-5",overallScore:87,trend:"down"},{id:"ts-6",userId:"user-6",overallScore:85,trend:"stable"}],m=[{date:"Jan 28",change:3},{date:"Jan 27",change:-1},{date:"Jan 26",change:5},{date:"Jan 25",change:2},{date:"Jan 24",change:-2}],qe={title:"Clients/Winning-11/Templates/TrustIntelligenceTemplate",component:T,parameters:{layout:"fullscreen"},tags:["autodocs"]},u={args:{userScore:l,networkAverage:65,topPerformers:i,recentChanges:m}},p={args:{userScore:{...l,overallScore:95,reliabilityScore:98,consistencyScore:92,communicationScore:95,rank:3},networkAverage:65,topPerformers:i,recentChanges:m}},g={args:{userScore:{...l,overallScore:35,reliabilityScore:40,consistencyScore:30,communicationScore:35,trend:"down",rank:120},networkAverage:65,topPerformers:i,recentChanges:m}},h={args:{userScore:{...l,trend:"down"},networkAverage:65,topPerformers:i,recentChanges:[{date:"Jan 28",change:-3},{date:"Jan 27",change:-2},{date:"Jan 26",change:-1}]}},x={args:{networkAverage:65,topPerformers:i,recentChanges:m}},f={args:{isLoading:!0}},j={args:{error:new Error("Failed to calculate trust metrics")}},v={args:{userScore:l,networkAverage:65,topPerformers:[],recentChanges:[]}},S={args:{userScore:l,networkAverage:65,topPerformers:i,recentChanges:m,title:"Your Trust Dashboard"}};var A,U,E;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    userScore: mockUserScore,
    networkAverage: 65,
    topPerformers: mockTopPerformers,
    recentChanges: mockRecentChanges
  }
}`,...(E=(U=u.parameters)==null?void 0:U.docs)==null?void 0:E.source}}};var J,R,L;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    userScore: {
      ...mockUserScore,
      overallScore: 95,
      reliabilityScore: 98,
      consistencyScore: 92,
      communicationScore: 95,
      rank: 3
    },
    networkAverage: 65,
    topPerformers: mockTopPerformers,
    recentChanges: mockRecentChanges
  }
}`,...(L=(R=p.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var V,q,D;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    userScore: {
      ...mockUserScore,
      overallScore: 35,
      reliabilityScore: 40,
      consistencyScore: 30,
      communicationScore: 35,
      trend: "down",
      rank: 120
    },
    networkAverage: 65,
    topPerformers: mockTopPerformers,
    recentChanges: mockRecentChanges
  }
}`,...(D=(q=g.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var B,H,Y;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    userScore: {
      ...mockUserScore,
      trend: "down"
    },
    networkAverage: 65,
    topPerformers: mockTopPerformers,
    recentChanges: [{
      date: "Jan 28",
      change: -3
    }, {
      date: "Jan 27",
      change: -2
    }, {
      date: "Jan 26",
      change: -1
    }]
  }
}`,...(Y=(H=h.parameters)==null?void 0:H.docs)==null?void 0:Y.source}}};var _,F,$;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    networkAverage: 65,
    topPerformers: mockTopPerformers,
    recentChanges: mockRecentChanges
  }
}`,...($=(F=x.parameters)==null?void 0:F.docs)==null?void 0:$.source}}};var z,W,M;f.parameters={...f.parameters,docs:{...(z=f.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...(M=(W=f.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};var O,G,K;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    error: new Error("Failed to calculate trust metrics")
  }
}`,...(K=(G=j.parameters)==null?void 0:G.docs)==null?void 0:K.source}}};var Q,X,Z;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    userScore: mockUserScore,
    networkAverage: 65,
    topPerformers: [],
    recentChanges: []
  }
}`,...(Z=(X=v.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,re,se;S.parameters={...S.parameters,docs:{...(ee=S.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    userScore: mockUserScore,
    networkAverage: 65,
    topPerformers: mockTopPerformers,
    recentChanges: mockRecentChanges,
    title: "Your Trust Dashboard"
  }
}`,...(se=(re=S.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};const De=["Default","HighScore","LowScore","TrendingDown","NoUserScore","Loading","ErrorState","EmptyTopPerformers","CustomTitle"];export{S as CustomTitle,u as Default,v as EmptyTopPerformers,j as ErrorState,p as HighScore,f as Loading,g as LowScore,x as NoUserScore,h as TrendingDown,De as __namedExportsOrder,qe as default};
