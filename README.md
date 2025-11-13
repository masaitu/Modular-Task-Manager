# Modular Task Manager

A lightweight, modular task management application built with vanilla JavaScript and served with Nginx in Docker.

## Features

- ✅ Create, read, update, and delete tasks
- 📦 Modular architecture with separation of concerns
- 🐳 Docker containerized for easy deployment
- 🎨 Clean and responsive UI with CSS styling
- 💾 Client-side state management with local storage

## Project Structure

```
Modular-Task-Manager/
├── Dockerfile          # Docker configuration
├── README.md          # This file
├── public/            # Static files
│   ├── index.html    # Main HTML file
│   └── styles.css    # Styling
└── src/              # Application source code
    ├── app.js        # Main application entry point
    ├── store.js      # State management
    ├── Task.js       # Task model
    ├── view.js       # UI/View logic
    └── utils.js      # Utility functions
```

## Installation & Setup

### Prerequisites
- Docker and Docker Compose (for Docker setup)
- Node.js (for local development)
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/masaitu/Modular-Task-Manager.git
cd Modular-Task-Manager
```

2. Open `public/index.html` in your browser or use a local server:
```bash
python -m http.server 8000
```

3. Visit `http://localhost:8000`

## Docker Deployment

### Build from source
```bash
docker build -t modular-task-manager .
docker run -d -p 8080:80 --name modular-task-manager modular-task-manager
```

### Pull from Docker Hub
```bash
docker pull masaitu/modular_taskmanager
docker run -d -p 8080:80 --name modular-task-manager masaitu/modular_taskmanager
```

Then access the application at `http://localhost:8080`

### Stop and remove container
```bash
docker stop modular-task-manager
docker rm modular-task-manager
```

## Usage

1. **Create a Task**: Enter task title and click "Add Task"
2. **View Tasks**: All tasks are displayed in the task list
3. **Complete a Task**: Click the checkbox next to a task to mark it complete
4. **Edit a Task**: Click the edit button to modify a task
5. **Delete a Task**: Click the delete button to remove a task

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Server**: Nginx
- **Container**: Docker
- **Version Control**: Git

## Architecture

### Modular Components

- **Task.js**: Task model class
- **store.js**: Centralized state management
- **view.js**: DOM manipulation and rendering
- **app.js**: Application orchestration
- **utils.js**: Helper functions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

**masaitu** - [GitHub Profile](https://github.com/masaitu)

## Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/masaitu/Modular-Task-Manager/issues).

---

**Live Demo**: [Docker Hub Image](https://hub.docker.com/r/masaitu/modular_taskmanager)
