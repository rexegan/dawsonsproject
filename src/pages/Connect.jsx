import { useState } from 'react'
import './Connect.css'

export default function Connect() {
  const [form, setForm] = useState({ name: '', grade: '', school: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="connect-success">
        <div className="success-icon">🎉</div>
        <h2>You're in!</h2>
        <p>We'll reach out soon. Can't wait to meet you at club!</p>
        <button className="btn-primary" onClick={() => setSubmitted(false)}>Back to Connect</button>
      </div>
    )
  }

  return (
    <div className="connect">
      <div className="connect-hero">
        <p className="connect-sub">We'd love to meet you</p>
        <h2 className="connect-heading">Get Connected</h2>
        <p className="connect-desc">Fill out this form and a leader will reach out to connect you with your school's Young Life program.</p>
      </div>

      <div className="connect-body">
        <div className="connect-options">
          <a href="tel:+19135550100" className="connect-option">
            <span className="connect-option-icon">📞</span>
            <div>
              <div className="connect-option-title">Call Us</div>
              <div className="connect-option-sub">(913) 555-0100</div>
            </div>
          </a>
          <a href="mailto:johnsoncounty@younglife.org" className="connect-option">
            <span className="connect-option-icon">✉️</span>
            <div>
              <div className="connect-option-title">Email Us</div>
              <div className="connect-option-sub">johnsoncounty@younglife.org</div>
            </div>
          </a>
          <a href="https://instagram.com/jcyounglife" target="_blank" rel="noreferrer" className="connect-option">
            <span className="connect-option-icon">📸</span>
            <div>
              <div className="connect-option-title">Instagram</div>
              <div className="connect-option-sub">@jcyounglife</div>
            </div>
          </a>
        </div>

        <div className="divider"><span>or fill out the form</span></div>

        <form className="connect-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="First & Last Name" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Grade</label>
              <select name="grade" value={form.grade} onChange={handleChange} required>
                <option value="">Select...</option>
                <option>6th Grade</option>
                <option>7th Grade</option>
                <option>8th Grade</option>
                <option>9th Grade</option>
                <option>10th Grade</option>
                <option>11th Grade</option>
                <option>12th Grade</option>
                <option>Parent / Adult</option>
              </select>
            </div>
            <div className="form-group">
              <label>School</label>
              <input name="school" value={form.school} onChange={handleChange} placeholder="Your school" required />
            </div>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(913) 000-0000" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
          </div>
          <div className="form-group">
            <label>Anything else?</label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Questions, prayer requests, or just say hi!" rows={3} />
          </div>
          <button type="submit" className="btn-primary">Connect with a Leader</button>
        </form>
      </div>
    </div>
  )
}
