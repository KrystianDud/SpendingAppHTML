//Developer Settings
let warningWindow = document.getElementById('windowWarning'); 
let warningBtn = document.getElementById('wbtn');

//Google Chart for data display
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

//DOM Selector
bodyTagElement = document.querySelector("body");
var appContainer = document.getElementById('appContainer');
var menuBtn = document.getElementById('navBtn');
menuBtn.addEventListener('click', onMenuPress);
var sidebar = document.getElementById('sidebar');

chart_Btn1 = document.getElementById('chart_Btn1'); 
chart_Btn2 = document.getElementById('chart_Btn2'); 
chart_Btn3 = document.getElementById('chart_Btn3'); 
var addBtn = document.getElementById('addExp');
var addValue = document.createElement('input');
var calendarNotch = document.getElementById('calendarNotch')
var calendarChildren = calendarNotch.children;
chart_Btn1.active = false;
chart_Btn2.active = false;
chart_Btn3.active = true;

chartData = document.getElementById("chartData");
var chartNoDataMsg;


//Add Button Trigger
addBtn.addEventListener('click', addExpense);
var expenseTwo = document.createElement("div");

// Get the date for the new entries record.
var newDate = new Date();
var currentDayNum = newDate.getDate();
var currentDayWeek = newDate.getDay();
var currentMonth = newDate.getMonth();
var currentHour = newDate.getHours();
var currentMinute = newDate.getMinutes();
var monthSet = ["January", "February", "March", "April", "May", "June", "July", "August", "Septmeber", "October", "November", "December"]
var daySet = ["Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday", "Sunday"]
console.log("Obtained new time and Date at: " + currentHour + ":" +currentMinute+ " On the: " +currentDayNum+ "/" + monthSet[currentMonth] );

// Set global array for the items added to the local storage for new cost entries.
var costValue = [];

// Set global array for the calendar items.
var id = 0;
var calendarArray = [];
let KeyName;
var loadLocal;
var newNoteEntry;




//LOCAL STORAGE VARIABLES
// var calendarEntry = JSON.parse(window.localStorage.getItem('CalendarEntry'));
// if (calendarEntry == null) {
//     console.log("no Data to Load...");
//     loadLocal = false;
// }
// else {
//     //Detecting the previous Id to prevent Id conflicting. 
//     id += calendarEntry.id;
//     console.log("Data Loaded...");

//     calendarArray.push(calendarEntry)
//     console.log(calendarEntry)
//     console.log(calendarArray)

//     loadLocal = true;

    //if the array "calendarArray" has anything inside, it shall proced with writing DOM 
    if (calendarArray.length >= 1 || loadLocal == true) {
        console.log("Creating calendar DOM")


        console.log(calendarArray.length)
        //loop should go through array "calendarArray"

        for (i=0; i <= 0; i++) {
            console.log("updating expense")
            createCalendarLocal();
        }

    }  
    else {
        console.log("No Previous information found!")
    }
// }


// Chart Variables

var dayChart = true;

var monthChart = false;

var yearChart = false;




init();

function removeWindow() {
    warningWindow.remove();
    console.log("remove")

    window.screen.width = 412;
    window.screen.height = 915;
}



function init() {
    if (window.screen.width >= 413 || window.screen.height >= 916) {
    }
    else {
        warningWindow.remove();
    }
    // retriveLocalData();
}
//show menu by pressing the hamburger menu
var moveMenu = 1;
function onMenuPress() {
    if (moveMenu = 1) {
        sidebar.style.transform = "translate(-300px)";
        moveMenu++;
        appContainer.style.filter = "blur(10px)"
    } 
} 
//hide menu by clicking outside of the menu div after triggering hamburger.
document.addEventListener("click", (evt) => {
    moveMenu++;

    if (moveMenu >= 3) {
        let targetEl = evt.target;
        moveMenu = 1;

        if (targetEl == sidebar) {
            moveMenu = 1;
        }
        else if (targetEl == menuBtn) {
            moveMenu = 1;
            onMenuPress()
        }

        else {
            sidebar.style.transform = "translate(100px)";
            appContainer.style.filter = "blur(0px)"
            moveMenu = 1;
        }
    }

});





