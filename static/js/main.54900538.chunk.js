(this.webpackJsonpReactLearning=this.webpackJsonpReactLearning||[]).push([[0],{10:function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return l})),a.d(t,"e",(function(){return i})),a.d(t,"f",(function(){return c})),a.d(t,"a",(function(){return u}));var n=a(130),r=n.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.0/",headers:{"API-KEY":"a6c20467-1a5b-406b-88d2-a8a4879b1b99"}}),o={getUsers:function(e,t){return r.get("users?count=".concat(e,"&page=").concat(t)).then((function(e){return e.data}))},getUsersTerm:function(e,t){return r.get("users?count=".concat(e,"&page=1&term=").concat(t)).then((function(e){return e.data}))}},s={getProfile:function(e){return r.get("profile/"+e)},getStatus:function(e){return r.get("/profile/status/"+e)},updateStatus:function(e){return r.put("/profile/status",{status:e})},updateProfile:function(e){return r.put("/profile",e)},uploadPhoto:function(e){var t=new FormData;return t.append("image",e),r.put("profile/photo",t,{headers:{"Content-Type":"multipart/form-data"}})}},l={followUser:function(e){return r.post("follow/".concat(e),{})},unfollowUser:function(e){return r.delete("follow/".concat(e),{})}},i={me:function(){return r.get("auth/me")},login:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return r.post("auth/login",{email:e,password:t,rememberMe:a,captcha:n})},logout:function(){return r.delete("auth/login")}},c={getCaptcha:function(){return r.get("security/get-captcha-url")}},u={startChatting:function(e){return r.put("dialogs/".concat(e))},getAllDialogs:function(){return r.get("dialogs")},getListMessagesWithFriend:function(e){return r.get("dialogs/".concat(e,"/messages"))},sendMessageToFriend:function(e,t){return r.post("dialogs/".concat(e,"/messages"),{body:t})},isViewedYourMessage:function(e){return r.get("dialogs/messages/".concat(e,"/viewed"))},messageInSpam:function(e){return r.post("dialogs/messages/".concat(e,"/spam"))},deleteMessage:function(e){return r.delete("dialogs/messages/".concat(e))},restoreMessage:function(e){return r.put("dialogs/messages/".concat(e,"/restore"))},returnMessageThanDate:function(e,t){return r.get("dialogs/".concat(e,"/messages/new?newerThen=").concat(t))},listNewMessage:function(){return r.get("dialogs/messages/new/count")}}},123:function(e,t,a){"use strict";a.d(t,"b",(function(){return c})),a.d(t,"h",(function(){return u})),a.d(t,"g",(function(){return h})),a.d(t,"d",(function(){return g})),a.d(t,"e",(function(){return E})),a.d(t,"f",(function(){return _})),a.d(t,"i",(function(){return v})),a.d(t,"c",(function(){return T}));var n=a(5),r=a.n(n),o=a(134),s=a(7),l=a(10),i={UsersList:[],pageSize:15,totalUsers:0,currentPage:1,searchTerm:"",isFetching:!1,followingInProgress:[]},c=function(e){return{type:"FOLLOW",userId:e}},u=function(e){return{type:"UNFOLLOW",userId:e}},m=function(e){return{type:"SET_USERS",UsersList:e}},d=function(e){return{type:"SET_USERS_TOTAL_COUNT",totalUsers:e}},p=function(e){return{type:"SET_SEARCH_TERM",text:e}},f=function(e){return{type:"TOGGLE_IS_FETCHING",isFetching:e}},h=function(e,t){return{type:"TOGGLE_FOLLOWING_PROGRESS",isFetching:e,userId:t}},g=function(e,t){return function(a){var n;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return a(f(!0)),o.next=3,r.a.awrap(l.d.getUsers(e,t));case 3:n=o.sent,a(f(!1)),a(m(n.items)),a(d(n.totalCount));case 7:case"end":return o.stop()}}))}},E=function(e,t){return function(a){var n;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return a(f(!0)),a({type:"SET_CURRENT_PAGE",currentPage:t}),o.next=4,r.a.awrap(l.d.getUsers(e,t));case 4:n=o.sent,a(f(!1)),a(m(n.items)),a(d(n.totalCount));case 8:case"end":return o.stop()}}))}},_=function(e,t){return function(a){var n;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return a(f(!0)),a(p(t)),t||(t=" "),o.next=5,r.a.awrap(l.d.getUsersTerm(e,t));case 5:n=o.sent,a(f(!1)),a(m(n.items)),a(d(n.totalCount));case 9:case"end":return o.stop()}}))}},b=function(e,t,a,n){return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return e(h(!0,t)),o.next=3,r.a.awrap(a(t));case 3:e(n(t)),e(h(!1,t));case 5:case"end":return o.stop()}}))},v=function(e){return function(t){return b(t,e,l.b.unfollowUser,u)}},T=function(e){return function(t){return b(t,e,l.b.followUser,c)}};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FOLLOW":return Object(s.a)({},e,{UsersList:e.UsersList.map((function(e){return e.id===t.userId?Object(s.a)({},e,{followed:!0}):e}))});case"UNFOLLOW":return Object(s.a)({},e,{UsersList:e.UsersList.map((function(e){return e.id===t.userId?Object(s.a)({},e,{followed:!1}):e}))});case"SET_USERS":return Object(s.a)({},e,{UsersList:t.UsersList});case"SET_CURRENT_PAGE":return Object(s.a)({},e,{currentPage:t.currentPage});case"SET_USERS_TOTAL_COUNT":return Object(s.a)({},e,{totalUsers:t.totalUsers});case"SET_SEARCH_TERM":return Object(s.a)({},e,{searchTerm:t.text});case"TOGGLE_IS_FETCHING":return Object(s.a)({},e,{isFetching:t.isFetching});case"TOGGLE_FOLLOWING_PROGRESS":return Object(s.a)({},e,{followingInProgress:t.isFetching?[].concat(Object(o.a)(e.followingInProgress),[t.userId]):e.followingInProgress.filter((function(e){return e!==t.userId}))});default:return e}}},127:function(e,t,a){e.exports=a.p+"static/media/preloader.03527c20.svg"},132:function(e,t,a){e.exports={container:"MessagesForm_container__1E9I5"}},15:function(e,t,a){e.exports={containerDialog:"Dialogs_containerDialog__2rlqT",listDialogs:"Dialogs_listDialogs__D2yhu",dialogUser:"Dialogs_dialogUser__2M4qS",userNameWithImg:"Dialogs_userNameWithImg__1MabI",messagesContain:"Dialogs_messagesContain__2Q53f",NotViews:"Dialogs_NotViews__3BNMO",messagesWithFriendId:"Dialogs_messagesWithFriendId__2dsjK",dialog:"Dialogs_dialog__ui60H",notViewedMessage:"Dialogs_notViewedMessage__1Yyep",main__img__username:"Dialogs_main__img__username__3Q4DR",chatText:"Dialogs_chatText__ykFpP",mainChatBlock:"Dialogs_mainChatBlock__UykZ1",chatTittle:"Dialogs_chatTittle__TLYfq",chatBody:"Dialogs_chatBody__1P2mT",past__messages:"Dialogs_past__messages__N3XFp"}},160:function(e,t,a){e.exports=a(287)},165:function(e,t,a){},21:function(e,t,a){e.exports={someError:"Profile_someError__2zNhG",profileContain:"Profile_profileContain__S9NYC",mainBlock:"Profile_mainBlock__3U1ie",avatarBlock:"Profile_avatarBlock__1Zq8w",uploadPhoto:"Profile_uploadPhoto__1mx1L",editButton:"Profile_editButton__1FM-9",saveButton:"Profile_saveButton__1iZ-G",infoProfile:"Profile_infoProfile__gGw29"}},26:function(e,t,a){e.exports={FormControl:"FormsControls_FormControl__3MfD4",error:"FormsControls_error__22-w1",someError:"FormsControls_someError__2DiAh"}},287:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(64),s=a.n(o),l=(a(165),a(37)),i=a(38),c=a(42),u=a(39),m=a(43),d=(a(93),a(19)),p=a(51),f=a(30),h=a(21),g=a.n(h),E=a(124),_=a(125),b=a(69),v=a(26),T=a.n(v),S=function(e){var t=e.input,a=e.meta,n=Object(b.a)(e,["input","meta"]),o=a.touched&&a.error?T.a.error:" ";return r.a.createElement("div",{className:T.a.FormControl},r.a.createElement("div",{className:o},r.a.createElement("input",Object.assign({},t,n)),r.a.createElement("br",null),a.touched&&a.error&&r.a.createElement("span",null,a.error)))},O=function(e){var t=e.input,a=e.meta,n=Object(b.a)(e,["input","meta"]),o=a.touched&&a.error?T.a.error:" ";return r.a.createElement("div",{className:T.a.FormControl},r.a.createElement("div",{className:o},r.a.createElement("input",Object.assign({},t,n)),r.a.createElement("br",null),a.touched&&a.error&&r.a.createElement("span",null,a.error)))},k=function(e){var t=e.contactTitle,a=e.contactBody;return r.a.createElement("div",null,r.a.createElement("span",null,r.a.createElement("b",null,t,": "),r.a.createElement("p",null,r.a.createElement("a",{href:a,target:"_blank",rel:"noopener noreferrer"},a))),r.a.createElement(E.a,{placeholder:"https://www.".concat(t,".com"),name:"contacts.".concat(t),component:S}))},w=Object(_.a)({form:"editProfile"})((function(e){return r.a.createElement("div",{className:g.a.infoProfile},r.a.createElement("form",{onSubmit:e.handleSubmit},r.a.createElement("button",{className:g.a.saveButton},"Save"),e.error&&r.a.createElement("div",{className:g.a.someError},e.error),r.a.createElement("br",null),r.a.createElement("span",null,r.a.createElement("b",null,"About me: ")," ",r.a.createElement("p",null,e.profile.aboutMe)),r.a.createElement(E.a,{placeholder:"About me",name:"aboutMe",component:S}),r.a.createElement("span",null,r.a.createElement("b",null,"Full name: ")," ",r.a.createElement("p",null,e.profile.fullName)),r.a.createElement(E.a,{placeholder:"Full Name",name:"fullName",component:S}),r.a.createElement("span",null,r.a.createElement("b",null,"Seek work: ")," ",r.a.createElement("p",null,e.profile.lookingForAJob?"yes":"no")),r.a.createElement(E.a,{placeholder:"Looking for a job",type:"checkbox",name:"lookingForAJob",component:S}),r.a.createElement("span",null,r.a.createElement("b",null,"Description of the search: ")," ",r.a.createElement("p",null,e.profile.lookingForAJobDescription)),r.a.createElement(E.a,{placeholder:"Looking for a job desc",name:"lookingForAJobDescription",component:S}),Object.keys(e.profile.contacts).map((function(t){return r.a.createElement(k,{key:t,contactTitle:t,contactBody:e.profile.contacts[t]})}))))})),N=a(41),C=a.n(N),P=r.a.memo((function(e){var t=Object(n.useState)(!1),a=Object(p.a)(t,2),o=a[0],s=a[1],l=Object(n.useState)(e.status),i=Object(p.a)(l,2),c=i[0],u=i[1],m=function(){s(!0)},d=function(){s(!1),e.updateStatusUserThunk(e.id,c)},f=function(e){u(e.currentTarget.value)};Object(n.useEffect)((function(){u(e.status)}),[e.status]);return r.a.createElement("div",null,e.urlMatchParams==e.id?o?r.a.createElement("input",{onChange:f,autoFocus:!0,onBlur:d,value:c}):r.a.createElement("span",{onDoubleClick:m,"data-tooltip":"double click to change"},e.status):r.a.createElement("div",null,e.status?e.status:r.a.createElement("div",null,"_____")))})),U=function(e){var t=e.contactTitle,a=e.contactBody;return r.a.createElement("div",null,!!a&&r.a.createElement("span",null,r.a.createElement("b",null,t,": "),r.a.createElement("p",null,r.a.createElement("a",{href:a,target:"_blank",rel:"noopener noreferrer"},a))))},y=function(e){return r.a.createElement("div",{className:g.a.infoProfile},r.a.createElement("div",{className:g.a.editButton},e.id==e.urlMatchParams&&r.a.createElement("button",{onClick:function(){e.setEditProfile(!0)}},"Edit")),r.a.createElement("hr",null),r.a.createElement("span",null,r.a.createElement("b",null,"About me: ")," ",r.a.createElement("p",null,e.profile.aboutMe)),r.a.createElement("span",null,r.a.createElement("b",null,"Full name: ")," ",r.a.createElement("p",null,e.profile.fullName)),r.a.createElement("span",null,r.a.createElement("b",null,"Status:")," ",r.a.createElement("p",null,e.status)),r.a.createElement("span",null,r.a.createElement("b",null,"Seek work: ")," ",r.a.createElement("p",null,e.profile.lookingForAJob?"yes":"no")),r.a.createElement("span",null,r.a.createElement("b",null,"Description of the search: ")," ",r.a.createElement("p",null,e.profile.lookingForAJobDescription)),Object.keys(e.profile.contacts).map((function(t){return r.a.createElement(U,{key:t,contactTitle:t,contactBody:e.profile.contacts[t]})})))},j=r.a.memo((function(e){if(!e.profile)return r.a.createElement(f.a,null);var t=Object(n.useState)(!1),a=Object(p.a)(t,2),o=a[0],s=a[1];return r.a.createElement("div",{className:g.a.profileContain},e.loading?r.a.createElement(f.a,null):r.a.createElement("div",{className:g.a.mainBlock},r.a.createElement("div",{className:g.a.avatarBlock},r.a.createElement("img",{src:e.profile.photos.small?e.profile.photos.large:C.a,alt:""}),e.id==e.urlMatchParams&&r.a.createElement("div",null,r.a.createElement("input",{type:"file",name:"myFile",id:"myFile",onChange:function(t){t.target.files.length&&e.uploadNewPhotoThunk(t.target.files[0])}}),r.a.createElement("label",{htmlFor:"myFile",className:g.a.uploadPhoto,"data-tooltip":"click to upload a photo"}," ")),r.a.createElement("h3",null,e.profile.fullName),r.a.createElement(P,{status:e.status,updateStatusUserThunk:e.updateStatusUserThunk,id:e.id,urlMatchParams:e.urlMatchParams})),o?r.a.createElement(w,{initialValues:e.profile,onSubmit:function(t){t===e.profile?s(!1):e.updateProfileUserThunk(t).then((function(){s(!1)}))},profile:e.profile}):r.a.createElement(y,{profile:e.profile,status:e.status,updateStatusUserThunk:e.updateStatusUserThunk,id:e.id,urlMatchParams:e.urlMatchParams,setEditProfile:s})))})),I=a(11),D=a(5),A=a.n(D),M=a(7),F=a(10),L=a(29),x={profile:null,status:"",loading:!1},R=function(e){return{type:"SET_USER_PROFILE",profile:e}},W=function(e){return{type:"SET_STATUS",status:e}},B=function(e){return{type:"SET_NEW_PHOTO",photos:e}},G=function(e){return{type:"SET_SUCCESS_LOADING",loading:e}},H=function(e){return function(t){e&&F.c.getProfile(e).then((function(e){t(R(e.data))}))}},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USER_PROFILE":return Object(M.a)({},e,{profile:t.profile});case"SET_STATUS":return Object(M.a)({},e,{status:t.status});case"SET_NEW_PHOTO":return Object(M.a)({},e,{profile:Object(M.a)({},e.profile,{photos:t.photos})});case"SET_SUCCESS_LOADING":return Object(M.a)({},e,{loading:t.loading});default:return e}},V=a(6),J=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"updateProfile",value:function(e){this.props.getProfileThunk(e),this.props.setStatusUserThunk(e)}},{key:"componentDidMount",value:function(){var e=this.props.match.params.userId;this.updateProfile(e)}},{key:"componentDidUpdate",value:function(e,t,a){this.props.match.params.userId!==e.match.params.userId&&this.updateProfile(this.props.match.params.userId)}},{key:"render",value:function(){if(!this.props.match.params.userId){if(this.props.id){var e="/profile/".concat(this.props.id);return r.a.createElement(d.a,{to:e})}return r.a.createElement(d.a,{to:"/login"})}return r.a.createElement(j,{profile:this.props.profile,status:this.props.status,updateStatusUserThunk:this.props.updateStatusUserThunk,id:this.props.id,urlMatchParams:this.props.match.params.userId,updateProfileUserThunk:this.props.updateProfileUserThunk,uploadNewPhotoThunk:this.props.uploadNewPhotoThunk,loading:this.props.loading})}}]),t}(r.a.Component),Z=Object(V.d)(Object(I.b)((function(e){return{profile:e.profilePage.profile,id:e.Auth.id,status:e.profilePage.status,loading:e.profilePage.loading}}),{setUser:R,getProfileThunk:H,setStatusUserThunk:function(e){return function(t){e&&F.c.getStatus(e).then((function(e){t(W(e.data))}))}},updateStatusUserThunk:function(e,t){return function(a){F.c.getStatus(e).then((function(e){a(W(e.data)),t?e.data!==t&&(a(G(!0)),F.c.updateStatus(t).then((function(e){0===e.data.resultCode&&(a(W(t)),a(G(!1)))}))):alert("field empty")}))}},updateProfileUserThunk:function(e){return function(t,a){return F.c.updateProfile(e).then((function(e){if(0!==e.data.resultCode){var n=e.data.messages.length>0?e.data.messages[0]:"Some error";return t(Object(L.a)("editProfile",{_error:n})),Promise.reject(e.data.messages[0])}var r=a().Auth.id;t(H(r))}))}},uploadNewPhotoThunk:function(e){return function(t){var a;return A.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t(G(!0)),n.next=3,A.a.awrap(F.c.uploadPhoto(e));case 3:a=n.sent,t(G(!1)),0===a.data.resultCode&&t(B(a.data.data.photos));case 6:case"end":return n.stop()}}))}}}),d.f)(J),Y=a(12),q=a(47),X=a.n(q),K=function(e){return r.a.createElement("div",{className:X.a.header},r.a.createElement("div",{className:X.a.container},e.isAuth?r.a.createElement("div",{className:X.a.loginBlock},r.a.createElement("h4",null,e.login),e.userPhoto?r.a.createElement("img",{src:e.userPhoto.small,alt:""})||r.a.createElement("img",{src:e.userPhoto.large,alt:""}):r.a.createElement("img",{src:C.a,alt:""}),r.a.createElement("button",{onClick:e.logoutThunk},"Log out")):r.a.createElement(Y.b,{to:"/login/",className:X.a.loginBlock},r.a.createElement("button",{className:X.a.loginBtn},"Login"))))},Q={id:null,login:null,email:null,isAuth:!1,captcha:null},$=function(e,t,a,n){return{type:"SET_AUTH_USER",data:{id:e,login:t,email:a,isAuth:n}}},ee=function(){return function(e){return F.e.me().then((function(t){if(0===t.data.resultCode){var a=t.data.data,n=a.id,r=a.login,o=a.email;e($(n,r,o,!0))}}))}},te=function(){return function(e){var t;return A.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,A.a.awrap(F.f.getCaptcha());case 2:t=a.sent,e({type:"SET_SUCCESS_CAPTCHA",data:{captcha:t.data.url}});case 4:case"end":return a.stop()}}))}},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_AUTH_USER":case"SET_SUCCESS_CAPTCHA":return Object(M.a)({},e,{},t.data);default:return e}},ne={initialized:!1,userPhoto:null},re=function(e){return{type:"INITIALIZED_USER_PHOTO",userPhoto:e}},oe=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.initiliazedUserPhotoThunk(this.props.id)}},{key:"componentDidUpdate",value:function(e,t,a){e.id!==this.props.id&&(null===this.props.id||this.props.initiliazedUserPhotoThunk(this.props.id))}},{key:"render",value:function(){return r.a.createElement(K,Object.assign({},this.props,{userPhoto:this.props.userPhoto}))}}]),t}(r.a.Component),se=Object(I.b)((function(e){return{isAuth:e.Auth.isAuth,login:e.Auth.login,id:e.Auth.id,userPhoto:e.app.userPhoto}}),{logoutThunk:function(){return function(e){F.e.logout().then((function(t){0===t.data.resultCode&&e($(null,null,null,!1))}))}},initiliazedUserPhotoThunk:function(e){return function(t){var a;return A.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(e){n.next=3;break}n.next=7;break;case 3:return n.next=5,A.a.awrap(F.c.getProfile(e));case 5:a=n.sent,t(re(a.data.photos));case 7:case"end":return n.stop()}}))}}})(oe),le=function(e){if(!e)return"Some errors"},ie=Object(_.a)({form:"login"})((function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit},r.a.createElement("div",null,r.a.createElement(E.a,{placeholder:"Email",validate:[le],name:"email",component:O})),r.a.createElement("div",null,r.a.createElement(E.a,{placeholder:"Password",validate:[le],name:"password",type:"Password",component:O})),r.a.createElement("div",null,r.a.createElement(E.a,{name:"rememberMe",component:"input",type:"Checkbox"}),"Remember Me"),e.error&&r.a.createElement("div",{className:T.a.someError},e.error),e.captcha&&r.a.createElement("div",null,r.a.createElement("img",{src:e.captcha,alt:""})),e.captcha&&r.a.createElement("div",null,r.a.createElement(E.a,{placeholder:"enter symbols",name:"captcha",component:"input",validate:[le]})),r.a.createElement("button",null,"Login"))})),ce=function(e){return e.isAuth?r.a.createElement(d.a,{to:"/profile"}):r.a.createElement("div",null,r.a.createElement("h1",null,"Login page"),r.a.createElement(ie,{onSubmit:function(t){e.loginThunk(t.email,t.password,t.rememberMe,t.captcha)},captcha:e.captcha}),r.a.createElement("h3",null,"To interact with a social network:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("h3",null,"register",r.a.createElement("a",{href:"https://social-network.samuraijs.com/signUp",target:"_blank",rel:"noopener noreferrer"}," here"))),r.a.createElement("li",null,r.a.createElement("h3",null,"Go to settings, take the API KEY and replace it in the",r.a.createElement("b",{style:{color:"red"}}," src/api/Api.js"))),r.a.createElement("li",null,r.a.createElement("h3",null,"Log in with your account")),r.a.createElement("li",null,r.a.createElement("h4",null,"Also check out the request",r.a.createElement("a",{href:"https://social-network.samuraijs.com/Default/Default/Limits",target:"_blank",rel:"noopener noreferrer",style:{color:"orange"}}," ","restriction")))),r.a.createElement("h3",null,"If authorization does not work, do it",r.a.createElement("a",{href:"https://social-network.samuraijs.com/login",target:"_blank",rel:"noopener noreferrer"}," here")))},ue=Object(I.b)((function(e){return{isAuth:e.Auth.isAuth,captcha:e.Auth.captcha}}),{loginThunk:function(e,t,a,n){return function(r){F.e.login(e,t,a,n).then((function(e){if(0===e.data.resultCode)r(ee());else{10===e.data.resultCode&&r(te());var t=e.data.messages.length>0?e.data.messages[0]:"Some error";r(Object(L.a)("login",{_error:t}))}}))}},getCaptchaThunk:te})(ce),me=a(35),de=a.n(me),pe=function(e){return r.a.createElement("div",{className:de.a.sidebar})},fe=function(e){return r.a.createElement("div",{className:de.a.sidebar},r.a.createElement(Y.b,{to:"/Users",activeClassName:de.a.active}," Users "),r.a.createElement("br",null),r.a.createElement(Y.b,{to:"/profile/",activeClassName:de.a.active}," Profile "),r.a.createElement("br",null),r.a.createElement(Y.b,{to:"/Dialogs",activeClassName:de.a.active}," Dialogs "))},he=a(15),ge=a.n(he),Ee=function(e){return r.a.createElement("div",{className:ge.a.dialogUser},r.a.createElement(Y.b,{to:"/Dialogs/messages/".concat(e.dialog.id)},r.a.createElement("div",{className:ge.a.userNameWithImg},e.dialog.photos.small&&e.dialog.photos.large?r.a.createElement("img",{src:e.dialog.photos.small,alt:""})||r.a.createElement("img",{src:e.dialog.photos.large,alt:""}):"no img",r.a.createElement("h3",null,e.dialog.userName))),r.a.createElement("div",null,0===e.dialog.newMessagesCount?"":"new Messages Count:"+e.dialog.newMessagesCount))},_e={listDialogs:[],messagesWithFriend:{items:[],totalCount:null},countNesMessages:null,currentUserInChat:[],loading:!1},be=function(e,t){return{type:"SET_MESSAGES_WITH_FRIEND",messages:e,totalCount:t}},ve=function(e){return{type:"SET_SUCCESS_LOADING",loading:e}},Te=function(e){return function(t){var a;return A.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,A.a.awrap(F.a.getListMessagesWithFriend(e));case 2:return a=n.sent,t(be(a.data.items,a.data.totalCount)),console.log("getListMessagesWithFriend"),console.log(a.data),n.next=8,A.a.awrap(F.c.getProfile(e));case 8:a=n.sent,t({type:"SET_CURRENT_USER_IN_CHAT",profile:a.data}),Promise.all([a]).then((function(e){t(ve(!1))}));case 11:case"end":return n.stop()}}))}},Se=function(e,t){return function(a){return A.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,A.a.awrap(F.a.sendMessageToFriend(e,t));case 2:a(Te(e));case 3:case"end":return n.stop()}}))}},Oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_e,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ALL_DIALOGS":return Object(M.a)({},e,{},e.listDialogs,{listDialogs:t.allDialogs});case"SET_MESSAGES_WITH_FRIEND":return Object(M.a)({},e,{messagesWithFriend:Object(M.a)({},e.messagesWithFriend,{items:t.messages})});case"SET_COUNT_NEW_MESSAGES":return Object(M.a)({},e,{countNesMessages:t.countNesMessages});case"SET_CURRENT_USER_IN_CHAT":return Object(M.a)({},e,{currentUserInChat:t.profile});case"SET_SUCCESS_LOADING":return Object(M.a)({},e,{loading:t.loading});default:return e}},ke=a(132),we=a.n(ke),Ne=Object(_.a)({form:"Message"})((function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit,className:we.a.container},r.a.createElement(E.a,{name:"newMessage",placeholder:"Write a message",component:"input"}),r.a.createElement("div",null,r.a.createElement("button",null,"Send")))})),Ce=function(e){var t=e.match.params.userId,a=0===e.currentUserInChat.length?"":e.currentUserInChat.photos.large&&e.currentUserInChat.photos.small?r.a.createElement("img",{src:e.currentUserInChat.photos.large,alt:""}):r.a.createElement("img",{src:C.a,alt:""}),n=e.authUserPhoto?r.a.createElement("img",{src:e.authUserPhoto.small,alt:""})||r.a.createElement("img",{src:e.authUserPhoto.large,alt:""}):" ";return r.a.createElement("div",{className:ge.a.messagesContain},0===e.currentUserInChat.length?"":r.a.createElement("div",{className:ge.a.chatTittle},r.a.createElement("h3",null,e.currentUserInChat.fullName),a),r.a.createElement("div",{className:ge.a.mainChatBlock},r.a.createElement("div",{className:ge.a.chatBody},e.messagesWithFriend.items.length>=10&&r.a.createElement("button",{className:ge.a.past__messages,onClick:function(){e.getReturnMessageDateThunk(e.currentUserInChat.userId,"2020.01.01")}},"Past messages"),0===e.messagesWithFriend.items.length?"You don't have messages with this user":e.messagesWithFriend.items.map((function(e){return r.a.createElement("div",{key:e.id,className:!0===e.viewed?ge.a.messagesWithFriendId:ge.a.notViewedMessage},r.a.createElement("div",{className:ge.a.main__img__username},e.senderId==t?a:n,r.a.createElement("h4",null,e.senderName)),r.a.createElement("div",{className:ge.a.chatText},e.body))})))),r.a.createElement(Ne,{onSubmit:function(a){e.sendMessageToFriendThunk(t,a.newMessage)}}))},Pe=Object(V.d)(d.f,Object(I.b)((function(e){return{messagesWithFriend:e.dialogs.messagesWithFriend,listDialogs:e.dialogs.listDialogs,currentUserInChat:e.dialogs.currentUserInChat,authUserPhoto:e.app.userPhoto}}),{getListMessagesWithFriendThunk:Te,sendMessageToFriendThunk:Se,getReturnMessageDateThunk:function(e,t){return function(a){var n;return A.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,A.a.awrap(F.a.returnMessageThanDate(e,t));case 2:n=r.sent,a(be(n.data));case 4:case"end":return r.stop()}}))}}}))((function(e){var t=e.match.params.userId;return Object(n.useEffect)((function(){e.getListMessagesWithFriendThunk(t)}),[e.match.params.userId]),r.a.createElement(Ce,e)})),Ue=function(e){return e.loading?r.a.createElement(f.a,null):r.a.createElement("div",{className:ge.a.containerDialog},r.a.createElement("div",{className:ge.a.listDialogs},0===e.listDialogs.length?r.a.createElement("div",null,"No dialogs"):e.listDialogs.map((function(e){return r.a.createElement(Ee,{dialog:e,key:e.id})}))),r.a.createElement(d.b,{path:"/Dialogs/messages/:userId?",render:function(){return r.a.createElement(Pe,null)}}))},ye=Object(V.d)(d.f,Object(I.b)((function(e){return{listDialogs:e.dialogs.listDialogs,messagesWithFriend:e.dialogs.messagesWithFriend,countNesMessages:e.dialogs.countNesMessages,id:e.Auth.id,loading:e.dialogs.loading}}),{startChattingThunk:function(e){return function(t){var a;return A.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A.a.awrap(F.a.startChatting(e));case 2:a=t.sent,console.log("startChatting"),console.log(a);case 5:case"end":return t.stop()}}))}},getAllDialogsThunk:function(){return function(e){var t;return A.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e(ve(!0)),a.next=3,A.a.awrap(F.a.getAllDialogs());case 3:t=a.sent,e(ve(!1)),console.log("getAllDialogs"),e({type:"SET_ALL_DIALOGS",allDialogs:t.data}),console.log(t.data);case 8:case"end":return a.stop()}}))}},getListMessagesWithFriendThunk:Te,sendMessageToFriendThunk:Se,getListNewMessagesThunk:function(e){return function(e){var t;return A.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,A.a.awrap(F.a.listNewMessage());case 2:t=a.sent,e({type:"SET_COUNT_NEW_MESSAGES",countNesMessages:t.data}),console.log("getListNewMessages"),console.log(t.data);case 6:case"end":return a.stop()}}))}}}))((function(e){return Object(n.useEffect)((function(){e.getAllDialogsThunk()}),[]),e.id?r.a.createElement(Ue,e):r.a.createElement(d.a,{to:"/login"})})),je=r.a.lazy((function(){return a.e(3).then(a.bind(null,290))})),Ie=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).catchAllUnhandelErrors=function(e){alert(e.reason.message),console.log(e)},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.initiliazedThunk(),window.addEventListener("unhandledrejection",this.catchAllUnhandelErrors)}},{key:"render",value:function(){return this.props.initialized?r.a.createElement("div",{className:"App"},r.a.createElement(se,null),r.a.createElement("div",{className:"mainApp"},r.a.createElement(fe,null),r.a.createElement(d.b,{path:"/Users",render:function(){return r.a.createElement(n.Suspense,{fallback:r.a.createElement(f.a,null)},r.a.createElement(je,null))}}),r.a.createElement(d.b,{exact:!0,path:"/profile/:userId?",render:function(){return r.a.createElement(Z,null)}}),r.a.createElement(d.b,{path:"/Login",render:function(){return r.a.createElement(ue,null)}}),r.a.createElement(d.b,{path:"/Dialogs",render:function(){return r.a.createElement(ye,null)}}),r.a.createElement(pe,null))):r.a.createElement(f.a,null)}}]),t}(r.a.Component),De=Object(V.d)(Object(I.b)((function(e){return{initialized:e.app.initialized}}),{initiliazedThunk:function(){return function(e){e(ee()).then((function(){e({type:"INITIALIZED_SUCCESS"})}))}}}),d.f)(Ie);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ae=a(123),Me=a(133),Fe=a(126),Le=Object(V.c)({userPage:Ae.a,profilePage:z,Auth:ae,form:Fe.a,app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INITIALIZED_SUCCESS":return Object(M.a)({},e,{initialized:!0});case"INITIALIZED_USER_PHOTO":return Object(M.a)({},e,{userPhoto:Object(M.a)({},t.userPhoto)});default:return e}},dialogs:Oe}),xe=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||V.d,Re=Object(V.e)(Le,xe(Object(V.a)(Me.a)));window.store=Re;var We=Re;s.a.render(r.a.createElement(Y.a,null,r.a.createElement(I.a,{store:We},r.a.createElement(De,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},30:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(127),s=a.n(o),l=a(87),i=a.n(l);t.a=function(e){return r.a.createElement("div",{className:i.a.preloadContain},r.a.createElement("img",{src:s.a,className:i.a.preloader,alt:""}))}},35:function(e,t,a){e.exports={sidebar:"Sidebar_sidebar__TptBE",active:"Sidebar_active__2hker"}},41:function(e,t,a){e.exports=a.p+"static/media/userPhoto.a8d8ecba.png"},47:function(e,t,a){e.exports={loginBlock:"Header_loginBlock__1_xZL",loginBtn:"Header_loginBtn__1ac0T",container:"Header_container__3Q_00",header:"Header_header__2oa4e",active:"Header_active__1VMX7"}},87:function(e,t,a){e.exports={preloader:"preloader_preloader__2qVkc",preloadContain:"preloader_preloadContain__X74Uf"}},93:function(e,t,a){}},[[160,1,2]]]);
//# sourceMappingURL=main.54900538.chunk.js.map