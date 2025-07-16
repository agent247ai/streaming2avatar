import React, { useRef } from "react";
interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
}
const testimonials: TestimonialProps[] = [{
  content: "The realism is absolutely stunning. Our customers can't tell they're talking to an AI avatar. It's revolutionary for our customer service.",
  author: "Sarah Chen",
  role: "VP of Digital Experience, TechCorp",
  gradient: "from-blue-700 via-indigo-800 to-purple-900",
  backgroundImage: "/background-section1.png"
}, {
  content: "Students are more engaged than ever. The Avatar AI responds with perfect emotional intelligence, making learning feel personal and natural.",
  author: "Michael Rodriguez",
  role: "Director of Education Technology, EduFuture",
  gradient: "from-indigo-900 via-purple-800 to-orange-500",
  backgroundImage: "/background-section2.png"
}, {
  content: "The lip-sync is flawless, expressions are lifelike. We've finally achieved the breakthrough we've been working toward for years.",
  author: "Dr. Amara Patel",
  role: "Lead AI Researcher, VisualTech Labs",
  gradient: "from-purple-800 via-pink-700 to-red-500",
  backgroundImage: "/background-section3.png"
}, {
  content: "This technology will transform entertainment forever. The emotional depth and visual fidelity create completely new possibilities for storytelling.",
  author: "Jason Lee",
  role: "Creative Director, Immersive Studios",
  gradient: "from-orange-600 via-red-500 to-purple-600",
  backgroundImage: "/background-section1.png"
}];
const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png"
}: TestimonialProps) => {
  return <div className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" style={{
    backgroundImage: `url('${backgroundImage}')`
  }}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white z-10"></div>
      
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>;
};
const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  return <section id="testimonials" ref={sectionRef} className="py-12 bg-white relative mx-0 px-0"> {/* Reduced from py-20 */}
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
              <span>Impact</span>
            </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">Transforming Industries</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => <TestimonialCard key={index} content={testimonial.content} author={testimonial.author} role={testimonial.role} gradient={testimonial.gradient} backgroundImage={testimonial.backgroundImage} />)}
        </div>
      </div>
    </section>;
};
export default Testimonials;