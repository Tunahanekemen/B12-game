var butonRenkleri = ["kırmızı", "mavi", "yeşil", "sarı"];
var oyunSırası = [];
var kullanıcıSırası = [];
var skor = 0;
var tıklamaizni = false;
var enİyiSkor = 0;

var oyunBaşladı = false;
var seviye = 0;

document.addEventListener("keypress", function() {
    if (!oyunBaşladı) {
        document.querySelector("#başlık").textContent = "Seviye " + seviye;
        sonrakiTur();
        oyunBaşladı = true;
    }
});

var butonlar = document.querySelectorAll(".btn");

butonlar.forEach(function(buton) {
    buton.addEventListener("click", function() {

        if (!oyunBaşladı) return;

        if (!tıklamaizni) return;

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

        var hatases = new Audio("sesler/yanlis.mp3");
        hatases.play().catch(function(error) {
            console.log("Ses çalma hatası: yanlis.mp3");
        });
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
    var dosya = "";
    if (renkıd === "kırmızı") dosya = "kirmizi.mp3";
    else if (renkıd === "mavi") dosya = "mavi.mp3";
    else if (renkıd === "yeşil") dosya = "yesil.mp3";
    else if (renkıd === "sarı") dosya = "sari.mp3";

    var ses = new Audio("sesler/" + dosya);
    ses.play().catch(function(error) {
        console.log("Ses çalma hatası: ", dosya);
    });
}


function bastan_başla() {
    seviye = 0;
    skor = 0;
    oyunSırası = [];
    oyunBaşladı = false;
    tıklamaizni = false;

    document.querySelector("#başlık").innerHTML = "Oyun bitti. <br> Tekrar başlamak için bir tuşa basın";
    document.querySelector("#skor").textContent = 0;
}  