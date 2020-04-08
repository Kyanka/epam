const array = [
    {value: 100, type: "USD"},
    {value: 215, type: "EUR"},
    {value: 7, type: "EUR"},
    {value: 99, type: "USD"},
    {value: 354, type: "USD"},
    {value: 12, type: "EUR"},
    {value: 77, type: "USD"}
];

function fillTable(arr, id) {
    let starter = document.getElementById(id);
    for (let element of arr)
    {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.innerText = element.value;
        let td2 = document.createElement('td');
        td2.innerText = element.type;
        tr.appendChild(td1);
        tr.appendChild(td2);
        starter.appendChild(tr);
    }
}

function findSum(type,limit,arr) {
    let sum = 0;
    for (let element of arr)
    {
        if(element.type == type && element.value < limit)
        sum+=element.value;
    }
    document.getElementById('result').innerText = 'Sum of all ' + type + `'s that less then ${limit} is ${sum}`;
    return sum;
}

function createNewArray(arr, type, multiplicator = 1) {
    let newArr = [];
    console.log(multiplicator)
    for (let element of arr)
    {
        if (element.type == type)
        {
            let newElement = element;
            newElement.value *= multiplicator;
            newArr.push(newElement);
        }
    }
    return newArr;
}

findSum('USD', 100, array);
fillTable(array, 'starter');
fillTable(createNewArray(array, 'EUR', 2), 'final');