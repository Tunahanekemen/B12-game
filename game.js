var butonRenkleri = ["kırmızı", "mavi", "yeşil", "sarı"];
var oyunSırası = [];
var kullanıcıSırası = [];
var skor = 0;
var tıklamaizni = false;
var enİyiSkor = 0;
var oyunBaşladı = false;
var seviye = 0;
var sesKutup = {
    "kırmızı": new Audio("sesler/kirmizi.mp3"),
    "mavi": new Audio("sesler/mavi.mp3"),
    "yeşil": new Audio("sesler/yesil.mp3"),
    "sarı": new Audio("sesler/sari.mp3"),
    "yanlis": new Audio("sesler/yanlis.mp3")
};
Object.values(sesKutup).forEach(function(ses) {
    ses.preload = "auto";
    ses.load();
});


var butonlar = document.querySelectorAll(".btn");

butonlar.forEach(function(buton) {
    buton.addEventListener("click", function() {

        
        if (!oyunBaşladı) {
     
            document.querySelector("#başlık").textContent = "Seviye " + seviye;
            
    
            sonrakiTur();
            oyunBaşladı = true;
            
            return; 
        }

        if (!tıklamaizni) return;

        if (kullanıcıSırası.length === oyunSırası.length) return;

        var srenk = this.id;

        kullanıcıSırası.push(srenk);

        animasyon(srenk)

        kontrol(kullanıcıSırası.length - 1);
    });
});
function kontrol(sırano) {
    if (kullanıcıSırası[sırano] === oyunSırası[sırano]) {

        skor++;
        document.querySelector("#skor").textContent = skor;

        if (kullanıcıSırası.length === oyunSırası.length) {

            setTimeout(function() {
                sonrakiTur();
            }, 1000);
        }
    } else {

        document.querySelector("#son-skor").textContent = skor;
        
        if (skor > enİyiSkor) {
            enİyiSkor = skor;
            document.querySelector("#en-iyi-skor").textContent = enİyiSkor;
        }
        var doğrusıra = "Doğru sıra: " + oyunSırası.join("-");
        document.querySelector("#doğru-sıra").textContent = doğrusıra;

        document.querySelector("#başlık").textContent = "Oyun Bitti, puan: " + skor;

        document.querySelector("body").classList.add("game-over");
        setTimeout(function() {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        bastan_başla();

        sesKutup["yanlis"].currentTime = 0;
        sesKutup["yanlis"].play().catch(e => console.log(e));

        }
}
function sonrakiTur() {
    kullanıcıSırası = [];

    seviye++;
    document.querySelector("#başlık").textContent = "Seviye " + seviye;
    document.querySelector("#doğru-sıra").textContent = "";

    var rasgeleSayı = Math.floor(Math.random() * 4);
    var rasgeleRenk = butonRenkleri[rasgeleSayı];

    oyunSırası.push(rasgeleRenk);

    tıklamaizni = false;

    var i = 0
    var zamanlayıcı = setInterval(function() {
        animasyon(oyunSırası[i]);
            i++;

           if (i >= oyunSırası.length) {
            clearInterval(zamanlayıcı);
            setTimeout(function() {
                tıklamaizni = true;
            }, 500);
           }
    }, 800);
}
function animasyon(renk) {
    var skutu = document.querySelector("#" + renk);
    skutu.classList.add("basildi");

    sesCal(renk);

    setTimeout(function() {
        skutu.classList.remove("basildi");
    }, 150);
}
function sesCal(renkıd) {
    var ses = sesKutup[renkıd];

    if (ses) {
        ses.currentTime = 0;
        var oynat = ses.play();
        if (oynat !== undefined) {
            oynat.catch(function(error) {
                console.log("Ses oynatılamadı: " + error);
            });
        }
    }
}


function bastan_başla() {
    seviye = 0;
    skor = 0;
    oyunSırası = [];
    oyunBaşladı = false;
    tıklamaizni = false;

    document.querySelector("#başlık").innerHTML = "Oyun bitti. <br> Tekrar başlamak için bir renge dokun";
    document.querySelector("#skor").textContent = 0;
}  