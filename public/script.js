//funzione CV
function CV() {
    window.open("CV_Romanello_Kevin.pdf", "_blank");
}

//funzione
function LI() { 
    window.open("https://www.linkedin.com/in/kevinromanello/", "_blank");
}

//funzione send email
function SE() {
    var destinatario = "kevinromanello99@email.com";
    var oggetto = "Oggetto dell'email";
    var corpoMessaggio = "Testo del messaggio...";
    var mailtoLink = "mailto:" + destinatario + "?subject=" + encodeURIComponent(oggetto) + "&body=" + encodeURIComponent(corpoMessaggio);
    window.location.href = mailtoLink;
}
