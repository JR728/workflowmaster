// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// 9am to 5pm
$(function () {
    var startHour = 9;
    var endHour = 17; // Update the endHour to 18 for including 6pm
  
    var currentHour = dayjs().hour();
//coverts the hour  
    for (var hour = startHour; hour <= endHour; hour++) {
      var adjustedHour = (hour % 12) || 12; // Adjust the hour displayed using modulo arithmetic
      var amOrPm = hour >= 12 ? "pm" : "am";  
      var timeBlockId = "hour-" + hour;
// time block section  
      var timeBlock = $("<div>")
        .attr("id", timeBlockId)
        .addClass("row time-block");
// which hour is in each block  
      var hourElement = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(adjustedHour + amOrPm); // Use adjustedHour and amOrPm for displaying the hour
// the type section of the block
      var descriptionElement = $("<textarea>")
        .addClass("col-8 col-md-10 description")
        .attr("rows", "3");
// the save button   
      var saveButton = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .append($("<i>").addClass("fas fa-save").attr("aria-hidden", "true"));
// appending the elements to time block  
      timeBlock.append(hourElement, descriptionElement, saveButton);
      $(".container-fluid").append(timeBlock);
// making the past present and future known      
      if (hour < currentHour) {
        timeBlock.addClass("past");
      } else if (hour === currentHour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }
// saved to local storage      
      var savedEvent = localStorage.getItem(timeBlockId);
      if (savedEvent) {
        descriptionElement.val(savedEvent);
    }
}
//the current date
var currentDate = dayjs().format("dddd, MMMM D, YYYY");
$("#currentDay").text(currentDate);

// Event listener for save button
$(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, eventText);
  });
});

  

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
 // });