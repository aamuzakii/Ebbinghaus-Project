// let todaysReview = []


// for(let i=0; i< localStorage.length; i++){
//     var arrayFromLS = localStorage.key(i).split(" ");
//     console.log(arrayFromLS);
//     [dayName, monthName, tanggal, year, time, ...rest] = arrayFromLS;
//     let arrayFromLS2 = time.split(":")
//     let jam, menit, detik;
//     [jam, menit, detik] = arrayFromLS2;

//     let monthNum;
//     switch(monthName) {
//         case "Jan":
//             monthNum = 0
//             break;
//         case "Feb":
//             monthNum = 1 
//             break;
//         case "Mar":
//             monthNum = 2 
//             break;
//         case "Apr":
//             monthNum = 3 
//             break;
//         case "May":
//             monthNum = 4 
//             break;
//         case "Jun": 
//             monthNum = 5 
//             break;
//         case "Jul":
//             monthNum = 6 
//             break;
//         case "Aug":
//             monthNum = 7 
//             break;
//         case "Sep":
//             monthNum = 8 
//             break;
//         case "Oct":
//             monthNum = 9 
//             break;
//         case "Nov":
//             monthNum = 10 
//             break;
//         case "Dec":
//             monthNum = 11
//             break;
//         default:
//             monthNum = "monthNum typo"            // code block
//     }


//     let dateObj = new Date(year, monthNum, tanggal, jam, menit, detik)
//     let parsedDateObj = dateObj.getTime()
    
//     let now = new Date();
//     let parsedNow = now.getTime();



//     let selisih = parsedDateObj - parsedNow;
//     console.log(selisih) 

//     if(selisih < 0){
//         var pelajaranYangHarusReview = localStorage.getItem(localStorage.key(i));        
//         todaysReview.push(pelajaranYangHarusReview);
//         console.log(todaysReview)
//     } else {
//         // console.log("diatas ini blm harus review")
//     }


// }






const todayReviewList = document.querySelector(".today-review-list");


// function showList() {
//     todaysReview.forEach(function(todo){
//         const newLi = document.createElement("li");  
//         newLi.classList.add("list-group-item");
//         newLi.innerText = todo;
//         todayReviewList.appendChild(newLi);
//     })   
// }



const getDB = (response) => {
    fetch("http://localhost:3000/reviewlist") 
        
    // Converting received data to JSON 
    .then(response => response.json()) 
    .then(json => { 
        json.forEach(function(element){
            let id, title, body, reviewdate;
            ({ id, title, body, reviewdate } = element);
            const newLi = document.createElement("li");  
            newLi.classList.add("list-group-item");
            newLi.innerText = title;
            todayReviewList.appendChild(newLi);
        })
    }); 

};


document.addEventListener("DOMContentLoaded", getDB)
