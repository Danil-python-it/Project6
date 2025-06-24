const section_a = document.getElementById("section_a");
const section_b = document.getElementById("section_b");
const ctn_img = document.getElementById("ctn_img")
const ctn_ind = document.getElementById("indicater_page")
let btn_next = document.querySelector("#Next")

let pages = section_a.children
let indicate_lines = ctn_ind.children

let last_page = 4;
let current_page = 0;
let id_timer = -1;
let isCan = true

window.onload = () =>{
    FirstLoad();
}   
window.addEventListener("keydown", ChangeMainPage);
window.onwheel = (ev) => {
    if(ev.deltaY > 0){
        NextPage();
    }
    else if(ev.deltaY<0){
        PressPage();
    }
}

function NextPage(){
    if(isCan){
        last_page = current_page;
        if(current_page < 4) current_page++;
        else current_page = 0;
        isCan = false
        setTimeout(function(){
            isCan = true;
        },1000)
        UpdateSections(last_page,current_page)
    }

}
function PressPage(){
    if(isCan){
        last_page = current_page;
        if(current_page > 0) current_page--;
        else current_page = 4;
        UpdateSections(last_page,current_page)
        setTimeout(function(){
            isCan = true;
        },1000)
        UpdateSections(last_page,current_page)
    }
}

ctn_ind.onclick = (event) =>{
    if(event.target.getAttribute("page_num") != null){
        last_page = current_page
        current_page = -1+ +event.target.getAttribute("page_num") 
        isCan = false
        setTimeout(function(){
            isCan = true;
        },1000)
        UpdateSections(last_page,current_page)
    }

}

function ChangeMainPage(e){
    switch(e.key){
        case "ArrowRight":
        case "ArrowDown":
        case "s":
        case "d":
            NextPage()
            break;
        case "ArrowLeft":
        case "ArrowUp":
        case "w":
        case "a":
            PressPage()
            break;
    } 
}

function FirstLoad(){
    current_page = 0;
    last_page = 4;
    for(let i = 1; i<pages.length;i++){
        pages[i].style.display = "none"
    }
    id_timer = setTimeout(NextPage,5000)
}

function SpawnNewPage(page){

    btn_next = pages[page].querySelector("#Next")
    if(btn_next != null){
        btn_next.addEventListener("click",NextPage)
    }
    pages[page].style.display = "flex"
}

function UpdateSections(l,c){
    if(id_timer != -1)clearTimeout(id_timer)
    for(let i = 0;i<indicate_lines.length; i++){
        if(c != i && indicate_lines[i].classList.contains("main_indicate")){
            indicate_lines[i].classList.remove("main_indicate");
        }
        if(c == i && !indicate_lines[i].classList.contains("main_indicate")){
            indicate_lines[i].classList.add("main_indicate");
        }
    }

    pages[l].style.animationName = "UnloadPage"
    if(pages[c].getAttribute("status") == "1"){
        section_b.style.right = "-100%";
        section_a.style.width = "100%";
    }
    else{
        UpdateSectionImg(c)
    }
    setTimeout(function(){
        pages[l].style.animationName = "LoadPage"
        pages[l].style.display = "none";
        SpawnNewPage(c)
    },1000)
    id_timer = setTimeout(NextPage,5000)
}

function UpdateSectionImg(NameImg){
    ctn_img.setAttribute("src",`./img/${NameImg+1}.jpg`)
    ctn_img.onload = () => {
        section_b.style.width = (document.documentElement.clientWidth/2 > ctn_img.offsetWidth)?`${ctn_img.offsetWidth}px`: `${document.documentElement.clientWidth/2}px`;
        section_b.style.right = "0%";  
        section_a.style.width = (document.documentElement.clientWidth/2 > ctn_img.offsetWidth)?`${document.documentElement.clientWidth-ctn_img.offsetWidth}px`: `${document.documentElement.clientWidth/2}px`;
    }
}