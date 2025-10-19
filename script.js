let searchBar = document.querySelector("#src");
let searchBtn = document.querySelector(".btn");
let Saruku = document.querySelector('.saruku');
let mainSection = document.querySelector(".sec");
const RecHead = document.querySelector(".top h1");
let disIng = document.querySelector(".disIng");
let disIns = document.querySelector(".disIns");
const header = document.querySelector(".head");
const disInsp = document.querySelector(".disIns p");
const disInsa = document.querySelector(".disIns button a");


const displayIng = (meals) => {
    disIng.innerHTML = `
    <div style = "display : flex; justify-content : space-evenly; gap : 130px;">
    <h2 style = "font-size : 2rem;">Ingredients</h2>
    <span id="crossMark1" style="cursor:pointer;font-size:24px; margin-top = 10px; margin-right : 10px;">✖</span>
    </div>
    `;
    mainSection.style = "pointer-events : none";
    disIng.style.display = "block";
    header.style.filter = "blur(3px)"
    mainSection.style.filter = "blur(3px)"
    for(let i = 1;i <= 20;i++) {
        let I = meals[`strIngredient${i}`]
        let M = meals[`strMeasure${i}`]
        if(I.toString().trim() != "")
            {
                disIng.innerHTML += `
                <p>${i}. ${I} - ${M}</p>
                `
            }
    }
    const cross = document.querySelector("#crossMark1");
    cross.addEventListener('click',() => {
    disIng.style.display = "none";
    header.style.filter = "blur(0px)";
    mainSection.style.filter = "blur(0px)";
    mainSection.style = "pointer-events : auto";
    })
}
const displayIns = (meals) => {
    mainSection.style = "pointer-events : none";
    disIns.style = "display : block;"
    header.style.filter = "blur(3px)"
    mainSection.style.filter = "blur(3px)"
    disInsp.innerHTML = `<p>${meals.strInstructions}</p>`;
    disInsa.innerHTML = "Watch Making Video"
    disInsa.setAttribute("href", `${meals.strYoutube}`);
    const cross = document.querySelector("#crossMark2");
    cross.addEventListener('click',() => {
    disIns.style.display = "none";
    header.style.filter = "blur(0px)";
    mainSection.style.filter = "blur(0px)";
    mainSection.style = "pointer-events : auto";
    })
}


const RandomRecipe_append = async (load) => {
    let frag = document.createDocumentFragment();
    for(let i = 0;i < 10;i++)
        {
            let Ran_data = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            let Ran_Response = await Ran_data.json();
            let mealName = Ran_Response.meals[0].strMeal.toString();
            let newMealName = "";
            if(mealName.length > 30) {
                newMealName = mealName.substring(0, 20) + "...."
            }
            else {
                newMealName = mealName;
            }
            let mealdiv = document.createElement('div')
            mealdiv.classList.add('cont1');
            mealdiv.innerHTML = `
            <img src="${Ran_Response.meals[0].strMealThumb}" alt="">
            <h3>${newMealName}</h3>
            <div class="subhead">
            <h5 class = "info">Area : ${Ran_Response.meals[0].strArea}</h5>
            <h5 class = "info">Category : ${Ran_Response.meals[0].strCategory}</h5>
            </div>
            <div class="subBtn">
            <button class="lbtn" id = "sbtn"><span>Instructions</span></button>
            <button class="lbtn" id = "gbtn"><span>Ingredients</span></button>
            </div>
            `;
            frag.appendChild(mealdiv);
            const Ingredient = mealdiv.querySelector("#gbtn");
            const Instruction = mealdiv.querySelector("#sbtn");
            Ingredient.addEventListener('click',() => displayIng(Ran_Response.meals[0]));
            Instruction.addEventListener('click',() => displayIns(Ran_Response.meals[0]));
        }
        load.innerHTML = "";
        mainSection.style.display = "block"
        RecHead.style.display = "block";
        mainSection.style.height = "auto";
        Saruku.appendChild(frag);
}

const BeforeRanDis = () => {
    let load = document.createElement('h1');
    load.innerHTML = "Loading...."
    mainSection.appendChild(load);
    mainSection.style = "display : flex; align-items : center; justify-content : center; height: 90vh";
    setTimeout(() => RandomRecipe_append(load), 1000);
}
const printSearchResponse = (response, load1) => {
    let frag1 = document.createDocumentFragment();
    response.meals.forEach(element => {
        let mealName = element.strMeal.toString();
            let newMealName = "";
            if(mealName.length > 30) {
                newMealName = mealName.substring(0, 20) + "...."
            }
            else {
                newMealName = mealName;
            }
            let mealdiv = document.createElement('div')
            mealdiv.classList.add('cont1');
            mealdiv.innerHTML = `
            <img src="${element.strMealThumb}" alt="">
            <h3>${newMealName}</h3>
            <div class="subhead">
            <h5 class = "info">Area : ${element.strArea}</h5>
            <h5 class = "info">Category : ${element.strCategory}</h5>
            </div>
            <div class="subBtn">
            <button class="lbtn" id = "sbtn"><span>Instructions</span></button>
            <button class="lbtn" id = "gbtn"><span>Ingredients</span></button>
            </div>
            `;
            frag1.appendChild(mealdiv);
            const Ingredient = mealdiv.querySelector("#gbtn");
            const Instruction = mealdiv.querySelector("#sbtn");
            Ingredient.addEventListener('click',() => displayIng(element));
            Instruction.addEventListener('click',() => displayIns(element));
        });
    load1.innerHTML = "";
    mainSection.style.display = "block"
    RecHead.style.display = "block";
    mainSection.style.height = "auto";
    Saruku.replaceChildren(frag1);
}
const RecipeData = async (query) => {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    let response = await data.json();
    RecHead.innerHTML = `${query}`;
    if(!(response.meals === null)) {
        Saruku.innerHTML =  "";
        let load1 = document.createElement('h1');
        load1.innerHTML = "Loading...."
        Saruku.appendChild(load1);
        Saruku.style = "display : flex; align-items : center; justify-content : left; flex-wrap : wrap;margin : 0px 70px;";
        printSearchResponse(response, load1);
    }
    else {
        Saruku.innerHTML =  "";
        let load1 = document.createElement('h1');
        load1.innerHTML = "Not Found ! ! !"
        load1.style = "text-align : center";
        Saruku.appendChild(load1);
        Saruku.style = "display : flex; align-items : center; justify-content : center; height: 90vh";
    }
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchData = searchBar.value.trim();
    RecipeData(searchData);
})
BeforeRanDis();