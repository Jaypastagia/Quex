
app.controller('testController', function($scope, $http) {
 $scope.skillList = [];
 $scope.showAdd = false;
 $scope.addSkills = {
  "id": "",
  "name": "",
  "status": null
}

var localData = localStorage.getItem('data');

console.log(localData);

$http.get('/get/skills').then(function(res) {

  $scope.skillList = res.data; 
});

$scope.skillList.push(JSON.parse(localData))

/*$scope.addSkill = function() {

  $scope.addSkills.id = $scope.skillList.length + 1;
  $scope.skillList.push($scope.addSkills)
  localStorage.setItem('data', JSON.stringify($scope.addSkills))
  $scope.addSkills = {}
}*/

$scope.addSkill = function() {
 $scope.addSkills.id = $scope.skillList.length + 1;
 $scope.skillList.push($scope.addSkills);
 console.log($scope.addSkills);
 localStorage.setItem('data', JSON.stringify($scope.addSkills))
 $http.post('/add/skills', $scope.addSkills)
 .then(function(res) {
  alert('Skill added successfully!');
  $scope.addSkills = {}
});

}

/*$scope.changeSkill = function(obj) {
  var a = $scope.skillList.indexOf(obj);
  $scope.skillList[a] = {
   "id": obj.id,
   "name": obj.name,
   "status": obj.status
 }

 $scope.openEdit = false;
 localStorage.setItem('data', JSON.stringify(obj))

}*/

$scope.changeSkill = function(skill) {
  $http.put('/edit/skills/'+ skill.id , { name: skill.name })
  .then(function(res) {
    alert('Skill updated Successfully');
    $scope.openEdit = false;
  });
}

$scope.changeStatus = function(skill){
  $http.put('/edit/skills/'+skill.id , { status: skill.status })
  .then(function(res) {
    alert('Skill updated Successfully');
    $scope.openEdit = false;
  });
}

$scope.search=function(){
    $http.post('/search/skills' , { search: $scope.searchSkill })
    .then(function(res) {
      $scope.skillList = [];
      $scope.skillList = res.data.list; 
    });
}
})

/***************************************************************************************

            Please refer below angular code for calling apis

            ***************************************************************************************/


  //Add 


  //Edit

  


  //Change Statuys

  /*$scope.status = function(index, status){
    //Approve 
    $http.put('/status/skills/'+ id +'/approve', { status: status })
    .then(function(res) {
      alert('This skill is ' + (status === 1 ? 'Approved' : 'Rejected'));
    });   
}*/

