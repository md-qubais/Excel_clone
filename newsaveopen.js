let save = document.querySelector(".Save");
let open = document.querySelector(".open");
const NewBtn = document.querySelector(".New");

NewBtn.addEventListener("click",() =>{
    let sheets = document.querySelectorAll(".sheet");
        let idx;
        for (let i = 0; i < sheets.length; i++) {
            if (sheets[i].classList.contains("active")) {
                idx = sheets[i].getAttribute("idx");
                break;
            }
        }
        sheetarr[idx-1] = sheetDB;
        initUI(idx-1);
        setUI();
})

// functionality -> download excel representation
save.addEventListener("click", function () {
    console.log("hameed");
    //2d arrayy save file 
    const data = JSON.stringify(sheetDB);
    // convert it into blob
    // data -> file like object convert
    const blob = new Blob([data], { type: 'application/json' });
    // convert it any type file into url
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    // content in that file
    a.href = url;
    // file download
    a.download = "file.json";
    // anchor click
    a.click();
})
// downloaded file -> open read 
// input type file -> change event file name
open.addEventListener("change", function () {
    // files array -> file accept-> multiple files get 
    console.log("open clicked");
    let filesArray = open.files;

    let fileObj = filesArray[0];
    
    // file reader to read the file
    let fr = new FileReader();
    // read as text 
    fr.readAsText(fileObj);
    fr.onload = function () {
        // 3 darray
        let openedFileData = JSON.parse(fr.result);
        sheetDB = openedFileData;
        
    }
        

    // ui init f
})
function initUI(idx){
let newDB = [];
    for(let i = 0; i < rows; i++){
        let row = [];
        for(let j = cols; j < cols+26; j++){
       let object = {
           bold:"normal",
           italic:"normal",
           align:"center",
           tcolor:"black",
           backgroundcolor:"white",
           underline:"none",
           fontsize:"16",
           fontfamily:"Arial",
           value:"",
           formula:"",
           children:[]
       }    
       let r = i+1;
       let col = String.fromCharCode(j);
       let idx = col + r;
       let elem = document.querySelector(`.cbox[adrs='${idx}']`);
            elem.style.fontWeight = "normal";
            elem.style.fontStyle = "normal";
            elem.style.textDecoration = "none";
            elem.style.fontFamily = "Arial";
            elem.style.fontSize = "16px";
            elem.style.textAlign = "center";
            elem.style.color = "black";
            elem.style.backgroundColor = "white";
            elem.innerText = ""

       row.push(object);
        }
        newDB.push(row);
          
    }
    sheetarr[idx] = newDB;
    sheetDB = newDB;
}