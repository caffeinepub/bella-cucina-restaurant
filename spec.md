# Hercules Gym

## Current State
A restaurant website (Bella Cucina) exists in the project. We are replacing it entirely with a gym website for Hercules Gym.

## Requested Changes (Diff)

### Add
- **Home page**: Hero section with headline, tagline, CTA button ("Book a Session"), gym highlights (strength, cardio, community), motivational banner
- **Services page**: List of gym services/classes (Personal Training, Group Classes, Cardio Zone, Weight Room, Nutrition Coaching, etc.) with icons/cards
- **Contact page**: Contact info (address, phone, email, hours), embedded map placeholder, contact form
- **Custom Booking Form**: Modal or dedicated section — fields: name, email, phone, preferred date/time, service type, message; submits to backend
- **WhatsApp floating button**: Fixed position, links to WhatsApp with a pre-filled message
- **SEO**: Page title "Hercules Gym", meta description, Open Graph tags
- **Navigation**: Sticky top nav with links to Home, Services, Contact, and "Book Now" CTA

### Modify
- Replace all Bella Cucina branding, content, and pages with Hercules Gym content
- Update backend to handle booking form submissions

### Remove
- All restaurant-specific content, menu items, food imagery

## Implementation Plan
1. Generate backend with a `submitBooking` function to store booking form data (name, email, phone, date, service, message)
2. Build Home page with hero, highlights section, and booking CTA
3. Build Services page with service cards (6-8 services)
4. Build Contact page with contact info and contact form
5. Build custom booking form modal (triggered from CTA buttons)
6. Add sticky navigation with smooth scroll or routing between pages
7. Add floating WhatsApp button (bottom-right, fixed)
8. Add SEO meta tags in index.html
9. Style with a strong, bold gym aesthetic
