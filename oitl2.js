var listA = [
    {"title": "телефоны", "children":["apple", "samsung"]},
    {"title": "телевизоры", "children":[]},
    {"title": "холодильники", "children":["беспроводные", "проводные"]},
    {"title": "пылесосы", "children":[]},
    {"title": "apple", "children":["iphone X", "iphone 14 pro"]},
    {"title": "samsung", "children":["galaxy s23"]},
    {"title": "беспроводные", "children":["tesla"]},
    {"title": "проводные", "children":["lg", "whirlpool"]},
    {"title": "tesla", "children":["model freeze"]},
    {"title": "lg", "children":["e100"]},
    {"title": "whirlpool", "children":["gd500"]},
]

var listB = [
    {"title": "iphone X", "image": "https://preview.redd.it/hvnfnmdje2v01.png?auto=webp&s=d83f9430448d6d9e0d5ed58195caed98d6bf7b23", "text": "element description element description element description"},
    {"title": "iphone 14 pro", "image": "https://i.pinimg.com/564x/aa/6e/c1/aa6ec121018f55763daa779eb5220ac2.jpg", "text": "element description element description element description"},
    {"title": "galaxy s23", "image": "https://i.pinimg.com/564x/aa/6e/c1/aa6ec121018f55763daa779eb5220ac2.jpg", "text": "element description"},
    {"title": "model freeze", "image": "https://i.pinimg.com/564x/aa/6e/c1/aa6ec121018f55763daa779eb5220ac2.jpg", "text": "element description"},
    {"title": "e100", "image": "https://i.pinimg.com/564x/aa/6e/c1/aa6ec121018f55763daa779eb5220ac2.jpg", "text": "element description"},
    {"title": "gd500", "image": "https://i.pinimg.com/564x/aa/6e/c1/aa6ec121018f55763daa779eb5220ac2.jpg", "text": "element description"},
]

const ul = document.querySelector(".listfield")
const vm = document.querySelector(".viewmodel")
const ct = document.querySelector(".container")
var list = document.createElement("ul")
list.className = "list"
ul.insertAdjacentElement("afterbegin", list)
const ll = document.querySelector(".list")
var linkToParent = ""
var countNew = 0

dialogCode = `<dialog class="addElement">
<form method="dialog">
  <div class="form-group">
    <input type="button" class="close" value="&times;">
    <select id="selectType">
      <option value="1">Раздел</option>
      <option value="2">Информация</option>
    </select>
  </div>
  <form><input type="text" id="elemHead" placeholder="заголовок"></form>
  <div class="block" style="visibility: hidden;"></div>
  <div class="block">
    <form>
        <input type="text" id="imageLink" placeholder="ссылка на картинку">
        </form>
        <form>
        <textarea id="descriptionField" placeholder="ввод текста" cols="21" rows="5"></textarea>

      </form>
  </div>
  <menu>
    <input type="submit" class="close" id="save" value="Сохранить" onclick="add()"></button>
  </menu>
</form>
</dialog>`

ct.insertAdjacentHTML("afterend",dialogCode)

var modal = document.querySelector('.addElement');

var root = true;
rootArray = [];
childArray = [];

for(let i = 0; i < listA.length; i++) {
    root = true;
    for(let j = 0; j < listA.length; j++) {
        for(let k = 0; k < listA[j].children.length; k++) {
            if (listA[i].title == listA[j].children[k]) {
                root = false;
            }
        }
    }
    if (root == true) {
        rootArray.push(listA[i])
    }
    else {
        childArray.push(listA[i])
    }
}

for(let i = 0; i < listB.length; i++) {
    childArray.push(listB[i])
}

var buttonId = 0;

