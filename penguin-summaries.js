var success=function(penguins)
{
    console.log("Data collected",penguins);
    console.log(penguins[0])
    console.log(getmeanquiz(penguins[1].quizes))
    createtable(penguins);

};
var failure= function(Errormsg){
    console.log("Something is wrong", Errormsg);};

var penguinPromise=d3.json("classData.json");
penguinPromise.then(success,failure);

// gets the mean quizgrade
// Give it an array of quizzes
var getmeanquiz= function(quizes){
    var quizgrades= quizes.map(function(quiz){
        return quiz.grade
    })
    return d3.mean(quizgrades)
} 

var createtable= function(penguins){
var rows=
    d3.select("#classtable tbody")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr")
    .text(function(penguin){return penguin.final[0].grade});
    rows.append("td")
        .text(function(penguin){
        return getmeanquiz(penguin.quizes)})
        rows.append("img")
        .attr("src",function(penguin){
            // imgs/penguin.png
            return "imgs/"+ penguin.picture
        })
};

