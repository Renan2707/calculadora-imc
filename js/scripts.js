const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

const imcTable = document.querySelector("#imc-table")
const alturaInput = document.querySelector("#altura")
const pesoInput = document.querySelector("#peso")
const calcular = document.querySelector("#calcular")
const btnLimpar = document.querySelector("#limpar")
const btnVoltar = document.querySelector("#btn-voltar")
const imcNumber = document.querySelector("#imc-number span")
const imcInfo = document.querySelector("#imc-info span")
const calculadora = document.querySelector("#calculadora")
const resultado = document.querySelector("#resultado")


//Funções

function createTable(data){
    data.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("flex","w-full", "justify-between", "text-center", "text-gray-300","border-b","border-gray-600","p-1", "mt-1")

        const classification = document.createElement("p");
        classification.classList.add("text-sm","w-56")
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.classList.add("text-sm","w-40")
        
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.classList.add("text-sm","w-32")

        obesity.innerText = item.obesity;
        
        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div)
    });
}

function limpar(){
    alturaInput.value =""
    pesoInput.value =""
    imcInfo.classList="";
    imcNumber.classList="";
}

function validDigits(text){
    return text.replace(/[^0-9,]/g,"");
}

function calcularIMC(altura,peso){
    const imc = (peso / (altura * altura)).toFixed(1);
    return imc;
}

function esconderOUmostrarCalculadora(){
  calculadora.classList.toggle("hidden")
  resultado.classList.toggle("hidden")
}


//Inicialização
createTable(data);

//Eventos
btnLimpar.addEventListener("click",(e)=>{
    e.preventDefault;
    limpar();
});

[alturaInput,pesoInput].forEach((el)=>{
    el.addEventListener("input",(e)=>{
        const updateValue = validDigits(e.target.value);

        e.target.value = updateValue;
    });
});

calcular.addEventListener("click",(e)=>{
    e.preventDefault();
    
    const peso = +pesoInput.value.replace(",",".")
    const altura = +alturaInput.value.replace(",",".")

    if(!altura || !peso) return;
    const imc = calcularIMC(altura,peso)

    let info;

    data.forEach((item)=>{
      if(imc>=item.min && imc <=item.max){
        info = item.info
      }
    });
    if(!info) return;

    imcNumber.innerText = imc
    imcInfo.innerText = info

    switch(info){
      case "Magreza":
        imcInfo.classList.add("text-yellow-400");
        imcNumber.classList.add("text-yellow-400");
        break;
      case "Normal":
        imcInfo.classList.add("text-green-400");
        imcNumber.classList.add("text-green-400");
        break;
      case "Sobrepeso":
        imcInfo.classList.add("text-orange-400");
        imcNumber.classList.add("text-orange-400");
        break;
      case "Obesidade":
        imcInfo.classList.add("text-red-400");
        imcNumber.classList.add("text-red-400");
        break;
      case "Obesidade grave":
        imcInfo.classList.add("text-red-600");
        imcNumber.classList.add("text-red-600");
        break;
    }



    esconderOUmostrarCalculadora();




    })
    

btnVoltar.addEventListener("click",()=>{
  limpar();
  esconderOUmostrarCalculadora();
})