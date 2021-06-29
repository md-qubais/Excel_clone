const leftcol = document.querySelector(".leftcol");
const toprow = document.querySelector(".toprow");

const grid = document.querySelector(".grid");

const addressbar = document.querySelector(".address-input");
const formulabar = document.querySelector(".formula-input");

const bold = document.querySelector(".bold");
const italic = document.querySelector(".italic");
const underline = document.querySelector(".underline");

const align = document.querySelector(".text-alignment");

const fontsize = document.querySelector(".font-size");
const fontfamily = document.querySelector(".font-family");

const textcolor = document.querySelector(".text-color");
const backgroundcolor = document.querySelector(".bg-color");

const addbtn = document.querySelector(".add-sheet_btn-container");

const sheetlist = document.querySelector(".sheet-list");
const firstsheet = document.querySelector(".sheet");
let sheetno = 1;
let rows = 100;
let cols = 65; 

//*************      *** Making Grid ************************* */
 

for(let i = 0; i < rows; i++){
    let box = document.createElement("div");
    box.innerText = i+1;
    box.setAttribute("class","box");
    leftcol.appendChild(box);
}

for(let i = cols; i < cols+26; i++){
    let box = document.createElement("div");
    box.innerText = String.fromCharCode(i);
    box.setAttribute("class","cbox");
    toprow.appendChild(box);
}

for(let i = 0; i < rows; i++){
    let row = document.createElement("div");
    row.setAttribute("class","row");
    for(let j = cols; j < cols+26; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cbox");
        // cell.innerText = `${String.fromCharCode(j)} ${i+1}`;
        cell.setAttribute("adrs",`${String.fromCharCode(j)}${i+1}`);
        cell.setAttribute("contenteditable","true");
        row.appendChild(cell);
    }
    grid.appendChild(row);   
}



let sheetDB=[];
let sheetarr = [];

firstsheet.addEventListener("click",function(){
    const sheets = document.querySelectorAll(".sheet");
    
        sheets.forEach(function(sheet){
            sheet.classList.remove("active");          
        })
        firstsheet.classList.add("active");
        let idx = firstsheet.getAttribute("idx");
        if(!sheetarr[idx]){
            createSheet();
        }
        sheetDB = sheetarr[0];
        setUI();
})
function setUI(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < 26; j++){
            let row = i+1;
            let col = String.fromCharCode((j+65));
            let idx = col+row;
            // console.log(idx);
            let cell = document.querySelector(`.cbox[adrs=${idx}]`);
            let cellData = sheetDB[i][j];
            cell.style.fontWeight = cellData.bold;
			cell.style.fontStyle =cellData.italic;
			cell.style.textDecoration =cellData.underline;
			cell.style.fontFamily = cellData.fontfamily;
			cell.style.fontSize = cellData.fontsize + "px";
			cell.style.textAlign = cellData.align;
			cell.innerText = cellData.value;
			cell.style.color = cellData.tColor;
			cell.style.backgroundColor = cellData.backgroundcolor;

       }    
    }
          
}
firstsheet.click();


function createSheet(){
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
    sheetarr.push(newDB);
}

grid.addEventListener("click",function(e){
    if(e.target.className == "cbox"){
        let cls = e.target;
        let atr = cls.getAttribute("adrs");
        addressbar.value = atr; 
        let obj = getindices(atr);
        let cellObject = sheetDB[obj.i][obj.j];
        if(cellObject.bold=="bold"){
            bold.classList.add("active-btn");
        }else{
            bold.classList.remove("active-btn");
        }
        if(cellObject.italic == "italic"){
            italic.classList.add("active-btn");
        }else{
            italic.classList.remove("active-btn");
        }
        if(cellObject.underline == "underline"){
            underline.classList.add("active-btn");
        }else{
            underline.classList.remove("active-btn");
        }
        const alignitems = document.querySelectorAll(".text-alignment>*");
        for(let i = 0; i < alignitems.length; i++){
            alignitems[i].classList.remove("active-btn");   
            if(alignitems[i].className === cellObject.align){
                alignitems[i].classList.add("active-btn");
            }
        }


        
        //textcolor.value = cellObject.tcolor;
        //backgroundcolor.value = cellObject.backgroundcolor;
        fontsize.value = cellObject.fontsize;
        fontfamily.value = cellObject.fontfamily;
        formulabar.value = cellObject.formula;
        
    }
})
document.querySelector(".cbox[adrs='A1']").click();


function getindices(atr){
    let r = atr.slice(1);
    let c = atr[0].charCodeAt();
    let i = r-1;
    let j = c-65;
    return {i,j};
}

//************************ Formatting *********************** */
let boldclick = false;
bold.addEventListener("click",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    let obj = getindices(idx);
    if(boldclick){
        cell.style.fontWeight = "normal";
        bold.classList.remove("active-btn");
        sheetDB[obj.i][obj.j].bold = "normal";
    }else{
        cell.style.fontWeight = "bold";
        bold.classList.add("active-btn");
        sheetDB[obj.i][obj.j].bold = "bold";
    }
    boldclick = !boldclick;
})

let italicclick = false;
italic.addEventListener("click",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    let obj = getindices(idx);
    if(italicclick){
        cell.style.fontStyle = "normal";
        italic.classList.remove("active-btn");
        sheetDB[obj.i][obj.j].italic = "normal";
    }else{
        cell.style.fontStyle = "italic";
        italic.classList.add("active-btn");
        sheetDB[obj.i][obj.j].italic = "italic";
    }
    italicclick = !italicclick;
})

let underlineclick = false;
underline.addEventListener("click",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    let obj = getindices(idx);
    if(underlineclick){
        cell.style.textDecoration = "none";
        underline.classList.remove("active-btn");
        sheetDB[obj.i][obj.j].underline = "none";
    }else{
        cell.style.textDecoration = "underline"
        underline.classList.add("active-btn");
        sheetDB[obj.i][obj.j].underline = "underline";
    }
    underlineclick = !underlineclick;
})

const lrc = document.querySelectorAll(".text-alignment>*");
for(let i = 0; i < lrc.length; i++){
    lrc[i].addEventListener("click",function(){
        for(let j = 0; j < lrc.length; j++){
            lrc[j].classList.remove("active-btn");
        }
        lrc[i].classList.add("active-btn");
        let value = lrc[i].classList[0];
        let idx = addressbar.value;
        let cell = document.querySelector(`.cbox[adrs=${idx}]`);
        console.log(value);
        cell.style.textAlign = value;
        let obj = getindices(idx);
        sheetDB[obj.i][obj.j].align = value;
    })
}    
    


fontsize.addEventListener("change",function(){
    console.log("Hameed");
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.fontSize = fontsize.value +"px";
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].fontsize = fontsize.value;
})

fontfamily.addEventListener("change",function(){
    console.log("fontfamily")
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.fontFamily = fontfamily.value ;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].fontfamily = fontfamily.value;
})

textcolor.addEventListener("change",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.color = textcolor.value;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].tcolor = textcolor.value;
})

backgroundcolor.addEventListener("change",function(){
    let idx = addressbar.value;
    let cell = document.querySelector(`.cbox[adrs=${idx}]`);
    cell.style.backgroundColor = backgroundcolor.value;
    let obj = getindices(idx);
    sheetDB[obj.i][obj.j].backgroundcolor = backgroundcolor.value;
})