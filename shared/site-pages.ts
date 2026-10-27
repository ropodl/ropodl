export const sitePageDefaults: Record<string, { label: string, content: Record<string, string>, seoTitle: string, seoDescription: string }> = {
  home: {
    label: 'Home',
    content: {
      headingLine1: 'Hi, I\'m Saroj Poudel.',
      headingLine2: 'I\'m a full-stack developer and designer based in Kathmandu, Nepal.',
      description: 'I focus on creating digital experiences that are intuitive, enjoyable, and effective. I\'ve been building things with Vue, Drizzle, and Nuxt, combining design sense with strong engineering to deliver practical solutions.',
      button: 'Get in touch',
      projectsEyebrow: 'Selected work',
      projectsHeading: 'Projects',
      projectsLink: 'See all',
      blogsEyebrow: 'Blog',
      blogsHeading: 'Blog',
      blogsLink: 'See all',
      projectCardLink: 'View project',
      blogCardLink: 'Read',
      projectsEmpty: 'New projects are on the way.',
      blogsEmpty: 'No blog posts yet.'
    },
    seoTitle: 'Saroj Poudel — Full-stack developer & designer',
    seoDescription: 'Full-stack developer and designer in Kathmandu. Selected work with Vue, Nuxt, and Laravel.'
  },
  about: {
    label: 'About',
    content: {
      eyebrow: 'A little about me',
      heading: 'Developer by craft, designer by instinct.',
      paragraph1: 'I\'m Saroj, a frontend developer and designer. I enjoy turning ideas into intuitive digital experiences that are useful, thoughtful, and a pleasure to use.',
      paragraph2: 'I work across the stack, building responsive interfaces with Vue and Nuxt, and creating backend services with tools like Express.js and Hono. I care about clear design, maintainable code, and the details that make a product feel complete.',
      paragraph3: 'Over the years I\'ve worked with designers, product teams, and developers to shape new products and improve existing ones, bringing a practical mix of visual design and engineering to each project.',
      valueEyebrow: 'The value I bring',
      valueHeading: 'Thoughtful design. Solid engineering. One complete experience.',
      valueDescription: 'I connect visual design with full-stack development to help ideas become useful, polished products. From shaping the interface to building, launching, and maintaining it, I keep the details working together.',
      skills: 'Vue.js, Nuxt, TypeScript, Node.js, Express.js, Hono, UI design, HTML, CSS, JavaScript, Git, Laravel, SEO, Figma, Adobe XD, Illustrator, Photoshop, Premiere Pro, DigitalOcean, cPanel',
      howIWorkEyebrow: 'A considered process',
      howIWorkTitle: 'How I work',
      howIWorkIntro: 'Good work comes from understanding the problem, making deliberate choices, and following through beyond the first release.',
      howIWorkSteps: 'Understand the goal | Align on the people, problem, and outcome before settling on a solution.\nShape the experience | Give the content, structure, and visual direction a clear purpose.\nBuild it end to end | Bring the interface and underlying functionality together with care.\nLaunch and keep improving | Prepare for search, deployment, and the practical work of keeping things running.',
      journey: 'The journey',
      experienceTitle: 'Experience',
      experienceIntro: 'A few of the teams and roles that have shaped how I approach design and development.',
      experience: 'Software Engineer | Aayulogic Pvt. Ltd. | 2024 — Present\nFreelance Web Designer & Developer | API Technology Pvt. Ltd. | 2021 — 2024 | Designed, built, and maintained the company website on Nuxt 3 as its sole developer; Also produced video content for the company\nChief Technology Officer | SoftMahal Technologies | 2019 — 2023 | Led delivery of websites and admin panels for businesses, government, schools, and NGOs, including the Department of Drinking Water, Little Buddha College, and PHRD Nepal; Ran hosting and deployments for internal and client software across DigitalOcean, cPanel, and WHMCS\nGraphic / Web Designer | Fivonest Technology | 2018 — 2019 | Designed graphics for client Facebook pages and websites such as Cakesewa; Started building front ends with Bootstrap, jQuery, and vanilla JavaScript',
      educationEyebrow: 'Foundations',
      educationTitle: 'Education',
      educationIntro: 'A foundation spanning software engineering and computer science.',
      education: 'Bachelor of Science in Computer Science and Information Technology | Sagarmatha College of Science and Technology | 2021 — Present\nBachelor of Software Engineering | Nepal College of Information Technology | 2014 — 2017',
      button: 'Get in touch'
    },
    seoTitle: 'About Saroj Poudel',
    seoDescription: 'Learn about Saroj Poudel, a full-stack developer and designer based in Kathmandu, Nepal.'
  },
  contact: {
    label: 'Contact',
    content: {
      eyebrow: 'Contact',
      heading: 'Let\'s make something good.',
      description: 'Have a project in mind, want to collaborate, or just want to say hello? Send me a note and I\'ll get back to you.',
      email: 'hello@ropodl.com',
      location: 'Kathmandu, Nepal'
    },
    seoTitle: 'Contact Saroj Poudel',
    seoDescription: 'Get in touch with Saroj Poudel about a project, collaboration, or just to say hello.'
  },
  blogs: {
    label: 'Blog',
    content: {
      eyebrow: 'Blog',
      heading: 'Blog',
      description: 'Writing about frontend development, design, and the process of making things for the web.'
    },
    seoTitle: 'Blog — Saroj Poudel',
    seoDescription: 'Writing about frontend development, design, and making things for the web.'
  },
  projects: {
    label: 'Projects',
    content: {
      eyebrow: 'Selected work',
      heading: 'Projects',
      description: 'A selection of interfaces, experiments, and digital products shaped with care from the first sketch to the final detail.'
    },
    seoTitle: 'Projects — Saroj Poudel',
    seoDescription: 'Selected interfaces, experiments, and digital products by Saroj Poudel.'
  }
}

export function normalizeSitePageContent(slug: string, content: Record<string, string>) {
  if (slug === 'home' && content.description) {
    content = {
      ...content,
      description: content.description.replace(/\bStrapi\b/gi, 'Drizzle').replace(/\bHonoJs\b/gi, 'Nuxt')
    }
  }
  if (slug !== 'about' || !content.experience) return content

  const experience = content.experience.split('\n').map((line) => {
    const [title, company] = line.split('|').map(item => item.trim())
    if (title !== 'Mid Level Frontend Developer' || company?.toLocaleLowerCase() !== 'aayulogic pvt. ltd.') return line
    return line.replace('Mid Level Frontend Developer', 'Software Engineer')
  }).join('\n')

  return { ...content, experience }
}
