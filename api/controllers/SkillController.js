var fs=require('fs');

module.exports = {
	skills:function(req,res){
		fs.readFile('data/data.json', 'utf8', function readFileCallback(err, data){
			if (err){
				console.log(err);
			} else {
			    obj = JSON.parse(data); //now it an object
			    return res.json(obj);

			}
		});
	},
	addSkills:function(req,res){
		fs.readFile('data/data.json', 'utf8', function readFileCallback(err, data){
			if (err){
				console.log(err);
			} else {
				obj = JSON.parse(data);
			    obj.push(req.body);
			    json = JSON.stringify(obj);
			    fs.writeFile('data/data.json', json, 'utf8', function(){
			    	return res.json({status:"success",list:obj});
			    }); 
			}
		});
	},
	editSkills:function(req,res){
		var skillId=req.param('id');
		var skillUpdate=req.body;
		console.log(skillId);
		console.log(req.body);
		fs.readFile('data/data.json', 'utf8', function readFileCallback(err, skillList){
			if (err){
				console.log(err);
			} else {
				skillObj = JSON.parse(skillList);
			    for(i in skillObj){
			    	if(skillObj[i].id==skillId){
			    		if(skillUpdate.name!=undefined){
			    			skillObj[i].name=skillUpdate.name;
			    		}
		    			if(skillUpdate.status!=undefined){
		    				skillObj[i].status=skillUpdate.status;
		    			}
		    			break;
		    		}
			    }
			    json = JSON.stringify(skillObj); //convert it back to json
			    fs.writeFile('data/data.json', json, 'utf8', function(){
			    	return res.json({status:"success",list:obj});
			    });
			}
		});
	},
	searchSkills:function(req,res){
		console.log("inside searchSkill--"+req.body.search);
		var foundSkills=[];
		var search=req.body.search.toLowerCase();
		fs.readFile('data/data.json', 'utf8', function readFileCallback(err, data){
			if (err){
				console.log(err);
			} else {
			    obj = JSON.parse(data);
			    
			    if(search){
			    	for(i in obj){
			    		var skill=obj[i].name.toLowerCase();
			    		if(skill.includes(search)){
			    			foundSkills.push(obj[i]);
			    		}
			    	}
			    }else{
			    	foundSkills=obj;
			    }
			    return res.json({status:"success",list:foundSkills});
			}
		});
	}
};