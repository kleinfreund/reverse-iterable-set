class e{_setMap;_firstNode;_lastNode;constructor(e){if(this._setMap=new Map,this._firstNode=null,this._lastNode=null,void 0!==e)for(const t of e)this.add(t)}get[Symbol.toStringTag](){return"ReverseIterableSet"}get size(){return this._setMap.size}clear(){this._setMap.clear(),this._firstNode=null,this._lastNode=null}has(e){return this._setMap.has(e)}add(e){if(this.has(e))return this;const s=new t(e);return this._setMap.set(e,s),null!==this._lastNode&&(s.prevNode=this._lastNode,this._lastNode.nextNode=s),null===this._firstNode&&(this._firstNode=s),this._lastNode=s,this}addFirst(e){if(this.has(e))return this;const s=new t(e);return this._setMap.set(e,s),null!==this._firstNode&&(s.nextNode=this._firstNode,this._firstNode.prevNode=s),null===this._lastNode&&(this._lastNode=s),this._firstNode=s,this}delete(e){const t=this._setMap.get(e);return void 0!==t&&(null!==t.prevNode&&null!==t.nextNode?(t.prevNode.nextNode=t.nextNode,t.nextNode.prevNode=t.prevNode):null!==t.prevNode?(t.prevNode.nextNode=null,this._lastNode=t.prevNode):null!==t.nextNode?(t.nextNode.prevNode=null,this._firstNode=t.nextNode):(this._firstNode=null,this._lastNode=null),this._setMap.delete(e))}forEach(e,t){for(const[s,r]of this.entries())e.call(t,r,s,this)}forEachReverse(e,t){for(const[s,r]of this.entries().reverseIterator())e.call(t,r,s,this)}[Symbol.iterator](){return this.values()}reverseIterator(){return this.values().reverseIterator()}entries(){return this._iterableIterator((e=>[e.value,e.value]))}values(){return this._iterableIterator((e=>e.value))}iteratorFor(e){let t=this._setMap.get(e);return this._iterableIterator((e=>e.value),t)}_iterableIterator(e,t){const s=this._lastNode;let r=void 0!==t?t:this._firstNode,o=!0;return{reverseIterator(){return r=void 0!==t?t:s,o=!1,this},[Symbol.iterator](){return this},next(){let t;return r&&(t=e(r),r=o?r.nextNode:r.prevNode),{value:t,done:void 0===t}}}}}class t{value;nextNode;prevNode;constructor(e){this.value=e,this.nextNode=null,this.prevNode=null}}export{e as default};
