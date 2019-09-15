$(document).ready(function () {
    var date_input = $('input[name="date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
})
var pointToStorage = localStorage.getItem('Notes');
	if(pointToStorage && pointToStorage != [] && pointToStorage != '[]') {
		var notes = JSON.parse(pointToStorage);
		onHTMLLoading();
	} else {
		var notesArray = [];
	};

var counter = 0;
function validateFormEmptyText() {
    var x = document.getElementById('Text').value;
    if (x == "") {
      alert("Text of the mission must be filled out")
      location.reload();
      return false;
    }
  }

  function validateFormEmptyDate() {
    var x = document.getElementById('date').value;
    if (x == "") {
      alert("Date of the Mission must be filled out")
      location.reload();
      return false;
    }
  }

  function onHTMLLoading() {
	var lastNumberIndex = notes.length - 1;
	var lastNumbersRegex = /[0-9]*$/;
	var MylastId = notes[lastNumberIndex].cardId;
	var lastIdIused = lastNumbersRegex.exec(MylastId);
	counter = Number(lastIdIused[0]);
	
	for(i = 0;i<notes.length; i++) {
			var objectTheUserText = notes[i].TheUserText; 
			var objecttheUserDate = notes[i].theUserDate; 
			var objecttheUserTime = notes[i].theUserTime; 
			var objectCardId = notes[i].NoteId;
			var container = createCards(objectCardId);
			var containerPointer = container.children[0].children;
			containerPointer[0].innerText = objectTheUserText;
			containerPointer[1].innerText = objecttheUserDate;
			containerPointer[2].innerText = objecttheUserTime;
			document.getElementById('row').appendChild(container);
	}
}



function saveTheNote(TheUserText, theUserDate, theUserTime,NoteId) {
    var body = document.getElementById("row");
    var templateDiv = document.createElement('div')
    templateDiv.setAttribute("class", "divarea col-md-3 FadeIn");
    templateDiv.setAttribute("id", "theBlock");
    var myTextBlock = document.createElement('p');
    myTextBlock.setAttribute("class", "text-monospace missionArea");
    myTextBlock.innerText = TheUserText;
    templateDiv.appendChild(myTextBlock);
    body.appendChild(templateDiv);
    var myDateBlock = document.createElement('p');
    myDateBlock.setAttribute("class", "text-monospace missionDate");
    myDateBlock.setAttribute("id", "theDate");
    myDateBlock.innerText = theUserDate;
    templateDiv.appendChild(myDateBlock);
    var myHourBlock = document.createElement('p');
    myHourBlock.setAttribute("class", "text-monospace missionHour");
    myHourBlock.setAttribute("id", "theHour");
    myHourBlock.innerText = theUserTime;
    templateDiv.appendChild(myHourBlock);
    // This is when the x delete button is called 
    var btn = document.createElement('i');
    btn.setAttribute("id", "exitButton");
    btn.setAttribute("class", "fas fa-times-circle text-danger exit");
    btn.onclick = function () {
        body.removeChild(templateDiv);
        var delIndex = 0;
				var isName = "";
				for (;id != isName;delIndex++) {
					isName = notes[delIndex].cardId;
    }
    notes.splice((delIndex-1),1);
				var myJSON = JSON.stringify(notes);
                localStorage.setItem('notes',myJSON);
}
    templateDiv.appendChild(btn);
    return templateDiv;
}

function onUserClick() {
    validateFormEmptyText();
    validateFormEmptyDate();
    counter = counter + 1;
    var TheUserText = document.getElementById('Text').value;
    var theUserDate = document.getElementById('date').value;
    var theUserTime = document.getElementById('appt').value;
    var NoteId = 'Note'+ counter;
    var container = saveTheNote(NoteId);
    var container = createCards(cardId);
    var containerPointer = container.children[0].children;
			/*containerPointer[0].innerText = TheUserText;
			containerPointer[1].innerText = theUserDate;
			containerPointer[2].innerText = theUserTime;*/
    var LocalNote = new CreateNote(TheUserText, theUserDate, theUserTime, NoteId);
    notesArray.push(LocalNote);
    var myJSON = JSON.stringify(notesArray);
    localStorage.setItem('Notes', myJSON);
    document.getElementById('row').appendChild(container);
    return false;
}

function RebuildDataBase() {
 console.log('try rebuilding your data from the localsorage of your computer')   
 getObject = JSON.parse(localStorage.getItem('Notes')); 
 if (Boolean(getObject))  {
 console.log('Great,There is some notes to restore');
 theUserDataBase = localStorage.getItem('Notes');
 } 
}


document.getElementById('saveTheNote').onclick = onUserClick;

function CreateNote(TheUserText, theUserDate, theUserTime,NoteId) {
    this.TheUserText = TheUserText;
    this.theUserDate = theUserDate;
    this.theUserTime = theUserTime;
    this.NoteId = NoteId;
}

