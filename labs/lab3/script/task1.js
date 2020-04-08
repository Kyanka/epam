//alert("Привіт! Це сторінка передбачень, обери своє майбутнє!!")

const kids = [1,2,3,4,5,6,7,8];
const names = ["Ігорем","Тетяною","Микитою","Ольгою","Олександром","Анастасією","Богданом","Дариною","Романом","Анною","Андрієм","Маргаритою"];
const cities = ["Київ","Нью-Йорк","Лондон","Париж","Москва","Волгоград","Вінниця","Берлін","Мюнхен","Копенгаген","Луцьк","Одеса"];
const professions = ["поліцейський","лікар","кухар", "ветеринар","інженер","програміст","сомельє","бухгалтер","секретар","директор","технік","електрик","історик","психолог"];

function randomFamily() {
    let name = names[Math.floor(Math.random()*names.length)];
    let kid = kids[Math.floor(Math.random()*kids.length)];
    alert(`Ви укладете шлюб з ${name} та у вас буде ${kid} дітей`);
}

function randomCareer() {
    let city = cities[Math.floor(Math.random()*cities.length)];
    let profession = professions[Math.floor(Math.random()*professions.length)];
    alert(`Ви переїдете у місто ${city} на посаду ${profession}`);
}