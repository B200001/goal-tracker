function openFeatures() {
    var allElems = document.querySelectorAll('.elem');
    var fullElemPage = document.querySelectorAll('.fullElem');

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {

            // 🔹 Pehle sab hide karo
            fullElemPage.forEach(function (page) {
                page.style.display = 'none';
            });

            // 🔹 Phir clicked wala show karo
            fullElemPage[elem.id].style.display = 'block';
        });
    });

    var backs = document.querySelectorAll('.back');
    backs.forEach((elem) => {
        elem.addEventListener('click', () => {
            console.log("press")
            fullElemPage.forEach(function (page) {
                page.style.display = 'none';
            });
        });
    })

}
openFeatures()


// ------------------TO DO LIST---------------------|

function todolist() {
    let currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }
    else {
        console.log('task list is empty')
    }

    function renderTask() {

        let allTask = document.querySelector('.allTask');
        let sum = ''

        currentTask.forEach(function (elem, idx) {
            sum += `<div class="task">
            <div class="small">
                <h5>${elem.task}</h5>
                
                <h5>${elem.details}</h5>
            </div>
            <span class= "${elem.imp ? 'yes' : 'no'}">${elem.imp ? '!' : ''}</span>
            <button id=${idx}>Mark as completed</button>
          </div>`
        })



        allTask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        let markCompletedBtn = document.querySelectorAll('.task button');

        markCompletedBtn.forEach(function (elem) {
            elem.addEventListener('click', () => {
                currentTask.splice(elem.id, 1);
                console.log(currentTask)
                renderTask()

            })
        })
    }

    renderTask()


    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector('.addTask form input');
    let taskDetailsInput = document.querySelector('.addTask form textarea');
    let check = document.querySelector('.addTask form .mark-imp input')

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // console.log(check.checked, taskDetailsInput.value, taskInput.value);
        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: check.checked
        })

        renderTask()
        taskInput = ''
        taskDetailsInput = ''
        check.checked = false
        // location.reload();

    })



}

todolist();

// ------------------Daily planner---------------------|

function dailyPlanner() {
    let hours = Array.from({ length: 18 }, (elem, idx) => {
        return `${6 + idx}:00 - ${7 + idx}:00`
    })
    s = ''

    let dayPlanner = document.querySelector(".day-planner");
    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    // console.log(dayPlanner)
    hours.forEach((elem, idx) => {
        s += `<div class="day-planner-time">
          <p>${elem}</p>
          <input id = ${idx} type="text"placeholder = "..." value = ${dayPlanData[idx] || ''}>
        </div>`
    })
    dayPlanner.innerHTML = s
    // console.log(s)


    let dayPlannerInput = document.querySelectorAll(".day-planner input")
    // console.log(dayPlannerInput)


    dayPlannerInput.forEach(function (elem, idx) {
        elem.addEventListener('input', () => {
            dayPlanData[elem.id] = elem.value;
            console.log(dayPlanData)
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
        // console.log(elem[elem.id] = JSON.parse(localStorage.getItem('dayPlanData')['id']))

    })


}

dailyPlanner()

// ------------------Quotes---------------------|

async function quotes() {
    await fetch("https://dummyjson.com/quotes/random")
        .then(res => res.json())
        .then(data => {
            document.querySelector("#quote").innerText = data.quote;
        })
        .catch(err => console.error(err));
}
quotes();

// ------------------Pomodoro---------------------|

let totalSeconds = 25 * 60
let timer = document.querySelector(".pomo-timer h1");
let start = document.querySelector(".start-timer");
let reset = document.querySelector(".reset-timer");
let pause = document.querySelector(".pause-timer");
let session = document.querySelector(".session");

let intervalId = null;
let isWorkSession = true;


function upDataTime() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`



}


start.addEventListener('click', () => {
    if (intervalId) {
        return;
    }
    if (isWorkSession) {
        totalSeconds = 25 * 60;
        intervalId = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                upDataTime();
                // clearInterval(intervalId);
                // intervalId = null;
                // return;
            }
            else {
                isWorkSession = false;
                session.innerHTML = "Break Session";
                session.style.color = "white";
                clearInterval(intervalId);
                intervalId = null;
                timer.innerHTML = '05:00';
            }


        }, 1000)
    }
    else {
        totalSeconds = 5 * 60;
        intervalId = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                upDataTime();
                // clearInterval(intervalId);
                // intervalId = null;
                // return;
            }
            else {
                isWorkSession = true;
                session.innerHTML = "Work Session";
                session.style.color = "red";
                clearInterval(intervalId);
                intervalId = null;
                timer.innerHTML = '25:00';
            }
        }, 1000)
    }

})
reset.addEventListener('click', () => {
    clearInterval(intervalId)
    totalSeconds = 25 * 60;
    intervalId = null;
    upDataTime()

})
pause.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
})

upDataTime();



// ------------------Goals---------------------|


// -------------------weather api---------------|


let date = null

let time = document.querySelector(".time");
let temp = document.querySelector(".temp");
let des = document.querySelector(".desc")
let pre = document.querySelector(".preci")
let humid = document.querySelector(".humid")
let wind = document.querySelector(".wind")

function timeDate() {
    date = new Date()

    let hours = date.getHours() % 12 || 12;
    let minutes = date.getMinutes().toString().padStart(2, '0');

    time.innerHTML = `${hours}:${minutes}`;


}
timeDate()
let api_key = "a459af065b924ac29ed92932252312";

async function weatherAPICall() {
    let data;
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a459af065b924ac29ed92932252312&q=Bharatpur&days=1&aqi=no&alerts=no`)

    response = await response.json();
    // .then(data => data = data);
    console.log(response);
    console.log(response.current.condition.text)
    console.log()
    data = response.current.temp_c
    temp.innerHTML = `${data}°C`
    des.innerHTML = response.current.condition.text
    console.log(response.current.humidity)
    humid.innerHTML = `${response.current.humidity}%`;
    wind.innerHTML = `${response.current.wind_kph}kph`;
    // console.assert(data == 20, "data is not 20")
    // return data;
}

