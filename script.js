// DOM Elements
let body = document.querySelector('body');
let addwind = document.querySelector('.addwind');
let sidebar = document.querySelector('.secondry-frame');
let primaryfr = document.querySelector('.principle');
let searchBtn1 = document.querySelector('.search1');
let searchwin = document.querySelector('.searchwind');
let cover = document.querySelector('.cover');
let wel = document.querySelector('.wl');
let backbtn = document.querySelector('.back');
let listofjournalHtml = document.querySelector('.sec-lis-2');
let journal = document.querySelector('.journal');
let topList = document.querySelector('.list')
// State Variables
let blurApplied = false;
let windowshowed = false;
let searchwindis = false;
let coverpic = true;
let history = ['homepage'];
let homepage = primaryfr.innerHTML;
let journalId = localStorage.getItem('ID');
let listofjournals = JSON.parse(localStorage.getItem('list')) || [];
let localJournal;
let newjournal;
let newjour;
let removeBtn;

// Initialize Journals

function render() {
    listofjournalHtml.innerHTML = ''; // Clear the existing list

    if (listofjournals.length > 0) {
        for (let i = 0; i < listofjournals.length; i++) {
            let element = listofjournals[i];
            if (element.journalName == '') {
                element.journalName = 'Journal title';
            }

            listofjournalHtml.innerHTML += `
                <div class='journalnameHtml'>
                    <button class='localJournal' id=${i}>${element.journalName}</button>
                    <button class='addm'></button>
                    <button class='delete' id=${i}></button>
                    <button class='more' id=${i}><buttton> 
                </div>
            `;
           /* let completeJournal=document.querySelectorAll('.journalnameHtml').forEach((element)=>{
                element.addEventListener('click',()=>{
                    element.innerHTML=`
                    <button class='localJournal' id=${i}>${element.journalName}</button>
                    <button class='delete' id=${i}>delete</button>
                    <button class='addm'>new</button>
                    <p>date = ${element.journalDate}
                    `
                })
            })*/
        }
    }

    localJournal = document.querySelectorAll('.localJournal');
    localJournal.forEach((element) => {
        element.addEventListener('click', () => {
            history.push('newjournal');
            newjournalacc(element);
            
            returning(newjournal);
        });
    });

    removeBtn = document.querySelectorAll('.delete');
    removeBtn.forEach((element) => {
        element.addEventListener('click', () => {
            listofjournals.splice(element.id, 1);
            localStorage.setItem('list', JSON.stringify(listofjournals));
            render(); // Re-render the list
        });
    });
    if(listofjournals.length!==0){
       newjour = document.querySelectorAll('.addm');
        newjour.forEach((element) => {
        element.addEventListener('click', addNewJournal);
        }); 
    }else{
        newjour = document.querySelector('.add');
        newjour.addEventListener('click', ()=>{
            addNewJournal()
        }
        )
    }

}

render();

