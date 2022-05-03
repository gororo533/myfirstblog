
var config = {
  apiKey: "AIzaSyD2GlScZ7mUiQg76WkNl2xUtZhF20AYb4A",
  authDomain: "blog0502-6a047.firebaseapp.com",
  projectId: "blog0502-6a047",
  storageBucket: "blog0502-6a047.appspot.com",
  messagingSenderId: "133967695248",
  appId: "1:133967695248:web:1db865c658f76b7619f715",
  measurementId: "G-J0T9NJV43Z"
};
firebase.initializeApp(config);
firebase.firestore().settings( { timestampsInSnapshots: true });



var db = firebase.firestore();
//var database = firebase.database();

let title = document.getElementById("title").value;
let content = document.getElementById("content").value;
let save = document.getElementById('save');
let show = document.getElementById("show");
let postarea = document.getElementById("postarea"); 



function add(){

  console.log("store");

  title = document.getElementById("title").value;
  content = document.getElementById("content").value;
  let uuid = Math.random();
  let datetmp = new Date().toISOString();
  //let dateobj = datetmp.slice(0,10);
  
  if(title === "" || content ===""){
    alert("Title or content hasn't completed");
  }
  else{
    db.collection("posts").doc(`${uuid}`).set({
      title: title,
      date: datetmp,
      content: content
    });
    
    document.getElementById("title").value="";
    document.getElementById("content").value="";
    title="";
    content="";
  }
  
}



function test(){  
  console.log("sucss");
}

function dele(uuid){
   postarea.removeChild(document.getElementById(`${uuid}123`));
}


save.addEventListener('click' , add  );



db.collection("posts").orderBy("date" , "desc").onSnapshot(querySnapshot => {
  postarea.innerHTML="";
  querySnapshot.forEach(doc => {
    
    if (doc.data().title !== "" || doc.data().title !== null){
      postarea.innerHTML+=
      `
      <div class="post" id="${doc.id}123">  
          <p class="titlefont">${doc.data().title}</p>
          <p>${doc.data().content}</p>
          <em>${doc.data().date.slice(0,10)}</em>
          <br>
          
        </div>
      `
      //<p class="x" id="${doc.id}"> X  </p>
      //console.log(doc.id);
      
    }
    
  });
});
