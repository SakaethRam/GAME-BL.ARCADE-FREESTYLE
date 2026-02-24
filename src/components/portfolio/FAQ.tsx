"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

const faqs = [
  {
    question: "What types of AI systems do you specialize in?",
    answer:
      "I specialize in production-grade AI systems, including large language model (LLM) platforms, real-time inference pipelines, and reinforcement learning applications. My work focuses on scalability, reliability, and high-performance deployment.",
  },
  {
    question: "Can you build scalable infrastructure for high-traffic apps?",
    answer:
      "Yes. I’ve led development of systems serving millions of daily requests using Kubernetes, distributed architectures, and optimized model inference pipelines. Performance and fault tolerance are always core priorities.",
  },
  {
    question: "Do you work across both frontend and backend?",
    answer:
      "Absolutely. With experience in React, React Native, Node.js, PostgreSQL, and cloud-native systems, I design and build full-stack solutions — from immersive 3D interfaces to production backend infrastructure.",
  },
  {
    question: "How do you approach complex technical problems?",
    answer:
      "My background in deep learning research and real-world system architecture allows me to approach problems analytically. I break down complexity, design scalable abstractions, and iterate with measurable performance benchmarks.",
  },
  {
    question: "Do you offer consulting or long-term technical leadership?",
    answer:
      "Yes. I provide architecture consulting, AI system audits, and technical leadership for teams building advanced AI-driven products. I’m comfortable operating at both hands-on engineering and strategic levels.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-black rounded-xl text-white py-24 px-6 sm:px-12" id="faq">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Left Side */}
        <div>
          <p className="text-xs font-mono tracking-widest text-gray-500 mb-6">
            [ FAQ ]
          </p>

          <h2 className="text-5xl sm:text-6xl font-semibold leading-tight text-gray-400">
            Smarter decisions
            <br />
            start with <span className="text-white">clear</span>
            <br />
            <span className="text-white">answers.</span>
          </h2>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-lg font-medium">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <X size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </button>

              {openIndex === index && (
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}