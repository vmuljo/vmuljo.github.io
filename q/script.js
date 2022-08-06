const modal = document.querySelector("#modalForm");
const infoModal = document.querySelector('#info-modal')
const queueModalBlock = document.querySelector("#queue-modal-content");
const infoModalBlock = document.querySelector("#info-modal-content");
const btn = document.querySelector("#btn");
const queueclose = document.querySelector("#queueclose");
const infoclose = document.querySelector("#infoclose");
const list = document.querySelector(".namesList");
const admin = document.querySelector(".admin-enable");
var contents = document.querySelector(".contents");
var queue = [];
var queueList = document.querySelectorAll(".namesList li");
var queueArray = Array.from(queueList); 

const info = document.querySelector('#info-modal-content');
class Person{
    name;
    number;
    status = false;

    constructor(name_, number_){
        this.name = name_;
        this.number = number_;
    }

    getName(){
        return this.name;
    }

    getPersonInfo(){
        var info = '';
        if(this.name !== undefined && this.number !== undefined){
            info = this.name + " (" + this.number + ")";
        }

        return info;
    }
}

// Toggles between guest and admin mode
function adminToggle(){
    contents = document.querySelector('.contents')
    contents.classList.toggle("admin");
    if(contents.classList.contains("admin")){
        const guestoptions = document.querySelectorAll('.guest-option');
        viewGuest();
        queueEntryAttended()
        guestoptions.forEach(guestoption => {
            guestoption.classList.add('admin-option');
            guestoption.classList.remove('guest-option');
            guestoption.parentNode.childNodes[1].style.cursor = "pointer";
            
        });
    }
    else{
        const adminoptions = document.querySelectorAll('.admin-option');
        adminoptions.forEach(adminoption => {
            adminoption.classList.add('guest-option');
            adminoption.classList.remove('admin-option');
            adminoption.parentNode.childNodes[1].style.cursor = "default";
        });
    }
}

// Toggles the modal to add to queue
function modalToggle(modalClass, modalContent){
    modalClass.classList.toggle('modal-active');
    if(modalClass.classList.contains('modal-active')){
        modalContent.style.animation = `animateModal 0.3s`;
        modalClass.style.animation = `modalBackgroundFadeIn 0.3s`;
        modalClass.style.display = 'block';
    }
    else{
        modalContent.style.animation = `animateModalOut 0.3s`;
        modalClass.style.animation = `modalBackgroundFadeOut 0.3s`;
        setTimeout(function(){
            modalClass.style.display = 'none';
        }, 250)
    }
}

function viewGuest(){
    // contents = document.querySelector(".contents");

    var name = document.querySelector('#person');
    var spot = document.querySelector('#index');
    var phone = document.querySelector('#num');
    var status = document.querySelector('#status');

    if(document.querySelector('.contents').classList.contains("admin")){
        queueList = document.querySelectorAll(".queue-entry li");
        queueList.forEach((guest, i) =>{
            guest.onclick = function(){
                console.log(this);
                console.log(queue[i]);
                name.innerHTML = queue.at(i).name;
                spot.innerHTML = i+1;
                phone.innerHTML = queue[i].number;
                if(queue[i].status){
                    status.innerHTML = "Attended to";
                }
                else{status.innerHTML = "Waiting"}
                // status.innerHTML = queue[i].status;
                modalToggle(infoModal, infoModalBlock);
            }
        })
    }
}
viewGuest();

// Removes queue entry on click when in admin mode
function removeQueueEntry(){
    var guestList = document.getElementsByClassName('remove');
    Array.from(guestList).forEach((guest, i) => {
        guest.onclick = function(){
            console.log(i);
            console.log(guestList.length);
            this.parentNode.remove();
            if(guestList.length == 0) makeEmpty();
            queue.splice(i, 1);
        }
    })
}
removeQueueEntry();

function queueEntryAttended(){
    var guestList = document.querySelectorAll('.ready');
    guestList.forEach((guest, i) => {
        guest.onclick = function(){
            console.log(i);
            console.log(guestList.length);
            queue[i].status = true;
            // this.parentNode.remove();
            // if(guestList.length == 0) makeEmpty();
        }
    })
}
queueEntryAttended()

