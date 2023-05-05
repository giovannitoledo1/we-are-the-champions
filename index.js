// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-98ad8-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementDB = ref(database, "endorsement")

const textEl = document.getElementById("text-el")
const publishEl = document.getElementById("publish-el")
const endorsementEl = document.getElementById("endorsement-el")

publishEl.addEventListener("click", function(){
    let inputValue = textEl.value
    push(endorsementDB, inputValue)
    
    clearInputField()
})

onValue(endorsementDB, function(snapshot){
     if(snapshot.exists()) {
        let objectArray = Object.entries(snapshot.val())
        
        clearEndorsementList();
        
        for (let i =0; i < objectArray.length; i++){
            let currentItem = objectArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToEndorsementEl(currentItem)
        }
    }else{
        clearEndorsementList();
    }
    
})

function clearInputField(){
    textEl.value = ""
}

function clearEndorsementList(){
    endorsementEl.innerHTML = ""
}

function appendItemToEndorsementEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    
    newEl.textContent = `${itemValue}`
    
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `endorsement/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    endorsementEl.append(newEl)
}