function drawChart() {
    console.log(chart)
    var data = google.visualization.arrayToDataTable([
        ['Food', 'Hours per Day'],
        ['Night Out',     11],
        ['Bills',      2],
        ['Pet',  2],
        ['Medicine', 2],
        ['Coffee',    7],
        ['Dine Out',    7],
        ['Phone',    7],
        ['Entertainment',    7]
    ]);

     var options = {
        title: 'My Daily Activities',
        pieHole: 0.8,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, {width: 300, options});
        
}

function floatingChartBtnYear() {

    if (chart_Btn1.classList.contains("floatingChartDateBtnActive")) {
        //This will detect double click. Trigger reload function?

        console.log("Chart 1 activated");

        chart_Btn2.classList.remove("floatingChartDateBtnActive");
        chart_Btn2.classList.add("floatingChartDateBtn");

        chart_Btn3.classList.add("floatingChartDateBtn");
        chart_Btn3.classList.remove("floatingChartDateBtnActive");
        
    }
        
    else {
        console.log(" chart 1 Else condition active")
        chart_Btn1.classList.remove("floatingChartDateBtnActive")
        chart_Btn1.classList.add("floatingChartDateBtnActive")

        chart_Btn2.classList.remove("floatingChartDateBtnActive");
        chart_Btn2.classList.add("floatingChartDateBtn");

        chart_Btn3.classList.add("floatingChartDateBtn");
        chart_Btn3.classList.remove("floatingChartDateBtnActive");

        // The Chart update should be activated via function under this.
        // In this way the function will be activated only once
        // whenever the user will switch from other chart types

        dayChart = false;
        monthChart = false;
        yearChart = true;

        if (calendarArray == 0 || calendarArray == null) {
            console.log("Nothing Found add expense by clicking Add Button below")
            // chartNoDataMsg.className = ""
            if (chartData.children == 0) {
            chartNoDataMsg = document.createElement("p");
            chartData.appendChild(chartNoDataMsg);
            chartNoDataMsg.innerHTML = "Nothing found! Add expense by clicking Add Button below";
            } 
            else {
                chartData.removeChild;
            }
        }
    }
}

function floatingChartBtnMonth() { 
    if (chart_Btn2.classList.contains("floatingChartDateBtnActive")) {
        //This will detect double click. Trigger reload function?
        console.log("Chart 2 activated");

        chart_Btn1.classList.remove("floatingChartDateBtnActive");
        chart_Btn1.classList.add("floatingChartDateBtn");

        chart_Btn3.classList.add("floatingChartDateBtn");
        chart_Btn3.classList.remove("floatingChartDateBtnActive");
        
    }
        
    else {
        console.log(" chart 2 Else condition active");
        chart_Btn2.classList.remove("floatingChartDateBtnActive");
        chart_Btn2.classList.add("floatingChartDateBtnActive");

        chart_Btn1.classList.remove("floatingChartDateBtnActive");
        chart_Btn1.classList.add("floatingChartDateBtn");

        chart_Btn3.classList.add("floatingChartDateBtn");
        chart_Btn3.classList.remove("floatingChartDateBtnActive");

        // The Chart update should be activated via function under this.
        // In this way the function will be activated only once
        // whenever the user will switch from other chart types

        dayChart = false;
        monthChart = true;
        yearChart = false;

        if (calendarArray == 0 || calendarArray == null) {
            console.log("Nothing Found add expense by clicking Add Button below")
            // chartNoDataMsg.className = ""
            if (chartData.children == 0) {
            chartNoDataMsg = document.createElement("p");
            chartData.appendChild(chartNoDataMsg);
            chartNoDataMsg.innerHTML = "Nothing found! Add expense by clicking Add Button below";
            } 
            else {
                chartData.removeChild;
            }
        }
    }
}   


