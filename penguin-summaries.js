var success=function(penguins)
{
    console.log("Data collected",penguins);
    console.log(penguins[0])
    console.log(getmeanquiz(penguins[1].quizes))
    createtable(penguins);
    headersort(penguins);
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
                        if(a.quizes > b.quizes) {return 1}
                        else if(a.quizes < b.quizes) {return -1}
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
                            if(a.homework > b.homework) {return 1}
                            else if(a.homework > b.homework) {return -1}
                            else {return 0;}
                    });
          clearTable()
          createTable(penguins);
      });
//sort by test grades
        d3.select("#test")  
        .on("click", function()
            {
            penguins.sort(function(a,b)
                          {
                if(a.test > b.test) {return 1}
                else if (a.test < b.test) {return -1}
                else {return 0;}
            });
            clearTable()
            createtable(penguins)
        });
        
        d3.select("#final")
            .on("click", function()
                {
                penguins.sort(function(a,b)
                {
                    if (a.final > b.final) {return 1}
                else if (a.final < b.final){return -1}
                else {return 0}
                });
        clearTable()
        createtable(penguins)
        })}