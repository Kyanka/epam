function startGame() {
    const list = document.getElementById('list');
    const input = document.getElementById("bottles");
    const value = input.value;
    if (parseInt(value))
    {
        list.innerHTML = "";
        for (let i = value; i > 0; i--) {
                let div = document.createElement('div');
                div.innerHTML = `${i} пляшок висіло на стіні, одна упала і залишилось ${i - 1}`
                list.appendChild(div);
        }
        let div = document.createElement('div');
        div.innerHTML = "Жодної!";
        list.appendChild(div);
    }
}