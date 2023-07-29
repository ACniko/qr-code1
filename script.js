let imageUrls = JSON.parse(localStorage.getItem("imageUrls")) || [
    "url_immagine_1.jpg",
    "url_immagine_2.jpg",
    "url_immagine_3.jpg"
  ];
  
  function saveImageUrlsToStorage() {
    localStorage.setItem("imageUrls", JSON.stringify(imageUrls));
  }
  
  function displayImages() {
    // Resto del codice...
  
    // Inizializza il trascinamento delle immagini con SortableJS
    const imageListElement = document.getElementById("image-list");
    Sortable.create(imageListElement, {
      animation: 150,
      onUpdate: function(evt) {
        // Resto del codice...
      }
    });
  
    // Attiva il trascinamento su dispositivi touch con TouchPunch
    $(imageListElement).sortable("option", "tolerance", "pointer");
    $(imageListElement).draggable();
  }
  
  function displayImages() {
    const imageList = document.getElementById("image-list");
    imageList.innerHTML = "";
  
    imageUrls.forEach((url, index) => {
      const imageItem = document.createElement("div");
      imageItem.classList.add("image-item");
  
      const closeButton = document.createElement("span");
      closeButton.classList.add("close-button");
      closeButton.textContent = "x";
      closeButton.addEventListener("click", function() {
        imageUrls.splice(index, 1); // Rimuovi l'URL dell'immagine dall'array
        saveImageUrlsToStorage(); // Salva le immagini aggiornate nello storage
        displayImages(); // Aggiorna la visualizzazione dell'elenco
      });
      imageItem.appendChild(closeButton);
  
      const img = document.createElement("img");
      img.src = url;
      imageItem.appendChild(img);
  
      imageList.appendChild(imageItem);
    });
  
    // Inizializza il trascinamento delle immagini con SortableJS
    Sortable.create(imageList, {
      animation: 150,
      onUpdate: function(evt) {
        // Ottieni l'indice della posizione di destinazione del trascinamento
        const newIndex = evt.newIndex;
        // Rimuovi l'elemento dall'array
        const [reorderedImage] = imageUrls.splice(evt.oldIndex, 1);
        // Inserisci l'elemento nella nuova posizione
        imageUrls.splice(newIndex, 0, reorderedImage);
        saveImageUrlsToStorage(); // Salva le immagini aggiornate nello storage
      }
    });
  }
  
  function addImage(event) {
    const fileInput = event.target;
    const files = fileInput.files;
    if (files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = function() {
          imageUrls.push(reader.result);
          saveImageUrlsToStorage(); // Salva l'immagine aggiunta nello storage
          displayImages();
        };
        reader.readAsDataURL(file);
      }
    }
    // Resetta il campo di input file in modo che lo stesso file possa essere caricato di nuovo
    fileInput.value = "";
  }
  
  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", function() {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.multiple = true;
    imageInput.addEventListener("change", addImage);
    imageInput.click();
  });
  
  displayImages();
  