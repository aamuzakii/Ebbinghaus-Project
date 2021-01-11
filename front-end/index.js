let addOneDayObject
let addOneDayJSON

const submitButton = document.querySelector(".submit-button");
const lessonContent = document.querySelector(".lesson-content");
const lessonTitle = document.querySelector(".title-input");

const makeDate = (lesson) => {

    // Break Down Current Time
    let nowDate = new Date();
    let stringifiedDate = nowDate.toString();
    let splittedNowDate = stringifiedDate.split(" ");
    
    // Add 1 day
    var parsedDay = parseInt(splittedNowDate[2])
    addOneDay = parsedDay + 1;
    addOneDay = addOneDay.toString()

    // Add 1 day as array
    let dayName, monthName, date, year, time, rest;
    [dayName, monthName, date, year, time, ...rest] = splittedNowDate;
    monthNumber = new Date().getMonth();
    hour = new Date().getHours();
    minute = new Date().getMinutes();
    second = new Date().getSeconds();

    addOneDayObject = new Date(year, monthNumber, addOneDay, hour, minute, second);
    addOneDayJSON = addOneDayObject.toString();
    console.log(addOneDayJSON);
}

const submitLesson = (e) => {
    e.preventDefault();
    makeDate();
    postToDB(lessonContent.value, addOneDayJSON);
    lessonContent.value = "";
    console.log(lessonTitle.value)  
}



const postToDB = (body, reviewdate) => {
    const data = {title:'judul', body: body, reviewdate: reviewdate};

    fetch('http://localhost:3000/addlist', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
};

submitButton.addEventListener("click", submitLesson);