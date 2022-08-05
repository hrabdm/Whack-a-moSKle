const holes = document.querySelectorAll('.hole'); // массив всех объектов с классом .hole
const scoreBoard = document.querySelector('.score'); // объект класс очки
const moles = document.querySelectorAll('.mole'); // массив всех объектов с классом .mole
let lastHole; // переменная, где будем хранить последний домик
let timeUp = false; // переменная указывающая состояние игры
let score = 0; // переменная счетчик очков
let gameDuration = 20; // стартовое значение обратного отсчета    // 
let timer; // пока пустая переменная

//MUSIC
audio = document.querySelector("audio")
audio.volume = 0.2;
player = document.querySelector("audio")
sound = "off"; // "on"
soundButton = document.querySelector("#sound img");
soundButton.onclick = function () {
    if (sound == "on") {
        soundButton.src = "img/mute_sound.png"
        sound = "off"
        player.pause();
    } else {
        soundButton.src = "img/sound_on.png"
        sound = "on"
        player.play()
    }
}

function soundClick() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'img/shot.mp3'; // Указываем путь к звуку "клика"
    audio.volume = 0.7;
    audio.autoplay = true; // Автоматически запускаем
}

function randomTime(min, max) { // возвращает случайное целое число из диапазона мин макс
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) { // функция выбор случайного дома
    const idx = Math.floor(Math.random() * holes.length); // генерирует случайный индекс от 0 до количества домов
    const hole = holes[idx]; // выбирает объект случайного дома по индексу
    if (hole === lastHole) { // если выбранный дом совпадает с последним выбранным
        return randomHole(holes); // пробуем снова выбрать дом (запускаем функцию снова)
    }
    lastHole = hole; // если не совпал с предыдущим назначаем выбранный переменной
    return hole; // возвращаем выбранный дом тому, кто вызвал эту функцию
}

function peep() { // фунция всплытие врага
    const time = randomTime(500, 1500); // случайное время всплытия врага
    const hole = randomHole(holes); // случайный выбор дома для появления врага
    hole.classList.add('up'); // добавляем в массив классов выбранного дома класс .up
    setTimeout(() => {
        hole.classList.remove('up'); // удаляем класс up из массива классов выбранного дома через time
        if (!timeUp) peep(); // если время игры не закончилось (timeUp == false) делаем всплытие
    }, time);
}

function start() {
    setTimeout(startGame, 1000);
}

function startGame() { // начало игры
    // удаляем все таймауты
    var max_id;
    max_id = setTimeout(function () {});
    while (max_id--) {
        clearTimeout(max_id);
    }
    scoreBoard.textContent = 0; // обнуление счетчика очков
    timeUp = false; // время игры не закончилось
    score = 0; // обнулить счетчик
    peep();
    gameDuration = 20;
    countdown(); // вызов функции

}

function countdown() { // функция обратного отсчета
    document.getElementById('startBtn').innerHTML = gameDuration;
    gameDuration--; // уменьшаем число на единицу
    if (gameDuration < 0) {
        clearTimeout(timer); // таймер остановится на нуле
        timeUp = true;
        document.getElementById('startBtn').innerHTML = "RESTART";
    } else {
        timer = setTimeout(countdown, 1000);
    }
}

function randSound(min, max) { //возвращает случайное целое число
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function whack(event) {
    /* if проверяет что событие было инициировано
    скриптом, а не пользователем. если так - return, нет попадания */
    if (!event.isTrusted) return; // не false - return


    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = "img/kick_" + randSound(1, 3) + ".mp3"; // Указываем путь к случайному звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
    audio.volume = 0.7;
    score++; // если проверку на читинг прошли - попали - добавить 1
    this.parentNode.classList.remove('up'); // удаление класса up из массива classList классов родителя элемента
    scoreBoard.textContent = "Уничтожено moskalei: " + score; // переопределить значение очков
}

moles.forEach(mole => mole.addEventListener('click', whack));
/* для каждого врага из массива врагов проверяет событие клик
и выполняет функцию whack. forEach - перебор массива в стрелочной функции
element.addEventListener(event, handler, [options]);
event - Имя события, например "click".
handler - Ссылка на функцию - обработчик.*/