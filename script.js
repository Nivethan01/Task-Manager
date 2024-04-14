const data = [
  {
    S_No: "1",
    Task: "Meeting",
    Description: "Client Meeting",
    Duration: "00:50:43",
  },
  {
    S_No: "2",
    Task: "Project-abc",
    Description: "Developing-xyz",
    Duration: "01:42:02",
  },
  {
    S_No: "3",
    Task: "Personal-Break",
    Description: "-",
    Duration: "00:22:15",
  },
  {
    S_No: "4",
    Task: "Meeting",
    Description: "Daily Scrum",
    Duration: "00:32:28",
  },
];
function createTableRow(sno, task, description, duration, isEven) {
  const table = document.getElementById("dataTable");
  const row = document.createElement("tr");
  row.className = isEven ? "eve" : "odd";
  const snocell = document.createElement("td");
  const taskCell = document.createElement("td");
  const desCell = document.createElement("td");
  const durCell = document.createElement("td");
  snocell.textContent = sno;
  taskCell.textContent = task;
  desCell.textContent = description;
  durCell.textContent = duration;
  row.appendChild(snocell);
  row.appendChild(taskCell);
  row.appendChild(desCell);
  row.appendChild(durCell);
  table.appendChild(row);
}

function populateFilterOptions() {
  const taskFilterSelect = document.getElementById("taskFilter");
  taskFilterSelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "All Tasks";
  taskFilterSelect.appendChild(defaultOption);
  data.forEach((item) => {
    const option = document.createElement("option");
    option.textContent = item.Task;
    taskFilterSelect.appendChild(option);
  });
}
let c = 0;
function filterTableRows(selectedTask) {
  const tableRows = document.querySelectorAll(
    "#dataTable tr:not(:first-child)"
  );
  tableRows.forEach((row) => {
    const taskCell = row.cells[1];
    if (selectedTask === "All Tasks" || taskCell.textContent === selectedTask) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
}

document
  .getElementById("filterForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedTask = document.getElementById("taskFilter").value;
    filterTableRows(selectedTask);
  });

data.forEach((item, index) => {
  createTableRow(
    item.S_No,
    item.Task,
    item.Description,
    item.Duration,
    index % 2 === 0
  );
});

let timer;
let timerRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
  if (!timerRunning) {
    timer = setInterval(updateTimer, 1000);
    timerRunning = true;
  }
}

function stopTimer() {
  clearInterval(timer);
  timerRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  timerRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  displayTimer();
}

function updateTimer() {
  seconds++;

  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  displayTimer();
}

function displayTimer() {
  const formattedTime = `${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}`;
  document.getElementById("timerDisplay").textContent = formattedTime;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

document.getElementById("startTimer").addEventListener("click", startTimer);
document.getElementById("stopTimer").addEventListener("click", stopTimer);
document.getElementById("resetTimer").addEventListener("click", resetTimer);

let i = data.length;
let t = true;
// Define the sno variable outside the event listener function
let sno;

const bt = document.getElementById("cl");
bt.addEventListener("click", () => {
  // Assign a value to sno inside the event listener function
  sno = i + 1;
  const task = document.getElementById("task").value;
  const description = document.getElementById("dec").value;
  
  // Update the duration value with the timer value
  const duration = document.getElementById("timerDisplay").textContent;

  const newTask = {
    S_No: sno,
    Task: task,
    Description: description,
    Duration: duration, // Use the timer value as duration
  };

  data.push(newTask);

  createTableRow(sno, task, description, duration, i % 2 === 0);
  i++;
  t = false;
  if (t == false) {
    populateFilterOptions();
  }
});

if (t == true) {
  populateFilterOptions();
}

// Function to create table row with edit and delete buttons
function createTableRow(sno, task, description, duration, isEven) {
  const table = document.getElementById("dataTable");
  const row = document.createElement("tr");
  row.className = isEven ? "eve" : "odd";

  // Create cells for sno, task, description, duration, edit, and delete buttons
  const snocell = document.createElement("td");
  const taskCell = document.createElement("td");
  const desCell = document.createElement("td");
  const durCell = document.createElement("td");
  const editCell = document.createElement("td");
  const deleteCell = document.createElement("td");

  // Set text content for sno, task, description, and duration cells
  snocell.textContent = sno;
  taskCell.textContent = task;
  desCell.textContent = description;
  durCell.textContent = duration;

  // Create edit and delete buttons
  // Inside the createTableRow function where you create the "Edit" button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    // Find the row to edit
    const rowToEdit = editButton.closest("tr");

    // Get the task data from the row
     sno = rowToEdit.cells[0].textContent;
    const taskCell = rowToEdit.cells[1];
    const descriptionCell = rowToEdit.cells[2];
    const durationCell = rowToEdit.cells[3];

    // Update the form with the task data for editing
    document.getElementById("task").value = taskCell.textContent;
    document.getElementById("dec").value = descriptionCell.textContent;
    document.getElementById("dur").value = durationCell.textContent;

    // Implement save functionality
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      // Update the row with the new data
      taskCell.textContent = document.getElementById("task").value;
      descriptionCell.textContent = document.getElementById("dec").value;
      durationCell.textContent = document.getElementById("dur").value;

      // Remove the save button
      rowToEdit.removeChild(saveButton);
    });

    // Add the save button to the row
    rowToEdit.appendChild(saveButton);

    // Remove the edit button
    rowToEdit.removeChild(editButton);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    // Find the row to delete
    const rowToDelete = deleteButton.closest("tr");

    // Remove the row from the table
    rowToDelete.remove();

    // Implement delete functionality for the task in your data array
    const task = taskCell.textContent;
    console.log("Delete clicked for task: ", task);
    // You can now delete the task from your data array or perform any other necessary operations
  });

  // Append buttons to their respective cells
  editCell.appendChild(editButton);
  deleteCell.appendChild(deleteButton);

  // Append all cells to the row
  row.appendChild(snocell);
  row.appendChild(taskCell);
  row.appendChild(desCell);
  row.appendChild(durCell);
  row.appendChild(editCell);
  row.appendChild(deleteCell);

  // Append the row to the table
  table.appendChild(row);
}
