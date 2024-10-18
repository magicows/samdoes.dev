import { SectionHeader } from "../util/SectionHeader";
import { ExperienceItem } from "./ExperienceItem";

export const Experience = () => {
  return (
    <section className="section-wrapper" id="experience">
      <SectionHeader title="Experience" dir="l" />
      {experience.map((item) => (
        <ExperienceItem key={item.title} {...item} />
      ))}
    </section>
  );
};

const experience = [
  {
    title: "Freestyle",
    position: "Senior Developer",
    time: "2021 - Present",
    location: "Warwick, UK",
    description:
      "These days, I find myself mainly building mobile experiences in React Native and Expo but still get to build some pretty cool bespoke web apps and components. I'm part of an ace team of developers that specialise in Optimizely so sometimes I throw my hat in that ring too when required.", 
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
