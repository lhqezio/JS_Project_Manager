'use strict';

/**
 * Hoang
 * Validates the field depending on what type it is
 * @param {HTMLElement} ev
 */
function validateRouter(ev) {
    let elem = ev.target;
    let id = elem.id;
    validateSwitch(id, elem);
}

/**
 * Hoang
 * Switch to Validates the project description field to match the regex pattern
 * @param {HTMLElement} elem
 * @param {String} id
 * @param {boolean} editingTable
 */
function validateSwitch(id, elem, editingTable = false) {
    switch (id) {
        case 'id':
            validateProjectId(elem, `id`, editingTable);
            break;
        case 'owner':
            validateOwner(elem, `owner`, editingTable);
            break;
        case 'title':
            validateTitle(elem, `title`, editingTable);
            break;
        case 'category':
            validateCategory(elem, `category`, editingTable);
            break;
        case 'hours':
            validateHours(elem, `hours`, editingTable);
            break;
        case 'rate':
            validateRate(elem, `rate`, editingTable);
            break;
        case 'status':
            validateStatus(elem, `status`, editingTable);
            break;
        case 'description':
            validateDescription(elem, `description`, editingTable);
            break;
    }
}

/**
 * Hoang
 * Get tbody element
 * @returns {HTMLElement} tbody
 */
function getTbody() {
    return document.querySelector('tbody');
}


/**
 * Marko
 * Renders the error message UI
 * @param {HTMLElement} event
 */
function showErrorMessageIfInvalid(event) {
    let id = event.id;
    let errorMsg = document.getElementById(id + "-error");
    if (fieldValid[`${id}`] && errorMsg !== null) {
        event.parentElement.parentElement.removeChild(errorMsg);
    } else if (!fieldValid[`${id}`] && errorMsg === null) {
        errorMsg = document.createElement("div");
        errorMsg.classList += "error-message";
        errorMsg.setAttribute("id", id + "-error");
        if (event.tagName.toLowerCase() === "input" || event.tagName.toLowerCase() === "textarea") {
            errorMsg.textContent = "Wrong format for project " + id;
        } else if (event.tagName.toLowerCase() === "select") {
            errorMsg.textContent = "You must select a project " + id;
        }
        event.parentElement.parentElement.insertBefore(errorMsg, event.parentElement);
    }
    let image = document.getElementById(id + "-img");
    if (image === null) {
        image = document.createElement("img");
        event.parentElement.appendChild(image);
        image.setAttribute("id", `${id}-img`);
    }
    image.setAttribute("src", fieldValid[`${id}`] ? "../images/valid.png" : "../images/invalid.png");
}

/**
 * Marko and Hoang
 * Validates the project id field to match the regex pattern
 * @param {HTMLElement} event
 * @param {String} id
 * @param {boolean} editingTable
 * @returns
 */
function validateProjectId(event, id = event.id, editingTable = false) {
    let value = event.value;
    const PATTERN = /^[A-Za-z]([a-zA-Z0-9-_$]){2,9}$/;
    fieldValid[`${id}`] = PATTERN.test(value) && PrimaryKeyVerification(value);
    if (!editingTable) showErrorMessageIfInvalid(event);
    buttonEnb();
    return fieldValid[`${id}`];
}

/**
 * Hoang
 */
function PrimaryKeyVerification(value) {
    let id = value;
    let tbody = getTbody();
    let rows = tbody.querySelectorAll("tr");
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let cells = row.querySelectorAll("td");
        let cell = cells[0];
        let cellId = cell.textContent;
        if (cellId === id) {
            return false;
        }
    }
    return true;
}

/**
 * Marko and Hoang
 * Validates the project owner field to match the regex pattern
 * @param {HTMLElement} event
 * @param {String} id
 * @param {boolean} editingTable
 * @returns
 */
