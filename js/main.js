let tblOngs = document.getElementById("tblOngs");
let nameinput = document.getElementById("nameinput");
let sloganinput = document.getElementById("sloganinput");
let linkinput = document.getElementById("linkinput");

buildTable(tblOngs);

var btnAdicionar = document.querySelector('#btnAdicionar');

btnAdicionar.addEventListener("click", function(){
    nameinputval = nameinput.value;
    sloganinputval = sloganinput.value;
    linkinputval = linkinput.value;

    if(nameinputval.trim()!=0 && sloganinputval.trim()!=0 && linkinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            obj = [];
        }
        else{
            obj = JSON.parse(webtask);
        }

        var objeto = {
            nome: nameinputval,
            slogan: sloganinputval,
            link: linkinputval
        }

        obj.push(objeto);

        localStorage.setItem("localtask", JSON.stringify(obj));
        nameinput.value = '';
        sloganinput.value = '';
        linkinput.value = '';

    }
    buildTable();
})


function buildTable(index) {
    index = -1;
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        obj = [];
    }
    else{
        obj = JSON.parse(webtask);
    }
    let html = '';
    html += `<thead>
                                <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Slogan</th>
                                <th>Link Site</th>
                                <th>Ativo</th>
                                <th>Configuração</th>
                                </tr>
                    </thead>`

    for (var i=0;i<obj.length;i++) {
        index++;
        html += `   
                    
                    <tbody>
                                <tr>
                                <th scope="row">${index+1}</th>
                                <td>${obj[i].nome}</td>
                                <td>${obj[i].slogan}</td>
                                <td>${obj[i].link}</td>
                                <td>
                                                <label class="myCheckbox">
                                                    <input type="checkbox"  class="checkbox" name="checkbox" id=${index} value="checkbox" />
                                                </label>
                                </td>
                                <td id="config">
                                                <button type="button" onclick="editarInfo(${index})" data-toggle="modal" data-target="#myModal2"  class="text-primary" id="btnAE">Editar</button>
                                                <button type="button" onclick="deleteitem(${index})" class="text-danger" id="btnAE" >Deletar</button>
                                </td>
                                </tr>
                    </tbody>`;
    }
        tblOngs.innerHTML = html;
};

$('input[name="checkbox"]').on('change', function() {
    $(this).closest('tr').css('background-color', $(this).is(':checked') ? 'rgb(76, 175, 80)': '');
    $(this).closest('tr').css('color', $(this).is(':checked') ? 'white': '');
 });



function editarInfo(index){
    
    let saveindex = document.getElementById("saveindex");
    let btnAdicionar = document.getElementById("btnAdicionar");
    let saveBtn2 = document.getElementById("saveBtn2");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let obj = JSON.parse(webtask); 
    for (var i=0;i<obj.length;i++) {

    nameinput2.value = obj[index]['nome'];
    sloganinput2.value = obj[index]['slogan'];
    linkinput2.value = obj[index]['link'];
    }
    btnAdicionar.style.display="block";
    saveBtn2.style.display="block";
}

let saveBtn = document.getElementById("saveBtn2");
saveBtn.addEventListener("click", function(){
    let btnAdicionar = document.getElementById("btnAdicionar");
    let webtask = localStorage.getItem("localtask");
    let obj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    
    for (keys in obj[saveindex]) {
        if(keys == 'nome'){
            obj[saveindex].nome = nameinput2.value;
        }if(keys == 'slogan'){
            obj[saveindex].slogan = sloganinput2.value;

        }if(keys == 'link'){
            obj[saveindex].link = linkinput2.value;

        }
      }

    saveBtn.style.display="none";
    btnAdicionar.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(obj));
    nameinput.value='';
    sloganinput.value='';
    linkinput.value='';

    buildTable();
});


function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let obj = JSON.parse(webtask);
    obj.splice(index, 1);
    
    localStorage.setItem("localtask", JSON.stringify(obj));
    buildTable();
}

tblOngs.addEventListener("click", function(e){

        let webtask = localStorage.getItem("localtask");
        let obj = JSON.parse(webtask);
        
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");
        
        
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
  
            for (keys in obj[mytargetid]) {
                if(keys == 'completeStatus' && obj[mytargetid][keys]==true){
                    obj[mytargetid].completeStatus = false;
                }else if(keys == 'completeStatus' && obj[mytargetid][keys]==false){
                    obj[mytargetid].completeStatus = true;
                }
              }
 
        localStorage.setItem("localtask", JSON.stringify(obj));
        buildTable();
    }
    })












