"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.commRoutes=commRoutes;var _express=require("express"),_express2=_interopRequireDefault(_express),_mysql=require("mysql"),_mysql2=_interopRequireDefault(_mysql);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function commRoutes(n){var e=_express2.default.Router();return e.get("/:number/comments",function(e,t,s){n.query("SELECT * FROM comment WHERE parentid=?",e.params.number,function(e,s){e?t.status(500).json({status:500,error:e,response:null}):t.status(200).json({status:200,error:null,response:s})})}),e.post("/:number/comments",function(e,r,s){n.query("INSERT INTO comment (author, content, date, parentid) VALUES (?, ?, ?, ?)",[e.body.author,e.body.content,e.body.date,e.params.number],function(t,e){t?r.status(500).json({status:500,error:t,response:null}):n.query("SELECT LAST_INSERT_ID()",function(e,s){t?r.status(500).json({status:500,error:e,response:null}):r.status(200).json({status:200,error:null,response:s})})})}),e.get("/:number/comments/:child",function(e,t,s){n.query("SELECT * FROM comment WHERE parentid=? and id=?",[e.params.number,e.params.child],function(e,s){e?t.status(500).json({status:500,error:e,response:null}):t.status(200).json({status:200,error:null,response:s})})}),e.put("/:number/comments/:child",function(t,r,e){var s={author:t.body.author,content:t.body.content,date:t.body.date};n.query("UPDATE comment SET ? WHERE parentid=? and id=?",[s,t.params.number,t.params.child],function(e,s){e?r.status(500).json({status:500,error:e,response:null}):r.status(200).json({status:200,error:null,response:t.params.child})})}),e.delete("/:number/comments/:child",function(t,r,e){n.query("DELETE FROM comment WHERE parentid=? and id =?",[t.params.number,t.params.child],function(e,s){e?r.status(500).json({status:500,error:e,response:null}):r.status(200).json({status:200,error:null,response:t.params.child})})}),e}