'use strict';

/**
 * Hoang
 * Adds a project to the projArr and renders the UI
 */
function last_i() {
    //By Doing this we will have `holes` in the row id but it will be easier to delete. Saving resources as no complete table re-rendering/mass attribute reseting is needed and does not affect Query Search
    let i = projArr.length - 1;
    while (document.getElementById(`r${i}`) != null) {
        i++;
    }
    return i
}

function addProject() {
    let project = {
        id: document.getElementById('id').value,
        owner: document.getElementById('owner').value,
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        status: document.getElementById('status').value,
        hours: document.getElementById('hours').value,
        rate: document.getElementById('rate').value,
        description: document.getElementById('description').value,
    }
    projArr.push(project);
    addProjectToTable(project);
    clearAllErrorMessages();
    validateAllFields();
    let queryStatus = document.querySelector("#query-status");
    if (queryStatus === null){
        queryStatus = createQueryStatusBar();
    }
    queryStatus.textContent = "Added 1 project to the table";
}
/**
 * Marko and Hoang
 * Adds several projects to the table. Will add all projects the index of which in the projArr is present in the indexArr
 * @param {Array} indexArr
 */
function addManyProjectsToTable(indexArr) {
    let table = document.querySelector("table");
    let tbody = document.querySelector("tbody");
    table.removeChild(tbody);
    tbody = document.createElement("tbody");
    table.appendChild(tbody);
    projArr.forEach((project, i) => {
        let addProject = false;
        indexArr.forEach((index) => {
            if (i == index) {
                addProject = true;
            }
        });
        if (addProject) {
            addProjectToTable(project, false);
        }
    });
}

/**
 * Marko and Hoang
 * Add a project to the table as a row
 * @param {Object} project
 */
function addProjectToTable(project) {
    let id = last_i();
    let tbody = document.querySelector('tbody');
    //projTable.id = 'proj-table-body';
    let row = document.createElement("tr");
    row.id = `r${id}`;
    tbody.appendChild(row);
    let td;
    let i = 0;
    for (let val of Object.values(project)) {
        td = row.insertCell(i);
        td.textContent = val;
        i++;
    }
    addEditAndDeleteIcons(row.insertCell(8), row.insertCell(9), id);
}

/**
 * Marko and Hoand
 * Adds the edit and delete buttons (images) to the row
 * @param {HTMLElement} editCell
 * @param {HTMLElement} deleteCell
 */
function addEditAndDeleteIcons(editCell, deleteCell, id) {
    let editImg = document.createElement('img');
    let trashImg = document.createElement('img');
    editImg.src = '../images/edit.png';
    editImg.setAttribute('id', `e${id}`);
    editImg.setAttribute('class', 'table-button');
    trashImg.src = '../images/trash.png';
    trashImg.setAttribute('id', `t${id}`);
    trashImg.setAttribute('class', 'table-button');
    editImg.onload = () => {
        editCell.appendChild(editImg);
    }
    trashImg.onload = () => {
        deleteCell.appendChild(trashImg);
    }
}
