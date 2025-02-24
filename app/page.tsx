// src/app/page.tsx
'use client';
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilter from '@/components/ProjectFilter';
import BlogCard from '@/components/BlogCard';
import ContactForm from '@/components/ContactForm';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';

export default function Home() {
  const [currentFilter, setCurrentFilter] = useState('All');
  const categories = ['All', 'Web', 'Mobile', 'Design', 'Backend'];

  const filteredProjects = currentFilter === 'All'
    ? projects
    : projects.filter(project => 
        project.technologies.includes(currentFilter)
      );

  return (
    <main>
      {/* Hero Section with 3D Animation */}
      <div className="relative min-h-screen">
        <HeroSection />
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Projects
          </h2>
          <ProjectFilter
            categories={categories}
            onFilterChange={setCurrentFilter}
            currentFilter={currentFilter}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Get in Touch
          </h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}