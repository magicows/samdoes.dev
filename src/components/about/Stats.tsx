import { Chip } from "../util/Chip";
import Reveal from "../util/Reveal";
import { AiFillCode, AiFillSmile } from "react-icons/ai";

export const Stats = () => {
  return (
    <div className="relative">
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <AiFillCode className="text-burn text-2xl" />
            <span className="font-bold ml-2">Use at work</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
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
          <h4 className="flex items-center mb-6">
            <AiFillSmile className="text-burn text-2xl" />
            <span className="font-bold ml-2">Use for fun</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
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
