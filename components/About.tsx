import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SketchArrow } from './SketchElements';
import Parallax from './Parallax';
import CertificateModal from './CertificateModal';
import profileImage from '../assets/MyImage.png';
import uiuxCert from '../assets/ui-ux-certificate.jpg';
import olcademyCert from '../assets/Olcademy internship.jpg';
import cerasCert from '../assets/cerass internship.jpg';


// Certifications Data
const CERTIFICATES = [
   {
      id: 1,
      name: 'UI/UX Design Professional',
      issuer: 'Professional Certification',
      date: '2024-2025',
      image: uiuxCert,
      description: 'Comprehensive UI/UX design certification covering user research, wireframing, prototyping, and design systems.'
   },
   {
      id: 2,
      name: 'UX Design Internship',
      issuer: 'Ceeras IT Services',
      date: '2025',
      image: cerasCert,
      description: '6-month intensive UX design internship working on live client projects and real-world design challenges.'
   },
   {
      id: 3,
      name: 'Design Internship',
      issuer: 'Olcademy',
      date: '2025',
      image: olcademyCert,
      description: 'Design internship focused on UI/UX principles, user-centered design, and modern design workflows.'
   }
];

const About: React.FC = () => {
   const [selectedCertificate, setSelectedCertificate] = useState<typeof CERTIFICATES[0] | null>(null);

   return (
      <section id="about" className="w-full py-32 px-6 md:px-12 bg-white relative overflow-hidden">
         <div className="max-w-6xl mx-auto">

            {/* Main Bio */}
            <div className="flex flex-col md:flex-row gap-16 items-center mb-32">

               <Parallax speed={-0.2} className="w-full md:w-1/2 relative">
                  <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                  >
                     <div className="aspect-[3/4] bg-stone-100 relative z-10 overflow-hidden border border-stone-200 p-3 rotate-[-2deg] shadow-lg">
                        <div className="w-full h-full bg-stone-200 overflow-hidden">
                           {/* Placeholder for profile image, using a stylistic abstract image if real one isn't available via simple URL */}
                           <img src={profileImage} alt="Anuj D. Dighe" className="w-full h-full object-cover" />
                        </div>
                     </div>
                     <div className="absolute -top-4 -left-4 w-full h-full border border-ink/20 z-0 rotate-[2deg]"></div>
                     <SketchArrow className="absolute -bottom-10 -right-10 w-24 text-stone-400 rotate-[-45]" />
                     <p className="absolute -bottom-4 -right-16 font-hand text-stone-400 rotate-[-10deg]">That's me</p>
                  </motion.div>
               </Parallax>

               <Parallax speed={0.1} className="w-full md:w-1/2">
                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                  >
                     <h2 className="font-serif text-5xl text-ink mb-8">About <span className="italic text-stone-400">Me</span></h2>
                     <div className="prose prose-stone text-stone-600 font-sans leading-relaxed">
                        <p className="text-lg mb-6">
                           Bridging the gap between <span className="text-ink font-medium">human creativity</span> and <span className="text-ink font-medium">artificial intelligence</span> to create exceptional digital experiences.
                        </p>
                        <p className="mb-6">
                           I transform complex problems into intuitive solutions through user-centered design and cutting-edge AI workflows. Based in Badlapur, India, I operate at the intersection of artisanal craftsmanship and generative tech.
                        </p>
                        <blockquote className="font-serif italic text-2xl text-ink pl-6 border-l-2 border-clay my-8">
                           "Great design is invisible. It solves problems so elegantly that users don't even think about the interface."
                        </blockquote>
                     </div>

                     {/* Credentials Stack */}
                     <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <motion.div
                           className="p-6 bg-[#f8fafc] border border-stone-100 relative group"
                           whileHover={{ y: -5 }}
                           transition={{ type: "spring", stiffness: 300 }}
                        >
                           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 opacity-50"></div>
                           <h4 className="font-serif text-lg mb-1">UI/UX Certified</h4>
                           <p className="text-xs font-mono text-stone-400 uppercase">Professional Certification 2024</p>
                        </motion.div>
                        <motion.div
                           className="p-6 bg-[#f8fafc] border border-stone-100 relative group"
                           whileHover={{ y: -5 }}
                           transition={{ type: "spring", stiffness: 300 }}
                        >
                           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 opacity-50"></div>
                           <h4 className="font-serif text-lg mb-1">Internship Completed</h4>
                           <p className="text-xs font-mono text-stone-400 uppercase">2X Internships</p>
                        </motion.div>
                     </div>
                  </motion.div>
               </Parallax>
            </div>

            {/* Certifications Carousel */}
            <motion.div
               className="my-32"
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <div className="text-center mb-12">
                  <h3 className="font-serif text-3xl text-ink mb-3">Certifications</h3>
                  <p className="font-sans text-sm text-stone-500">Professional credentials and achievements</p>
               </div>

               {/* Scrolling Container */}
               <div className="relative overflow-hidden">
                  {/* Gradient Fades */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                  {/* Certificates */}
                  <motion.div
                     className="flex gap-8 py-8"
                     animate={{ x: [0, -1200] }}
                     transition={{
                        x: {
                           repeat: Infinity,
                           repeatType: "loop",
                           duration: 30,
                           ease: "linear"
                        }
                     }}
                  >
                     {/* Render certificates twice for infinite loop */}
                     {[...CERTIFICATES, ...CERTIFICATES].map((cert, index) => (
                        <motion.div
                           key={`${cert.id}-${index}`}
                           className="flex-shrink-0 w-80 bg-paper border border-charcoal p-6 cursor-pointer group"
                           whileHover={{
                              y: -8,
                              scale: 1.02,
                              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                           }}
                           transition={{ type: "spring", stiffness: 300 }}
                           onClick={() => setSelectedCertificate(cert)}
                        >
                           {/* Certificate Preview Image */}
                           <div className="aspect-[4/3] bg-stone-100 mb-4 overflow-hidden">
                              <img
                                 src={cert.image}
                                 alt={cert.name}
                                 className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${cert.id === 2 ? 'object-top' : 'object-center'
                                    }`}
                              />
                           </div>

                           {/* Certificate Info */}
                           <div>
                              <h4 className="font-serif text-lg text-ink mb-2 group-hover:text-clay transition-colors">
                                 {cert.name}
                              </h4>
                              <p className="font-sans text-xs text-stone-500 uppercase tracking-wider mb-1">
                                 {cert.issuer}
                              </p>
                              <p className="font-mono text-xs text-stone-400">
                                 {cert.date}
                              </p>
                           </div>

                           {/* Hover Indicator */}
                           <div className="mt-4 text-xs font-sans text-clay opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to view →
                           </div>
                        </motion.div>
                     ))}
                  </motion.div>
               </div>

               {/* Accent Line */}
               <div className="w-full h-px bg-gradient-to-r from-transparent via-clay to-transparent mt-8 opacity-30"></div>
            </motion.div>

         </div>

         {/* Certificate Modal */}
         {selectedCertificate && (
            <CertificateModal
               isOpen={!!selectedCertificate}
               onClose={() => setSelectedCertificate(null)}
               certificateName={selectedCertificate.name}
               certificateImage={selectedCertificate.image}
               issuer={selectedCertificate.issuer}
               date={selectedCertificate.date}
            />
         )}
      </section>
   );
};

export default About;