function floatingChartBtnDay() {
    if (chart_Btn3.classList.contains("floatingChartDateBtnActive")) {
        //This will detect double click. Trigger reload function?

        console.log("Chart 3 activated");

        chart_Btn2.classList.remove("floatingChartDateBtnActive");
        chart_Btn2.classList.add("floatingChartDateBtn");

        chart_Btn1.classList.add("floatingChartDateBtn");
        chart_Btn1.classList.remove("floatingChartDateBtnActive");
        
    }
        
    else {
        console.log(" chart 3 Else condition active");
        chart_Btn3.classList.remove("floatingChartDateBtnActive");
        chart_Btn3.classList.add("floatingChartDateBtnActive");

        chart_Btn2.classList.remove("floatingChartDateBtnActive");
        chart_Btn2.classList.add("floatingChartDateBtn");

        chart_Btn1.classList.add("floatingChartDateBtn");
        chart_Btn1.classList.remove("floatingChartDateBtnActive");

        // The Chart update should be activated via function under this.
        // In this way the function will be activated only once
        // whenever the user will switch from other chart types

        dayChart = true;
        monthChart = false;
        yearChart = false;
        console.log(calendarArray)
        if (calendarArray == 0 || calendarArray == null) {
            console.log("Nothing Found add expense by clicking Add Button below")
            // chartNoDataMsg.className = ""
            console.log(chartData.children)
            if (chartData.children == 0) {
            chartNoDataMsg = document.createElement("p");
            chartData.appendChild(chartNoDataMsg);
            chartNoDataMsg.innerHTML = "Nothing found! Add expense by clicking Add Button below";
            } 
            else {
                chartData.removeChild;
            }
        }
    }
}
































