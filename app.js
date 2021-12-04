let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", e => {
    e.preventDefault();

    let form = e.target.parentElement;
    let text = form.children[0].value;
    let month = form.children[1].value;
    let date = form.children[2].value;
    
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let todoText = document.createElement("p");
    todoText.classList.add("todo-text");
    todoText.innerText = text;
    let todoTime = document.createElement("p");
    todoTime.classList.add("todo-time");
    todoTime.innerText = month + "/" + date;

    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click",e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", ()=>{
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach(item => {
                if(text === item.todoText){
                    myListArray.splice(index,1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
            todoItem.remove();
        })
        todoItem.style.animation = "scaleDown 0.3s forwards";
    })

    todo.appendChild(todoText);
    todo.appendChild(todoTime);
    
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.5s forwards";

    let myTodo = {
        todoText: text,
        todoMonth: month,
        todoDate: date,
    };

        let myList = localStorage.getItem("list");
    if (myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }

    form.children[0].value="";
    form.children[1].value="";
    form.children[2].value="";
    section.appendChild(todo);
})

loadData();

function loadData() {
let myList = localStorage.getItem("list");
if(myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoMonth + "/" + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);
    
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", () =>{
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item,index) => {
                if(item.todoText == text){
                    myListArray.splice(index,1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
        todoItem.remove();
        })
        todoItem.style.animation = "scaleDown 0.3s forwards";
    })

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    section.appendChild(todo);
})
}
}

    