define(["require","exports","module","react","./todos"],function(e,t,n){var r=e("react"),i=e("./todos"),s=r.createClass({displayName:"Main",handleChange:function(e){var t=e.target.checked;this.props.toggleAll(t)},render:function(){return r.createElement("div",null,r.createElement("input",{id:"toggle-all",type:"checkbox",onChange:this.handleChange,checked:this.isAllCompleted}),r.createElement("label",{htmlFor:"toggle-all"},"Mark all as complete"),r.createElement(i,{todos:this.props.todos,updateTodo:this.props.updateTodo,removeTodo:this.props.removeTodo}))}});n.exports=s});