function validateOwner(event, id = event.id, editingTable = false) {
    let value = event.value;
    const PATTERN = /^[A-Za-z]([a-zA-Z0-9-]){2,9}$/;
    fieldValid[`${id}`] = PATTERN.test(value);
    if (!editingTable) showErrorMessageIfInvalid(event);
    buttonEnb();
    return fieldValid[`${id}`];
}

/**
 * Marko and Hoang
 * Validates the project title field to match the regex pattern
 * @param {HTMLElement} event
 * @param {String} id
 * @param {boolean} editingTable
 * @returns
 */
function validateTitle(event, id = event.id, editingTable = false) {
    let value = event.value;
    const PATTERN = /^[A-Za-z]{3,25}$/;
    fieldValid[`${id}`] = PATTERN.test(value);
    if (!editingTable) showErrorMessageIfInvalid(event);
    buttonEnb();
    return fieldValid[`${id}`];
}

/**
 * Marko and Hoang
 * Validates the project category field to match the regex pattern
 * @param {HTMLElement} event
 * @param {String} id
 * @param {boolean} editingTable
 * @returns
 */
function validateCategory(event, id = event.id, editingTable = false) {
    let value = event.value;
    fieldValid[`${id}`] = value !== "null";
    if (!editingTable) showErrorMessageIfInvalid(event);
    buttonEnb();
    return fieldValid[`${id}`];
}

/**
 * Marko and Hoang
 * Validates the project hours field to match the regex pattern
 * @param {HTMLElement} event
 * @param {String} id
 * @param {boolean} editingTable
 * @returns
 */
function validateHours(event, id = event.id, editingTable = false) {
    let value = event.value;
    const PATTERN = /^[0-9]{1,3}$/;
    fieldValid[`${id}`] = PATTERN.test(value);
    if (!editingTable) showErrorMessageIfInvalid(event);
    buttonEnb();
    return fieldValid[`${id}`];
}

/**
 * Marko and Hoang
 * Validates the project rate field to match the regex pattern
 * @param {HTMLElement} event
 * @param {String} id
 * @param {boolean} editingTable
 * @returns
 */
function validateRate(event, id = event.id, editingTable = false) {
    let value = event.value;
    const PATTERN = /^[0-9]{1,3}$/;
    fieldValid[`${id}`] = PATTERN.test(value);
    if (!editingTable) showErrorMessageIfInvalid(event);
    buttonEnb();
    return fieldValid[`${id}`];
}

/**
 * Marko and Hoang
 * Validates the project description field to match the regex pattern
 * @param {HTMLElement} event
 * @param {String} id
 * @param {boolean} editingTable
 * @returns
 */
function validateDescription(event, id = event.id, editingTable = false) {
    let value = event.value;
    const PATTERN = /^[A-Za-z][A-Za-z ]{2,24}$/;
    fieldValid[`${id}`] = PATTERN.test(value);
    if (!editingTable) showErrorMessageIfInvalid(event);
    buttonEnb();
    return fieldValid[`${id}`];
}

/**
 * Marko and Hoang
 * Validates the project status field to match the regex pattern
 * @param {HTMLElement} event
 * @param {String} id
 * @param {boolean} editingTable
 * @returns
 */
function validateStatus(event, id = event.id, editingTable = false) {
    let value = event.value;
    fieldValid[`${id}`] = value !== "null";
    if (!editingTable) showErrorMessageIfInvalid(event);
    buttonEnb();
    return fieldValid[`${id}`];
}

/**
 * Hoang
 * Enables the add button depending on whether all the fields are valid
 */
function buttonEnb() {
    let button = document.getElementById('submit');
    let valid = true;
    for (let key in fieldValid) {
        //console.log(`${fieldValid[key]} - ${key}`);
        if (fieldValid[key] === false) {
            valid = false;
            break;
        }
    }
    button.disabled = !valid;
}

/**
 * Marko
 * Clears all the error messages displayed on the screen. Used in combination with reset all fields
 */
