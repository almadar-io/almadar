import{G as $}from"./GardenView-BwLpuZKY.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./cn-BNf5BS2b.js";import"./useEventBus-BNZMNlv8.js";import"./useQuerySingleton-BfKwTnRX.js";import"./PlantCard-DBgZC5NZ.js";import"./Card-BNT5PrJ5.js";import"./Badge-CpH0PNM6.js";import"./Button-Dn0472P0.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Box-DYJzRMmP.js";import"./Stack-DhhoTPuC.js";import"./Typography-Wmkp-g7N.js";import"./GrowthMeter-CJHkjVjN.js";import"./sprout-DtMiqT4n.js";import"./leaf-BDxyAs1g.js";import"./TrustMeter-CMZeLnbQ.js";import"./award-DIurtA9C.js";import"./shield-CEa1K-yC.js";import"./CareIndicator-Cytufey8.js";import"./star-D_3mxVsm.js";import"./truck-CSOrl2J5.js";import"./credit-card-CQwe3_yO.js";import"./message-circle-Yw7MGdXs.js";import"./alert-circle-CBFh8Gcj.js";import"./WeatherWidget-DRSiPF4z.js";import"./sun-CDKJBaka.js";import"./minus-CvoF9liV.js";import"./trending-down-Dv2LyMoL.js";import"./trending-up-D7By3kN5.js";import"./SeasonIndicator-BnWnx_2M.js";import"./wheat-Cj9YfHNs.js";import"./Spinner-vF2DJrH5.js";import"./plus-jSzJaRn3.js";const e=[{id:"rh-1",connectionId:"conn-1",name:"Green Valley Farm",category:"professional",healthStatus:"thriving",visualMetaphor:"flowering",leafColor:"vibrant-green",growthPoints:95,lastWateredAt:new Date(Date.now()-1e3*60*60*24).toISOString(),wateringCount:25,outreachCycleDays:7},{id:"rh-2",connectionId:"conn-2",name:"Sunrise Orchards",category:"professional",healthStatus:"declining",visualMetaphor:"sapling",leafColor:"yellow",growthPoints:45,lastWateredAt:new Date(Date.now()-1e3*60*60*24*14).toISOString(),missedOutreachCount:2,wateringCount:8,outreachCycleDays:7},{id:"rh-3",connectionId:"conn-3",name:"Heritage Grains Co.",category:"mentor",healthStatus:"healthy",visualMetaphor:"sprout",leafColor:"green",growthPoints:30,lastWateredAt:new Date().toISOString(),wateringCount:5,outreachCycleDays:14},{id:"rh-4",connectionId:"conn-4",name:"Mountain Dairy",category:"professional",healthStatus:"healthy",visualMetaphor:"tree",leafColor:"green",growthPoints:70,lastWateredAt:new Date(Date.now()-1e3*60*60*24*3).toISOString(),wateringCount:18,outreachCycleDays:7},{id:"rh-5",connectionId:"conn-5",name:"Coastal Fisheries",category:"community",healthStatus:"withering",visualMetaphor:"seedling",leafColor:"brown",growthPoints:15,lastWateredAt:new Date(Date.now()-1e3*60*60*24*30).toISOString(),missedOutreachCount:4,wateringCount:2,outreachCycleDays:7},{id:"rh-6",connectionId:"conn-6",name:"Prairie Fields",category:"mentee",healthStatus:"thriving",visualMetaphor:"tree",leafColor:"vibrant-green",growthPoints:88,lastWateredAt:new Date(Date.now()-1e3*60*60*24*2).toISOString(),wateringCount:22,outreachCycleDays:14}],Ge={title:"Clients/Winning-11/Organisms/GardenView",component:$,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{layout:{control:"select",options:["grid","organic","rows"]},weatherCondition:{control:"select",options:["sunny","cloudy","rainy","stormy"]},season:{control:"select",options:["planting","growing","harvest","rest"]}}},r={args:{items:e,entity:"RelationshipHealth"}},o={args:{items:e,layout:"grid",entity:"RelationshipHealth"}},a={args:{items:e,layout:"organic",entity:"RelationshipHealth"}},s={args:{items:e,layout:"rows",entity:"RelationshipHealth"}},n={args:{items:e,showWeather:!0,weatherCondition:"sunny",weatherForecast:"Great conditions for building new partnerships",weatherTrend:"up",showSeason:!0,season:"growing",seasonProgress:65}},i={args:{items:e,weatherCondition:"rainy",weatherForecast:"Focus on nurturing existing relationships",weatherTrend:"down",season:"harvest",seasonProgress:80}},c={args:{items:e,itemActions:[{label:"View",event:"VIEW"},{label:"Tend",event:"EDIT",variant:"ghost"}]}},m={args:{items:[],emptyTitle:"Your garden awaits",emptyDescription:"Start by adding your first connection to grow a relationship",showCreateAction:!0}},p={args:{items:[],isLoading:!0}},t={args:{items:[],error:new t("Failed to load relationships")}},l={args:{items:e.slice(0,2),weatherCondition:"cloudy",season:"planting",seasonProgress:25}},g={args:{items:e,showWeather:!1,showSeason:!1}},d={args:{data:e,entity:"RelationshipHealth"}};var h,u,w;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    items: mockItems,
    entity: "RelationshipHealth"
  }
}`,...(w=(u=r.parameters)==null?void 0:u.docs)==null?void 0:w.source}}};var y,S,C;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    items: mockItems,
    layout: "grid",
    entity: "RelationshipHealth"
  }
}`,...(C=(S=o.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var I,D,f;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    items: mockItems,
    layout: "organic",
    entity: "RelationshipHealth"
  }
}`,...(f=(D=a.parameters)==null?void 0:D.docs)==null?void 0:f.source}}};var W,v,P;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    items: mockItems,
    layout: "rows",
    entity: "RelationshipHealth"
  }
}`,...(P=(v=s.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var A,F,H;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    items: mockItems,
    showWeather: true,
    weatherCondition: "sunny",
    weatherForecast: "Great conditions for building new partnerships",
    weatherTrend: "up",
    showSeason: true,
    season: "growing",
    seasonProgress: 65
  }
}`,...(H=(F=n.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var O,R,b;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    items: mockItems,
    weatherCondition: "rainy",
    weatherForecast: "Focus on nurturing existing relationships",
    weatherTrend: "down",
    season: "harvest",
    seasonProgress: 80
  }
}`,...(b=(R=i.parameters)==null?void 0:R.docs)==null?void 0:b.source}}};var k,T,E;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    items: mockItems,
    itemActions: [{
      label: "View",
      event: "VIEW"
    }, {
      label: "Tend",
      event: "EDIT",
      variant: "ghost"
    }]
  }
}`,...(E=(T=c.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var L,G,M;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    items: [],
    emptyTitle: "Your garden awaits",
    emptyDescription: "Start by adding your first connection to grow a relationship",
    showCreateAction: true
  }
}`,...(M=(G=m.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var V,x,N;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    items: [],
    isLoading: true
  }
}`,...(N=(x=p.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var U,Y,_;t.parameters={...t.parameters,docs:{...(U=t.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    items: [],
    error: new Error("Failed to load relationships")
  }
}`,...(_=(Y=t.parameters)==null?void 0:Y.docs)==null?void 0:_.source}}};var j,q,z;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    items: mockItems.slice(0, 2),
    weatherCondition: "cloudy",
    season: "planting",
    seasonProgress: 25
  }
}`,...(z=(q=l.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var B,J,K;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    items: mockItems,
    showWeather: false,
    showSeason: false
  }
}`,...(K=(J=g.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    data: mockItems,
    entity: "RelationshipHealth"
  }
}`,...(Z=(X=d.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};const Me=["Default","GridLayout","OrganicLayout","RowsLayout","WithWeatherAndSeason","ChallengingConditions","WithActions","Empty","Loading","Error","FewItems","NoHeaderWidgets","UsingDataProp"];export{i as ChallengingConditions,r as Default,m as Empty,t as Error,l as FewItems,o as GridLayout,p as Loading,g as NoHeaderWidgets,a as OrganicLayout,s as RowsLayout,d as UsingDataProp,c as WithActions,n as WithWeatherAndSeason,Me as __namedExportsOrder,Ge as default};
