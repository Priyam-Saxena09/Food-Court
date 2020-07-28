const main = document.querySelector(".container");
const cont = document.querySelector(".cont");
const container = document.querySelector(".cont1");
const sub = document.querySelector(".subcont");
const recip = [];
const ide = [];
document.getElementById("button").addEventListener("click",() => {
    const food = document.getElementById("text").value;
    cont.innerHTML = ``;
    document.getElementById("button").setAttribute("disabled","disabled");
    fetch("http://localhost:3000/food?q=" + food).then((response) => {
        response.json().then((data) => {
            if(data.err)
            {
                const div = document.createElement("div");
                div.innerHTML = `<h3>Not Found.Try another search.</h3>`;
                cont.insertAdjacentElement("beforeend",div);
                document.getElementById("button").removeAttribute("disabled");
                return;
            }
            for(let i=0;i<data.recipes.length;i++)
            {
            const div = document.createElement("div");
            div.innerHTML = `<h3>${data.recipes[i].title}</h3>
                              <p>${data.recipes[i].publisher}</p>`;
            cont.insertAdjacentElement("beforeend",div);
            recip.push(data.recipes[i].title);
            ide.push(data.recipes[i].recipe_id);
            }           
            document.getElementById("button").removeAttribute("disabled");     
        })
    })
})


cont.addEventListener("click",(e) => {

    main.style.animation = "none";
    cont.style.animation = "none";
    container.style.animation = "none";
    sub.style.animation = "none";
    var num = 0;
    for(let j=0;j<recip.length;j++)
    {
        if(recip[j] == e.target.textContent)
        {
              num = j;
              break;
        }
    }
    
    const ID = ide[num];
    fetch("http://localhost:3000/id?id=" + ID).then((response) => {
        response.json().then((data) => {
            if(data.err)
            {
                container.innerHTML = `${data.err}`;
                return;
            }
            container.classList.remove("hide");
            sub.classList.remove("hide");
            main.style.animation = "c2 5s 1";
            cont.style.animation = "c2 5s 1";
            container.style.animation = "c1 5s 1";
            sub.style.animation = "c1 5s 1";
            container.innerHTML = `<img src = "${data.url}">
            <h1>${data.title}</h1>
            <p>Ingredients:</p>`;
            sub.innerHTML = ``;
            for(let k=0;k<data.ingredients.length;k++)
            {
                const p = document.createElement("p");
                p.innerHTML = `${data.ingredients[k]}`;
                sub.insertAdjacentElement("beforeend",p);
            }            
            container.insertAdjacentElement("beforeend",sub);
            const elem = document.createElement("div");
            elem.innerHTML = `<h4>How to cook it?Go through this <a href = "${data.surl}" target="_blank">Link</a></h4>
                              <h4>Want to search more food items?</h4><input type = "button" id="back" value = "Go Back">`;
            container.insertAdjacentElement("beforeend",elem);
            setTimeout(() => {
            main.classList.add("hide");
            cont.classList.add("hide");
            },5000);
        })
    })
})
container.addEventListener("click",(e) => {
     if(e.target.value == "Go Back")
     {
        main.classList.remove("hide");
        cont.classList.remove("hide");
        main.style.animation = "none";
        cont.style.animation = "none";
        container.style.animation = "none";
        sub.style.animation = "none";
        main.style.animation = "c1 5s 1";
        cont.style.animation = "c1 5s 1";
        container.style.animation = "c2 5s 1";
        sub.style.animation = "c2 5s 1";
        setTimeout(() => {
            container.classList.add("hide");
            sub.classList.add("hide");
            },5000);
     }
})