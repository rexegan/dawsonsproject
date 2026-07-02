import './About.css'

export default function About() {
  return (
    <div className="about">
      <div className="about-hero">
        <div className="about-logo">
          <span className="about-logo-yl">YL</span>
        </div>
        <h2 className="about-heading">About Young Life</h2>
        <p className="about-sub">Loving kids into relationship with Jesus Christ</p>
      </div>

      <div className="about-body">
        <div className="about-card">
          <h3>What We Believe</h3>
          <p>Young Life believes every kid deserves the chance to know Jesus. We go to them — to their schools, games, and hangouts — and build real friendships because every person matters to God.</p>
        </div>

        <div className="about-card">
          <h3>YoungLife</h3>
          <p className="program-badge hs-badge">High School</p>
          <p>YoungLife Club meets weekly at a leader's home for high schoolers (9th–12th grade). It's loud, fun, and the best night of the week. We also go to camp, do Campaigners Bible study, and hang out all year long.</p>
        </div>

        <div className="about-card">
          <h3>WyldLife</h3>
          <p className="program-badge ms-badge">Middle School</p>
          <p>WyldLife is Young Life for 6th, 7th, and 8th graders. Because middle school is the most formative time in a kid's life, we show up for them right at the beginning with clubs, camps, and real relationships.</p>
        </div>

        <div className="about-card">
          <h3>Campaigners</h3>
          <p>Campaigners is a weekly Bible study for students who want to go deeper in their faith. We study scripture, ask big questions, and grow together. All grades welcome.</p>
        </div>

        <div className="about-card">
          <h3>Camp</h3>
          <p>Young Life camp is widely considered the best week of a kid's life. From Malibu Club in British Columbia to Silver Cliff Ranch in Colorado, our properties are world-class and the experiences are life-changing.</p>
        </div>

        <div className="about-card about-card--red">
          <h3>Johnson County Area</h3>
          <p>We serve junior high and high school students across Johnson County, Kansas — including schools in Olathe, Overland Park, Leawood, Prairie Village, Shawnee, and beyond.</p>
          <div className="about-schools">
            {[
              'Blue Valley', 'Blue Valley North', 'Blue Valley West',
              'Blue Valley Northwest', 'Blue Valley Southwest',
              'Olathe East', 'Olathe North', 'Olathe South', 'Olathe West', 'Olathe Northwest',
              'SM East', 'SM West', 'SM North', 'SM South',
            ].map((s) => (
              <span key={s} className="school-chip">{s}</span>
            ))}
          </div>
        </div>

        <div className="about-mission">
          <p>"Young Life is a mission organization proclaiming Jesus Christ to adolescents and inviting them to become His disciples."</p>
          <p className="about-mission-source">— Young Life Mission Statement</p>
        </div>
      </div>
    </div>
  )
}
