# Prompt Generation

A Node.js/TypeScript pipeline for generating educational video content for children using the fal.ai API.

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/prompt_generation.git
cd prompt_generation
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** with your [fal.ai](https://fal.ai) API key and optional configurations:

```dotenv
# Required for content generation
FAL_KEY=your_fal_api_key_here
FAL_DEFAULT_MODEL=anthropic/claude-3.7-sonnet

# Optional: Configure generations directory location
# GENERATIONS_DIR_PATH=/absolute/path/to/generations
# GENERATIONS_DIR_RELATIVE_PATH=../generations
```

See `.env.example` for more configuration options.

4. **Build the TypeScript code**

```bash
npm run build
```

This will:

- Compile TypeScript files into JavaScript in the `dist/` directory
- Copy static assets from the `public/` directory to `dist/public/`

---

## Usage

### Setup and Launch

#### Building the Project

Build the TypeScript code and copy static assets:

```bash
npm run build
```

You need to run this command:

- After cloning the repository
- After making changes to TypeScript files
- After pulling updates from the repository

#### Running the Application

##### Web Interface

Start the web server with:

```bash
npm run web
```

Then open your browser and navigate to:

```
http://localhost:4000
```

After generation, you can:

- View the saved generations
- View the content in JSON format
- Save generations to specific themes

The web interface provides a user-friendly form to:

- Enter topics organized by themes in JSON format
- Generate content for multiple topics at once
- View real-time logs of the generation process
