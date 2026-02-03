import{C as $}from"./CreditMeter-W0DSATns.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Box-DYJzRMmP.js";import"./Stack-1XI3stiC.js";import"./Typography-Wmkp-g7N.js";import"./Badge-Dd4QqFOk.js";import"./Button-B7t-_IKa.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./useEventBus-BNZMNlv8.js";import"./alert-triangle-BLuUOBNm.js";import"./clock-DT9ve7xf.js";const Ce={title:"Blaz-Klemenc/Atoms/CreditMeter",component:$,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:{type:"select"},options:["sm","md","lg"]},compact:{control:"boolean"},showActionButton:{control:"boolean"}}},e={id:"credit-1",traineeId:"trainee-1",totalCredits:10,remainingCredits:7},r={args:{data:e}},a={args:{data:{...e,remainingCredits:10}}},t={args:{data:{...e,remainingCredits:4}}},s={args:{data:{...e,remainingCredits:2}}},n={args:{data:{...e,remainingCredits:0}}},o={args:{data:{...e,remainingCredits:5,expiresAt:new Date(Date.now()+3*24*60*60*1e3)}}},i={args:{data:{...e,remainingCredits:3,expiresAt:new Date(Date.now()+1*24*60*60*1e3)}}},d={args:{data:{...e,remainingCredits:5},compact:!0}},c={args:{data:{...e,remainingCredits:5,expiresAt:new Date(Date.now()+5*24*60*60*1e3)},compact:!0}},m={args:{data:{...e,remainingCredits:6},size:"sm"}},p={args:{data:{...e,remainingCredits:8},size:"lg"}},g={args:{data:{...e,remainingCredits:2},showActionButton:!1}},u={args:{remainingCredits:5,totalCredits:20,expiresAt:new Date(Date.now()+14*24*60*60*1e3)}};var C,l,D;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    data: baseCreditData
  }
}`,...(D=(l=r.parameters)==null?void 0:l.docs)==null?void 0:D.source}}};var w,x,b;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 10
    }
  }
}`,...(b=(x=a.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var S,A,f;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 4
    }
  }
}`,...(f=(A=t.parameters)==null?void 0:A.docs)==null?void 0:f.source}}};var E,z,B;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 2
    }
  }
}`,...(B=(z=s.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var h,y,L;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 0
    }
  }
}`,...(L=(y=n.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};var M,T,F;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 5,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    }
  }
}`,...(F=(T=o.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var N,P,U;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 3,
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day from now
    }
  }
}`,...(U=(P=i.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var W,_,I;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 5
    },
    compact: true
  }
}`,...(I=(_=d.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var K,O,j;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 5,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    },
    compact: true
  }
}`,...(j=(O=c.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var k,q,v;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 6
    },
    size: "sm"
  }
}`,...(v=(q=m.parameters)==null?void 0:q.docs)==null?void 0:v.source}}};var G,H,J;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 8
    },
    size: "lg"
  }
}`,...(J=(H=p.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var Q,R,V;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 2
    },
    showActionButton: false
  }
}`,...(V=(R=g.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var X,Y,Z;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    remainingCredits: 5,
    totalCredits: 20,
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  }
}`,...(Z=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const le=["Default","FullCredits","MediumCredits","LowCredits","NoCredits","ExpiringCredits","ExpiresTomorrow","Compact","CompactExpiring","Small","Large","WithoutActionButton","UsingDirectProps"];export{d as Compact,c as CompactExpiring,r as Default,i as ExpiresTomorrow,o as ExpiringCredits,a as FullCredits,p as Large,s as LowCredits,t as MediumCredits,n as NoCredits,m as Small,u as UsingDirectProps,g as WithoutActionButton,le as __namedExportsOrder,Ce as default};
