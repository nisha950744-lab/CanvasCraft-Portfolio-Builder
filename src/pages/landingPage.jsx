
import './landingPage.css'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <>
      <nav>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </nav>

      <section className="hero">
        <div className="line2">CanvasX</div>
        <div className="line1">
          Need to make a webpage but don't want to code?
        </div>
        <div className="line3">Welcome to your destination</div>
      </section>

      <section className="features">
        <div className="grid">
          <div className="feature-card">
            <h3>Drag & Drop Builder</h3>
            <p>Smooth placement & resizing of page blocks.</p>
          </div>

          <div className="feature-card">
            <h3>Block Library</h3>
            <p>Hero, Bio, Gallery, Contact, Footer & more.</p>
          </div>

          <div className="feature-card">
            <h3>Autosave</h3>
            <p>Your work stays safe even if you close the tab.</p>
          </div>

          <div className="feature-card">
            <h3>Project Persistence</h3>
            <p>Access all your saved projects anytime.</p>
          </div>

          <div className="feature-card">
            <h3>One-Click Export</h3>
            <p>Download a complete offline-ready HTML file.</p>
          </div>

          <div className="feature-card">
            <h3>Responsive Layouts</h3>
            <p>Your website looks perfect on all screen sizes.</p>
          </div>
        </div>
      </section>

      <section className="testimonial">
        <h2>What Users Say</h2>
        <p>
          "CanvasX helped me create a stunning academic portfolio in minutes.
          No coding, no stress!" — Prof. Meera Iyer
        </p>
      </section>
    </>
  )
}
