import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'

const team = [
    {
        name: 'Amit Swain',
        role: 'SENIOR INSTRUCTOR',
        bio: 'Committed, patient, and focused on building road confidence from day one.',
        img: 'https://www.dreamdrivingschool.in/assets/images/team/team-1-1.jpg'
    },
    {
        name: 'Anjali Varma',
        role: 'LEAD TRAINER',
        bio: 'Specializes in nervous learners and defensive driving techniques.',
        img: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0'
    },
    {
        name: 'Prakash Singh',
        role: 'RTO EXPERT',
        bio: 'Our RTO expert, ensuring every student is test-ready and compliant.',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    },
    {
        name: 'Lewis Hamilton',
        role: 'EXPERT DRIVER',
        bio: 'Excels at parallel parking and highway driving safety.',
        img: 'https://cdn-9.motorsport.com/images/mgl/2y3j5bg6/s800/lewis-hamilton-ferrari.jpg'
    },
]

export default function MeetInstructorsSection() {
    return (
        <section className="py-16 bg-broto-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-white mb-12 tracking-wider text-center">
                    MEET OUR <span className="text-broto-yellow">PROFESSIONAL</span> AND EXPERIENCED INSTRUCTORS
                </h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {team.map((member, i) => (
                        <div key={i} className="team-card text-center" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                            <div className="card-content">
                                <div className="profile-image">
                                    <img src={member.img} alt={member.name} />
                                </div>
                                <h3 className="member-name text-center">{member.name}</h3>
                                <p className="member-role text-center">{member.role}</p>
                                <div className="social-links">
                                    <button className="social-icon"><FaTwitter className="w-5 h-5" /></button>
                                    <button className="social-icon"><FaFacebook className="w-5 h-5" /></button>
                                    <button className="social-icon"><FaLinkedin className="w-5 h-5" /></button>
                                    <button className="social-icon"><FaInstagram className="w-5 h-5" /></button>
                                </div>
                                <p className="member-bio text-center">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
