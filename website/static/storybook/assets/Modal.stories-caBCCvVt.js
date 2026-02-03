import{j as e}from"./jsx-runtime-CDt2p4po.js";import{M as o}from"./Modal-Bpl9EjHC.js";import{B as n}from"./Button-Dn0472P0.js";import{r as c}from"./index-GiUgBvb1.js";import"./Icon-DDCXmKGr.js";import"./cn-BNf5BS2b.js";import"./createLucideIcon-CbHznvEr.js";import"./lock-BpRazVO9.js";import"./share-2-BGRL1FH9.js";import"./zap-DLdLcnjT.js";import"./refresh-cw-Ocr-wooT.js";import"./external-link-k_e-i1vS.js";import"./link-Csz5KqWX.js";import"./home-JwtCVJF2.js";import"./star-D_3mxVsm.js";import"./clock-DT9ve7xf.js";import"./calendar-rGtwHcH_.js";import"./pause-BGY7Ki7b.js";import"./play-C6U2eifx.js";import"./eye-DPfPdwVp.js";import"./list-B6-UEXVq.js";import"./grid-3x3-DCQtfzd8.js";import"./filter-CMfXM6HV.js";import"./search-CCKipEn6.js";import"./settings-DBj1i3lR.js";import"./user-plus-BlQDsowZ.js";import"./users-CV1mGUsS.js";import"./user-BePscFH1.js";import"./phone-XSC4O3No.js";import"./send-CHVRrjpn.js";import"./message-circle-Yw7MGdXs.js";import"./mail-CI1Ybt8r.js";import"./download-yLSRVNFt.js";import"./file-text-DZQctV9o.js";import"./copy-B40iJsJp.js";import"./save-DyJeJ3Zl.js";import"./trash-2-ChlfdFMf.js";import"./square-pen-D7sL1yO_.js";import"./minus-CvoF9liV.js";import"./plus-jSzJaRn3.js";import"./loader-2-DXp1ic5P.js";import"./info-CF8EgE8A.js";import"./alert-triangle-BLuUOBNm.js";import"./alert-circle-CBFh8Gcj.js";import"./check-circle-DX_bNA1C.js";import"./check-DliVttWt.js";import"./menu-DUN0as2h.js";import"./x-prXd1WI5.js";import"./arrow-left-CMPuXvFr.js";import"./arrow-right-BdVPe8wH.js";import"./chevron-up-B8qTw58L.js";import"./chevron-down-BQmz_Bpa.js";import"./chevron-left-zGYeMbNT.js";import"./chevron-right-pDF_OUfd.js";import"./Box-DYJzRMmP.js";import"./Typography-Wmkp-g7N.js";import"./Overlay-CxBLilSV.js";const ve={title:"Molecules/Modal",component:o,parameters:{layout:"centered",backgrounds:{default:"wireframe"}},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl","full"]}}},a={render:function(){const[s,t]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>t(!0),children:"Open Modal"}),e.jsx(o,{isOpen:s,onClose:()=>t(!1),title:"Modal Title",children:e.jsx("p",{className:"text-black",children:"This is the modal content. It can contain any React components."})})]})}},r={render:function(){const[s,t]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"danger",onClick:()=>t(!0),children:"Delete Item"}),e.jsx(o,{isOpen:s,onClose:()=>t(!1),title:"Confirm Delete",footer:e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"secondary",onClick:()=>t(!1),children:"Cancel"}),e.jsx(n,{variant:"danger",onClick:()=>t(!1),children:"Delete"})]}),children:e.jsx("p",{className:"text-black",children:"Are you sure you want to delete this item? This action cannot be undone."})})]})}},l={render:function(){const[s,t]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>t(!0),children:"Open Large Modal"}),e.jsx(o,{isOpen:s,onClose:()=>t(!1),title:"Large Modal",size:"lg",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-black",children:"This is a larger modal that can contain more content."}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 border-2 border-black",children:[e.jsx("h4",{className:"font-bold text-black",children:"Section 1"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"Content for section 1"})]}),e.jsxs("div",{className:"p-4 border-2 border-black",children:[e.jsx("h4",{className:"font-bold text-black",children:"Section 2"}),e.jsx("p",{className:"text-sm text-neutral-600",children:"Content for section 2"})]})]})]})})]})}},i={render:function(){const[s,t]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>t(!0),children:"Add New Item"}),e.jsx(o,{isOpen:s,onClose:()=>t(!1),title:"Add New Item",footer:e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"secondary",onClick:()=>t(!1),children:"Cancel"}),e.jsx(n,{variant:"primary",onClick:()=>t(!1),children:"Save"})]}),children:e.jsxs("form",{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Name"}),e.jsx("input",{type:"text",className:"w-full px-3 py-2 border-2 border-black",placeholder:"Enter name..."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-black",children:"Description"}),e.jsx("textarea",{className:"w-full px-3 py-2 border-2 border-black min-h-[100px]",placeholder:"Enter description..."})]})]})})]})}};var m,d,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: function DefaultModal() {
    const [isOpen, setIsOpen] = useState(false);
    return <>
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
                    <p className="text-black">
                        This is the modal content. It can contain any React components.
                    </p>
                </Modal>
            </>;
  }
}`,...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var x,f,h;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: function ConfirmModal() {
    const [isOpen, setIsOpen] = useState(false);
    return <>
                <Button variant="danger" onClick={() => setIsOpen(true)}>Delete Item</Button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Delete" footer={<>
                            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button variant="danger" onClick={() => setIsOpen(false)}>Delete</Button>
                        </>}>
                    <p className="text-black">
                        Are you sure you want to delete this item? This action cannot be undone.
                    </p>
                </Modal>
            </>;
  }
}`,...(h=(f=r.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var b,k,N;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: function LargeModalStory() {
    const [isOpen, setIsOpen] = useState(false);
    return <>
                <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Modal" size="lg">
                    <div className="space-y-4">
                        <p className="text-black">
                            This is a larger modal that can contain more content.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border-2 border-black">
                                <h4 className="font-bold text-black">Section 1</h4>
                                <p className="text-sm text-neutral-600">Content for section 1</p>
                            </div>
                            <div className="p-4 border-2 border-black">
                                <h4 className="font-bold text-black">Section 2</h4>
                                <p className="text-sm text-neutral-600">Content for section 2</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>;
  }
}`,...(N=(k=l.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var O,j,C;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function FormModalStory() {
    const [isOpen, setIsOpen] = useState(false);
    return <>
                <Button onClick={() => setIsOpen(true)}>Add New Item</Button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Item" footer={<>
                            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button variant="primary" onClick={() => setIsOpen(false)}>Save</Button>
                        </>}>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-black">Name</label>
                            <input type="text" className="w-full px-3 py-2 border-2 border-black" placeholder="Enter name..." />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-black">Description</label>
                            <textarea className="w-full px-3 py-2 border-2 border-black min-h-[100px]" placeholder="Enter description..." />
                        </div>
                    </form>
                </Modal>
            </>;
  }
}`,...(C=(j=i.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};const Ie=["Default","WithConfirmation","LargeModal","FormModal"];export{a as Default,i as FormModal,l as LargeModal,r as WithConfirmation,Ie as __namedExportsOrder,ve as default};
