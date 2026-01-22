# Amulya Business Consultant Website

A professional business consulting website built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Dark/Light theme toggle
- Hero image slideshow
- Contact form with email functionality
- Professional business layout
- SEO optimized

## Technologies Used

- HTML5
- CSS3 (Custom properties, animations, responsive design)
- JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Poppins)

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. For local server, use Python:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Deployment to GitHub Pages + Cloudflare

### Step 1: Upload to GitHub
1. Create a new repository on GitHub (name it `amulyabiz` or similar)
2. Upload all project files to the repository
3. Make sure the main branch is set as default

### Step 2: Enable GitHub Pages
1. Go to your repository Settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Select "main" branch and "/ (root)" folder
5. Click Save
6. Your site will be live at: `https://[username].github.io/[repository-name]/`

### Step 3: Setup Formspree for Email
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy the form ID (looks like: `xeqwryzl`)
3. Replace `YOUR_FORM_ID` in `contact.html` with your actual form ID
4. In Formspree dashboard, set notification email to receive form submissions

### Step 4: Connect Custom Domain with Cloudflare
1. Go to your Cloudflare dashboard
2. Add your domain `amulyabiz.com.np`
3. Update nameservers (follow Cloudflare instructions)
4. In Cloudflare DNS settings, add these records:
   - **Type:** CNAME
   - **Name:** `www` or `@`
   - **Target:** `[username].github.io`
   - **Proxy status:** DNS only (gray cloud)
5. In Cloudflare "Page Rules", add:
   - URL: `https://amulyabiz.com.np/*`
   - Setting: "Always Use HTTPS" → On
6. In GitHub repository, go to Settings → Pages
7. Under "Custom domain", enter: `amulyabiz.com.np`
8. Check "Enforce HTTPS"

## Form Configuration

The contact form is configured to work with Netlify Forms:
- Form submissions are automatically handled
- Spam protection via honeypot field
- Email notifications can be set up in Netlify dashboard
- After submission, users are redirected to `thank-you.html`

## File Structure

```
├── index.html          # Home page
├── about.html          # About us page
├── services.html       # Services page
├── contact.html        # Contact page
├── thank-you.html      # Thank you page (after form submission)
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Logo and other images
├── netlify.toml        # Netlify configuration
├── _redirects          # URL redirects
└── README.md           # This file
```

## Customization

### Colors
Edit the CSS custom properties in `css/style.css`:
```css
:root {
  --primary-color: #0B2C4D;
  --secondary-color: #1a4a6e;
  --accent-color: #ffffff;
  /* ... other variables */
}
```

### Contact Information
Update contact details in all HTML files (index.html, about.html, services.html, contact.html):
- Phone number
- Email address
- Address

### Images
Replace images in the `images/` folder:
- `Logo.jpg` - Main logo
- `Logo Png.png` - Footer logo

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for Amulya Business Consultant.