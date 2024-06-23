let btnMenu = document.getElementById("nav-bars");
btnMenu.addEventListener("click", function() {
    let navbar = document.getElementsByClassName("nav-lateral")[0];
    navbar.style.display = "block";
    btnMenu.style.display = "none";
});

 let btnSairMenu =  document.getElementById("sair-menu");
 btnSairMenu.addEventListener("click", function() {
    let navbar = document.getElementsByClassName("nav-lateral")[0];
    navbar.style.display = "none";
    btnMenu.style.display = "block";
});