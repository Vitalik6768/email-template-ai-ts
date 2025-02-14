import Image from "next/image";
import Header from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Gallery | Your Site Name',
  description: 'Browse through our collection of interactive projects and templates.',
};

export default function Home() {
  // Sample projects - you can replace with your actual data
  const projects = [
    {
      id: "52edc999-9c06-4e75-8631-07d29f3d6460",
      title: "Project 1",
      image: "templace.svg"
    },
    {
      id: "8a392d41-f43b-4cd3-aa54-0d859e45061b",
      title: "Project 2",
      image: "templace.svg"
    },
    // Add more projects as needed
  ];

  return (
    <div>
      <Header />
      <Hero />
     

      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg overflow-hidden shadow-2xl border max-w-4xl mx-auto">
          <img
            src="https://insightful-elk-623.convex.cloud/api/storage/c5fab876-b7cf-4701-8355-1ba651499c46"
            alt="interface"
            width={1200}
            height={800}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Email Templates</h2>
        <p className="text-gray-600 mb-8">Choose from our collection of professionally designed email templates</p>
      </div>

      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[60%]">
          {projects.map((project) => (
            <Link
              href={`/editor/${project.id}`}
              key={project.id}
              className="block group bg-white hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            >
              <div className="aspect-square relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>


    </div>
  );
}