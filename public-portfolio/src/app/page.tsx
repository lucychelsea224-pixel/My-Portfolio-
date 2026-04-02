import { supabase } from "@/lib/supabase";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const { data: settingsData } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  const { data: projectsData } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const settings = settingsData || {
    profile_image_url: null,
    cv_url: null,
    about_me: "Hello! I am a software developer. Welcome to my portfolio.",
  };

  const projects = projectsData || [];

  // Split projects into two arrays to insert an AdBanner in the middle
  const middleIndex = Math.ceil(projects.length / 2);
  const firstHalfProjects = projects.slice(0, middleIndex);
  const secondHalfProjects = projects.slice(middleIndex);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 pt-8">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Hi, I'm a Developer.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
            {settings.about_me}
          </p>
          <div className="flex justify-center md:justify-start">
            {settings.cv_url ? (
              <a
                href={settings.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 transition-colors"
              >
                View My CV
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed"
              >
                CV Not Available
              </button>
            )}
          </div>
        </div>
        <div className="w-48 h-48 md:w-64 md:h-64 relative flex-shrink-0">
          {settings.profile_image_url ? (
            <Image
              src={settings.profile_image_url}
              alt="Profile Picture"
              fill
              className="rounded-full object-cover shadow-lg border-4 border-white"
              sizes="(max-width: 768px) 192px, 256px"
              priority
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-gray-400 text-sm">No Photo</span>
            </div>
          )}
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Projects Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Selected Projects</h2>

        {projects.length === 0 ? (
          <p className="text-gray-500 italic">No projects added yet.</p>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {firstHalfProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Ad slot in the middle of project grid */}
            {projects.length > 0 && <AdBanner slotId="Middle of Project Grid" />}

            {secondHalfProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secondHalfProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow bg-white">
      {project.image_url ? (
        <div className="w-full h-48 relative bg-gray-100">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">No Screenshot</span>
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{project.description}</p>
        {project.github_url && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
