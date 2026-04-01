import { Chip } from "../util/Chip";
import Reveal from "../util/Reveal";
import { AiFillCode, AiFillSmile } from "react-icons/ai";

export const Stats = () => {
  return (
    <div className="relative space-y-8">
      <Reveal>
        <div className="border-b-[3px] border-dashed border-zinc-700 pb-8">
          <h4 className="mb-6 flex items-center">
            <AiFillCode className="text-2xl text-[var(--accent-primary)]" />
            <span className="ml-2 text-lg font-black uppercase tracking-[0.14em]">Use at work</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            <Chip>React</Chip>
            <Chip>React Native</Chip>
            <Chip>JavaScript</Chip>
            <Chip>TypeScript</Chip>
            <Chip>Next.js</Chip>
            <Chip>Preact</Chip>
            <Chip>Vue.js</Chip> 
            <Chip>Expo</Chip>             
            <Chip>Vite</Chip>
            <Chip>Tailwind</Chip>
            <Chip>Appcenter</Chip>
            <Chip>OpenAi</Chip>
            <Chip>Firebase</Chip>
            <Chip>Framer</Chip>
            <Chip>Netlify</Chip>
            <Chip>Heroku</Chip>
            <Chip>Azure</Chip>
            <Chip>HTML</Chip>
            <Chip>CSS</Chip>             
            <Chip>Redux</Chip>
            <Chip>NodeJS</Chip>
            <Chip>Express</Chip>
            <Chip>Docker</Chip>
            <Chip>Xcode</Chip>
            <Chip>GitHub</Chip>
            <Chip>Azure Devops</Chip>
            <Chip>Figma</Chip>
            <Chip>Jira</Chip>         
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div>
          <h4 className="mb-6 flex items-center">
            <AiFillSmile className="text-2xl text-[var(--accent-secondary)]" />
            <span className="ml-2 text-lg font-black uppercase tracking-[0.14em]">Use for fun</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            <Chip>Strapi</Chip>
            <Chip>Wordpress</Chip>
            <Chip>Prismic</Chip>           
            <Chip>TinaCMS</Chip> 
            <Chip>Supabase</Chip>  
            <Chip>Portainer</Chip>
            <Chip>Cloudflare</Chip> 
          </div>
        </div>
      </Reveal>
    </div>
  );
};