for (let i = 0; i < rootArray.length; i++) {
    className = `${rootArray[i].title}`
    if (rootArray[i].text) {
        ll.innerHTML += `<li class=${className}><input type="button" onclick="view(${buttonId})" value="${className}" id="${buttonId}" /></li>`
        buttonId++;
    } else {
        ll.innerHTML += `<li class=${className}><input type="button" onclick="hide(${buttonId})" value="[+] ${className}" id="${buttonId}" /></li>`
        buttonId++;
    }
}

ll.innerHTML += `<input type="button" id="rootAddButton" class="addBtn" value="Добавить элемент"/>`

for (let i = 0; i < rootArray.length; i++) {
    className = `${rootArray[i].title}`
    var ulNew = document.querySelector(`.${className}`)
    var cN = `${className}List`
    var ulAdd = `<ul class=${cN} style="display: none">`
    ulNew.insertAdjacentHTML("beforeend", ulAdd)
    if (rootArray[i].children) {
        for (let j = 0; j < rootArray[i].children.length; j++) {
            childWork(rootArray[i].children[j], cN)
        }
    }
    var btn = document.querySelector(`.${cN}`)
    var addButtonId = `${className}Button`
    var addButton = `<input type="button" id="${addButtonId}" class="addBtn" value="Добавить элемент"/>`
    btn.insertAdjacentHTML("beforeend", addButton)
    var ulAdd = `</ul>`
    ulNew.insertAdjacentHTML("beforeend", ulAdd)
}

function childWork(elem, className) {
    for (let j = 0; j < childArray.length; j++) {
        if (childArray[j].title == elem) {
            if (childArray[j].text) {
                var inside = document.querySelector(`.${className}`)
                var listInside = `<li class=${childArray[j].title}><input type="button" onclick="view(${buttonId})" value="${childArray[j].title}" id="${buttonId}"></li>`
                buttonId++;
                inside.insertAdjacentHTML("beforeend", listInside)
            } else {
                var inside = document.querySelector(`.${className}`)
                var listInside = `<li class=${childArray[j].title}><input type="button" onclick="hide(${buttonId})" value="[+] ${childArray[j].title}" id="${buttonId}"></li>`
                buttonId++;
                inside.insertAdjacentHTML("beforeend", listInside)
                className = `${childArray[j].title}`
                var ulNew = document.querySelector(`.${className}`)
                var cN = `${className}List`
                var ulAdd = `<ul class=${cN} style="display: none">`
                ulNew.insertAdjacentHTML("beforeend", ulAdd)
                if (childArray[j].children) {
                    for (let k = 0; k < childArray[j].children.length; k++) {
                        childWork(childArray[j].children[k], cN)
                    }
                }
                var btn = document.querySelector(`.${cN}`)
                var addButtonId = `${className}Button`
                var addButton = `<input type="button" id="${addButtonId}" class="addBtn" value="Добавить элемент"/>`
                btn.insertAdjacentHTML("beforeend", addButton)
                var ulAdd = `</ul>`
                ulNew.insertAdjacentHTML("beforeend", ulAdd)
            }
        }
    }
}

var addBtn = document.getElementsByClassName('addBtn');
var close = document.getElementsByClassName('close');

for (var i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', openModalWindow, false)
}

for (var i = 0; i < close.length; i++) {
    close[i].addEventListener('click', function() {
        closeModalWindow();
    })
}

function openModalWindow(e) {
    parentName = e.target.id
    linkToParent = parentName.substring(0,parentName.length-6);
    modal.showModal()
}
  
function closeModalWindow() {
    modal.close()
}

let select = document.getElementById('selectType');
let block = document.querySelectorAll('.block');
let lastIndex = 0;

select.addEventListener('change', function() {
    block[lastIndex].style.display = "none";
  
    let index = select.selectedIndex;
    block[index].style.display = "block";
  
    lastIndex = index;
});

