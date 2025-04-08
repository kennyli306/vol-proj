This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Setup

Notes:
- This section is updated as of April 8, 2025.
- Most of the commands provided below are meant for local development only, and verified to produce a working dev environment with MacOS Sequoia 15.3.2. If using Docker or some other virtual environment, they may not be necessary or not work at all.
- bcrypt may need some further integration beyond local installation (modify configs, etc.); when using, add to top of files: "import bcrypt from 'bcrypt';"
- Environment variables need verification.

Install JS Package Manager:
```zsh
npm install
# or
yarn install
```

PostgresSQL (database):
```zsh
# Install on MacOS with homebrew
brew update
brew install postgresql

# Start and stop service
brew services start postgresql  # stays running in bg
brew services stop postgresql
```

Prisma (talks with database):
```zsh
# Install using npm
npm install @prisma/client
npm install prisma --save-dev

# When making changes
npx prisma generate  # re-run whenever schema is modified
npx prisma migrate dev --name init  # run migrations

# Debug
npx prisma studio  # check that database is updated properly
                   # serves neat UI on http://localhost:5555/
```

bcrypt (password hashing):
```zsh
# Install using npm
npm install bcryptjs
```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
