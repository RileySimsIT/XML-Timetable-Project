function loadXMlDoc() { //command to load the XML
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayTable(this);
        }
    }

    xmlhttp.open("GET", "instance1.xml", true);

    xmlhttp.send();
}

function displayTable(xml) {
    var xmlDoc = xml.responseXML;
    
        document.getElementById("tableTitle").innerHTML = "Timetable for " + xmlDoc.documentElement.getAttribute("name") + " (#" + xmlDoc.documentElement.getAttribute("id") + ")";

        if (xmlDoc.documentElement.getAttribute("school") !== null) {
            document.getElementById("school").innerHTML += xmlDoc.documentElement.getAttribute("school");
        } else {
            document.getElementById("school").innerHTML += "N/A";
        }

        if (xmlDoc.documentElement.getAttribute("program") !== null) {
            document.getElementById("program").innerHTML += xmlDoc.documentElement.getAttribute("program");
        } else {
            document.getElementById("program").innerHTML += "N/A";
        }

        document.getElementById("term").innerHTML += xmlDoc.documentElement.getAttribute("term");

    var dHtml = "";
    var counter = 800; //starting time for the day
    var col = 5; //I might have col and row switched I always get them confused. It works though
    var row = 14;
    for (var i = 0; i < row; ++i) {
        if (i != 0) {
            dHtml += "<tr><td class='AlphaColumn'>" + counter + "</td>"; // displays the times down the side of the table
            counter += 100;
        } else {
            dHtml += "<tr><td class='AlphaColumn'></td>";
        }
        for (var z = 0; z < col; z++) {
            if (z == 0 && i == 0) {
                dHtml += "<td class='AlphaColumn'>Monday</td> <td class='AlphaColumn'>Tuesday</td> <td class='AlphaColumn'>Wednesday</td> <td class='AlphaColumn'>Thursday</td> <td class='AlphaColumn'>Friday</td>"; //insert the week header
                z = 5;
            }
            else {
                dHtml += "<td id='"+i+"_"+z+"' class='AlphaColumn'> </td>"; //fills the table with blank information assigning dynamic IDs to the collumns that need information
            }
        }
        dHtml += "</tr>"; //closes the row
    }
    document.getElementById("timetable").innerHTML = dHtml; //adds the blank table to the html doccument

    
    var dayVal = "";
    var codeVal = "";
    var roomVal = "";
    var timeVal = "";
    var week = xmlDoc.getElementsByTagName("week"); //grabs all the week elements
    for (var i = 0; i < week.length; ++i) {
        var day = week[i].getElementsByTagName("day"); //grabs all the day elements from within the week
        for (var z = 0; z < day.length; ++z) {
            dayVal = day[z].getAttribute("date"); //takes the day we are currently looking at
            var course = day[z].getElementsByTagName("class"); //grabs all the class elements from within the day
            for (var x = 0; x < course.length; ++x) { 
                codeVal = course[x].getAttribute("code"); //saves the code attribute we are currently looking at
                roomVal = course[x].getAttribute("room"); //saves the room attribute we are currently looking at
                var time = course[x].getElementsByTagName("time"); //get all the times within the class
                for (var y = 0; y < time.length; ++y) {
                    timeVal = time[y].firstChild.nodeValue; //save the time we are currently looking at
                    var id = findId(dayVal, timeVal); //parse the day and time into an id value to be inserted into the table
                    document.getElementById(id).innerHTML += "Course: "+codeVal+"</br>Room: "+roomVal+"</br>"; //insert the data into the table
                }
            }
        }
    }
}

function findId(day, time) {
    var dayId = "";
    var timeId = "";
    switch (day) { //converts day into ID
        case "Monday":
            dayId = 0
            break;
        case "Tuesday":
            dayId = 1
            break;
        case "Wednesday":
            dayId = 2
            break;
        case "Thursday":
            dayId = 3
            break;
        case "Friday":
            dayId = 4
            break;
        default:
            console.log("day to id broken")
            break;
    }
    switch (time) { //converts time into Id
        case "800":
            timeId = 1
            break;
        case "900":
            timeId = 2
            break;
        case "1000":
            timeId = 3
            break;
        case "1100":
            timeId = 4
            break;
        case "1200":
            timeId = 5
            break;
        case "1300":
            timeId = 6
            break;
        case "1400":
            timeId = 7
            break;
        case "1500":
            timeId = 8
            break;
        case "1600":
            timeId = 9
            break;
        case "1700":
            timeId = 10
            break;
        case "1800":
            timeId = 11
            break;
        case "1900":
            timeId = 12
            break;
        case "2000":
            timeId = 13
            break;
        default:
            console.log("time to id broken")
            break;
    }
    var id = timeId + "_" + dayId; //combines into cell id
    return id;
}