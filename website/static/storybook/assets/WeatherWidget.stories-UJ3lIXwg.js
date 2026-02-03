import{j as e}from"./jsx-runtime-CDt2p4po.js";import{W as n}from"./WeatherWidget-CKo3qAcJ.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./Card-BNT5PrJ5.js";import"./Box-DYJzRMmP.js";import"./Stack-1XI3stiC.js";import"./Typography-Wmkp-g7N.js";import"./useEventBus-BNZMNlv8.js";import"./createLucideIcon-CbHznvEr.js";import"./sun-CDKJBaka.js";import"./minus-CvoF9liV.js";import"./trending-down-Dv2LyMoL.js";import"./trending-up-D7By3kN5.js";const se={title:"Clients/Winning-11/Molecules/WeatherWidget",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{condition:{control:"select",options:["sunny","cloudy","rainy","stormy"]},trend:{control:"select",options:["up","down","stable"]},size:{control:"select",options:["sm","md","lg"]}}},r={args:{condition:"sunny"}},o={args:{condition:"cloudy",forecast:"Some uncertainty in produce prices this week"}},t={args:{condition:"rainy",forecast:"Market slowdown expected - nurture existing partners"}},a={args:{condition:"stormy",forecast:"Significant market volatility - caution advised"}},s={args:{condition:"sunny",trend:"up",trendValue:12,forecast:"Demand for organic produce rising steadily"}},i={args:{condition:"rainy",trend:"down",trendValue:5,forecast:"Seasonal decrease in activity"}},c={args:{condition:"cloudy",trend:"stable",trendValue:0,forecast:"Market holding steady"}},d={args:{condition:"sunny",size:"sm",trend:"up",trendValue:8}},u={args:{condition:"sunny",size:"lg",forecast:"Perfect conditions for expanding your network",trend:"up",trendValue:15}},l={args:{condition:"sunny",forecast:"Click for detailed market analysis",event:"VIEW_FORECAST"}},p={render:()=>e.jsxs("div",{className:"flex w-[350px] flex-col gap-3",children:[e.jsx(n,{condition:"sunny",trend:"up",trendValue:12}),e.jsx(n,{condition:"cloudy",trend:"stable",trendValue:0}),e.jsx(n,{condition:"rainy",trend:"down",trendValue:5}),e.jsx(n,{condition:"stormy",trend:"down",trendValue:18})]})};var m,g,y;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    condition: 'sunny'
  }
}`,...(y=(g=r.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var f,S,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    condition: 'cloudy',
    forecast: 'Some uncertainty in produce prices this week'
  }
}`,...(x=(S=o.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var V,w,W;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    condition: 'rainy',
    forecast: 'Market slowdown expected - nurture existing partners'
  }
}`,...(W=(w=t.parameters)==null?void 0:w.docs)==null?void 0:W.source}}};var k,h,v;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    condition: 'stormy',
    forecast: 'Significant market volatility - caution advised'
  }
}`,...(v=(h=a.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var C,b,T;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    condition: 'sunny',
    trend: 'up',
    trendValue: 12,
    forecast: 'Demand for organic produce rising steadily'
  }
}`,...(T=(b=s.parameters)==null?void 0:b.docs)==null?void 0:T.source}}};var j,E,z;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    condition: 'rainy',
    trend: 'down',
    trendValue: 5,
    forecast: 'Seasonal decrease in activity'
  }
}`,...(z=(E=i.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var M,R,A;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    condition: 'cloudy',
    trend: 'stable',
    trendValue: 0,
    forecast: 'Market holding steady'
  }
}`,...(A=(R=c.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var D,_,O;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    condition: 'sunny',
    size: 'sm',
    trend: 'up',
    trendValue: 8
  }
}`,...(O=(_=d.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var F,I,L;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    condition: 'sunny',
    size: 'lg',
    forecast: 'Perfect conditions for expanding your network',
    trend: 'up',
    trendValue: 15
  }
}`,...(L=(I=u.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var N,P,q;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    condition: 'sunny',
    forecast: 'Click for detailed market analysis',
    event: 'VIEW_FORECAST'
  }
}`,...(q=(P=l.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};var B,G,H;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="flex w-[350px] flex-col gap-3">
      <WeatherWidget condition="sunny" trend="up" trendValue={12} />
      <WeatherWidget condition="cloudy" trend="stable" trendValue={0} />
      <WeatherWidget condition="rainy" trend="down" trendValue={5} />
      <WeatherWidget condition="stormy" trend="down" trendValue={18} />
    </div>
}`,...(H=(G=p.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const ie=["Sunny","Cloudy","Rainy","Stormy","WithTrend","DownTrend","StableTrend","Small","Large","Clickable","AllConditions"];export{p as AllConditions,l as Clickable,o as Cloudy,i as DownTrend,u as Large,t as Rainy,d as Small,c as StableTrend,a as Stormy,r as Sunny,s as WithTrend,ie as __namedExportsOrder,se as default};
