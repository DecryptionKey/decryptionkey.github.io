import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Ma'Nye Wade — Cybersecurity Professional",
  author: "Ma'Nye Wade",
  description:
    "Junior Cybersecurity professional based in New York, specializing in Cyber Operations, Network Defense, threat detection, and incident response.",
  lang: "en",
  siteLogo: "/mw-logo-wht-800.png",
  navLinks: [
    { text: "Experience", href: "#experience" },
    { text: "Projects", href: "#projects" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://linkedin.com/in/manyewade" },
    { text: "Github", href: "https://github.com/decryptionkey" },
    { text: "Resume", href: "https://drive.google.com/file/d/1hES5tdXZK-vKiQKT6LPTTinFGzw38Wpt/view?usp=sharing"},
  ],
  socialImage: "/zen-og.png",
  canonicalURL: "https://astro-zen.vercel.app",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Ma'Nye Wade",
    specialty: "Cybersecurity Professional",
    summary:
      "Cybersecurity professional based in New York, specializing in Cyber Operations, Network Defense, Threat Detection, and Incident Response.",
    email: "nyebusiness@protonmail.com",
  },
  experience: [
    {
      company: "Marist University",
      position: "Cybersecurity Specialist: Vulnerability Management and Email Security",
      startDate: "May 2025",
      endDate: "Dec 2025",
      summary: [
        "Triaged Microsoft Defender XDR alerts daily, performing independent true/false positive determinations and documenting suspicious indicators in a structured tracking log to support escalation decisions by senior analysts.",
        "Conducted endpoint vulnerability assessment using Tenable Nessus, identifying and reporting a high volume of critical vulnerabilities stemming from prolonged patch neglect and delivering remediation recommendations to management.",
        "Developed 6–10 incident response flowcharts aligned to security playbooks, standardizing threat detection and remediation workflows across a 3–4 person student cybersecurity team.",
        "Researched emerging CVEs and security patches, producing written vulnerability reports to inform remediation prioritization and reduce organizational risk exposure.",
        "Produced and delivered security awareness content including blog posts and workshops for university staff and students, covering phishing, social engineering, and secure behavior practices.",
      ]
    },
    {
      company: "",
      position: "IT Help Desk Technician",
      startDate: "Sept 2024",
      endDate: "May 2025",
      summary: [
        "Resolved 300+ tickets across walk-in, phone, and portal channels via TeamDynamix ITSM, delivering Tier 1/2 support to 5,000+ users including VPN troubleshooting, IAM operations, DUO Security MFA enrollment, and password resets via ReACT self-service solution.",
        "Achieved 98% uptime for 5+ WEPA print stations through preventive maintenance and hardware troubleshooting while enforcing data security and confidentiality protocols across campus computer labs.",
        "Triaged and routed support requests by assessing scope and permissions, independently resolving issues within authority and escalating access-restricted tasks to full-time IT staff or corresponding departments.",
        "Improved IT service delivery by authoring KBAs and SOPs documenting resolution workflows, and designing a Help Desk website wireframe that was successfully implemented to streamline user access to support resources.",
        "Informally mentored fellow student technicians on a team of 8–10, sharing troubleshooting approaches and resolution workflows to support team consistency and service quality.",
      ],
    },
  ],
  projects: [
    {
      name: "Asset Discovery",
      summary: "Mapped an undocumented multi-router network using Nmap, Quagga, and pfSense — reconstructing the full topology, identifying active hosts across six subnets, and delivering a professional HTML asset inventory report.",
      linkPreview: "/",
      linkSource: "https://github.com/DecryptionKey/CYBR204/blob/main/Labs/Network%20Infrastructure%20Assessment%20%26%20Asset%20Discovery.md",
      image: "/niaad-topology.png",
    },
    {
      name: "Arx Social",
      summary: "A beginner social media web application built as a school project, replicating the core functionality of X (formerly Twitter) with a personal design touch.",
      linkPreview: "https://arx-social--dezloridcorpora.replit.app",
      linkSource: "https://github.com/decryptionkey/arx-social",
      image: "/arx-42.png",
    },
  ],
  about: {
    description: `
      I'm Ma'Nye Wade, a junior cybersecurity professional pursuing a B.S. in Cybersecurity: Cyber Operations and an M.S. in Cyber Risk Management and Compliance at the University at Albany. 
      
      With hands-on experience in threat detection, vulnerability management, network infrastructure assessment, and security awareness, I build and defend systems from the ground up. 
      
      I'm passionate about solving complex security challenges and am actively seeking opportunities where I can grow, contribute, and make an impact.
    `,
    image: "/nye-big.png",
  },
};

// #5755ff
