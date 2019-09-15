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

function validateFormEmptyText() {
    var x = document.getElementById('Text').value;
    if (x == "") {
        alert("Text of the mission must be filled out")
        storage.removeItem(theData);
        location.reload();
        return false;
    }
}

function validateFormEmptyDate() {
    var x = document.getElementById('date').value;
    if (x == "") {
        alert("Date of the Mission must be filled out")
        storage.removeItem(theData);
        location.reload();
        return false;
    }
}
var counter = 0;
var GoToStorage = localStorage.getItem('theData');
if (GoToStorage && GoToStorage != [] && GoToStorage != '[]' && GoToStorage != 'null') {
    var myStorage = JSON.parse(GoToStorage);
    onloadHTML()
} else {
    var myStorage = []
}

function onUserClick() {
    validateFormEmptyText();
    validateFormEmptyDate();
    InputText = document.getElementById('Text').value;
    InputDate = document.getElementById('date').value;
    InputTime = document.getElementById('appt').value;
    Id = 'Note' + counter;
    buildElement(InputText, InputDate, InputTime, Id);
    var NewPObject = new BuildObject(InputText, InputDate, InputTime, Id)
    myStorage.push(NewPObject);
    var JSONMyStorage = JSON.stringify(myStorage);
    localStorage.setItem('theData', JSONMyStorage)
    var myStorageJSON = JSON.stringify(myStorage);
    localStorage.setItem('theData', myStorageJSON);
    return false;
}

function BuildObject(InputText, InputDate, InputTime, Id) {
    this.InputText = InputText;
    this.InputDate = InputDate;
    this.InputTime = InputTime;
    this.Id = Id;
}


function buildElement(NoteText, NoteDate, NoteTime, Id) {
    counter++;
    var body = document.getElementById("row");
    Newdiv = document.createElement('div');
    Newdiv.setAttribute("class", "divarea col-md-3 FadeIn");
    body.appendChild(Newdiv);
    NewText = document.createElement('p');
    NewText.setAttribute("class", "text-monospace missionArea");
    NewText.innerText = NoteText;
    Newdiv.appendChild(NewText);
    NewDate = document.createElement('p');
    NewDate.setAttribute("class", "text-monospace missionDate");
    NewDate.innerText = NoteDate;
    Newdiv.appendChild(NewDate);
    NewHour = document.createElement('p');
    NewHour.setAttribute("class", "text-monospace missionHour");
    NewHour.innerText = NoteTime;
    Newdiv.appendChild(NewHour);
    btn = document.createElement('i');
    btn.setAttribute("id", "exitButton");
    btn.setAttribute("class", "fas fa-times-circle text-danger exit");
    Newdiv.appendChild(btn);
    btn.onclick = function () {
        document.getElementById("row").removeChild(Newdiv);
        var removeIndex = 0;
        var Itis = '';
        for (; Id != Itis; removeIndex++) {
            Itis = myStorage[removeIndex].Id;
        }

        myStorage.splice((removeIndex - 1), 1);
        var myStorageJSON = JSON.stringify(myStorage);
        localStorage.setItem('theData', myStorageJSON);
    };

    return Newdiv;
}

function onloadHTML() {
    var lastI = myStorage.length - 1;
    var Regex = /[0-9]*$/;
    var Idlast = myStorage[lastI].Id
    var Exi = Regex.exec(Idlast);
    counter = Number(Exi[0]);

    for (index = 0; index < myStorage.length; index++) {
        var objectCardDes = myStorage[index].InputText;
        var objectCardDate = myStorage[index].InputDate;
        var objectCardTime = myStorage[index].InputTime;
        var objectCardId = myStorage[index].Id;
        buildElement(objectCardDes, objectCardDate, objectCardTime, objectCardId)
    }
}

//}




document.getElementById('saveTheNote').onclick = onUserClick;