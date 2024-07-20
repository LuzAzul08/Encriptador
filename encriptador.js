const btnEncriptar = document.querySelector(".btn__encriptar");
const btnDesencriptar = document.querySelector(".btn__desencriptar");
const txtEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".texto__aviso");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".tarjeta__contenedor")
const btnCopiar = document.querySelector(".btn__copiar");

const abecedario = {
    a: "ai",
    b: "",
    c: "",
    d: "",
    e: "enter",
    f: "",
    g: "",
    h: "",
    i: "imes",
    j: "",
    k: "",
    l: "",
    m: "",
    n: "",
    o: "ober",
    p: "",
    q: "",
    r: "",
    s: "",
    t: "",
    u: "ufat",
    v: "",
    w: "",
    x: "",
    y: "",
    z: ""

}
//------Boton de Encriptar------//
btnEncriptar.addEventListener("click", e=>{
    e.preventDefault();
    console.log('click');
    let texto = ''
    texto = txtEncriptar.value;
    
    let txt = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g,"");
    

    if(texto == ""){
        aviso.classList.add('vacio')
        aviso.textContent = "No se encontró texto";
        setTimeout(()=>{
            aviso.classList.remove('vacio')
        },600);
    }

    else if(texto !== txt){
        aviso.classList.add('vacio')
        aviso.textContent = "No debe tener tildes, ni caracteres especiales";

        setTimeout(()=>{
            aviso.classList.remove('vacio')
        },600);
    }
    
    else if(texto !== texto.toLowerCase()){
        aviso.classList.add('vacio')
        aviso.textContent = "El texto debe estar escrito en minúsculas";

        setTimeout(()=>{
            aviso.classList.remove('vacio')
        },1000);

        txtEncriptar.select();
    }

    else{
        texto = texto.split('').map(item => (abecedario[item] ? abecedario[item]: item)).join('')

        respuesta.innerHTML = texto
        btnCopiar.style.visibility = "inherit";
        contenido.remove();
    }
});

//------Boton de Desencriptar------//
btnDesencriptar.addEventListener("click", e=>{
    e.preventDefault();
    let texto = ''
    texto = txtEncriptar.value;
    let txt = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g,"");
    
    if(texto == ""){
        aviso.style.background = "#0A3871";
        aviso.style.color = "#FFFFFF";
        aviso.style.fontWeight = "800";
        aviso.textContent = "El campo de texto no debe estar vacío";

        setTimeout(()=>{
            aviso.removeAttribute("style");
        },600);
    }

    else if(texto !== txt){
        aviso.style.background = "#0A3871";
        aviso.style.color = "#FFFFFF";
        aviso.style.fontWeight = "800";
        aviso.textContent = "No debe tener tildes, ni caracteres especiales";

        setTimeout(()=>{
            aviso.removeAttribute("style");
        },600);
    }
    
    else if(texto !== texto.toLowerCase()){
        aviso.style.background = "#0a38718a";
        aviso.style.color = "#FFFFFF";
        aviso.style.fontWeight = "800";
        aviso.textContent = "El texto debe estar escrito en minúsculas";

        setTimeout(()=>{
            aviso.removeAttribute("style");
        },600);
    }
    
    else{
        let aux = ''
        let arrayWords = []
        texto.split('').forEach( (letter, i) => {
            aux = aux + letter
            if (aux.length >= 2 || aux == ' ') {
                arrayWords = [...arrayWords,aux]
                aux = ''
            }
            
        }  )
        
        
        const keys  = Object.keys(abecedario)
        const values  = Object.values(abecedario)
        
        const encrypt = arrayWords.map(item => {
            const searchValue = values.findIndex(value => value === item )
            if (searchValue !== -1) {
                return keys[searchValue]
            }else{
                return item
            }
        } )
        
        console.log(encrypt.join(''));

        respuesta.innerHTML = encrypt.join('')
        btnCopiar.style.visibility = "inherit";
        contenido.remove();
    }

});

//------Boton de Copiar------//
btnCopiar.addEventListener("click", (e)=>{
    e.preventDefault(); 

    navigator.clipboard.writeText(respuesta.value)
  
    
});