function addExpense() {
    moveMenu = 1;
    addBtn.disabled = true;
    menuBtn.disabled = true;
    let blur = document.createElement('div');
    blur.className = ('blurBcg');
    appContainer.style.filter = "blur(10px)"

    //Main window
    var expenseOne = document.createElement('div');
    expenseOne.className = ('addExpenseOne');
    document.querySelector('body').appendChild(expenseOne);

    //Adds Exit Button and Text Container
    let addExpenseTop = document.createElement('div');
    addExpenseTop.className = ('addExpenseTop');
    expenseOne.appendChild(addExpenseTop);
    
    //Back Button
    let addExpenseTxtBack = document.createElement('div');
    addExpenseTxtBack.className = ('addExpenseTxtBack');
    addExpenseTop.appendChild(addExpenseTxtBack);
    addExpenseTxtBack.addEventListener('click', function() {
        expenseOne.remove();
        addBtn.disabled = false;
        menuBtn.disabled = false;
        appContainer.style.filter = "blur(0px)"
    });

    //Top Text
    let addExpenseTxt = document.createElement('h3');
    addExpenseTxt.innerHTML = ("Add Expense");
    addExpenseTop.appendChild(addExpenseTxt);

    //CSS Grid to be added to display Categories
    let addExpenseG = document.createElement('div');
    addExpenseG.className = ("addExpenseGrid");
    expenseOne.appendChild(addExpenseG);

    //Array for naming and ID convention
    var addExpenseGridArray = [];
    var addExpenseGridCategoriesArray = ["Food", "Night out", "Bills", "Pet", "Medicine", "Coffee", "Dine out", "Phone", "Entertain."]
    //use for loop to generate 9 items
    // create 9 elements and add them to the array
    // once created add forEach loop to generate content within div.

    for (var i=0; i < 9; i++) {
        let addExpenseGridElement = document.createElement('div');
        addExpenseGridElement.className = "addExpenseGridEle";
        addExpenseGridElement.setAttribute("id", "gridEle" + i);
        addExpenseGridArray.push(addExpenseG);

        addExpenseGridElement.addEventListener("click", function() {
        addExpenseGridElement.classList.remove("addExpenseGridEle");
        addExpenseGridElement.classList.add("addExpenseGridEleSelected");

        if (addExpenseGridElement.classList.contains("addExpenseGridEleSelected")) {
            // console.log(addExpenseGridArray)
            // addExpenseGridElement.classList.remove("addExpenseGridEleSelected");
            // addExpenseGridElement.classList.add("addExpenseGridEle");
        }

        else if (addExpenseGridElement.style.background = "rgba(250, 170, 170, 0.336)") {     
            // console.log("selected area is clicked")
        }



            // if (chart_Btn3.classList.contains("floatingChartDateBtnActive")) {
            //     console.log("Chart 3 activated");
        
            //     chart_Btn2.classList.remove("floatingChartDateBtnActive");
            //     chart_Btn2.classList.add("floatingChartDateBtn");
        
            //     chart_Btn1.classList.add("floatingChartDateBtn");
            //     chart_Btn1.classList.remove("floatingChartDateBtnActive");
            // }
                
            // else {
            //     console.log(" chart 3 Else condition active");
            //     chart_Btn3.classList.remove("floatingChartDateBtnActive");
            //     chart_Btn3.classList.add("floatingChartDateBtnActive");
        
            //     chart_Btn2.classList.remove("floatingChartDateBtnActive");
            //     chart_Btn2.classList.add("floatingChartDateBtn");
        
            //     chart_Btn1.classList.add("floatingChartDateBtn");
            //     chart_Btn1.classList.remove("floatingChartDateBtnActive");
            // }



    })

        // (function selectExpenseType(index) {
        //     addExpenseGridElement.addEventListener("click", function() {
        //         console.log(index)
        //         addExpenseGridElement.style.background = "rgba(30, 255, 1, 0.336)"
        //     })(i)
        // })
        addExpenseG.appendChild(addExpenseGridElement);

        var addExpenseGridImg = document.createElement('div');
        addExpenseGridImg.className = "addExpenseGridIcon"
        addExpenseGridImg.setAttribute("id", "Gridimg" + i )
        addExpenseGridElement.appendChild(addExpenseGridImg);

        let src = document.getElementById("Gridimg" + i);
        src.style.backgroundImage = "url(Misc/img" + i + ".png)"

        var addExpenseGridElementTxt = document.createElement('p');
        addExpenseGridElementTxt.className = "addExpenseGridIconText"
        addExpenseGridElement.appendChild(addExpenseGridElementTxt)
        addExpenseGridElementTxt.innerHTML = addExpenseGridCategoriesArray[i];
    }

    //Add button
    let addExpenseButton = document.createElement('button');
    addExpenseButton.className = "addExpenseBtn";
    addExpenseButton.innerHTML = "Next"
    expenseOne.appendChild(addExpenseButton);

    //Add Progress Dots
    let addExpenseprogress = document.createElement('div');
    addExpenseprogress.className = "addExpenseDots";
    expenseOne.appendChild(addExpenseprogress);

    //Add button Function
    addExpenseButton.addEventListener("click", function() {

        var expenseTwo = document.createElement("div")
        expenseTwo.className = ('addExpenseTwo');
        expenseOne.remove();
        document.querySelector('body').appendChild(expenseTwo);

        //Adds Exit Button and Text Container
        let addExpenseTop = document.createElement('div');
        addExpenseTop.className = ('addExpenseTop');
        expenseTwo.appendChild(addExpenseTop);
        
        //Back Button
        let addExpenseTxtBack = document.createElement('div');
        addExpenseTxtBack.className = ('addExpenseTxtBack');
        addExpenseTop.appendChild(addExpenseTxtBack);

        addExpenseTxtBack.addEventListener('click', function() {
            expenseTwo.remove();
            //this should be a functionality to go back to the previous window. 
            //Still in Development
            appContainer.style.filter = "blur(0px)"
        });

        //Top Text
        let addExpenseTxt = document.createElement('h3');
        addExpenseTxt.innerHTML = ("Add Amount");
        addExpenseTop.appendChild(addExpenseTxt);
        //Add Value to the app
        addValue.className = "addVal";
        addValue.setAttribute("placeholder", "£0.00")
        addValue.setAttribute("step", ".01")
        addValue.setAttribute("min", "0")
        addValue.setAttribute("value", "")



        addValue.setAttribute("type", "number")
        expenseTwo.appendChild(addValue);




        //Add Note (Optional) Input field with bottom border
        let addNote = document.createElement('input');
        addNote.className = "addNot";
        addNote.setAttribute("placeholder", "Add Note (Optional)")
        addNote.setAttribute("type", "text")
        addNote.setAttribute("value", "")

        expenseTwo.appendChild(addNote);

        


        //add button
        let addCloseButton = document.createElement('button');
        addCloseButton.className = "addExpenseBtn";
        addCloseButton.innerHTML = "Save"
        addCloseButton.addEventListener("click", () => {

            //Remove window and set to the default
            expenseTwo.remove();
            appContainer.style.filter = "blur(0px)"
            addBtn.disabled = false;
            menuBtn.disabled = false;

            // Update the top Calendar element function
            // Add Value to the array. This way it will be known how many entries will be needed for the clendar items.
            newCostEntry = addValue.value;
            costValue.push(newCostEntry);

            newNoteEntry = addNote.value;

            updateExpense()

        });
        expenseTwo.appendChild(addCloseButton);

        //Add Progress Dots
        let addExpenseprogress = document.createElement('div');
        addExpenseprogress.className = "addExpenseDots";
        addExpenseprogress.style.transform = "rotateZ(180deg)"
        expenseTwo.appendChild(addExpenseprogress);
    })

    function updateExpense() {
        //Create Element Div
        let calendarItem = document.createElement('div');
        calendarNotch.appendChild(calendarItem);
    
        //Change class from "calendarIndividual" to "calendarIndividualActive" if the array element is last.
        for (i = 0; i < costValue.length; i++){
            calendarChildren[i].className = "calendarIndividual";
    
        }
        calendarChildren[costValue.length - 1].className = "calendarIndividualActive";
    
        
    
        // Create Individual Ids for Calendar Elements -- NO IMPLEMENTATION ATM
    
        // Create Day of entry using shortened Day array
        // Note: Instead creating a new array, use stringify and make sure that only 3 first letters are being used for this instance.
        let calendarDay = document.createElement('p');
        calendarDay.className = "presentDay";
        setDay = daySet[currentDayWeek-1]
        let setDayShort = setDay.slice(0, 3);
        calendarDay.innerHTML = setDayShort;
        calendarItem.appendChild(calendarDay);
        
    
    
        //Create numeric date / month using array
        let calendarDaynumber = document.createElement('p');
        calendarDaynumber.className = "presentDate";
        let setDateMonthString = monthSet[currentMonth].slice(0, 3);
        let setDate = currentDayNum + "/" + setDateMonthString;
        calendarDaynumber.innerHTML = setDate;
        calendarItem.appendChild(calendarDaynumber);
    
        //Create Value using "£" symbol + appValue Variable.
        let calendarValue = document.createElement("p");
        calendarValue.className = "presentDayValue";
        let entryValue = "£" + costValue[costValue.length - 1]
        calendarValue.innerHTML = entryValue;
        calendarItem.appendChild(calendarValue);
    
    
        // The calendarItem children needs to have changed class names in order to be visually correct
        // Use if statement to verify class name and then apply new class on the element children
        if (calendarItem.previousSibling.className = "calendarIndividual") {
    
            calendarItem.previousSibling.childNodes[0] = "previousDay";
            calendarItem.previousSibling.childNodes[1] = "previousDate";
            calendarItem.previousSibling.childNodes[2] = "previousDayValue";
    
        }
        else {
            calendarItem.previousSibling.childNodes[0] = "presentDay";
            calendarItem.previousSibling.childNodes[1] = "presentDate";
            calendarItem.previousSibling.childNodes[2] = "presentDayValue";
    
        }
        id++;
    
        let calendar = {
            id: id,
            day: setDayShort,
            date: setDate,
            value: entryValue,
            note: newNoteEntry        
        };
        calendarArray.push(calendar);

        console.log(calendarArray);
        calendarStorage = JSON.stringify(calendar)
        console.log(calendarStorage);
    
        
    
        // Set given value of the cost to the local storage
        // if (typeof(Storage) !== "undefined") {
        //     // Code for localStorage/sessionStorage.
        //     let editedLocalEntry = JSON.stringify(calendarArray);
        //     let editedLocalEntrySlice = editedLocalEntry.slice(1, editedLocalEntry.length-1);

        //     console.log(editedLocalEntry);
        //     console.log(editedLocalEntrySlice);

        //     localStorage.setItem("CalendarEntry", editedLocalEntrySlice);
        // } else {
        //     window.alert("This feature is not supported in your browser... Please update your borowser to be able to use this feature. ")
        // }

    
    
    
        // Activate the most recent entry by adding "calendarIndividualActive" Class created in CSS
    
        //Consider using expermental Array.at or index of or nth child. Confirm what works best here.
    
        
    }
    
}































