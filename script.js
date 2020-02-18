'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.todo-control');
    const todoList = document.getElementById('todo');
    const headerInput = document.querySelector('.header-input');
    const completedList = document.getElementById('completed');

    let data = {
        todo: [],
        completed: []
    }; // Здесь мы будем хранить наши данные получаемые из инпута
// функция addItem принимает параметры text=headerInput.value

const dataupdateYoLolalS = function(){
    localStorage.setItem('localData', JSON.stringify(data));
    console.log(localStorage.getItem('localData')); // добовляем объект data LocalStorage
};
 
///////////////////////////////////////////////////////////////////////
//УДАЛЯЕМ ЭЛЕМЕНТ при нажатие на корзину
    const itemRemove = function (elem) {
        const item = elem.parentNode.parentNode; // обращаемся к родителям элемента(1-раз получили btnBlock,2- item(наш li));
        const itemParent = item.parentNode;
        const id = itemParent.id; // получаем id родителя li (он же Ul todo complete)
        const text = item.textContent;
        itemParent.removeChild(item); // Удаляем item из его родителя 

        if (id === 'todo'){
            data.todo.splice(data.todo.indexOf(text), 1); //splice(data.todo.indexOf(text) - Означает что мы будем сплайсить элемент под нужным нам индексом, в количестве 1 штуки
        } else {
            data.completed.splice(data.completed.indexOf(text), 1);
        }

        dataupdateYoLolalS(); // Обновляет LocalStorage после удаления элемента
    };
    const itemComplete = function (elem) {
        const item = elem.parentNode.parentNode; 
        const itemParent = item.parentNode;
        const id = itemParent.id;
        const text = item.textContent;

        let target;
        if (id === 'todo'){ // если item находится в todo то при нажатии его перекинет в completedList
            target = completedList;
        } else {
            target = todoList; // наоборот
        } // Этот блок условий определяет куда мы будем закидывать элемент

        if (id === 'todo'){
            data.todo.splice(data.todo.indexOf(text), 1); //splice(data.todo.indexOf(text) - Означает что мы будем сплайсить элемент под нужным нам индексом, в количестве 1 штуки
            data.completed.push(text);
        } else {
            data.completed.splice(data.completed.indexOf(text), 1);
            data.todo.push(text);
        }


        itemParent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);

        console.log(data);
        dataupdateYoLolalS(); // обновляет LolacStorage после добавления
    };
///////////////////////////////////////////////////////////////////////////////
//СОЗДАЕМ ЭЛЕМЕНТ
    const renderItem = function(text) {
         const item = document.createElement('li');
         const btnBlock = document.createElement('div');
         const btnRemove = document.createElement('button');
         const btnComplete = document.createElement('button');

         item.classList.add('todo-item');
         btnBlock.classList.add('todo-buttons');
         btnRemove.classList.add('todo-remove');
         btnComplete.classList.add('todo-complete'); // Добовляем классы

         item.textContent = text; // принимаем text из функции add

         btnRemove.addEventListener('click', function(event){
             itemRemove(event.target);
         });
         btnComplete.addEventListener('click', function(event){
             itemComplete(event.target); // функция передаед виновника(события) на кого повешенно это событие
         });

         btnBlock.appendChild(btnRemove);
         btnBlock.appendChild(btnComplete);
         item.appendChild(btnBlock);
         /// Создвли полноценный элемент li
        
         todoList.insertBefore(item, todoList.childNodes[0]); // помещаем item(наш li) первым элементом в todoList

    };

    const addItem = function(text) {
        renderItem(text); // передаем текст
        headerInput.value = '';
        data.todo.push(text); // Добовляем текст в массив(он будет хранится там)
        dataupdateYoLolalS(); // обновляется localStorage
    };
/////////////////////////////////////////////////////////////////////////

    // обработчик сабмита
    form.addEventListener('submit', function(event){
        event.preventDefault();// отменяем стандартные события(перезагрузка страницы)

        if(headerInput.value !== ''){
            addItem(headerInput.value); // передаем парметры в функцию 1
        }
         
    });
});
