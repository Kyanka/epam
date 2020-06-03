const groups = [
    {
        group: "КП-71",
        quantity: 18 
    },
    {
        group: "КП-72",
        quantity: 16 
    },
    {
        group: "КП-73",
        quantity: 18 
    },
    {
        group: "КП-81",
        quantity: 22 
    },
    {
        group: "КП-82",
        quantity: 20 
    },
    {
        group: "КП-83",
        quantity: 23 
    },
    {
        group: "КП-91",
        quantity: 25 
    },
    {
        group: "КП-92",
        quantity: 24 
    }
]

const tbody = document.getElementById('tbody');
let diagram = document.getElementById('diagram');

function fillTable() {
    for (let group of groups) {
        addGroupToTable(group);
    }
}

function addGroupToTable(group) {
    let tr = document.createElement('tr');
    let tds = [];

    for (let i = 0; i < 3; i++) {
        let td = document.createElement('td');
        if (i == 1) 
            td.setAttribute("id", `${group.group}-id-cell`);
        else if (i == 2) {
            td.setAttribute("contenteditable", "true");
            td.setAttribute("placeholder", "Cell is empty");
            td.addEventListener('input', function(event) {
                const td = event.target;
                const value = parseInt(td.innerText);
                if (isNaN(value) || !value || value < 1 || value > 99) {
                    td.style.color = 'red';
                    td.style.fontWeight = 700;
                    setDiagramToError();
                    return;
                }
                td.style.color = 'black';
                td.style.fontWeight = 100;
                const groupId = document.getElementById(`${group.group}-id-cell`).innerText;
                groups.forEach(element => {
                    if (element.group == groupId)
                    {
                        element.quantity = value;
                        refillDiagram();
                    }
                });
            });
        }
        tds.push(td);
    }

    let showModalBtn = document.createElement('button');
    showModalBtn.classList.add('btn');
    showModalBtn.classList.add('btn-delete');
    showModalBtn.setAttribute('data-toggle', 'modal');
    showModalBtn.setAttribute('data-target', '#deleteModal');
    showModalBtn.addEventListener('click', function() {
        let deleteBtn = document.getElementById('deleteButton');
        deleteBtn.setAttribute('onclick', `removeGroup('${group.group}')`);
    });
    showModalBtn.innerText = 'Видалити';
    tds[0].appendChild(showModalBtn);
    tds[1].innerText = group.group;
    tds[2].innerText = group.quantity;
    tr.setAttribute('id', group.group);
    tbody.appendChild(tr);
    
    let fragment = document.createDocumentFragment();
    
    for (let td of tds) {
        fragment.appendChild(td);
    }
    
    tr.appendChild(fragment);
}

function setDiagramToError() {
    while (diagram.firstChild) {
        diagram.removeChild(diagram.firstChild);
    }

    diagram.classList.add('incorrect-diagram');
    const p = document.createElement('p');
    p.innerText = 'Incorrect values';
    diagram.appendChild(p);
}

function removeGroup(id) {
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].group == id) {
            groups.splice(i, 1);
            break;
        }
    }

    tbody.removeChild(document.getElementById(id));
    refillDiagram();
}

function addGroup() {
    setAllInputsValid();

    let groupInput = document.getElementById('group');
    let quantityInput = document.getElementById('quantity');
    let group = groupInput.value;
    let quantity = quantityInput.value;

    if (!checkNumber(groupInput, group, 1, 99)) return;
    if (!checkNumber(quantityInput, quantity, 1, 99)) return;

    
    let groupElement = {
        group: (group < 10) ? `КП-0${group}` : `КП-${group}`,
        quantity: parseInt(quantity)
    }
    
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].group == groupElement.group) {
            $('#addModal').modal("hide");
            alert('Group with this number is already exist!');
            return;
        }
    }

    groups.push(groupElement);
    addGroupToTable(groupElement);

    $('#addModal').modal("hide");
    refillDiagram();
}

function checkNumber(input, number, min = 0, max = 1000) {
    if (number != NaN && number != null && number != undefined) {
        if (number >= min && number <= max) {
            return true;
        }
    }
    markInvalid(input);
    return false;
}

function setAllInputsValid() {
    let arr = document.getElementsByClassName('is-invalid');

    for (let el of arr) {
        el.classList.remove('is-invalid');
    }
}

function markInvalid(input) {
    input.classList.add('is-invalid');
}

function markValid(input) {
    input.classList.remove('is-invalid');
}

function refillDiagram() {
    diagram.classList.remove('incorrect-diagram')

    while (diagram.firstChild) {
        diagram.removeChild(diagram.firstChild);
    }
    
    let max = getMaxQuantity();
    let min = getMinQuantity();
    let denominator = max - min + 1;
    let size = groups.length;
    for (let i = 0; i < size; i++) {
        addColumn(groups[i], min, denominator);
    }
}

function addColumn(group, min, denominator) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerText = group.group;
    div.appendChild(p);
    div.classList.add('diagram-column');
    div.setAttribute('id', `${group.group}-column`)
    div.style.height = `${(group.quantity-min+1)/denominator *100}%`;
    div.addEventListener('mouseover', function() {
        p.innerText = `${group.quantity}`;
    });
    div.addEventListener('mouseout', function() {
        p.innerText = `${group.group}`;
    });
    diagram.appendChild(div);
}

function getMaxQuantity() {
    let max = 0;
    for (let i = 0; i < groups.length; i++)
    {
        if (groups[i].quantity > max) {
            max = groups[i].quantity;
        }
    }
    return max;
}

function getMinQuantity() {
    let min
    if (groups.length > 0)
        min = groups[0].quantity;
    for (let i = 0; i < groups.length; i++)
    {
        if (groups[i].quantity < min)
            min = groups[i].quantity;
    }
    return min;
}

fillTable();
refillDiagram();