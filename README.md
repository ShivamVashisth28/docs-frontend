# Collaborative Docs

Docs is a modern, user-friendly, real-time document collaboration platform. It allows multiple users to edit and share documents simultaneously, with features designed to enhance productivity and teamwork.

---

## Features

- **Real-Time Collaboration**: Multiple users can work on the same document simultaneously.
- **Rich Text Editing**: Supports a variety of formatting options including bold, italic, lists, and headings.
- **Document Versioning**: Tracks changes and allows users to revert to previous versions.
- **User Authentication**: Secure login and access control using tokens.
- **Customizable Document Titles**: Dynamically fetch and save document titles.
- **Export Options**:
  - Export as plain text (.txt)
  - Export as PDF (.pdf)

---

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/collaborative-docs.git
   cd collaborative-docs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   CLIENT_URL=http://localhost:3000
   ```

4. Start the server:

   ```bash
   npm run start
   ```

5. Run the frontend:

   Navigate to the `client` directory and run:

   ```bash
   cd client
   npm install
   npm start
   ```

6. Open the app in your browser at `http://localhost:3000`.

---


## Export Functionality

### Plain Text Export

- Converts the document's content (stored in Quill Delta format) to plain text using the `html-to-text` npm module.

### PDF Export

- Uses a custom PDF generation library to export the content as a downloadable `.pdf` file.

---


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to your branch: `git push origin feature-name`
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For support or inquiries, please contact [your-email@example.com].
