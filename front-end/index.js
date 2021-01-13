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

    // Add 7 Days
    let jenisBulan;
    switch(monthNumber) {
        case "Jan":
            jenisBulan = 31;
            break;
        case "Feb":
            jenisBulan = 28 
            break;
        case "Mar":
            jenisBulan = 31 
            break;
        case "Apr":
            jenisBulan = 30 
            break;
        case "May":
            jenisBulan = 31 
            break;
        case "Jun": 
            jenisBulan = 30 
            break;
        case "Jul":
            jenisBulan = 31 
            break;
        case "Aug":
            jenisBulan = 31 
            break;
        case "Sep":
            jenisBulan = 30 
            break;
        case "Oct":
            jenisBulan = 31 
            break;
        case "Nov":
            jenisBulan = 30 
            break;
        case "Dec":
            jenisBulan = 31
            break;
        default:
            jenisBulan = "monthNum typo"           
    }

    let currentDatePlusSeven

    if(parsedDay+7 > jenisBulan){
        currentDatePlusSeven = parsedDay+ 7 - jenisBulan;
        monthNumber = monthNumber + 1;
    } else {
        currentDatePlusSeven = parsedDay +7
    }

    nextWeekReviewObject = new Date(year, monthNumber, currentDatePlusSeven, hour, minute, second);
    nextWeekReviewJSON = nextWeekReviewObject.toString();

    // One Months Review
    currentMonthPlusOne = monthNumber + 1;
    nextMonthReviewObject = new Date(year, currentMonthPlusOne, parsedDay, hour, minute, second);
    nextMonthReviewJSON = nextMonthReviewObject.toString();
    

    // Three Months Review
    currentMonthPlusThree = monthNumber + 3;
    nextThreeMonthReviewObject = new Date(year, currentMonthPlusThree, parsedDay, hour, minute, second);
    nextThreeMonthReviewJSON = nextThreeMonthReviewObject.toString();

    // One Hour Review
    if(hour > 23){
        // Case kalau dia input misal 23.30
        // 23.30 + 01.00 = 24.30 bakal eror
        plusOneHourReviewObject = new Date(year, monthNumber, addOneDay, 1, minute, second); 
        plusOneHourReviewJSON = plusOneHourReviewObject.toString();              
    } else {
        plusOneHour = hour + 1;
        plusOneHourReviewObject = new Date(year, monthNumber, parsedDay, plusOneHour, minute, second); 
        plusOneHourReviewJSON = plusOneHourReviewObject.toString();  
        console.log(plusOneHourReviewJSON)
    }
}

const submitLesson = (e) => {
    e.preventDefault();
    makeDate();
    postToDB(lessonTitle.value, lessonContent.value, addOneDayJSON);
    postToDB(lessonTitle.value, lessonContent.value, plusOneHourReviewJSON);
    postToDB(lessonTitle.value, lessonContent.value, nextWeekReviewJSON);    
    postToDB(lessonTitle.value, lessonContent.value, nextMonthReviewJSON);    
    postToDB(lessonTitle.value, lessonContent.value, nextThreeMonthReviewJSON);    

    lessonContent.value = "";
    lessonTitle.value = "";
}



const postToDB = (title, body, reviewdate) => {
    const data = {title: title, body: body, reviewdate: reviewdate};

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