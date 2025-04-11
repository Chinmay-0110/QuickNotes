let notes = JSON.parse(localStorage.getItem("notes")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

document.addEventListener("DOMContentLoaded", () => {
  renderNotes();
  applyDarkMode();
  document.getElementById("noteInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") addNote();
  });
  document.getElementById("toggleDark").addEventListener("click", toggleDarkMode);
});

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  notes
    .filter(note => note.toLowerCase().includes(searchTerm))
    .forEach((note, index) => {
      const noteEl = document.createElement("div");
      noteEl.className = "note";

      noteEl.innerHTML = `
        <p contenteditable="true" onblur="editNote(${index}, this.innerText)">${note}</p>
        <button onclick="deleteNote(${index})">&times;</button>
      `;
      notesList.appendChild(noteEl);
    });
}

function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();
  if (text !== "") {
    notes.push(text);
    saveNotes();
    renderNotes();
    input.value = "";
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function editNote(index, newText) {
  notes[index] = newText.trim();
  saveNotes();
}

function toggleDarkMode() {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);
  applyDarkMode();
}

function applyDarkMode() {
  document.body.classList.toggle("dark", darkMode);
}
