window.onload = function () {
    const img = document.querySelector("img");
    const mensagem = document.getElementById("mensagem");
    const lanterna = document.getElementById("lanterna");

    // Posição aleatória da imagem
    const maxX = window.innerWidth - img.offsetWidth;
    const maxY = window.innerHeight - img.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    img.style.left = `${randomX}px`;
    img.style.top = `${randomY}px`;

    // Flag para garantir que só acontece uma vez
    let imagemRevelada = false;

    img.addEventListener("mouseenter", () => {
        if (!imagemRevelada) {
            img.style.opacity = 1;
            mensagem.style.display = "block";
            imagemRevelada = true;
        }
    });

    // Efeito de lanterna
    document.addEventListener("mousemove", (e) => {
        lanterna.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, transparent 120px, rgba(0, 0, 0, 0.85) 250px)`;
    });
};
