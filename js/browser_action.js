function loadItems() {
    /* uses get() to get data from storage */
    chrome.storage.sync.get(['todo'], function(result) {
        var todo = []

        if (result && result.todo && result.todo.trim() != '') {
            /* parse and get the arrray since it is saved as a string */
            todo = JSON.parse(result.todo)
        }

        console.log('todo.length = ' + todo.length)

        for (var i = 0; i < todo.length; i++) {
            item = todo[i]

            if (item && item.trim() !== '') {
                /*append items into list*/
                var list = document.getElementById('list')
                var entry = document.createElement('li')
                var text = document.createTextNode(item)

                entry.appendChild(text)
                list.appendChild(entry)
            }
        }
    })
}

/*Show to do items onto popup*/
document.addEventListener('DOMContentLoaded', function(){
    console.log('Inside doc.loaded()')

    loadItems()
})

/* Save the to-do item upon button click */
document.getElementById('btn').addEventListener('click', function (ev) {
    console.log('Inside btn.click()')
    
    text = document.getElementById('txt').value
    
    if (text && text.trim() !== '') {
    
     /* First get() old data as calling set() will replace it */
     chrome.storage.sync.get(['todo'], function(result) {
      var todo = []
    
      if (result && result.todo && result.todo.trim() !== '') {
       /* Parse and get the array as it is saved as a string */
       todo = JSON.parse(result.todo)
      }
    
      todo.push(text)
    
      chrome.storage.sync.set({'todo': JSON.stringify(todo)}, function() {
       /* Data is saved now */
    
       var list = document.getElementById('list')
    
       while (list.firstChild) {
        list.removeChild(list.firstChild)
       }
    
       loadItems()
      })
     })
    }
   })