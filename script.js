let notesData = [];
let generatedId= 1;
if(localStorage.getItem("notes")!==null);{
   notesData =JSON.parse(localStorage.getItem("notes"))
   let lastIndx = notesData.length-1;
  generatedId = notesData[lastIndx].id+1
}
if(notesData.length!==0){
   let lastIndx = notesData.length-1;
   generatedId=notesData[lastIndx].id+1;
}

function displayExistingNotes()
{
   notesData.forEach(function(oldNote,index){

      let note =  document.createElement("div");
      note.classList.add("note");
   
      let title= document.createElement("input");
      title.classList.add("title");
      title.setAttribute("placeholder", "Sticky Title");
      title.setAttribute("type" , " text");
      title.setAttribute("data-id",oldNote.id);
      title.value=oldNote.title;
      title.onkeyup = updateTitle;

      

   
      let content = document.createElement("textarea");
      content.classList.add("content");
      content.setAttribute("placehoder", "Content Here");
      content.setAttribute("data-id",oldNote.id);
      content.value = oldNote.content;
      content.onkeyup = updateContent;

      let deleteBtn = document.createElement("img");
         deleteBtn.src = "./delete";
         deleteBtn.setAttribute("data-id",oldNote.id);
         deleteBtn.onclick = deleteNote;



      note.appendChild(title);
      note.appendChild(content);
      note.appendChild(deleteBtn);
      document.getElementById("notes").appendChild(note);

   })
}
displayExistingNotes();

function newNote()
{
   let note =  document.createElement("div");
   note.classList.add("note");

   let title= document.createElement("input");
   title.classList.add("title");
   title.setAttribute("placeholder", "Sticky Title");
   title.setAttribute("type" , " text");
   title.setAttribute("data-id",generatedId);
   title.onkeyup = updateTitle;

   let content = document.createElement("textarea");
   content.classList.add("content");
   content.setAttribute("placehoder", "Content Here");
   content.setAttribute("data-id",generatedId);
   content.onkeyup = updateContent;

   let deleteBtn = document.createElement("img");
   deleteBtn.src = "./delete";
   deleteBtn.setAttribute("data-id",generatedId);
   deleteBtn.onclick = deleteNote;

   note.appendChild(title);
   note.appendChild(content);
   note.appendChild(deleteBtn);

   document.getElementById("notes").appendChild(note);
   notesData.push({id:generatedId, title:"",content:""});
   generatedId++;

   localStorage.setItem("notes",JSON.stringify(notesData))
}



function updateTitle()
{
    let titleId=Number(this.getAttribute("data-id"));
    let titleValue=this.value;

    let obj=notesData.find(function(note,index){
        return note.id===titleId;
    })

    obj.title=titleValue;
    localStorage.setItem("notes",JSON.stringify(notesData))

}
function updateContent()
{
 
let contentId = Number(this.getAttribute("data-id"));
let contentValue = this.value;

let obj = notesData.find(function(note,index){
   return note.id===contentId;

})
obj.content = contentValue;

localStorage.setItem("notes",JSON.stringify(notesData))

}

function deleteNote(){
   let deleteId = Number(this.getAttribute("data-id"))
  let index =  notesData.findIndex(function(note,index){
      return note.id ===deleteId;
   })

   notesData.splice(index,1);

   this.parentNode().remove();

   localStorage.setItem("notes",JSON.stringify(notesData));

}