async function main() {
    const temp = await weatherAPICall();
    console.log(temp);
}
main()



// ----------------------NAVBAR-------------------------------|

// --pri: #EBE1D1;
    // --pri2: #ebe1d1d1;
    // --sec: #41644A;
    // --tri: #0D4715;
    // --quad:#E9762B;

var rootElement = document.documentElement;
let theme = document.querySelector(".theme");
theme.addEventListener('click', ()=>{
    rootElement.style.setProperty('--pri', '#213448')
    rootElement.style.setProperty('--pri2', '#3B4953')
    rootElement.style.setProperty('--sec', '#547792')
    rootElement.style.setProperty('--tri', '#94B4C1')
    rootElement.style.setProperty('--quad', '#EAE0CF')
    document.querySelector('header').style.color = 'black';
    document.querySelector('.main nav').style.backgroundColor = '#5A9CB5';



    

})
//---------------------Goals Page--------------------------|


let currentGoals = []

// ✅ SAME key used
if (localStorage.getItem('currentGoals')) {
    currentGoals = JSON.parse(localStorage.getItem('currentGoals'))
}

let form2 = document.querySelector('#goals')

form2.addEventListener('submit', (e) => {
    e.preventDefault()

    let goal = document.querySelector("#inputGoals")
    let impGoal = document.querySelector("#check")

    currentGoals.push({
        goal: goal.value,
        goalImp: impGoal.checked
    })
    


    localStorage.setItem('currentGoals', JSON.stringify(currentGoals))
    renderGoal()
    goal.value = ''
    impGoal.checked = false
    // location.reload()
})

function renderGoal() {
    let allGoals = document.querySelector('.allGoals')
    let sum = ''
    let l = 0

    currentGoals.forEach((elem, idx) => {
        l += 1;
        sum += `
        <div class="goals">
            <h1>${elem.goal}</h1>
            <span class=${elem.goalImp ? 'yes': 'no'}>${elem.goalImp ? '!' : ''}</span>
            <button data-id="${idx}">Mark as completed</button>
        </div>`
    })

    allGoals.innerHTML = sum
    let len = document.querySelector(".len");
    len.innerHTML = l;

    let markImp = document.querySelectorAll(".goals button")
    markImp.forEach(btn => {
        btn.addEventListener('click', () => {
            currentGoals.splice(btn.dataset.id, 1)
            localStorage.setItem('currentGoals', JSON.stringify(currentGoals))
            renderGoal()
        })
    })
}

// ✅ Render stored data on reload
renderGoal()
