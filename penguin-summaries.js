var success=function(penguins)
{
    console.log("Data collected",penguins);
    console.log(penguins[0])
    console.log(quizweight(penguins[0]))
    console.log(finalweight(penguins[0])+(quizweight(penguins[0]))+(hwweight(penguins[0]))+ (testweight(penguins[0])))
 console.log(getmeanquiz(penguins[1].quizes))
    createtable(penguins);
    headersort(penguins);
    console.log(finalweightedgrade(penguins[0]));
    
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

//get mean homework grade
var getmeanhw = function(homework)
    {
     var hwgrades = homework.map(function(hw)
                                 {
                                    return hw.grade
                                })
        return d3.mean(hwgrades)
    };

//get mean test grade
var getmeantest = function(test)
    {
        var testgrades = test.map(function(tests)
                                    {
                                    return tests.grade
                                    })
        return d3.mean(testgrades)
    };

//get final weighted grade(for the extra stuff)
var testweight = function(penguin)
{
            return getmeantest(penguin.test) * .30;
    
}
var quizweight = function(penguin)
{
   return getmeanquiz(penguin.quizes) * .20;
}
var finalweight = function(penguin)
{
  return penguin.final[0].grade * .35;
}
var hwweight = function(penguin)
{
   return getmeanhw(penguin.homework) * .15
}
var finalweightedgrade = function(penguin)
{
    return testweight(penguin)+ quizweight(penguin)+finalweight(penguin)+ hwweight(penguin);
}

//create the table
var createtable= function(penguins){
var rows=
    d3.select("#classtable tbody")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr");
 //image column
        rows.append("img")
        .attr("src",function(penguin){
            // imgs/penguin.png
            return "imgs/"+ penguin.picture
        });
//quiz mean column
    rows.append("td")
        .text(function(penguin){
        return getmeanquiz(penguin.quizes)});

//hw mean grade column
    rows.append("td")
        .text(function(penguin)
             {
                return getmeanhw(penguin.homework)
            });
//test mean grade column
    rows.append("td")
        .text(function(penguin)
             {
                return getmeantest(penguin.test)
            });
 //final grade column
    rows.append("td")
    .text(function(penguin){return penguin.final[0].grade});
    
    //column for weighted average of grades(extra stuff)
    rows.append("td")
        .text(function(penguin)
             {
              return finalweightedgrade(penguin)  
            });
};

//cleartable function
var clearTable = function()
    {
        d3.selectAll("table tbody tr")
            .remove()
    };

//sort function
var headersort = function(penguins)
    {
//sort by quiz grades
        d3.select("#quizzes")
            .on("click", function()
                {
                    penguins.sort(function(a,b)
                    {
                        var aquiz = getmeanquiz(a.quizes);
                        var bquiz = getmeanquiz(b.quizes)
                        if(aquiz > bquiz) {return 1}
                        else if(aquiz < bquiz) {return -1}
                        else {return 0;}
                    });
            clearTable();
            createtable(penguins);
        });
//sort by homework grades
      d3.select("#homework")
            .on("click", function()
               {
                    penguins.sort(function(a,b)
                        {
                            var ahw = getmeanhw(a.homework);
                            var bhw = getmeanhw(b.homework);
                            if(ahw > bhw) {return 1}
                            else if(ahw < bhw) {return -1}
                            else {return 0;}
                    });
          clearTable()
          createtable(penguins);
      });
//sort by test grades
        d3.select("#tests")  
        .on("click", function()
            {
            penguins.sort(function(a,b)
                          {
                var atest = getmeantest(a.test);
                var btest = getmeantest(b.test);
                if(atest > btest) {return 1}
                else if (atest < btest) {return -1}
                else {return 0;}
            });
            clearTable()
            createtable(penguins)
        });
//sort by final grade
        d3.select("#final")
            .on("click", function()
                {
                penguins.sort(function(a,b)
                {
                  //  var afinal = a.final[0].grade
                //    var bfinal = a.final[0].grade
                    if (a.final[0].grade > b.final[0].grade) {return 1}
                else if (a.final[0].grade < b.final[0].grade){return -1}
                else {return 0}
                });
        clearTable()
        createtable(penguins)
        });
    };
