import React, { useState } from "react";
import Sidebar from "../component/Sidebar";

const Help = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionIndex) => {
    setOpenQuestion(openQuestion === questionIndex ? null : questionIndex);
  };

  return (
    <div className="flex">
        <Sidebar/>
        <div
            className="bg-white w-full flex justify-center p-10"
    >
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          
          padding: "20px",
        }}
      >
        {/* Welcome Section */}
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
          Help and Support
        </h1>

        {/* FAQ Section */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#333", marginBottom: "10px" }}>Frequently Asked Questions</h2>
          {[
            { question: "How do I reset my password?", answer: "To reset your password, click on 'Forgot Password' on the login page and follow the instructions." },
            { question: "How do I contact support?", answer: "You can contact support by emailing support@example.com or calling us at 123-456-7890." },
          ].map((faq, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <button
                onClick={() => toggleQuestion(index)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {faq.question}
                <span style={{ transform: openQuestion === index ? "rotate(90deg)" : "rotate(0deg)" }}>
                  ►
                </span>
              </button>
              {openQuestion === index && (
                <p
                  style={{
                    color: "#333",
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* User Guides Section */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#333", marginBottom: "10px" }}>User Guides & Tutorials</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              { title: "Getting Started Guide", description: "Learn how to create your account, set up your profile, and navigate the platform." },
              { title: "Advanced Features", description: "Discover the powerful tools available, such as real-time analytics and notifications." },
              { title: "Tips & Tricks", description: "Improve your experience with our platform using these tips from experts." },
            ].map((guide, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                <strong style={{ color: "#333" }}>{guide.title}:</strong> {guide.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Support Section */}
        <div>
          <h2 style={{ color: "#333", marginBottom: "10px" }}>Contact Support</h2>
          <p style={{ color: "#555", fontSize: "14px" }}>
            If you need further assistance, please feel free to contact us:
          </p>
          <ul style={{ color: "#333", fontSize: "14px", padding: 0, listStyle: "none" }}>
            <li>Email: <a href="mailto:support@example.com" style={{ color: "#007BFF" }}>support@example.com</a></li>
            <li>Phone: 123-456-7890</li>
            <li>Live Chat: Available 24/7 on our website</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Help;