function clearAllErrorMessages() {
    let errorMessages = document.querySelectorAll(".error-message");
    for (let error of errorMessages) {
        error.parentElement.removeChild(error);
    }

    let images = document.querySelectorAll("#input-section img");
    for (let image of images) {
        image.parentElement.removeChild(image);
    }
    disableButton();
}

/**
 * Marko
 * Validates all the fields if the have content inside them
 */
function validateAllFields() {
    let id = document.getElementById("id");
    let owner = document.getElementById("owner");
    let title = document.getElementById("title");
    let category = document.getElementById("category");
    let hours = document.getElementById("hours");
    let rate = document.getElementById("rate");
    let status = document.getElementById("status");
    let description = document.getElementById("description");

    if (id.value !== "") validateProjectId(id);
    if (owner.value !== "") validateOwner(owner);
    if (title.value !== "") validateTitle(title);
    if (category.value !== "null") validateCategory(category);
    if (hours.value !== "") validateHours(hours);
    if (rate.value !== "") validateRate(rate);
    if (status.value !== "null") validateStatus(status);
    if (description.value !== "") validateDescription(description);
}

/**
 * Hoang
 * Sets all keys of fieldValid object to false
 */
function resetAllFields() {
    for (let key in fieldValid) {
        fieldValid[key] = false;
    }
}

/**
 * Hoang
 * clears all input fields and error messages when add button is clicked
 */
function clearFields() {
    let inputs = document.querySelectorAll('div.input-container input, div.input-container select, div.input-container textarea');
    for (let input of inputs) {
        if (input.tagName.toLowerCase() === "select") {
            input.value = "null";
        } else {
            input.value = null;
        }
    }
    clearAllErrorMessages();
}

/**
 * Hoang
 * Disables the add button
 */
function disableButton() {
    let button = document.getElementById('submit');
    button.disabled = true;
}

/**
 * Hoang
 * Edits the row (project) in the tables
 * @param {String} id
 */
function editProject(id) {
    id = Number(id.substring(1));
    console.log(id);
    let row = document.createElement("tr");
    row.setAttribute("id", `r${id}`);
    let oldRow = document.getElementById(`r${id}`);
    tempRow[id] = oldRow.cloneNode(true);
    oldRow.replaceWith(row);
    let cell;
    let input;
    let i = 0;
    console.log(id);
    for (const [key, value] of Object.entries(projArr[getMatchedIndexFromRow(oldRow)])) {
        cell = row.insertCell(i);
        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", `ed${key}-${id}`);
        input.setAttribute("value", String(value));
        if (key === "id") {
            input.setAttribute("disabled", "true");
        }
        cell.appendChild(input);
        i++;
    }
    addSaveAndCancelIcons(row.insertCell(8), row.insertCell(9), id);

}

function getMatchedIndexFromRow(row) {
    let value = row.querySelectorAll("td")[0].textContent;
    for (const [index, project] of projArr.entries()) {
        if (project.id === value) {
            return index;
        }
    }

}

/**
 * Hoang
 * Adds the save and cancel icons to the table
 * @param {HTMLElement} saveCell
 * @param {HTMLElement} cancelCell
 * @param {Number} id
 */
function addSaveAndCancelIcons(saveCell, cancelCell, id) {
    let saveImage = document.createElement("img");
    let cancelImage = document.createElement("img");
    cancelImage.setAttribute("src", "../images/cancel.png");
    cancelImage.setAttribute("id", `c${id}`);
    cancelImage.setAttribute(`class`, "table-button");
    saveImage.setAttribute("src", "../images/save.png");
    saveImage.setAttribute("id", `s${id}`);
    saveImage.setAttribute(`class`, "table-button");
    saveImage.onload = () => {
        saveCell.appendChild(saveImage);
    }
    cancelImage.onload = () => {
        cancelCell.appendChild(cancelImage);
    }
}

/**
 * Hoang
 * Cancels the edit and cancels any changes made to the row if it wasn't saved
 * @param {String} id
 */
