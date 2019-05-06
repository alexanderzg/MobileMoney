//Creates todo item on enter key pressed
$('.add-todo').on('keypress',function (e) {
      e.preventDefault
      if (e.which == 13) {
           if($(this).val() != ''){
                var todo = $(this).val();
                createTodo(todo); 
           }
      }
});

//Initial task count
countTodos();

//Creates the DOM object representation of the item
function createTodo(text){
    var markup = 
    '<li class="ui-state-default"> <div class="row"><label class="custom-checkbox pt-2 col-10"> <i class="far fa-square pt-2"></i>&nbsp;'+text+'</label><button id="removeButton" class="remove-item btn removeButton"><i class="fas fa-times"></i></button></div><hr class="mb-0 mt-1"></li>';
    $(markup).appendTo("#sortable").hide().slideDown();
    $('.add-todo').val('');
    countTodos();
}

//Save all items to localstorage
$("#saveAll").click(function(){
    var myArray = [];

    $('#sortable li').each( function() {
         myArray.push($(this).children().children().text().trim());   
    });
    
    localStorage.setItem('todoList', JSON.stringify(myArray));
    $('#sortable li').each( function() {
        $(this).slideUp("slow", function() { 
            $(this).remove();
            countTodos();   
        });
        
   });
    
});

//Retrieves all items from local storage
$("#getAll").click(function(){
    var retrievedObject = JSON.parse(localStorage.getItem('todoList'));
    for (i = 0; i < retrievedObject.length; i++) {
        createTodo(retrievedObject[i].trim());
    }
});

//Removes all items from the Completed tasks section
$("#clearAll").click(function(){
    $('#done-items li').each( function() {
        $(this).slideUp("slow", function() { 
            $(this).remove();
        });   
   });
});

//Mark task as completed
$('.todolist').on('click','#sortable li .custom-checkbox',function(){
    var doneItem = $(this).parent().parent().find('label').text();
    removeItem(this);
    done(doneItem);
    
});

//Removes tasks from todo list
$('.todolist').on('click','.remove-item',function(){
    removeItem(this);
});

//Returns the items from Completed Tasks Section to the TODO list section
$('.todolist').on('click','.undo',function(){
   var task = $(this).parent().text();
   createTodo(task.trim());
   removeItem(this);
});

//Count current tasks
function countTodos(){
    var count = $("#sortable li").length;
    $('.count-todos').html(count);
}

//Adds item to the Completed Tasks Section
function done(doneItem){
    var done = doneItem;
    var markup = '<li> <span class="row pt-1"><span class="col-10 pt-2"><i class="fas fa-check mr-2"></i>'+ done.trim() +'</span><button class="undo btn bkg-color"><i class="fas fa-undo"></i></button></span><hr class="mb-0 mt-1"></li>';
    $(markup).appendTo("#done-items").hide().slideDown();
    $('.remove').remove();
    countTodos();
}

//Removes task from the DOM
function removeItem(element){
    $(element).parent().parent().slideUp("slow", function() { 
        $(this).remove();
        countTodos();
    }); 
}