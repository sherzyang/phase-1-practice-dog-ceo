
function allActions(){
    
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all"; 

    // Add CSS sheet to DOM 
    let link = document.createElement("link")
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "./main.css";
    document.head.appendChild(link);

    // Fetch images  
    fetch(`${imgUrl}`)
    .then((resp)=> resp.json())
    .then(data => renderImages(data))

    // Fetch dog breed data 
    fetch(`${breedUrl}`)
    .then((resp)=>resp.json())
    .then(dataBreeds => renderBreeds(dataBreeds))
    
    // Render images on DOM 
    function renderImages(data){
        let dogImages = document.getElementById("dog-image-container");
        let p;
        let pictures = data.message;
        function showPictures(item){
            p = document.createElement("p");
            dogImages.appendChild(p)
            p.innerHTML = `<img src="${[item]}">`;
        }
        pictures.forEach(showPictures)
    }

    // Add style to selected breeds 
    function addColor(toClick){
        toClick.target.classList.add("myStyle");
    }

    // Render the entire list of dog breeds on DOM 
    let pageList; 
    let li;

    function renderBreeds(dataBreeds){
        pageList = document.getElementById("dog-breeds")
        let toClick;
        let breeds = Object.keys(dataBreeds.message);
        function getBreeds(item, index){
            li = document.createElement("li");
            pageList.append(li);
            li.innerText = item;
            li.id = index;
            toClick = document.getElementById(index);
            toClick.addEventListener("click", addColor);
        }
        breeds.forEach(getBreeds)
    }

    // Enable filter functionality 
    let dropdown = document.getElementById("breed-dropdown");

        // Create an all-list option in dropdown
        // let option = document.createElement("option");
        // dropdown.appendChild(option);
        // option.value = "all"
        // option.innerText = "All letters"

        // Create a newList container for the filtered content  
        let ul = document.createElement("ul");
        let select = document.querySelector("select");
        select.after(ul);
        ul.id = "filtered-breed-list"
        let shortList = document.getElementById("filtered-breed-list");

        // Filter by letter 
        function filterLetter(){

            // pageList.style.display = 'hidden';
            let letter = this.value;
            pageListChildren = document.getElementById("dog-breeds").children
            let allBreeds = []
            let allOne = [];
            
            for (i=1; i < pageListChildren.length; i++){
                allBreeds.push(pageListChildren[i].innerText);
            }

            
            function doggieFilter(item){
                if (item[0] == letter){
                    allOne.push(item)
                    
                }
                else {
                    console.log("Something went wrong")
                }
            }

            allBreeds.filter(doggieFilter)
            p = document.createElement('p');
            shortList.appendChild(p);
            p.innerText = allOne;

        }

        // When dropdown is selected, use filterLetter to create a new list 
        dropdown.onchange = filterLetter; 

    
}

// Wait until DOM is loaded before executing actions
document.addEventListener("DOMContentLoaded", allActions);



