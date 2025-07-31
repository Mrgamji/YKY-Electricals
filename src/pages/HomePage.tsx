import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Clock, Users, Star, Check, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectsAPI } from '../utils/api';

const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Updated Project interface to match API response
  interface Project {
    id: number;
    title: string;
    category: string;
    image?: string; // optional, for compatibility
    image_url?: string; // optional, for compatibility
    description: string;
    [key: string]: any; // allow extra fields
  }

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await projectsAPI.getAll(); // this is the parsed data: { projects: [...] }
        const data = Array.isArray(result.projects) ? result.projects : [];
  
        const normalized = data.map((project) => ({
          ...project,
          image: project.image_url || project.image || '',
        }));
  
        setProjects(normalized);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProjects();
  }, []);

  // Hero slideshow images
  const heroSlides = [
    '/uploads/15.jpeg',
    '/uploads/12.jpeg',
    '/uploads/13.jpeg',
    '/uploads/33.jpeg',
    '/uploads/23.jpeg',
  ];

  // Auto-advance hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => {
        // Normalize category comparison (case-insensitive)
        if (!project.category) return false;
        return project.category.toLowerCase() === activeFilter.toLowerCase();
      });

  const testimonials = [
    {
      id: 1,
      name: 'Alh Musa Muhammad',
      rating: 5,
      comment: "YKY Electricals really impressed me! They came to my shop in Surulere and sorted out my faulty wiring in no time. I felt at ease with how friendly and respectful the team was. I’ll definitely call them again.",
      location: 'Yakasai, Kano, Nigeria'
    },
    {
      id: 2,
      name: 'Aisha Bello',
      rating: 5,
      comment: "I was worried about the constant power trips in my house, but YKY Electricals explained everything clearly and fixed it fast. They even followed up a week later to check if everything was still fine. That personal touch means a lot.",
      location: 'Abuja, Nigeria'
    },
    {
      id: 3,
      name: 'Dr. Kabir Bukar',
      rating: 5,
      comment: "Very professional and trustworthy. They helped install new lighting in my mum’s kitchen and treated us like family. I appreciate their honesty and the way they cleaned up after the work. Highly recommended!",
      location: 'BUK Quaters, Kano State, Nigeria'
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] max-h-[700px] overflow-hidden">
        {/* Slideshow Background */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide}
                alt={`Electrical service ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center z-10 pt-12 pb-12 md:pt-16 md:pb-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8 text-white">
              <motion.h1 
                variants={slideUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              >
                <span className="text-orange-400"> YKY Electricals</span>
                <span className="block text-lg md:text-xl font-medium italic text-orange-100 drop-shadow-sm tracking-wide" style={{ fontFamily: 'cursive, sans-serif' }}>
                  Powering Homes. Empowering Futures
                </span>
              </motion.h1>
              <motion.p 
                variants={slideUp}
                className="text-lg md:text-xl text-blue-100 leading-relaxed"
              >
                <span className="block bg-white/90 text-blue-900 rounded-lg px-6 py-4 shadow-lg font-medium text-base md:text-lg border border-orange-200">
                  At YKY Electricals, we deliver expert electrical wiring solutions tailored for safety, performance, and long-term reliability. From new installations to complete rewiring, we light up your spaces with precision and care.
                </span>
              </motion.p>
              <motion.div 
                variants={slideUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  to="/book-service" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-orange-500/30"
                >
                  Book a Service
                </Link>
                <Link 
                  to="/contact" 
                  className="border-2  bg-blue-500 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-center shadow-lg hover:shadow-white/20"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-orange-500 w-6' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          {/* CAC Certificate Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100"
          >
            <div className="w-28 h-28 mb-4 rounded-lg overflow-hidden border-4 border-blue-200 shadow-md bg-gray-100 flex items-center justify-center">
              {/* Placeholder for CAC certificate image */}
              <img
                src="/uploads/cac.jpeg"
                alt="CAC Certificate"
                className="object-contain w-full h-full"
                loading="lazy"
                style={{ background: "#f3f4f6" }}
                onError={e => { e.currentTarget.src = "https://dummyimage.com/300x300/edf2f7/aaa&text=CAC+Certificate"; }}
              />
            </div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">CAC Registered</h3>
            <p className="text-gray-600 text-center mb-4">
              YKY Electricals is officially registered with the Corporate Affairs Commission (CAC), ensuring trust, transparency, and compliance with Nigerian business regulations.
            </p>
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span>BN: 3224832</span>
            </div>
          </motion.div>

          {/* CEO Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-orange-100"
          >
            <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-orange-200 shadow-md bg-gray-100 flex items-center justify-center">
              {/* Placeholder for CEO image */}
              <img
                src="/uploads/ceo.jpeg"
                alt="CEO of YKY Electricals"
                className="object-cover w-full h-full"
                loading="lazy"
                style={{ background: "#f3f4f6" }}
                onError={e => { e.currentTarget.src = "https://dummyimage.com/300x300/fff7ed/aaa&text=CEO"; }}
              />
            </div>
            <h3 className="text-xl font-bold text-orange-700 mb-1">Engr. Yusif Ali Yakasai</h3>
            <p className="text-gray-500 text-sm mb-2">Founder &amp; CEO, YKY Electricals</p>
            <p className="text-gray-600 text-center mb-4">
              With over 15 years of hands-on experience, Engr. Yusuf leads YKY Electricals with a passion for excellence, safety, and innovation in electrical engineering. His vision is to empower homes and businesses with reliable, world-class electrical solutions.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">B.Eng, MNSE</span>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">15+ Years Experience</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose YKY Electricals?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver exceptional electrical services with a commitment to safety, 
              quality, and customer satisfaction.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                title: "Expert Technicians",
                description: "Licensed and certified electricians with years of experience",
                bg: "bg-blue-100",
                hover: "group-hover:bg-blue-200"
              },
              {
                icon: <Shield className="w-8 h-8 text-orange-600" />,
                title: "Safety First",
                description: "All work follows strict safety protocols and code compliance",
                bg: "bg-orange-100",
                hover: "group-hover:bg-orange-200"
              },
              {
                icon: <Clock className="w-8 h-8 text-green-600" />,
                title: "24/7 Emergency",
                description: "Round-the-clock emergency services for urgent electrical issues",
                bg: "bg-green-100",
                hover: "group-hover:bg-green-200"
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Customer Focus",
                description: "Dedicated to providing excellent customer service and satisfaction",
                bg: "bg-purple-100",
                hover: "group-hover:bg-purple-200"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`${feature.bg} ${feature.hover} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Recent Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Take a look at some of our completed projects showcasing our expertise 
              in electrical installations and repairs.
            </p>
            
            {/* Filter Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              {['all', 'installations', 'repairs', 'commercial', 'emergency'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {filter === 'all' ? 'All Projects' : filter}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-12">
                  No projects found for this category.
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideUp}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-60 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {project.image ? (
                        <img 
                          src={project.image.startsWith('/') ? `/server${project.image}` : `/server/${project.image}`}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={e => { e.currentTarget.src = "https://dummyimage.com/600x400/eee/aaa&text=No+Image"; }}
                        />
                      ) : (
                        <img 
                          src="https://dummyimage.com/600x400/eee/aaa&text=No+Image"
                          alt="No project"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full capitalize">
                        {project.category}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't wait for electrical problems to get worse. Contact us today for 
              professional electrical services you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/book-service" 
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/30"
                >
                  Book Service Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/contact" 
                  className="inline-block border-2 border-white hover:bg-white hover:text-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-white/20"
                >
                  Get Free Estimate
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-400" />
              <span>yusifaliyakasai@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-orange-400" />
              <span>08036499051</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span>Mon-Fri: 8AM - 6PM | Sat: 9AM - 4PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;