function cancelEdit(id) {
    let i = Number(id.substring(1));
    let row = tempRow[i];
    let oldRow = document.getElementById(`r${i}`);
    getTbody().replaceChild(row, oldRow);
}

/**
 * Hoang
 * Saves all changes made to a row if they are valid
 * @param {String} id
 */
function saveEdit(id) {
    let i = Number(id.substring(1));
    let valid = editFieldValidation(i);
    if (valid) {
        let project = {};
        for (const [key, value] of Object.entries(fieldValid)) {
            project[key] = document.getElementById(`ed${key}-${i}`).value;
        }
        projArr.splice(getMatchedIndexFromRow(tempRow[i]), 1, project);
        let row = document.createElement("tr");
        row.setAttribute("id", `r${i}`);
        let oldRow = document.getElementById(`r${i}`);
        oldRow.replaceWith(row);
        let cell;
        let j = 0;
        for (const [key, value] of Object.entries(project)) {
            cell = row.insertCell(j);
            cell.innerHTML = String(value);
            j++;
        }
        addEditAndDeleteIcons(row.insertCell(8), row.insertCell(9), i);
    } else {
        alert("Invalid data entered,not saved");
        resetAllFields();
    }
}

/**
 * Hoang
 * Validates all the fields when editing a row
 * @param {Number} id
 * @returns {Boolean}
 */
function editFieldValidation(id) {
    resetAllFields();
    for (const [key, value] of Object.entries(fieldValid)) {
        validateSwitch(key, document.getElementById(`ed${key}-${id}`), true);
    }
    let valid = true;
    for (let key in fieldValid) {
        if (fieldValid[key] === false) {
            valid = false;
            break;
        }
    }
    return valid;
}

/**
 * Hoang
 * Deletes a row of the table
 * @param {String} id
 */
 function deleteProject(id) {
    let projId = id.substring(1);
    let elem = document.querySelector(`#r${projId}`)
    let arrayIndex = getMatchedIndexFromRow(elem)
    if (window.confirm("Are you sure you want to delete this project?")) {
        projArr.splice(arrayIndex, 1);
        getTbody().removeChild(elem);
    }
}

/**
 * Marko
 * Search feature that looks through every cell value in the table to match the entered keyword
 */
function searchByKeyword() {
    let keyWord = document.getElementById("query").value;
    let queryStatus = document.querySelector("#query-status");
    let outputSection = document.querySelector("#output-section");
    let tableParent = document.querySelector("#table-parent");
    let indexArr = [];
    if (keyWord === "") {
        if (queryStatus !== null) {
            outputSection.removeChild(queryStatus);
        }
        addManyProjectsToTable(getIndexArrFromProjArr(projArr));
    } else {
        projArr.filter((obj, i) => {
            for (let value of Object.values(obj)) {
                if (String(value) === keyWord) {
                    indexArr.push(+i);
                    break;
                }
            }
        });

        if (queryStatus === null) {
            queryStatus = document.createElement("div");
            queryStatus.setAttribute("id", "query-status");
        }
        outputSection.insertBefore(queryStatus, tableParent);
        queryStatus.textContent = `Found ${indexArr.length} projects for the keyword "${keyWord}"`;
        addManyProjectsToTable(indexArr);
    }
}

/**
 * Marko
 * checks if the index is inside the array of indexes
 * @param {Number} i
 * @param {Array} arr
 * @returns {boolean} true if the index is inside the array, false otherwise
 */
function indexInArr(i, arr) {
    for (let j in arr) {
        if (i === arr[j]) {
            return true;
        }
    }
    return false;
}

/**
 * Marko
 * Gets the indexes of all projects from the projArr
 * @param {Array} projArr
 * @returns {Array}
 */
function getIndexArrFromProjArr(projArr) {
    let indexArr = [];
    for (let i in projArr) {
        indexArr.push(+i);
    }
    return indexArr;
}

// name of projArr in local storage
let projArrInStorageName = "projects";

/**
 * Marko
 * Saves all project in projArr to local storage, overwriting all projects previously stored
 */
