let form=document.getElementById("form");
let textinput=document.getElementById("textinput");
let dateinput=document.getElementById("dateinput");
let textarea=document.getElementById("textarea");
let msg=document.getElementById("msg");
let tasks=document.getElementById("tasks");
let add=document.getElementById("add");

//click event 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();

});

//form validation with the error message.it is success and failure stage.
let formValidation= ()=>{
    if(textinput.value === ""){
        console.log("failure")
        msg.innerHTML="Task cannot be blank!";

    }
    else{
        console.log("success")
        msg.innerHTML="";
        acceptData();

        add.setAttribute( "data-bs-dismiss" ,"modal");
        add.click();

        (()=>{
            add.setAttribute("data-bs-dismiss" ,""); 
        })()
    }

}

//storing the data collected by the user.
let data=[];

//accepting or collecting the data enterd by the user.
let acceptData= ()=>{
    data.push({
    text:textinput.value,
    date:dateinput.value,
    description:textarea.value,
});

//storing the data into the localstorage.
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

    createTasks();
};

let createTasks = ()=>{
    tasks.innerHTML= ""
    //here x indiviusallly targets the object one by one and y is used to count the index number
    data.map((x,y)=>{
        return(tasks.innerHTML += `
        <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <span class="small text-secondary">${x.date}</span>
                    <p>${x.description}</p>
                    <span class="options">
                        <i onclick="editTask(this)"  data-bs-toggle="modal" data-bs-target="form" class="fas fa-edit"></i>
                        <i onclick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
                    </span>
                </div>
        `
        );
    });

  
    resetForm();
};

let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

};

let editTask =(e)=>{
    let selectedTask = e.parentElement.parentElement;
    
    textinput.value= selectedTask.children[0].innerHTML;
    dateinput.value= selectedTask.children[1].innerHTML;
    textarea.value= selectedTask.children[2].innerHTML;

    deleteTask(e);

};

//code to reset the form into its original form.
let resetForm = ()=>{
    textinput.value= "";
    dateinput.value= "";
    textarea.value= "";
};

//IIFE(Immediately Invoked Function Expression) is used here

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
    console.log(data);
})()