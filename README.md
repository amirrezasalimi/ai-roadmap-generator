# AI Roadmap

AI Roadmap is a website that allows users to create a minimal roadmap for their project by entering a description. The website is built using Next.js and NextUI for UI and components. We use Pocketbase, an open-source single-file backend, to store the data. We also use OpenAI's Chat-GPT service to generate the content for the roadmaps.

## Installation

1. Clone the repository.
2. Fill the `.env.local` file with the following values:

- POCKETBASE_URL=
- POCKETBASE_ADMIN_EMAIL=
- POCKETBASE_ADMIN_PASSWORD=
- OPEN_AI_TOKEN=

You can find a sample in `.env.example`.

## Backend

We use Pocketbase, a minimal and fast open-source backend similar to Firebase, to store the data. The schema of the tables can be found in the [repository](https://github.com/amirrezasalimi/ai-roadmap-backend). More information about Pocketbase can be found in their [GitHub repository](https://github.com/pocketbase/pocketbase).

## OpenAI Chat-GPT

We use OpenAI's Chat-GPT service to generate the content for the roadmaps. We use the GPT-3.5-turbo model with a minimum of 15 items and a maximum of 30 items. The cost of each roadmap is $0.002 per 1K tokens, and each roadmap costs a minimum of 1200 tokens. This means that every 1000 roadmaps cost $2.

You will need to provide your OpenAI API key in the `.env.local` file under the `OPEN_AI_TOKEN` variable.


## React Flow

We use [React Flow](https://reactflow.dev/) to create the components for the roadmaps.


## Credits

* [Amirreza Salimi](https://github.com/amirrezasalimi) - Backend Developer
* [Amir Damirchi](https://github.com/amird308) - Frontend Developer
* [Ehsan Ezzati](https://dribbble.com/theehsanez) - UI/UX Designer 

## Design

You can find the Figma design for the UI [here](https://www.figma.com/file/iBSVcVXVZeLq4Anpwj5J9u/AI?node-id=0%3A1&t=Fh9De29ElXU4u51G-1).

## License

AI Roadmap is an open-source project with the MIT license. Feel free to use it, modify it, or distribute it.