function hide(id) {
    var elem = document.getElementById(id)
    var str = elem.value
    var name = elem.value.substring(4,elem.value.length)
    var root = false
    var className = ""
    rootArray.forEach(function(item) {
        if (name == item.title) {
            root = true
            className = item.title
        }
    })
    if (root == false) {
        childArray.forEach(function(item) {
            if (name == item.title) {
                className = item.title
            }
        })
    }
    if (str[1] == "+") {
        var newStr = `[-] ${name}`
        elem.value = newStr
        var elements = document.getElementsByClassName(`${className}List`)
        elements[0].style.display = 'block'
        
    } else if (str[1] == "-") {
        var newStr = `[+] ${name}`
        elem.value = newStr
        var elements = document.getElementsByClassName(`${className}List`)
        elements[0].style.display = 'none'
    }
}

function view(id) {
    var elem = document.getElementById(id)
    var name = elem.value
    var root = false
    var image = ""
    var text = ""
    rootArray.forEach(function(item) {
        if (name == item.title) {
            root = true
            image = item.image
            text = item.text
        }
    })
    if (root == false) {
        childArray.forEach(function(item) {
            if (name == item.title) {
                image = item.image
                text = item.text
            }
        })
    }
    var header = `<h1>${name}</h1>`
    var imageField = `<div id="image"><img src="${image}" alt="${name}"/></div>`
    var textField = `<div id="desc"><p>${text}</p></div>`    
    var block = `${header}<div class="viewm">${imageField}${textField}</div>`
    vm.innerHTML = block
}

// function open(className) {
//     linkToParent = className;
//     openModalWindow();
// }

