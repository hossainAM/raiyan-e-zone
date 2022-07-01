/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co"],
  },
  env: {
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL": "mongodb+srv://ameeraezone:M5PPxB42F2WRYUM6@cluster0.ong4q.mongodb.net/ameera-e-zone?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
