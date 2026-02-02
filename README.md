# iTap - Digital Business Card

A cutesy-professional digital business card web app optimized for NFC stickers. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

✨ **Public Profile Page** - Beautiful glassmorphism design with all your contact info and social links  
🔐 **Admin Dashboard** - Password-protected panel to manage your profile  
📱 **NFC Ready** - Clean URLs optimized for NFC stickers  
🎨 **Cutesy-Professional Aesthetic** - Soft colors, rounded corners, and smooth animations  
⚡ **Real-time Updates** - Changes in admin panel instantly reflect on public profile  

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom theme
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. **Clone or navigate to the project directory**

```bash
cd iTap
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory (already created with your credentials):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=http://localhost:5173
```

4. **Set up the database**

Follow the instructions in `SUPABASE_SETUP.md` to:
- Create the profiles table
- Set up Row Level Security policies
- Create an admin user account

5. **Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

### Admin Workflow

1. **Login**: Navigate to `/admin/login` and sign in with your Supabase credentials
2. **Create/Edit Profile**: Fill in your information in the admin dashboard
3. **Copy NFC Link**: Use the "Copy Link" button to get your profile URL
4. **Write to NFC**: Use an NFC writing app to write the URL to your NFC sticker

### Public Profile

- Your profile is accessible at `/profile/your-username`
- Anyone can view it without authentication
- Updates made in the admin panel appear instantly

## Project Structure

```
iTap/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ProfileCard.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── AdminEditor.tsx
│   │   └── CopyLinkButton.tsx
│   ├── pages/              # Page components
│   │   ├── ProfilePage.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── lib/                # Utilities and config
│   │   ├── supabase.ts
│   │   ├── types.ts
│   │   └── database.types.ts
│   ├── App.tsx             # Router configuration
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── public/
├── .env.local              # Environment variables
├── package.json
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── SUPABASE_SETUP.md       # Database setup guide
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  lavender: '#E6E6FA',  // Background
  mint: '#98FF98',      // Primary buttons
  sage: '#9DC183',      // Accents
  cream: '#FFFDD0',     // Secondary background
  charcoal: '#36454F',  // Text
}
```

### Fonts

The app uses Google Fonts (Outfit, Quicksand, Inter). Change them in `index.html` and `tailwind.config.js`.

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel/Netlify

1. Connect your repository to Vercel or Netlify
2. Set environment variables in the hosting platform
3. Update `VITE_APP_URL` to your production URL
4. Deploy!

### Update NFC Stickers

After deployment, update the `VITE_APP_URL` in your environment variables and copy the new production link to your NFC stickers.

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

---

Made with 💚 by iTap
