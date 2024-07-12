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
if (listofjournals.length > 0) {
    for (let i = 0; i < listofjournals.length; i++) {
        let element = listofjournals[i];
        listofjournalHtml.innerHTML += `
            <div class='journalnameHtml'>
                <button class='localJournal' id=${i}>${listofjournals[i].journalName}</button>
                <button class='delete'>delete</button>
                <button class='addm'>new</button>
            </div>
        `;
    }

    localJournal = document.querySelectorAll('.localJournal');
    localJournal.forEach((element) => {
        element.addEventListener('click', () => {
            if (coverpic) {
                history.push('newjournal');
                
                console.log(listofjournals[element.id], element.id);
                newjournalacc(element);
                returning(newjournal);
            }
        });
    });
}

function newjournalacc(journalElement) {
    cover.classList.add('coverfade');
    wel.style.display = 'none';
    coverpic = false;
    journal.style.display = 'block';

    const journalID = journalElement.id;

    console.log(journalID);

    if (listofjournals.length > 0) {
        journal.innerHTML = `
            <div class="thejournal" id="${journalID}">
                <div class='information'>
                    <input type="date" class='journalDate' id="${journalID}">
                    <input type="time" class='journalTime' id="${journalID}">
                </div>
                <input type='text' class='journalTitle' value='${listofjournals[journalID].journalName}'>
                <input type='text' class='journalinput' placeholder='start writing here'>
            </div>
        `;
    } else {
        journal.innerHTML = `
            <div class="thejournal" id="${journalID}">
                <div class='information'>
                    <input type="date" class='journalDate' id="${journalID}">
                    <input type="time" class='journalTime' id="${journalID}">
                </div>
                <input type='text' class='journalTitle' value='${journalElement.journalName}'>
                <input type='text' class='journalinput' placeholder='start writing here'>
            </div>
        `;
        console.log('guck');
    }
        
    let journalTitleHtml = document.querySelector('.journalTitle');
    journalTitleHtml.addEventListener('keydown', (event) => {
        console.log(event.key);

        if (!listofjournals[journalID]) {
            listofjournals[journalID] = { journalName: '' };
        }

        if (event.key === 'Backspace') {
            // Handle backspace: remove the last character
            listofjournals[journalID].journalName = listofjournals[journalID].journalName.slice(0, -1);
        } else if (event.key.length === 1) {
            // Handle regular keypress: add the character
            listofjournals[journalID].journalName += event.key;
        }

        journalTitleHtml.value = listofjournals[journalID].journalName;

        if (listofjournals[journalID].journalName.length < 40) {
            localStorage.setItem('list', JSON.stringify(listofjournals));
        }
        journalElement.innerHTML=listofjournals[journalID].journalName
        if(journalElement.innerHTML==''){
            journalElement.innerHTML='title'
        }
        // Prevent default behavior to ensure custom handling
        event.preventDefault();
    });

}

if (listofjournals.length > 0 && listofjournals[0].journalName !== 'New journal') {
    newjour = document.querySelectorAll('.addm');
    newjour.forEach((element) => {
        element.addEventListener('click', addNewJournal);
    });
} else {
    newjour = document.querySelector('.add');
    newjour.addEventListener('click', addNewJournal);
}

function addNewJournal() {
    newjournal = { journalDate: undefined, journalTime: undefined, journalName: "New journal", id: listofjournals.length };
    listofjournals.push(newjournal);
    localStorage.setItem('list', JSON.stringify(listofjournals));

    listofjournalHtml.innerHTML += `
        <div class='journalnameHtml'>
            <button class='localJournal' id="${newjournal.id}">${newjournal.journalName}</button>
            <button class='delete'>delete</button>
            <button class='addm'>new</button>
        </div>
    `;

    if (coverpic) {
        history.push('newjournal');
        newjournalacc(document.getElementById(newjournal.id));
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
