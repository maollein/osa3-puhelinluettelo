(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),o=t.n(c),u=t(4),l=t(2),i=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("p",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:t},"Delete"))},s=function(e){var n=e.addPerson,t=e.changeName,a=e.changeNumber,c=e.newNumber,o=e.newName;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:o,onChange:t}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:c,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.search,t=e.changeSearch;return r.a.createElement("label",null,"filter:",r.a.createElement("input",{value:n,onChange:t}))},d=t(3),f=t.n(d),h="/api/persons",b=function(){return f.a.get(h).then((function(e){return e.data}))},p=function(e){return f.a.post(h,e).then((function(e){return e.data}))},g=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.status}))},v=function(e){return f.a.put("".concat(h,"/").concat(e.id),e).then((function(e){return e.data}))},E=(t(37),function(e){var n=e.message,t=e.styling;return r.a.createElement("div",{className:t},r.a.createElement("p",null,n))}),w="error",j="success",O=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),d=Object(l.a)(o,2),f=d[0],h=d[1],O=Object(a.useState)(""),N=Object(l.a)(O,2),y=N[0],S=N[1],k=Object(a.useState)(""),C=Object(l.a)(k,2),P=C[0],D=C[1],A=Object(a.useState)(null),B=Object(l.a)(A,2),J=B[0],U=B[1];Object(a.useEffect)((function(){b().then((function(e){c(e)}))}),[]);var W=function(e,n){setTimeout((function(){U(null)}),3e3),U({message:e,style:n})},x=function(){var e=t.find((function(e){return e.name===f})),n=Object(u.a)(Object(u.a)({},e),{},{number:y});v(n).then((function(e){c(t.map((function(n){return n.id!==e.id?n:e}))),W("Number changed",j)})).catch((function(e){W(e.response.data.error,w)})),h(""),S("")},I=function(){p({name:f,number:y}).then((function(e){c(t.concat(e)),W("Added new person",j)})).catch((function(e){W(e.response.data.error,w)})),h(""),S("")};return r.a.createElement("div",null,J?r.a.createElement(E,{message:J.message,styling:J.style}):null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(m,{search:P,changeSearch:function(e){D(e.target.value)}}),r.a.createElement("h2",null,"Add new"),r.a.createElement(s,{addPerson:function(e){e.preventDefault(),t.map((function(e){return e.name})).includes(f)?window.confirm("".concat(f," is already added to phonebook. Replace old number?"))&&x():I()},changeName:function(e){h(e.target.value)},changeNumber:function(e){S(e.target.value)},newName:f,newNumber:y}),r.a.createElement("h2",null,"Numbers"),t.filter((function(e){return e.name.toUpperCase().includes(P.toUpperCase())})).map((function(e){return r.a.createElement(i,{person:e,key:e.id,deletePerson:function(){return n=e,void(window.confirm("Delete ".concat(n.name,"?"))&&g(n.id).then((function(e){204===e?(c(t.filter((function(e){return e.id!==n.id}))),W("Person deleted",j)):W("Could not delete person",w)})));var n}})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.aa658cd4.chunk.js.map