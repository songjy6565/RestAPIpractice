"use strict";module.exports=function(t,s){t.use("/",function(t,s,a){!t.headers.authorization&&0!=t.headers.authorization.search("Basic ")||"jupsu:password123"!=new Buffer(t.headers.authorization.split(" ")[1],"base64").toString()?s.status(401).json({status:401,error:"wrong authorization"}):a()})};