// Function to add text to empty queue and set list as empty
function makeEmpty(){
    list.classList.add("empty");
    list.innerHTML = "No one is in the Queue!";
    console.log("No one is in the Queue!");
}

// When the submit button is clicked, add to queue
document.querySelector("#submitbtn").onclick = function(){
    var name = document.querySelector("#name").value.trim();
    var num = document.querySelector("#pNumber").value.trim();
    var valid = true;

    if(name.length == 0){
        document.querySelector("#name-error").innerHTML = "&#9888; Name cannot be empty.";
        valid = false;
    }
    else{document.querySelector("#name-error").innerHTML =""; valid = true;}

    if(num.length == 0){
        document.querySelector("#num-error").innerHTML = "&#9888; Number cannot be empty.";
        valid = false;
    }
    else{document.querySelector("#num-error").innerHTML =""; valid = true;}

    
    if(valid){
        if(list.classList.contains('empty')){
            list.classList.remove('empty');
            list.innerHTML = "";
        }
        const person = new Person(name, num);
        queue.push(person);
        var latestPushedName = queue.at(-1).name;

        const li = document.createElement('li');
        const deleteSpan =  document.createElement('span');
        const readySpan = document.createElement('span');
        const div_li = document.createElement('div');

        div_li.classList.add('queue-entry');
        deleteSpan.classList.add('guest-option', 'remove');
        readySpan.classList.add('guest-option', 'ready');
        li.style.cursor = "default";
        if(document.querySelector('.contents').classList.contains('admin')){
            deleteSpan.classList.add('admin-option');
            readySpan.classList.add('admin-option');
            deleteSpan.classList.remove('guest-option');
            readySpan.classList.remove('guest-option');
            li.style.cursor = "pointer";
        }

        deleteSpan.innerHTML = "&#10006;";
        readySpan.innerHTML = "&#10004;";
        li.innerHTML = latestPushedName;

        div_li.appendChild(readySpan);
        div_li.appendChild(li);
        div_li.appendChild(deleteSpan);
        list.appendChild(div_li);

        queueList = document.querySelectorAll(".namesList li");
        // queueArray = Array.from(queueList); 
        // console.log(queueArray);
        document.querySelector("#name").value = "";
        document.querySelector("#pNumber").value = "";
        modalToggle(modal, queueModalBlock);
        removeQueueEntry();
        viewGuest();
        queueEntryAttended()
    }

}
// Admin button: Removes first person from queue
document.querySelector('#btn-remove').onclick = () => {
    var cleared = false;
    // console.log(list);
    console.log(queueList);
    if(queueList.length > 0 && !cleared){
        const first = queueArray.shift();
        const firstOut = queue.shift();
        console.log(list);
        list.removeChild(list.children[0]);
        console.log(queueArray);
        queueList = document.querySelectorAll(".namesList li");
        if(queueList.length == 0){
            makeEmpty();
        }
    }
    else{
        makeEmpty();
        alert("No one is in the queue!");
        
        var cleared = true;
    }
    console.log(queueList.length);
}

// Admin button: Clears the queue
document.querySelector('#btn-clear').onclick = () => {
    if(queueList.length > 0){
        list.innerHTML = '';
        queueList = document.querySelectorAll(".namesList li");
        queue = [];
        makeEmpty();
        return;
    }
    console.log("No one is in the Queue!");
    alert("No one is in the queue!");
}

btn.onclick = () => {modalToggle(modal, queueModalBlock);} // When "Add to queue" button is clicked, open modal
// When "x" in modal is clicked, close the modal and clear input fields
queueclose.onclick = function(){
        modalToggle(modal, queueModalBlock);
        document.querySelector("#name-error").innerHTML ="";
        document.querySelector("#num-error").innerHTML ="";
}

infoclose.onclick = () => {
    modalToggle(infoModal, infoModalBlock);
}
// When anywhere outside of the modal window is clicked, close the modal
window.onclick = (e) => {
    if(e.target == modal){
        modalToggle(modal, queueModalBlock);
        document.querySelector("#name-error").innerHTML ="";
        document.querySelector("#num-error").innerHTML ="";
        return;
    }
    if(e.target == infoModal){
        modalToggle(infoModal, infoModalBlock);
    }
}

// When admin (pencil) button is clicked, close modal
admin.onclick = ()=>{
    adminToggle();
}