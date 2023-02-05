// henter ut alle html elementene
var svarEl = document.querySelector("#svar");
var prisEl = document.querySelector("#pris");
var stromforbrukEl = document.querySelector("#stromforbruk");
var prismodellEl = document.querySelector("#prismodell");
var sjekkButtonEl = document.querySelector("#sjekk");
var nettleieEl = document.querySelector("#nettleie");

// gir knappen en lytter
sjekkButtonEl.addEventListener("click", skrivSvar);

// funksjon som skriver ut svaret og sjekker at skjemaet ikke er tomt
function skrivSvar(){
    if(stromforbrukEl.value == 0 || prisEl.value == 0){
        svarEl.innerHTML("Du må fylle ut alle feltene for at denne skal fungere.");
    }
    strom = beregnStrom(Number(stromforbrukEl.value), Number( prisEl.value), Number(nettleieEl.value), prismodellEl.value);
    svarEl.innerHTML = "Du betaler omtrent "+ strom.toFixed(2) +" kr i strøm";
}

// funksjon som beregner strømprisen
function beregnStrom(forbruk, pris, nettleie, prismodell){
    var strom = 0;
    if(prismodell=="spot_maned"){
        time_forbruk = forbruk/740;
        strom_priser = [];
        for(let i = 0; i<740;i++){
            // lager en tilfeldig strømpris 
            pris_time = Math.random()*pris;
            // regner ut prisen
            gjennomsnitt = pris_time * time_forbruk;
            // legger til i array
            strom_priser.push(gjennomsnitt);
        }
        strom = beregnStromliste(strom_priser) + nettleie;
    }
    else{
        strom = (pris * forbruk) + nettleie;
    }

    return strom;
}

// en funksjon som regner ut strømprisen for en måned
function beregnStromliste(array){
    var sum = 0;
    for(let i of array){
        sum += i;
    }
    return sum;
}