// function retriveLocalData () {
//     //if the array "calendarArray" has anything inside, it shall proced with writing DOM 
//     if (calendarArray.length >= 1 || loadLocal == true) {
//         console.log("Creating calendar DOM")


//         console.log(calendarArray.length)
//         //loop should go through array "calendarArray"

//         for (i=0; i <= 0; i++) {
//             console.log("updating expense")
//             createCalendarLocal();
//         }

//     }  
//     else {
//         console.log("No Previous information found!")
//     }
// }







function createCalendarLocal() {

    //Create Element Div
    let calendarItemLocal = document.createElement('div');
    calendarNotch.appendChild(calendarItemLocal);
    console.log(calendarChildren)
    calendarItemLocal.className = "calendarIndividual";


    //Change class from "calendarIndividual" to "calendarIndividualActive" if the array element is last.
    // for (i = 0; i < costValue.length; i++){
    //     calendarChildren[i].className = "calendarIndividual";

    // }
    // calendarChildren[costValue.length - 1].className = "calendarIndividualActive";

    

    // Create Individual Ids for Calendar Elements -- NO IMPLEMENTATION ATM

    // Create Day of entry using shortened Day array
    // Note: Instead creating a new array, use stringify and make sure that only 3 first letters are being used for this instance.
    let calendarDay = document.createElement('p');
    calendarDay.className = "presentDay";
    setDay = daySet[currentDayWeek-1]
    let setDayShort = setDay.slice(0, 3);
    calendarDay.innerHTML = setDayShort;
    calendarItemLocal.appendChild(calendarDay);
    


    //Create numeric date / month using array
    let calendarDaynumber = document.createElement('p');
    calendarDaynumber.className = "presentDate";
    let setDateMonthString = monthSet[currentMonth].slice(0, 3);
    let setDate = currentDayNum + "/" + setDateMonthString;
    calendarDaynumber.innerHTML = setDate;
    calendarItemLocal.appendChild(calendarDaynumber);

    //Create Value using "£" symbol + appValue Variable.
    let calendarValue = document.createElement("p");
    calendarValue.className = "presentDayValue";

    calendarValue.innerHTML = calendarArray[0].entryValue;

    console.log(calendarArray)
    calendarItemLocal.appendChild(calendarValue);


    // The calendarItemLocal children needs to have changed class names in order to be visually correct
    // Use if statement to verify class name and then apply new class on the element children
    if (calendarItemLocal.previousSibling.className = "calendarIndividual") {

        calendarItemLocal.previousSibling.childNodes[0] = "previousDay";
        calendarItemLocal.previousSibling.childNodes[1] = "previousDate";
        calendarItemLocal.previousSibling.childNodes[2] = "previousDayValue";

    }
    else {
        calendarItemLocal.previousSibling.childNodes[0] = "presentDay";
        calendarItemLocal.previousSibling.childNodes[1] = "presentDate";
        calendarItemLocal.previousSibling.childNodes[2] = "presentDayValue";

    }
    id++;

    // let calendar = {
    //     id: id,
    //     day: setDayShort,
    //     date: setDate,
    //     value: entryValue,
    //     note: newNoteEntry        
    // };
    // calendarArray.push(calendar);

    // console.log(calendarArray);
    // calendarStorage = JSON.stringify(calendar)
    // console.log(calendarStorage);
}