function add() {
    var select = document.getElementById("selectType").value;
    var header = document.getElementById("elemHead").value;
    if (header != "") {
        var newElement = {}
        var desc = ""
        var imagelink = ""

        if (select == 2) {
            desc = document.querySelector("#descriptionField").value;
            imagelink = document.getElementById("imageLink").value;
            if (desc != "" && imagelink != "") {
                newElement = {"title": header, "image": imagelink, "text": desc}
                listB.push(newElement)
            }
        } else {
            newElement = {"title": header, "children": []}
            listA.push(newElement)
        }
        if (select == 1 || (select == 2 && (desc != "" && imagelink != ""))) {
            document.getElementById("elemHead").value = "";
            document.querySelector("#descriptionField").value = "";
            document.getElementById("imageLink").value = "";

            if (linkToParent != 'rootAdd') {
                var search = true;
                for(let i = 0; i < listA.length && search; i++) {
                    if (listA[i].title == linkToParent) {
                        search = false;
                        listA[i].children.push(header);
                    }
                }
                //set children in localStorage
                if (countNew != 0) {
                    for (let i = 1; i <= countNew; i++) {
                        var type = localStorage.getItem(`type${i}`)
                        if (type == 'A') {
                            var title = localStorage.getItem(`title${i}`)
                            if (title == linkToParent) {
                                var cCount = parseInt(localStorage.getItem(`childrenCount${i}`))
                                var cNames = []
                                for (let j = 1; j <= cCount; j++) {
                                    cNames.push(localStorage.getItem(`children${i}${j}`))
                                }
                                cCount++;
                                cNames.push(header)
                                localStorage.removeItem(`childrenCount${i}`)
                                localStorage.setItem(`childrenCount${i}`, cCount)
                                for (let j = 1; j <= cCount; j++) {
                                    localStorage.setItem(`children${i}${j}`, cNames[j-1])
                                }
                            }
                        }
                    }
                }
                //add dependencies
                search = true;
                for(let i = 0; i < rootArray.length && search; i++) {
                    if (rootArray[i].title == linkToParent) {
                        search = false;
                        rootArray[i].children.push(header);
                    }
                }
                if (search) {
                    for(let i = 0; i < childArray.length && search; i++) {
                        if (childArray[i].title == linkToParent) {
                            search = false;
                            childArray[i].children.push(header);
                        }
                    }
                }
                childArray.push(newElement);
            } else if (linkToParent == 'rootAdd') {
                rootArray.push(newElement);
            }
            //to localStorage
            countNew++;
            var getCount = localStorage.getItem('countNew');
            if (getCount != "undefined" || getCount != "null") {
                localStorage.setItem('countNew', countNew)
            }
            else {
                localStorage.removeItem('countNew')
                localStorage.setItem('countNew', countNew.toString)
            }
            if (select == 1) {
                localStorage.setItem(`type${countNew}`, 'A')
                localStorage.setItem(`title${countNew}`, header)
                localStorage.setItem(`childrenCount${countNew}`, '0')
                localStorage.setItem(`children${countNew}1`, '')
                localStorage.setItem(`parent${countNew}`, linkToParent)
            }
            else {
                localStorage.setItem(`type${countNew}`, 'B')
                localStorage.setItem(`title${countNew}`, header)
                localStorage.setItem(`image${countNew}`, imagelink)
                localStorage.setItem(`text${countNew}`, desc)
                localStorage.setItem(`parent${countNew}`, linkToParent)
            }
            //add to page
            if (select == 2) {
                var inside = document.querySelector(`#${linkToParent}Button`)
                var listInside = `<li class=${header}><input type="button" onclick="view(${buttonId})" value="${header}" id="${buttonId}"></li>`
                buttonId++;
                inside.insertAdjacentHTML("beforebegin", listInside)
            } else {
                var inside = document.querySelector(`#${linkToParent}Button`)
                var listInside = `<li class=${header}><input type="button" onclick="hide(${buttonId})" value="[+] ${header}" id="${buttonId}"></li>`
                buttonId++;
                inside.insertAdjacentHTML("beforebegin", listInside)

                var ulNew = document.querySelector(`.${header}`)
                var cN = `${header}List`
                var ulAdd = `<ul class=${cN} style="display: none">`
                ulNew.insertAdjacentHTML("beforeend", ulAdd)

                document.getElementsByClassName('addBtn')
                for (var i = 0; i < addBtn.length; i++) {
                    addBtn[i].removeEventListener('click', openModalWindow, false)
                }

                var btn = document.querySelector(`.${cN}`)
                var addButtonId = `${header}Button`
                var addButton = `<input type="button" id="${addButtonId}" class="addBtn" value="Добавить элемент"/>`
                btn.insertAdjacentHTML("beforeend", addButton)

                var ulAdd = `</ul>`
                ulNew.insertAdjacentHTML("beforeend", ulAdd)

                document.getElementsByClassName('addBtn')
                for (var i = 0; i < addBtn.length; i++) {
                    addBtn[i].addEventListener('click', openModalWindow, false)
                }
            }
        }
    }
    //push to listA or listB
    //push to childarray
    //push to children
    //localstorage
    //adjacent
}

window.onload = function() {
    var countOld = localStorage.getItem('countNew');
    if (countOld != "undefined" || countOld != "null") {
        countInt = parseInt(countOld)
        for (let i = 1; i <= countInt; i++) {
            var type = localStorage.getItem(`type${i}`)
            var title = localStorage.getItem(`title${i}`)
            if (type == 'A') {
                var cCount = parseInt(localStorage.getItem(`childrenCount${i}`))
                var cNames = []
                for (let j = 1; j <= cCount; j++) {
                    cNames.push(localStorage.getItem(`children${i}${j}`))
                }
                dlElement = {"title": title, "children": cNames}
                listA.push(dlElement)
            }
            else if (type == 'B') {
                var image = localStorage.getItem(`image${i}`)
                var desc = localStorage.getItem(`text${i}`)
                dlElement = {"title": title, "image": image, "text": desc}
                listB.push(dlElement)
            }
            var parent = localStorage.getItem(`parent${i}`)
            if (parent != 'rootAdd') {
                search = true;
                for(let i = 0; i < listA.length && search; i++) {
                    if (listA[i].title == parent) {
                        search = false;
                        listA[i].children.push(title);
                    }
                }
            }
        }
    }
}