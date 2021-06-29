//Adding sheets
addbtn.addEventListener("click",function(){
    const sheets = document.querySelectorAll(".sheet");
    sheetno++;
    const elem = document.createElement("div");
    elem.className = "sheet";
    elem.textContent = "Sheet "+sheetno;
    elem.setAttribute("idx",sheetno);
    sheets.forEach(function(sheet){
        sheet.classList.remove("active");
    })
    sheetlist.appendChild(elem);
    elem.classList.add("active");
    createSheet();
    sheetDB = sheetarr[sheetno-1];
    setUI();
    elem.addEventListener("click",function(){
        const sheets = document.querySelectorAll(".sheet");
    
        sheets.forEach(function(sheet){
            sheet.classList.remove("active");          
        })
        elem.classList.add("active");
        let idx = elem.getAttribute("idx");
        console.log(idx);
        if(!sheetarr[idx-1]){
            createSheet();
        }
        sheetDB = sheetarr[idx-1];
        setUI();
    })
})