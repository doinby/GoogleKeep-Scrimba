class App {
    constructor() {
        this.notes = [];
        
        this.$form = document.querySelector("#form");
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText = document.querySelector("#note-text");
        this.$formButtons = document.querySelector('#form-buttons');
        
        this.addEventListeners();
    }
    
    addEventListeners() {
        document.body.addEventListener("click", (event) => {
            this.handleFormClick(event);
        });
        
        this.$form.addEventListener('submit', event => {
            // Prevent JS's default refresh behavior when clicking submit
            event.preventDefault();
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            
            // Detect truthy values and them store in variable
            // without having to write if/else
            const hasNote = title || text;
            
            if(hasNote) {
                // Instead of passing in each variable, we could pass in
                // an object that includes those variable since we don't
                // care about the order
                this.addNote({title, text});
            }
        })
    }
    
    handleFormClick(event) {
        const isFormClicked = this.$form.contains(event.target); // .contain() returns a true or false value
        
        if(isFormClicked) {
            this.openForm();
        } else {
            this.closeForm();
        }
        
    }
    
    openForm() {
        this.$form.classList.add('form-open');
        this.$noteTitle.style.display = "block";
        this.$formButtons.style.display = "block";
    }
    
    closeForm() {
        this.$form.classList.remove("form-open");
        this.$noteTitle.style.display = "none";
        this.$formButtons.style.display = "none";
    }
    
    
    addNote(note) {
        const getIdNumber = () => {
            let idNumber = 1;
            if (this.notes.length > 0) {
                // Find the last item in the notes array and add 1
                // to create next note's ID
                idNumber = this.notes[this.notes.length - 1].id + 1;
            } // If no note yet, set note's ID to 1
            return idNumber;
        }
        const newNote = {
            title: note.title,
            text: note.text,
            color: "white",
            id: getIdNumber()
        };
        this.notes = [...this.notes, newNote];
        console.log(this.notes);
    }    
}

new App();