function saveAllProjects() {
    
    let queryStatus = document.querySelector("#query-status");
    if (queryStatus === null) {
        queryStatus = createQueryStatusBar();
    }
    if (projArr.length == 0) {
        queryStatus.textContent = "There are no projects to save";
    } else if (window.confirm("Are you sure you want to save these projects? Projects that are already in storage will be overwritten")) {
        localStorage.setItem(projArrInStorageName, JSON.stringify(projArr));
        queryStatus.textContent = projArr.length == 1 ? " 1 project was saved" : projArr.length + " projects were saved";
    }
}

/**
 * Marko
 * clears all projects from localStorage
 */
function clearStorage() {
    let queryStatus = document.querySelector("#query-status");
    if (queryStatus === null) {
        queryStatus = createQueryStatusBar();
    }
    if (localStorage.getItem(projArrInStorageName) === null){
        queryStatus.textContent = "There are no projects in local storage";
    }
    else if (window.confirm("Are you sure you want to delete all projects in storage?")) {
        localStorage.removeItem(projArrInStorageName);
        queryStatus.textContent = "All projects were cleared from local storage";
    }
}

/**
 * Marko
 * Saves all project in projArr to local storage, without overwriting all projects previously stored
 */
function appendAllProjects() {
    let queryStatus = document.querySelector("#query-status");
    if (queryStatus === null) {
        queryStatus = createQueryStatusBar();
    }
    if (projArr.length == 0) {
        queryStatus.textContent = "There are no projects to append";
    } else if (localStorage.getItem(projArrInStorageName) === null) {
        localStorage.setItem(projArrInStorageName, JSON.stringify(projArr)); 
        queryStatus.textContent = projArr.length == 1 ? " 1 project was saved" : projArr.length + " projects were saved";   
    } else {
        let projectsInStorage = JSON.parse(localStorage.getItem(projArrInStorageName));
        projArr.forEach((proj) => {
            projectsInStorage.push(proj);
        });
        localStorage.setItem(projArrInStorageName, JSON.stringify(projectsInStorage))
        queryStatus.textContent = projArr.length == 1 ? " 1 project was saved" : projArr.length + " projects were saved";   
    }   
}

/**
 * Marko
 * Loads all projects from localStorage and renders them in the table
 */
function loadAllProjects() {
    let queryStatus = document.querySelector("#query-status");
    if (queryStatus === null) {
        queryStatus = createQueryStatusBar();
    }
    if (localStorage.getItem(projArrInStorageName) === null) {
        queryStatus.textContent = "There are no projects to load";
    } else {
        let projects = JSON.parse(localStorage.getItem(projArrInStorageName));
        projArr = projects;
        addManyProjectsToTable(getIndexArrFromProjArr(projArr));
        queryStatus.textContent = projArr.length == 1 ? " 1 project was loaded" : projArr.length + " projects were loaded";        
    }
}

/**
 * Marko
 * Sorts the columns by the content inside the clicked column cells
 * @param {HTMLElement} event
 */
function sortByColumn(event) {
    event.preventDefault();
    // maybe use event.target.childNodes
    let ths = document.querySelectorAll("th");
    let i = 0;
    for (; i < ths.length - 2; i++) {
        if (event.target === ths[i]) {
            break;
        }
    }
    projArr.sort((obj1, obj2) => {
        let obj1Field = obj1[Object.keys(obj1)[i]];
        let obj2Field = obj2[Object.keys(obj2)[i]];
        return obj1Field > obj2Field ? 1 : obj1Field < obj2Field ? -1 : 0;
    });
    addManyProjectsToTable(getIndexArrFromProjArr(projArr));
}

function createQueryStatusBar(){
    let queryStatus = document.createElement("div");
    queryStatus.setAttribute("id", "query-status");
    let outputSection = document.querySelector("#output-section");
    let tableParent = document.querySelector("#table-parent");
    outputSection.insertBefore(queryStatus, tableParent);
    return queryStatus;
}