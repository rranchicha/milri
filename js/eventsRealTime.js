const onGetEvents = (callback) =>
  fs.collection("evento").orderBy("fecha", "desc").onSnapshot(callback);
const eventList = document.querySelector(".aside-container");

document.addEventListener("DOMContentLoaded", () => {
  onGetEvents((querySnapshot) => {
    if (querySnapshot.empty) {
      eventList.innerHTML = `
      <div class="card event">
      <figure class="card-image">
      <img src="./assets/imgs/imagotipo.png" alt="Imagen de un evento" >
      </figure>
      <div class="card-information">
      <h2 class="title">No hay eventos</h2>
      <p>No hay eventos</p>
      </div>
  </div>
      `;
    } else {
      eventList.innerHTML = "";
      let html = "";
      querySnapshot.forEach((doc) => {
        const evento = doc.data();
        const card = `
          <div class="card event">
              <figure class="card-image">
              <img src="${evento.imgLink}" alt="Imagen de un evento" >
              </figure>
              <div class="card-information">
              <h2 class="title">${evento.title}</h2>
              <p>${evento.description} <br />
                <i class="fecha--container">Remitente: ${evento.userEmail}</i>
              </p>
              <i class="fecha--container">
                Publicado el: ${evento.publicado} <br />
                Fecha del evento: ${evento.fecha}
              </i>
              </div>
          </div>
          `;
        html += card;
      });
      eventList.innerHTML = html;
    }
  });
});
