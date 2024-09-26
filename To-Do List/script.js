
const inputBox = document.getElementById('input-box');
const listConatiner = document.getElementById('list-container'); 

// If box is empty let user know if not creat a list element and set it to the html equivalent
// add said list element to the html file (does this by setting the value of the textbox to the list element {li})
function AddTask(){
    if(inputBox.value == ''){
        alert("FILL IN THE BOX!!!!!!!!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listConatiner.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listConatiner.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false)

function saveData(){
    localStorage.setItem("data", listConatiner.innerHTML);
}

function showTask(){
    listConatiner.innerHTML = localStorage.getItem("data");
}

showTask()