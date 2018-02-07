function main() {
    const itemsList = document.querySelector('.plates');
    const addItems = document.querySelector('.add-items');
    // Get the data in the localStorage using the key 'items'
    // if that is not available, then create an empty array
    // We know that the data is simply a json stored in string format.
    // The data is converted to an array of objects
    const items = JSON.parse(localStorage.getItem('items')) || [];

    function addItem(e) {
        // We are listening for a submit event on a form
        // We want to prevent the page from submitting the form data to the server 
        // (which we don't have) and the reload that happens. So we are preventing
        // that default behavior(or any set of default behaviors)
        e.preventDefault();
        // The 'this' is the form tag. Now we are looking inside the form tag for a tag
        // with the name 'item'. This is helpful in narrowing down the search of a tag
        const text = (this.querySelector('[name=item]')).value;
        const item = {
            text,
            done: false
        }
        items.push(item);
        populateList(items, itemsList);
        // localStorage only stores string. Anything other than string is converted to string
        // JSON.stringify(items) converts the array of objects named items into a json string
        // It is string. But in json format.
        localStorage.setItem('items',JSON.stringify(items));
        // form elements have a method on them that resets the entire form
        this.reset();
    }
    function toggleDone(e){
        if(!e.target.matches('input'))return;
        const el = e.target;
        const index = el.dataset.index;
        // Toggle the done value here. If true, that becomes false, and vice versa
        items[index].done = !items[index].done;
        localStorage.setItem('items',JSON.stringify(items));
        populateList(items,itemsList);
    }

    function populateList(plates = [], platesList) {
        // Constructing one giant string of li elements
        // The map returns an array, so we are joining all the array elements together through join
        platesList.innerHTML = plates.map((p, i) => {
            return `
                <li>
                    <input type="checkbox" data-index=${i} id="item${i}" ${p.done?'checked':''}></input>
                    <label for="item${i}">${p.text}</label>
                </li>
            `;
        }).join('');
    }
    // By listening to submit event, we cover click, enter by key etc
    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click',toggleDone);
    populateList(items, itemsList);
}