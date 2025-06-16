let divsID = NaN;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

function saveState() {
    const columns = {
        content: document.getElementById('content').innerHTML,
        inProgress: document.getElementById('inProgress').innerHTML,
        done: document.getElementById('done').innerHTML
    };
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
}

function loadState() {
    const savedState = localStorage.getItem('kanbanColumns');
    if (savedState) {
        const columns = JSON.parse(savedState);
        document.getElementById('content').innerHTML = columns.content;
        document.getElementById('inProgress').innerHTML = columns.inProgress;
        document.getElementById('done').innerHTML = columns.done;
        
        document.querySelectorAll('.task-div').forEach(div => {
            div.setAttribute('draggable', 'true');
            div.setAttribute('ondragstart', 'dragstartHandler(event)');
        });
    }
}

window.addEventListener('DOMContentLoaded', loadState)

document.addEventListener('click', function(e) {
    if(e.target.tagName === 'DIV' && e.target.id.length === 3) {
        divsID = (e.target.id);
        e.target.style.backgroundColor = 'gray';
    }
});

function dropHandler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const element = document.getElementById(data);
    if (element) {
        ev.target.appendChild(element);
        saveState();
    }
}

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function dragstartHandler(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function showPrompt() {
    const content = document.getElementById('content');
    const input = prompt("Введите задачу:");

    addElement(input, content)                
}

function addElement(inputText, content) {
    if (typeof(Storage) !== "undefined") {
        if (inputText != null) {
            const newDiv = document.createElement('div');
            newDiv.id = characters.charAt(Math.floor(Math.random() * charactersLength)) + 
                        characters.charAt(Math.floor(Math.random() * charactersLength)) + 
                        characters.charAt(Math.floor(Math.random() * charactersLength));
            newDiv.className = "task-div";
            newDiv.draggable = "true";
            newDiv.setAttribute('ondragstart', "dragstartHandler(event)");
            newDiv.textContent = " - " + inputText;
            content.appendChild(newDiv);
            
            saveState();
        }
    }
}

function editElement() {
    const divElement = document.getElementById(divsID);
    if (divElement) {
        const newText = prompt("Введите задачу:", document.getElementById(divsID).textContent);
        if (newText != null) {
            document.getElementById(divsID).textContent = " - " + newText;
            document.getElementById(divsID).style.backgroundColor = 'gainsboro';
            divsID = NaN;
            saveState();
        }
    }
}

function removeElement() {
    const divElement = document.getElementById(divsID);
    if (divElement) {
        divElement.remove();
        divsID = NaN;
        saveState();
    }
}