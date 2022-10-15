/*
use case: to list the things or task that
 we did last week and revise the task to find out 
 that are not of priority so we can foucs on important things  

*/

/*
1. get form data on form submit
2. store the data in a global array 
3. create a display function to display all the data from our array to entry list


*/
let taskList = [];
let badList = [];
const hrPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");
  const obj = {
    task,
    hr,
  };

  const totalAllocatedHrs = totalTaskHours() + totalBadTaskHours();
  if (totalAllocatedHrs + hr > hrPerWeek) {
    return alert("Sorry exceeded the Hours");
  }

  taskList.push(obj);
  console.log(taskList);
  displayTasks();
  totalTaskHours();
};

const displayTasks = () => {
  let str = "";

  taskList.map((item, i) => {
    console.log(item, i);
    str += ` <tr>
                  <th scope="row">${i + 1}</th>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                    <button onclick="deleteTask(${i})" class="btn btn-danger">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button onclick="markAsNotToDo(${i})"class="btn btn-success">
                      <i class="fa-solid fa-right-long"></i>
                    </button>
                  </td>
                </tr>`;
  });
  document.querySelector("#task-list").innerHTML = str;
};
const displayBadTask = () => {
  let str = "";
  badList.map((item, i) => {
    str += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                    <button onclick="markToDo(${i})"class="btn btn-warning">
                      <i class="fa-solid fa-left-long"></i>
                    </button>
                    <button  onclick= "deleteBadTask(${i})" class="btn btn-danger">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>`;
  });

  document.getElementById("bad-task").innerHTML = str;
  totalBadTaskHours();
};

const totalTaskHours = () => {
  const total = taskList.reduce((s, i) => s + i.hr, 0);

  document.getElementById("totalHrs").innerText = total + totalBadTaskHours();
  return total;
};
const totalBadTaskHours = () => {
  const total = badList.reduce((s, i) => s + i.hr, 0);

  document.getElementById("totalBadHr").innerText = total;
  return total;
};

const deleteTask = (i) => {
  if (!window.confirm("Are you sure you want to delete this task")) {
    return;
  }
  taskList = taskList.filter((item, index) => index !== i);

  displayTasks();
  totalTaskHours();
};
const deleteBadTask = (i) => {
  if (!window.confirm("Are you sure you want to delete this task")) {
    return;
  }
  badList = badList.filter((item, index) => index !== i);

  displayBadTask();
  totalBadTaskHours();
  totalTaskHours();
};

const markAsNotToDo = (i) => {
  const itm = taskList.splice(i, 1);
  badList.push(itm[0]);
  console.log(badList);

  displayTasks();
  displayBadTask();
};

const markToDo = (i) => {
  const itm = badList.splice(i, 1);
  taskList.push(itm[0]);
  displayTasks();
  displayBadTask();
};
