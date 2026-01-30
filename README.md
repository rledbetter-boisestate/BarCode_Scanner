# Full Stack Library Barcode Scanner

A containerized application using **Angular**, **Node.js**, and **PostgreSQL**.
**Features:**
* Scan barcodes via webcam.
* "Weeding" Alert: Notifies if a scanned book is on the removal list.
* Shelf Management: Scan a shelf barcode to see all books assigned to it.
* Dockerized: Runs with a single command.

---

## 🛠 Prerequisites

1.  **Docker Desktop for Windows:** [Download Here](https://www.docker.com/products/docker-desktop/) (Ensure WSL 2 mode is active).
2.  **Node.js (LTS):** [Download Here](https://nodejs.org/) (Required to generate the initial Angular skeleton).
3.  **Visual Studio Code:** Recommended for editing.

---

## 📂 Phase 1: Project Structure Setup

Open PowerShell or Command Prompt and run these commands to create the folder structure:

```powershell
mkdir library-scanner
cd library-scanner
mkdir backend
# We will generate the frontend folder using Angular CLI in Phase 3