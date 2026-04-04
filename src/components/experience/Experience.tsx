import { SectionHeader } from "../util/SectionHeader";
import { ExperienceItem } from "./ExperienceItem";

export const Experience = () => {
  return (
    <section className="section-wrapper" id="experience">
      <SectionHeader title="Experience" dir="l" />
      <div className="space-y-6">
        {experience.map((item) => (
          <ExperienceItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
};

const experience = [
  {
    title: "LAB",
    position: "Front-end Team Lead",
    time: "2026 - Present",
    location: "Remote, UK",
    description:
      "I'm now a Frontend Team Lead and part of a wider team following our merger with LAB Group. While I still work across React, React Native, and Optimizely projects, the broader team predominantly uses Storyblok, Contentful, and Sitecore.", 
    tech: [
      "React Native",
      "React",
      "Netlify",
      "Expo",
      "Optimizely",
      "Storyblok",
      "Docker",
      "Node.js",      
    ],
  },
  {
    title: "Freestyle",
    position: "Senior Developer",
    time: "2021 - 2026",
    location: "Warwick, UK",
    description:
      "I mainly built mobile experiences in React Native and Expo, while still getting to work on some pretty cool bespoke web apps and components. I was part of an ace team of developers that specialised in Optimizely, so I occasionally threw my hat in that ring when required.", 
    tech: [
      "React Native",
      "React",
      "Netlify",
      "Expo",
      "Optimizely",
      "Azure Devops",
      "Git",
      "Docker",
      "Node.js",      
    ],
  },
  {
    title: "Cogent",
    position: "Frontend Developer",
    time: "2019 - 2021",
    location: "Meriden, UK",
    description:
      "Day-to-day responsibility of frontend for a variety of clients across different industries to build impactful campaigns and experiences. I built a custom table reservation and food preordering web app for a large retailer. Also learned I suck at ping pong.",
    tech: ["React", "Umbraco", "Wordpress", "Next.js", "Jenkins", "Trello"],
  },
  {
    title: "Code Addicts",
    position: "Frontend Developer",
    time: "2016 - 2019",
    location: "Birmingham, UK",
    description:
      "Started in a Project Management role whilst upskilling on existing development skills. Moved into a hybrid role where I built Wordpress websites from bespoke designs. Became a full time developer and haven't looked back.",
    tech: [
      "Wordpress",
      "React",
      "PHP",
      "Rest API",
      "Headless",
    ],
  },
];
