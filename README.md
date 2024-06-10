# Node.js Blog Site

This is a Node.js project for a simple blog site backend. It includes functionality for user management, blog post management, admin management, and comment management.

## Features

- **User Management**: Users can register, login, view/update their profiles.
- **Blog Post Management**: Users can create, retrieve, update, and delete blog posts. Posts can be associated with categories or tags.
- **Admin Management**: Admins have privileges to manage users, including listing all users and deleting users.
- **Comment Management**: Users can add comments to blog posts, view comments for a specific post, and delete their own comments.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nodejs-blog-site.git
   ```

2. Install dependencies:

   ```bash
   cd nodejs-blog-site
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your MongoDB connection string and JWT secret key.

## Usage

Start the server:

```bash
npm start
```

By default, the server runs on port 5000.

## API Documentation

Detailed API documentation is provided in the Postman collection. Import the collection into Postman to explore and test the APIs.

[Postman Collection](link_to_postman_collection)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
