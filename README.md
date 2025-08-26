# Data Science Portfolio Website

A modern, responsive single-page portfolio website designed specifically for data science professionals. Built with semantic HTML5, CSS3, and vanilla JavaScript following mobile-first design principles.

## 🌟 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with breakpoints for mobile, tablet, and desktop
- **Single Page Application**: Smooth scrolling navigation between sections
- **Fixed Navigation**: Sticky header with active section highlighting
- **Project Showcase**: Interactive project cards with modal popups for detailed views
- **Contact Form**: Functional contact form with validation and error handling
- **Performance Optimized**: Fast loading times with optimized images and minimal dependencies

### Sections Included
1. **Hero Section**: Professional headshot, name, title, and call-to-action buttons
2. **About Section**: Professional summary with achievements and key metrics
3. **Skills Section**: Categorized technical skills with animated progress bars
4. **Experience Section**: Timeline-based work history with achievements
5. **Projects Section**: Filterable project showcase with modal details
6. **Testimonials Section**: Professional recommendations and quotes
7. **Contact Section**: Contact information and functional contact form

### Technical Features
- **Smooth Animations**: CSS3 transitions and keyframe animations
- **Intersection Observer**: Scroll-triggered animations and lazy loading
- **Accessible**: WCAG 2.1 AA compliance with proper ARIA labels
- **SEO Optimized**: Semantic HTML and meta tags for search engines
- **Cross-browser Compatible**: Works on all modern browsers

## 🚀 Quick Start

### 1. Download and Setup
```bash
# Clone or download the portfolio-website folder
# Navigate to the project directory
cd portfolio-website

# Open in your preferred code editor
code .
```

### 2. Customize Your Content
Replace the placeholder content with your actual information:

#### Personal Information (index.html)
- Update the `<title>` and meta tags
- Replace "Your Name" in the hero section
- Update the professional title and tagline
- Add your actual profile image to `images/profile/`

#### About Section
- Replace the placeholder text with your professional summary
- Update achievement numbers and descriptions
- Modify the "Current Focus" list items

#### Skills Section
- Update skill names and proficiency levels
- Modify the `data-skill` attributes (0-100) for progress bars
- Add or remove skill categories as needed

#### Experience Section
- Replace timeline items with your actual work history
- Update dates, companies, and job descriptions
- Modify achievement lists and skill tags

#### Projects Section
- Update the projects array in `js/projects.js`
- Add your project images to `images/projects/`
- Replace demo links and GitHub repository URLs

#### Testimonials Section
- Replace with actual quotes from recommendation letters
- Add testimonial author images to `images/testimonials/`
- Update names, titles, and companies

#### Contact Information
- Update email address, LinkedIn, and GitHub URLs
- Modify location information
- Customize the contact form endpoint (see Contact Form Setup)

### 3. Add Your Images

Create the following image directories and add your images:

```
portfolio-website/
├── images/
│   ├── profile/
│   │   └── profile-placeholder.jpg (Replace with your headshot)
│   ├── projects/
│   │   ├── ecommerce-dashboard.jpg
│   │   ├── web-scraping-tool.jpg
│   │   ├── churn-prediction.jpg
│   │   ├── marketing-analytics.jpg
│   │   ├── sentiment-analyzer.jpg
│   │   └── competitive-intelligence.jpg
│   ├── testimonials/
│   │   ├── author1-placeholder.jpg
│   │   ├── author2-placeholder.jpg
│   │   └── author3-placeholder.jpg
│   └── icons/
│       └── favicon.ico
```

**Image Requirements:**
- Profile image: 400x400px, high quality, professional headshot
- Project images: 600x400px, screenshots or mockups of your projects
- Testimonial images: 120x120px, professional photos of recommenders
- All images should be optimized for web (WebP format preferred)

### 4. Contact Form Setup

The contact form is currently set up with a mock submission. To make it functional:

#### Option 1: Static Site with Form Service
Use a service like Formspree, Netlify Forms, or Getform:

```html
<!-- Update the form action in index.html -->
<form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### Option 2: Custom Backend
Update the `submitForm` method in `js/main.js`:

```javascript
async submitForm(formData) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
    
    return await response.json();
}
```

### 5. Deploy Your Website

#### Option 1: Netlify (Recommended)
1. Create a Netlify account
2. Drag and drop the `portfolio-website` folder to Netlify
3. Configure custom domain (optional)

#### Option 2: GitHub Pages
1. Create a GitHub repository
2. Upload files to the repository
3. Enable GitHub Pages in repository settings

#### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the deployment prompts

## 🎨 Customization Guide

### Color Scheme
Update the CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #2563eb;        /* Main brand color */
    --primary-dark: #1d4ed8;         /* Darker shade for hover states */
    --primary-light: #3b82f6;        /* Lighter shade for gradients */
    --accent-color: #f59e0b;         /* Accent color for highlights */
    /* ... other colors */
}
```

