/**
 *
 * @param {*} mensaje del error a mostrar
 * @param {*} tipo error o succes
 * @param {*} selector en donde sera colocado la alerta
 */
export const showAlert = (mensaje, tipo, selector) => {
  const alertaError = document.querySelector(".bg-red-100");
  const alertaSucces = document.querySelector(".bg-green-100");

  const alerta = document.createElement("P");

  if (!alertaError && !alertaSucces) {
    // Si no hay una alerta previa, entonces crea una

    if (tipo === "error") {
      alerta.classList.add(
        "bg-red-100",
        "border-red-400",
        "text-red-700",
        "px-4",
        "py-3",
        "rounded",
        "max-w-lg",
        "mx-auto",
        "mt-6",
        "text-center"
      );
    } else {
      alerta.classList.add(
        "bg-green-100",
        "border-green-400",
        "text-green-700",
        "px-4",
        "py-3",
        "rounded",
        "max-w-lg",
        "mx-auto",
        "mt-6",
        "text-center"
      );
    }

    const alertaDiv = document.createElement("DIV");
    alertaDiv.classList.add("text-center");

    const alertaStrong = document.createElement("STRONG");
    alertaStrong.classList.add("font-bold");
    alertaStrong.textContent = `${tipo}!`;

    const alertaSpan = document.createElement("SPAN");
    alertaSpan.classList.add("block", "sm:inline");
    alertaSpan.textContent = mensaje;

    //const formulario = document.querySelector("#formulario");

    alerta.appendChild(alertaStrong);
    alerta.appendChild(alertaSpan);
    alertaDiv.appendChild(alerta);

    selector.appendChild(alertaDiv);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
};

export const alerta = (mensaje, tipo, selector) => {
  // Busca si ya existe una alerta previa en el selector
  const alertaPrevia = selector.querySelector("#alerta");

  if (alertaPrevia) {
    // Si hay una alerta previa, la eliminamos antes de agregar una nueva
    alertaPrevia.remove();
  }

  // Crea una nueva alerta
  const alertaDiv = document.createElement("DIV");
  const alerta = document.createElement("P");

  // Asigna el id a la alerta
  alertaDiv.id = "alerta";
  // Asigna el mensaje al p de la alerta
  alerta.textContent = mensaje;
  // Dependiendo del tipo de alerta
  if (tipo === "error") {
    alertaDiv.classList.add(
      "from-red-400",
      "to-red-600",
      "bg-gradient-to-br",
      "text-center",
      "p-3",
      "rounded-xl",
      "uppercase",
      "text-white",
      "font-bold",
      "text-sm",
      "my-10",
      "py-2",
    );
  } else {
    alertaDiv.classList.add(
      "from-indigo-400",
      "to-indigo-600",
      "bg-gradient-to-br",
      "text-center",
      "p-3",
      "rounded-xl",
      "uppercase",
      "text-white",
      "font-bold",
      "text-sm",
      "my-10",
      "py-2",
    );
  }

  alertaDiv.appendChild(alerta);
  selector.appendChild(alertaDiv);
};


