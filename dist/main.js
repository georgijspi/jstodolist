const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("toDoTemplate");
const ADD_BUTTON = document.getElementById("add");

let items = getItems();

function getItems() {
    const value = localStorage.getItem("todo") || "[]";

    return JSON.parse(value);

}

function setItems(items) {
    const itemsJson = JSON.stringify(items);

    localStorage.setItem("todo", itemsJson);
}

function formatDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const hour = String(currentDate.getHours()).padStart(2, '0');
    const minute = String(currentDate.getMinutes()).padStart(2, '0');
  
    return `${day}/${month} ${hour}:${minute}`;
  }

function addItem() {
    items.unshift({
        description: "",
        itemCreated: formatDate(),
        completed:false
    });

    setItems(items);
    refreshList();
}

function updateItem(item, key, value) {
    item[key] = value;

    setItems(items);
    refreshList();
}

function refreshList() {
    items.sort((a, b) => {
        if (a.itemCreated > b.itemCreated) {
            return 1;
        }

        if (b.itemCreated < a.itemCreated) {
            return -1;
        }

        return a.completed < b.completed ? -1 : 1;
    });

    ITEMS_CONTAINER.innerHTML = "";

    for (const item of items) {
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
        console.log("itemElement:", itemElement); // Check if this is valid
    
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector("#check")
        const dateCreated = itemElement.querySelector(".itemCreated");
    
        if (itemElement) {
            dateCreated.textContent = item.itemCreated;
            descriptionInput.value = item.description;
            completedInput.checked = item.completed;
    
            descriptionInput.addEventListener("change", () => {
                updateItem(item, "description", descriptionInput.value);
            });
    
            completedInput.addEventListener("change", () => {
                console.log("Completed input changed:", completedInput.checked);
    
                updateItem(item, "completed", completedInput.checked);
                const toggleButton = itemElement.querySelector(".toggle-button");
                if (item.completed) {
                    toggleButton.classList.add("peer-checked");
                    descriptionInput.classList.add("line-through");
                } else {
                    toggleButton.classList.remove("peer-checked");
                }
            });
    
            ITEMS_CONTAINER.append(itemElement);
        } else {
            console.log("itemElement is null");
        }
    }
    

}


ADD_BUTTON.addEventListener("click", () => {
    addItem();
});

refreshList();