### Typography
The website uses Inter font from Google Fonts. To change:

1. Update the Google Fonts link in `index.html`
2. Modify the `--font-family` variable in `css/styles.css`

### Layout Modifications
- **Section spacing**: Adjust `--section-padding` variable
- **Container width**: Modify `--max-width` variable
- **Breakpoints**: Update media queries in `css/responsive.css`

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add navigation link to the navbar
3. Style the section in `css/styles.css`
4. Add responsive styles in `css/responsive.css`
5. Update navigation JavaScript in `js/navigation.js`

## 📱 Browser Support

### Supported Browsers
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Graceful Degradation
The website includes fallbacks for:
- CSS Grid → Flexbox
- Intersection Observer → Immediate visibility
- CSS Custom Properties → Static values
- Modern JavaScript features → Polyfills where needed

## 🔧 Development

### File Structure
```
portfolio-website/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── responsive.css      # Responsive breakpoints
│   └── animations.css      # Animations and transitions
├── js/
│   ├── main.js            # Main JavaScript functionality
│   ├── navigation.js      # Navigation and scrolling
│   └── projects.js        # Project showcase functionality
├── images/                # Image assets
├── assets/                # Documents and files
└── README.md              # This file
```

### Code Organization
- **HTML**: Semantic structure with proper ARIA labels
- **CSS**: BEM methodology for class naming
- **JavaScript**: ES6+ features with fallbacks for older browsers
- **Performance**: Optimized for Core Web Vitals

### Adding New Features

#### Adding a New Project
Update the projects array in `js/projects.js`:

```javascript
{
    id: 7,
    title: "Your Project Title",
    description: "Brief description of your project...",
    category: "ml", // ml, analytics, automation, web
    techStack: ["Python", "TensorFlow", "AWS"],
    image: "images/projects/your-project.jpg",
    demoLink: "https://your-demo.com",
    githubLink: "https://github.com/username/project",
    caseStudyLink: "assets/case-studies/project.pdf",
    features: [
        "Feature 1",
        "Feature 2"
    ],
    challenges: [
        "Challenge 1",
        "Challenge 2"
    ]
}
```

#### Adding New Skills
Update the skills HTML in `index.html`:

```html
<div class="skill-item">
    <span class="skill-name">New Skill</span>
    <div class="skill-bar">
        <div class="skill-progress" data-skill="85"></div>
    </div>
</div>
```

## 🎯 Performance Optimization

### Implemented Optimizations
- **Image Optimization**: Lazy loading and WebP format support
- **CSS Optimization**: Critical CSS inlined, non-critical CSS loaded asynchronously
- **JavaScript Optimization**: Debounced scroll events, efficient DOM queries
- **Caching**: Proper cache headers for static assets

### Performance Monitoring
The website includes a performance monitor that tracks:
- Page load time
- Largest Contentful Paint (LCP)
- Resource loading times

Check the browser console for performance metrics.

## 🔒 Security Considerations

### Implemented Security Features
- **Content Security Policy**: Prevents XSS attacks
- **Form Validation**: Client and server-side validation
- **External Links**: `rel="noopener"` on external links
- **Image Security**: Prevents hotlinking and unauthorized access

### Recommendations
- Use HTTPS for production deployment
- Implement server-side form validation
- Regular security audits and updates

## 📊 Analytics Integration

To add Google Analytics:

1. Add the tracking code to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

2. Track custom events in JavaScript:
```javascript
// Track project views
gtag('event', 'project_view', {
    'project_name': projectTitle
});
```

## 🤝 Contributing

If you'd like to contribute improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

### Common Issues

#### Images Not Loading
- Check file paths are correct
- Ensure images are in the correct directories
- Verify image file extensions match HTML references

#### Contact Form Not Working
- Update form action URL
- Configure backend endpoint
- Check console for JavaScript errors

#### Animations Not Working
- Ensure CSS files are loaded correctly
- Check for JavaScript console errors
- Verify browser compatibility

#### Mobile Menu Issues
- Clear browser cache
- Check responsive CSS is loading
- Test on actual devices, not just browser dev tools

### Getting Help
- Check the browser console for error messages
- Validate HTML and CSS using W3C validators
- Test in different browsers to isolate issues

---

## 🎉 Congratulations!

You now have a professional, modern portfolio website ready to showcase your data science expertise. Remember to:

1. **Keep it updated**: Regularly add new projects and update your experience
2. **Monitor performance**: Use tools like Google PageSpeed Insights
3. **Gather feedback**: Ask colleagues and mentors for input
4. **Track analytics**: Monitor visitor behavior and popular content
5. **Stay current**: Update technologies and design trends as needed

Good luck with your data science career! 🚀
