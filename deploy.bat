@echo off
echo ========================================
echo Amulya Business Consultant Website
echo GitHub Pages + Cloudflare Deployment
echo ========================================
echo.
echo Your website is ready for GitHub Pages + Cloudflare!
echo.
echo STEP-BY-STEP DEPLOYMENT:
echo.
echo 1. CREATE GITHUB REPOSITORY:
echo    - Go to github.com and create new repository
echo    - Name it 'amulyabiz' or your choice
echo    - Upload all these files to the repository
echo.
echo 2. ENABLE GITHUB PAGES:
echo    - Go to repository Settings ^> Pages
echo    - Source: Deploy from a branch
echo    - Branch: main, Folder: / (root)
echo    - Save (site will be at https://[username].github.io/[repo]/)
echo.
echo 3. SETUP FORMSPREE FOR EMAILS:
echo    - Go to formspree.io and create free account
echo    - Create new form, copy the form ID
echo    - Replace YOUR_FORM_ID in contact.html with your ID
echo    - Set your email in Formspree dashboard
echo.
echo 4. CLOUDFLARE CUSTOM DOMAIN:
echo    - Login to Cloudflare dashboard
echo    - Add site: amulyabiz.com.np
echo    - Update nameservers as instructed
echo.
echo 5. CLOUDFLARE DNS SETTINGS:
echo    - Add CNAME record:
echo      Name: @ or www
echo      Target: [username].github.io
echo      Proxy: DNS only (gray cloud)
echo.
echo 6. CLOUDFLARE PAGE RULES:
echo    - Add rule: https://amulyabiz.com.np/*
echo    - Setting: Always Use HTTPS = On
echo.
echo 7. GITHUB CUSTOM DOMAIN:
echo    - Repository Settings ^> Pages ^> Custom domain
echo    - Enter: amulyabiz.com.np
echo    - Check: Enforce HTTPS
echo.
echo YOUR SITE WILL BE LIVE AT: https://amulyabiz.com.np
echo EMAILS WILL BE SENT TO YOUR FORMSPREE EMAIL!
echo.
pause