// Built once at deploy and served as a file, so a crawler reading it costs
// nothing. Everything behind the door is a redirect to /login for a crawler,
// and on Vercel's free plan each of those is two calls to the server (the
// middleware, then the login page) for nothing anybody can read. The pages
// meant for people without an account stay open: the stores' reviewers and
// anybody deciding whether to sign up read them.
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/login', '/download', '/privacy', '/terms', '/support', '/delete-account'],
      disallow: '/',
    },
  };
}
