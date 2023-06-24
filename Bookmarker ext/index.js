const input_el = document.getElementById("input-el");
const input_btn = document.getElementById("input-btn");
const ul_el = document.getElementById("ul-El");
const clear = document.getElementById("clear");
const save_tab = document.getElementById("save-tab");


let myleads = [""];
const leadsfromstorage = JSON.parse(localStorage.getItem("myleads"));
if(leadsfromstorage){
    myleads = leadsfromstorage;
    renderLeads(myleads); 
}

clear.addEventListener('click',()=>{
    localStorage.clear();
    myleads = [];
    // renderLeads();
    ul_el.innerHTML = '';
})

input_btn.addEventListener("click",()=>{
    myleads.push(input_el.value);
    saveinlocalstorage();
    appendOnscreen(input_el.value);
})
function appendOnscreen(text){
    const node = document.createElement("li");
    const link = document.createElement("a");
    const textnode = document.createTextNode(text);
    link.appendChild(textnode);
    link.setAttribute('href', text);
    link.setAttribute('target', '__blank');
    node.appendChild(link);
    ul_el.appendChild(node);
    input_el.value = "";
}

save_tab.addEventListener("click",()=>{
    chrome.tabs.query({active:true, lastFocusedWindow: true},(tabs)=>{
        myleads.push(tabs[0].url);
        saveinlocalstorage();
        appendOnscreen(tabs[0].url);
    })
})

saveinlocalstorage = ()=>{
    localStorage.setItem("myleads", JSON.stringify(myleads));
}


function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ul_el.innerHTML = listItems  
}

// const myJSON = JSON.stringify(myleads);

// console.log(myJSON);

// const array = JSON.parse(myJSON);

// console.log(array);