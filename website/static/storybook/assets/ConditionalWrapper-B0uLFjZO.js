import{j as n}from"./jsx-runtime-CDt2p4po.js";import{B as c}from"./Box-DYJzRMmP.js";import{e as d,c as p}from"./SExpressionEvaluator-DyJCz_6e.js";function m(e){return p({formValues:e.formValues,globalVariables:e.globalVariables,localVariables:e.localVariables??{},...e.entity},{},"active")}const i=({condition:e,context:r,children:a,fallback:t=null,animate:l=!1})=>{if(!e)return n.jsx(n.Fragment,{children:a});const s=m(r),o=!!d(e,s);return l?n.jsx(c,{overflow:"hidden",className:`transition-all duration-200 ${o?"opacity-100 max-h-[1000px]":"opacity-0 max-h-0"}`,children:o?a:t}):o?n.jsx(n.Fragment,{children:a}):n.jsx(n.Fragment,{children:t})};i.displayName="ConditionalWrapper";i.__docgenInfo={description:`ConditionalWrapper conditionally renders children based on S-expression evaluation.

Supported bindings:
- @entity.formValues.fieldId - Access form field values
- @entity.globalVariables.HG_VAR - Access global inspection variables
- @entity.localVariables.H_VAR - Access document-local variables
- @state - Current state machine state
- @now - Current timestamp

@example
// Simple condition - show field when another field equals a value
<ConditionalWrapper
  condition={["=", "@entity.formValues.vehicleType", "commercial"]}
  context={{ formValues: { vehicleType: "commercial" }, globalVariables: {} }}
>
  <Input name="commercialLicenseNumber" />
</ConditionalWrapper>

@example
// With fallback - show message when condition not met
<ConditionalWrapper
  condition={[">=", "@entity.formValues.loadWeight", 3500]}
  context={formContext}
  fallback={<Typography variant="small">Load weight must be at least 3500kg</Typography>}
>
  <HeavyVehicleFields />
</ConditionalWrapper>

@example
// Using global variables for cross-form conditions
<ConditionalWrapper
  condition={["=", "@entity.globalVariables.HG_POTROSNIKI", "DA"]}
  context={{ formValues: {}, globalVariables: { HG_POTROSNIKI: "DA" } }}
>
  <PriceMarkingSection />
</ConditionalWrapper>`,methods:[],displayName:"ConditionalWrapper",props:{condition:{required:!1,tsType:{name:"SExpr"},description:"The S-expression condition to evaluate"},context:{required:!0,tsType:{name:"ConditionalContext"},description:"Context for evaluating the condition"},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Children to render when condition is true (or when no condition is provided)"},fallback:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Optional fallback to render when condition is false",defaultValue:{value:"null",computed:!1}},animate:{required:!1,tsType:{name:"boolean"},description:"Whether to animate the transition (uses CSS transitions)",defaultValue:{value:"false",computed:!1}}}};export{i as C};
