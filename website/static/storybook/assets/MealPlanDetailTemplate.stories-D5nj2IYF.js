import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as d}from"./index-GiUgBvb1.js";import{c as h}from"./cn-BNf5BS2b.js";import{B}from"./Box-DYJzRMmP.js";import{V as r,H as t}from"./Stack-DhhoTPuC.js";import{T as s}from"./Typography-Wmkp-g7N.js";import{B as l}from"./Button-Dn0472P0.js";import{C as o}from"./Card-BNT5PrJ5.js";import{S as Ne}from"./Spinner-vF2DJrH5.js";import{u as ke}from"./useEventBus-BNZMNlv8.js";import{N as be}from"./NutritionSummary-F47K0iX0.js";import{A as Ae}from"./AIAnalysisPanel-BtHsMC7a.js";import{S as Se}from"./ShareableLinkGenerator-CAAvn2KM.js";import{U as q}from"./utensils-Dc9stKFB.js";import{A as Pe}from"./arrow-left-CMPuXvFr.js";import{C as Te}from"./calendar-rGtwHcH_.js";import{F as Ce}from"./flame-D5NmFn5q.js";import{S as De}from"./square-pen-D7sL1yO_.js";import{S as P}from"./sparkles-CE_owp1l.js";import{S as T}from"./share-2-BGRL1FH9.js";import{T as Me}from"./trash-2-ChlfdFMf.js";import{U as Le}from"./user-BePscFH1.js";import"./loader-2-DXp1ic5P.js";import"./createLucideIcon-CbHznvEr.js";import"./Badge-CpH0PNM6.js";import"./target-Dfqc9R93.js";import"./trending-up-D7By3kN5.js";import"./trending-down-Dv2LyMoL.js";import"./refresh-cw-Ocr-wooT.js";import"./lightbulb-BScBdEp_.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./copy-B40iJsJp.js";import"./link-Csz5KqWX.js";const C=a=>a?new Date(a).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}):"",D=({data:a,trainee:m,isLoading:fe=!1,error:M=null,isAnalyzing:u=!1,entity:n="MealPlan",className:g})=>{const i=ke(),je=d.useCallback(()=>{i.emit("UI:BACK",{entity:n})},[i,n]),ye=d.useCallback(()=>{i.emit("UI:EDIT",{row:a,entity:n})},[i,a,n]),we=d.useCallback(()=>{i.emit("UI:DELETE",{row:a,entity:n})},[i,a,n]),L=d.useCallback(()=>{i.emit("UI:ANALYZE",{row:a,entity:n})},[i,a,n]),E=d.useCallback(()=>{i.emit("UI:SHARE",{row:a,entity:n})},[i,a,n]);if(fe)return e.jsxs(r,{align:"center",justify:"center",className:h("p-6 min-h-[400px]",g),children:[e.jsx(Ne,{size:"lg"}),e.jsx(s,{variant:"body",className:"text-neutral-500",children:"Loading meal plan..."})]});if(M)return e.jsx(r,{align:"center",justify:"center",className:h("p-6 min-h-[400px]",g),children:e.jsxs(s,{variant:"body",className:"text-red-500",children:["Error: ",M.message]})});if(!a)return e.jsxs(r,{align:"center",justify:"center",className:h("p-6 min-h-[400px]",g),children:[e.jsx(q,{className:"h-12 w-12 text-neutral-300"}),e.jsx(s,{variant:"h3",className:"text-neutral-500",children:"Meal plan not found"})]});const ve={calories:a.calories||0,protein:a.protein||0,carbs:a.carbs||0,fat:a.fat||0},I=a.aiAnalysis?{id:a.id||"",resourceType:"MealPlan",resourceId:a.id||"",content:a.aiAnalysis,generatedAt:a.updatedAt||new Date().toISOString()}:void 0;return e.jsxs(r,{gap:"lg",className:h("p-6",g),children:[e.jsxs(t,{justify:"between",align:"start",wrap:!0,children:[e.jsxs(t,{gap:"md",align:"center",children:[e.jsx(l,{variant:"ghost",size:"sm",onClick:je,children:e.jsx(Pe,{className:"h-4 w-4"})}),e.jsx(B,{display:"flex",rounded:"lg",padding:"md",className:"items-center justify-center bg-orange-100",children:e.jsx(q,{className:"h-6 w-6 text-orange-600"})}),e.jsxs(r,{gap:"xs",children:[e.jsx(s,{variant:"h1",children:a.title}),e.jsxs(t,{gap:"md",align:"center",className:"text-neutral-500",children:[e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(Te,{className:"h-4 w-4"}),e.jsx(s,{variant:"body",children:C(a.date)})]}),a.calories&&e.jsxs(t,{gap:"xs",align:"center",children:[e.jsx(Ce,{className:"h-4 w-4 text-orange-500"}),e.jsxs(s,{variant:"body",children:[a.calories," kcal"]})]})]})]})]}),e.jsxs(t,{gap:"sm",children:[e.jsxs(l,{variant:"secondary",onClick:ye,children:[e.jsx(De,{className:"h-4 w-4 mr-1"}),"Edit"]}),!a.aiAnalysis&&e.jsxs(l,{variant:"secondary",onClick:L,disabled:u,children:[e.jsx(P,{className:"h-4 w-4 mr-1"}),u?"Analyzing...":"Analyze"]}),e.jsxs(l,{variant:"secondary",onClick:E,children:[e.jsx(T,{className:"h-4 w-4 mr-1"}),"Share"]}),e.jsx(l,{variant:"ghost",onClick:we,className:"text-red-500 hover:text-red-600 hover:bg-red-50",children:e.jsx(Me,{className:"h-4 w-4"})})]})]}),e.jsxs(t,{gap:"lg",wrap:!0,className:"w-full items-start",children:[e.jsxs(r,{gap:"md",className:"flex-1 min-w-[300px]",children:[a.description&&e.jsx(o,{className:"p-4",children:e.jsxs(r,{gap:"sm",children:[e.jsx(s,{variant:"h4",children:"Description"}),e.jsx(s,{variant:"body",className:"text-neutral-600",children:a.description})]})}),e.jsx(o,{className:"p-4",children:e.jsxs(r,{gap:"md",children:[e.jsx(s,{variant:"h4",children:"Nutrition Breakdown"}),e.jsx(be,{summary:ve})]})}),m&&e.jsx(o,{className:"p-4",children:e.jsxs(r,{gap:"sm",children:[e.jsx(s,{variant:"h4",children:"Assigned To"}),e.jsxs(t,{gap:"sm",align:"center",children:[e.jsx(B,{display:"flex",rounded:"full",className:"items-center justify-center h-10 w-10 bg-neutral-100",children:e.jsx(Le,{className:"h-5 w-5 text-neutral-400"})}),e.jsxs(r,{gap:"none",children:[e.jsx(s,{variant:"body",className:"font-medium",children:m.name}),m.email&&e.jsx(s,{variant:"small",className:"text-neutral-500",children:m.email})]})]})]})})]}),e.jsxs(r,{gap:"md",className:"flex-1 min-w-[300px]",children:[I?e.jsx(Ae,{analysis:I,showRegenerate:!0,entity:"MealPlan"}):e.jsx(o,{className:"p-4",children:e.jsxs(r,{gap:"md",align:"center",className:"py-6",children:[e.jsx(P,{className:"h-10 w-10 text-purple-300"}),e.jsx(s,{variant:"h4",className:"text-neutral-500",children:"No AI Analysis Yet"}),e.jsx(s,{variant:"body",className:"text-neutral-400 text-center max-w-xs",children:"Get AI-powered insights about this meal plan's nutritional balance and recommendations."}),e.jsxs(l,{variant:"primary",onClick:L,disabled:u,children:[e.jsx(P,{className:"h-4 w-4 mr-1"}),u?"Analyzing...":"Generate Analysis"]})]})}),a.shareLink?e.jsx(o,{className:"p-4",children:e.jsxs(r,{gap:"sm",children:[e.jsx(s,{variant:"h4",children:"Share Link"}),e.jsx(Se,{existingLink:a.shareLink,resourceType:"MealPlan",resourceId:a.id||""})]})}):e.jsx(o,{className:"p-4",children:e.jsxs(r,{gap:"md",align:"center",className:"py-4",children:[e.jsx(T,{className:"h-8 w-8 text-neutral-300"}),e.jsx(s,{variant:"body",className:"text-neutral-500",children:"No share link generated yet"}),e.jsxs(l,{variant:"secondary",onClick:E,children:[e.jsx(T,{className:"h-4 w-4 mr-1"}),"Generate Share Link"]})]})}),e.jsx(o,{className:"p-4",children:e.jsxs(r,{gap:"sm",children:[e.jsx(s,{variant:"h4",children:"Details"}),e.jsxs(r,{gap:"xs",children:[a.createdAt&&e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Created"}),e.jsx(s,{variant:"small",children:C(a.createdAt)})]}),a.updatedAt&&e.jsxs(t,{justify:"between",children:[e.jsx(s,{variant:"small",className:"text-neutral-500",children:"Last Updated"}),e.jsx(s,{variant:"small",children:C(a.updatedAt)})]})]})]})})]})]})]})};D.displayName="MealPlanDetailTemplate";D.__docgenInfo={description:"",methods:[],displayName:"MealPlanDetailTemplate",props:{data:{required:!1,tsType:{name:"MealPlanData"},description:"Meal plan data"},trainee:{required:!1,tsType:{name:"TraineeInfo"},description:"Trainee info"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"Error | null",elements:[{name:"Error"},{name:"null"}]},description:"Error state",defaultValue:{value:"null",computed:!1}},isAnalyzing:{required:!1,tsType:{name:"boolean"},description:"AI analysis loading state",defaultValue:{value:"false",computed:!1}},entity:{required:!1,tsType:{name:"string"},description:"Entity context for events",defaultValue:{value:'"MealPlan"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes"}}};const ha={title:"Blaz-Klemenc/Templates/MealPlanDetailTemplate",component:D,parameters:{layout:"fullscreen"},tags:["autodocs"]},p={id:"mp-1",traineeId:"trainee-1",trainerId:"trainer-1",title:"High Protein Recovery Day",description:"This meal plan is designed for post-heavy-lifting recovery. Focus on lean proteins spread throughout the day to maximize muscle protein synthesis. Include plenty of vegetables for micronutrients and fiber. Hydration is key - aim for 3+ liters of water.",date:new Date,calories:2200,protein:180,carbs:200,fat:65,aiAnalysis:"Excellent protein distribution across meals (approximately 45g per main meal). The carbohydrate timing is well-structured with higher intake around training. Consider adding more omega-3 rich foods like salmon or walnuts. Fiber intake is adequate at ~30g. Overall, this is a well-balanced plan for muscle recovery.",shareLink:"https://app.blazklemenc.com/meal/abc123",createdAt:new Date(Date.now()-7*24*60*60*1e3),updatedAt:new Date(Date.now()-1*24*60*60*1e3)},Ee={id:"mp-2",title:"Basic Plan",date:new Date,calories:1800,protein:140,carbs:180,fat:55},xe={id:"mp-3",traineeId:"trainee-2",title:"Pre-Competition Nutrition",description:"Carb loading strategy for the upcoming competition weekend.",date:new Date(Date.now()+3*24*60*60*1e3),calories:2800,protein:150,carbs:380,fat:70,createdAt:new Date},c={id:"trainee-1",name:"Ana Kovac",email:"ana.kovac@example.com"},x={args:{data:p,trainee:c}},f={args:{isLoading:!0}},j={args:{error:{message:"Failed to load meal plan details."}}},y={args:{data:void 0}},w={args:{data:xe,trainee:c}},v={args:{data:xe,trainee:c,isAnalyzing:!0}},N={args:{data:{...p,shareLink:void 0},trainee:c}},k={args:{data:p}},b={args:{data:Ee}},A={args:{data:{...p,title:"Bulking Phase Nutrition",calories:3500,protein:220,carbs:450,fat:100,description:"High calorie surplus for maximum muscle growth phase.",aiAnalysis:"Very high calorie intake suitable for aggressive bulking. Protein is adequate at 1.8g/kg. Consider spacing meals 3-4 hours apart for optimal digestion. Monitor weight gain - aim for 0.5-1kg per week maximum to minimize fat gain."},trainee:c}},S={args:{data:{...p,title:"Cutting Phase Nutrition",calories:1500,protein:180,carbs:100,fat:45,description:"Moderate deficit for fat loss while preserving muscle mass.",aiAnalysis:"Sustainable caloric deficit of approximately 500 calories. High protein intake will help preserve muscle mass. Consider adding refeed days every 7-10 days. Monitor energy levels during training and adjust if needed."},trainee:c}};var z,H,U;x.parameters={...x.parameters,docs:{...(z=x.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    data: sampleMealPlan,
    trainee: sampleTrainee
  }
}`,...(U=(H=x.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};var F,V,W;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...(W=(V=f.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var G,R,_;j.parameters={...j.parameters,docs:{...(G=j.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    error: {
      message: "Failed to load meal plan details."
    } as Error
  }
}`,...(_=(R=j.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var K,O,Y;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    data: undefined
  }
}`,...(Y=(O=y.parameters)==null?void 0:O.docs)==null?void 0:Y.source}}};var Z,J,Q;w.parameters={...w.parameters,docs:{...(Z=w.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    data: noAnalysisPlan,
    trainee: sampleTrainee
  }
}`,...(Q=(J=w.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,$,ee;v.parameters={...v.parameters,docs:{...(X=v.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    data: noAnalysisPlan,
    trainee: sampleTrainee,
    isAnalyzing: true
  }
}`,...(ee=($=v.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ae,se,re;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    data: {
      ...sampleMealPlan,
      shareLink: undefined
    },
    trainee: sampleTrainee
  }
}`,...(re=(se=N.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var ne,ie,te;k.parameters={...k.parameters,docs:{...(ne=k.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    data: sampleMealPlan
  }
}`,...(te=(ie=k.parameters)==null?void 0:ie.docs)==null?void 0:te.source}}};var le,oe,ce;b.parameters={...b.parameters,docs:{...(le=b.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    data: minimalMealPlan
  }
}`,...(ce=(oe=b.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var me,de,pe;A.parameters={...A.parameters,docs:{...(me=A.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    data: {
      ...sampleMealPlan,
      title: "Bulking Phase Nutrition",
      calories: 3500,
      protein: 220,
      carbs: 450,
      fat: 100,
      description: "High calorie surplus for maximum muscle growth phase.",
      aiAnalysis: "Very high calorie intake suitable for aggressive bulking. Protein is adequate at 1.8g/kg. Consider spacing meals 3-4 hours apart for optimal digestion. Monitor weight gain - aim for 0.5-1kg per week maximum to minimize fat gain."
    },
    trainee: sampleTrainee
  }
}`,...(pe=(de=A.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var ue,ge,he;S.parameters={...S.parameters,docs:{...(ue=S.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    data: {
      ...sampleMealPlan,
      title: "Cutting Phase Nutrition",
      calories: 1500,
      protein: 180,
      carbs: 100,
      fat: 45,
      description: "Moderate deficit for fat loss while preserving muscle mass.",
      aiAnalysis: "Sustainable caloric deficit of approximately 500 calories. High protein intake will help preserve muscle mass. Consider adding refeed days every 7-10 days. Monitor energy levels during training and adjust if needed."
    },
    trainee: sampleTrainee
  }
}`,...(he=(ge=S.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};const xa=["Default","Loading","Error","NotFound","WithoutAIAnalysis","AnalysisLoading","WithoutShareLink","WithoutTrainee","MinimalData","HighCaloriePlan","LowCaloriePlan"];export{v as AnalysisLoading,x as Default,j as Error,A as HighCaloriePlan,f as Loading,S as LowCaloriePlan,b as MinimalData,y as NotFound,w as WithoutAIAnalysis,N as WithoutShareLink,k as WithoutTrainee,xa as __namedExportsOrder,ha as default};
