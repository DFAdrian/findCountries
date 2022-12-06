const check = document.getElementById('check');
const body = document.querySelector('body');
const card = document.querySelectorAll('.card');
const nav = document.querySelector('nav');
const cardsSection = document.getElementById('cards-section');
const select = document.getElementById('select');
const searchInp = document.getElementById('search-input')
// fragment to show data 
const fragment = document.createDocumentFragment();

// dark mode and web storage 

const darkMode =(a,b,c)=>{
    a.classList.toggle('dark')
    b.forEach(el=> el.classList.toggle('dark-two')) 
    c.classList.toggle('dark-two')
}

check.addEventListener('change',()=>{
    sessionStorage.setItem('dark','true')
    darkMode(body,card,nav) 
    
    if(!check.checked){
        sessionStorage.setItem('dark','false')
    }
})


if(sessionStorage.getItem('dark')!== 'true') {
    body.classList.remove('dark')
    nav.classList.remove('dark-two')
    card.forEach(el=> el.classList.remove('dark-two'))
    check.removeAttribute('checked')
}else{
    body.classList.add('dark')
    nav.classList.add('dark-two')
    card.forEach(el=> el.classList.add('dark-two'))
    check.setAttribute('checked',true)
}

        
        // fetch data 


const  getData = async()=>{
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json()
    console.log(response.ok)
    return data 
}

    // display data 

const showData =()=>{
    getData().then(res=>{
        res.map(el=>{
            const a = document.createElement('a');
            a.setAttribute('href',`https://en.wikipedia.org/wiki/${el.name.common}`)
            a.setAttribute('target','_blank')
            a.setAttribute('class','card')   
            a.setAttribute('value',`${el.region.toLowerCase()}`)   
            a.innerHTML = `
            <img src=${el.flags.png} class="card__img" class='card__img' alt='${el.name.common} flag'/>
            <h3 class='card__country'>${el.name.common}</h3></h3>
            <p class='card__text'>Population: <span class='span-data'>${el.population}</span></p>
            <p class='card__text'>Region: <span class='span-data'>${el.region}</span></p>
            <p class='card__text'>Capital: <span class='span-data'>${el.capital}</span></p>`
            fragment.appendChild(a)

            })
            cardsSection.appendChild(fragment)
        })
}

showData()

    // filter cards 

select.addEventListener('change',()=>{
    document.querySelectorAll('a').forEach(el=>{
        if(select.value !== el.attributes[3].nodeValue){
            el.classList.add('hide')
        }else{
            el.classList.remove('hide')
        }
        if(select.value === 'regions'){
            el.classList.remove('hide')
        }
    })
})


    // find country 

searchInp.addEventListener('change',()=>{
    document.querySelectorAll('a').forEach(el=>{
        if(searchInp.value.toLowerCase() !== el.children[1].firstChild.textContent.toLowerCase()){
            el.classList.add('hide')
        }else{
            el.classList.remove('hide')
        } 
        if(searchInp.value == ''){
            el.classList.remove('hide')
        }
    })
})
