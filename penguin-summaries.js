var success=function(penguins)
{
    console.log("Data collected",penguins);
    createtable(penguins);
var getquiz=quizes.map(function(quiz){
    return quiz.grade
}

)};
var failure= function(Errormsg){
    console.log("Something is wrong", Errormsg);};

var penguinPromise=d3.json("classData.json");
penguinPromise.then(success,failure);
 
var createtable= function(penguins){
var rows=
    d3.select("#classtable tbody")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr")
    .text(function(penguins){return penguins.final});
    rows.append("td")
        .text(function(getquiz){
        return getquiz
    })};

