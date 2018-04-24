!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r.w={},r(r.s=9)}([function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("js-nacl")},function(e,t,r){const n={};r(1).instantiate(e=>{n.makeKeypair=(t=>{const r=e.crypto_sign_keypair_from_seed(t);return{publicKey:new Buffer(r.signPk),privateKey:new Buffer(r.signSk)}}),n.sign=((t,r)=>{const n=e.crypto_sign_detached(t,new Buffer(r.privateKey,"hex"));return new Buffer(n)}),n.verify=((t,r,n)=>e.crypto_sign_verify_detached(new Buffer(r,"hex"),t,new Buffer(n,"hex")))}),e.exports=n},function(e,t){e.exports=require("assert")},function(e,t){e.exports=require("bytebuffer")},function(e,t,r){const n=r(4),i=r(0),o=r(3),a=r(2),s={},c={2:function(e){try{var t=new Buffer(e.asset.delegate.username,"utf8")}catch(e){throw Error(e.toString())}return t},3:function(e){try{var t=e.asset.vote.votes?new Buffer(e.asset.vote.votes.join(""),"utf8"):null}catch(e){throw Error(e.toString())}return t},5:function(e){try{var t=new Buffer([]),r=new Buffer(e.asset.dapp.name,"utf8");if(t=Buffer.concat([t,r]),e.asset.dapp.description){var i=new Buffer(e.asset.dapp.description,"utf8");t=Buffer.concat([t,i])}e.asset.dapp.git&&(t=Buffer.concat([t,new Buffer(e.asset.dapp.git,"utf8")]));var o=new n(8,!0);o.writeInt(e.asset.dapp.type),o.writeInt(e.asset.dapp.category),o.flip(),t=Buffer.concat([t,o.toBuffer()])}catch(e){throw Error(e.toString())}return t}};function u(e,t){var r,i;i=e.type>0&&(r=c[e.type](e))?r.length:0;const o=new n(213+i,!0);o.writeUint32(e.type),o.writeLong(e.timestamp);const a=new Buffer(e.senderPublicKey,"hex");for(let e=0;e<a.length;++e)o.writeByte(a[e]);if(e.recipientPublicKey&&o.writeString(e.recipientPublicKey),o.writeLong(e.amount),o.writeLong(e.fee),i>0)for(let e=0;e<i;++e)o.writeByte(r[e]);if(!t&&e.signature){const t=new Buffer(e.signature,"hex");for(let e=0;e<t.length;++e)o.writeByte(t[e])}return o.flip(),o.toBuffer()}function f(e){return i.createHash("sha256").update(e).digest().toString("hex")}function l(e,t){var r=new n(180,!0);r.writeInt(e.version),r.writeLong(e.timestamp),r.writeUint32(e.height),e.previousBlock&&r.writeString(e.previousBlock),r.writeUint32(e.numberOfTransactions),r.writeLong(e.totalAmount),r.writeLong(e.totalFee),r.writeLong(e.reward),r.writeLong(e.magic),r.writeUint32(e.payloadLength);var i=new Buffer(e.payloadHash,"hex");for(let e=0;e<i.length;++e)r.writeByte(i[e]);var o=new Buffer(e.generatorPublicKey,"hex");for(let e=0;e<o.length;++e)r.writeByte(o[e]);if(!t&&e.blockSignature){var a=new Buffer(e.blockSignature,"hex");for(let e=0;e<a.length;++e)r.writeByte(a[e])}return r.flip(),r.toBuffer()}s.verifyTrs=(e=>{var t=u(e);o(e.id===f(t),"trs id"),t=u(e,!0),o(s.verify(t,e.signature,e.senderPublicKey),"signature verify")}),s.verify=((e,t,r)=>{const n=i.createHash("sha256").update(e).digest();return a.verify(n,t,r)}),s.verifyBlock=(e=>{var t=l(e);o(e.id===f(t),"block id"),t=l(e,!0),o(s.verify(t,e.blockSignature,e.generatorPublicKey),"signature verify")}),e.exports={bytesTypes:c,getTransactionBytes:u,fromSecret:function(e){var t=i.createHash("sha256").update(e,"utf8").digest();return{secret:e,keyPair:a.makeKeypair(t)}},getId:f,sign:function(e,t){var r=i.createHash("sha256").update(t).digest();return a.sign(r,e).toString("hex")},blockGetBytes:l,verifyBlock:function(e){s.verifyBlock(e);for(const t of e.transactions)s.verifyTrs(t)}}},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("jsonfile")},function(e,t){e.exports=require("bitcore-mnemonic")},function(e,t,r){const n=r(0),i=r(8),o=r(7),a=r(6),s=r(5),c={gen:function(e){var t;try{if(t=o.readFileSync(a.resolve(e,"gen.json")),Array.isArray(t.delegates))return t}catch(e){}t={delegates:[]};for(let e=0;e<101;++e)t.delegates.push(new i(i.Words.ENGLISH).toString());return t.white=new i(i.Words.ENGLISH).toString(),t.black=new i(i.Words.ENGLISH).toString(),o.writeFileSync(a.resolve(e,"gen.json"),t,{spaces:2}),t},config:function(e,t,r){var i=0,c=n.createHash("sha256"),u=[],f=0;const l={type:0,amount:Math.pow(10,8)*Math.pow(10,4),fee:0,timestamp:0,recipientPublicKey:s.fromSecret(t.white).keyPair.publicKey.toString("hex"),senderPublicKey:s.fromSecret(t.black).keyPair.publicKey.toString("hex")};f+=l.amount;var g=s.getTransactionBytes(l);l.signature=s.sign(s.fromSecret(t.black).keyPair,g),g=s.getTransactionBytes(l),l.id=s.getId(g),u.push(l);for(let e=0;e<101;++e){const r=s.fromSecret(t.delegates[e]),n="ay_g"+(e+1),i={type:2,amount:0,fee:0,timestamp:0,recipientPublicKey:null,senderPublicKey:r.keyPair.publicKey.toString("hex"),asset:{delegate:{username:n}}};g=s.getTransactionBytes(i),i.signature=s.sign(r.keyPair,g),g=s.getTransactionBytes(i),i.id=s.getId(g),u.push(i)}const y=t.delegates.map(function(e){return`+${(e=s.fromSecret(e)).keyPair.publicKey.toString("hex")}`}),p={type:3,amount:0,fee:0,timestamp:0,recipientPublicKey:null,senderPublicKey:s.fromSecret(t.white).keyPair.publicKey.toString("hex"),asset:{vote:{votes:y}}};g=s.getTransactionBytes(p),p.signature=s.sign(s.fromSecret(t.white).keyPair,g),g=s.getTransactionBytes(p),p.id=s.getId(g),u.push(p),(u=u.sort(function(e,t){return e.type!=t.type?e.type<t.type?-1:1:e.amount!=t.amount?e.amount>t.amount?-1:1:e.id.localeCompare(t.id)})).forEach(function(e){g=s.getTransactionBytes(e),i+=g.length,c.update(g)});var d={version:0,totalAmount:f,totalFee:0,timestamp:0,height:1,reward:0,magic:e,payloadHash:(c=c.digest()).toString("hex"),numberOfTransactions:u.length,payloadLength:i,previousBlock:null,generatorPublicKey:s.fromSecret(t.white).keyPair.publicKey.toString("hex"),transactions:u};g=s.blockGetBytes(d),d.blockSignature=s.sign(s.fromSecret(t.white).keyPair,g),g=s.blockGetBytes(d),d.id=s.getId(g),o.writeFileSync(a.resolve(r,"genesisblock.json"),d,{spaces:2})}};global.configBundle=c}]);
