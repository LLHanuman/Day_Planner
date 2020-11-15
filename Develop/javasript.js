// This makes it so the javascript doesn't run until the html page is loaded
$(document).ready(function() {
    // each day in planner
    var dayPlanner = [{
            id: "0",
            hour: "09",
            Mtime: "09",
            amOrPm: "AM",
            note: "",
        },
        {
            id: "1",
            hour: "10",
            Mtime: "10",
            amOrPm: "AM",
            note: "",
        },
        {
            id: "2",
            hour: "11",
            Mtime: "11",
            amOrPm: "AM",
            note: "",
        },
        {
            id: "3",
            hour: "12",
            Mtime: "12",
            amOrPm: "PM",
            note: "",
        },
        {
            id: "4",
            hour: "01",
            Mtime: "13",
            amOrPm: "PM",
            note: "",
        },
        {
            id: "5",
            hour: "02",
            Mtime: "14",
            amOrPm: "PM",
            note: "",
        },
        {
            id: "6",
            hour: "03",
            Mtime: "15",
            amOrPm: "PM",
            note: "",
        },
        {
            id: "7",
            hour: "04",
            Mtime: "16",
            amOrPm: "PM",
            note: "",
        },
        {
            id: "8",
            hour: "05",
            Mtime: "17",
            amOrPm: "PM",
            note: "",
        },
    ];

    // Date on top
    function date() {
        var todayDate = moment().format("dddd, MMMM Do");
        $("#today").text(todayDate);
    }
    date();

    // Save notes to local storage
    function saveNote() {
        localStorage.setItem("planner", JSON.stringify(dayPlanner));
    }

    function shownNote() {
        dayPlanner.forEach(function(_thisHour) {
            $(`#${_thisHour.id}`).val(_thisHour.note);
        });
    }

    // Sticks local storage stuff into planner
    function startPlanner() {
        var storedDay = JSON.parse(localStorage.getItem("planner"));

        if (storedDay) {
            dayPlanner = storedDay;
        }
        saveNote();
        shownNote();
    }



    // This changes the HTML to style the scheduler, one col for hours, one col for input, and one col for saving
    dayPlanner.forEach(function(thisHour) {
        // Using bootstrap, this will create the row that time cols go into
        var timeRow = $("<form>").attr({
            class: "row",
        });
        $(".container").append(timeRow);

        // Creates the cols for times
        var hourField = $("<div>")
            .text(`${thisHour.hour}${thisHour.amOrPm}`)
            .attr({
                class: "col-md-2 hour",
            });

        // Saves note
        var hourPlan = $("<div>").attr({
            class: "col-md-9 description p-0",
        });
        // Changes color for past and current notes
        var planData = $("<textarea>");
        hourPlan.append(planData);
        planData.attr("id", thisHour.id);
        if (thisHour.Mtime < moment().format("HH")) {
            planData.attr({
                class: "past",
            });
        } else if (thisHour.Mtime === moment().format("HH")) {
            planData.attr({
                class: "present",
            });
        } else if (thisHour.Mtime > moment().format("HH")) {
            planData.attr({
                class: "future",
            });
        }

        // Pretty Save button
        var saveButton = $("<i class='far fa-save fa-lg'></i>");
        var savePlan = $("<button>").attr({
            class: "col-md-1 saveBtn",
        });
        savePlan.append(saveButton);
        timeRow.append(hourField, hourPlan, savePlan);
    });


    startPlanner();

    // saves data to be used in localStorage
    $(".saveBtn").on("click", function(event) {
        event.preventDefault();
        var saveIndex = $(this)
            .siblings(".description")
            .children(".future")
            .attr("id");
        dayPlanner[saveIndex].note = $(this)
            .siblings(".description")
            .children(".future")
            .val();
        saveNote();
        shownNote();
    });
});