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
