class App {
  constructor() {
    this.notes = [];

    this.$form = document.querySelector("#form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$formButtons = document.querySelector("#form-buttons");
    this.$formCloseButton = document.querySelector("#form-close-button");
    this.$placeholder = document.querySelector("#placeholder");
    this.$notes = document.querySelector("#notes");

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
    });

    this.$form.addEventListener("submit", (event) => {
      // Prevent JS's default refresh behavior when clicking submit
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;

      // Detect truthy values and them store in variable
      // without having to write if/else
      const hasNote = title || text;

      if (hasNote) {
        // Instead of passing in each variable, we could pass in
        // an object that includes those variable since we don't
        // care about the order
        this.addNote({ title, text });
      }
    });

    this.$formCloseButton.addEventListener('click', event => {
        event.stopPropagation(); // Stop handleFormClick function from openning form
        this.closeForm();
    });
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target); // .contain() returns a true or false value

    const title = this.$noteTitle.value;
    const text = this.$noteText.value;
    const hasNote = title || text;

    if (isFormClicked) {
      this.openForm();
    }
    // Extra feature: If user clicks away, save note anyway
    else if (hasNote) {
      this.addNote({title, text});
    } else this.closeForm();
  }

  openForm() {
    this.$form.classList.add("form-open");
    this.$noteTitle.style.display = "block";
    this.$formButtons.style.display = "block";
  }

  closeForm() {
    this.$form.classList.remove("form-open");
    this.$noteTitle.style.display = "none";
    this.$formButtons.style.display = "none";
    // Clear data front input field
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  addNote({title, text}) {
    const getIdNumber = () => {
      let idNumber = 1;
      if (this.notes.length > 0) {
        // Find the last item in the notes array and add 1
        // to create next note's ID
        idNumber = this.notes[this.notes.length - 1].id + 1;
      } // If no note yet, set note's ID to 1
      return idNumber;
    };
    const newNote = {
      title,
      text,
      color: "white",
      id: getIdNumber(),
    };
    this.notes = [...this.notes, newNote];
    this.displayNotes();
    this.closeForm();
  }

  displayNotes() {
    // Create a variable that returns true/fase when checking array this.note
    // if there's any note being submitted
    const hasNotes = this.notes.length > 0;
    if (hasNotes) {
      // If there is a note submitted, remove the placeholder
      this.$placeholder.style.display = "none";
    } else this.$placeholder.style.display = "flex";

    // Taking all note objects that has been spreaded into this.notes (line 79)
    this.$notes.innerHTML = this.notes
      .map(
        (note) =>
          `
        <div class="note" style="background: ${note.color}">
            <div class="${note.title && "note-title"}">${note.title}</div>
            <div class="note-text">${note.text}</div>
            <div class="toolbar-container">
                <div class="toolbar">
                <img src="" class="toolbar-color">
                <img src="" class="toolbar-delete">
                </div>
            </div>
        </div>
        `
      )
      .join("");
  }
}

new App();