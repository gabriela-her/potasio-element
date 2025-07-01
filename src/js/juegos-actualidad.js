const reactions = {
    "Agua": "💥 ¡Explosión violenta! El potasio reacciona fuertemente con el agua.",
    "Cloro": "☠️ Se forma cloruro de potasio. ¡Cuidado con los gases tóxicos!",
    "Oxígeno": "🔥 Se forma óxido de potasio. Combustión controlada.",
    "Azufre": "💣 Reacción moderada. Se forma sulfuro de potasio.",
    "Hierro": "🧊 No hay reacción visible. El potasio no reacciona con hierro directamente."
  };

  const gifs = {
    "Agua": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmppZzJlbWJtbHBwcW9najlidmN1OGUzenhjZnI2cmU5em1ibzg4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oe33xf3B50fsc/giphy.gif",
    "Cloro": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3pqOXl2YXhrM21wajk2dnV2OWRseGtyaWI4N2xhMTY4Z29xdmozNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mJhw1NLMqMpO2gcNDn/giphy.gif",
    "Oxígeno": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXRudmhlZWZmZjVnemJoZ25ud2J1bTVrdTV0N2V2NnBwYjd4eDltdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT5LMwyGbXXApKi8WA/giphy.gif",
    "Azufre": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3BrZ3Q4bDgwNHp3b2N1MmxydnZ4Nm51aGd6MWxwYjUzaGh1a202aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTk2YWIbJk5fOgRmGA/giphy.gif",
    "Hierro": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmt1a3QxdW4wcHEyYnBjZzFranc5aXdmeHg1NHBmYjNvZGQ3M29uYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BcOTScpAtJJ7H4RTAj/giphy.gif"
  };

  const reactor = document.getElementById("reactor");
  const result = document.getElementById("result");
  const modal = document.getElementById("reaction-modal");
  const modalText = document.getElementById("modal-text");

  function showReactionModal(message) {
    modalText.textContent = message;
    modal.style.display = "flex";

    setTimeout(() => {
      modal.style.display = "none";
    }, 4000);
  }

  document.querySelectorAll(".element").forEach(el => {
    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", el.dataset.element);
    });
  });

  reactor.addEventListener("dragover", (e) => {
    e.preventDefault();
    reactor.style.background = "#fff0d0";
  });

  reactor.addEventListener("dragleave", () => {
    reactor.style.background = "#fff";
  });

  reactor.addEventListener("drop", (e) => {
    e.preventDefault();
    const element = e.dataTransfer.getData("text");

    if (gifs[element]) {
      reactor.innerHTML = `<img src="${gifs[element]}" alt="Reacción ${element}" style="width:100%; height:100%; border-radius: 20px;">`;
      result.textContent = "";
      reactor.style.background = "#fff";

      setTimeout(() => {
        reactor.textContent = "🧪 Reactor";
        showReactionModal(reactions[element]);
      }, 4000);

    } else {
      reactor.textContent = "🧪 Reactor";
      showReactionModal(reactions[element] || "Sin reacción.");
      reactor.style.background = "#fff";
    }
  });