function newjournalacc(journalElement) {
    cover.classList.add('coverfade');
    wel.style.display = 'none';
    coverpic = false;
    journal.style.display = 'block';
    const journalID = journalElement.id;

    if (listofjournals.length > 0) {
        journal.innerHTML = `
            <div class="thejournal" id="${journalID}">
                <div class='information'>
                    <input type="date" class='journalDate' id="${journalID}" value="${listofjournals[journalID].journalDate}">
                    <input type="time" class='journalTime' id="${journalID}" value="${listofjournals[journalID].journalTime}">
                </div>
                <input type='text' class='journalTitle' value='${listofjournals[journalID].journalName}'>
                <input type='text' class='journalinput' id="myTextarea" rows="4" cols="50" placeholder='start writing here' value='${listofjournals[journalID].journal}'>
            </div>
        `;
    } else {
        journal.innerHTML = `
            <div class="thejournal" id="${journalID}">
                <div class='information'>
                    <input type="date" class='journalDate' id="${journalID}"  value="${listofjournals[journalID].journalDate}">
                    <input type="time" class='journalTime' id="${journalID}"  value="${listofjournals[journalID].journalTime}">
                </div>
                <input type='text' class='journalTitle' value='${journalElement.journalName}'>
                <input type='text' class='journalinput' placeholder='start writing here'>
            </div>
        `;
    }

    let journalTitleHtml = document.querySelector('.journalTitle');
    journalTitleHtml.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            listofjournals[journalID].journalName = listofjournals[journalID].journalName.slice(0, -1);
        } else if (event.key.length === 1) {
            listofjournals[journalID].journalName += event.key;
        }

        journalTitleHtml.value = listofjournals[journalID].journalName;

        if (listofjournals[journalID].journalName.length < 40) {
            localStorage.setItem('list', JSON.stringify(listofjournals));
        }
        journalElement.innerHTML = listofjournals[journalID].journalName;
        if (journalElement.innerHTML == '') {
            journalElement.innerHTML = 'Journal title';
        }
    
        event.preventDefault();
    });
    let journalText = document.querySelector('.journalinput')
    journalText.addEventListener('keydown',(event)=>{
        if (event.key === 'Backspace') {
            listofjournals[journalID].journal= listofjournals[journalID].journalName.slice(0, -1);
        } else if (event.key.length === 1) {
            listofjournals[journalID].journal += event.key;
        }
        
        localStorage.setItem('list', JSON.stringify(listofjournals));
    })
    let journalDateHtml=document.querySelector('.journalDate')
    journalDateHtml.addEventListener('input',()=>{
        listofjournals[journalID].journalDate = journalDateHtml.value
        
        console.log(journalDateHtml.value)
        localStorage.setItem('list', JSON.stringify(listofjournals));
    })
    let journalTimeHtml=document.querySelector('.journalTime')
    journalTimeHtml.addEventListener('input',()=>{
        listofjournals[journalID].journalTime = journalTimeHtml.value
        console.log(listofjournals[journalID].journalTime)
        localStorage.setItem('list', JSON.stringify(listofjournals));
    })
}

function addNewJournal() {
    newjournal = {journal:'',journalDate: undefined, journalTime: undefined, journalName: "New journal", id: listofjournals.length };
    listofjournals.push(newjournal);
    localStorage.setItem('list', JSON.stringify(listofjournals));
    render(); // Re-render the list
}

function returning(newjournal) {
    backbtn.addEventListener('click', () => {
        journal.style.display = 'none';
        cover.classList.remove('coverfade');
        history.pop('newjournal');
        wel.style.display = 'block';
        coverpic = true;
    });
}

searchBtn1.addEventListener('click', () => {
    if (!searchwindis) {
        searchwin.style.display = 'block';
        searchwindis = true;
    } else {
        searchwin.style.display = 'none';
        searchwindis = false;
    }
});

function toggleBlur(event) {
    if (!blurApplied) {
        sidebar.style.filter = 'blur(10px)';
        primaryfr.style.filter = 'blur(10px)';
        topList.style.filter = 'blur(10px)'
        addwind.style.filter = 'none';
        blurApplied = true;
    } else {
        sidebar.style.filter = 'blur(0px)';
        topList.style.filter = 'blur(0px)';
        primaryfr.style.filter = 'blur(0px)';
        blurApplied = false;
    }
}

sidebar.addEventListener('click', function () {
    if (blurApplied) {
        sidebar.style.filter = 'blur(0px)';
        primaryfr.style.filter = 'blur(0px)';
        topList.style.filter = 'blur(0px)';

        blurApplied = false;
    }
    if (windowshowed) {
        addwind.style.display = 'none';
        windowshowed = false;
    }
});

primaryfr.addEventListener('click', function () {
    if (blurApplied) {
        sidebar.style.filter = 'blur(0px)';
        primaryfr.style.filter = 'blur(0px)';
        topList.style.filter = 'blur(0px)';

        blurApplied = false;
    }
    if (windowshowed) {
        addwind.style.display = 'none';
        windowshowed = false;
    }
});

body.addEventListener('click', function (event) {
    if (event.target.classList.contains('newpage')) {
        toggleBlur(event);
        if (!windowshowed) {
            addwind.style.filter = 'none';
            setTimeout(() => {
                addwind.style.display = 'flex';
            }, 100);
            windowshowed = true;
        } else {
            addwind.style.display = 'none';
            windowshowed = false;
        }
    }
});