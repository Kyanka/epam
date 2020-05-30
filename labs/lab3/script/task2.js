function generateTriangle(level) {
    let array = [];
    for (let i = 0; i < level; i++) {
        if (i == 0)
        {
            array.push([1]);
        }
        else
        {
            let prevArr = array[i - 1];
            let newArr = [];
            for (let j = 0; j <= prevArr.length; j++)
            {
                if (j == 0 || j == prevArr.length)
                    newArr.push(1);
                else
                    newArr.push(prevArr[j - 1] + prevArr[j]);
            }
            array.push(newArr);
        }
    }
    return array;
}

function printTriangle(triangle) {
    let string = "";
    let spaces = triangle.length;
    for (let i = 0; i < triangle.length; i++)
    {
        let arrStr = triangle[i].join("   ") + '\n';
        string += arrStr;
        spaces--;
    }
    document.getElementById("triangle").innerHTML = string;
}