"use client"

import { useEffect } from "react"

// This component generates a PDF resume using HTML/CSS
// In a real implementation, you might use libraries like jsPDF or Puppeteer
export function ResumeGenerator() {
  useEffect(() => {
    // This would generate the PDF resume
    // For now, we'll create a static HTML version that can be printed as PDF
    generateResumePDF()
  }, [])

  const generateResumePDF = () => {
    const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Farhan Fadhilah Djabari - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #007BFF;
            padding-bottom: 20px;
        }
        
        .header h1 {
            font-size: 2.5em;
            color: #1A1A1A;
            margin-bottom: 5px;
        }
        
        .header h2 {
            font-size: 1.2em;
            color: #007BFF;
            font-weight: normal;
            margin-bottom: 10px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 0.9em;
            color: #666;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section h3 {
            font-size: 1.3em;
            color: #1A1A1A;
            border-bottom: 1px solid #007BFF;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        
        .experience-item, .education-item, .project-item {
            margin-bottom: 20px;
        }
        
        .experience-item h4, .project-item h4 {
            font-size: 1.1em;
            color: #1A1A1A;
            margin-bottom: 5px;
        }
        
        .experience-meta, .education-meta {
            color: #007BFF;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .skill-category h4 {
            color: #007BFF;
            margin-bottom: 8px;
        }
        
        .skill-list {
            list-style: none;
        }
        
        .skill-list li {
            padding: 2px 0;
            position: relative;
            padding-left: 15px;
        }
        
        .skill-list li:before {
            content: "•";
            color: #007BFF;
            position: absolute;
            left: 0;
        }
        
        .project-tech {
            color: #666;
            font-style: italic;
            margin-top: 5px;
        }
        
        @media print {
            body {
                padding: 20px;
            }
            .header {
                margin-bottom: 20px;
            }
            .section {
                margin-bottom: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Farhan Fadhilah Djabari</h1>
        <h2>Mobile Developer</h2>
        <div class="contact-info">
            <span>📧 contact@djabari-dev.my.id</span>
            <span>🔗 linkedin.com/in/farhandjabari</span>
            <span>💻 github.com/farhandjabari</span>
        </div>
    </div>

    <div class="section">
        <h3>Professional Summary</h3>
        <p>Passionate Mobile Developer with a Bachelor's degree in Information Technology from Brawijaya University. Experienced in building applications using Flutter and native Android (Kotlin), with a focus on writing clean, maintainable code. Strong collaborator who enjoys exploring new technologies and improving code quality through continuous learning and team discussions.</p>
    </div>

    <div class="section">
        <h3>Education</h3>
        <div class="education-item">
            <h4>Bachelor of Information Technology</h4>
            <div class="education-meta">Brawijaya University</div>
            <p>Focused on software engineering principles, mobile application development, and modern programming practices.</p>
        </div>
    </div>

    <div class="section">
        <h3>Technical Skills</h3>
        <div class="skills-grid">
            <div class="skill-category">
                <h4>Mobile Development</h4>
                <ul class="skill-list">
                    <li>Flutter & Dart</li>
                    <li>Android (Kotlin)</li>
                    <li>iOS Development (Swift)</li>
                    <li>React Native</li>
                </ul>
            </div>
            <div class="skill-category">
                <h4>Programming Languages</h4>
                <ul class="skill-list">
                    <li>Kotlin</li>
                    <li>Dart</li>
                    <li>Swift</li>
                    <li>JavaScript</li>
                </ul>
            </div>
            <div class="skill-category">
                <h4>Development Practices</h4>
                <ul class="skill-list">
                    <li>Clean Code Architecture</li>
                    <li>UI/UX Design Principles</li>
                    <li>REST API Integration</li>
                    <li>Version Control (Git)</li>
                </ul>
            </div>
            <div class="skill-category">
                <h4>Tools & Technologies</h4>
                <ul class="skill-list">
                    <li>Android Studio</li>
                    <li>Xcode</li>
                    <li>VS Code</li>
                    <li>Firebase</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>Featured Projects</h3>
        
        <div class="project-item">
            <h4>Kalm App</h4>
            <div class="project-tech">Technologies: Flutter, Dart</div>
            <p>A comprehensive mobile solution for mental health, focusing on providing cognitive behavioral psychotherapy services to improve user well-being. Implemented clean architecture patterns and intuitive UI/UX design.</p>
        </div>

        <div class="project-item">
            <h4>Notesgram</h4>
            <div class="project-tech">Technologies: Flutter, Dart</div>
            <p>Mobile application that helps users easily find and access 'studygram' style notes. Features include search functionality, categorization, and user-friendly interface for educational content discovery.</p>
        </div>

        <div class="project-item">
            <h4>Publico</h4>
            <div class="project-tech">Technologies: Flutter, Dart</div>
            <p>Educational application designed to teach users about economic development. Incorporates interactive learning modules and engaging content delivery mechanisms.</p>
        </div>

        <div class="project-item">
            <h4>PokedexF</h4>
            <div class="project-tech">Technologies: Flutter, Dart, REST API</div>
            <p>Pokemon catalog application that displays comprehensive Pokemon data from the PokeAPI. Demonstrates proficiency in API integration, data management, and responsive UI design.</p>
        </div>
    </div>

    <div class="section">
        <h3>Professional Attributes</h3>
        <ul class="skill-list">
            <li>Strong problem-solving and analytical thinking abilities</li>
            <li>Excellent collaboration and communication skills</li>
            <li>Passionate about continuous learning and technology exploration</li>
            <li>Committed to writing clean, maintainable, and scalable code</li>
            <li>Experience with agile development methodologies</li>
            <li>Proactive in code reviews and knowledge sharing</li>
        </ul>
    </div>
</body>
</html>
    `

    // In a real implementation, you would generate and save this as a PDF
    // For demonstration, we're showing the HTML structure
    console.log("Resume HTML generated:", resumeHTML)
  }

  return null
}
