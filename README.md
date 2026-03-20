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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Login Logic

There will be 2 types of signup user can do

1. Normal signup where user fill there info and verify themselves.
2. Users created by the admin then use verify themselves.

## Side_Navigation

1. Admin: Dashboard, Projects, Admin, Projects with details
2. Manager: Dashboard, Projects, Projects wih details
3. Member: Dashboard, Projects, Projects wih details

## Member

1. Profile access
2. It's issues access

## Manager

1. Profile access : Member (Read, Update), Manager (Read, Update), Admin (Create, Read, Update, Delete)
2. Project access : Manager (Read, Update), Admin (Create, Read, Update, Delete)
3. Issue access : Member (Specific, Read, Update), Manager (CRUD), Admin (CRUD)
4. Sprint Access : Manager (CRUD), Admin (CRUD)
