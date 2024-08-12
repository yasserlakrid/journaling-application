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
//localStorage.clear('list')
// Initialize Journals
if (listofjournals !== undefined || listofjournals.length > 0) {
    for (let i = 0; i < listofjournals.length; i++) {
        let element = listofjournals[i];
        listofjournalHtml.innerHTML += `
            <div class='journalnameHtml'>
                <button class='localJournal' id=${i}>${listofjournals[i].journalName}</button>
                <button class='delete'>delete</button>
                <button class='addm'>new</button>
            </div>`
        ;
    }

    localJournal = document.querySelectorAll('.localJournal');
    localJournal.forEach((element) => {
        element.addEventListener('click', () => {
            if (coverpic) {
                history.push('newjournal');
                
                console.log(listofjournals[element.id],element.id)
                newjournalacc(element)
                returning(newjournal);
            }
        });
    });
}

function newjournalacc(journalID) {
    cover.classList.add('coverfade');
        wel.style.display = 'none';
        coverpic = false;
        journal.style.display='block'
        console.log(journalID.id)
        if(listofjournals!==[]){
            journal.innerHTML = `<div class="thejournal" id=${journalID.id}}>
                <div class='information'>
                    <input type="date" class='journalDate' id=${journalID.id}>
                    <input type="time" class='journalTime' id=${journalID.id}>
                </div>
                <input type='text' class='journalTitle' placeholder='${listofjournals[journalID.id].journalName}'>
                <input type='text' class='journalinput' placeholder='start writing here'>
            </div>`
            
        ;
        }else{
            journal.innerHTML = `<div class="thejournal" id=${journalID.id}}>
                <div class='information'>
                    <input type="date" class='journalDate' id=${journalID.id}>
                    <input type="time" class='journalTime' id=${journalID.id}>
                </div>
                <input type='text' class='journalTitle' value='${journalID.journalName}'>
                <input type='text' class='journalinput' placeholder='start writing here'>
            </div>`
            
        ;
        console.log('guck')
        }
        
        let journalTitleHtml = document.querySelector('.journalTitle');
        journalTitleHtml.addEventListener('keydown', (letter) => {
            console.log(letter.key)
            if(journalID.innerHTML=='New journal'){
                listofjournals[journalID.id]=''
                if (letter.key === 'Backspace') {
                    // Handle backspace: remove the last character
                    listofjournals[journalID.id] = listofjournals[journalID.id].slice(0, -1);
                } else if (letter.key.length === 1) {
                    // Handle regular keypress: add the character
                    listofjournals[journalID.id] += letter.key;
                }
            
                journalID.innerHTML=listofjournals[journalID.id]
            }else{
                if (letter.key === 'Backspace') {
                    // Handle backspace: remove the last character
                    listofjournals[journalID.id] = listofjournals[journalID.id].slice(0, -1);
                } else if (letter.key.length === 1) {
                    // Handle regular keypress: add the character
                    listofjournals[journalID.id] += letter.key;
                }
                journalID.innerHTML=listofjournals[journalID.id]

            }
            if(listofjournals[journalID.id].length<40){
                localStorage.setItem('list', JSON.stringify(listofjournals));
            }
             
            
        });
        
    
    
}

if (listofjournals !== undefined || listofjournals[0].journalName !== 'New journal') {
    if (listofjournals.length > 0) {
        newjour = document.querySelectorAll('.addm');
        newjour.forEach((element) => {
            element.addEventListener('click', addNewJournal);
        });
    } else {
        newjour = document.querySelector('.add');
        newjour.addEventListener('click', addNewJournal);
    }
}

function addNewJournal() {
    newjournal = { journalDate: undefined, journalTime: undefined, journalName: "New journal" ,id:Number};
    listofjournals.push(newjournal);
    localStorage.setItem('list', JSON.stringify(listofjournals));

    listofjournalHtml.innerHTML += 
        <div class='journalnameHtml'>
            <button class='localJournal'>${newjournal.journalName}</button>
            <button class='delete'>delete</button>
            <button class='addm'>new</button>
        </div>
    ;

    if (coverpic) {
        history.push('newjournal');
        newjournalacc()
        returning(newjournal);
    }
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
        addwind.style.filter = 'none';
        blurApplied = true;
    } else {
        sidebar.style.filter = 'blur(0px)';
        primaryfr.style.filter = 'blur(0px)';
        blurApplied = false;
    }
}

sidebar.addEventListener('click', function() {
    if (blurApplied) {
        sidebar.style.filter = 'blur(0px)';
        primaryfr.style.filter = 'blur(0px)';
        blurApplied = false;
    }
    if (windowshowed) {
        addwind.style.display = 'none';
        windowshowed = false;
    }
});

primaryfr.addEventListener('click', function() {
    if (blurApplied) {
        sidebar.style.filter = 'blur(0px)';
        primaryfr.style.filter = 'blur(0px)';
        blurApplied = false;
    }
    if (windowshowed) {
        addwind.style.display = 'none';
        windowshowed = false;
    }
});

body.addEventListener('click', function(event) {
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