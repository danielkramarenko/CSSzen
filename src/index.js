let btnFind = document.querySelector('.selector-find');
let btnNextGlobal = document.querySelector('.selector-next');
let btnPrevGlobal = document.querySelector('.selector-prev');
let btnNextLocal = document.querySelector('.nav-right');
let btnPrevLocal = document.querySelector('.nav-left');
let btnParent = document.querySelector('.nav-top');
let btnChild = document.querySelector('.nav-bottom');

let input = document.querySelector('.selector');

let selector = {}; //input value

//add style to the selector
function elementStyle(elem) {
    elem.style.outline = 'solid red 5px';
    elem.style.backgroundColor = 'lightblue';
}
//remove style of the selector
function elementUnstyle(el) {
    el.style.outline = 'none';
    el.style.backgroundColor = '';
}
//button of the input value and the beginning of the mechanism "disabled = false/true"
btnFind.addEventListener("click", function (e) {
    if (document.querySelector(input.value)) {
        if (selector.now != undefined) {
            elementUnstyle(selector.now);
        };
        let elem = document.querySelectorAll(input.value);
        elementStyle(elem[0]);
        selector.now = elem;
        selector.id = 0;
        if (elem[1] != undefined) {
            btnNextGlobal.disabled = false;
            btnPrevGlobal.disabled = true;
        }
        enableNextPrevBtns();
        enabletBottomBtns(elem[0]);
    }
});
//DOM next step button
btnNextGlobal.addEventListener('click', function (e) {
    if (selector.now[selector.id + 1] != undefined) {
        let nextElem = selector.now[selector.id + 1];
        elementUnstyle(selector.now[selector.id]);
        selector.id = selector.id + 1;
        elementStyle(nextElem);
        enableNextPrevBtns();
        enabletBottomBtns(selector.now[selector.id]);
    }
});
//DOM prev step button
btnPrevGlobal.addEventListener('click', function (e) {
    if (selector.now[selector.id - 1] != undefined) {
        let nextElem = selector.now[selector.id - 1];
        elementUnstyle(selector.now[selector.id]);
        selector.id = selector.id - 1;
        elementStyle(nextElem);
        enableNextPrevBtns();
        enabletBottomBtns(selector.now[selector.id]);
    }
});
//DOM.tagNAme next step button
btnNextLocal.addEventListener('click', function (e) {
    if (selector.now.length != undefined) {
        selector.now = selector.now[selector.id];
    }
    if (selector.now.nextElementSibling != undefined) {
        elementUnstyle(selector.now);
        let nextElem = selector.now.nextElementSibling;
        selector.now = nextElem;
        elementStyle(nextElem);
    }
    enabletBottomBtns(selector.now);
});
//DOM.tagNAme prev step button
btnPrevLocal.addEventListener('click', function (e) {
    if (selector.now.length != undefined) {
        selector.now = selector.now[selector.id];
    }
    if (selector.now.previousElementSibling != undefined) {
        elementUnstyle(selector.now);
        let prevElem = selector.now.previousElementSibling;
        selector.now = prevElem;
        elementStyle(prevElem);
    }
    enabletBottomBtns(selector.now);
});
//parent of the element
btnParent.addEventListener('click', function (e) {
    if (selector.now.length != undefined) {
        selector.now = selector.now[selector.id];
    }
    elementUnstyle(selector.now);
    let parentElem = selector.now.parentElement;
    elementStyle(parentElem);
    selector.now = parentElem;
    enabletBottomBtns(selector.now);

});
//first child of the parent
btnChild.addEventListener('click', function (e) {
    if (selector.now.length != undefined) {
        selector.now = selector.now[selector.id];
    }
    if (selector.now.children[0] != undefined) {
        elementUnstyle(selector.now);
        let childElem = selector.now.children[0];
        selector.now = childElem;
        elementStyle(childElem);
    }
    enabletBottomBtns(selector.now);
});
//comparison conditions
function enableNextPrevBtns(el) {
    if (selector.now[selector.id + 1] != undefined) {
        btnNextGlobal.disabled = false;
    } else {
        btnNextGlobal.disabled = true;
    }
    if (selector.now[selector.id - 1] != undefined) {
        btnPrevGlobal.disabled = false;
    } else {
        btnPrevGlobal.disabled = true;
    }
}
//comparison conditions
function enabletBottomBtns(elem) {
    if (selector.now.length == undefined) {
        btnNextGlobal.disabled = true;
        btnPrevGlobal.disabled = true;
    }
    if (elem.parentElement != undefined) {
        btnParent.disabled = false;
    } else {
        btnParent.disabled = true;
    }
    if (elem.children[0] != undefined) {
        btnChild.disabled = false;
    } else {
        btnChild.disabled = true;
    }
    if (elem.nextElementSibling != undefined) {
        btnNextLocal.disabled = false;
    } else {
        btnNextLocal.disabled = true;
    }
    if (elem.previousElementSibling != undefined) {
        btnPrevLocal.disabled = false;
    } else {
        btnPrevLocal.disabled = true;
    }
    if (elem == document.querySelector('body')) {
        btnParent.disabled = true;
        btnNextLocal.disabled = true;
        btnPrevLocal.disabled = true;
    }
}