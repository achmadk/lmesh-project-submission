## About This Project
This project is a simple form for users to set a valid worker number, between 0-5, check or uncheck mark as fiction, and show the tooltip of the comment form field.

I kept the original requirements intact. The existing form field which can lead users into human error was refactored into a simple slider/stepper form field with constraint values of 0-5, prevent users from entering invalid values and improve usability, without adding new business logic, APIs, or features.

## Used Libraries on This Project
This project is built using the following libraries:
1. Next.js.
2. Tailwind CSS.
3. Daisy UI (to keep the class names short and simple).
4. React Hook Form + Yup for reusable form handling components and form validation.
5. Biome for linting and formatting.
6. OpenNext for deploy Nextjs app into cloudflare.

You can directly view this app on [this link](https://lmesh-project-submission.achmad-kurnianto.workers.dev/).

## Scripts
1. `pnpm install` to install all the dependencies defined from the `package.json` file.
2. `pnpm run dev` to start the development server.
3. `pnpm run build` to build the project for production.